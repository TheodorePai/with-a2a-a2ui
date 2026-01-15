// 引入官方 adk 模块
const { LlmAgent, Runner, InMemoryArtifactService, InMemoryMemoryService, InMemorySessionService, isFinalResponse } = require("@google/adk");
const { FunctionTool } = require("@google/adk");
const { z } = require('zod');


const {createUserContent, Part} = require("@google/genai")


const Ajv = require("ajv");
// import { get_ui_prompt, get_text_prompt, A2UI_SCHEMA, RESTAURANT_UI_EXAMPLES } from "./prompt_builder";
const { get_ui_prompt, get_text_prompt, A2UI_SCHEMA, RESTAURANT_UI_EXAMPLES } = require('./prompt_builder');
// import { get_restaurants_tool } from "./tools";
const { getRestaurantsTool } = require('./tools');


const ajv = new Ajv();
const logger = console;

const AGENT_INSTRUCTION = `
    You are a helpful restaurant finding assistant. Your goal is to help users find and book restaurants using a rich UI.

    To achieve this, you MUST follow this logic:

    1.  **For finding restaurants:**
        a. You MUST call the \`get_restaurants\` tool. Extract the cuisine, location, and a specific number (\`count\`) of restaurants from the user's query (e.g., for "top 5 chinese places", count is 5).
        b. After receiving the data, you MUST follow the instructions precisely to generate the final a2ui UI JSON, using the appropriate UI example from the \`prompt_builder.js\` based on the number of restaurants.

    2.  **For booking a table (when you receive a query like 'USER_WANTS_TO_BOOK...'):**
        a. You MUST use the appropriate UI example from \`prompt_builder.js\` to generate the UI, populating the \`dataModelUpdate.contents\` with the details from the user's query.

    3.  **For confirming a booking (when you receive a query like 'User submitted a booking...'):**
        a. You MUST use the appropriate UI example from \`prompt_builder.js\` to generate the confirmation UI, populating the \`dataModelUpdate.contents\` with the final booking details.
`;

 // 添加模拟数据开关
const useMockData = true; // 设置为true使用模拟数据，false使用真实实现

class RestaurantAgent {
    static SUPPORTED_CONTENT_TYPES = ["text", "text/plain"];

    constructor(baseUrl, useUi = false) {
        this.baseUrl = baseUrl;
        this.useUi = useUi;
        this._userId = "remote_agent";
        if (useMockData) {
            return;
        }
        // 1. 初始化 Agent (对应 Python 的 _build_agent)
        this._agent = this._buildAgent(useUi);

        // 2. 初始化 Runner (对应 Python 的 Runner 构造函数)
        this._runner = new Runner({
            appName: this._agent.name,
            agent: this._agent,
            artifactService: new InMemoryArtifactService(),
            sessionService: new InMemorySessionService(),
            memoryService: new InMemoryMemoryService(),
        });

        // 3. 处理 Schema 包装逻辑 (对应 Python 的 MODIFICATION 部分)
        this.a2uiSchemaObject = this._initSchema();
    }

    _initSchema() {
        try {
            const singleMessageSchema = JSON.parse(A2UI_SCHEMA);
            // 包装成 Array
            const wrappedSchema = { type: "array", items: singleMessageSchema };
            logger.info("A2UI_SCHEMA successfully loaded and wrapped.");
            return wrappedSchema;
        } catch (e) {
            logger.error(`CRITICAL: Failed to parse A2UI_SCHEMA: ${e.message}`);
            return null;
        }
    }

    getProcessingMessage() {
        return "Finding restaurants that match your criteria...";
    }

    _buildAgent(useUi) {
        const LITELLM_MODEL = process.env.LITELLM_MODEL || "gemini/gemini-2.5-flash";
        console.log(`---Using LiteLLM model: ${LITELLM_MODEL}`);

        let instruction = "";
        if (useUi) {
            instruction = AGENT_INSTRUCTION + get_ui_prompt(this.baseUrl, RESTAURANT_UI_EXAMPLES);
        } else {
            instruction = get_text_prompt();
        }

        return new LlmAgent({
            model: LITELLM_MODEL,
            name: "restaurant_agent",
            description: "An agent that finds restaurants and helps book tables.",
            instruction: instruction,
            tools: [getRestaurantsTool]
        });
    }

    /**
     * 严格对应 Python 的 async def stream
     */
    async *stream(query, sessionId) {
        
        if (useMockData) {
            console.log('--- Using mock data for stream response ---');
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            // 模拟中间处理状态
            yield {
                    "is_task_complete": false,
                    "updates": "Finding restaurants that match your criteria..."
            };
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            // 模拟UI版本的最终响应
            if (this.useUi) {
                yield {
                    "is_task_complete": true,
                    "content": "Here are 5 Chinese restaurants in New York:\n---a2ui_JSON---\n[\n  { \"beginRendering\": { \"surfaceId\": \"default\", \"root\": \"root-column\", \"styles\": { \"primaryColor\": \"#FF0000\", \"font\": \"Roboto\" } } },\n  { \"surfaceUpdate\": {\n    \"surfaceId\": \"default\",\n    \"components\": [\n      { \"id\": \"root-column\", \"component\": { \"Column\": { \"children\": { \"explicitList\": [\"title-heading\", \"item-list\"] } } } },\n      { \"id\": \"title-heading\", \"component\": { \"Text\": { \"usageHint\": \"h1\", \"text\": { \"path\": \"title\" } } } },\n      { \"id\": \"item-list\", \"component\": { \"List\": { \"direction\": \"vertical\", \"children\": { \"template\": { \"componentId\": \"item-card-template\", \"dataBinding\": \"/items\" } } } } },\n      { \"id\": \"item-card-template\", \"component\": { \"Card\": { \"child\": \"card-layout\" } } },\n      { \"id\": \"card-layout\", \"component\": { \"Row\": { \"children\": { \"explicitList\": [\"template-image\", \"card-details\"] } } } },\n      { \"id\": \"template-image\", \"weight\": 1, \"component\": { \"Image\": { \"url\": { \"path\": \"imageUrl\" } } } },\n      { \"id\": \"card-details\", \"weight\": 2, \"component\": { \"Column\": { \"children\": { \"explicitList\": [\"template-name\", \"template-rating\", \"template-detail\", \"template-link\", \"template-book-button\"] } } } },\n      { \"id\": \"template-name\", \"component\": { \"Text\": { \"usageHint\": \"h3\", \"text\": { \"path\": \"name\" } } } },\n      { \"id\": \"template-rating\", \"component\": { \"Text\": { \"text\": { \"path\": \"rating\" } } } },\n      { \"id\": \"template-detail\", \"component\": { \"Text\": { \"text\": { \"path\": \"detail\" } } } },\n      { \"id\": \"template-link\", \"component\": { \"Text\": { \"text\": { \"path\": \"infoLink\" } } } },\n      { \"id\": \"template-book-button\", \"component\": { \"Button\": { \"child\": \"book-now-text\", \"primary\": true, \"action\": { \"name\": \"book_restaurant\", \"context\": [ { \"key\": \"restaurantName\", \"value\": { \"path\": \"name\" } }, { \"key\": \"imageUrl\", \"value\": { \"path\": \"imageUrl\" } }, { \"key\": \"address\", \"value\": { \"path\": \"address\" } } ] } } } },\n      { \"id\": \"book-now-text\", \"component\": { \"Text\": { \"text\": { \"literalString\": \"Book Now\" } } } }\n    ]\n  } },\n  { \"dataModelUpdate\": {\n    \"surfaceId\": \"default\",\n    \"path\": \"/\",\n    \"contents\": [\n      { \"key\": \"title\", \"valueString\": \"Top Chinese Restaurants\" },\n      { \"key\": \"items\", \"valueMap\": [\n        { \"key\": \"item0\", \"valueMap\": [\n          { \"key\": \"name\", \"valueString\": \"Xi'an Famous Foods\" },\n          { \"key\": \"rating\", \"valueString\": \"\u2605\u2605\u2605\u2605\u2606\" },\n          { \"key\": \"detail\", \"valueString\": \"Spicy and savory hand-pulled noodles.\" },\n          { \"key\": \"infoLink\", \"valueString\": \"[More Info](https://www.xianfoods.com/)\" },\n          { \"key\": \"imageUrl\", \"valueString\": \"http://localhost:10002/static/shrimpchowmein.jpeg\" },\n          { \"key\": \"address\", \"valueString\": \"81 St Marks Pl, New York, NY 10003\" }\n        ] },\n        { \"key\": \"item1\", \"valueMap\": [\n          { \"key\": \"name\", \"valueString\": \"Han Dynasty\" },\n          { \"key\": \"rating\", \"valueString\": \"\u2605\u2605\u2605\u2605\u2606\" },\n          { \"key\": \"detail\", \"valueString\": \"Authentic Szechuan cuisine.\" },\n          { \"key\": \"infoLink\", \"valueString\": \"[More Info](https://www.handynasty.net/)\" },\n          { \"key\": \"imageUrl\", \"valueString\": \"http://localhost:10002/static/mapotofu.jpeg\" },\n          { \"key\": \"address\", \"valueString\": \"90 3rd Ave, New York, NY 10003\" }\n        ] },\n        { \"key\": \"item2\", \"valueMap\": [\n          { \"key\": \"name\", \"valueString\": \"RedFarm\" },\n          { \"key\": \"rating\", \"valueString\": \"\u2605\u2605\u2605\u2605\u2606\" },\n          { \"key\": \"detail\", \"valueString\": \"Modern Chinese with a farm-to-table approach.\" },\n          { \"key\": \"infoLink\", \"valueString\": \"[More Info](https://www.redfarmnyc.com/)\" },\n          { \"key\": \"imageUrl\", \"valueString\": \"http://localhost:10002/static/beefbroccoli.jpeg\" },\n          { \"key\": \"address\", \"valueString\": \"529 Hudson St, New York, NY 10014\" }\n        ] },\n        { \"key\": \"item3\", \"valueMap\": [\n          { \"key\": \"name\", \"valueString\": \"Mott 32\" },\n          { \"key\": \"rating\", \"valueString\": \"\u2605\u2605\u2605\u2605\u2605\" },\n          { \"key\": \"detail\", \"valueString\": \"Upscale Cantonese dining.\" },\n          { \"key\": \"infoLink\", \"valueString\": \"[More Info](https://mott32.com/newyork/)\" },\n          { \"key\": \"imageUrl\", \"valueString\": \"http://localhost:10002/static/springrolls.jpeg\" },\n          { \"key\": \"address\", \"valueString\": \"111 W 57th St, New York, NY 10019\" }\n        ] },\n        { \"key\": \"item4\", \"valueMap\": [\n          { \"key\": \"name\", \"valueString\": \"Hwa Yuan Szechuan\" },\n          { \"key\": \"rating\", \"valueString\": \"\u2605\u2605\u2605\u2605\u2606\" },\n          { \"key\": \"detail\", \"valueString\": \"Famous for its cold noodles with sesame sauce.\" },\n          { \"key\": \"infoLink\", \"valueString\": \"[More Info](https://hwayuannyc.com/)\" },\n          { \"key\": \"imageUrl\", \"valueString\": \"http://localhost:10002/static/kungpao.jpeg\" },\n          { \"key\": \"address\", \"valueString\": \"40 E Broadway, New York, NY 10002\" }\n        ] }\n      ] }\n    ]\n  } }\n]"
                };
            } else {
                yield {
                    "is_task_complete": true,
                    "content": "Here are 5 Chinese restaurants in New York:\n---a2ui_JSON---\n[\n  { \"beginRendering\": { \"surfaceId\": \"default\", \"root\": \"root-column\", \"styles\": { \"primaryColor\": \"#FF0000\", \"font\": \"Roboto\" } } },\n  { \"surfaceUpdate\": {\n    \"surfaceId\": \"default\",\n    \"components\": [\n      { \"id\": \"root-column\", \"component\": { \"Column\": { \"children\": { \"explicitList\": [\"title-heading\", \"item-list\"] } } } },\n      { \"id\": \"title-heading\", \"component\": { \"Text\": { \"usageHint\": \"h1\", \"text\": { \"path\": \"title\" } } } },\n      { \"id\": \"item-list\", \"component\": { \"List\": { \"direction\": \"vertical\", \"children\": { \"template\": { \"componentId\": \"item-card-template\", \"dataBinding\": \"/items\" } } } } },\n      { \"id\": \"item-card-template\", \"component\": { \"Card\": { \"child\": \"card-layout\" } } },\n      { \"id\": \"card-layout\", \"component\": { \"Row\": { \"children\": { \"explicitList\": [\"template-image\", \"card-details\"] } } } },\n      { \"id\": \"template-image\", \"weight\": 1, \"component\": { \"Image\": { \"url\": { \"path\": \"imageUrl\" } } } },\n      { \"id\": \"card-details\", \"weight\": 2, \"component\": { \"Column\": { \"children\": { \"explicitList\": [\"template-name\", \"template-rating\", \"template-detail\", \"template-link\", \"template-book-button\"] } } } },\n      { \"id\": \"template-name\", \"component\": { \"Text\": { \"usageHint\": \"h3\", \"text\": { \"path\": \"name\" } } } },\n      { \"id\": \"template-rating\", \"component\": { \"Text\": { \"text\": { \"path\": \"rating\" } } } },\n      { \"id\": \"template-detail\", \"component\": { \"Text\": { \"text\": { \"path\": \"detail\" } } } },\n      { \"id\": \"template-link\", \"component\": { \"Text\": { \"text\": { \"path\": \"infoLink\" } } } },\n      { \"id\": \"template-book-button\", \"component\": { \"Button\": { \"child\": \"book-now-text\", \"primary\": true, \"action\": { \"name\": \"book_restaurant\", \"context\": [ { \"key\": \"restaurantName\", \"value\": { \"path\": \"name\" } }, { \"key\": \"imageUrl\", \"value\": { \"path\": \"imageUrl\" } }, { \"key\": \"address\", \"value\": { \"path\": \"address\" } } ] } } } },\n      { \"id\": \"book-now-text\", \"component\": { \"Text\": { \"text\": { \"literalString\": \"Book Now\" } } } }\n    ]\n  } },\n  { \"dataModelUpdate\": {\n    \"surfaceId\": \"default\",\n    \"path\": \"/\",\n    \"contents\": [\n      { \"key\": \"title\", \"valueString\": \"Top Chinese Restaurants\" },\n      { \"key\": \"items\", \"valueMap\": [\n        { \"key\": \"item0\", \"valueMap\": [\n          { \"key\": \"name\", \"valueString\": \"Xi'an Famous Foods\" },\n          { \"key\": \"rating\", \"valueString\": \"\u2605\u2605\u2605\u2605\u2606\" },\n          { \"key\": \"detail\", \"valueString\": \"Spicy and savory hand-pulled noodles.\" },\n          { \"key\": \"infoLink\", \"valueString\": \"[More Info](https://www.xianfoods.com/)\" },\n          { \"key\": \"imageUrl\", \"valueString\": \"http://localhost:10002/static/shrimpchowmein.jpeg\" },\n          { \"key\": \"address\", \"valueString\": \"81 St Marks Pl, New York, NY 10003\" }\n        ] },\n        { \"key\": \"item1\", \"valueMap\": [\n          { \"key\": \"name\", \"valueString\": \"Han Dynasty\" },\n          { \"key\": \"rating\", \"valueString\": \"\u2605\u2605\u2605\u2605\u2606\" },\n          { \"key\": \"detail\", \"valueString\": \"Authentic Szechuan cuisine.\" },\n          { \"key\": \"infoLink\", \"valueString\": \"[More Info](https://www.handynasty.net/)\" },\n          { \"key\": \"imageUrl\", \"valueString\": \"http://localhost:10002/static/mapotofu.jpeg\" },\n          { \"key\": \"address\", \"valueString\": \"90 3rd Ave, New York, NY 10003\" }\n        ] },\n        { \"key\": \"item2\", \"valueMap\": [\n          { \"key\": \"name\", \"valueString\": \"RedFarm\" },\n          { \"key\": \"rating\", \"valueString\": \"\u2605\u2605\u2605\u2605\u2606\" },\n          { \"key\": \"detail\", \"valueString\": \"Modern Chinese with a farm-to-table approach.\" },\n          { \"key\": \"infoLink\", \"valueString\": \"[More Info](https://www.redfarmnyc.com/)\" },\n          { \"key\": \"imageUrl\", \"valueString\": \"http://localhost:10002/static/beefbroccoli.jpeg\" },\n          { \"key\": \"address\", \"valueString\": \"529 Hudson St, New York, NY 10014\" }\n        ] },\n        { \"key\": \"item3\", \"valueMap\": [\n          { \"key\": \"name\", \"valueString\": \"Mott 32\" },\n          { \"key\": \"rating\", \"valueString\": \"\u2605\u2605\u2605\u2605\u2605\" },\n          { \"key\": \"detail\", \"valueString\": \"Upscale Cantonese dining.\" },\n          { \"key\": \"infoLink\", \"valueString\": \"[More Info](https://mott32.com/newyork/)\" },\n          { \"key\": \"imageUrl\", \"valueString\": \"http://localhost:10002/static/springrolls.jpeg\" },\n          { \"key\": \"address\", \"valueString\": \"111 W 57th St, New York, NY 10019\" }\n        ] },\n        { \"key\": \"item4\", \"valueMap\": [\n          { \"key\": \"name\", \"valueString\": \"Hwa Yuan Szechuan\" },\n          { \"key\": \"rating\", \"valueString\": \"\u2605\u2605\u2605\u2605\u2606\" },\n          { \"key\": \"detail\", \"valueString\": \"Famous for its cold noodles with sesame sauce.\" },\n          { \"key\": \"infoLink\", \"valueString\": \"[More Info](https://hwayuannyc.com/)\" },\n          { \"key\": \"imageUrl\", \"valueString\": \"http://localhost:10002/static/kungpao.jpeg\" },\n          { \"key\": \"address\", \"valueString\": \"40 E Broadway, New York, NY 10002\" }\n        ] }\n      ] }\n    ]\n  } }\n]"
                };
            }
            return;
        }
        
        // 真实实现代码
        const sessionState = { base_url: this.baseUrl };

        // 获取或创建 Session (对应 Python session_service 逻辑)
        let session = await this._runner.sessionService.getSession({
            appName: this._agent.name,
            userId: this._userId,
            sessionId: sessionId,
        });

        if (!session) {
            console.log(`No session found for sessionId ${sessionId}. Creating a new session by using agent name ${this._agent.name}, user id ${this._userId}, and session state ${JSON.stringify(sessionState)}.`);
            session = await this._runner.sessionService.createSession({
                appName: this._agent.name,
                userId: this._userId,
                state: sessionState,
                sessionId: sessionId,
            });
            console.log(`New session created: ${JSON.stringify(session)}, sessionState: ${session.state} --- ${JSON.stringify(session.state)}`);
        } else if (!session.state.base_url) {
            console.log(`Session ${sessionId} does not have a base_url. Setting it to ${this.baseUrl}`);
            session.state.base_url = this.baseUrl;
        }

        // --- UI Validation and Retry Logic ---
        const maxRetries = 1;
        let attempt = 0;
        let currentQueryText = query;

        if (this.useUi && !this.a2uiSchemaObject) {
            logger.error("A2UI_SCHEMA is not loaded.");
            yield { is_task_complete: true, content: "UI Configuration Error." };
            return;
        }

        while (attempt <= maxRetries) {
            attempt++;
            logger.info(`--- Attempt ${attempt}/${maxRetries + 1} for session ${sessionId} ---`);

            const currentMessage = createUserContent(currentQueryText);
            logger.info(`---Current message: ${JSON.stringify(currentMessage)}`);

            let finalResponseContent = null;

            // 调用官方 Runner 的异步生成器 (对标 Runner.run_async)
            try {
                const stream = this._runner.runAsync({
                    userId: this._userId,
                    sessionId: session.id,
                    newMessage: currentMessage,
                });

                for await (const event of stream) {
                    logger.info(`Event from runner: ${JSON.stringify(event)}`);
                    if (isFinalResponse(event)) {
                        finalResponseContent = event.content?.parts
                            ?.map(p => p.text)
                            .filter(Boolean)
                            .join("\n");
                        break;
                    } else {
                        // 推送中间状态 (Processing Message)
                        yield {
                            is_task_complete: false,
                            updates: this.getProcessingMessage(),
                        };
                    }
                }
            } catch (err) {
                logger.error("Error in ADK runner loop:", err);
            }

            // 处理无响应情况
            if (!finalResponseContent) {
                if (attempt <= maxRetries) {
                    currentQueryText = `I received no response. Please try again. Original request: '${query}'`;
                    continue;
                } else {
                    finalResponseContent = "I'm sorry, I encountered an error.";
                }
            }

            // UI 验证逻辑
            let isValid = false;
            let errorMessage = "";

            if (this.useUi) {
                const validation = this._validateUi(finalResponseContent);
                if (validation.ok) {
                    isValid = true;
                } else {
                    errorMessage = validation.error;
                }
            } else {
                isValid = true;
            }

            if (isValid) {
                yield { is_task_complete: true, content: finalResponseContent };
                return;
            }

            // 失败重试逻辑
            if (attempt <= maxRetries) {
                currentQueryText = `Your previous response was invalid. ${errorMessage} ` +
                    `You MUST generate a valid response that strictly follows the A2UI JSON SCHEMA... ` +
                    `Please retry the original request: '${query}'`;
            }
        }

        yield { is_task_complete: true, content: "I'm sorry, I'm having trouble generating the interface." };
    }

    _validateUi(content) {
        try {
            if (!content.includes("---a2ui_JSON---")) throw new Error("Delimiter not found.");
            const jsonStr = content.split("---a2ui_JSON---")[1].trim()
                .replace(/^```json/, "").replace(/```$/, "").trim();
            
            const parsed = JSON.parse(jsonStr);
            const validate = ajv.compile(this.a2uiSchemaObject);
            if (!validate(parsed)) throw new Error("Schema validation failed.");
            
            return { ok: true };
        } catch (e) {
            return { ok: false, error: e.message };
        }
    }
}

// export default RestaurantAgent;
module.exports = RestaurantAgent;



// // Copyright 2025 Google LLC
// //
// // Licensed under the Apache License, Version 2.0 (the "License");
// // you may not use this file except in compliance with the License.
// // You may obtain a copy of the License at
// //
// //      https://www.apache.org/licenses/LICENSE-2.0
// //
// // Unless required by applicable law or agreed to in writing, software
// // distributed under the License is distributed on an "AS IS" BASIS,
// // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// // See the License for the specific language governing permissions and
// // limitations under the License.

// const { v4: uuidv4 } = require('uuid');
// const { AgentExecutor } = require('@a2a-js/sdk/server');
// const { get_ui_prompt, get_text_prompt, A2UI_SCHEMA, RESTAURANT_UI_EXAMPLES } = require('./prompt_builder');
// const { get_restaurants } = require('./tools');

// // Load jsonschema for validation
// const Ajv = require('ajv');
// const ajv = new Ajv();

// // Agent instruction
// const AGENT_INSTRUCTION = `
//     You are a helpful restaurant finding assistant. Your goal is to help users find and book restaurants using a rich UI.

//     To achieve this, you MUST follow this logic:

//     1.  **For finding restaurants:**
//         a. You MUST call the \`get_restaurants\` tool. Extract the cuisine, location, and a specific number (\`count\`) of restaurants from the user's query (e.g., for "top 5 chinese places", count is 5).
//         b. After receiving the data, you MUST follow the instructions precisely to generate the final a2ui UI JSON, using the appropriate UI example from the \`prompt_builder.js\` based on the number of restaurants.

//     2.  **For booking a table (when you receive a query like 'USER_WANTS_TO_BOOK...'):**
//         a. You MUST use the appropriate UI example from \`prompt_builder.js\` to generate the UI, populating the \`dataModelUpdate.contents\` with the details from the user's query.

//     3.  **For confirming a booking (when you receive a query like 'User submitted a booking...'):**
//         a. You MUST use the appropriate UI example from \`prompt_builder.js\` to generate the confirmation UI, populating the \`dataModelUpdate.contents\` with the final booking details.
// `;

// class RestaurantAgent {
//     constructor(base_url, use_ui = false) {
//         this.base_url = base_url;
//         this.use_ui = use_ui;
//         this.max_retries = 1; // Total 2 attempts
//         this.a2ui_schema_object = null;
//         this.agent = null;
//         this._user_id = "remote_agent";
//         this._runner = {
//             session_service: {
//                 // In-memory session store
//                 _sessions: {},
                
//                 async get_session(app_name, user_id, session_id) {
//                     const key = `${app_name}_${user_id}_${session_id}`;
//                     return this._sessions[key] || null;
//                 },
                
//                 async create_session(app_name, user_id, state, session_id) {
//                     const session = {
//                         id: session_id,
//                         app_name,
//                         user_id,
//                         state
//                     };
//                     const key = `${app_name}_${user_id}_${session_id}`;
//                     this._sessions[key] = session;
//                     return session;
//                 }
//             },
            
//             async *run_async(user_id, session_id, new_message) {
//                 // Simulate running the agent
//                 // In a real implementation, this would call the actual LLM
                
//                 // Simulate some processing time
//                 await new Promise(resolve => setTimeout(resolve, 1000));
                
//                 // Return a mock event with a response
//                 yield {
//                     is_final_response: () => false,
//                     content: null,
//                     intermediate: true
//                 };
                
//                 // Return final response
//                 yield {
//                     is_final_response: () => true,
//                     content: {
//                         parts: [{
//                             text: `
//                                 Here are some restaurants I found for you:
//                                 ---a2ui_JSON---
//                                 [
//                                     {
//                                         "beginRendering": { "surfaceId": "default", "root": "root-column", "styles": { "primaryColor": "#FF0000", "font": "Roboto" } }
//                                     },
//                                     {
//                                         "surfaceUpdate": { "surfaceId": "default", "components": [
//                                             { "id": "root-column", "component": { "Column": { "children": { "explicitList": ["title-heading", "item-list"] } } } },
//                                             { "id": "title-heading", "component": { "Text": { "text": { "literalString": "Restaurants" }, "usageHint": "h1" } } },
//                                             { "id": "item-list", "component": { "List": { "children": { "explicitList": ["restaurant-card"] } } } },
//                                             { "id": "restaurant-card", "component": { "Card": { "child": "restaurant-details" } } },
//                                             { "id": "restaurant-details", "component": { "Column": { "children": { "explicitList": ["restaurant-name", "restaurant-rating"] } } } },
//                                             { "id": "restaurant-name", "component": { "Text": { "text": { "literalString": "Example Restaurant" }, "usageHint": "h2" } } },
//                                             { "id": "restaurant-rating", "component": { "Text": { "text": { "literalString": "★★★★☆" }, "usageHint": "body" } } }
//                                         ] }
//                                     }
//                                 ]
//                                 ---end_a2ui_JSON---
//                             `
//                         }]
//                     },
//                     final: true
//                 };
//             }
//         };
        
//         // Wrap the schema for validation
//         try {
//             // First, load the schema for a *single message*
//             const single_message_schema = JSON.parse(A2UI_SCHEMA);
            
//             // The prompt instructs the LLM to return a *list* of messages.
//             // Therefore, our validation schema must be an *array* of the single message schema.
//             this.a2ui_schema_object = { "type": "array", "items": single_message_schema };
//             console.log("A2UI_SCHEMA successfully loaded and wrapped in an array validator.");
//         } catch (error) {
//             console.error(`CRITICAL: Failed to parse A2UI_SCHEMA: ${error}`);
//             this.a2ui_schema_object = null;
//         }
        
//         // Build the agent
//         this.agent = this._build_agent(use_ui);
//     }
    
//     _build_agent(use_ui) {
//         // Builds the LLM agent for the restaurant agent.
//         const LITELLM_MODEL = process.env.LITELLM_MODEL || "gemini/gemini-2.5-flash";

//         let instruction;
//         if (use_ui) {
//             // Construct the full prompt with UI instructions, examples, and schema
//             instruction = AGENT_INSTRUCTION + get_ui_prompt(
//                 this.base_url, RESTAURANT_UI_EXAMPLES
//             );
//         } else {
//             instruction = get_text_prompt();
//         }

//         // Return a simple agent object with the necessary properties
//         // In a real implementation, this would use an actual LLM client
//         return {
//             model: LITELLM_MODEL,
//             name: "restaurant_agent",
//             description: "An agent that finds restaurants and helps book tables.",
//             instruction: instruction,
//             tools: [get_restaurants]
//         };
//     }

//     get_processing_message() {
//         return "Finding restaurants that match your criteria...";
//     }

//     async *stream(query, session_id) {
//         const session_state = { "base_url": this.base_url };

//         // Get or create session
//         let session = await this._runner.session_service.get_session(
//             this.agent.name,
//             this._user_id,
//             session_id
//         );
        
//         if (session === null) {
//             session = await this._runner.session_service.create_session(
//                 this.agent.name,
//                 this._user_id,
//                 session_state,
//                 session_id
//             );
//         } else if (!session.state || !session.state["base_url"]) {
//             session.state = session.state || {};
//             session.state["base_url"] = this.base_url;
//         }

//         // --- Begin: UI Validation and Retry Logic ---
//         let attempt = 0;
//         let current_query_text = query;

//         // Ensure schema was loaded
//         if (this.use_ui && !this.a2ui_schema_object) {
//             console.error("--- RestaurantAgent.stream: A2UI_SCHEMA is not loaded. Cannot perform UI validation. ---");
            
//             yield {
//                 "is_task_complete": true,
//                 "content": "I'm sorry, I'm facing an internal configuration error with my UI components. Please contact support."
//             };
//             return;
//         }

//         while (attempt <= this.max_retries) {
//             attempt++;
//             console.log(`--- RestaurantAgent.stream: Attempt ${attempt}/${this.max_retries + 1} for session ${session_id} ---`);

//             // Create current message
//             const current_message = {
//                 role: "user",
//                 parts: [{ text: current_query_text }]
//             };
            
//             let final_response_content = null;

//             // Run the agent
//             for await (const event of this._runner.run_async(
//                 this._user_id,
//                 session.id,
//                 current_message
//             )) {
//                 if (event.is_final_response()) {
//                     if (
//                         event.content &&
//                         event.content.parts &&
//                         event.content.parts[0].text
//                     ) {
//                         final_response_content = event.content.parts
//                             .map(p => p.text)
//                             .filter(text => text)
//                             .join("\n");
//                     }
//                     break; // Got the final response, stop consuming events
//                 } else {
//                     console.log(`Intermediate event: ${JSON.stringify(event, null, 2)}`);
//                     // Yield intermediate updates on every attempt
//                     yield {
//                         "is_task_complete": false,
//                         "updates": this.get_processing_message()
//                     };
//                 }
//             }

//             if (final_response_content === null) {
//                 console.warn(
//                     `--- RestaurantAgent.stream: Received no final response content from runner (Attempt ${attempt}). ---`
//                 );
                
//                 if (attempt <= this.max_retries) {
//                     current_query_text = (
//                         "I received no response. Please try again."
//                         + `Please retry the original request: '${query}'`
//                     );
//                     continue; // Go to next retry
//                 } else {
//                     // Retries exhausted on no-response
//                     final_response_content = "I'm sorry, I encountered an error and couldn't process your request.";
//                     // Fall through to send this as a text-only error
//                 }
//             }

//             let is_valid = false;
//             let error_message = "";

//             if (this.use_ui) {
//                 console.log(`--- RestaurantAgent.stream: Validating UI response (Attempt ${attempt})... ---`);
                
//                 try {
//                     if (!final_response_content.includes("---a2ui_JSON---")) {
//                         throw new Error("Delimiter '---a2ui_JSON---' not found.");
//                     }
                    
//                     const [text_part, json_string] = final_response_content.split("---a2ui_JSON---", 2);
                    
//                     if (!json_string.trim()) {
//                         throw new Error("JSON part is empty.");
//                     }
                    
//                     // Clean up the JSON string
//                     const json_string_cleaned = json_string.trim()
//                         .replace(/^```json/, '')
//                         .replace(/```$/, '')
//                         .trim();
                    
//                     if (!json_string_cleaned) {
//                         throw new Error("Cleaned JSON string is empty.");
//                     }
                    
//                     // Parse and validate the JSON
//                     const parsed_json_data = JSON.parse(json_string_cleaned);
                    
//                     // Create validator for this attempt
//                     const validator = ajv.compile(this.a2ui_schema_object);
//                     const valid = validator(parsed_json_data);
                    
//                     if (!valid) {
//                         throw new Error(`Schema validation failed: ${JSON.stringify(validator.errors)}`);
//                     }
                    
//                     console.log(`--- RestaurantAgent.stream: UI JSON successfully parsed AND validated against schema. Validation OK (Attempt ${attempt}). ---`);
//                     is_valid = true;
                    
//                 } catch (error) {
//                     console.error(`--- RestaurantAgent.stream: A2UI validation failed: ${error} (Attempt ${attempt}) ---`);
//                     console.error(`--- Failed response content: ${final_response_content.substring(0, 500)}... ---`);
//                     error_message = `Validation failed: ${error}.`;
//                 }
//             } else {
//                 // Not using UI, so text is always "valid"
//                 is_valid = true;
//             }

//             if (is_valid) {
//                 console.log(`--- RestaurantAgent.stream: Response is valid. Sending final response (Attempt ${attempt}). ---`);
//                 console.log(`Final response: ${final_response_content}`);
                
//                 yield {
//                     "is_task_complete": true,
//                     "content": final_response_content
//                 };
//                 return; // We're done, exit the generator
//             }

//             // --- If we're here, it means validation failed ---

//             if (attempt <= this.max_retries) {
//                 console.warn(
//                     `--- RestaurantAgent.stream: Retrying... (${attempt}/${this.max_retries + 1}) ---`
//                 );
//                 // Prepare the query for the retry
//                 current_query_text = (
//                     `Your previous response was invalid. ${error_message} `
//                     + "You MUST generate a valid response that strictly follows the A2UI JSON SCHEMA. "
//                     + "The response MUST be a JSON list of A2UI messages. "
//                     + "Ensure the response is split by '---a2ui_JSON---' and the JSON part is well-formed. "
//                     + `Please retry the original request: '${query}'`
//                 );
//                 // Loop continues...
//             }
//         }

//         // --- If we're here, it means we've exhausted retries ---
//         console.error(
//             "--- RestaurantAgent.stream: Max retries exhausted. Sending text-only error. ---"
//         );
        
//         yield {
//             "is_task_complete": true,
//             "content": (
//                 "I'm sorry, I'm having trouble generating the interface for that request right now. "
//                 + "Please try again in a moment."
//             ),
//         };
//         // --- End: UI Validation and Retry Logic ---
//     }
// }

// module.exports = RestaurantAgent;

