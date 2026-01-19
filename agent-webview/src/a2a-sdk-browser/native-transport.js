/**
 * NativeTransport - 用 Native Bridge 替代 HTTP 传输
 * 实现与 @a2a-js/sdk 相同的接口，但底层使用消息传递
 */

import { agentMessageBus } from '../native-bridge.js';

export class NativeTransport {
    constructor() {
        this.taskHandlers = [];
    }

    /**
     * 注册任务处理器（替代 Express 路由）
     * @param {Function} handler - async (requestContext, eventBus) => void
     */
    onTaskRequest(handler) {
        this.taskHandlers.push(handler);
        
        // 监听来自 Native 的用户消息
        agentMessageBus.on('user-message', async ({ message, context }) => {
            console.info('[NativeTransport] Received user message');
            
            try {
                // 构造 A2A 协议格式的请求上下文
                const requestContext = this._buildRequestContext(message, context);
                
                // 创建事件总线
                const eventBus = this._createEventBus(requestContext);
                
                // 调用所有处理器
                for (const h of this.taskHandlers) {
                    await h(requestContext, eventBus);
                }
            } catch (error) {
                console.error('[NativeTransport] Handler error:', error);
                agentMessageBus.emitAgentError(error);
            }
        });
    }

    /**
     * 构建 A2A 请求上下文
     */
    _buildRequestContext(message, context) {
        const taskId = context.taskId || `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const contextId = context.contextId || context.sessionId || taskId;
        
        return {
            taskId,
            contextId,
            userMessage: this._normalizeMessage(message, taskId, contextId),
            task: context.task || null,
            context: {
                requestedExtensions: context.requestedExtensions || []
            }
        };
    }

    /**
     * 规范化消息格式为 A2A 协议格式
     */
    _normalizeMessage(message, taskId, contextId) {
        // 如果是字符串，转换为 A2A 消息格式
        if (typeof message === 'string') {
            return {
                kind: 'message',
                role: 'user',
                messageId: `msg-${Date.now()}`,
                parts: [{ kind: 'text', text: message }],
                taskId,
                contextId
            };
        }
        
        // 如果已经是消息对象，确保有必要字段
        if (!message.kind) {
            message.kind = 'message';
        }
        if (!message.role) {
            message.role = 'user';
        }
        if (!message.messageId) {
            message.messageId = `msg-${Date.now()}`;
        }
        if (!message.parts && message.text) {
            message.parts = [{ kind: 'text', text: message.text }];
        }
        
        return {
            ...message,
            taskId: message.taskId || taskId,
            contextId: message.contextId || contextId
        };
    }

    /**
     * 创建事件总线（用于发布 A2A 事件）
     */
    _createEventBus(requestContext) {
        return {
            /**
             * 发布事件到 Native
             * @param {Object} event - A2A 协议事件
             */
            publish: (event) => {
                // 确保事件包含任务信息
                const enrichedEvent = {
                    ...event,
                    taskId: event.taskId || requestContext.taskId,
                    contextId: event.contextId || requestContext.contextId
                };
                agentMessageBus.emitAgentEvent(enrichedEvent);
            },
            
            /**
             * 标记执行完成
             */
            finished: () => {
                agentMessageBus.emitAgentEvent({ 
                    type: 'execution-finished',
                    taskId: requestContext.taskId,
                    contextId: requestContext.contextId
                });
            }
        };
    }
}

// 导出单例
export const nativeTransport = new NativeTransport();
