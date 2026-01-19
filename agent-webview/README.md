# Agent WebView

将 Restaurant Agent 移植到 WebView 环境的浏览器兼容版本，可在移动端 iOS/Android WebView 中运行。**保持完整的 A2A 协议能力**。

## 特性

- ✅ 保持 A2A 协议能力（A2A SDK 浏览器适配层）
- ✅ 无 Node.js 依赖（移除 express, fs, path, dotenv）
- ✅ 语义化 Native Bridge API（`sendUserMessage`、`emitAgentEvent` 等）
- ✅ WebView 跨域配置（无需 API 代理）
- ✅ 单文件打包输出
- ✅ **浏览器测试支持**（Mock LLM + DevTools Helper）

## 目录结构

```
agent-webview/
├── src/
│   ├── index.js                    # 入口文件，导出全局 API
│   ├── a2a-sdk-browser/            # A2A SDK 浏览器适配层
│   │   ├── index.js                # SDK 入口
│   │   ├── request-handler.js      # 请求处理器
│   │   ├── task-store.js           # 任务存储（与 @a2a-js/sdk 接口兼容）
│   │   ├── execution-event-bus.js  # 执行事件总线
│   │   ├── request-context.js      # 请求上下文类
│   │   └── native-transport.js     # Native Bridge 传输层
│   ├── testing/                    # 浏览器测试工具
│   │   ├── index.js                # 测试模块入口
│   │   ├── mock-llm.js             # Mock LLM 响应
│   │   └── devtools-helper.js      # Chrome DevTools 测试助手
│   ├── agent-executor.js           # Agent 执行器
│   ├── agent.js                    # Agent 核心逻辑
│   ├── tools.js                    # 工具函数（无 fs 依赖）
│   ├── restaurant-data.js          # 内联餐厅数据
│   ├── a2ui-extension.js           # A2UI 扩展
│   ├── openai-adapter.js           # OpenAI API 适配器
│   ├── config.js                   # 配置管理
│   └── native-bridge.js            # Native 通信桥（语义化 API）
├── dist/                           # 打包输出
├── test.html                       # 完整浏览器测试页面
├── demo.html                       # 简单演示页面
├── package.json
├── rollup.config.js
└── README.md
```

## 🧪 浏览器测试（无需 API Key）

### 方法 1: 使用测试页面

1. 启动本地服务器：
```bash
cd agent-webview
npx serve .
```

2. 打开浏览器访问 `http://localhost:3000/test.html`

3. 点击 **"🎭 Mock 模式初始化"** 按钮

4. 在输入框中输入消息，如 "帮我找中餐厅"

### 方法 2: 使用 Chrome DevTools

1. 打开测试页面后，按 **F12** 打开开发者工具

2. 在 Console 中输入：

```javascript
// 查看帮助
DevTools.help()

// 初始化 Mock 模式
await DevTools.initMock()

// 发送消息
await DevTools.send("Find Chinese restaurants")

// 模拟预订
await DevTools.book("Golden Dragon")

// 提交预订表单
await DevTools.submitBooking({
  restaurantName: "Golden Dragon",
  partySize: "4",
  reservationTime: "7:00 PM",
  dietary: "No shellfish"
})

// 查看状态
DevTools.status()

// 查看消息历史
DevTools.history()

// 查看事件历史
DevTools.events()
```

### DevTools 命令一览

| 命令 | 说明 |
|------|------|
| `DevTools.help()` | 显示帮助信息 |
| `DevTools.init(config?)` | 初始化 Agent |
| `DevTools.initMock()` | Mock 模式初始化（无需 API Key）|
| `DevTools.send(text)` | 发送文本消息 |
| `DevTools.sendRaw(message)` | 发送原始 A2A 消息 |
| `DevTools.book(name)` | 模拟点击预订 |
| `DevTools.submitBooking(details)` | 提交预订表单 |
| `DevTools.status()` | 查看 Agent 状态 |
| `DevTools.history()` | 查看消息历史 |
| `DevTools.events()` | 查看事件历史 |
| `DevTools.card()` | 查看 Agent Card |
| `DevTools.mockRestaurants()` | 查看模拟餐厅数据 |
| `DevTools.clear()` | 清空历史记录 |

## Native Bridge API

语义化的 API 设计，清晰表达通信意图：

| API | 方向 | 说明 |
|-----|------|------|
| `AgentBridge.injectConfig(config)` | Native → WebView | 注入 API 配置 |
| `AgentBridge.sendUserMessage(msg, ctx)` | Native → WebView | 发送用户消息 |
| `agentMessageBus.notifyAgentReady(card)` | WebView → Native | Agent 就绪通知 |
| `agentMessageBus.emitAgentEvent(event)` | WebView → Native | 发送 Agent 事件 |
| `agentMessageBus.emitAgentError(error)` | WebView → Native | 发送错误信息 |

## A2A SDK 接口兼容性

`a2a-sdk-browser/` 模块导出的接口与 `@a2a-js/sdk/server` 保持兼容：

| 接口 | @a2a-js/sdk | agent-webview |
|------|-------------|---------------|
| `InMemoryTaskStore.load(taskId)` | ✅ | ✅ |
| `InMemoryTaskStore.save(task)` | ✅ | ✅ |
| `DefaultExecutionEventBus.publish(event)` | ✅ | ✅ |
| `DefaultExecutionEventBus.on(name, listener)` | ✅ | ✅ |
| `DefaultExecutionEventBus.off(name, listener)` | ✅ | ✅ |
| `DefaultExecutionEventBus.once(name, listener)` | ✅ | ✅ |
| `DefaultExecutionEventBus.finished()` | ✅ | ✅ |
| `RequestContext` | ✅ | ✅ |

## 快速开始

### 1. 安装依赖

```bash
cd agent-webview
pnpm install
```

### 2. 构建

```bash
pnpm run build
```

输出文件：
- `dist/agent-webview.js` - IIFE 格式（用于 `<script>` 标签）
- `dist/agent-webview.esm.js` - ES Module 格式

### 3. 在 WebView 中使用

```html
<script src="agent-webview.js"></script>
<script>
  // 初始化（配置由 Native 注入）
  await window.AgentWebView.initialize({
    GEMINI_API_KEY: 'your-api-key',
    GEMINI_BASE_URL: 'https://api.openai.com/v1',
    GEMINI_MODEL: 'gpt-4',
    baseUrl: 'https://your-server.com'
  });

  // 发送消息
  await window.AgentWebView.sendTextMessage('Find me Chinese restaurants in New York');

  // 监听事件
  window.AgentWebView.on('event', (event) => {
    if (event.type === 'complete') {
      console.log('Response:', event.parts);
    }
  });
</script>
```

## API 参考

### `AgentWebView.initialize(config)`

初始化 Agent。

**参数:**
- `config.GEMINI_API_KEY` / `config.OPENROUTER_API_KEY` / `config.DASHSCOPE_API_KEY` - API 密钥
- `config.GEMINI_BASE_URL` / `config.OPENROUTER_BASE_URL` / `config.DASHSCOPE_BASE_URL` - API 基础 URL
- `config.GEMINI_MODEL` / `config.OPENROUTER_MODEL` / `config.DASHSCOPE_MODEL` - 模型名称
- `config.baseUrl` - 静态资源基础 URL

**返回:** `Promise<{ success: boolean, sessionId?: string, error?: string }>`

### `AgentWebView.sendTextMessage(text, useUI)`

发送文本消息。

**参数:**
- `text` - 消息文本
- `useUI` - 是否使用 A2UI 模式（默认 true）

### `AgentWebView.sendUIEvent(actionName, context)`

发送 UI 事件（如按钮点击）。

**参数:**
- `actionName` - 动作名称（如 'book_restaurant'）
- `context` - 动作上下文数据

### `AgentWebView.on(eventType, callback)`

监听事件。

**事件类型:**
- `'event'` - Agent 响应事件
- `'error'` - 错误事件

**事件数据:**
```javascript
// working 状态
{ type: 'working', message: 'Finding restaurants...' }

// 完成状态
{ type: 'complete', parts: [{ kind: 'text', text: '...' }, { kind: 'data', data: {...} }] }

// 错误
{ type: 'error', message: 'Error message' }
```

### `AgentWebView.resetSession()`

重置会话，生成新的 Session ID。

### `AgentWebView.getStatus()`

获取当前状态。

**返回:** `{ initialized: boolean, sessionId: string, agentCard: Object }`

## Native 集成

### WebView 跨域配置

**重要：需要在 Native 端配置 WebView 允许跨域访问，无需 API 代理。**

#### iOS (Swift)

```swift
let config = WKWebViewConfiguration()
config.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
config.setValue(true, forKey: "allowUniversalAccessFromFileURLs")
```

#### Android (Kotlin)

```kotlin
webView.settings.apply {
    javaScriptEnabled = true
    domStorageEnabled = true
    allowFileAccess = true
    allowContentAccess = true
    allowFileAccessFromFileURLs = true
    allowUniversalAccessFromFileURLs = true
    mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
}
```

### iOS 完整示例 (Swift + WKWebView)

```swift
import WebKit

class AgentViewController: UIViewController, WKScriptMessageHandler {
    var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let config = WKWebViewConfiguration()
        // 跨域配置
        config.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        config.setValue(true, forKey: "allowUniversalAccessFromFileURLs")
        // 注册消息处理器
        config.userContentController.add(self, name: "AgentMessageBus")
        
        webView = WKWebView(frame: view.bounds, configuration: config)
        view.addSubview(webView)
        
        // 加载 HTML
        if let htmlPath = Bundle.main.path(forResource: "agent", ofType: "html") {
            let htmlUrl = URL(fileURLWithPath: htmlPath)
            webView.loadFileURL(htmlUrl, allowingReadAccessTo: htmlUrl.deletingLastPathComponent())
        }
    }
    
    // 初始化 Agent（注入配置）
    func initializeAgent() {
        let config: [String: Any] = [
            "GEMINI_API_KEY": "your-api-key",
            "GEMINI_BASE_URL": "https://generativelanguage.googleapis.com/v1beta",
            "GEMINI_MODEL": "gemini-1.5-flash",
            "baseUrl": "https://your-server.com"
        ]
        let jsonData = try! JSONSerialization.data(withJSONObject: config)
        let jsonString = String(data: jsonData, encoding: .utf8)!
        webView.evaluateJavaScript("AgentWebView.initialize(\(jsonString))")
    }
    
    // 发送用户消息
    func sendUserMessage(_ text: String) {
        let message: [String: Any] = [
            "kind": "message",
            "role": "user", 
            "parts": [["kind": "text", "text": text]]
        ]
        let context: [String: Any] = [
            "requestedExtensions": ["https://a2ui.org/a2a-extension/a2ui/v0.8"]
        ]
        let msgJson = try! JSONSerialization.data(withJSONObject: message)
        let ctxJson = try! JSONSerialization.data(withJSONObject: context)
        let msgStr = String(data: msgJson, encoding: .utf8)!
        let ctxStr = String(data: ctxJson, encoding: .utf8)!
        
        webView.evaluateJavaScript("AgentBridge.sendUserMessage(\(msgStr), \(ctxStr))")
    }
    
    // 处理来自 WebView 的消息
    func userContentController(_ userContentController: WKUserContentController, 
                               didReceive message: WKScriptMessage) {
        guard let jsonString = message.body as? String,
              let data = jsonString.data(using: .utf8),
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let type = json["type"] as? String else { return }
        
        switch type {
        case "agent-ready":
            print("Agent ready: \(json["payload"] ?? "")")
        case "agent-event":
            handleAgentEvent(json["payload"] as? [String: Any] ?? [:])
        case "agent-error":
            print("Agent error: \(json["payload"] ?? "")")
        default:
            break
        }
    }
    
    func handleAgentEvent(_ event: [String: Any]) {
        // 处理 A2A 协议事件
        print("Agent event: \(event)")
    }
}
```

### Android 完整示例 (Kotlin + WebView)

```kotlin
class AgentWebViewActivity : AppCompatActivity() {
    private lateinit var webView: WebView
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        webView = WebView(this).apply {
            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                // 跨域配置
                allowFileAccess = true
                allowContentAccess = true
                allowFileAccessFromFileURLs = true
                allowUniversalAccessFromFileURLs = true
                mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            }
            // 注册消息处理器
            addJavascriptInterface(NativeAgentBus(), "NativeAgentBus")
            loadUrl("file:///android_asset/agent.html")
        }
        
        setContentView(webView)
    }
    
    // 初始化 Agent
    fun initializeAgent() {
        val config = JSONObject().apply {
            put("GEMINI_API_KEY", "your-api-key")
            put("GEMINI_BASE_URL", "https://generativelanguage.googleapis.com/v1beta")
            put("GEMINI_MODEL", "gemini-1.5-flash")
            put("baseUrl", "https://your-server.com")
        }
        runOnUiThread {
            webView.evaluateJavascript("AgentWebView.initialize($config)", null)
        }
    }
    
    // 发送用户消息
    fun sendUserMessage(text: String) {
        val message = JSONObject().apply {
            put("kind", "message")
            put("role", "user")
            put("parts", JSONArray().put(JSONObject().apply {
                put("kind", "text")
                put("text", text)
            }))
        }
        val context = JSONObject().apply {
            put("requestedExtensions", JSONArray().put("https://a2ui.org/a2a-extension/a2ui/v0.8"))
        }
        runOnUiThread {
            webView.evaluateJavascript("AgentBridge.sendUserMessage($message, $context)", null)
        }
    }
    
    inner class NativeAgentBus {
        @JavascriptInterface
        fun postMessage(jsonString: String) {
            val json = JSONObject(jsonString)
            when (json.optString("type")) {
                "agent-ready" -> {
                    Log.d("Agent", "Agent ready: ${json.optJSONObject("payload")}")
                }
                "agent-event" -> {
                    handleAgentEvent(json.optJSONObject("payload"))
                }
                "agent-error" -> {
                    Log.e("Agent", "Agent error: ${json.optJSONObject("payload")}")
                }
            }
        }
    }
    
    private fun handleAgentEvent(event: JSONObject?) {
        // 处理 A2A 协议事件
        Log.d("Agent", "Agent event: $event")
    }
}
```

## 与原 agent-js 的差异

| 原模块 | WebView 版本 | 变更说明 |
|--------|-------------|----------|
| `server.js` | 移除 | 功能由 Native Bridge 替代 |
| `@a2a-js/sdk/server` | `a2a-sdk-browser/` | **浏览器适配版本，保持 A2A 协议** |
| `agent_executor.js` | `agent-executor.js` | 基本复用，使用 Native Transport |
| `tools.js` (使用 fs) | `tools.js` + `restaurant-data.js` | 内联数据 |
| `dotenv` | `config.js` | Native 运行时注入 |
| `express`, `cors` | 移除 | WebView 配置跨域，无需服务器 |

## 安全注意事项

1. **API Key 安全**: 不要在 JS 中硬编码 API Key，应由 Native 端在运行时注入
2. **HTTPS**: 所有 API 请求应使用 HTTPS
3. **输入验证**: 对 Native 传入的数据进行校验
4. **CSP**: 配置合适的 Content Security Policy
5. **WebView 跨域**: 仅在必要时开启，生产环境应限制允许的域名

## License

Apache-2.0
