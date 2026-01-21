/**
 * Agent WebView 入口文件 - ServiceWorker 版本
 * 适配 ServiceWorker 环境，移除对 window 的依赖
 */

import { BrowserRequestHandler, InMemoryTaskStore, agentMessageBus } from './a2a-sdk-browser/index.js';
import { configManager } from './config.js';
import { A2UI_EXTENSION_URL } from './a2ui-extension.js';
import { RestaurantAgentExecutor } from './agent-executor.js';

/**
 * 生成唯一会话 ID
 */
function generateSessionId() {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * AgentWebView 主类
 * ServiceWorker 环境下的实现
 */
class AgentWebViewInstance {
    constructor() {
        this.requestHandler = null;
        this.sessionId = generateSessionId();
        this.isInitialized = false;
        this.agentCard = null;

        // 监听配置注入
        agentMessageBus.on('config-injected', (config) => {
            console.info('[AgentWebView] Config injected');
            configManager.setConfig(config);
        });
    }

    /**
     * 初始化 Agent
     * @param {Object} config - 配置对象
     */
    async initialize(config) {
        try {
            console.info('[AgentWebView] Initializing...');
            
            // 设置配置
            configManager.setConfig(config);
            
            const baseUrl = config.baseUrl || config.BASE_URL || 'http://localhost:10002';

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
            
            // 启动 Agent
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
     * 处理用户消息
     * @param {Object} message - A2A 消息
     * @param {Object} context - 上下文
     */
    async handleUserMessage(message, context = {}) {
        if (!this.isInitialized) {
            throw new Error('Agent not initialized');
        }

        // 触发用户消息事件
        agentMessageBus._emit('user-message', { message, context });
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
     * 监听 Agent 事件
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

// 导出实例和相关模块（作为实例的属性，供 IIFE 格式使用）
agentWebView.agentWebView = agentWebView;
agentWebView.AgentWebViewInstance = AgentWebViewInstance;
agentWebView.configManager = configManager;
agentWebView.agentMessageBus = agentMessageBus;
agentWebView.A2UI_EXTENSION_URL = A2UI_EXTENSION_URL;

// 只导出 default（IIFE 格式需要单一导出）
export default agentWebView;
