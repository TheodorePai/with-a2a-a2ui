# Agent WebView ServiceWorker

这个项目将 agent-webview（后端）和前端 App 整合在一起，通过 ServiceWorker 实现通信。前端基于 Lit 框架和 @a2ui/lit 组件库实现。

## 项目结构

```
agent-webview-serviceworker/
├── index.html              # 前端入口页面
├── sw.js                   # ServiceWorker（拦截请求）
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 前端构建配置
├── rollup.config.js        # Agent 构建配置
├── rollup.sw.config.js     # ServiceWorker Agent 构建配置
├── src/
│   ├── app.ts              # 前端应用主组件 (Lit)
│   ├── client.ts           # A2UI 客户端和 ServiceWorker 控制器
│   ├── vite-env.d.ts       # Vite 类型声明
│   ├── configs/            # 应用配置
│   │   ├── index.ts        # 配置导出
│   │   ├── types.ts        # 配置类型定义
│   │   └── restaurant.ts   # 餐厅应用配置
│   ├── theme/              # 主题配置
│   │   ├── index.ts        # 主题导出
│   │   └── default-theme.ts # 默认主题定义
│   └── agent-webview/      # Agent 核心代码
│       ├── index.js
│       ├── agent.js
│       ├── agent-executor.js
│       ├── openai-adapter.js
│       ├── tools.js
│       ├── restaurant-data.js
│       ├── prompt_builder.js
│       ├── a2ui_examples.js
│       ├── config.js
│       ├── message-bus.js
│       ├── a2ui-extension.js
│       └── a2a-sdk-browser/
│           ├── index.js
│           ├── request-handler.js
│           ├── task-store.js
│           ├── execution-event-bus.js
│           ├── request-context.js
│           └── native-transport.js
├── static/                 # 静态资源（餐厅图片）
└── dist/                   # 编译输出目录
```

## 工作原理

### 架构图

```
┌─────────────────────────────────────────────────────────────┐
│                         浏览器                               │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    WebView (App)                     │    │
│  │  ┌─────────────┐    ┌──────────────────────────┐    │    │
│  │  │   index.html │    │       app.js             │    │    │
│  │  │   (UI 界面)  │    │  (用户交互、消息发送)    │    │    │
│  │  └─────────────┘    └──────────────────────────┘    │    │
│  │                              │                       │    │
│  │                              │ fetch localhost:10002 │    │
│  │                              ▼                       │    │
│  └──────────────────────────────┼───────────────────────┘    │
│                                 │                            │
│  ┌──────────────────────────────┼───────────────────────┐    │
│  │               ServiceWorker (sw.js)                   │    │
│  │                              │                        │    │
│  │              ┌───────────────▼───────────────┐        │    │
│  │              │     请求拦截 & 路由处理       │        │    │
│  │              │  - /agent-card               │        │    │
│  │              │  - /a2a (A2A 协议)          │        │    │
│  │              │  - /static/* (静态资源)      │        │    │
│  │              └───────────────┬───────────────┘        │    │
│  │                              │                        │    │
│  │              ┌───────────────▼───────────────┐        │    │
│  │              │     agent-webview-sw.js       │        │    │
│  │              │     (Agent 执行逻辑)          │        │    │
│  │              └───────────────┬───────────────┘        │    │
│  └──────────────────────────────┼────────────────────────┘    │
│                                 │                            │
└─────────────────────────────────┼────────────────────────────┘
                                  │ HTTPS
                                  ▼
                          ┌──────────────┐
                          │  OpenAI API  │
                          │  (或兼容 API) │
                          └──────────────┘
```

### 通信流程

1. **用户输入消息** → App (app.js) 发送 fetch 请求到 `localhost:10002/a2a`
2. **ServiceWorker 拦截** → sw.js 拦截请求，转发给 agent-webview
3. **Agent 处理** → agent-webview 调用 OpenAI API，执行工具，生成响应
4. **返回 SSE 流** → 通过 Server-Sent Events 返回流式响应
5. **UI 更新** → App 解析响应，更新界面（支持 A2UI 富文本渲染）

## 快速开始

### 1. 安装依赖

```bash
cd agent-webview-serviceworker
pnpm install
# 或
npm install
```

### 2. 构建项目

```bash
# 构建 ServiceWorker Agent
npm run build:sw

# 构建前端应用
npm run build

# 构建所有
npm run build:all
```

### 3. 启动开发服务器

```bash
# 开发模式（Vite）
npm run dev
```

### 4. 打开浏览器

访问 http://localhost:3000

### 5. 配置 API Key

首次打开会显示配置面板，输入：
- **API Key**: 您的 OpenAI API Key（或兼容 API 的 Key）
- **Base URL**: API 端点（默认 https://api.openai.com/v1）
- **Model**: 模型名称（默认 gpt-4）

## 开发模式

```bash
# 启动 Vite 开发服务器（支持热重载）
npm run dev

# 如果修改了 Agent 代码，需要重新构建 ServiceWorker
npm run build:sw
```

## 支持的 API 提供商

- OpenAI (https://api.openai.com/v1)
- OpenRouter (https://openrouter.ai/api/v1)
- 通义千问 (https://dashscope.aliyuncs.com/compatible-mode/v1)
- 其他 OpenAI 兼容 API

## 功能特性

- ✅ ServiceWorker 请求拦截
- ✅ A2A 协议支持
- ✅ A2UI 富文本界面渲染（基于 @a2ui/lit）
- ✅ 流式响应 (SSE)
- ✅ 会话管理
- ✅ 配置持久化
- ✅ 主题系统支持
- ✅ 表单自动渲染
- ✅ 离线模式准备

## 技术栈

- **前端框架**: Lit (Web Components)
- **UI 组件**: @a2ui/lit (A2UI 官方 Lit 组件库)
- **状态管理**: @lit-labs/signals (响应式信号)
- **构建工具**: Vite (前端) + Rollup (ServiceWorker)
- **语言**: TypeScript
- **通信**: ServiceWorker + Fetch API
- **协议**: A2A (Agent-to-Agent), A2UI (Agent-to-UI)
- **AI**: OpenAI API 兼容接口

## 许可证

Apache-2.0
