/**
 * Agent 核心逻辑
 */

import Ajv from 'ajv';
import { OpenAIAdapter } from './openai-adapter.js';
import { toolDefinitions, executeTool } from './tools.js';
import { configManager } from './config.js';
import { get_ui_prompt, get_text_prompt, A2UI_SCHEMA, RESTAURANT_UI_EXAMPLES } from './prompt_builder.js';

const ajv = new Ajv();

// Session 存储
const sessionStore = new Map();

// Agent 指令
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

export class RestaurantAgent {
    /**
     * @param {string} baseUrl - 基础 URL
     * @param {boolean} useUI - 是否使用 UI 模式
     */
    constructor(baseUrl, useUI = false) {
        this.baseUrl = baseUrl;
        this.useUI = useUI;
        this.openai = new OpenAIAdapter();
        this.a2uiSchemaObject = this._initSchema();
    }

    _initSchema() {
        try {
            const singleMessageSchema = JSON.parse(A2UI_SCHEMA);
            return { type: "array", items: singleMessageSchema };
        } catch (e) {
            console.error(`CRITICAL: Failed to parse A2UI_SCHEMA: ${e.message}`);
            return null;
        }
    }

    /**
     * 执行工具调用
     */
    async _executeTool(toolCall, sessionState) {
        const { name, arguments: argsString } = toolCall.function;
        const params = JSON.parse(argsString);

        const mockContext = {
            state: sessionState
        };

        console.info(`--- Executing Tool: ${name} ---`);
        return executeTool(name, params, mockContext);
    }

    /**
     * 流式生成响应
     * @param {string} query - 用户查询
     * @param {string} sessionId - 会话 ID
     */
    async *stream(query, sessionId) {
        // 获取或创建会话
        if (!sessionStore.has(sessionId)) {
            const systemContent = this.useUI
                ? AGENT_INSTRUCTION + get_ui_prompt()
                : AGENT_INSTRUCTION + get_text_prompt();

            sessionStore.set(sessionId, {
                messages: [{ role: "system", content: systemContent }],
                state: { base_url: this.baseUrl }
            });
        }

        const session = sessionStore.get(sessionId);
        let currentMessages = session.messages;
        currentMessages.push({ role: "user", content: query });

        const maxRetries = 1;
        let attempt = 0;

        while (attempt <= maxRetries) {
            attempt++;
            console.info(`--- Attempt ${attempt}/${maxRetries + 1} for ${sessionId} ---`);

            try {
                let isToolLooping = true;
                let finalContent = null;

                while (isToolLooping) {
                    yield { is_task_complete: false, updates: "Finding restaurants that match your criteria..." };

                    const config = configManager.getAPIConfig();
                    const response = await this.openai.createChatCompletion({
                        model: config.model,
                        messages: currentMessages,
                        tools: toolDefinitions,
                        tool_choice: "auto"
                    });

                    const responseMessage = response.choices[0].message;

                    // 处理工具调用
                    if (responseMessage.tool_calls) {
                        currentMessages.push(responseMessage);

                        for (const toolCall of responseMessage.tool_calls) {
                            const toolResult = await this._executeTool(toolCall, session.state);

                            currentMessages.push({
                                role: "tool",
                                tool_call_id: toolCall.id,
                                content: toolResult
                            });
                        }
                        continue;
                    }

                    finalContent = responseMessage.content;
                    isToolLooping = false;
                }

                // UI 验证
                if (this.useUI) {
                    const validation = this._validateUI(finalContent);
                    if (validation.ok) {
                        currentMessages.push({ role: "assistant", content: finalContent });
                        yield { is_task_complete: true, content: finalContent };
                        return;
                    } else {
                        console.error(`Invalid UI Response: ${validation.error}`);
                        if (attempt <= maxRetries) {
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
                console.error("Stream Loop Error:", err);
                yield { is_task_complete: true, content: "I'm sorry, I encountered an error." };
                return;
            }
        }

        yield { is_task_complete: true, content: "I'm sorry, I'm having trouble generating the interface." };
    }

    /**
     * 验证 UI 响应
     */
    _validateUI(content) {
        try {
            if (!content || !content.includes("---a2ui_JSON---")) {
                throw new Error("Delimiter '---a2ui_JSON---' not found.");
            }
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
