<script setup>
  import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
  import { useRoute } from 'vue-router';
  import { useTheme } from '../composables/useTheme';
  import { useHomeSection } from '../composables/useHomeSection';
  import SettingsPanel from './settings/SettingsPanel.vue';
  import { PowerGlitch } from 'powerglitch';

  const route = useRoute();
  const { isDark, isCyberpunk, toggleColorMode } = useTheme();
  const { isLightSection, isDarkSection } = useHomeSection();

  // ── 赛博朋克导航 hover 故障效果 ──
  const HEADER_GLITCH_CONFIG = {
    playMode: 'manual',
    hideOverflow: false,
    timing: { duration: 500, iterations: 1 },
    glitchTimeSpan: { start: 0, end: 1 },
    shake: { velocity: 25, amplitudeX: 0.15, amplitudeY: 0.15 },
    slice: { count: 8, velocity: 18, minHeight: 0.02, maxHeight: 0.15, hueRotate: true },
  };

  let _headerOverHandler = null;
  let _headerOutHandler = null;
  let _headerGlitch = null;
  let _headerTarget = null;

  function stopGlitch(inst) {
    if (inst) { try { inst.stopGlitch(); } catch (_) {} }
  }

  function initHeaderGlitch() {
    const header = document.querySelector('.app-header');
    if (!header) return;

    _headerOverHandler = (e) => {
      const target = e.target.closest('.nav-link');
      if (!target || !header.contains(target) || target === _headerTarget) return;
      stopGlitch(_headerGlitch);
      _headerTarget = target;
      _headerGlitch = PowerGlitch.glitch(target, HEADER_GLITCH_CONFIG);
      _headerGlitch.startGlitch();
    };

    _headerOutHandler = (e) => {
      const target = e.target.closest('.nav-link');
      if (!target) return;
      const related = e.relatedTarget;
      if (related && target.contains(related)) return;
      stopGlitch(_headerGlitch);
      _headerGlitch = null;
      _headerTarget = null;
    };

    header.addEventListener('mouseover', _headerOverHandler);
    header.addEventListener('mouseout', _headerOutHandler);
  }

  function destroyHeaderGlitch() {
    const header = document.querySelector('.app-header');
    if (header && _headerOverHandler) {
      header.removeEventListener('mouseover', _headerOverHandler);
      header.removeEventListener('mouseout', _headerOutHandler);
    }
    if (_headerGlitch) { try { _headerGlitch.stopGlitch(); } catch (_) {} _headerGlitch = null; _headerTarget = null; }
    _headerOverHandler = _headerOutHandler = null;
  }

  watch(
    isCyberpunk,
    (active) => {
      if (active) {
        nextTick(() => {
          initHeaderGlitch();
        });
      } else {
        destroyHeaderGlitch();
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    if (isCyberpunk.value) {
      nextTick(() => {
        initHeaderGlitch();
      });
    }
  });

  onUnmounted(() => {
    destroyHeaderGlitch();
  });

  const isHome = computed(() => route.path === '/home');

  const useWhiteTextStyle = computed(() => {
    if (isHome.value) {
      return isDarkSection.value || isDark.value || isCyberpunk.value;
    }
    return isDark.value || isCyberpunk.value;
  });

  const useDarkTextStyle = computed(() => {
    if (isHome.value) {
      return isLightSection.value && !isDark.value && !isCyberpunk.value;
    }
    return !isDark.value && !isCyberpunk.value;
  });

  const showSettingsPanel = ref(false);

  const handleThemeToggle = () => {
    toggleColorMode();
  };

  const handleGithubClick = () => {
    window.open('https://github.com/Chen-lingxiao', '_blank');
  };

  const handleIconClick = (iconName) => {
    if (iconName === 'settings') {
      showSettingsPanel.value = !showSettingsPanel.value;
    } else if (iconName === 'docs') {
      window.open('https://cesium.com/learn/cesiumjs/ref-doc/', '_blank');
    } else if (iconName === 'email') {
      window.open('mailto:chen.lingxiao@outlook.com', '_blank');
    }
  };

  const handleCloseSettings = () => {
    showSettingsPanel.value = false;
  };
</script>

<template>
  <header class="app-header" :class="{ 'transparent-header': isHome, cyberpunk: isCyberpunk }">
    <!-- 左侧标题区域 -->
    <div class="header-content">
      <h1
        class="header-title"
        :class="{
          'white-text': useWhiteTextStyle,
          'force-dark-text': useDarkTextStyle,
        }"
      >
        揽星河 · 研习站
      </h1>
    </div>

    <!-- 右侧区域：导航菜单 + 功能区 -->
    <div class="header-right">
      <!-- 导航菜单 -->
      <nav class="header-nav">
        <router-link
          to="/"
          class="nav-link"
          :class="{
            active: $route.path === '/home',
            'white-link': useWhiteTextStyle,
            'force-dark-link': useDarkTextStyle,
          }"
        >
          <span>首页</span>
        </router-link>
        <router-link
          to="/project"
          class="nav-link"
          :class="{
            active: $route.path.startsWith('/project'),
            'white-link': useWhiteTextStyle,
            'force-dark-link': useDarkTextStyle,
          }"
        >
          <span>项目</span>
        </router-link>
        <router-link
          to="/articles"
          class="nav-link"
          :class="{
            active: $route.path.startsWith('/articles'),
            'white-link': useWhiteTextStyle,
            'force-dark-link': useDarkTextStyle,
          }"
        >
          <span>随笔</span>
        </router-link>

        
        <router-link
          to="/study"
          class="nav-link"
          :class="{
            active: $route.path === '/study',
            'white-link': useWhiteTextStyle,
            'force-dark-link': useDarkTextStyle,
          }"
        >
          <span>知识库</span>
        </router-link>
      </nav>

      <!-- 分隔线 -->
      <div
        class="nav-divider"
        :class="{
          'white-divider': useWhiteTextStyle,
          'force-dark-divider': useDarkTextStyle,
        }"
      ></div>

      <!-- 功能区图标 -->
      <div class="icon-group">
        <div
          class="icon-item"
          :class="{
            'white-icon': useWhiteTextStyle,
            'force-dark-icon': useDarkTextStyle,
          }"
          @click="handleIconClick('email')"
          title="邮箱"
        >
          <span class="iconfont icon-youxiang"></span>
        </div>
        <div
          class="icon-item"
          :class="{
            'white-icon': useWhiteTextStyle,
            'force-dark-icon': useDarkTextStyle,
          }"
          @click="handleGithubClick"
          title="GitHub"
        >
          <span class="iconfont icon-githublogo"></span>
        </div>
        <div
          class="icon-item"
          :class="{
            'white-icon': useWhiteTextStyle,
            'force-dark-icon': useDarkTextStyle,
          }"
          @click="handleThemeToggle"
          :title="isDark ? '切换到亮色主题' : '切换到暗色主题'"
        >
          <span
            class="iconfont"
            :class="isDark ? 'icon-taiyang' : 'icon-yueliang'"
          ></span>
        </div>
        <div
          class="icon-item"
          :class="{
            'white-icon': useWhiteTextStyle,
            'force-dark-icon': useDarkTextStyle,
          }"
          @click="handleIconClick('settings')"
          title="设置"
        >
          <span class="iconfont icon-shezhi"></span>
        </div>
      </div>
    </div>
  </header>

  <!-- 设置面板 -->
  <SettingsPanel :visible="showSettingsPanel" @close="handleCloseSettings" />
</template>

<style scoped>
  /* 头部导航栏样式 */
  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: var(--color-bg-surface);
    border-bottom: 2px solid var(--color-border);
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
    justify-content: space-between;
    z-index: 1000;
  }

  /* 透明头部样式（首页） */
  .transparent-header {
    background-color: transparent;
    border-bottom: none;
    box-shadow: none;
  }

  /* 内容区域 */
  .header-content {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  /* 标题样式 */
  .header-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0;
    transition: color 0.3s;
  }

  /* 白色文本（首页） */
  .white-text {
    color: #ffffff;
  }

  /* 版本样式 */
  .header-version {
    font-size: 12px;
    color: var(--color-text-secondary);
    transition: color 0.3s;
  }

  /* 右侧区域 */
  .header-right {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  /* 导航区域 */
  .header-nav {
    display: flex;
    align-items: center;
  }

  /* 导航链接 */
  .nav-link {
    font-size: 14px;
    color: var(--color-text-secondary);
    text-decoration: none;
    padding: 0 20px;
    margin: 0;
    height: 50px;
    line-height: 50px;
    border-radius: 0;
    border-bottom: 3px solid transparent;
    transition: all var(--transition-fast);
    font-weight: 500;
  }

  .nav-link:hover {
    color: var(--color-text-primary);
    background-color: var(--color-primary-bg-light);
  }

  .nav-link.active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
    font-weight: 600;
  }

  /* 白色链接（首页） */
  .white-link {
    color: rgba(255, 255, 255, 0.8);
  }

  .white-link:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.08);
  }

  .white-link.active {
    color: #ffffff;
    border-bottom-color: #ffffff;
    font-weight: 600;
  }

  /* 分隔线 */
  .nav-divider {
    width: 1px;
    height: 24px;
    background-color: var(--color-border);
    transition: background-color var(--transition-normal);
  }

  /* 白色分隔线（首页） */
  .white-divider {
    background-color: rgba(255, 255, 255, 0.3);
  }

  /* 功能区图标组 */
  .icon-group {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  /* 图标项样式 */
  .icon-item {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color var(--transition-fast);
    color: var(--color-text-primary);
    border-radius: 4px;
  }

  .icon-item:hover {
    background-color: var(--color-bg-hover);
  }

  /* 白色图标（首页） */
  .white-icon {
    color: rgba(255, 255, 255, 0.9);
  }

  .white-icon:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  /* 强制深色文字（浅色章节）- 不受明暗模式影响 */
  .force-dark-text {
    color: #3a5a4a !important;
  }

  /* 强制深色链接（浅色章节）- 不受明暗模式影响 */
  .force-dark-link {
    color: #3a5a4a !important;
  }

  .force-dark-link:hover {
    color: #2d4a3a !important;
    background-color: rgba(58, 90, 74, 0.1) !important;
  }

  .force-dark-link.active {
    color: #2d4a3a !important;
    border-bottom-color: #3a5a4a !important;
  }

  /* 强制深色分隔线（浅色章节）- 不受明暗模式影响 */
  .force-dark-divider {
    background-color: rgba(58, 90, 74, 0.3) !important;
  }

  /* 强制深色图标（浅色章节）- 不受明暗模式影响 */
  .force-dark-icon {
    color: #3a5a4a !important;
  }

  .force-dark-icon:hover {
    background-color: rgba(58, 90, 74, 0.1) !important;
  }

  /* 图标字体样式 */
  .iconfont {
    font-size: 18px;
  }

  /* ── 赛博朋克模式 ── */
  .app-header.cyberpunk {
    background-color: #05050a;
    border-bottom: 1px solid rgba(0, 240, 255, 0.3);
    box-shadow:
      0 1px 0 rgba(0, 240, 255, 0.3),
      0 2px 8px rgba(0, 240, 255, 0.15),
      0 4px 20px rgba(0, 240, 255, 0.08);
  }

  .app-header.cyberpunk.transparent-header {
    background-color: transparent;
  }

  .app-header.cyberpunk .header-title {
    color: #00f0ff;
    font-family: 'Share Tech Mono', monospace;
    text-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
  }

  .app-header.cyberpunk .nav-link {
    color: rgba(255, 255, 255, 0.55);
    font-family: 'Share Tech Mono', monospace;
  }

  .app-header.cyberpunk .nav-link:hover {
    color: #ff2e93;
    background-color: rgba(255, 46, 147, 0.06);
    text-shadow: 0 0 6px rgba(255, 46, 147, 0.5);
  }

  .app-header.cyberpunk .nav-link.active {
    color: #ff2e93;
    border-bottom-color: #ff2e93;
    text-shadow: 0 0 8px rgba(255, 46, 147, 0.6);
  }

  .app-header.cyberpunk .nav-divider {
    background-color: rgba(0, 240, 255, 0.2);
  }

  .app-header.cyberpunk .icon-item {
    color: rgba(255, 255, 255, 0.7);
  }

  .app-header.cyberpunk .icon-item:hover {
    color: #00f0ff;
    background-color: rgba(0, 240, 255, 0.08);
  }
</style>
