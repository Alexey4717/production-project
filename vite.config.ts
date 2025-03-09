import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        svgr({
            exportAsDefault: true, // Чтоб на всем проекте не переделывать as default импорты
        }),
        react(),
    ],
    resolve: {
        alias: [
            { find: '@', replacement: '/src' },
        ],
    },
    define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:8000'),
        __PROJECT__: JSON.stringify('frontend'),
    },
    esbuild: {
        target: 'es6', // Указал ES6 как целевую версию, иначе билд не запускался
    },
});
