import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import { fileURLToPath, URL } from 'node:url'
// Element Plus 自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown({
      markdownItOptions: {
        html: true,
        breaks: true,
        linkify: true
      }
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: true
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: true
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    fs: {
      allow: ['.']
    },
    proxy: {
      '/api/calendar': {
        target: 'https://apis.juhe.cn/fapig/calendar/day',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/calendar/, '')
      },
      '/api/history': {
        target: 'https://v.juhe.cn/todayOnhistory/queryEvent',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/history/, '')
      }
    }
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
      '@element-plus/icons-vue',
      'lucide-vue-next',
      'markdown-it',
      'markdown-it-container',
      'axios',
      'aplayer'
    ]
  },

  build: {
    chunkSizeWarningLimit: 2000
  }
})