/**
 * ServiceWorker - 核心通信层
 * 
 * 职责：
 * 1. 拦截来自 App 的 localhost:10002 端口请求
 * 2. 加载并运行 agent-webview 代码
 * 3. 处理 A2A 协议请求并返回响应
 * 4. 管理 OpenAI API Key 配置
 */

// ServiceWorker 全局变量
let agentWebView = null;
let apiConfig = null;
let isAgentLoaded = false;

// 在 ServiceWorker 启动时立即加载 agent-webview（IIFE 格式）
try {
    importScripts('./dist/agent-webview-sw.js');
    // IIFE 格式会将 AgentWebView 挂载到全局（self）
    if (typeof AgentWebView !== 'undefined') {
        agentWebView = AgentWebView;
        isAgentLoaded = true;
        console.log('[ServiceWorker] Agent WebView loaded successfully');
    }
} catch (e) {
    console.error('[ServiceWorker] Failed to load agent-webview:', e);
}

/**
 * 安装事件 - 初始化 ServiceWorker
 */
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing...');
    // 跳过等待，立即激活
    self.skipWaiting();
});

/**
 * 激活事件 - 清理旧缓存，接管客户端
 */
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating...');
    event.waitUntil(
        clients.claim().then(() => {
            console.log('[ServiceWorker] Claimed all clients');
        })
    );
});

/**
 * 消息事件 - 处理来自 App 的消息
 */
self.addEventListener('message', async (event) => {
    const { type, payload } = event.data;
    
    switch (type) {
        case 'INIT_AGENT':
            await initializeAgent(payload, event.source);
            break;
            
        case 'SET_CONFIG':
            setConfig(payload);
            notifyAllClients({ type: 'CONFIG_SET', success: true });
            break;
            
        case 'GET_STATUS':
            sendStatus(event.source);
            break;
            
        default:
            console.warn('[ServiceWorker] Unknown message type:', type);
    }
});

/**
 * Fetch 事件 - 拦截网络请求
 */
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // 拦截 localhost:10002 的请求（Agent API 端口）
    if (url.hostname === 'localhost' && url.port === '10002') {
        event.respondWith(handleAgentRequest(event.request));
        return;
    }
    
    // 其他请求正常处理
    event.respondWith(fetch(event.request));
});

/**
 * 初始化 Agent
 */
async function initializeAgent(config, client) {
    try {
        console.log('[ServiceWorker] Initializing Agent...');
        
        if (!isAgentLoaded || !agentWebView) {
            throw new Error('Agent WebView not loaded');
        }
        
        // 保存配置
        apiConfig = config;
        
        // 初始化 Agent
        const result = await agentWebView.initialize({
            baseUrl: 'http://localhost:10002',
            ...apiConfig
        });
        
        // 通知客户端初始化完成
        if (client) {
            client.postMessage({
                type: 'AGENT_READY',
                payload: result
            });
        }
        
        console.log('[ServiceWorker] Agent initialized successfully');
        
    } catch (error) {
        console.error('[ServiceWorker] Agent initialization failed:', error);
        
        if (client) {
            client.postMessage({
                type: 'AGENT_ERROR',
                payload: { message: error.message }
            });
        }
    }
}

/**
 * 设置配置（API Key 等）
 */
function setConfig(config) {
    apiConfig = { ...apiConfig, ...config };
    
    if (agentWebView && agentWebView.configManager) {
        agentWebView.configManager.setConfig(apiConfig);
    }
    
    console.log('[ServiceWorker] Config updated');
}

/**
 * 发送状态到客户端
 */
function sendStatus(client) {
    const status = {
        initialized: agentWebView ? agentWebView.isInitialized : false,
        hasConfig: !!apiConfig,
        agentLoaded: isAgentLoaded,
        agentStatus: agentWebView ? agentWebView.getStatus() : null
    };
    
    client.postMessage({
        type: 'STATUS',
        payload: status
    });
}

/**
 * 通知所有客户端
 */
async function notifyAllClients(message) {
    const clientList = await clients.matchAll({ type: 'window' });
    for (const client of clientList) {
        client.postMessage(message);
    }
}

/**
 * 处理 Agent API 请求
 * 将 HTTP 请求转换为 Agent 调用
 */
async function handleAgentRequest(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // 处理静态资源请求
    if (path.startsWith('/static/')) {
        return handleStaticRequest(path);
    }
    
    // 处理 Agent Card 请求
    if (path === '/.well-known/agent.json' || path === '/agent-card') {
        return handleAgentCardRequest();
    }
    
    // 处理 A2A 协议请求
    if (path === '/a2a' || path === '/') {
        return handleA2ARequest(request);
    }
    
    // 处理健康检查
    if (path === '/health') {
        return new Response(JSON.stringify({ status: 'ok', agent: !!agentWebView }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    // 未知路径返回 404
    return new Response('Not Found', { status: 404 });
}

/**
 * 处理静态资源请求
 */
async function handleStaticRequest(path) {
    try {
        // 从 /static 目录获取资源
        const response = await fetch(new URL(path, self.location.origin));
        return response;
    } catch (error) {
        return new Response('Static resource not found', { status: 404 });
    }
}

/**
 * 处理 Agent Card 请求
 */
function handleAgentCardRequest() {
    if (!agentWebView) {
        return new Response(JSON.stringify({ error: 'Agent not initialized' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    const agentCard = agentWebView.getAgentCard();
    return new Response(JSON.stringify(agentCard), {
        headers: { 'Content-Type': 'application/json' }
    });
}

/**
 * 处理 A2A 协议请求
 */
async function handleA2ARequest(request) {
    if (!agentWebView) {
        return new Response(JSON.stringify({ error: 'Agent not initialized' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    try {
        const body = await request.json();
        
        // 创建 SSE 流响应
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                
                // 监听 Agent 事件
                const eventHandler = (event) => {
                    const sseData = `data: ${JSON.stringify(event)}\n\n`;
                    controller.enqueue(encoder.encode(sseData));
                    
                    // 如果是最终事件，关闭流
                    if (event.final || event.type === 'execution-finished') {
                        controller.close();
                    }
                };
                
                // 注册事件监听
                agentWebView.agentMessageBus.on('agent-event', eventHandler);
                
                // 发送用户消息
                const message = body.message || body;
                const context = {
                    sessionId: body.sessionId || body.contextId,
                    requestedExtensions: body.requestedExtensions || body.extensions || []
                };
                
                // 触发消息处理
                agentWebView.agentMessageBus._emit('user-message', { message, context });
            }
        });
        
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            }
        });
        
    } catch (error) {
        console.error('[ServiceWorker] A2A request error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

console.log('[ServiceWorker] Script loaded');
