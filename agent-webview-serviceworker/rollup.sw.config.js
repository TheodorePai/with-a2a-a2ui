/**
 * Rollup 配置 - 仅用于构建 ServiceWorker 所需的 agent-webview 代码
 * 前端应用使用 Vite 构建
 */

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

const plugins = [
    resolve({ 
        browser: true,
        preferBuiltins: false
    }),
    commonjs(),
    json()
];

const productionPlugins = [
    ...plugins,
    terser()
];

const isDev = process.env.NODE_ENV !== 'production';
const finalPlugins = isDev ? plugins : productionPlugins;

export default [
    // Agent WebView for ServiceWorker - IIFE 格式（ServiceWorker 不支持 ES Module）
    {
        input: 'src/agent-webview/index.js',
        output: {
            file: 'dist/agent-webview-sw.js',
            format: 'iife',
            name: 'AgentWebView',
            sourcemap: true,
            inlineDynamicImports: true,
            exports: 'default'
        },
        plugins: finalPlugins
    }
];
