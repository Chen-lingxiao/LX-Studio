/**
 * useTheme.ts - 统一主题管理系统
 *
 * 管理三个维度：
 * 1. colorMode: 'light' | 'dark' — 明暗模式（持久化）
 * 2. preset: ThemeColorPreset — 色彩预设，仅亮色模式有效（持久化）
 * 3. isCyberpunk: boolean — 赛博朋克模式（不持久化，彩蛋特性）
 *
 * 所有主题变更通过操作 document.documentElement 的 class / data 属性实现，
 * 不触碰任何业务逻辑，确保视觉与逻辑完全分离。
 *
 * 使用方式：
 *   const { isDark, isCyberpunk, toggleColorMode, enterCyberpunk } = useTheme();
 */
import { reactive, computed } from 'vue';

export type ThemeMode = 'light' | 'dark';

export type ThemeColorPreset =
  | 'default'
  | 'light-purple'
  | 'light-green'
  | 'light-pink'
  | 'mint-green'
  | 'soft-blue';

export interface PresetConfig {
  name: string;
  colors: Record<string, string>;
}

/** 6 种预设主题色配置 */
export const themeColorPresets: Record<ThemeColorPreset, PresetConfig> = {
  default: {
    name: '默认白',
    colors: {
      '--color-bg-base': '#ffffff',
      '--color-bg-surface': '#ffffff',
      '--color-bg-elevated': '#f5f5f5',
      '--color-bg-hover': '#e8e8e8',
      '--color-border': '#eeeeee',
      '--color-border-muted': '#dddddd',
      '--color-primary': '#1e90ff',
      '--color-primary-hover': '#1a7de0',
      '--color-primary-active': '#1565c0',
      '--color-primary-bg-light': 'rgba(30, 144, 255, 0.08)',
      '--color-primary-bg-hover': 'rgba(30, 144, 255, 0.12)',
      '--color-primary-bg-active': 'rgba(30, 144, 255, 0.18)',
    },
  },
  'light-purple': {
    name: '淡紫色',
    colors: {
      '--color-bg-base': '#fff0f9',
      '--color-bg-surface': '#ffe6f7',
      '--color-bg-elevated': '#fff5fb',
      '--color-bg-hover': '#ffd6ed',
      '--color-border': '#f8e0f0',
      '--color-border-muted': '#f0d0e8',
      '--color-primary': '#9c27b0',
      '--color-primary-hover': '#7b1fa2',
      '--color-primary-active': '#6a1b9a',
      '--color-primary-bg-light': 'rgba(156, 39, 176, 0.08)',
      '--color-primary-bg-hover': 'rgba(156, 39, 176, 0.12)',
      '--color-primary-bg-active': 'rgba(156, 39, 176, 0.18)',
    },
  },
  'light-green': {
    name: '淡绿色',
    colors: {
      '--color-bg-base': '#e0ebd8',
      '--color-bg-surface': '#d0ddc8',
      '--color-bg-elevated': '#e8f0e1',
      '--color-bg-hover': '#c0cfb8',
      '--color-border': '#d8e4ce',
      '--color-border-muted': '#c8d4bc',
      '--color-primary': '#3a7d44',
      '--color-primary-hover': '#2e6b3a',
      '--color-primary-active': '#245a30',
      '--color-primary-bg-light': 'rgba(58, 125, 68, 0.08)',
      '--color-primary-bg-hover': 'rgba(58, 125, 68, 0.12)',
      '--color-primary-bg-active': 'rgba(58, 125, 68, 0.18)',
    },
  },
  'light-pink': {
    name: '淡粉色',
    colors: {
      '--color-bg-base': '#fff0f0',
      '--color-bg-surface': '#ffe6e6',
      '--color-bg-elevated': '#fffafa',
      '--color-bg-hover': '#ffd6d6',
      '--color-border': '#ffebe9',
      '--color-border-muted': '#f0d8d8',
      '--color-primary': '#e53935',
      '--color-primary-hover': '#c62828',
      '--color-primary-active': '#b71c1c',
      '--color-primary-bg-light': 'rgba(229, 57, 53, 0.08)',
      '--color-primary-bg-hover': 'rgba(229, 57, 53, 0.12)',
      '--color-primary-bg-active': 'rgba(229, 57, 53, 0.18)',
    },
  },
  'mint-green': {
    name: '薄荷绿',
    colors: {
      '--color-bg-base': '#e8f5f0',
      '--color-bg-surface': '#d4e8e0',
      '--color-bg-elevated': '#f0faf7',
      '--color-bg-hover': '#c4d8d0',
      '--color-border': '#d8ece4',
      '--color-border-muted': '#c8dcc4',
      '--color-primary': '#00897b',
      '--color-primary-hover': '#00796b',
      '--color-primary-active': '#00695c',
      '--color-primary-bg-light': 'rgba(0, 137, 123, 0.08)',
      '--color-primary-bg-hover': 'rgba(0, 137, 123, 0.12)',
      '--color-primary-bg-active': 'rgba(0, 137, 123, 0.18)',
    },
  },
  'soft-blue': {
    name: '柔和蓝',
    colors: {
      '--color-bg-base': '#e8f0fe',
      '--color-bg-surface': '#d4e4fc',
      '--color-bg-elevated': '#f0f6ff',
      '--color-bg-hover': '#c4d4ec',
      '--color-border': '#d8e4f8',
      '--color-border-muted': '#c8d4e8',
      '--color-primary': '#1565c0',
      '--color-primary-hover': '#0d47a1',
      '--color-primary-active': '#0a3d8f',
      '--color-primary-bg-light': 'rgba(21, 101, 192, 0.08)',
      '--color-primary-bg-hover': 'rgba(21, 101, 192, 0.12)',
      '--color-primary-bg-active': 'rgba(21, 101, 192, 0.18)',
    },
  },
};

/** localStorage 键名 */
const STORAGE_KEY = 'lx-theme';

/** 主题状态（模块级单例） */
const themeState = reactive({
  colorMode: 'light' as ThemeMode,
  preset: 'default' as ThemeColorPreset,
  isCyberpunk: false,
});

/** 初始化标志 */
let initialized = false;

// ======================== 内部工具函数 ========================

function getRoot(): HTMLElement {
  return document.documentElement;
}

/** 从 localStorage 加载持久化状态 */
function loadFromStorage(): void {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.colorMode === 'light' || parsed.colorMode === 'dark') {
        themeState.colorMode = parsed.colorMode;
      }
      if (parsed.preset && parsed.preset in themeColorPresets) {
        themeState.preset = parsed.preset;
      }
    }
  } catch {
    // 静默失败
  }
}

/** 持久化当前状态（不包含 isCyberpunk） */
function saveToStorage(): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        colorMode: themeState.colorMode,
        preset: themeState.preset,
      })
    );
  } catch {
    // 静默失败
  }
}

/** 应用明暗模式到 DOM */
function applyColorMode(mode: ThemeMode): void {
  const root = getRoot();
  if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/** 应用色彩预设到 DOM（通过 data 属性选择器） */
function applyPreset(preset: ThemeColorPreset): void {
  const root = getRoot();
  if (preset === 'default') {
    root.removeAttribute('data-preset');
  } else {
    root.setAttribute('data-preset', preset);
  }
}

/** 应用赛博朋克模式到 DOM */
function applyCyberpunk(enabled: boolean): void {
  const root = getRoot();
  if (enabled) {
    root.classList.add('cyberpunk-theme');
  } else {
    root.classList.remove('cyberpunk-theme');
  }
}

/** 初始化主题系统（仅首次调用生效） */
function initTheme(): void {
  if (initialized) return;
  initialized = true;

  loadFromStorage();
  applyColorMode(themeState.colorMode);
  applyPreset(themeState.preset);
  // isCyberpunk 不持久化，默认关闭
  applyCyberpunk(false);
}

// ======================== Composable 导出 ========================

export function useTheme() {
  initTheme();

  // ---------- 计算属性 ----------

  const isDark = computed(() => themeState.colorMode === 'dark');
  const isCyberpunk = computed(() => themeState.isCyberpunk);
  const currentPreset = computed(() => themeState.preset);
  const colorMode = computed(() => themeState.colorMode);

  // ---------- 明暗模式操作 ----------

  /** 切换明暗模式 */
  const toggleColorMode = (): void => {
    const newMode: ThemeMode = themeState.colorMode === 'light' ? 'dark' : 'light';
    themeState.colorMode = newMode;
    applyColorMode(newMode);
    saveToStorage();
  };

  /** 设置明暗模式 */
  const setColorMode = (mode: ThemeMode): void => {
    if (themeState.colorMode === mode) return;
    themeState.colorMode = mode;
    applyColorMode(mode);
    saveToStorage();
  };

  // ---------- 色彩预设操作 ----------

  /** 设置色彩预设 */
  const setPreset = (preset: ThemeColorPreset): void => {
    if (themeState.preset === preset) return;
    themeState.preset = preset;
    applyPreset(preset);
    saveToStorage();
  };

  // ---------- 赛博朋克操作 ----------

  /** 进入赛博朋克模式 */
  const enterCyberpunk = (): void => {
    if (themeState.isCyberpunk) return;
    themeState.isCyberpunk = true;
    applyCyberpunk(true);
  };

  /** 退出赛博朋克模式 */
  const exitCyberpunk = (): void => {
    if (!themeState.isCyberpunk) return;
    themeState.isCyberpunk = false;
    applyCyberpunk(false);
  };

  /** 切换赛博朋克模式 */
  const toggleCyberpunk = (): void => {
    if (themeState.isCyberpunk) {
      exitCyberpunk();
    } else {
      enterCyberpunk();
    }
  };

  // ---------- 兼容旧 API ----------

  /** @deprecated 使用 toggleColorMode 代替 */
  const toggleTheme = toggleColorMode;

  /** @deprecated 使用 setColorMode 代替 */
  const setTheme = setColorMode;

  /** @deprecated 使用 colorMode 代替 */
  const getTheme = (): ThemeMode => themeState.colorMode;

  return {
    // 状态
    isDark,
    isCyberpunk,
    currentPreset,
    colorMode,
    // 明暗模式
    toggleColorMode,
    setColorMode,
    // 预设
    setPreset,
    themeColorPresets,
    // 赛博朋克
    enterCyberpunk,
    exitCyberpunk,
    toggleCyberpunk,
    // 兼容旧 API
    toggleTheme,
    setTheme,
    getTheme,
  };
}
