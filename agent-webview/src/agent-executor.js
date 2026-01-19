/**
 * RestaurantAgentExecutor - Agent 执行器
 * 从 agent-js/src/agent_executor.js 移植，适配浏览器环境
 */

import { RestaurantAgent } from './agent.js';
import { tryActivateA2UIExtension, createA2UIPart } from './a2ui-extension.js';

/**
 * Restaurant AgentExecutor
 * 实现与 @a2a-js/sdk 的 AgentExecutor 接口兼容
 */
export class RestaurantAgentExecutor {
    /**
     * @param {string} baseUrl - 基础 URL
     */
    constructor(baseUrl) {
        // 实例化两个 Agent：一个用于 UI，一个用于纯文本
        this.uiAgent = new RestaurantAgent(baseUrl, true);
        this.textAgent = new RestaurantAgent(baseUrl, false);
    }

    /**
     * 执行 Agent 逻辑
     * @param {Object} requestContext - 请求上下文
     * @param {Object} eventBus - 事件总线
     */
    async execute(requestContext, eventBus) {
        let query = "";
        let uiEventPart = null;
        let action = null;

        console.info(`--- Client requested extensions: ${requestContext.context?.requestedExtensions || []} ---`);
        const useUI = tryActivateA2UIExtension(requestContext.context);
        console.info(`--- AGENT_EXECUTOR: A2UI extension is ${useUI ? 'active' : 'not active'} ---`);

        // 根据是否激活 A2UI 扩展选择 Agent
        const agent = useUI ? this.uiAgent : this.textAgent;

        // 解析用户消息
        if (requestContext.userMessage && requestContext.userMessage.parts) {
            console.info(`--- Processing ${requestContext.userMessage.parts.length} message parts ---`);
            
            for (let i = 0; i < requestContext.userMessage.parts.length; i++) {
                const part = requestContext.userMessage.parts[i];
                if (part.kind === 'data') {
                    if (part.data && 'userAction' in part.data) {
                        console.info(`  Part ${i}: Found a2ui UI ClientEvent payload.`);
                        uiEventPart = part.data.userAction;
                    } else {
                        console.info(`  Part ${i}: DataPart`);
                    }
                } else if (part.kind === 'text') {
                    console.info(`  Part ${i}: TextPart (${part.text.substring(0, 50)}...)`);
                }
            }
        }

        // 处理 UI 事件或提取文本查询
        if (uiEventPart) {
            console.info(`Received a2ui ClientEvent: ${JSON.stringify(uiEventPart)}`);
            action = uiEventPart.actionName;
            const ctx = uiEventPart.context || {};

            if (action === 'book_restaurant') {
                const restaurantName = ctx.restaurantName || 'Unknown Restaurant';
                const address = ctx.address || 'Address not provided';
                const imageUrl = ctx.imageUrl || '';
                query = `USER_WANTS_TO_BOOK: ${restaurantName}, Address: ${address}, ImageURL: ${imageUrl}`;
            } else if (action === 'submit_booking') {
                const restaurantName = ctx.restaurantName || 'Unknown Restaurant';
                const partySize = ctx.partySize || 'Unknown Size';
                const reservationTime = ctx.reservationTime || 'Unknown Time';
                const dietaryReqs = ctx.dietary || 'None';
                query = `User submitted a booking for ${restaurantName} for ${partySize} people at ${reservationTime} with dietary requirements: ${dietaryReqs}`;
            } else {
                query = `User event: ${action} with data: ${JSON.stringify(ctx)}`;
            }
        } else {
            // 提取文本内容
            query = requestContext.userMessage.parts
                .filter(part => part.kind === 'text')
                .map(part => part.text)
                .join(' ');
        }

        console.info(`--- Final query for LLM: '${query.substring(0, 100)}...' ---`);

        // 构建任务对象
        let task = requestContext.task;
        if (!task) {
            task = {
                id: requestContext.taskId,
                contextId: requestContext.contextId,
                status: {
                    state: 'working',
                    timestamp: new Date().toISOString()
                },
                history: [requestContext.userMessage],
                kind: 'task'
            };
            eventBus.publish(task);
        }

        try {
            // 使用 Agent 的 stream 方法获取结果
            for await (const item of agent.stream(query, task.contextId)) {
                const isTaskComplete = item.is_task_complete;
                
                if (!isTaskComplete) {
                    // 发送中间状态更新
                    const statusUpdate = {
                        kind: 'status-update',
                        taskId: task.id,
                        contextId: task.contextId,
                        status: {
                            state: 'working',
                            message: {
                                kind: 'message',
                                role: 'agent',
                                messageId: `agent-msg-${Date.now()}`,
                                parts: [{ kind: 'text', text: item.updates }],
                                taskId: task.id,
                                contextId: task.contextId
                            },
                            timestamp: new Date().toISOString()
                        },
                        final: false
                    };
                    eventBus.publish(statusUpdate);
                    continue;
                }

                // 处理最终响应
                const finalState = action === 'submit_booking' ? 'completed' : 'input_required';
                const content = item.content;
                const finalParts = [];
                
                // 解析响应内容
                if (content && content.includes('---a2ui_JSON---')) {
                    const [textContent, jsonString] = content.split('---a2ui_JSON---', 2);

                    if (textContent?.trim()) {
                        finalParts.push({ kind: 'text', text: textContent.trim() });
                    }

                    if (jsonString?.trim()) {
                        try {
                            const jsonCleaned = jsonString.trim()
                                .replace(/^```json/, '')
                                .replace(/```$/, '')
                                .trim();
                            
                            const jsonData = JSON.parse(jsonCleaned);

                            if (Array.isArray(jsonData)) {
                                for (const message of jsonData) {
                                    finalParts.push(createA2UIPart(message));
                                }
                            } else {
                                finalParts.push(createA2UIPart(jsonData));
                            }
                        } catch (e) {
                            console.error(`Failed to parse UI JSON: ${e}`);
                            finalParts.push({ kind: 'text', text: jsonString });
                        }
                    }
                } else {
                    finalParts.push({ kind: 'text', text: content?.trim() || '' });
                }

                // 发送最终状态更新
                const finalStatusUpdate = {
                    kind: 'status-update',
                    taskId: task.id,
                    contextId: task.contextId,
                    status: {
                        state: finalState,
                        message: {
                            kind: 'message',
                            role: 'agent',
                            messageId: `agent-final-${Date.now()}`,
                            parts: finalParts,
                            taskId: task.id,
                            contextId: task.contextId
                        },
                        timestamp: new Date().toISOString()
                    },
                    final: finalState === 'completed'
                };

                eventBus.publish(finalStatusUpdate);
                break;
            }
        } catch (error) {
            console.error('Agent execution failed:', error);
            
            // 发送错误状态
            const errorStatusUpdate = {
                kind: 'status-update',
                taskId: task.id,
                contextId: task.contextId,
                status: {
                    state: 'failed',
                    message: {
                        kind: 'message',
                        role: 'agent',
                        messageId: `agent-error-${Date.now()}`,
                        parts: [{ kind: 'text', text: `Agent execution failed: ${error.message}` }],
                        taskId: task.id,
                        contextId: task.contextId
                    },
                    timestamp: new Date().toISOString()
                },
                final: true
            };
            
            eventBus.publish(errorStatusUpdate);
        } finally {
            eventBus.finished();
        }
    }

    /**
     * 取消任务
     */
    async cancelTask(taskId, eventBus) {
        const cancelStatusUpdate = {
            kind: 'status-update',
            taskId: taskId,
            contextId: taskId,
            status: {
                state: 'canceled',
                message: {
                    kind: 'message',
                    role: 'agent',
                    messageId: `agent-cancel-${Date.now()}`,
                    parts: [{ kind: 'text', text: 'Task canceled by user' }],
                    taskId: taskId,
                    contextId: taskId
                },
                timestamp: new Date().toISOString()
            },
            final: true
        };
        
        eventBus.publish(cancelStatusUpdate);
        eventBus.finished();
    }
}

export default RestaurantAgentExecutor;
