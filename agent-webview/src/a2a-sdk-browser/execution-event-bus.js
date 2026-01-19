/**
 * DefaultExecutionEventBus - 与 @a2a-js/sdk 兼容的事件总线
 * 
 * 实现 @a2a-js/sdk/server 的 ExecutionEventBus 接口：
 * - publish(event: AgentExecutionEvent): void
 * - on(eventName: ExecutionEventName, listener): this
 * - off(eventName: ExecutionEventName, listener): this
 * - once(eventName: ExecutionEventName, listener): this
 * - removeAllListeners(eventName?: ExecutionEventName): this
 * - finished(): void
 * 
 * 事件名称 (ExecutionEventName): 'event' | 'finished'
 * 
 * AgentExecutionEvent 类型:
 * - Message
 * - Task
 * - TaskStatusUpdateEvent
 * - TaskArtifactUpdateEvent
 */

export class DefaultExecutionEventBus extends EventTarget {
    constructor() {
        super();
        this.eventListeners = new Map();
        this.finishedListeners = new Map();
    }

    /**
     * 发布 Agent 执行事件
     * @param {Object} event - AgentExecutionEvent
     */
    publish(event) {
        const customEvent = new CustomEvent('event', { detail: event });
        this.dispatchEvent(customEvent);
    }

    /**
     * 标记执行完成
     */
    finished() {
        const customEvent = new CustomEvent('finished', { detail: undefined });
        this.dispatchEvent(customEvent);
    }

    /**
     * 添加事件监听器 (EventEmitter 兼容方法)
     * @param {string} eventName - 'event' | 'finished'
     * @param {Function} listener - 回调函数
     * @returns {this}
     */
    on(eventName, listener) {
        const wrappedListener = (e) => {
            listener(e.detail);
        };
        
        // 存储映射以便后续移除
        this._trackListener(eventName, listener, wrappedListener);
        this.addEventListener(eventName, wrappedListener);
        
        return this;
    }

    /**
     * 移除事件监听器
     * @param {string} eventName 
     * @param {Function} listener 
     * @returns {this}
     */
    off(eventName, listener) {
        const store = eventName === 'finished' ? this.finishedListeners : this.eventListeners;
        const wrappedListeners = store.get(listener);
        
        if (wrappedListeners && wrappedListeners.length > 0) {
            const wrappedListener = wrappedListeners.shift();
            this.removeEventListener(eventName, wrappedListener);
            
            if (wrappedListeners.length === 0) {
                store.delete(listener);
            }
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
        const wrappedListener = (e) => {
            this._untrackWrappedListener(eventName, listener, wrappedListener);
            listener(e.detail);
        };
        
        this._trackListener(eventName, listener, wrappedListener);
        this.addEventListener(eventName, wrappedListener, { once: true });
        
        return this;
    }

    /**
     * 移除所有监听器
     * @param {string} [eventName] - 可选，不传则移除所有
     * @returns {this}
     */
    removeAllListeners(eventName) {
        if (!eventName) {
            // 移除所有
            this._removeAllForEvent('event');
            this._removeAllForEvent('finished');
        } else {
            this._removeAllForEvent(eventName);
        }
        return this;
    }

    /**
     * 跟踪 listener 到 wrappedListener 的映射
     */
    _trackListener(eventName, listener, wrappedListener) {
        const store = eventName === 'finished' ? this.finishedListeners : this.eventListeners;
        
        if (!store.has(listener)) {
            store.set(listener, []);
        }
        store.get(listener).push(wrappedListener);
    }

    /**
     * 取消跟踪 wrapped listener
     */
    _untrackWrappedListener(eventName, listener, wrappedListener) {
        const store = eventName === 'finished' ? this.finishedListeners : this.eventListeners;
        const wrappedListeners = store.get(listener);
        
        if (wrappedListeners) {
            const idx = wrappedListeners.indexOf(wrappedListener);
            if (idx !== -1) {
                wrappedListeners.splice(idx, 1);
            }
            if (wrappedListeners.length === 0) {
                store.delete(listener);
            }
        }
    }

    /**
     * 移除特定事件的所有监听器
     */
    _removeAllForEvent(eventName) {
        const store = eventName === 'finished' ? this.finishedListeners : this.eventListeners;
        
        for (const [listener, wrappedListeners] of store.entries()) {
            for (const wrappedListener of wrappedListeners) {
                this.removeEventListener(eventName, wrappedListener);
            }
        }
        
        store.clear();
    }
}

/**
 * ExecutionEventBusManager - 管理多个 EventBus 实例
 * 与 @a2a-js/sdk 的 DefaultExecutionEventBusManager 接口一致
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
