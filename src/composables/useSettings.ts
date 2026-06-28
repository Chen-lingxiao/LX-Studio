/**
 * useSettings.ts - 应用设置管理
 *
 * 管理非主题类的应用设置（如 FPS 显示）。
 * 主题相关操作（明暗模式、色彩预设、赛博朋克）已迁移至 useTheme.ts。
 *
 * 为保持向后兼容，settings 对象仍包含 isDark / themeColorPreset 字段，
 * 但它们是 useTheme 状态的只读代理，修改操作委托给 useTheme。
 */
import { reactive } from 'vue';
import {
  useTheme,
  themeColorPresets,
  type ThemeColorPreset,
} from './useTheme';

/** @deprecated 从 useTheme 导入 */
export type { ThemeColorPreset };
/** @deprecated 从 useTheme 导入 */
export { themeColorPresets };

/**
 * 设置接口定义（向后兼容）
 */
export interface Settings {
  showFps: boolean;
  themeColorPreset: ThemeColorPreset;
  isDark: boolean;
}

/**
 * 默认设置值
 */
const DEFAULT_SETTINGS: Settings = {
  showFps: true,
  themeColorPreset: 'default',
  isDark: false,
};

/**
 * 设置状态（模块级别响应式对象）
 * isDark 和 themeColorPreset 通过 computed 代理到 useTheme
 */
const settingsState = reactive({
  showFps: true,
});

/** 初始化标志 */
let isInitialized = false;

/**
 * 从localStorage加载非主题设置
 */
function loadSettings() {
  const saved = localStorage.getItem('app-settings');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (typeof parsed.showFps === 'boolean') {
        settingsState.showFps = parsed.showFps;
      }
    } catch {
      // 静默失败
    }
  }
}

/**
 * 保存非主题设置到localStorage
 */
function saveSettings() {
  localStorage.setItem(
    'app-settings',
    JSON.stringify({ showFps: settingsState.showFps })
  );
}

/**
 * 初始化设置（只在首次调用时执行）
 */
function initSettings() {
  if (isInitialized) return;
  isInitialized = true;
  loadSettings();
}

export function useSettings() {
  initSettings();

  // 获取 useTheme 实例（共享同一个模块级单例）
  const theme = useTheme();

  /**
   * 向后兼容的 settings 对象
   * isDark 和 themeColorPreset 是只读代理
   */
  const settings: Settings = reactive({
    get showFps() {
      return settingsState.showFps;
    },
    set showFps(val: boolean) {
      settingsState.showFps = val;
      saveSettings();
    },
    get isDark() {
      return theme.isDark.value;
    },
    set isDark(val: boolean) {
      theme.setColorMode(val ? 'dark' : 'light');
    },
    get themeColorPreset() {
      return theme.currentPreset.value;
    },
    set themeColorPreset(val: ThemeColorPreset) {
      theme.setPreset(val);
    },
  });

  /**
   * 更新单个设置项（向后兼容）
   */
  function updateSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
    if (key === 'isDark') {
      theme.setColorMode(value ? 'dark' : 'light');
    } else if (key === 'themeColorPreset') {
      theme.setPreset(value as ThemeColorPreset);
    } else if (key === 'showFps') {
      settingsState.showFps = value as boolean;
      saveSettings();
    }
  }

  /**
   * 重置所有设置为默认值
   */
  function resetSettings() {
    settingsState.showFps = DEFAULT_SETTINGS.showFps;
    saveSettings();
    theme.setColorMode('light');
    theme.setPreset('default');
  }

  return {
    settings,
    updateSetting,
    resetSettings,
    themeColorPresets,
    initSettings,
  };
}
