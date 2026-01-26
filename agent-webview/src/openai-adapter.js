/**
 * OpenAI 兼容 API 适配器
 * WebView 已在 Native 端配置允许跨域，直接使用 fetch
 * 
 * 跨域配置（Native 端）:
 * - iOS: allowUniversalAccessFromFileURLs = true
 * - Android: allowUniversalAccessFromFileURLs = true
 */

import { configManager } from './config.js';

export class OpenAIAdapter {
    constructor(options = {}) {
        this.options = options;
    }

    /**
     * 获取 API 配置
     */
    _getConfig() {
        const config = configManager.getAPIConfig();
        return {
            apiKey: this.options.apiKey || config.apiKey,
            baseURL: this.options.baseURL || config.baseURL,
            model: this.options.model || config.model
        };
    }

    /**
     * 创建聊天补全
     * @param {Object} options - 请求选项
     * @returns {Promise<Object>} 响应对象
     */
    async createChatCompletion(options) {
        const { model, messages, tools, tool_choice, stream = false } = options;
        const config = this._getConfig();

        if (!config.apiKey) {
            throw new Error('API Key not configured. Please inject config via AgentBridge.injectConfig()');
        }

        if (!config.baseURL) {
            throw new Error('API Base URL not configured. Please inject config via AgentBridge.injectConfig()');
        }

        const targetModel = model || config.model;
        const requestBody = {
            model: targetModel,
            messages,
            tools,
            tool_choice,
            stream
        };

        if (targetModel && targetModel.startsWith('qwen')) {
            requestBody.enable_thinking = false;
        }

        // 直接使用 fetch（WebView 已配置允许跨域）
        const response = await fetch(`${config.baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error ${response.status}: ${errorText}`);
        }
        return response.json();
    }
}

export const openaiAdapter = new OpenAIAdapter();
