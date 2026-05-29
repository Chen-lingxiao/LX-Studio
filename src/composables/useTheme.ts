/**
 * useTheme.ts - 主题管理Composable（整合版）
 * 
 * 功能说明：
 * 1. 统一管理应用的明暗模式
 * 2. 集成全局设置系统，保持状态一致
 * 3. 提供主题切换和状态查询方法
 * 4. 支持首页特殊的章节级主题处理
 * 
 * 返回值：
 * - isDark: 是否为暗色模式
 * - toggleTheme: 切换主题
 * - setTheme: 设置主题模式
 * - getTheme: 获取当前主题模式
 */
import { computed } from 'vue'
import { useSettings } from './useSettings'

export type ThemeMode = 'light' | 'dark'

export function useTheme() {
  const { settings, updateSetting } = useSettings()

  /**
   * 当前是否为暗色模式
   */
  const isDark = computed(() => settings.isDark)

  /**
   * 切换主题
   */
  const toggleTheme = () => {
    updateSetting('isDark', !settings.isDark)
  }

  /**
   * 设置主题模式
   * @param mode 主题模式 'light' | 'dark'
   */
  const setTheme = (mode: ThemeMode) => {
    updateSetting('isDark', mode === 'dark')
  }

  /**
   * 获取当前主题模式
   */
  const getTheme = (): ThemeMode => {
    return settings.isDark ? 'dark' : 'light'
  }

  return {
    isDark,
    toggleTheme,
    setTheme,
    getTheme
  }
}
