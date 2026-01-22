const OpenAI = require("openai");
const Ajv = require("ajv");
const { get_ui_prompt, get_text_prompt, A2UI_SCHEMA, RESTAURANT_UI_EXAMPLES } = require('./prompt_builder');
const { getRestaurantsTool } = require('./tools');

const ajv = new Ajv();
const logger = console;

// 模拟 Session 存储，用于持久化对话上下文和 BaseURL 状态
const globalSessionStore = new Map();

const AGENT_INSTRUCTION = `
    You are a helpful restaurant finding assistant. Your goal is to help users find and book restaurants using a rich UI.

    To achieve this, you MUST follow this logic:

    1.  **For finding restaurants:**
        a. You MUST call the 'get_restaurants' tool. Extract the cuisine, location, and a specific number ('count') of restaurants from the user's query.
        b. After receiving the data, you MUST follow the instructions precisely to generate the final a2ui UI JSON, using the appropriate UI example from the prompt.

    2.  **For booking a table:**
        a. You MUST use the appropriate UI example to generate the booking UI.

    3.  **For confirming a booking:**
        a. You MUST use the confirmation UI example.
`;

class RestaurantAgent {
    constructor(baseUrl, useUi = false) {
        this.baseUrl = baseUrl;
        this.useUi = useUi;

        // 初始化 OpenAI 客户端 (完全兼容 OpenRouter)
        this.openai = new OpenAI({
            apiKey: process.env.GEMINI_API_KEY || process.env.OPENROUTER_API_KEY || process.env.DASHSCOPE_API_KEY,
            baseURL: process.env.GEMINI_BASE_URL || process.env.OPENROUTER_BASE_URL || process.env.DASHSCOPE_BASE_URL,
        });

        this.model = process.env.GEMINI_MODEL || process.env.DASHSCOPE_MODEL || process.env.OPENROUTER_MODEL;
        this.a2uiSchemaObject = this._initSchema();
    }

    _initSchema() {
        try {
            const singleMessageSchema = JSON.parse(A2UI_SCHEMA);
            return { type: "array", items: singleMessageSchema };
        } catch (e) {
            logger.error(`CRITICAL: Failed to parse A2UI_SCHEMA: ${e.message}`);
            return null;
        }
    }

    /**
     * 将你的 ADK 工具描述转换为 OpenAI 要求的 JSON 格式
     */
    _getOpenAIToolsConfig() {
        return [{
            type: "function",
            function: {
                name: "get_restaurants",
                description: "Call this tool to get a list of restaurants based on a cuisine and location. 'count' is the number of restaurants to return.",
                parameters: {
                    type: "object",
                    properties: {
                        cuisine: { type: "string", description: "The type of cuisine to search for." },
                        location: { type: "string", description: "The city or location for the restaurant search." },
                        count: { type: "number", description: "Number of restaurant results to return." }
                    },
                    required: ["cuisine", "location"]
                }
            }
        }];
    }

    /**
     * 核心逻辑：执行工具并注入 Context
     */
    async _executeTool(toolCall, sessionState) {
        const { name, arguments: argsString } = toolCall.function;
        const params = JSON.parse(argsString);

        if (name === "get_restaurants") {
            // 关键：构造一个模拟的 ToolContext 传给你原有的工具函数
            // 这样 get_restaurants 函数就能通过 context.state.base_url 拿到值
            const mockContext = {
                state: sessionState 
            };
            
            logger.info(`--- Executing Tool: ${name} ---`);
            // 调用你 tools.js 中导出的 getRestaurantsTool 的 execute 方法
            return await getRestaurantsTool.execute(params, mockContext);
        }
        return JSON.stringify({ error: `Tool ${name} not found` });
    }

    /**
     * 严格对应原有的流式生成器接口
     */
    async *stream(query, sessionId) {
        // 1. 获取或创建 Session 状态
        if (!globalSessionStore.has(sessionId)) {
            const systemContent = this.useUi 
                ? AGENT_INSTRUCTION + get_ui_prompt(this.baseUrl, RESTAURANT_UI_EXAMPLES)
                : get_text_prompt();

            globalSessionStore.set(sessionId, {
                messages: [{ role: "system", content: systemContent }],
                state: { base_url: this.baseUrl }
            });
        }

        const session = globalSessionStore.get(sessionId);
        let currentMessages = session.messages;
        currentMessages.push({ role: "user", content: query });

        const maxRetries = 1;
        let attempt = 0;

        while (attempt <= maxRetries) {
            attempt++;
            logger.info(`--- Attempt ${attempt}/${maxRetries + 1} for ${sessionId} ---`);

            try {
                let isToolLooping = true;
                let finalContent = null;

                while (isToolLooping) {
                    // 推送中间状态（Processing Message）
                    yield { is_task_complete: false, updates: "Finding restaurants that match your criteria..." };

                    const response = await this.openai.chat.completions.create({
                        model: this.model,
                        messages: currentMessages,
                        tools: this._getOpenAIToolsConfig(),
                        tool_choice: "auto",
                    });

                    const responseMessage = response.choices[0].message;

                    // 处理工具调用
                    if (responseMessage.tool_calls) {
                        currentMessages.push(responseMessage); // 保存模型的调用意图

                        for (const toolCall of responseMessage.tool_calls) {
                            const toolResult = await this._executeTool(toolCall, session.state);
                            
                            currentMessages.push({
                                role: "tool",
                                tool_call_id: toolCall.id,
                                content: toolResult, // 这里已经是 JSON 字符串
                            });
                        }
                        // 继续循环，让模型根据工具结果生成回复
                        continue; 
                    } 
                    
                    // 模型给出了最终回复
                    finalContent = responseMessage.content;
                    isToolLooping = false;
                }

                // 2. UI 验证逻辑
                if (this.useUi) {
                    const validation = this._validateUi(finalContent);
                    if (validation.ok) {
                        currentMessages.push({ role: "assistant", content: finalContent });
                        yield { is_task_complete: true, content: finalContent };
                        return;
                    } else {
                        logger.error(`Invalid UI Response: ${validation.error}`);
                        if (attempt <= maxRetries) {
                            // 构造纠错 Prompt 发起重试
                            const retryPrompt = `Your previous response was invalid. ${validation.error} ` +
                                `Please retry the original request: '${query}'`;
                            currentMessages.push({ role: "user", content: retryPrompt });
                            continue;
                        }
                    }
                } else {
                    currentMessages.push({ role: "assistant", content: finalContent });
                    yield { is_task_complete: true, content: finalContent };
                    return;
                }

            } catch (err) {
                logger.error("Stream Loop Error:", err);
                yield { is_task_complete: true, content: "I'm sorry, I encountered an error." };
                return;
            }
        }

        yield { is_task_complete: true, content: "I'm sorry, I'm having trouble generating the interface." };
    }

    _validateUi(content) {
        try {
            if (!content || !content.includes("---a2ui_JSON---")) throw new Error("Delimiter '---a2ui_JSON---' not found.");
            const jsonStr = content.split("---a2ui_JSON---")[1].trim()
                .replace(/^```json/, "").replace(/```$/, "").trim();
            
            const parsed = JSON.parse(jsonStr);
            const validate = ajv.compile(this.a2uiSchemaObject);
            if (!validate(parsed)) {
                return { ok: false, error: ajv.errorsText(validate.errors) };
            }
            return { ok: true };
        } catch (e) {
            return { ok: false, error: e.message };
        }
    }
}

module.exports = RestaurantAgent;