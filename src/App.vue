<script setup>
  /**
   * App.vue - 主应用组件
   *
   * 功能说明：
   * 1. 作为整个应用的根组件，负责布局管理
   * 2. 引入路由视图，实现页面切换
   * 3. 首页时内容区无顶部padding，与透明头部融为一体
   * 4. 项目和学习页面底部透明，与透明页脚配合
   */
  import AppHeader from './components/AppHeader.vue';
  import MiniPlayer from './components/MiniPlayer.vue';
  import { useSettings } from './composables/useSettings';
  import { useRoute } from 'vue-router';
  import { computed, ref, onMounted } from 'vue';

  const route = useRoute();
  const { settings, initSettings } = useSettings();
  initSettings();

  const loadingState = ref('loading'); // loading | done

  onMounted(() => {
    const startTime = Date.now();
    const minLoadingTime = 800;

    const finishLoading = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadingTime - elapsed);

      setTimeout(() => {
        loadingState.value = 'done';
      }, remaining);
    };

    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading);
    }
  });

  /**
   * 判断是否在首页
   */
  const isHome = computed(() => route.path === '/' || route.path === '/home');

  /**
   * 判断是否是管理后台页面
   */
  const isAdmin = computed(() => route.path.startsWith('/admin'));

  /**
   * 判断是否是项目、学习或文章页面（需要透明底部页脚）
   */
  const isProjectOrStudy = computed(() => {
    return (
      route.path.startsWith('/project') ||
      route.path.startsWith('/study') ||
      route.path.startsWith('/articles')
    );
  });
</script>

<template>
  <!-- 管理后台：独立页面，不加载公共布局 -->
  <router-view v-if="isAdmin" />

  <!-- 正常页面：带公共布局 -->
  <div v-else id="app">
    <!-- 加载动画层 -->
    <div
      class="loading-overlay"
      :class="{ 'loading-exit': loadingState === 'done' }"
    >
      <!-- 加载中状态 -->
      <div class="loading-content">
        <div class="loading-logo">
          <span class="logo-char" style="--i: 0">L</span>
          <span class="logo-char" style="--i: 1">X</span>
        </div>
        <div class="loading-bar-container">
          <div class="loading-bar"></div>
        </div>
        <div class="loading-hint">正在穿越星河...</div>
      </div>
    </div>

    <!-- 顶部导航栏 -->
    <AppHeader />
    <!-- 主内容区域 -->
    <main
      class="main-content"
      :class="{ 'no-padding': isHome, 'transparent-bottom': isProjectOrStudy }"
    >
      <router-view />
    </main>
    <!-- 全局迷你播放器 -->
    <MiniPlayer />
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

  /* 自定义滚动条 */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  /* Firefox 滚动条 */
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
  }
</style>

<style scoped>
  /* 主内容区域 */
  .main-content {
    height: 100vh;
    overflow-y: auto;
    padding-top: 50px;
    padding-bottom: 0;
  }

  .main-content::-webkit-scrollbar {
    width: 6px;
  }

  .main-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .main-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 3px;
  }

  .main-content::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  /* 首页时无顶部和底部padding（Header和Footer都是透明悬浮的） */
  .no-padding {
    padding-top: 0;
    padding-bottom: 0;
  }

  /* 项目和学习页面底部padding（Header可见，Footer透明悬浮） */
  .transparent-bottom {
    padding-bottom: 0;
  }

  /* ===================================
   加载动画层 - 简洁星空气质
   =================================== */
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0f1525;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition:
      opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
      visibility 0.8s;
  }

  .loading-exit {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  /* 加载内容 */
  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    z-index: 1;
  }

  .loading-logo {
    display: flex;
    gap: 0.5rem;
  }

  .logo-char {
    font-size: 3.5rem;
    font-weight: 200;
    letter-spacing: 0.3rem;
    color: rgba(255, 255, 255, 0.95);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    animation: logoFloat 2s ease-in-out infinite;
    animation-delay: calc(var(--i) * 0.15s);
  }

  @keyframes logoFloat {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  /* 加载进度条 */
  .loading-bar-container {
    width: 200px;
    height: 2px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 1px;
    overflow: hidden;
  }

  .loading-bar {
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.9)
    );
    border-radius: 1px;
    animation: loadingProgress 1.5s ease-in-out infinite;
  }

  @keyframes loadingProgress {
    0% {
      width: 0%;
      margin-left: 0;
    }
    50% {
      width: 60%;
      margin-left: 20%;
    }
    100% {
      width: 0%;
      margin-left: 100%;
    }
  }

  .loading-hint {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 0.15rem;
    animation: hintPulse 2s ease-in-out infinite;
  }

  @keyframes hintPulse {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.8;
    }
  }
</style>
