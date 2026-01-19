/**
 * RequestContext - 请求上下文类
 * 与 @a2a-js/sdk/server 的 RequestContext 接口一致
 * 
 * 原 SDK 定义：
 * class RequestContext {
 *   readonly userMessage: Message;
 *   readonly taskId: string;
 *   readonly contextId: string;
 *   readonly task?: Task;
 *   readonly referenceTasks?: Task[];
 *   readonly context?: ServerCallContext;
 * }
 */

export class RequestContext {
    /**
     * @param {Object} userMessage - 用户消息 (A2A Message 格式)
     * @param {string} taskId - 任务 ID
     * @param {string} contextId - 上下文/会话 ID
     * @param {Object} [task] - 可选的现有任务
     * @param {Array} [referenceTasks] - 可选的参考任务列表
     * @param {Object} [context] - 可选的服务调用上下文
     */
    constructor(userMessage, taskId, contextId, task, referenceTasks, context) {
        this.userMessage = userMessage;
        this.taskId = taskId;
        this.contextId = contextId;
        this.task = task;
        this.referenceTasks = referenceTasks;
        this.context = context;
    }

    /**
     * 从普通对象创建 RequestContext
     * @param {Object} obj 
     * @returns {RequestContext}
     */
    static fromObject(obj) {
        return new RequestContext(
            obj.userMessage,
            obj.taskId,
            obj.contextId,
            obj.task,
            obj.referenceTasks,
            obj.context
        );
    }

    /**
     * 转换为普通对象
     * @returns {Object}
     */
    toObject() {
        return {
            userMessage: this.userMessage,
            taskId: this.taskId,
            contextId: this.contextId,
            task: this.task,
            referenceTasks: this.referenceTasks,
            context: this.context
        };
    }
}
