/**
 * DevTools Helper - Chrome 浏览器 DevTools 控制台测试辅助工具
 * 
 * 使用方法：
 * 1. 在浏览器中加载 agent-webview
 * 2. 打开 DevTools (F12)
 * 3. 在 Console 中使用 window.DevTools 对象进行测试
 * 
 * 示例：
 *   DevTools.init()                    // 初始化 Agent
 *   DevTools.send("Find Chinese restaurants")  // 发送消息
 *   DevTools.book("Golden Dragon")     // 模拟预订
 *   DevTools.status()                  // 查看状态
 *   DevTools.history()                 // 查看历史消息
 */

import { createMockAgent, MOCK_RESTAURANTS } from './mock-llm.js';

/**
 * DevToolsHelper - 控制台测试辅助类
 */
class DevToolsHelper {
    constructor() {
        this.messageHistory = [];
        this.eventHistory = [];
        this.agentInstance = null;
        this.mockMode = false;
        
        // 监听 Agent 事件
        this._setupEventListeners();
        
        console.log('%c🔧 DevTools Helper Loaded', 'color: #4CAF50; font-weight: bold; font-size: 14px;');
        console.log('%cType `DevTools.help()` for available commands', 'color: #666;');
    }

    /**
     * 显示帮助信息
     */
    help() {
        console.log(`
%c📖 DevTools Helper 命令指南

%c初始化命令:
  DevTools.init(config?)       初始化 Agent (可选配置)
  DevTools.initMock()          使用 Mock LLM 初始化（无需 API Key）

%c消息命令:
  DevTools.send(text)          发送文本消息
  DevTools.sendRaw(message)    发送原始 A2A 消息对象
  DevTools.book(restaurantName) 模拟点击预订按钮
  DevTools.submitBooking(details) 提交预订表单

%c查询命令:
  DevTools.status()            查看 Agent 状态
  DevTools.history()           查看消息历史
  DevTools.events()            查看事件历史
  DevTools.card()              查看 Agent Card
  DevTools.clear()             清空历史记录

%c调试命令:
  DevTools.inspect(obj)        格式化打印对象
  DevTools.mockRestaurants()   查看模拟餐厅数据
  DevTools.setMockMode(bool)   切换 Mock 模式
  DevTools.simulateNativeCall(method, ...args) 模拟 Native 调用
        `,
            'color: #1976D2; font-weight: bold; font-size: 16px;',
            'color: #F57C00; font-weight: bold;',
            'color: #388E3C; font-weight: bold;',
            'color: #7B1FA2; font-weight: bold;',
            'color: #C62828; font-weight: bold;'
        );
    }

    /**
     * 初始化 Agent
     * @param {Object} config - 配置对象
     */
    async init(config = {}) {
        if (typeof window.AgentWebView === 'undefined') {
            console.error('❌ AgentWebView not loaded. Make sure the bundle is loaded first.');
            return;
        }

        const defaultConfig = {
            baseUrl: window.location.origin,
            MOCK_MODE: false,
            ...config
        };

        console.log('%c🚀 Initializing Agent...', 'color: #2196F3;');
        
        try {
            const result = await window.AgentWebView.initialize(defaultConfig);
            this.agentInstance = window.AgentWebView;
            this.mockMode = defaultConfig.MOCK_MODE;
            
            console.log('%c✅ Agent Initialized', 'color: #4CAF50; font-weight: bold;');
            console.log('Session ID:', result.sessionId);
            console.log('Agent Card:', result.agentCard?.name);
            
            return result;
        } catch (error) {
            console.error('❌ Initialization failed:', error);
            throw error;
        }
    }

    /**
     * 使用 Mock LLM 初始化（无需 API Key）
     */
    async initMock() {
        console.log('%c🎭 Initializing with Mock LLM (no API key needed)...', 'color: #FF9800;');
        
        // 注入 Mock Agent 到全局
        window.__mockAgent = createMockAgent('', true);
        
        return this.init({
            MOCK_MODE: true,
            baseUrl: ''
        });
    }

    /**
     * 发送文本消息
     * @param {string} text 
     */
    async send(text) {
        if (!this._checkInitialized()) return;
        
        console.log('%c📤 Sending:', 'color: #2196F3;', text);
        
        const message = {
            kind: 'message',
            role: 'user',
            parts: [{ kind: 'text', text }],
            timestamp: new Date().toISOString()
        };
        
        this.messageHistory.push({ direction: 'sent', message });
        
        try {
            await this.agentInstance.sendTextMessage(text, true);
        } catch (error) {
            console.error('❌ Send failed:', error);
        }
    }

    /**
     * 发送原始 A2A 消息
     * @param {Object} message 
     */
    async sendRaw(message) {
        if (!this._checkInitialized()) return;
        
        console.log('%c📤 Sending raw message:', 'color: #2196F3;', message);
        this.messageHistory.push({ direction: 'sent', message });
        
        window.AgentBridge.sendUserMessage(message, {
            sessionId: this.agentInstance.sessionId,
            requestedExtensions: ['https://purl.org/nickel/a2ui']
        });
    }

    /**
     * 模拟点击预订按钮
     * @param {string} restaurantName 
     */
    async book(restaurantName) {
        if (!this._checkInitialized()) return;
        
        const restaurant = MOCK_RESTAURANTS.find(r => 
            r.name.toLowerCase().includes(restaurantName.toLowerCase())
        ) || MOCK_RESTAURANTS[0];
        
        console.log('%c🍽️ Booking restaurant:', 'color: #FF5722;', restaurant.name);
        
        await this.agentInstance.sendUIEvent('book_restaurant', {
            restaurantName: restaurant.name,
            address: restaurant.address,
            imageUrl: restaurant.imageUrl
        });
    }

    /**
     * 提交预订表单
     * @param {Object} details 
     */
    async submitBooking(details = {}) {
        if (!this._checkInitialized()) return;
        
        const bookingDetails = {
            restaurantName: details.restaurantName || 'Golden Dragon',
            partySize: details.partySize || '4',
            reservationTime: details.reservationTime || '7:00 PM',
            dietary: details.dietary || 'No shellfish',
            ...details
        };
        
        console.log('%c📝 Submitting booking:', 'color: #4CAF50;', bookingDetails);
        
        await this.agentInstance.sendUIEvent('submit_booking', bookingDetails);
    }

    /**
     * 查看 Agent 状态
     */
    status() {
        if (!this._checkInitialized()) {
            return { initialized: false };
        }
        
        const status = this.agentInstance.getStatus();
        console.table(status);
        return status;
    }

    /**
     * 查看消息历史
     */
    history() {
        console.log('%c📜 Message History:', 'color: #9C27B0; font-weight: bold;');
        
        if (this.messageHistory.length === 0) {
            console.log('  (empty)');
            return [];
        }
        
        this.messageHistory.forEach((item, i) => {
            const icon = item.direction === 'sent' ? '📤' : '📥';
            const color = item.direction === 'sent' ? '#2196F3' : '#4CAF50';
            console.log(`%c${icon} [${i}] ${item.direction}:`, `color: ${color};`, item.message);
        });
        
        return this.messageHistory;
    }

    /**
     * 查看事件历史
     */
    events() {
        console.log('%c🎯 Event History:', 'color: #E91E63; font-weight: bold;');
        
        if (this.eventHistory.length === 0) {
            console.log('  (empty)');
            return [];
        }
        
        this.eventHistory.forEach((event, i) => {
            console.log(`%c[${i}] ${event.type || event.kind}:`, 'color: #E91E63;', event);
        });
        
        return this.eventHistory;
    }

    /**
     * 查看 Agent Card
     */
    card() {
        if (!this._checkInitialized()) return null;
        
        const card = this.agentInstance.getAgentCard();
        console.log('%c🃏 Agent Card:', 'color: #673AB7; font-weight: bold;');
        console.log(JSON.stringify(card, null, 2));
        return card;
    }

    /**
     * 清空历史记录
     */
    clear() {
        this.messageHistory = [];
        this.eventHistory = [];
        console.log('%c🧹 History cleared', 'color: #607D8B;');
    }

    /**
     * 格式化打印对象
     */
    inspect(obj) {
        console.log('%c🔍 Inspect:', 'color: #00BCD4; font-weight: bold;');
        console.dir(obj, { depth: null });
        return obj;
    }

    /**
     * 查看模拟餐厅数据
     */
    mockRestaurants() {
        console.log('%c🍜 Mock Restaurant Data:', 'color: #FF9800; font-weight: bold;');
        console.table(MOCK_RESTAURANTS.map(r => ({
            name: r.name,
            cuisine: r.cuisine,
            rating: r.rating,
            price: r.priceRange
        })));
        return MOCK_RESTAURANTS;
    }

    /**
     * 设置 Mock 模式
     */
    setMockMode(enabled) {
        this.mockMode = enabled;
        console.log(`%c🎭 Mock mode: ${enabled ? 'ON' : 'OFF'}`, 
            `color: ${enabled ? '#FF9800' : '#607D8B'};`);
    }

    /**
     * 模拟 Native 调用
     */
    simulateNativeCall(method, ...args) {
        console.log(`%c📱 Simulating Native call: ${method}`, 'color: #795548;', args);
        
        if (window.AgentBridge && typeof window.AgentBridge[method] === 'function') {
            return window.AgentBridge[method](...args);
        } else {
            console.error(`❌ Method not found: AgentBridge.${method}`);
        }
    }

    /**
     * 设置事件监听器
     */
    _setupEventListeners() {
        // 监听来自 Native 的响应
        if (typeof window !== 'undefined') {
            // 等待 AgentWebView 加载后设置监听
            const checkAndSetup = () => {
                if (window.AgentWebView) {
                    window.AgentWebView.on('agent-event', (event) => {
                        console.log('%c📥 Agent Event:', 'color: #4CAF50;', event);
                        this.eventHistory.push(event);
                        this.messageHistory.push({ direction: 'received', message: event });
                    });
                } else {
                    setTimeout(checkAndSetup, 100);
                }
            };
            checkAndSetup();
        }
    }

    /**
     * 检查是否已初始化
     */
    _checkInitialized() {
        if (!this.agentInstance || !this.agentInstance.isInitialized) {
            console.error('❌ Agent not initialized. Run DevTools.init() or DevTools.initMock() first.');
            return false;
        }
        return true;
    }
}

// 创建全局实例
const devTools = new DevToolsHelper();

// 暴露到全局
if (typeof window !== 'undefined') {
    window.DevTools = devTools;
}

export { DevToolsHelper, devTools };
export default devTools;
