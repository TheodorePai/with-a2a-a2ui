// A2UIInArkWeb.ets  (完整单文件)
import { webview } from '@kit.ArkWeb';

/* 步骤 3 ： ArkWeb 直接加载本地文件  */
@Component
export struct A2UIInArkWeb {
  // 1.  WebView 控制器
  private controller: webview.WebviewController = new webview.WebviewController();
  // 3.  用于 UI 的状态
  @State private lastA2UData: string = '';
  @State private msgCount: number = 0;
  schemeMap = new Map([
    ['https://www.locala2uiywh.com/index.html','a2ui/dist/index.html'],
    ['https://www.locala2uiywh.com/assets/app.js','a2ui/dist/assets/app.js'],
    ['https://www.locala2uiywh.com/hero.png','a2ui/dist/hero.png'],
    ['https://www.locala2uiywh.com/hero-dark.png','a2ui/dist/hero-dark.png'],
    // ['http://localhost:10002/.well-known/agent-card.json','a2ui/dist/agent-card.json'],
  ]);

  mimeType = new Map([
    ['a2ui/dist/index.html', 'text/html'],
    ['a2ui/dist/assets/app.js', 'text/javascript'],
    ['a2ui/dist/hero.png', 'image/png'],
    ['a2ui/dist/hero-dark.png', 'image/png'],
    ['a2ui/dist/agent-card.json', 'application/json'],
  ])



  /* 生命周期：页面加载完成后注入桥接脚本 */
  aboutToAppear() {

  }

  /* 向 A2UI 侧注入 JavaScript 桥接对象，供 HTML 调用 */
  private injectArkTSBridge(): void {
    const bridgeJS: string = `
      window.arktsBridge = {
        /* A2UI → ArkTS ：发送 JSON-RPC 消息  */
        sendA2UMessage: function(jsonRpc) {
          if (window.arktsBridge && window.arktsBridge.receiveFromA2U) {
            window.arktsBridge.receiveFromA2U(jsonRpc);
          }
        },
        /* ArkTS → A2UI ：回传响应  */
        sendResponseToA2U: function(response) {
          if (window.handleArkTSResponse) window.handleArkTSResponse(response);
        }
      };
      console.log('[A2UI] ArkTS 桥接已建立');
    `;
    this.controller.runJavaScript(bridgeJS);
  }

  // /* 注册 JavaScript 代理： ArkTS → A2UI  */
  // private setupJSProxy(): void {
  //   this.controller.registerJavaScriptProxy({
  //     name: 'arktsBridge',
  //     object: {
  //       receiveFromA2U: (jsonRpc: string) => {
  //         /* 收到 A2UI 发来的 JSON-RPC ，解析并回包  */
  //         this.handleA2UMessage(jsonRpc);
  //       }
  //     },
  //     methodList: ['receiveFromA2U'],
  //     controller: this.controller
  //   });
  // }

  // /* 解析 A2U JSON-RPC 并回包  */
  // private handleA2UMessage(jsonRpc: string): void {
  //   try {
  //     const msg: Record<string, Object> = JSON.parse(jsonRpc) as Record<string, Object>;
  //     const method: string = typeof msg.method === 'string' ? msg.method : '';
  //     const id: string | number = msg.id !== undefined ? msg.id as string | number : '';
  //
  //     console.info(`[A2UI] 收到方法：${method}`);
  //
  //     /* 模拟响应：餐厅列表  */
  //     const response: Record<string, Object> = {
  //       jsonrpc: '2.0',
  //       id: id,
  //       result: {
  //         kind: 'a2ui',
  //         messages: [
  //           {
  //             surfaceUpdate: {
  //               surfaceId: 'main',
  //               components: [
  //                 {
  //                   id: 'list',
  //                   component: {
  //                     Column: {
  //                       children: { explicitList: ['title', 'r1', 'r2'] }
  //                     }
  //                   }
  //                 },
  //                 {
  //                   id: 'title',
  //                   component: {
  //                     Text: { text: { literalString: '🍽️ 推荐餐厅' }, usageHint: 'h2' }
  //                   }
  //                 },
  //                 {
  //                   id: 'r1',
  //                   component: {
  //                     Card: {
  //                       title: { literalString: 'Luigi 意大利厨房' },
  //                       subtitle: { literalString: '手工意面 · 4.5★' },
  //                       content: { literalString: '地址：A街1号' }
  //                     }
  //                   }
  //                 },
  //                 {
  //                   id: 'r2',
  //                   component: {
  //                     Card: {
  //                       title: { literalString: 'Mario 披萨屋' },
  //                       subtitle: { literalString: '炭烤披萨 · 4.7★' },
  //                       content: { literalString: '地址：B街2号' }
  //                     }
  //                   }
  //                 }
  //               ]
  //             }
  //           },
  //           { beginRendering: { surfaceId: 'main', root: 'list' } }
  //         ]
  //       }
  //     };
  //
  //     /* 回传 A2UI  */
  //     const script: string = `arktsBridge.sendResponseToA2U(${JSON.stringify(response)})`;
  //     this.controller.runJavaScript(script);
  //
  //     /* UI 状态更新  */
  //     this.lastA2UData = JSON.stringify(response, null, 2);
  //     this.msgCount++;
  //
  //   } catch (e) {
  //     console.error('[A2UI] 处理失败', e);
  //   }
  // }

  /* UI 构建  */
  build() {
    Column() {
      /* 标题栏  */
      Row() {
        Column() {
          Text('🍽️ A2UI 完整应用（ArkWeb 内运行）')
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#1976D2')
          Text(`消息计数：${this.msgCount}  |  本地 rawfile 加载`)
            .fontSize(12)
            .fontColor('#666666')
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)

        if (this.msgCount > 0) {
          Text('✅ 已交互')
            .fontSize(12)
            .fontColor('#4CAF50')
        }
      }
      .width('100%')
      .padding(16)
      .backgroundColor('#E3F2FD')

      /* A2UI Web 内容（本地 index.html）  */
      Web({ src: 'https://www.localA2UIywh.com/index.html', controller: this.controller }).fileAccess(true)
        .geolocationAccess(true)
        .javaScriptAccess(true)          // 允许 JS
        .domStorageAccess(true)          // 允许 localStorage
        .onControllerAttached(() => {
        })
        .onInterceptRequest((event) => {
          console.info(`[A2UI] InterceptRequest enters`);
          if (!event) {
            return;
          }
          console.info(`[A2UI] getRequestUrl:${event.request.getRequestUrl()}`);
          if (this.schemeMap.has(event.request.getRequestUrl())) {
            let railFileName:string = this.schemeMap.get(event.request.getRequestUrl())!;
            console.info(`[A2UI] rawfilename:${railFileName}`);
            let mimeType = this.mimeType.get(railFileName);
            console.info(`[A2UI] mimeType:${mimeType}`);
            if (typeof mimeType === 'string') {
              console.info(`[A2UI] begin setResponse`);
              let response = new WebResourceResponse();
              response.setResponseData($rawfile(railFileName));
              response.setResponseEncoding('utf-8');
              response.setResponseMimeType(mimeType);
              response.setResponseCode(200);
              response.setReasonMessage('OK');
              response.setResponseIsReady(true);
              return response;
            }
          }
          return null;
        })
        .width('100%')
        .height('70%')
        .onPageEnd(() => {
          console.info('[A2UI] 本地 index.html 加载完成');
          // this.setupJSProxy();           // 页面加载后注册代理
        })
        .onErrorReceive((event) => {
          console.error('[A2UI] 页面错误', event.error);
        })

      /* 状态面板：显示最新 A2UI 数据  */
      Column() {
        Text('📊 最新 A2UI 数据')
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .margin({ bottom: 8 })

        Scroll() {
          Column() {
            if (this.lastA2UData) {
              Text(this.lastA2UData)
                .fontSize(10)
                .fontFamily('monospace')
                .backgroundColor('#F5F5F5')
                .padding(8)
                .borderRadius(4)
                .width('100%')
            } else {
              Text('⏳ 等待 A2UI 交互 …')
                .fontSize(12)
                .fontColor('#757575')
                .width('100%')
                .textAlign(TextAlign.Center)
            }
          }
        }
        .width('100%')

        Text('💡 在上方 Web 中输入“帮我找餐馆”触发 A2UI 交互')
          .fontSize(11)
          .fontColor('#757575')
          .margin({ top: 8 })
      }
      .width('100%')
      .padding(16)
      .backgroundColor('#FAFAFA')
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }
}