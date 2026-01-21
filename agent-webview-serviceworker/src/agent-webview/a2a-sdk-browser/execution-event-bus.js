/**
 * DefaultExecutionEventBus - 事件总线
 */

export class DefaultExecutionEventBus {
    constructor() {
        this.eventListeners = [];
        this.finishedListeners = [];
    }

    /**
     * 发布事件
     * @param {Object} event - AgentExecutionEvent
     */
    publish(event) {
        this.eventListeners.forEach(listener => {
            try {
                listener(event);
            } catch (e) {
                console.error('[DefaultExecutionEventBus] Event handler error:', e);
            }
        });
    }

    /**
     * 标记执行完成
     */
    finished() {
        this.finishedListeners.forEach(listener => {
            try {
                listener();
            } catch (e) {
                console.error('[DefaultExecutionEventBus] Finished handler error:', e);
            }
        });
    }

    /**
     * 添加事件监听器
     * @param {string} eventName - 'event' | 'finished'
     * @param {Function} listener
     * @returns {this}
     */
    on(eventName, listener) {
        if (eventName === 'finished') {
            this.finishedListeners.push(listener);
        } else {
            this.eventListeners.push(listener);
        }
        return this;
    }

    /**
     * 移除事件监听器
     * @param {string} eventName 
     * @param {Function} listener 
     * @returns {this}
     */
    off(eventName, listener) {
        if (eventName === 'finished') {
            const idx = this.finishedListeners.indexOf(listener);
            if (idx !== -1) this.finishedListeners.splice(idx, 1);
        } else {
            const idx = this.eventListeners.indexOf(listener);
            if (idx !== -1) this.eventListeners.splice(idx, 1);
        }
        return this;
    }

    /**
     * 一次性监听器
     * @param {string} eventName 
     * @param {Function} listener 
     * @returns {this}
     */
    once(eventName, listener) {
        const wrapper = (data) => {
            this.off(eventName, wrapper);
            listener(data);
        };
        return this.on(eventName, wrapper);
    }

    /**
     * 移除所有监听器
     * @param {string} [eventName]
     * @returns {this}
     */
    removeAllListeners(eventName) {
        if (!eventName || eventName === 'event') {
            this.eventListeners = [];
        }
        if (!eventName || eventName === 'finished') {
            this.finishedListeners = [];
        }
        return this;
    }
}

/**
 * ExecutionEventBusManager - 管理多个 EventBus 实例
 */
export class DefaultExecutionEventBusManager {
    constructor() {
        this.taskIdToBus = new Map();
    }

    /**
     * 创建或获取指定任务的 EventBus
     * @param {string} taskId 
     * @returns {DefaultExecutionEventBus}
     */
    createOrGetByTaskId(taskId) {
        if (!this.taskIdToBus.has(taskId)) {
            this.taskIdToBus.set(taskId, new DefaultExecutionEventBus());
        }
        return this.taskIdToBus.get(taskId);
    }

    /**
     * 获取指定任务的 EventBus
     * @param {string} taskId 
     * @returns {DefaultExecutionEventBus|undefined}
     */
    getByTaskId(taskId) {
        return this.taskIdToBus.get(taskId);
    }

    /**
     * 清理指定任务的 EventBus
     * @param {string} taskId 
     */
    cleanupByTaskId(taskId) {
        const bus = this.taskIdToBus.get(taskId);
        if (bus) {
            bus.removeAllListeners();
            this.taskIdToBus.delete(taskId);
        }
    }
}
