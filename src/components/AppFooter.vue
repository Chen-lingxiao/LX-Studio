<script setup>
/**
 * AppFooter.vue - 应用页脚组件
 * 
 * 功能说明：
 * 1. 悬浮在屏幕底部，不占用页面空间
 * 2. 显示版权信息和备案号
 * 3. 支持明暗主题切换
 * 4. 符合法规要求
 * 5. 首页：背景透明，文字颜色根据章节背景调整
 * 6. 项目/学习页面：背景透明，文字颜色跟随明暗模式
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHomeSection } from '../composables/useHomeSection'
import { useSettings } from '../composables/useSettings'

const route = useRoute()
const { settings } = useSettings()
const { isDarkSection, isLightSection } = useHomeSection()

const props = defineProps({
 transparentMode: {
 type: Boolean,
 default: false
 }
})

const currentYear = new Date().getFullYear()

/**
 * 判断是否在首页
 */
const isHome = computed(() => route.path === '/' || route.path === '/home')

/**
 * 是否显示透明背景
 */
const showTransparent = computed(() => props.transparentMode || isHome.value)

/**
 * 是否应用白色文字样式
 * 首页：暗色章节或暗色模式使用白色文字
 * 项目/学习页面：根据明暗模式
 */
const useWhiteTextStyle = computed(() => {
 if (props.transparentMode) {
 if (isHome.value) {
 return isDarkSection.value || settings.isDark
 }
 return settings.isDark
 }
 return isDarkSection.value || settings.isDark
})
</script>

<template>
  <footer class="app-footer" :class="{ 'transparent-footer': showTransparent }">
    <div class="footer-content">
      <span class="footer-copyright" :class="{ 'white-text': useWhiteTextStyle, 'dark-text': !useWhiteTextStyle && showTransparent }">© {{ currentYear }} LX. All rights reserved.</span>
      <span class="footer-divider" :class="{ 'white-divider': useWhiteTextStyle, 'dark-divider': !useWhiteTextStyle && showTransparent }">|</span>
      <span class="footer-icp" :class="{ 'white-text': useWhiteTextStyle, 'dark-text': !useWhiteTextStyle && showTransparent }">备案号预留位</span>
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

/* 透明页脚样式（首页） */
.transparent-footer {
  background-color: transparent;
  border-top: none;
}

/* 白色文本（首页） */
.white-text {
  color: #ffffff;
}

/* 白色分隔线（首页） */
.white-divider {
  color: rgba(255, 255, 255, 0.6);
}

/* 深色文本（首页浅色章节/项目学习页面）- 不受明暗模式影响 */
.dark-text {
  color: #3a5a4a !important;
}

/* 深色分隔线（首页浅色章节/项目学习页面）- 不受明暗模式影响 */
.dark-divider {
  color: rgba(58, 90, 74, 0.4) !important;
}
</style>
