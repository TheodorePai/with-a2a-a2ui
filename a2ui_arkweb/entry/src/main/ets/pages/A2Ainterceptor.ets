// A2ARestaurantOfficialHandler.ets
import { WebNetErrorList, webview } from '@kit.ArkWeb';
import { BusinessError } from '@kit.BasicServicesKit';
import { buffer } from '@kit.ArkTS';

/**
 * A2A餐厅查找器 - 基于华为官方WebSchemeHandler API
 * 严格遵循你提供的官方代码结构
 */
interface GeneratedTypeLiteralInterface_1 {
  headerKey: string;
  headerValue: string;
}

@Component
export struct A2ARestaurantOfficialHandler {
  controller: webview.WebviewController = new webview.WebviewController();
  schemeHandler: webview.WebSchemeHandler = new webview.WebSchemeHandler();

  // 状态显示
  @State private capturedCount: number = 0;
  @State private lastA2AData: string = '';
  @State private isProcessing: boolean = false;

  build() {
    Column() {
      // 标题栏
      Row() {
        Text('🔍 A2A餐厅拦截器（官方API）')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1976D2')

        Text(`已捕获: ${this.capturedCount}`)
          .fontSize(14)
          .fontColor('#4CAF50')
      }
      .width('100%')
      .padding(16)
      .backgroundColor('#E3F2FD')
      .justifyContent(FlexAlign.SpaceBetween)

      // WebView
      Web({ src: 'http://172.28.128.1:5173', controller: this.controller })
        .width('100%')
        .height('60%')
        .onControllerAttached(() => {
          this.setupOfficialA2AInterceptor();
        })

      // 数据显示
      Column() {
        Text('📊 最新A2A数据')
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .margin({ bottom: 8 })

        Scroll() {
          Column() {
            if (this.lastA2AData) {
              Text(this.lastA2AData)
                .fontSize(10)
                .fontFamily('monospace')
                .backgroundColor('#F5F5F5')
                .padding(8)
                .borderRadius(4)
                .width('100%')
            } else {
              Text('⏳ 等待A2A请求...')
                .fontSize(12)
                .fontColor('#757575')
                .width('100%')
                .textAlign(TextAlign.Center)
            }
          }
        }
        .height(200)

        Text('💡 提示: 输入"帮我找餐馆"触发A2A请求')
          .fontSize(12)
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
  }

  /**
   * 设置A2A拦截器
   */
  private setupOfficialA2AInterceptor(): void {
    console.info('🚀 设置官方A2A拦截器');

    try {
      // 使用官方API：onRequestStart
      this.schemeHandler.onRequestStart((request: webview.WebSchemeHandlerRequest, resourceHandler: webview.WebResourceHandler) => {

        console.info('[A2A] onRequestStart开始');

        try {
          // 获取请求基本信息 - 使用官方API方法
          const url: string = request.getRequestUrl();
          const method: string = request.getRequestMethod();
          const headers = request.getHeader(); // 官方格式：数组

          console.info(`[A2A] URL: ${url}`);
          console.info(`[A2A] Method: ${method}`);

          // 只处理POST请求
          if (method === 'POST') {
            // 检查是否为A2A请求
            if (this.isA2APostRequest(url, headers)) {
              console.info('[A2A] 识别到A2A POST请求');
              this.captureA2ARequest(request, resourceHandler);
              return true; // 返回true表示拦截
            }
          }

        } catch (error) {
          console.error(`[A2A] 请求处理错误: ${(error as BusinessError).code}, ${(error as BusinessError).message}`);
        }

        return false; // 返回false表示不拦截
      })

      // 设置请求结束回调（官方API）
      this.schemeHandler.onRequestStop((request: webview.WebSchemeHandlerRequest) => {
        console.info('[A2A] onRequestStop');
      })

      // 绑定到https协议（官方方式）
      this.controller.setWebSchemeHandler('https', this.schemeHandler);
      console.info('✅ 官方A2A拦截器设置完成');

    } catch (error) {
      console.error(`[A2A] 设置失败: ${(error as BusinessError).code}, ${(error as BusinessError).message}`);
    }
  }

  /**
   * 判断是否为A2A POST请求
   * @param url - 请求URL
   * @param headers - 请求头数组（官方格式）
   */
  private isA2APostRequest(url: string, headers: Array<GeneratedTypeLiteralInterface_1>): boolean {
    // 检查URL特征
    const isA2AUrl = url.includes('/a2a/') || url.includes('jsonrpc') || url.includes('/a2a/jsonrpc');

    // 检查Content-Type（官方格式：数组）
    let contentType = '';
    for (const header of headers) {
      if (header.headerKey.toLowerCase() === 'content-type') {
        contentType = header.headerValue;
        break;
      }
    }
    const isJson = contentType.includes('application/json');

    const result = isA2AUrl && isJson;
    if (result) {
      console.info(`[A2A] 确认A2A请求: ${url}`);
    }
    return result;
  }

  /**
   * 捕获A2A请求数据
   * 基于官方API实现
   */
  private async captureA2ARequest(
    request: webview.WebSchemeHandlerRequest,
    resourceHandler: webview.WebResourceHandler
  ): Promise<void> {
    try {
      this.isProcessing = true;
      console.info('=== 📨 A2A请求捕获开始 ===');

      // 获取请求头（官方格式）
      const headers = request.getHeader();
      console.info(`[A2A] 请求头数量: ${headers.length}`);

      // 查找Content-Type
      let contentType = '';
      for (const header of headers) {
        if (header.headerKey.toLowerCase() === 'content-type') {
          contentType = header.headerValue;
          console.info(`[A2A] Content-Type: ${contentType}`);
          break;
        }
      }

      // 获取请求体流 - 官方API
      let stream = request.getHttpBodyStream();
      if (stream) {
        stream.initialize().then(() => {
          if (!stream) {
            return;
          }
          console.info("[schemeHandler] onRequestStart postDataStream size:" + stream.getSize());
          console.info("[schemeHandler] onRequestStart postDataStream position:" + stream.getPosition());
          console.info("[schemeHandler] onRequestStart postDataStream isChunked:" + stream.isChunked());
          console.info("[schemeHandler] onRequestStart postDataStream isEof:" + stream.isEof());
          console.info("[schemeHandler] onRequestStart postDataStream isInMemory:" + stream.isInMemory());
          stream.read(stream.getSize()).then((buffer) => {
            if (!stream) {
              return;
            }
            console.info("[schemeHandler] onRequestStart postDataStream readlength:" + buffer.byteLength);
            console.info("[schemeHandler] onRequestStart postDataStream isEof:" + stream.isEof());
            console.info("[schemeHandler] onRequestStart postDataStream position:" + stream.getPosition());
            const uint8Array = new Uint8Array(buffer);
            let bodyText = this.arrayBufferToString(uint8Array);
            this.parseA2AJSON(bodyText);
          }).catch((error: BusinessError) => {
            console.error(`ErrorCode: ${error.code},  Message: ${error.message}`);
          })
        }).catch((error: BusinessError) => {
          console.error(`ErrorCode: ${error.code},  Message: ${error.message}`);
        })
      } else {
        console.info("[schemeHandler] onRequestStart has no http body stream");
      }

      this.capturedCount++;
      console.info('✅ A2A请求捕获完成');

    } catch (error) {
      console.error('[A2A] 捕获失败:', error);
    } finally {
      this.isProcessing = false;

      // 必须提供响应 - 官方要求
      this.provideA2AResponse(resourceHandler);
    }
  }



  // 只修正报错的 parseA2AJSON 函数
  private parseA2AJSON(bodyText: string): void {
    try {
      const trimmedData = bodyText.trim();
      if (!trimmedData) {
        console.info('[A2A] JSON数据为空');
        return;
      }

      // 使用明确的类型定义替代 any
      const jsonData: Record<string, Object> = JSON.parse(trimmedData);

      // 安全访问属性，避免 any 类型
      const jsonrpc: string = typeof jsonData.jsonrpc === 'string' ? jsonData.jsonrpc : '';
      const method: string = typeof jsonData.method === 'string' ? jsonData.method : '';
      const id: string | number = jsonData.id !== undefined ? jsonData.id as string | number : '';

      console.info('=== 📋 A2A JSON-RPC数据 ===');
      console.info(`[A2A] JSON-RPC版本: ${jsonrpc}`);
      console.info(`[A2A] 方法名: ${method}`);
      console.info(`[A2A] 请求ID: ${id}`);

      // 记录完整格式化数据
      const formattedData: string = JSON.stringify(jsonData, null, 2);
      console.info('[A2A] 完整数据:\n', formattedData);

      // 更新UI显示
      this.lastA2AData = formattedData;

      // 安全分析餐厅请求
      this.analyzeRestaurantRequest(jsonData);

    } catch (error) {
      console.error('[A2A] JSON解析失败:', bodyText.substring(0, 100));
    }
  }

  /**
   * 安全分析餐厅请求
   * 使用明确的类型避免 any
   */
  private analyzeRestaurantRequest(jsonData: Record<string, Object>): void {
    try {
      // 安全获取 method
      const method: string = typeof jsonData.method === 'string' ? jsonData.method : '';

      if (method === 'SendMessage') {
        // 安全获取 params
        const params: Record<string, Object> = jsonData.params as Record<string, Object> || {};
        const message: Record<string, Object> = params.message as Record<string, Object> || {};
        const parts: Array<Object> = message.parts as Array<Object> || [];

        if (parts.length > 0) {
          const part: Record<string, Object> = parts[0] as Record<string, Object> || {};
          const userText: string = typeof part.text === 'string' ? part.text as string : '';

          console.info(`[A2A] 用户消息: "${userText}"`);

          // 检查餐厅关键词
          const keywords: string[] = ['餐厅', 'restaurant', '吃饭', '订餐', '找餐馆', 'restaurants'];
          const isRestaurant: boolean = keywords.some((k: string) =>
          userText.toLowerCase().includes(k.toLowerCase())
          );

          if (isRestaurant) {
            console.info('[A2A] 🍽️ 检测到餐厅查找请求！');
            console.info('[A2A] 🎯 成功截获"帮我找餐馆"的A2A请求！');
          }
        }
      }
    } catch (error) {
      console.error('[A2A] 分析失败:', error);
    }
  }

  /**
   * 提供A2A响应 - 官方方式
   */
  private provideA2AResponse(handler: webview.WebResourceHandler): void {
    try {
      console.info('[A2A] 提供响应');

      // 创建响应 - 官方方式
      const response = new webview.WebSchemeHandlerResponse();
      response.setStatus(200);
      response.setStatusText('OK');
      response.setMimeType('application/json');
      response.setEncoding('utf-8');

      // 设置响应头
      response.setHeaderByName('X-Captured', 'true', false);
      response.setHeaderByName('Access-Control-Allow-Origin', '*', false);

      // 响应数据
      const responseData = JSON.stringify({
        status: 'captured',
        timestamp: new Date().toISOString(),
        message: 'A2A request logged by ArkTS'
      });

      // 转换数据 - 官方方式
      const buf = buffer.from(responseData);

      // 按官方顺序发送响应
      handler.didReceiveResponse(response);
      handler.didReceiveResponseBody(buf.buffer);
      handler.didFinish();

      console.info('[A2A] 响应发送完成');

    } catch (error) {
      console.error('[A2A] 响应发送失败:', error);
      handler.didFail(WebNetErrorList.ERR_FAILED);
    }
  }

  /**
   * ArrayBuffer转字符串
   */
  private arrayBufferToString(uint8Array: Uint8Array): string {
    let result = '';
    for (let i = 0; i < uint8Array.length; i++) {
      result += String.fromCharCode(uint8Array[i]);
    }
    return result;
  }
}