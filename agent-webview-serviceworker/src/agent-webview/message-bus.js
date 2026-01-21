/**
 * AgentMessageBus - ServiceWorker 版本的消息总线
 * 移除了对 window 的依赖
 */

class AgentMessageBus {
    constructor() {
        this.eventCallbacks = new Map();
    }

    /**
     * 触发事件
     */
    _emit(eventType, payload) {
        const callbacks = this.eventCallbacks.get(eventType) || [];
        callbacks.forEach(cb => {
            try {
                cb(payload);
            } catch (e) {
                console.error(`[AgentMessageBus] Event handler error for "${eventType}":`, e);
            }
        });
    }

    /**
     * 通知 Agent 已就绪
     * @param {Object} agentCard - Agent 能力描述卡片
     */
    notifyAgentReady(agentCard) {
        console.info('[AgentMessageBus] Agent ready');
        this._emit('agent-ready', { agentCard });
    }

    /**
     * 发送 Agent 事件
     * @param {Object} event - A2A 协议事件对象
     */
    emitAgentEvent(event) {
        this._emit('agent-event', event);
    }

    /**
     * 发送 Agent 错误
     * @param {Error} error - 错误对象
     */
    emitAgentError(error) {
        console.error('[AgentMessageBus] Agent error:', error);
        this._emit('agent-error', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
    }

    /**
     * 监听事件
     * @param {string} eventType - 事件类型
     * @param {Function} callback - 回调函数
     */
    on(eventType, callback) {
        if (!this.eventCallbacks.has(eventType)) {
            this.eventCallbacks.set(eventType, []);
        }
        this.eventCallbacks.get(eventType).push(callback);
        return this;
    }

    /**
     * 移除事件监听
     */
    off(eventType, callback) {
        const callbacks = this.eventCallbacks.get(eventType);
        if (callbacks) {
            const idx = callbacks.indexOf(callback);
            if (idx !== -1) {
                callbacks.splice(idx, 1);
            }
        }
        return this;
    }

    /**
     * 一次性监听
     */
    once(eventType, callback) {
        const wrapper = (payload) => {
            this.off(eventType, wrapper);
            callback(payload);
        };
        return this.on(eventType, wrapper);
    }
}

export const agentMessageBus = new AgentMessageBus();
