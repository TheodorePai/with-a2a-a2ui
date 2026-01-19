/**
 * A2A SDK 浏览器适配层入口
 * 保持 A2A 协议能力，用 Native Bridge 替代 HTTP 传输
 * 
 * 导出与 @a2a-js/sdk/server 兼容的接口：
 * - InMemoryTaskStore (TaskStore 实现)
 * - DefaultExecutionEventBus (ExecutionEventBus 实现)
 * - DefaultExecutionEventBusManager (EventBusManager 实现)
 * - RequestContext (请求上下文类)
 * - BrowserRequestHandler (DefaultRequestHandler 的浏览器版本)
 * - NativeTransport (HTTP 传输的替代实现)
 */

export { BrowserRequestHandler } from './request-handler.js';
export { InMemoryTaskStore } from './task-store.js';
export { DefaultExecutionEventBus, DefaultExecutionEventBusManager } from './execution-event-bus.js';
export { RequestContext } from './request-context.js';
export { NativeTransport, nativeTransport } from './native-transport.js';
export { agentMessageBus } from '../native-bridge.js';
