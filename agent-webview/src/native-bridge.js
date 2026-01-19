/**
 * AgentMessageBus - 语义化的 Native 通信层
 * 替代原有的 HTTP 请求/响应模式
 * 
 * Native Bridge API 对照表:
 * | API | 方向 | 说明 |
 * |-----|------|------|
 * | AgentBridge.injectConfig | Native → WebView | 注入配置 |
 * | AgentBridge.sendUserMessage | Native → WebView | 发送用户消息 |
 * | agentMessageBus.notifyAgentReady | WebView → Native | Agent 就绪 |
 * | agentMessageBus.emitAgentEvent | WebView → Native | 发送事件 |
 * | agentMessageBus.emitAgentError | WebView → Native | 发送错误 |
 */

class AgentMessageBus {
    constructor() {
        this.eventCallbacks = new Map();
        this.pendingRequests = new Map();
        this.requestId = 0;
        
        this._setupNativeReceiver();
    }

    /**
     * 设置 Native 消息接收器
     */
    _setupNativeReceiver() {
        // 暴露全局对象供 Native 调用
        window.AgentBridge = {
            /**
             * Native -> WebView: 接收来自 Native 的响应消息
             * @param {string|Object} jsonStr - JSON 格式的消息
             */
            receiveMessage: (jsonStr) => {
                const data = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
                this._handleIncomingMessage(data);
            },
            
            /**
             * Native -> WebView: 注入配置（API Keys、URLs 等）
             * @param {Object} config - 配置对象
             */
            injectConfig: (config) => {
                console.info('[AgentMessageBus] Config injected from Native');
                this._emit('config-injected', config);
            },
            
            /**
             * Native -> WebView: 发送用户消息给 Agent 处理
             * @param {Object|string} message - 用户消息
             * @param {Object} context - 上下文（sessionId, requestedExtensions 等）
             */
            sendUserMessage: (message, context = {}) => {
                console.info('[AgentMessageBus] User message received from Native');
                this._emit('user-message', { message, context });
            }
        };

        // 兼容 iOS WKWebView 的 evaluateJavaScript 回调
        window.handleNativeResponse = (data) => {
            const parsed = typeof data === 'string' ? JSON.parse(data) : data;
            this._handleIncomingMessage(parsed);
        };

        // React Native WebView 的 onMessage
        window.addEventListener('message', (event) => {
            try {
                const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
                if (data?.source === 'native') {
                    this._handleIncomingMessage(data);
                }
            } catch (e) {
                // 忽略非 JSON 消息
            }
        });
    }

    /**
     * 处理来自 Native 的消息
     */
    _handleIncomingMessage(data) {
        const { requestId, type, payload, error } = data;
        
        // 处理请求响应（带 requestId 的消息）
        if (requestId && this.pendingRequests.has(requestId)) {
            const { resolve, reject } = this.pendingRequests.get(requestId);
            this.pendingRequests.delete(requestId);
            
            if (error) {
                reject(new Error(error));
            } else {
                resolve(payload);
            }
            return;
        }
        
        // 处理事件推送
        if (type) {
            this._emit(type, payload);
        }
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
     * 发送消息到 Native（带响应等待）
     */
    _sendToNative(type, payload) {
        return new Promise((resolve, reject) => {
            const requestId = ++this.requestId;
            
            // 设置超时
            const timeout = setTimeout(() => {
                if (this.pendingRequests.has(requestId)) {
                    this.pendingRequests.delete(requestId);
                    reject(new Error(`Native request timeout: ${type}`));
                }
            }, 30000);

            this.pendingRequests.set(requestId, { 
                resolve: (result) => {
                    clearTimeout(timeout);
                    resolve(result);
                },
                reject: (error) => {
                    clearTimeout(timeout);
                    reject(error);
                }
            });

            this._postMessage({ requestId, type, payload });
        });
    }

    /**
     * 发送消息到 Native（无需等待响应）
     */
    _postToNative(type, payload) {
        this._postMessage({ type, payload });
    }

    /**
     * 底层消息发送
     */
    _postMessage(message) {
        const jsonStr = JSON.stringify(message);

        // iOS WKWebView
        if (window.webkit?.messageHandlers?.AgentMessageBus) {
            window.webkit.messageHandlers.AgentMessageBus.postMessage(jsonStr);
            return;
        }
        
        // Android WebView (@JavascriptInterface)
        if (window.NativeAgentBus?.postMessage) {
            window.NativeAgentBus.postMessage(jsonStr);
            return;
        }
        
        // React Native WebView
        if (window.ReactNativeWebView?.postMessage) {
            window.ReactNativeWebView.postMessage(jsonStr);
            return;
        }

        // 独立运行模式（调试用）
        console.warn('[AgentMessageBus] No native bridge available, message logged:', message);
    }

    // ==================== 语义化 API ====================

    /**
     * 通知 Native: Agent 已就绪，可以接收消息
     * @param {Object} agentCard - Agent 能力描述卡片
     */
    notifyAgentReady(agentCard) {
        console.info('[AgentMessageBus] Notifying Native: Agent ready');
        this._postToNative('agent-ready', { agentCard });
    }

    /**
     * 发送 Agent 事件到 Native
     * 用于发送状态更新、消息响应等 A2A 协议事件
     * @param {Object} event - A2A 协议事件对象
     */
    emitAgentEvent(event) {
        this._postToNative('agent-event', event);
    }

    /**
     * 发送 Agent 错误到 Native
     * @param {Error} error - 错误对象
     */
    emitAgentError(error) {
        console.error('[AgentMessageBus] Agent error:', error);
        this._postToNative('agent-error', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
    }

    /**
     * 监听 Native 发送的事件
     * @param {string} eventType - 事件类型
     * @param {Function} callback - 回调函数
     * 
     * 常用事件类型:
     * - 'config-injected': 配置注入
     * - 'user-message': 用户消息
     */
    on(eventType, callback) {
        if (!this.eventCallbacks.has(eventType)) {
            this.eventCallbacks.set(eventType, []);
        }
        this.eventCallbacks.get(eventType).push(callback);
        return this; // 支持链式调用
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
