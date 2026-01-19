/**
 * InMemoryTaskStore - 内存任务存储
 * 与原 @a2a-js/sdk 的 InMemoryTaskStore 保持相同接口
 * 
 * @a2a-js/sdk 接口定义:
 * - load(taskId: string, context?: ServerCallContext): Promise<Task | undefined>
 * - save(task: Task, context?: ServerCallContext): Promise<void>
 */
export class InMemoryTaskStore {
    constructor() {
        this.store = new Map();
    }

    /**
     * 加载任务 (与 @a2a-js/sdk 接口一致)
     * @param {string} taskId 
     * @param {Object} [context] - 可选的服务调用上下文
     * @returns {Promise<Object|undefined>}
     */
    async load(taskId, context) {
        return this.store.get(taskId);
    }

    /**
     * 保存任务 (与 @a2a-js/sdk 接口一致)
     * @param {Object} task - 任务对象，必须包含 id 字段
     * @param {Object} [context] - 可选的服务调用上下文
     * @returns {Promise<void>}
     */
    async save(task, context) {
        if (!task || !task.id) {
            throw new Error('Task must have an id field');
        }
        this.store.set(task.id, task);
    }

    // ===== 扩展方法（非 @a2a-js/sdk 接口，用于调试和测试）=====

    /**
     * 获取任务（别名方法，兼容旧代码）
     * @deprecated 请使用 load() 方法
     */
    async get(taskId) {
        return this.load(taskId);
    }

    /**
     * 删除任务
     * @param {string} taskId 
     */
    async delete(taskId) {
        this.store.delete(taskId);
    }

    /**
     * 列出所有任务
     * @returns {Promise<Array>}
     */
    async list() {
        return Array.from(this.store.values());
    }

    /**
     * 清空所有任务
     */
    async clear() {
        this.store.clear();
    }

    /**
     * 获取任务数量
     */
    get size() {
        return this.store.size;
    }
}
