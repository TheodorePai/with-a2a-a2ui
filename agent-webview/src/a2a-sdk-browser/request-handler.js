/**
 * BrowserRequestHandler - 浏览器版本的请求处理器
 * 适配自 @a2a-js/sdk/server 的 DefaultRequestHandler
 */

import { nativeTransport } from './native-transport.js';
import { agentMessageBus } from '../native-bridge.js';

export class BrowserRequestHandler {
    /**
     * @param {Object} agentCard - Agent 能力描述卡片
     * @param {Object} taskStore - 任务存储实例
     * @param {Object} agentExecutor - Agent 执行器实例
     */
    constructor(agentCard, taskStore, agentExecutor) {
        this.agentCard = agentCard;
        this.taskStore = taskStore;
        this.agentExecutor = agentExecutor;
        this.isStarted = false;
    }

    /**
     * 启动 Agent（替代 Express app.listen）
     */
    start() {
        if (this.isStarted) {
            console.warn('[BrowserRequestHandler] Agent already started');
            return;
        }
        
        // 注册任务处理
        nativeTransport.onTaskRequest(async (requestContext, eventBus) => {
            console.info('[BrowserRequestHandler] Processing task:', requestContext.taskId);

            // 1. 准备用于收集数据的变量
            // 如果 requestContext.task 存在则使用，否则初始化一个默认的 Task 对象
            let currentTask = requestContext.task || {
                id: requestContext.taskId,
                contextId: requestContext.contextId,
                kind: 'task',
                history: [], 
                status: { state: 'working', timestamp: new Date().toISOString() }
            };

            // 如果是新任务，确保把用户的第一条消息放进 history
            // 检查 history 中是否已存在该消息ID，避免重复
            if (requestContext.userMessage && (!currentTask.history || !currentTask.history.find(m => m.messageId === requestContext.userMessage.messageId))) {
                if (!currentTask.history) currentTask.history = [];
                currentTask.history.push(requestContext.userMessage);
            }

            // 2. 创建一个代理 EventBus 来拦截事件
            const interceptedEventBus = {
                publish: (event) => {
                    // A. 照常发送流式事件
                    eventBus.publish(event);

                    // B. 拦截并更新本地状态
                    if (event.kind === 'task') {
                        // AgentExecutor 初始化了任务
                        currentTask = { ...currentTask, ...event };
                    } 
                    else if (event.kind === 'status-update') {
                        // 更新状态
                        if (currentTask.status) {
                            currentTask.status = { ...currentTask.status, ...event.status };
                        } else {
                            currentTask.status = event.status;
                        }
                        
                        // 如果状态更新中包含了一条新的 Agent 消息，将其加入历史记录
                        if (event.status.message && event.status.message.role === 'agent') {
                             if (!currentTask.history) currentTask.history = [];
                             // 避免重复添加（以防万一）
                             if (!currentTask.history.find(m => m.messageId === event.status.message.messageId)) {
                                 currentTask.history.push(event.status.message);
                             }
                        }
                    }
                },
                finished: () => {
                    // C. 执行完成，组装最终的大 JSON
                    // 模拟 agent-js 的 JSON-RPC 响应格式
                    const fullResponse = {
                        id: 1, // 这里可以使用 requestContext.taskId 或其他标识
                        jsonrpc: "2.0",
                        result: currentTask
                    };

                    console.info('[BrowserRequestHandler] Sending full aggregated response');
                    
                    // 发送这个特殊的完整响应事件
                    // 注意：这里使用的是 'full-response' 类型，Native 端需要监听此类型
                    agentMessageBus.emitFullResponse(fullResponse);

                    // 通知原生传输层结束
                    eventBus.finished();
                }
            };
            
            try {
                await this.agentExecutor.execute(requestContext, interceptedEventBus);
            } catch (error) {
                console.error('[BrowserRequestHandler] Execution error:', error);
                
                // 发送错误状态更新
                interceptedEventBus.publish({
                    kind: 'status-update',
                    taskId: requestContext.taskId,
                    contextId: requestContext.contextId,
                    status: {
                        state: 'failed',
                        message: {
                            kind: 'message',
                            role: 'agent',
                            messageId: `error-${Date.now()}`,
                            parts: [{ kind: 'text', text: `Error: ${error.message}` }]
                        },
                        timestamp: new Date().toISOString()
                    },
                    final: true
                });
                
                interceptedEventBus.finished();
            }
        });

        // 通知 Native Agent 已就绪
        agentMessageBus.notifyAgentReady(this.agentCard);
        
        this.isStarted = true;
        console.info('[BrowserRequestHandler] Agent started:', this.agentCard.name);
    }

    /**
     * 获取 Agent Card
     */
    getAgentCard() {
        return this.agentCard;
    }

    /**
     * 检查是否已启动
     */
    isRunning() {
        return this.isStarted;
    }
}
