# Agent-JS WebView 移植方案

## 一、问题分析

当前 `agent-js` 实现依赖以下 Node.js/服务端特有的模块，导致无法在移动端 WebView 中运行：

| 模块 | 用途 | 问题 | 移植策略 |
|------|------|------|----------|
| `express` | HTTP 服务器框架 | WebView 中无法启动 HTTP Server | 移除，用 Native Bridge 替代网络通信 |
| `cors` | 跨域中间件 | 依赖 express | 移除，WebView 配置允许跨域 |
| `fs` | 文件系统读取餐厅数据 | WebView 中无 Node.js fs 模块 | 数据内联为 ES Module |
| `path` | 路径处理 | Node.js 特有 | 使用字符串处理替代 |
| `dotenv` | 环境变量加载 | 依赖文件系统 | Native 端注入配置 |
| `@a2a-js/sdk/server` | A2A 服务端 SDK | 依赖 Node.js 运行时 | **适配为浏览器兼容版本** |
| `@a2a-js/sdk/server/express` | Express 集成 | 依赖 express | 用 Native Bridge 替代 HTTP 层 |

## 二、移植方案架构

### 方案概述：WebView Agent + Native Bridge 通信

将 Agent 从「HTTP 服务端模式」转变为「WebView 内嵌模式」，核心逻辑（包括 A2A SDK）在 WebView 中运行，通过 Native Bridge 替代原有的 HTTP 网络通信。

**核心思路**：Native Bridge 作为「虚拟网络层」，替代原来的 HTTP Server/Client 通信。

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          Mobile App (Native)                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────────────┐        ┌─────────────────────────────────┐  │
│  │   Native Host App     │        │  WebView (Agent Runtime)        │  │
│  │                       │        │                                 │  │
│  │  ┌─────────────────┐  │        │  ┌───────────────────────────┐  │  │
│  │  │ AgentMessageBus │◄─┼────────┼─►│  A2A SDK (Browser版)      │  │  │
│  │  │                 │  │ Native │  │  - AgentCard              │  │  │
│  │  │ • onAgentReady  │  │ Bridge │  │  - RequestHandler         │  │  │
│  │  │ • sendToAgent   │  │        │  │  - TaskStore (内存)       │  │  │
│  │  │ • onAgentEvent  │  │        │  └───────────────────────────┘  │  │
│  │  └─────────────────┘  │        │               │                 │  │
│  │                       │        │  ┌────────────▼──────────────┐  │  │
│  │  ┌─────────────────┐  │        │  │  RestaurantAgentExecutor  │  │  │
│  │  │ 配置注入        │  │        │  │  - Tools (内联数据)       │  │  │
│  │  │ • API Keys     │──┼────────┼─►│  - PromptBuilder          │  │  │
│  │  │ • Base URLs    │  │        │  │  - A2UI Extension         │  │  │
│  │  └─────────────────┘  │        │  └───────────────────────────┘  │  │
│  │                       │        │               │                 │  │
│  └───────────────────────┘        │  ┌────────────▼──────────────┐  │  │
│                                   │  │  LLM API (直接 fetch)     │  │  │
│                                   │  │  WebView 已开启跨域       │  │  │
│                                   │  └───────────────────────────┘  │  │
│                                   │                                 │  │
│                                   └─────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 关键设计决策

1. **保留 A2A SDK**：将 `@a2a-js/sdk` 适配为浏览器兼容版本，保持 A2A 协议能力
2. **Native Bridge = 虚拟网络**：用消息传递替代 HTTP 请求/响应
3. **WebView 跨域配置**：在 Native 端配置 WebView 允许跨域，无需 API 代理
4. **语义化 API**：Native Bridge 使用 `sendToAgent` / `onAgentEvent` 等语义化命名

## 三、具体实现步骤

### 步骤 1：创建 WebView 兼容层

创建一个新的目录结构：

```
agent-webview/
├── src/
│   ├── index.js                    # WebView 入口
│   ├── a2a-sdk-browser/            # A2A SDK 浏览器适配层
│   │   ├── index.js                # SDK 入口
│   │   ├── request-handler.js      # 请求处理器（适配自 DefaultRequestHandler）
│   │   ├── task-store.js           # 任务存储（内存版本）
│   │   └── native-transport.js     # Native Bridge 传输层（替代 HTTP）
│   ├── agent-executor.js           # AgentExecutor（原样复用）
│   ├── agent.js                    # Agent 实现（移植自 agent_openai.js）
│   ├── tools.js                    # 浏览器兼容的工具（无 fs 依赖）
│   ├── prompt-builder.js           # 原样复用
│   ├── a2ui-extension.js           # 原样复用
│   ├── native-bridge.js            # Native 通信桥（语义化 API）
│   ├── config.js                   # 配置管理（替代 dotenv）
│   └── restaurant-data.js          # 内联数据（替代 JSON 文件读取）
├── dist/                           # 打包输出
├── package.json
├── rollup.config.js
└── README.md
```

### 步骤 2：替换 Node.js 特有依赖

#### 2.1 替换 `fs` 模块（tools.js）

**原代码问题：**
```javascript
const fs = require('fs');
const restaurant_data_str = fs.readFileSync(file_path, 'utf8');
```

**移植方案：将数据内联或通过 Bridge 获取**

```javascript
// tools-browser.js
import restaurantData from './restaurant-data.js'; // 内联 JSON 数据

export function getRestaurants(params, context) {
    const { cuisine, location, count = 5 } = params;
    
    let items = [];
    if (location.toLowerCase().includes('new york') || location.toLowerCase().includes('ny')) {
        const baseUrl = context?.state?.base_url;
        
        // 直接使用内联数据
        let data = JSON.parse(JSON.stringify(restaurantData));
        
        if (baseUrl) {
            // 替换 URL
            data = data.map(item => ({
                ...item,
                imageUrl: item.imageUrl?.replace(/http:\/\/localhost:10002/g, baseUrl)
            }));
        }
        
        items = data.slice(0, count);
    }
    
    return JSON.stringify(items);
}
```

#### 2.2 替换 `dotenv`（配置管理）

**移植方案：通过 Native Bridge 注入配置**

```javascript
// config.js
class ConfigManager {
    constructor() {
        this.config = {};
    }

    // 由 Native 调用注入配置
    setConfig(config) {
        this.config = { ...this.config, ...config };
    }

    get(key) {
        return this.config[key];
    }

    // 获取 API 配置
    getAPIConfig() {
        return {
            apiKey: this.get('GEMINI_API_KEY') || 
                    this.get('OPENROUTER_API_KEY') || 
                    this.get('DASHSCOPE_API_KEY'),
            baseURL: this.get('GEMINI_BASE_URL') || 
                     this.get('OPENROUTER_BASE_URL') || 
                     this.get('DASHSCOPE_BASE_URL'),
            model: this.get('GEMINI_MODEL') || 
                   this.get('OPENROUTER_MODEL') || 
                   this.get('DASHSCOPE_MODEL')
        };
    }
}

export const configManager = new ConfigManager();
```

#### 2.3 移除 Express/Server 依赖

将 `server.js` 和 `agent_executor.js` 合并为客户端版本：

```javascript
// agent-client.js
import { RestaurantAgent } from './agent.js';
import { tryActivateA2UIExtension, createA2UIPart } from './a2ui-extension.js';

export class AgentClient {
    constructor(options = {}) {
        this.baseUrl = options.baseUrl || '';
        this.uiAgent = new RestaurantAgent(this.baseUrl, true);
        this.textAgent = new RestaurantAgent(this.baseUrl, false);
    }

    /**
     * 处理用户消息（替代 HTTP 请求处理）
     * @param {Object} message - 用户消息
     * @param {Object} context - 上下文（包含 requestedExtensions 等）
     * @returns {AsyncGenerator} 流式响应
     */
    async *processMessage(message, context = {}) {
        const useUI = context.requestedExtensions?.includes(A2UI_EXTENSION_URL);
        const agent = useUI ? this.uiAgent : this.textAgent;

        let query = '';
        let uiEventPart = null;

        // 解析消息内容
        if (message.parts) {
            for (const part of message.parts) {
                if (part.kind === 'data' && part.data?.userAction) {
                    uiEventPart = part.data.userAction;
                } else if (part.kind === 'text') {
                    query += part.text + ' ';
                }
            }
        }

        // 处理 UI 事件
        if (uiEventPart) {
            query = this._buildQueryFromUIEvent(uiEventPart);
        }

        // 流式生成响应
        const sessionId = context.sessionId || 'default';
        for await (const item of agent.stream(query.trim(), sessionId)) {
            if (!item.is_task_complete) {
                yield { type: 'working', message: item.updates };
            } else {
                yield { type: 'complete', content: this._parseResponse(item.content) };
            }
        }
    }

    _buildQueryFromUIEvent(event) {
        const action = event.actionName;
        const ctx = event.context || {};

        if (action === 'book_restaurant') {
            return `USER_WANTS_TO_BOOK: ${ctx.restaurantName}, Address: ${ctx.address}`;
        } else if (action === 'submit_booking') {
            return `User submitted a booking for ${ctx.restaurantName}...`;
        }
        return `User event: ${action} with data: ${JSON.stringify(ctx)}`;
    }

    _parseResponse(content) {
        const parts = [];
        if (content?.includes('---a2ui_JSON---')) {
            const [textContent, jsonString] = content.split('---a2ui_JSON---', 2);
            if (textContent?.trim()) {
                parts.push({ kind: 'text', text: textContent.trim() });
            }
            if (jsonString?.trim()) {
                try {
                    const jsonData = JSON.parse(
                        jsonString.trim().replace(/^```json/, '').replace(/```$/, '').trim()
                    );
                    if (Array.isArray(jsonData)) {
                        jsonData.forEach(msg => parts.push(createA2UIPart(msg)));
                    } else {
                        parts.push(createA2UIPart(jsonData));
                    }
                } catch (e) {
                    parts.push({ kind: 'text', text: jsonString });
                }
            }
        } else {
            parts.push({ kind: 'text', text: content || '' });
        }
        return parts;
    }
}
```

### 步骤 3：创建 Native Bridge 通信层（语义化 API）

Native Bridge 的核心作用是**替代原来的 HTTP 网络通信**，使用语义化的函数名清晰表达意图：

| 原 HTTP 方式 | Native Bridge API | 说明 |
|-------------|-------------------|------|
| POST /tasks/send | `sendToAgent(message)` | 发送消息给 Agent |
| SSE 响应流 | `onAgentEvent(callback)` | 接收 Agent 事件流 |
| GET /agent-card | `getAgentCard()` | 获取 Agent 能力描述 |
| - | `onAgentReady(callback)` | Agent 初始化完成回调 |
| - | `injectConfig(config)` | Native 注入配置 |

```javascript
// native-bridge.js

/**
 * AgentMessageBus - 语义化的 Native 通信层
 * 替代原有的 HTTP 请求/响应模式
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
        // 暴露全局函数供 Native 调用
        window.AgentBridge = {
            // Native -> WebView: 接收来自 Native 的消息
            receiveMessage: (jsonStr) => {
                const data = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
                this._handleIncomingMessage(data);
            },
            
            // Native -> WebView: 注入配置
            injectConfig: (config) => {
                this._emit('config-injected', config);
            },
            
            // Native -> WebView: 发送用户消息给 Agent
            sendUserMessage: (message, context) => {
                this._emit('user-message', { message, context });
            }
        };

        // 兼容 iOS WKWebView 的 messageHandlers 回调
        window.handleNativeResponse = (data) => {
            this._handleIncomingMessage(data);
        };
    }

    _handleIncomingMessage(data) {
        const { requestId, type, payload, error } = data;
        
        // 处理请求响应
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
        this._emit(type, payload);
    }

    _emit(eventType, payload) {
        const callbacks = this.eventCallbacks.get(eventType) || [];
        callbacks.forEach(cb => cb(payload));
    }

    /**
     * 发送消息到 Native（带响应等待）
     */
    _sendToNative(type, payload) {
        return new Promise((resolve, reject) => {
            const requestId = ++this.requestId;
            this.pendingRequests.set(requestId, { resolve, reject });

            const message = JSON.stringify({ requestId, type, payload });

            // iOS WKWebView
            if (window.webkit?.messageHandlers?.AgentMessageBus) {
                window.webkit.messageHandlers.AgentMessageBus.postMessage(message);
            }
            // Android WebView (@JavascriptInterface)
            else if (window.NativeAgentBus?.postMessage) {
                window.NativeAgentBus.postMessage(message);
            }
            // React Native
            else if (window.ReactNativeWebView?.postMessage) {
                window.ReactNativeWebView.postMessage(message);
            }
            // 独立运行模式（调试用）
            else {
                console.warn('[AgentMessageBus] No native bridge, running standalone');
                this.pendingRequests.delete(requestId);
                resolve(null);
            }
        });
    }

    /**
     * 发送消息到 Native（无需等待响应）
     */
    _postToNative(type, payload) {
        const message = JSON.stringify({ type, payload });

        if (window.webkit?.messageHandlers?.AgentMessageBus) {
            window.webkit.messageHandlers.AgentMessageBus.postMessage(message);
        } else if (window.NativeAgentBus?.postMessage) {
            window.NativeAgentBus.postMessage(message);
        } else if (window.ReactNativeWebView?.postMessage) {
            window.ReactNativeWebView.postMessage(message);
        }
    }

    // ==================== 语义化 API ====================

    /**
     * 通知 Native: Agent 已就绪
     * @param {Object} agentCard - Agent 能力描述
     */
    notifyAgentReady(agentCard) {
        this._postToNative('agent-ready', { agentCard });
    }

    /**
     * 发送 Agent 事件到 Native（状态更新、消息等）
     * @param {Object} event - A2A 协议事件
     */
    emitAgentEvent(event) {
        this._postToNative('agent-event', event);
    }

    /**
     * 发送 Agent 错误到 Native
     * @param {Error} error - 错误对象
     */
    emitAgentError(error) {
        this._postToNative('agent-error', {
            message: error.message,
            stack: error.stack
        });
    }

    /**
     * 监听 Native 事件
     * @param {string} eventType - 事件类型
     * @param {Function} callback - 回调函数
     */
    on(eventType, callback) {
        if (!this.eventCallbacks.has(eventType)) {
            this.eventCallbacks.set(eventType, []);
        }
        this.eventCallbacks.get(eventType).push(callback);
    }

    /**
     * 移除事件监听
     */
    off(eventType, callback) {
        const callbacks = this.eventCallbacks.get(eventType);
        if (callbacks) {
            const idx = callbacks.indexOf(callback);
            if (idx !== -1) callbacks.splice(idx, 1);
        }
    }
}

export const agentMessageBus = new AgentMessageBus();
```

### 步骤 3.1：WebView 跨域配置（Native 端）

**跨域问题直接在 Native 端配置 WebView 解决，无需 API 代理。**

#### iOS (Swift)

```swift
// 配置 WKWebView 允许跨域
let config = WKWebViewConfiguration()
config.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
config.setValue(true, forKey: "allowUniversalAccessFromFileURLs")

// 如需要更细粒度控制，可以使用 WKURLSchemeHandler
```

#### Android (Kotlin)

```kotlin
webView.settings.apply {
    javaScriptEnabled = true
    domStorageEnabled = true
    
    // 允许跨域访问
    allowFileAccess = true
    allowContentAccess = true
    allowFileAccessFromFileURLs = true
    allowUniversalAccessFromFileURLs = true
    
    // 混合内容模式（允许 HTTPS 页面加载 HTTP 资源）
    mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
}
```

#### React Native

```jsx
<WebView
  originWhitelist={['*']}
  mixedContentMode="always"
  allowFileAccess={true}
  allowUniversalAccessFromFileURLs={true}
  // ...
/>
```

### 步骤 4：A2A SDK 浏览器适配层

为了保持 A2A 协议能力，需要将 `@a2a-js/sdk/server` 适配为浏览器兼容版本。核心是用 Native Bridge 替代 HTTP 传输层。

```javascript
// a2a-sdk-browser/native-transport.js

import { agentMessageBus } from '../native-bridge.js';

/**
 * Native Transport - 用 Native Bridge 替代 HTTP 传输
 * 实现与 @a2a-js/sdk 相同的接口，但底层使用消息传递
 */
export class NativeTransport {
    constructor() {
        this.taskHandlers = new Map();
    }

    /**
     * 注册任务处理器（替代 Express 路由）
     */
    onTaskRequest(handler) {
        agentMessageBus.on('user-message', async ({ message, context }) => {
            try {
                // 构造 A2A 协议格式的请求上下文
                const requestContext = this._buildRequestContext(message, context);
                
                // 创建事件总线
                const eventBus = this._createEventBus();
                
                // 调用处理器
                await handler(requestContext, eventBus);
            } catch (error) {
                agentMessageBus.emitAgentError(error);
            }
        });
    }

    _buildRequestContext(message, context) {
        return {
            taskId: context.taskId || `task-${Date.now()}`,
            contextId: context.contextId || context.sessionId,
            userMessage: this._normalizeMessage(message),
            task: context.task || null,
            context: {
                requestedExtensions: context.requestedExtensions || []
            }
        };
    }

    _normalizeMessage(message) {
        if (typeof message === 'string') {
            return {
                kind: 'message',
                role: 'user',
                parts: [{ kind: 'text', text: message }]
            };
        }
        return message;
    }

    _createEventBus() {
        return {
            publish: (event) => {
                agentMessageBus.emitAgentEvent(event);
            },
            finished: () => {
                agentMessageBus.emitAgentEvent({ type: 'finished' });
            }
        };
    }
}

export const nativeTransport = new NativeTransport();
```

```javascript
// a2a-sdk-browser/request-handler.js

import { nativeTransport } from './native-transport.js';

/**
 * BrowserRequestHandler - 浏览器版本的请求处理器
 * 适配自 @a2a-js/sdk/server 的 DefaultRequestHandler
 */
export class BrowserRequestHandler {
    constructor(agentCard, taskStore, agentExecutor) {
        this.agentCard = agentCard;
        this.taskStore = taskStore;
        this.agentExecutor = agentExecutor;
    }

    /**
     * 启动 Agent（替代 Express app.listen）
     */
    start() {
        // 注册任务处理
        nativeTransport.onTaskRequest(async (requestContext, eventBus) => {
            await this.agentExecutor.execute(requestContext, eventBus);
        });

        // 通知 Native Agent 已就绪
        agentMessageBus.notifyAgentReady(this.agentCard);
        
        console.log('[A2A Browser] Agent started, card:', this.agentCard.name);
    }

    /**
     * 获取 Agent Card
     */
    getAgentCard() {
        return this.agentCard;
    }
}
```

```javascript
// a2a-sdk-browser/task-store.js

/**
 * InMemoryTaskStore - 内存任务存储
 * 与原 @a2a-js/sdk 的 InMemoryTaskStore 保持相同接口
 */
export class InMemoryTaskStore {
    constructor() {
        this.tasks = new Map();
    }

    async get(taskId) {
        return this.tasks.get(taskId) || null;
    }

    async save(task) {
        this.tasks.set(task.id, task);
    }

    async delete(taskId) {
        this.tasks.delete(taskId);
    }

    async list() {
        return Array.from(this.tasks.values());
    }
}
```

```javascript
// a2a-sdk-browser/index.js

// 导出浏览器版 A2A SDK
export { BrowserRequestHandler } from './request-handler.js';
export { InMemoryTaskStore } from './task-store.js';
export { NativeTransport, nativeTransport } from './native-transport.js';
export { agentMessageBus } from '../native-bridge.js';
```

### 步骤 5：LLM API 直接调用（WebView 跨域已配置）

由于 WebView 已在 Native 端配置允许跨域，LLM API 可直接使用 `fetch` 调用，无需代理：

```javascript
// openai-adapter.js
import { configManager } from './config.js';

/**
 * OpenAI 兼容 API 适配器
 * WebView 已配置允许跨域，直接使用 fetch
 */
export class OpenAIAdapter {
    constructor() {
        // 配置会在初始化时由 Native 注入
    }

    _getConfig() {
        return configManager.getAPIConfig();
    }

    async createChatCompletion(options) {
        const config = this._getConfig();
        const { model, messages, tools, tool_choice } = options;

        const response = await fetch(`${config.baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: model || config.model,
                messages,
                tools,
                tool_choice
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error ${response.status}: ${errorText}`);
        }

        return response.json();
    }
}

export const openaiAdapter = new OpenAIAdapter();
```

### 步骤 5：打包配置

使用 Rollup/Webpack/Vite 打包为单文件，便于在 WebView 中加载：

```javascript
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/agent-webview.js',
        format: 'iife',
        name: 'AgentWebView',
        sourcemap: true
    },
    plugins: [
        resolve({ browser: true }),
        commonjs(),
        json(),
        terser()
    ]
};
```

### 步骤 6：WebView 入口文件

```javascript
// index.js
import { AgentClient } from './agent-client.js';
import { configManager } from './config.js';
import { messageBridge } from './message-bridge.js';

class AgentWebView {
    constructor() {
        this.agent = null;
        this.sessionId = this._generateSessionId();
    }

    /**
     * 初始化（由 Native 调用）
     */
    async initialize(config) {
        configManager.setConfig(config);
        this.agent = new AgentClient({ baseUrl: config.baseUrl || '' });
        
        // 通知 Native 初始化完成
        await messageBridge.sendToNative('initialized', { sessionId: this.sessionId });
    }

    /**
     * 处理用户输入（由 Native 调用或 UI 触发）
     */
    async handleUserMessage(message, context = {}) {
        if (!this.agent) {
            throw new Error('Agent not initialized');
        }

        context.sessionId = this.sessionId;
        
        try {
            for await (const event of this.agent.processMessage(message, context)) {
                // 将事件发送给 Native
                await messageBridge.sendToNative('agent-event', event);
            }
        } catch (error) {
            await messageBridge.sendToNative('agent-error', { 
                message: error.message,
                stack: error.stack 
            });
        }
    }

    _generateSessionId() {
        return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}

// 导出全局对象
window.AgentWebView = new AgentWebView();
```

## 四、Native 端集成示例

### iOS (Swift + WKWebView)

```swift
import WebKit

class AgentWebViewController: UIViewController, WKScriptMessageHandler {
    var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let config = WKWebViewConfiguration()
        config.userContentController.add(self, name: "agentBridge")
        
        webView = WKWebView(frame: view.bounds, configuration: config)
        view.addSubview(webView)
        
        // 加载 Agent WebView
        if let htmlPath = Bundle.main.path(forResource: "agent", ofType: "html") {
            let htmlUrl = URL(fileURLWithPath: htmlPath)
            webView.loadFileURL(htmlUrl, allowingReadAccessTo: htmlUrl.deletingLastPathComponent())
        }
    }
    
    func initializeAgent() {
        let config: [String: Any] = [
            "GEMINI_API_KEY": "your-api-key",
            "GEMINI_BASE_URL": "https://api.openai.com/v1",
            "GEMINI_MODEL": "gpt-4",
            "baseUrl": "https://your-server.com"
        ]
        
        let jsonData = try! JSONSerialization.data(withJSONObject: config)
        let jsonString = String(data: jsonData, encoding: .utf8)!
        
        webView.evaluateJavaScript("AgentWebView.initialize(\(jsonString))")
    }
    
    func userContentController(_ userContentController: WKUserContentController, 
                               didReceive message: WKScriptMessage) {
        guard let body = message.body as? [String: Any] else { return }
        
        let messageType = body["type"] as? String
        let payload = body["payload"] as? [String: Any]
        let messageId = body["id"] as? Int
        
        switch messageType {
        case "api-request":
            // 处理 API 请求代理
            handleAPIRequest(messageId: messageId!, payload: payload!)
        case "agent-event":
            // 处理 Agent 事件
            handleAgentEvent(payload!)
        default:
            break
        }
    }
    
    func handleAPIRequest(messageId: Int, payload: [String: Any]) {
        // 使用 URLSession 发起请求，然后回调结果
        // ...
        
        let response: [String: Any] = ["id": messageId, "type": "response", "payload": ["result": responseData]]
        let jsonData = try! JSONSerialization.data(withJSONObject: response)
        let jsonString = String(data: jsonData, encoding: .utf8)!
        
        webView.evaluateJavaScript("handleNativeMessage(\(jsonString))")
    }
}
```

### Android (Kotlin + WebView)

```kotlin
class AgentWebViewActivity : AppCompatActivity() {
    private lateinit var webView: WebView
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            
            addJavascriptInterface(AgentBridge(this@AgentWebViewActivity), "AgentBridge")
            
            loadUrl("file:///android_asset/agent.html")
        }
        
        setContentView(webView)
    }
    
    inner class AgentBridge(private val context: Context) {
        @JavascriptInterface
        fun postMessage(message: String) {
            val json = JSONObject(message)
            val messageType = json.getString("type")
            val messageId = json.getInt("id")
            val payload = json.getJSONObject("payload")
            
            when (messageType) {
                "api-request" -> handleAPIRequest(messageId, payload)
                "agent-event" -> handleAgentEvent(payload)
            }
        }
    }
    
    private fun handleAPIRequest(messageId: Int, payload: JSONObject) {
        // 使用 OkHttp 发起请求
        // ...
        
        val response = JSONObject().apply {
            put("id", messageId)
            put("type", "response")
            put("payload", JSONObject().put("result", responseData))
        }
        
        runOnUiThread {
            webView.evaluateJavascript("handleNativeMessage($response)", null)
        }
    }
}
```

## 五、替代方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| **方案 A: WebView + Native Bridge** | 复用大量现有代码；保持 A2A 协议；跨平台；更新灵活 | 需要实现 Native Bridge；可能有性能开销 | 需要快速迭代的场景 |
| **方案 B: 完全 Native 重写** | 性能最优；原生体验 | 开发成本高；需要维护多套代码；需重新实现 A2A | 对性能要求极高的场景 |
| **方案 C: 云端代理** | WebView 无需改动；部署简单 | 需要服务器；增加延迟；有网络依赖 | 网络稳定的场景 |
| **方案 D: React Native 移植** | 接近原生性能；代码复用率高 | 需要 RN 技术栈；打包体积较大 | 已有 RN 技术栈的团队 |

## 六、推荐的实施路线

1. **Phase 1**: 创建 `agent-webview` 目录，移植 A2A SDK 浏览器适配层
2. **Phase 2**: 实现 Native Bridge 通信层（语义化 API）
3. **Phase 3**: 替换 Node.js 特有依赖（fs, path, dotenv）
4. **Phase 4**: 配置 Native 端 WebView 跨域设置
5. **Phase 5**: 配置打包流程，生成单文件 JS
6. **Phase 6**: 在 iOS/Android 中集成测试
7. **Phase 7**: 性能优化与错误处理完善

## 七、需要注意的安全问题

1. **API Key 安全**：不要将 API Key 硬编码在 JS 中，通过 Native Bridge 在运行时注入
2. **HTTPS**：所有 API 请求必须使用 HTTPS
3. **CSP**：配置合适的 Content Security Policy
4. **输入验证**：对 Native 传入的数据进行校验
5. **错误隔离**：Agent 错误不应暴露敏感信息
6. **WebView 跨域**：仅在必要时开启，生产环境应限制允许的域名

---

## 附录 A：文件迁移对照表

| 原文件 | WebView 版本 | 改动说明 |
|--------|-------------|----------|
| `server.js` | 移除 | 功能由 Native Bridge 替代 |
| `@a2a-js/sdk/server` | `a2a-sdk-browser/` | **浏览器适配版本，保持 A2A 协议** |
| `agent_executor.js` | `agent-executor.js` | 基本复用，使用 Native Transport |
| `agent_openai.js` | `agent.js` | 适配 WebView |
| `tools.js` | `tools.js` | 移除 fs 依赖，内联数据 |
| `prompt_builder.js` | `prompt-builder.js` | 原样复用 |
| `a2ui_extension.js` | `a2ui-extension.js` | 原样复用 |
| `restaurant_data.json` | `restaurant-data.js` | 转为 ES Module |
| - | `config.js` | 新增配置管理 |
| - | `native-bridge.js` | 新增 Native 通信层（语义化 API） |
| - | `openai-adapter.js` | 新增 LLM API 适配器 |

## 附录 B：Native Bridge API 对照表

| Native Bridge API | 方向 | 说明 | 对应原 HTTP |
|-------------------|------|------|-------------|
| `AgentBridge.injectConfig(config)` | Native → WebView | 注入 API 配置 | N/A |
| `AgentBridge.sendUserMessage(msg, ctx)` | Native → WebView | 发送用户消息 | POST /tasks/send |
| `agentMessageBus.notifyAgentReady(card)` | WebView → Native | Agent 就绪通知 | N/A |
| `agentMessageBus.emitAgentEvent(event)` | WebView → Native | 发送 Agent 事件 | SSE 响应流 |
| `agentMessageBus.emitAgentError(error)` | WebView → Native | 发送错误信息 | HTTP 错误响应 |
| `agentMessageBus.on('user-message', cb)` | 监听 | 监听用户消息 | 路由处理器 |
| `agentMessageBus.on('config-injected', cb)` | 监听 | 监听配置注入 | N/A |
