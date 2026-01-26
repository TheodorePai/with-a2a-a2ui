/**
 * Agent 核心逻辑 - 生成式版本 (不使用工具)
 * 基于 agent-js/src/agent.js 修改
 */

import Ajv from 'ajv';
import { OpenAIAdapter } from './openai-adapter.js';
import { configManager } from './config.js';
import { A2UI_SCHEMA, get_ui_prompt_gen, get_text_prompt_gen } from './prompt_builder.js';
import { RESTAURANT_UI_EXAMPLES } from './a2ui_examples.js';

const ajv = new Ajv();

// 模拟 Session 存储
const sessionStore = new Map();

// Agent 指令
const AGENT_INSTRUCTION = `
    You are a helpful restaurant finding assistant. Your goal is to help users find and book restaurants using a rich UI.

    To achieve this, you MUST follow this logic:

    1.  **For finding restaurants:**
        a. You MUST generate restaurant data based on the user's query. The data should be an array of objects, and each object MUST follow this format:
        {
            "name": "Restaurant Name",
            "detail": "Description of the restaurant",
            "imageUrl": "https://images.unsplash.com/photo-...", // You MUST generate a real, publicly accessible image URL (e.g. from Unsplash) that depicts the food or restaurant atmosphere
            "rating": "★★★★☆", // 1-5 stars
            "infoLink": "[More Info](https://example.com)",
            "address": "Address string" // Ensure the address is comprehensive and precise, leaving no ambiguity for navigation.
        }
        b. **Restaurant Count Rules:**
           - Default to generating 5 restaurants if the user does not specify a number.
           - If the user specifies a number, use that number, but do NOT exceed 10.
           - If the user asks for more than 10, generate exactly 10 restaurants.
        c. **Language Rules:**
           - Determine the language of the restaurant information based on the user's requested location.
           - Default to Chinese (zh-CN) if the location's primary language is Chinese or if no location/language is clear.
        d. You MUST use this generated data to populate the 'dataModelUpdate.contents' array in the final a2ui UI JSON.
        e. You MUST use the appropriate UI example from the prompt (SINGLE_COLUMN_LIST_EXAMPLE or TWO_COLUMN_LIST_EXAMPLE) to structure your response.

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
     * 流式生成响应
     * @param {string} query - 用户查询
     * @param {string} sessionId - 会话 ID
     */
    async *stream(query, sessionId) {
        // 获取或创建会话
        if (!sessionStore.has(sessionId)) {
            // Apply base_url to AGENT_INSTRUCTION as well if needed, 
            // but AGENT_INSTRUCTION here is just a string literal. 
            // The model will see {{base_url}} in the examples from get_ui_prompt_gen which does replacement.
            // For AGENT_INSTRUCTION, I'll do a simple replace too to be safe, though get_ui_prompt_gen handles the main examples.
            
            const sysPromptStartTime = performance.now();
            let instruction = AGENT_INSTRUCTION.replace(/\{\{\s*base_url\s*\}\}/g, this.baseUrl);
            const systemContent = this.useUI
                ? instruction + get_ui_prompt_gen(this.baseUrl, RESTAURANT_UI_EXAMPLES)
                : get_text_prompt_gen();
            const sysPromptEndTime = performance.now();
            console.log(`[Timing] System prompt construction took ${(sysPromptEndTime - sysPromptStartTime).toFixed(2)}ms`);

            sessionStore.set(sessionId, {
                messages: [{ role: "system", content: systemContent }],
                state: { base_url: this.baseUrl }
            });
        }

        const msgPrepStartTime = performance.now();
        const session = sessionStore.get(sessionId);
        let currentMessages = session.messages;
        currentMessages.push({ role: "user", content: query });
        const msgPrepEndTime = performance.now();
        console.log(`[Timing] Message preparation (user query) took ${(msgPrepEndTime - msgPrepStartTime).toFixed(2)}ms`);

        const maxRetries = 1;
        let attempt = 0;

        while (attempt <= maxRetries) {
            attempt++;
            console.info(`--- Attempt ${attempt}/${maxRetries + 1} for ${sessionId} ---`);

            try {
                // Yield initial status
                yield { is_task_complete: false, updates: "Thinking..." };

                const reqBodyStartTime = performance.now();
                const config = configManager.getAPIConfig();
                
                // No tools provided here
                const requestOptions = {
                    model: config.model,
                    messages: currentMessages,
                    // tools: toolDefinitions, // REMOVED
                    // tool_choice: "auto"     // REMOVED
                };
                const reqBodyEndTime = performance.now();
                console.log(`[Timing] Request body construction took ${(reqBodyEndTime - reqBodyStartTime).toFixed(2)}ms`);

                const netStartTime = performance.now();
                const response = await this.openai.createChatCompletion(requestOptions);
                console.log(`response json: ${JSON.stringify(response)}`);
                const netEndTime = performance.now();
                console.log(`[Timing] Send request and wait response took ${(netEndTime - netStartTime).toFixed(2)}ms`);

                const responseMessage = response.choices[0].message;
                const finalContent = responseMessage.content;

                // UI 验证
                if (this.useUI) {
                    const uiVerStartTime = performance.now();
                    const validation = this._validateUI(finalContent);
                    const uiVerEndTime = performance.now();
                    console.log(`[Timing] UI Verification took ${(uiVerEndTime - uiVerStartTime).toFixed(2)}ms`);

                    if (validation.ok) {
                        currentMessages.push({ role: "assistant", content: finalContent });
                        yield { is_task_complete: true, content: finalContent };
                        return;
                    } else {
                        console.error(`Invalid UI Response: ${validation.error}`);
                        if (attempt <= maxRetries) {
                            const retryPrepStartTime = performance.now();
                            const retryPrompt = `Your previous response was invalid. ${validation.error} ` +
                                `Please retry the original request: '${query}'`;
                            currentMessages.push({ role: "user", content: retryPrompt });
                            const retryPrepEndTime = performance.now();
                            console.log(`[Timing] Message preparation (retry) took ${(retryPrepEndTime - retryPrepStartTime).toFixed(2)}ms`);
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
