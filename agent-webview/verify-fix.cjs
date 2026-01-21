// 这个脚本在浏览器环境模拟 window 对象来测试导出
const vm = require('vm');
const fs = require('fs');
const path = require('path');

// 读取构建的文件
const bundlePath = path.join(__dirname, 'dist/agent-webview.js');
const bundleCode = fs.readFileSync(bundlePath, 'utf-8');

// 创建一个模拟的浏览器环境
const sandbox = {
  window: {
    addEventListener: () => {},
    webkit: undefined,
    NativeAgentBus: undefined,
    ReactNativeWebView: undefined
  },
  console: console,
  setTimeout: setTimeout,
  Promise: Promise,
  Date: Date,
  Math: Math,
  JSON: JSON,
  Map: Map,
  Set: Set,
  Error: Error,
  Array: Array,
  Object: Object,
  String: String
};

// 让 window 在 sandbox 中全局可用
sandbox.window.window = sandbox.window;

try {
  // 运行 bundle 代码
  vm.createContext(sandbox);
  vm.runInContext(bundleCode, sandbox);
  
  // 验证导出
  const AgentWebView = sandbox.window.AgentWebView;
  
  console.log('\n=== 验证修复结果 ===\n');
  console.log('✓ Bundle 成功加载到 window 对象');
  console.log('✓ window.AgentWebView 类型:', typeof AgentWebView);
  console.log('✓ window.AgentWebView.initialize 类型:', typeof AgentWebView?.initialize);
  console.log('✓ window.AgentWebView.sendTextMessage 类型:', typeof AgentWebView?.sendTextMessage);
  console.log('✓ window.AgentWebView.sendUIEvent 类型:', typeof AgentWebView?.sendUIEvent);
  console.log('✓ window.AgentWebView.on 类型:', typeof AgentWebView?.on);
  
  if (typeof AgentWebView === 'object' && 
      typeof AgentWebView.initialize === 'function' &&
      typeof AgentWebView.sendTextMessage === 'function') {
    console.log('\n🎉 修复成功! window.AgentWebView 现在正确导出所有方法\n');
    process.exit(0);
  } else {
    console.error('\n❌ 修复失败! AgentWebView 对象结构不正确\n');
    console.log('AgentWebView 的所有键:', Object.keys(AgentWebView || {}));
    process.exit(1);
  }
} catch (error) {
  console.error('\n❌ 执行出错:', error.message);
  console.error(error.stack);
  process.exit(1);
}
