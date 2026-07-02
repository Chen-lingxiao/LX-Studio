import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Markdown from 'unplugin-vue-markdown/vite';
import { fileURLToPath, URL } from 'node:url';
// Element Plus 自动导入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      markdownItOptions: {
        html: true,
        breaks: true,
        linkify: true,
      },
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: true,
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: true,
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    fs: {
      allow: ['.'],
    },
    proxy: {
      '/lx-api/calendar': {
        target: 'https://apis.juhe.cn/fapig/calendar/day',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lx-api\/calendar/, ''),
      },
      '/lx-api/history': {
        target: 'https://v.juhe.cn/todayOnhistory/queryEvent',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lx-api\/history/, ''),
      },
      '/lx-api/articles': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/lx-api/notes': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/lx-api/projects': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/lx-api/upload': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/lx-api/admin': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'element-plus',
      'element-plus/es',
      'element-plus/es/components/menu/style/css',
      'element-plus/es/components/menu-item/style/css',
      'element-plus/es/components/sub-menu/style/css',
      'element-plus/es/components/aside/style/css',
      'element-plus/es/components/base/style/css',
      'element-plus/es/components/icon/style/css',
      'element-plus/es/components/scrollbar/style/css',
      'element-plus/es/components/tooltip/style/css',
      '@lucide/vue',
      'markdown-it',
      'markdown-it-container',
      'axios',
    ],
  },

  build: {
    chunkSizeWarningLimit: 2000,
  },
});
