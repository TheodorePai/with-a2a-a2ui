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
            
            try {
                await this.agentExecutor.execute(requestContext, eventBus);
            } catch (error) {
                console.error('[BrowserRequestHandler] Execution error:', error);
                
                // 发送错误状态更新
                eventBus.publish({
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
                
                eventBus.finished();
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
