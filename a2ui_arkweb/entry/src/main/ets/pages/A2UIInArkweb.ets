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
    ['https://www.locala2uiywh.com/index.html','a2ui/index.html'],
    ['https://www.locala2uiywh.com/assets/app.js','a2ui/assets/app.js'],
    ['https://www.locala2uiywh.com/hero.png','a2ui/hero.png'],
    ['https://www.locala2uiywh.com/hero-dark.png','a2ui/hero-dark.png'],
    ['https://www.locala2uiywh.com/agent-webview.js','a2ui/agent-webview.js'],
    ['http://localhost:10002/static/shrimpchowmein.jpeg','a2ui/image/shrimpchowmein.jpeg'],
    ['http://localhost:10002/static/mapotofu.jpeg','a2ui/image/mapotofu.jpeg'],
    ['http://localhost:10002/static/beefbroccoli.jpeg','a2ui/image/beefbroccoli.jpeg'],
    ['http://localhost:10002/static/springrolls.jpeg','a2ui/image/springrolls.jpeg'],
    ['http://localhost:10002/static/kungpao.jpeg','a2ui/image/kungpao.jpeg'],
    // ['http://localhost:10002/.well-known/agent-card.json','a2ui/agent-card.json'],
  ]);

  mimeType = new Map([
    ['a2ui/index.html', 'text/html'],
    ['a2ui/assets/app.js', 'text/javascript'],
    ['a2ui/hero.png', 'image/png'],
    ['a2ui/hero-dark.png', 'image/png'],
    ['a2ui/agent-card.json', 'application/json'],
    ['a2ui/agent-webview.js', 'text/javascript'],
    ['a2ui/image/shrimpchowmein.jpeg', 'image/jpeg'],
    ['a2ui/image/mapotofu.jpeg', 'image/jpeg'],
    ['a2ui/image/beefbroccoli.jpeg', 'image/jpeg'],
    ['a2ui/image/springrolls.jpeg', 'image/jpeg'],
    ['a2ui/image/kungpao.jpeg', 'image/jpeg'],
  ])






  /* UI 构建  */
  build() {
    Column() {
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
        .height('100%')
        .onPageEnd(() => {
          console.info('[A2UI] 本地 index.html 加载完成');
          // this.setupJSProxy();           // 页面加载后注册代理
        })
        .onErrorReceive((event) => {
          console.error('[A2UI] 页面错误', event.error);
        })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }
}