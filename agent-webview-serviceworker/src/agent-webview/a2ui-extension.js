/**
 * A2UI 扩展模块
 */

export const A2UI_EXTENSION_URL = 'https://a2ui.org/a2a-extension/a2ui/v0.8';

/**
 * 尝试激活 A2UI 扩展
 * @param {Object} context - 请求上下文
 * @returns {boolean} 是否应激活 A2UI 扩展
 */
export function tryActivateA2UIExtension(context) {
    if (context?.requestedExtensions) {
        return context.requestedExtensions.includes(A2UI_EXTENSION_URL);
    }
    return false;
}

/**
 * 创建 A2UI 数据部分
 * @param {Object} uiMessage - UI 消息数据
 * @returns {Object} A2UI 数据部分
 */
export function createA2UIPart(uiMessage) {
    return {
        kind: 'data',
        data: uiMessage
    };
}
