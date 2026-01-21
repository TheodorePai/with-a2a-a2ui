/**
 * InMemoryTaskStore - 内存任务存储
 */
export class InMemoryTaskStore {
    constructor() {
        this.store = new Map();
    }

    /**
     * 加载任务
     * @param {string} taskId 
     * @param {Object} [context]
     * @returns {Promise<Object|undefined>}
     */
    async load(taskId, context) {
        return this.store.get(taskId);
    }

    /**
     * 保存任务
     * @param {Object} task
     * @param {Object} [context]
     * @returns {Promise<void>}
     */
    async save(task, context) {
        if (!task || !task.id) {
            throw new Error('Task must have an id field');
        }
        this.store.set(task.id, task);
    }

    /**
     * 获取任务（别名方法）
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
