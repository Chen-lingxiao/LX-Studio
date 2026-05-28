<script setup>
/**
 * App.vue - 主应用组件
 * 
 * 功能说明：
 * 1. 作为整个应用的根组件，负责布局管理
 * 2. 引入路由视图，实现页面切换
 * 3. 首页时内容区无顶部padding，与透明头部融为一体
 */
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { useSettings } from './composables/useSettings'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const { settings, initSettings } = useSettings()
initSettings()

/**
 * 判断是否在首页
 */
const isHome = computed(() => route.path === '/' || route.path === '/home')
</script>

<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <AppHeader />
    <!-- 主内容区域 -->
    <main class="main-content" :class="{ 'no-padding': isHome }">
      <router-view />
    </main>
    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 应用容器 */
#app {
  min-height: 100vh;
}
</style>

<style scoped>
/* 主内容区域 */
.main-content {
  height: 100vh;
  overflow-y: auto;
  padding-top: 50px;
  padding-bottom: 28px;
}

/* 首页时无顶部padding */
.no-padding {
  padding-top: 0;
}
</style>