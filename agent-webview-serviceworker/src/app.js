/**
 * App 主入口 - 前端应用
 * 
 * 职责：
 * 1. 注册 ServiceWorker
 * 2. 初始化 Agent
 * 3. 提供用户界面
 * 4. 处理用户交互
 */

// A2UI 扩展 URL
const A2UI_EXTENSION_URL = 'https://a2ui.org/a2a-extension/a2ui/v0.8';

/**
 * ServiceWorker 控制器
 */
class ServiceWorkerController {
    constructor() {
        this.registration = null;
        this.ready = false;
        this.eventListeners = new Map();
    }

    /**
     * 注册并初始化 ServiceWorker
     */
    async register() {
        if (!('serviceWorker' in navigator)) {
            throw new Error('ServiceWorker is not supported in this browser');
        }

        try {
            console.log('[App] Registering ServiceWorker...');
            
            this.registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/'
            });
            
            console.log('[App] ServiceWorker registered:', this.registration);
            
            // 等待 ServiceWorker 激活
            await this.waitForActivation();
            
            // 监听来自 ServiceWorker 的消息
            this.setupMessageListener();
            
            this.ready = true;
            console.log('[App] ServiceWorker ready');
            
            return this.registration;
            
        } catch (error) {
            console.error('[App] ServiceWorker registration failed:', error);
            throw error;
        }
    }

    /**
     * 等待 ServiceWorker 激活
     */
    async waitForActivation() {
        return new Promise((resolve) => {
            if (this.registration.active) {
                resolve();
                return;
            }
            
            const worker = this.registration.installing || this.registration.waiting;
            if (!worker) {
                resolve();
                return;
            }
            
            worker.addEventListener('statechange', () => {
                if (worker.state === 'activated') {
                    resolve();
                }
            });
        });
    }

    /**
     * 设置消息监听器
     */
    setupMessageListener() {
        navigator.serviceWorker.addEventListener('message', (event) => {
            const { type, payload } = event.data;
            this.emit(type, payload);
        });
    }

    /**
     * 向 ServiceWorker 发送消息
     */
    postMessage(type, payload) {
        if (!this.registration || !this.registration.active) {
            console.warn('[App] ServiceWorker not active');
            return;
        }
        
        this.registration.active.postMessage({ type, payload });
    }

    /**
     * 初始化 Agent
     */
    async initAgent(config) {
        return new Promise((resolve, reject) => {
            // 监听初始化结果
            const onReady = (payload) => {
                this.off('AGENT_READY', onReady);
                this.off('AGENT_ERROR', onError);
                resolve(payload);
            };
            
            const onError = (payload) => {
                this.off('AGENT_READY', onReady);
                this.off('AGENT_ERROR', onError);
                reject(new Error(payload.message));
            };
            
            this.on('AGENT_READY', onReady);
            this.on('AGENT_ERROR', onError);
            
            // 发送初始化消息
            this.postMessage('INIT_AGENT', config);
        });
    }

    /**
     * 设置配置
     */
    setConfig(config) {
        this.postMessage('SET_CONFIG', config);
    }

    /**
     * 获取状态
     */
    async getStatus() {
        return new Promise((resolve) => {
            const onStatus = (payload) => {
                this.off('STATUS', onStatus);
                resolve(payload);
            };
            
            this.on('STATUS', onStatus);
            this.postMessage('GET_STATUS');
        });
    }

    /**
     * 事件发射
     */
    emit(type, payload) {
        const listeners = this.eventListeners.get(type) || [];
        listeners.forEach(listener => listener(payload));
    }

    /**
     * 添加事件监听
     */
    on(type, listener) {
        if (!this.eventListeners.has(type)) {
            this.eventListeners.set(type, []);
        }
        this.eventListeners.get(type).push(listener);
        return this;
    }

    /**
     * 移除事件监听
     */
    off(type, listener) {
        const listeners = this.eventListeners.get(type);
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
        return this;
    }
}

/**
 * Agent 客户端
 * 通过 fetch 与 localhost:10002 通信，由 ServiceWorker 拦截处理
 */
class AgentClient {
    constructor() {
        this.baseUrl = 'http://localhost:10002';
        this.sessionId = this.generateSessionId();
    }

    /**
     * 生成会话 ID
     */
    generateSessionId() {
        return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 获取 Agent Card
     */
    async getAgentCard() {
        const response = await fetch(`${this.baseUrl}/agent-card`);
        return response.json();
    }

    /**
     * 发送消息给 Agent（SSE 流式响应）
     */
    async sendMessage(text, useUI = true, onEvent) {
        const message = {
            kind: 'message',
            role: 'user',
            parts: [{ kind: 'text', text }]
        };

        const requestBody = {
            message,
            sessionId: this.sessionId,
            requestedExtensions: useUI ? [A2UI_EXTENSION_URL] : []
        };

        const response = await fetch(`${this.baseUrl}/a2a`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        // 处理 SSE 流
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            
            // 解析 SSE 数据
            const lines = buffer.split('\n');
            buffer = lines.pop(); // 保留不完整的行
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const event = JSON.parse(line.slice(6));
                        onEvent?.(event);
                    } catch (e) {
                        console.warn('[AgentClient] Failed to parse SSE data:', line);
                    }
                }
            }
        }
    }

    /**
     * 发送 UI 事件
     */
    async sendUIEvent(actionName, actionContext = {}, onEvent) {
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

        const requestBody = {
            message,
            sessionId: this.sessionId,
            requestedExtensions: [A2UI_EXTENSION_URL]
        };

        const response = await fetch(`${this.baseUrl}/a2a`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        // 处理 SSE 流
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            
            const lines = buffer.split('\n');
            buffer = lines.pop();
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const event = JSON.parse(line.slice(6));
                        onEvent?.(event);
                    } catch (e) {
                        console.warn('[AgentClient] Failed to parse SSE data:', line);
                    }
                }
            }
        }
    }

    /**
     * 重置会话
     */
    resetSession() {
        this.sessionId = this.generateSessionId();
        console.log('[AgentClient] Session reset:', this.sessionId);
    }

    /**
     * 健康检查
     */
    async healthCheck() {
        const response = await fetch(`${this.baseUrl}/health`);
        return response.json();
    }
}

/**
 * UI 管理器
 */
class UIManager {
    constructor() {
        this.chatContainer = null;
        this.inputField = null;
        this.sendButton = null;
        this.configPanel = null;
    }

    /**
     * 初始化 UI
     */
    init() {
        this.chatContainer = document.getElementById('chat-container');
        this.inputField = document.getElementById('message-input');
        this.sendButton = document.getElementById('send-button');
        this.configPanel = document.getElementById('config-panel');
        
        // 状态指示器
        this.statusIndicator = document.getElementById('status-indicator');
    }

    /**
     * 添加消息到聊天区域
     */
    addMessage(role, content, isUI = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${role}`;
        
        if (isUI) {
            // 渲染 A2UI 组件
            messageDiv.innerHTML = this.renderA2UI(content);
        } else {
            messageDiv.textContent = content;
        }
        
        this.chatContainer.appendChild(messageDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    /**
     * 添加加载指示器
     */
    addLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message message-loading';
        loadingDiv.id = 'loading-indicator';
        loadingDiv.innerHTML = '<span class="loading-dots">思考中...</span>';
        this.chatContainer.appendChild(loadingDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    /**
     * 移除加载指示器
     */
    removeLoading() {
        const loading = document.getElementById('loading-indicator');
        if (loading) {
            loading.remove();
        }
    }

    /**
     * 渲染 A2UI 组件（简化版）
     */
    renderA2UI(data) {
        if (typeof data === 'string') {
            return `<div class="a2ui-text">${data}</div>`;
        }
        
        // 处理 A2UI JSON 数据
        if (Array.isArray(data)) {
            return data.map(item => this.renderA2UIMessage(item)).join('');
        }
        
        return this.renderA2UIMessage(data);
    }

    /**
     * 渲染单个 A2UI 消息
     */
    renderA2UIMessage(message) {
        if (message.beginRendering) {
            return `<div class="a2ui-surface" data-surface-id="${message.beginRendering.surfaceId}">`;
        }
        
        if (message.surfaceUpdate) {
            const { components } = message.surfaceUpdate;
            return components.map(c => this.renderComponent(c)).join('');
        }
        
        if (message.dataModelUpdate) {
            // 数据更新，触发重新渲染
            return '';
        }
        
        return `<pre>${JSON.stringify(message, null, 2)}</pre>`;
    }

    /**
     * 渲染组件
     */
    renderComponent(component) {
        const { id, component: comp } = component;
        
        if (comp.Text) {
            const text = comp.Text.text?.literalString || comp.Text.text?.path || '';
            const hint = comp.Text.usageHint || 'body';
            return `<div class="a2ui-text a2ui-${hint}" data-id="${id}">${text}</div>`;
        }
        
        if (comp.Image) {
            const url = comp.Image.url?.literalString || comp.Image.url?.path || '';
            return `<img class="a2ui-image" data-id="${id}" src="${url}" />`;
        }
        
        if (comp.Button) {
            const action = comp.Button.action?.name || 'unknown';
            return `<button class="a2ui-button" data-id="${id}" data-action="${action}">按钮</button>`;
        }
        
        if (comp.Card) {
            return `<div class="a2ui-card" data-id="${id}"></div>`;
        }
        
        if (comp.Column || comp.Row) {
            const direction = comp.Column ? 'column' : 'row';
            return `<div class="a2ui-${direction}" data-id="${id}"></div>`;
        }
        
        return `<div class="a2ui-unknown" data-id="${id}">${JSON.stringify(comp)}</div>`;
    }

    /**
     * 更新状态指示器
     */
    setStatus(status, message) {
        if (this.statusIndicator) {
            this.statusIndicator.className = `status-indicator status-${status}`;
            this.statusIndicator.textContent = message;
        }
    }

    /**
     * 获取输入内容
     */
    getInput() {
        return this.inputField.value.trim();
    }

    /**
     * 清空输入
     */
    clearInput() {
        this.inputField.value = '';
    }

    /**
     * 禁用/启用输入
     */
    setInputEnabled(enabled) {
        this.inputField.disabled = !enabled;
        this.sendButton.disabled = !enabled;
    }
}

/**
 * 应用主类
 */
class App {
    constructor() {
        this.swController = new ServiceWorkerController();
        this.agentClient = new AgentClient();
        this.uiManager = new UIManager();
        this.useUI = true;
    }

    /**
     * 初始化应用
     */
    async init() {
        console.log('[App] Initializing...');
        
        // 初始化 UI
        this.uiManager.init();
        this.uiManager.setStatus('loading', '正在初始化...');
        
        try {
            // 注册 ServiceWorker
            await this.swController.register();
            this.uiManager.setStatus('loading', 'ServiceWorker 已就绪');
            
            // 从本地存储获取配置
            const savedConfig = this.loadConfig();
            
            if (savedConfig && savedConfig.apiKey) {
                // 使用保存的配置初始化 Agent
                await this.initializeAgent(savedConfig);
            } else {
                // 显示配置面板
                this.showConfigPanel();
            }
            
            // 绑定事件
            this.bindEvents();
            
            console.log('[App] Initialization complete');
            
        } catch (error) {
            console.error('[App] Initialization failed:', error);
            this.uiManager.setStatus('error', `初始化失败: ${error.message}`);
        }
    }

    /**
     * 初始化 Agent
     */
    async initializeAgent(config) {
        this.uiManager.setStatus('loading', '正在初始化 Agent...');
        
        try {
            await this.swController.initAgent(config);
            this.uiManager.setStatus('ready', 'Agent 已就绪');
            this.uiManager.setInputEnabled(true);
            this.hideConfigPanel();
        } catch (error) {
            this.uiManager.setStatus('error', `Agent 初始化失败: ${error.message}`);
            this.showConfigPanel();
        }
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 发送按钮
        this.uiManager.sendButton.addEventListener('click', () => this.sendMessage());
        
        // 回车发送
        this.uiManager.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // 配置保存
        const saveConfigBtn = document.getElementById('save-config');
        if (saveConfigBtn) {
            saveConfigBtn.addEventListener('click', () => this.saveAndApplyConfig());
        }
        
        // UI 模式切换
        const uiToggle = document.getElementById('ui-toggle');
        if (uiToggle) {
            uiToggle.addEventListener('change', (e) => {
                this.useUI = e.target.checked;
            });
        }
    }

    /**
     * 发送消息
     */
    async sendMessage() {
        const text = this.uiManager.getInput();
        if (!text) return;
        
        // 显示用户消息
        this.uiManager.addMessage('user', text);
        this.uiManager.clearInput();
        this.uiManager.setInputEnabled(false);
        this.uiManager.addLoading();
        
        try {
            let responseContent = '';
            
            await this.agentClient.sendMessage(text, this.useUI, (event) => {
                console.log('[App] Agent event:', event);
                
                // 处理状态更新
                if (event.kind === 'status-update') {
                    const message = event.status?.message;
                    if (message) {
                        // 收集响应内容
                        for (const part of message.parts || []) {
                            if (part.kind === 'text') {
                                responseContent = part.text;
                            } else if (part.kind === 'data') {
                                // A2UI 数据
                                this.uiManager.removeLoading();
                                this.uiManager.addMessage('agent', part.data, true);
                            }
                        }
                        
                        // 如果是最终响应
                        if (event.final || event.status.state === 'completed' || event.status.state === 'input_required') {
                            this.uiManager.removeLoading();
                            if (responseContent) {
                                this.uiManager.addMessage('agent', responseContent);
                            }
                        }
                    }
                }
            });
            
        } catch (error) {
            console.error('[App] Send message failed:', error);
            this.uiManager.removeLoading();
            this.uiManager.addMessage('system', `发送失败: ${error.message}`);
        } finally {
            this.uiManager.setInputEnabled(true);
            this.uiManager.inputField.focus();
        }
    }

    /**
     * 显示配置面板
     */
    showConfigPanel() {
        const panel = document.getElementById('config-panel');
        if (panel) {
            panel.style.display = 'flex';
        }
    }

    /**
     * 隐藏配置面板
     */
    hideConfigPanel() {
        const panel = document.getElementById('config-panel');
        if (panel) {
            panel.style.display = 'none';
        }
    }

    /**
     * 保存并应用配置
     */
    async saveAndApplyConfig() {
        const apiKeyInput = document.getElementById('api-key-input');
        const baseUrlInput = document.getElementById('base-url-input');
        const modelInput = document.getElementById('model-input');
        
        const config = {
            apiKey: apiKeyInput?.value.trim(),
            baseURL: baseUrlInput?.value.trim() || 'https://api.openai.com/v1',
            model: modelInput?.value.trim() || 'gpt-4'
        };
        
        if (!config.apiKey) {
            alert('请输入 API Key');
            return;
        }
        
        // 保存到本地存储
        this.saveConfig(config);
        
        // 初始化 Agent
        await this.initializeAgent(config);
    }

    /**
     * 保存配置到本地存储
     */
    saveConfig(config) {
        try {
            // 只保存非敏感信息
            const safeConfig = {
                apiKey: config.apiKey, // 实际应用中应该加密存储
                baseURL: config.baseURL,
                model: config.model
            };
            localStorage.setItem('agent-config', JSON.stringify(safeConfig));
        } catch (e) {
            console.warn('[App] Failed to save config:', e);
        }
    }

    /**
     * 从本地存储加载配置
     */
    loadConfig() {
        try {
            const saved = localStorage.getItem('agent-config');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.warn('[App] Failed to load config:', e);
            return null;
        }
    }
}

// 导出全局实例
window.App = App;

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
    window.app = app;
});
