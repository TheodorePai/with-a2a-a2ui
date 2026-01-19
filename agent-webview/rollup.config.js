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
    json(),
    terser()
];

// 分别配置 IIFE 和 ESM 输出（IIFE 不支持 code-splitting）
export default [
    // IIFE 格式 - 用于直接在浏览器 script 标签中加载
    {
        input: 'src/index.js',
        output: {
            file: 'dist/agent-webview.js',
            format: 'iife',
            name: 'AgentWebView',
            sourcemap: true,
            inlineDynamicImports: true  // 将动态导入内联到主 bundle
        },
        plugins
    },
    // ESM 格式 - 用于模块化导入
    {
        input: 'src/index.js',
        output: {
            file: 'dist/agent-webview.esm.js',
            format: 'es',
            sourcemap: true,
            inlineDynamicImports: true  // 将动态导入内联到主 bundle
        },
        plugins
    }
];
