// src/utils/RawFileReader.ets
import { BusinessError } from '@kit.BasicServicesKit';
import { common } from '@kit.AbilityKit';
import { resourceManager } from '@kit.LocalizationKit';

// 引入枚举

/**
 * RawFile 读取器
 * 1. 递归扫描 rawfile/dist 目录
 * 2. 一次性把文件内容缓存到内存 Map
 * 3. 对外提供同步/异步读取接口，零磁盘 IO
 */
export class RawFileReader {
  private static instance: RawFileReader;
  // 缓存：相对路径 -> 文件二进制内容
  private cache: Map<string, Uint8Array> = new Map();

  private constructor() {}

  /** 单例获取 */
  public static getInstance(): RawFileReader {
    if (!RawFileReader.instance) {
      RawFileReader.instance = new RawFileReader();
    }
    return RawFileReader.instance;
  }

  /**
   * 初始化：扫描 rawfile/dist 并缓存全部文件
   * @param context UIAbilityContext（EntryAbility 的 this.context）
   */
  public init(context:common.UIAbilityContext): void {
    try {
      this.scanDir(context, 'rawfile/a2ui/dist'); // 从 rawfile/dist 开始扫
      console.info(`RawFileReader: 已缓存 ${this.cache.size} 个文件`);
    } catch (e) {
      const err = e as BusinessError;
      console.error(`RawFileReader: 初始化失败，code=${err.code}, message=${err.message}`);
    }
  }

  /** 同步读取缓存内容 */
  public getSync(pathInDist: string): Uint8Array | undefined {
    const key = pathInDist.replace(/^\/+/, ''); // 去掉开头的 "/"
    return this.cache.get(key);
  }

  /** 异步读取（实际仍是内存，不阻塞） */
  public async get(pathInDist: string): Promise<Uint8Array | undefined> {
    return this.getSync(pathInDist);
  }

  /** 判断文件是否存在缓存中 */
  public has(pathInDist: string): boolean {
    return this.getSync(pathInDist) !== undefined;
  }

  /* ========== 私有方法 ========== */

  /**
   * 递归扫描 rawfile 目录
   * @param context 应用上下文
   * @param dir 当前在 rawfile 中的相对目录
   */
  private scanDir(context: common.UIAbilityContext, dir: string): void {
    // 获取目录列表（返回的是 string[]）
    const list: string[] = context.resourceManager.getRawFileListSync(dir);
    console.info(`RawFileReader: list: ${list}`)
    for (const name of list) {
      const fullPath = `${dir}/${name}`;
      console.info(`RawFileReader: fullPath: ${fullPath}`);
      if (name.endsWith('/')) {
        // 仍是目录，继续递归
        this.scanDir(context, fullPath);
      } else {
        // 是文件，读内容并缓存
        const buffer: Uint8Array = context.resourceManager.getRawFileContentSync(fullPath);
        this.cache.set(fullPath, buffer);
      }
    }
  }
}