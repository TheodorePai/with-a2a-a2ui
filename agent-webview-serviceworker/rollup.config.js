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
    // 前端 App - ESM 格式
    {
        input: 'src/app.js',
        output: {
            file: 'dist/app.js',
            format: 'es',
            sourcemap: true
        },
        plugins: finalPlugins
    },
    
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
