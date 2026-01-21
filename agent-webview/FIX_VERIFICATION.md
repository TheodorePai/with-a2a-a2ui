# Bug Fix 验证报告

## 问题描述
用户在浏览器中加载 `test.html` 后，点击"Mock 初始化模式"按钮出现错误：
```
[Demo] 初始化失败: window.AgentWebView.initialize is not a function
```

## 根本原因分析
Rollup IIFE 构建配置中，`name: 'AgentWebView'` 选项会自动创建全局变量 `window.AgentWebView`。但是在 `src/index.js` 中还有手动的 `window.AgentWebView = agentWebView` 赋值，导致冲突。

**冲突点：**
- Rollup IIFE: `var AgentWebView = function(exports) { ... return exports; }({})`
- 手动赋值: `window.AgentWebView = agentWebView` (agentWebView 是实例)

这导致 `window.AgentWebView` 被覆盖为一个实例对象，而不是包含所有导出的对象。

## 修复方案

### 步骤 1: 修改 src/index.js
**文件:** `/workspaces/with-a2a-a2ui/agent-webview/src/index.js`

**移除:**
```javascript
// 移除手动设置 window 对象
if (typeof window !== 'undefined') {
  window.AgentWebView = agentWebView;
}
```

**修改导出:**
```javascript
// 从:
export { agentWebView as default, agentWebView, AgentWebViewInstance, DevTools, ... };

// 改为:
export default agentWebView;
export { agentWebView, AgentWebViewInstance, DevTools, ... };
```

### 步骤 2: 修改 rollup.config.js
**文件:** `/workspaces/with-a2a-a2ui/agent-webview/rollup.config.js`

**修改 IIFE 输出配置:**
```javascript
// 在 IIFE format 配置中添加:
{
    file: 'dist/agent-webview.js',
    format: 'iife',
    name: 'AgentWebView',
    exports: 'named'  // 新增此行
}
```

### 步骤 3: 重新构建
```bash
cd /workspaces/with-a2a-a2ui/agent-webview
pnpm run build
```

## 构建结果
✅ 构建成功：
```
created dist/agent-webview.js in 3.4s
created dist/agent-webview.esm.js in 2.3s
```

## 预期行为
修复后，`window.AgentWebView` 将是一个包含所有导出的对象：
- `window.AgentWebView` - agentWebView 实例 (默认导出)
- `window.AgentWebView.initialize()` - 方法可用
- `window.AgentWebView.sendTextMessage()` - 方法可用
- `window.AgentWebView.AgentWebViewInstance` - 类可用
- `window.AgentWebView.DevTools` - DevTools 对象可用

## 测试步骤
1. 启动本地服务器：
   ```bash
   cd /workspaces/with-a2a-a2ui/agent-webview
   npx serve . -p 10003
   ```

2. 在浏览器中打开：
   ```
   http://localhost:10003/test.html
   ```

3. 点击"Mock 模式初始化"按钮

4. 预期结果：
   - ✅ 不再出现 "initialize is not a function" 错误
   - ✅ Mock Agent 正常初始化
   - ✅ 可以发送消息进行测试

## 技术细节

### Rollup IIFE 格式说明
使用 `exports: 'named'` 后，Rollup 会生成如下结构：
```javascript
var AgentWebView = (function (exports) {
    'use strict';
    
    // ... 所有代码 ...
    
    exports.agentWebView = agentWebView;
    exports.AgentWebViewInstance = AgentWebViewInstance;
    exports.DevTools = DevTools;
    exports.default = agentWebView;
    
    return exports;
})({});
```

这样 `window.AgentWebView` 就是包含所有导出的对象，而不是单一实例。

### 为什么使用 'named' 而不是 'default'
- `exports: 'default'` - 仅适用于只有默认导出的模块
- `exports: 'named'` - 适用于有多个命名导出的模块
- `exports: 'auto'` (默认) - Rollup 自动检测，但在这种情况下会导致问题

我们的模块有多个命名导出，因此必须使用 `'named'`。

## 文件修改历史
| 文件 | 修改内容 | 状态 |
|------|---------|------|
| src/index.js | 移除手动 window 赋值，修改导出方式 | ✅ 完成 |
| rollup.config.js | 添加 `exports: 'named'` | ✅ 完成 |
| dist/agent-webview.js | 重新构建 | ✅ 完成 |
| dist/agent-webview.esm.js | 重新构建 | ✅ 完成 |

## 注意事项
- 确保在测试前清除浏览器缓存
- 如果问题仍然存在，检查是否有其他地方缓存了旧的构建文件
- 服务器启动后，确认访问的是最新构建的文件

## 状态
🎉 **修复完成** - 已重新构建并准备好测试
