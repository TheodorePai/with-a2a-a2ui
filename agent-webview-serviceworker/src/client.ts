/*
 * A2UI Client for ServiceWorker-based Agent
 * 
 * 基于 renderers/shell/client.ts 改编
 * 通过 ServiceWorker 拦截请求并在本地处理
 */

import { v0_8 } from "@a2ui/lit";

const A2UI_MIME_TYPE = "application/json+a2ui";

export interface ServiceWorkerConfig {
  apiKey: string;
  baseURL?: string;
  model?: string;
}

/**
 * ServiceWorker 控制器
 * 管理 ServiceWorker 的注册、消息传递
 */
export class ServiceWorkerController {
  private registration: ServiceWorkerRegistration | null = null;
  private ready = false;
  private eventListeners = new Map<string, Array<(payload: unknown) => void>>();

  /**
   * 注册并初始化 ServiceWorker
   */
  async register(): Promise<ServiceWorkerRegistration> {
    if (!("serviceWorker" in navigator)) {
      throw new Error("ServiceWorker is not supported in this browser");
    }

    try {
      console.log("[A2UIClient] Registering ServiceWorker...");

      this.registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });

      console.log("[A2UIClient] ServiceWorker registered:", this.registration);

      await this.waitForActivation();
      this.setupMessageListener();
      this.ready = true;

      console.log("[A2UIClient] ServiceWorker ready");

      return this.registration;
    } catch (error) {
      console.error("[A2UIClient] ServiceWorker registration failed:", error);
      throw error;
    }
  }

  /**
   * 等待 ServiceWorker 激活
   */
  private async waitForActivation(): Promise<void> {
    return new Promise((resolve) => {
      if (this.registration?.active) {
        resolve();
        return;
      }

      const worker =
        this.registration?.installing || this.registration?.waiting;
      if (!worker) {
        resolve();
        return;
      }

      worker.addEventListener("statechange", () => {
        if (worker.state === "activated") {
          resolve();
        }
      });
    });
  }

  /**
   * 设置消息监听器
   */
  private setupMessageListener(): void {
    navigator.serviceWorker.addEventListener("message", (event) => {
      const { type, payload } = event.data;
      this.emit(type, payload);
    });
  }

  /**
   * 向 ServiceWorker 发送消息
   */
  postMessage(type: string, payload?: unknown): void {
    if (!this.registration?.active) {
      console.warn("[A2UIClient] ServiceWorker not active");
      return;
    }

    this.registration.active.postMessage({ type, payload });
  }

  /**
   * 初始化 Agent（通过 ServiceWorker）
   */
  async initAgent(config: ServiceWorkerConfig): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const onReady = (payload: unknown) => {
        this.off("AGENT_READY", onReady);
        this.off("AGENT_ERROR", onError);
        resolve(payload);
      };

      const onError = (payload: unknown) => {
        this.off("AGENT_READY", onReady);
        this.off("AGENT_ERROR", onError);
        const errorPayload = payload as { message: string };
        reject(new Error(errorPayload.message));
      };

      this.on("AGENT_READY", onReady);
      this.on("AGENT_ERROR", onError);

      this.postMessage("INIT_AGENT", config);
    });
  }

  /**
   * 获取状态
   */
  async getStatus(): Promise<unknown> {
    return new Promise((resolve) => {
      const onStatus = (payload: unknown) => {
        this.off("STATUS", onStatus);
        resolve(payload);
      };

      this.on("STATUS", onStatus);
      this.postMessage("GET_STATUS");
    });
  }

  /**
   * 事件发射
   */
  private emit(type: string, payload: unknown): void {
    const listeners = this.eventListeners.get(type) || [];
    listeners.forEach((listener) => listener(payload));
  }

  /**
   * 添加事件监听
   */
  on(type: string, listener: (payload: unknown) => void): this {
    if (!this.eventListeners.has(type)) {
      this.eventListeners.set(type, []);
    }
    this.eventListeners.get(type)!.push(listener);
    return this;
  }

  /**
   * 移除事件监听
   */
  off(type: string, listener: (payload: unknown) => void): this {
    const listeners = this.eventListeners.get(type);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
    return this;
  }

  isReady(): boolean {
    return this.ready;
  }
}

/**
 * A2UI 客户端
 * 通过 fetch 与 localhost:10002 通信，由 ServiceWorker 拦截处理
 */
export class A2UIClient {
  private baseUrl: string;
  private sessionId: string;

  constructor(serverUrl = "http://localhost:10002") {
    this.baseUrl = serverUrl;
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 发送消息到 Agent
   */
  async send(
    message: v0_8.Types.A2UIClientEventMessage | string
  ): Promise<v0_8.Types.ServerToClientMessage[]> {
    let requestBody: Record<string, unknown>;

    if (typeof message === "string") {
      requestBody = {
        message: {
          messageId: crypto.randomUUID(),
          kind: "message",
          role: "user",
          parts: [{ kind: "text", text: message }],
        },
        sessionId: this.sessionId,
        requestedExtensions: ["https://a2ui.org/a2a-extension/a2ui/v0.8"],
      };
    } else {
      requestBody = {
        message: {
          messageId: crypto.randomUUID(),
          kind: "message",
          role: "user",
          parts: [
            {
              kind: "data",
              data: message,
              mimeType: A2UI_MIME_TYPE,
            },
          ],
        },
        sessionId: this.sessionId,
        requestedExtensions: ["https://a2ui.org/a2a-extension/a2ui/v0.8"],
      };
    }

    const response = await fetch(`${this.baseUrl}/a2a`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-A2A-Extensions": "https://a2ui.org/a2a-extension/a2ui/v0.8",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    // 处理 SSE 流式响应
    const messages: v0_8.Types.ServerToClientMessage[] = [];
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("No response body");
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // 解析 SSE 数据
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const event = JSON.parse(line.slice(6));
            // 提取 A2UI 消息
            if (event.kind === "status-update" && event.status?.message?.parts) {
              for (const part of event.status.message.parts) {
                if (part.kind === "data" && part.data) {
                  messages.push(part.data as v0_8.Types.ServerToClientMessage);
                }
              }
            }
          } catch (e) {
            console.warn("[A2UIClient] Failed to parse SSE data:", line);
          }
        }
      }
    }

    return messages;
  }

  /**
   * 重置会话
   */
  resetSession(): void {
    this.sessionId = this.generateSessionId();
    console.log("[A2UIClient] Session reset:", this.sessionId);
  }

  /**
   * 获取当前会话 ID
   */
  getSessionId(): string {
    return this.sessionId;
  }
}
