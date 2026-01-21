/*
 * 应用配置类型定义
 * 参考 renderers/shell/configs/types.ts
 */

import { v0_8 } from "@a2ui/lit";

/**
 * 应用配置接口
 */
export interface AppConfig {
  /** 唯一标识 */
  key: string;
  /** 显示标题 */
  title: string;
  /** 页面背景 */
  background?: string;
  /** Hero 图片路径 */
  heroImage?: string;
  /** 暗色模式 Hero 图片 */
  heroImageDark?: string;
  /** 输入框占位符 */
  placeholder: string;
  /** 加载文本（可以是单个字符串或字符串数组轮播） */
  loadingText?: string | string[];
  /** Agent 服务器 URL */
  serverUrl?: string;
  /** 主题覆盖 */
  theme?: v0_8.Types.Theme;
}

/**
 * API 配置（用于 ServiceWorker）
 */
export interface ApiConfig {
  apiKey: string;
  baseURL: string;
  model: string;
}
