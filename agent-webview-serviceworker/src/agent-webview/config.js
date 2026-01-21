/**
 * 配置管理器 - ServiceWorker 版本
 */
class ConfigManager {
    constructor() {
        this.config = {};
        this.listeners = [];
    }

    /**
     * 设置配置
     * @param {Object} config - 配置对象
     */
    setConfig(config) {
        this.config = { ...this.config, ...config };
        this.listeners.forEach(listener => listener(this.config));
    }

    /**
     * 获取配置项
     * @param {string} key - 配置键
     * @returns {any} 配置值
     */
    get(key) {
        return this.config[key];
    }

    /**
     * 获取 API 配置
     * @returns {Object} API 配置对象
     */
    getAPIConfig() {
        return {
            apiKey: this.get('apiKey') ||
                    this.get('GEMINI_API_KEY') || 
                    this.get('OPENROUTER_API_KEY') || 
                    this.get('DASHSCOPE_API_KEY'),
            baseURL: this.get('baseURL') ||
                     this.get('GEMINI_BASE_URL') || 
                     this.get('OPENROUTER_BASE_URL') || 
                     this.get('DASHSCOPE_BASE_URL'),
            model: this.get('model') ||
                   this.get('GEMINI_MODEL') || 
                   this.get('OPENROUTER_MODEL') || 
                   this.get('DASHSCOPE_MODEL')
        };
    }

    /**
     * 监听配置变化
     * @param {Function} callback - 回调函数
     */
    onConfigChange(callback) {
        this.listeners.push(callback);
    }
}

export const configManager = new ConfigManager();
