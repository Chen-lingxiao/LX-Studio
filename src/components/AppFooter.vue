<script setup>
/**
 * AppFooter.vue - 应用页脚组件
 * 
 * 功能说明：
 * 1. 悬浮在屏幕底部，不占用页面空间
 * 2. 显示版权信息和备案号
 * 3. 支持明暗主题切换
 * 4. 符合法规要求
 * 5. 首页hero section时背景透明，文字为白色
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHomeSection } from '../composables/useHomeSection'

const route = useRoute()
const { isHeroSection } = useHomeSection()

const currentYear = new Date().getFullYear()

/**
 * 判断是否在首页
 */
const isHome = computed(() => route.path === '/' || route.path === '/home')

/**
 * 是否应用白色文字样式（首页且处于hero区域）
 */
const useWhiteTextStyle = computed(() => isHome.value && isHeroSection.value)
</script>

<template>
  <footer class="app-footer" :class="{ 'transparent-footer': useWhiteTextStyle }">
    <div class="footer-content">
      <span class="footer-copyright" :class="{ 'white-text': useWhiteTextStyle }">© {{ currentYear }} LX. All rights reserved.</span>
      <span class="footer-divider" :class="{ 'white-divider': useWhiteTextStyle }">|</span>
      <span class="footer-icp" :class="{ 'white-text': useWhiteTextStyle }">备案号预留位</span>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 28px;
  background-color: var(--color-bg-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transition: background-color 0.3s, border-color 0.3s;
}

.footer-content {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--color-text-muted);
}

.footer-content span {
  transition: color 0.3s;
}

.footer-divider {
  color: var(--color-border);
}

.footer-icp {
  cursor: pointer;
}

.footer-icp:hover {
  color: var(--color-text-secondary);
}

/* 透明页脚样式（首页hero section） */
.transparent-footer {
  background-color: transparent;
  border-top: none;
}

/* 白色文本（首页hero section） */
.white-text {
  color: #ffffff;
}

/* 白色分隔线（首页hero section） */
.white-divider {
  color: rgba(255, 255, 255, 0.6);
}
</style>
