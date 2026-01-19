/**
 * Agent WebView 入口文件
 * 使用 A2A SDK 浏览器适配层，保持 A2A 协议能力
 */

import { BrowserRequestHandler, InMemoryTaskStore, agentMessageBus } from './a2a-sdk-browser/index.js';
import { configManager } from './config.js';
import { A2UI_EXTENSION_URL } from './a2ui-extension.js';

// Agent Executor 将在初始化时动态导入
let RestaurantAgentExecutor = null;

/**
 * 生成唯一会话 ID
 */
function generateSessionId() {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * AgentWebView 主类
 * 作为全局对象暴露给 Native 调用
 */
class AgentWebViewInstance {
    constructor() {
        this.requestHandler = null;
        this.sessionId = generateSessionId();
        this.isInitialized = false;
        this.agentCard = null;

        // 监听 Native 的配置注入
        agentMessageBus.on('config-injected', (config) => {
            console.info('[AgentWebView] Config injected from Native');
            configManager.setConfig(config);
        });
    }

    /**
     * 初始化 Agent（由 Native 调用）
     * @param {Object} config - 配置对象
     */
    async initialize(config) {
        try {
            console.info('[AgentWebView] Initializing...');
            
            // 设置配置
            configManager.setConfig(config);
            
            const baseUrl = config.baseUrl || config.BASE_URL || '';
            
            // 动态导入 AgentExecutor（避免循环依赖）
            if (!RestaurantAgentExecutor) {
                const module = await import('./agent-executor.js');
                RestaurantAgentExecutor = module.default || module.RestaurantAgentExecutor;
            }

            // 构建 Agent Card
            this.agentCard = this._buildAgentCard(baseUrl);
            
            // 创建 A2A 组件
            const taskStore = new InMemoryTaskStore();
            const agentExecutor = new RestaurantAgentExecutor(baseUrl);
            
            // 创建请求处理器
            this.requestHandler = new BrowserRequestHandler(
                this.agentCard,
                taskStore,
                agentExecutor
            );
            
            // 启动 Agent（会自动通知 Native）
            this.requestHandler.start();
            
            this.isInitialized = true;
            console.info('[AgentWebView] Initialized successfully');
            
            return { success: true, sessionId: this.sessionId, agentCard: this.agentCard };
        } catch (error) {
            console.error('[AgentWebView] Initialization failed:', error);
            agentMessageBus.emitAgentError(error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 构建 Agent Card
     */
    _buildAgentCard(baseUrl) {
        return {
            name: 'Restaurant Agent',
            description: 'This agent helps find restaurants based on user criteria.',
            url: baseUrl,
            version: '1.0.0',
            defaultInputModes: ['text/plain', 'application/json'],
            defaultOutputModes: ['text/plain', 'application/json'],
            capabilities: {
                streaming: true,
                extensions: [
                    {
                        uri: A2UI_EXTENSION_URL,
                        description: 'Provides agent driven UI using the A2UI JSON format.'
                    }
                ]
            },
            skills: [
                {
                    id: 'find_restaurants',
                    name: 'Find Restaurants Tool',
                    description: 'Helps find restaurants based on user criteria (e.g., cuisine, location).',
                    tags: ['restaurant', 'finder'],
                    examples: ['Find me the top 10 chinese restaurants in the US']
                }
            ]
        };
    }

    /**
     * 发送简单文本消息（便捷方法）
     * 实际会通过 Native Bridge 触发 AgentBridge.sendUserMessage
     * @param {string} text - 文本内容
     * @param {boolean} useUI - 是否使用 UI 模式
     */
    async sendTextMessage(text, useUI = true) {
        if (!this.isInitialized) {
            throw new Error('Agent not initialized');
        }

        const message = {
            kind: 'message',
            role: 'user',
            parts: [{ kind: 'text', text }]
        };
        
        const context = {
            sessionId: this.sessionId,
            requestedExtensions: useUI ? [A2UI_EXTENSION_URL] : []
        };
        
        // 直接触发用户消息事件（模拟 Native 调用）
        window.AgentBridge.sendUserMessage(message, context);
    }

    /**
     * 发送 UI 事件（便捷方法）
     * @param {string} actionName - 动作名称
     * @param {Object} actionContext - 动作上下文
     */
    async sendUIEvent(actionName, actionContext = {}) {
        if (!this.isInitialized) {
            throw new Error('Agent not initialized');
        }

        const message = {
            kind: 'message',
            role: 'user',
            parts: [{
                kind: 'data',
                data: {
                    userAction: {
                        actionName,
                        context: actionContext
                    }
                }
            }]
        };
        
        window.AgentBridge.sendUserMessage(message, {
            sessionId: this.sessionId,
            requestedExtensions: [A2UI_EXTENSION_URL]
        });
    }

    /**
     * 重置会话
     */
    resetSession() {
        this.sessionId = generateSessionId();
        console.info(`[AgentWebView] Session reset: ${this.sessionId}`);
        return { sessionId: this.sessionId };
    }

    /**
     * 监听 Agent 事件（便捷方法）
     * @param {string} eventType - 事件类型
     * @param {Function} callback - 回调函数
     */
    on(eventType, callback) {
        agentMessageBus.on(eventType, callback);
        return this;
    }

    /**
     * 移除事件监听
     */
    off(eventType, callback) {
        agentMessageBus.off(eventType, callback);
        return this;
    }

    /**
     * 获取状态信息
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            sessionId: this.sessionId,
            agentCard: this.agentCard
        };
    }

    /**
     * 获取 Agent Card
     */
    getAgentCard() {
        return this.agentCard;
    }
}

// 创建全局实例
const agentWebView = new AgentWebViewInstance();

// 暴露到全局对象
if (typeof window !== 'undefined') {
    window.AgentWebView = agentWebView;
}

// 导出供模块化使用
export { 
    agentWebView as default,
    AgentWebViewInstance,
    configManager,
    agentMessageBus,
    A2UI_EXTENSION_URL
};

// 导出 A2A SDK 浏览器适配层
export * from './a2a-sdk-browser/index.js';

// 导出测试工具
export * from './testing/index.js';
