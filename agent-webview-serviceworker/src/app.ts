/*
 * A2UI Shell App 组件
 * 
 * 基于 Lit 框架重构，参考 renderers/shell/app.ts
 * 支持 ServiceWorker 模式和直接服务器模式
 */

import { SignalWatcher } from "@lit-labs/signals";
import { provide } from "@lit/context";
import {
  LitElement,
  html,
  css,
  nothing,
  unsafeCSS,
} from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";
import { v0_8 } from "@a2ui/lit";
import * as UI from "@a2ui/lit/ui";

import { theme as uiTheme } from "./theme/default-theme.js";
import { A2UIClient, ServiceWorkerController, ServiceWorkerConfig } from "./client.js";
import { AppConfig, ApiConfig, restaurantConfig } from "./configs/index.js";

// 配置映射
const configs: Record<string, AppConfig> = {
  restaurant: restaurantConfig,
};

// 状态类型
type AppStatus = "loading" | "config" | "ready" | "error";

@customElement("a2ui-shell")
export class A2UIShell extends SignalWatcher(LitElement) {
  // 使用 property 而不是 accessor + @provide 来避免装饰器兼容性问题
  theme: v0_8.Types.Theme = uiTheme;

  @state()
  accessor requesting = false;

  @state()
  accessor error: string | null = null;

  @state()
  accessor lastMessages: v0_8.Types.ServerToClientMessage[] = [];

  @state()
  accessor config: AppConfig = configs.restaurant;

  @state()
  accessor appStatus: AppStatus = "loading";

  @state()
  accessor loadingTextIndex = 0;

  @state()
  accessor showConfigPanel = false;

  private loadingInterval: number | undefined;
  private processor = v0_8.Data.createSignalA2uiMessageProcessor();
  private a2uiClient: A2UIClient;
  private swController: ServiceWorkerController;

  static styles = [
    unsafeCSS(v0_8.Styles.structuralStyles),
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        max-width: 640px;
        margin: 0 auto;
        min-height: 100%;
        color: light-dark(var(--n-10), var(--n-90));
        font-family: var(--font-family);
      }

      #hero-img {
        width: 100%;
        max-width: 400px;
        aspect-ratio: 1280/720;
        height: auto;
        margin-bottom: var(--bb-grid-size-6);
        display: block;
        margin: 0 auto;
        background: var(--background-image-light) center center / contain no-repeat;
      }

      #surfaces {
        width: 100%;
        max-width: 100svw;
        padding: var(--bb-grid-size-3);
        animation: fadeIn 1s cubic-bezier(0, 0, 0.3, 1) 0.3s backwards;
      }

      form {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 16px;
        align-items: center;
        padding: 16px 0;
        animation: fadeIn 1s cubic-bezier(0, 0, 0.3, 1) 1s backwards;

        & h1 {
          color: light-dark(var(--p-40), var(--n-90));
        }

        & > div {
          display: flex;
          flex: 1;
          gap: 16px;
          align-items: center;
          width: 100%;

          & > input {
            display: block;
            flex: 1;
            border-radius: 32px;
            padding: 16px 24px;
            border: 1px solid var(--p-60);
            background: light-dark(var(--n-100), var(--n-10));
            font-size: 16px;
          }

          & > button {
            display: flex;
            align-items: center;
            background: var(--p-40);
            color: var(--n-100);
            border: none;
            padding: 8px 16px;
            border-radius: 32px;
            opacity: 0.5;

            &:not([disabled]) {
              cursor: pointer;
              opacity: 1;
            }
          }
        }
      }

      .pending {
        width: 100%;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        animation: fadeIn 1s cubic-bezier(0, 0, 0.3, 1) 0.3s backwards;
        gap: 16px;
      }

      .spinner {
        width: 48px;
        height: 48px;
        border: 4px solid rgba(255, 255, 255, 0.1);
        border-left-color: var(--p-60);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      .theme-toggle {
        padding: 0;
        margin: 0;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: var(--bb-grid-size-3);
        right: var(--bb-grid-size-4);
        background: light-dark(var(--n-100), var(--n-0));
        border-radius: 50%;
        color: var(--p-30);
        cursor: pointer;
        width: 48px;
        height: 48px;
        font-size: 32px;

        & .g-icon {
          pointer-events: none;

          &::before {
            content: "dark_mode";
          }
        }
      }

      @container style(--color-scheme: dark) {
        .theme-toggle .g-icon::before {
          content: "light_mode";
          color: var(--n-90);
        }

        #hero-img {
          background-image: var(--background-image-dark);
        }
      }

      /* 配置面板 */
      .config-panel {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
      }

      .config-content {
        background: light-dark(var(--n-100), var(--n-15));
        padding: 32px;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        max-width: 450px;
        width: 90%;

        & h2 {
          margin: 0 0 8px 0;
          color: var(--p-40);
        }

        & .description {
          color: var(--n-50);
          font-size: 0.9rem;
          margin-bottom: 24px;
        }

        & .form-group {
          margin-bottom: 20px;

          & label {
            display: block;
            margin-bottom: 6px;
            font-weight: 500;
            color: light-dark(var(--n-10), var(--n-90));
          }

          & input {
            width: 100%;
            padding: 12px;
            border: 1px solid var(--n-80);
            border-radius: 8px;
            font-size: 1rem;
            background: light-dark(var(--n-100), var(--n-20));
            color: light-dark(var(--n-10), var(--n-90));

            &:focus {
              outline: none;
              border-color: var(--p-50);
              box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
            }
          }

          & small {
            display: block;
            margin-top: 4px;
            color: var(--n-50);
            font-size: 0.8rem;
          }
        }

        & .form-actions {
          margin-top: 24px;

          & button {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #818cf8 0%, #a78bfa 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
              box-shadow: 0 4px 15px rgba(129, 140, 248, 0.4);
              transform: translateY(-1px);
            }
          }
        }
      }

      .error {
        color: var(--e-40);
        background-color: light-dark(var(--e-95), var(--e-20));
        border: 1px solid var(--e-80);
        padding: 16px;
        border-radius: 8px;
        margin: 16px;
      }

      .status-bar {
        padding: 8px 16px;
        background: light-dark(var(--n-98), var(--n-15));
        border-bottom: 1px solid light-dark(var(--n-90), var(--n-25));
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .status-indicator {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 0.85rem;
        padding: 4px 12px;
        border-radius: 12px;

        &::before {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        &.loading {
          background-color: light-dark(#fff3e0, #4a3825);
          color: light-dark(#e65100, #ffb74d);

          &::before {
            background-color: #ff9800;
            animation: pulse 1s infinite;
          }
        }

        &.ready {
          background-color: light-dark(#e8f5e9, #1b3d25);
          color: light-dark(#2e7d32, #81c784);

          &::before {
            background-color: #4caf50;
          }
        }

        &.error {
          background-color: light-dark(#ffebee, #3d1b1b);
          color: light-dark(#c62828, #ef5350);

          &::before {
            background-color: #f44336;
          }
        }
      }

      .config-button {
        background: transparent;
        border: 1px solid var(--n-70);
        border-radius: 8px;
        padding: 6px 12px;
        color: light-dark(var(--n-30), var(--n-70));
        cursor: pointer;
        font-size: 0.85rem;

        &:hover {
          background: light-dark(var(--n-95), var(--n-20));
        }
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `,
  ];

  constructor() {
    super();
    this.swController = new ServiceWorkerController();
    this.a2uiClient = new A2UIClient();
  }

  async connectedCallback() {
    super.connectedCallback();

    // 从 URL 加载配置
    const urlParams = new URLSearchParams(window.location.search);
    const appKey = urlParams.get("app") || "restaurant";
    this.config = configs[appKey] || configs.restaurant;

    // 应用主题
    if (this.config.theme) {
      this.theme = this.config.theme;
    }

    window.document.title = this.config.title;
    if (this.config.background) {
      window.document.documentElement.style.setProperty(
        "--background",
        this.config.background
      );
    }

    // 初始化客户端
    this.a2uiClient = new A2UIClient(this.config.serverUrl);

    // 初始化 ServiceWorker
    await this.initServiceWorker();
  }

  private async initServiceWorker() {
    try {
      this.appStatus = "loading";
      await this.swController.register();

      // 检查是否有保存的配置
      const savedConfig = this.loadConfig();
      if (savedConfig?.apiKey) {
        await this.initAgent(savedConfig);
      } else {
        this.appStatus = "config";
        this.showConfigPanel = true;
      }
    } catch (error) {
      console.error("[App] ServiceWorker init failed:", error);
      this.error = `ServiceWorker 初始化失败: ${(error as Error).message}`;
      this.appStatus = "error";
    }
  }

  private async initAgent(config: ServiceWorkerConfig) {
    try {
      this.appStatus = "loading";
      await this.swController.initAgent(config);
      this.appStatus = "ready";
      this.showConfigPanel = false;
    } catch (error) {
      console.error("[App] Agent init failed:", error);
      this.error = `Agent 初始化失败: ${(error as Error).message}`;
      this.appStatus = "error";
      this.showConfigPanel = true;
    }
  }

  private loadConfig(): ApiConfig | null {
    try {
      const saved = localStorage.getItem("agent-config");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.warn("[App] Failed to load config:", e);
      return null;
    }
  }

  private saveConfig(config: ApiConfig) {
    try {
      localStorage.setItem("agent-config", JSON.stringify(config));
    } catch (e) {
      console.warn("[App] Failed to save config:", e);
    }
  }

  render() {
    return html`
      ${this.renderStatusBar()}
      ${this.renderThemeToggle()}
      ${this.maybeRenderConfigPanel()}
      ${this.maybeRenderForm()}
      ${this.maybeRenderData()}
      ${this.maybeRenderError()}
    `;
  }

  private renderStatusBar() {
    const statusClass = this.appStatus === "config" ? "loading" : this.appStatus;
    const statusText = {
      loading: "正在初始化...",
      config: "等待配置...",
      ready: "Agent 已就绪",
      error: "出现错误",
    }[this.appStatus];

    return html`
      <div class="status-bar">
        <span class="status-indicator ${statusClass}">${statusText}</span>
        <button class="config-button" @click=${() => this.showConfigPanel = true}>
          ⚙️ 配置
        </button>
      </div>
    `;
  }

  private renderThemeToggle() {
    return html`
      <button
        @click=${(evt: Event) => {
          if (!(evt.target instanceof HTMLButtonElement)) return;
          const { colorScheme } = window.getComputedStyle(evt.target);
          if (colorScheme === "dark") {
            document.body.classList.add("light");
            document.body.classList.remove("dark");
          } else {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
          }
        }}
        class="theme-toggle"
      >
        <span class="g-icon filled-heavy"></span>
      </button>
    `;
  }

  private maybeRenderConfigPanel() {
    if (!this.showConfigPanel) return nothing;

    return html`
      <div class="config-panel" @click=${(e: Event) => {
        if (e.target === e.currentTarget) {
          this.showConfigPanel = false;
        }
      }}>
        <div class="config-content">
          <h2>配置 OpenAI API</h2>
          <p class="description">
            请输入您的 OpenAI API 配置信息。您的配置将保存在本地浏览器中。
          </p>

          <div class="form-group">
            <label for="api-key-input">API Key</label>
            <input type="password" id="api-key-input" placeholder="sk-..." autocomplete="off">
          </div>

          <div class="form-group">
            <label for="base-url-input">Base URL</label>
            <input type="text" id="base-url-input" placeholder="https://api.openai.com/v1" value="https://api.openai.com/v1">
            <small>支持 OpenAI、OpenRouter、通义千问等兼容 API</small>
          </div>

          <div class="form-group">
            <label for="model-input">Model</label>
            <input type="text" id="model-input" placeholder="gpt-4" value="gpt-4">
          </div>

          <div class="form-actions">
            <button @click=${this.handleSaveConfig}>保存并启动</button>
          </div>
        </div>
      </div>
    `;
  }

  private handleSaveConfig = async () => {
    const apiKeyInput = this.shadowRoot?.querySelector("#api-key-input") as HTMLInputElement;
    const baseUrlInput = this.shadowRoot?.querySelector("#base-url-input") as HTMLInputElement;
    const modelInput = this.shadowRoot?.querySelector("#model-input") as HTMLInputElement;

    const config: ApiConfig = {
      apiKey: apiKeyInput?.value.trim() || "",
      baseURL: baseUrlInput?.value.trim() || "https://api.openai.com/v1",
      model: modelInput?.value.trim() || "gpt-4",
    };

    if (!config.apiKey) {
      alert("请输入 API Key");
      return;
    }

    this.saveConfig(config);
    await this.initAgent(config);
  };

  private maybeRenderError() {
    if (!this.error) return nothing;

    return html`<div class="error">${this.error}</div>`;
  }

  private maybeRenderForm() {
    if (this.requesting) return nothing;
    if (this.lastMessages.length > 0) return nothing;
    if (this.appStatus !== "ready") return nothing;

    return html`
      <form
        @submit=${async (evt: Event) => {
          evt.preventDefault();
          if (!(evt.target instanceof HTMLFormElement)) {
            return;
          }
          const data = new FormData(evt.target);
          const body = data.get("body") ?? null;
          if (!body) {
            return;
          }
          const message = body as v0_8.Types.A2UIClientEventMessage;
          await this.sendAndProcessMessage(message);
        }}
      >
        ${this.config.heroImage
          ? html`<div
              style=${styleMap({
                "--background-image-light": `url(${this.config.heroImage})`,
                "--background-image-dark": `url(${this.config.heroImageDark ?? this.config.heroImage})`,
              })}
              id="hero-img"
            ></div>`
          : nothing}
        <h1 class="app-title">${this.config.title}</h1>
        <div>
          <input
            required
            value="${this.config.placeholder}"
            autocomplete="off"
            id="body"
            name="body"
            type="text"
            ?disabled=${this.requesting}
          />
          <button type="submit" ?disabled=${this.requesting}>
            <span class="g-icon filled-heavy">send</span>
          </button>
        </div>
      </form>
    `;
  }

  private startLoadingAnimation() {
    if (
      Array.isArray(this.config.loadingText) &&
      this.config.loadingText.length > 1
    ) {
      this.loadingTextIndex = 0;
      this.loadingInterval = window.setInterval(() => {
        this.loadingTextIndex =
          (this.loadingTextIndex + 1) %
          (this.config.loadingText as string[]).length;
      }, 2000);
    }
  }

  private stopLoadingAnimation() {
    if (this.loadingInterval) {
      clearInterval(this.loadingInterval);
      this.loadingInterval = undefined;
    }
  }

  private async sendMessage(
    message: v0_8.Types.A2UIClientEventMessage
  ): Promise<v0_8.Types.ServerToClientMessage[]> {
    try {
      this.requesting = true;
      this.error = null;
      this.startLoadingAnimation();
      
      const response = await this.a2uiClient.send(message);
      
      return response;
    } catch (err) {
      console.error("[App] Send message failed:", err);
      this.error = `发送失败: ${(err as Error).message}`;
      return [];
    } finally {
      this.requesting = false;
      this.stopLoadingAnimation();
    }
  }

  private maybeRenderData() {
    if (this.requesting) {
      let text = "Awaiting an answer...";
      if (this.config.loadingText) {
        if (Array.isArray(this.config.loadingText)) {
          text = this.config.loadingText[this.loadingTextIndex];
        } else {
          text = this.config.loadingText;
        }
      }

      return html`
        <div class="pending">
          <div class="spinner"></div>
          <div class="loading-text">${text}</div>
        </div>
      `;
    }

    const surfaces = this.processor.getSurfaces();
    if (surfaces.size === 0) {
      return nothing;
    }

    return html`
      <section id="surfaces">
        ${repeat(
          this.processor.getSurfaces(),
          ([surfaceId]) => surfaceId,
          ([surfaceId, surface]) => {
            return html`
              <a2ui-surface
                @a2uiaction=${async (
                  evt: v0_8.Events.StateEvent<"a2ui.action">
                ) => {
                  const [target] = evt.composedPath();
                  if (!(target instanceof HTMLElement)) {
                    return;
                  }

                  const context: Record<string, unknown> = {};
                  if (evt.detail.action.context) {
                    const srcContext = evt.detail.action.context;
                    for (const item of srcContext) {
                      if (item.value.literalBoolean !== undefined) {
                        context[item.key] = item.value.literalBoolean;
                      } else if (item.value.literalNumber !== undefined) {
                        context[item.key] = item.value.literalNumber;
                      } else if (item.value.literalString !== undefined) {
                        context[item.key] = item.value.literalString;
                      } else if (item.value.path && evt.detail.sourceComponent) {
                        const path = this.processor.resolvePath(
                          item.value.path,
                          evt.detail.dataContextPath
                        );
                        const value = this.processor.getData(
                          evt.detail.sourceComponent,
                          path,
                          surfaceId
                        );
                        context[item.key] = value;
                      }
                    }
                  }

                  const message: v0_8.Types.A2UIClientEventMessage = {
                    userAction: {
                      name: evt.detail.action.name,
                      surfaceId,
                      sourceComponentId: target.id,
                      timestamp: new Date().toISOString(),
                      context,
                    },
                  };

                  await this.sendAndProcessMessage(message);
                }}
                .surfaceId=${surfaceId}
                .surface=${surface}
                .processor=${this.processor}
              ></a2ui-surface>
            `;
          }
        )}
      </section>
    `;
  }

  private async sendAndProcessMessage(request: v0_8.Types.A2UIClientEventMessage | string) {
    const messages = await this.sendMessage(request as v0_8.Types.A2UIClientEventMessage);

    console.log("[App] Received messages:", messages);

    this.lastMessages = messages;
    this.processor.clearSurfaces();
    this.processor.processMessages(messages);
  }
}
