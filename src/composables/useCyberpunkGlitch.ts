/**
 * useCyberpunkGlitch.ts - 可复用的赛博朋克 PowerGlitch 效果
 *
 * 为指定容器内的可交互元素添加 hover 时的 PowerGlitch 故障动画。
 * 自动监听 isCyberpunk 状态，进入时初始化，退出时清理。
 *
 * 使用方式：
 *   const { isCyberpunk } = useTheme();
 *   useCyberpunkGlitch(containerRef, isCyberpunk, {
 *     selectors: ['.card', '.menu-item', '.list-item'],
 *   });
 */
import { watch, onBeforeUnmount, type Ref } from 'vue';
import { PowerGlitch } from 'powerglitch';

export interface CyberpunkGlitchOptions {
  /** 需要应用 glitch 效果的 CSS 选择器列表 */
  selectors: string[];
  /** glitch 动画配置（可选覆盖） */
  glitchConfig?: Record<string, any>;
}

/** 默认 glitch 配置 */
const DEFAULT_GLITCH_CONFIG = {
  playMode: 'manual',
  hideOverflow: false,
  timing: { duration: 600, iterations: 1, easing: 'ease-in-out' },
  glitchTimeSpan: { start: 0, end: 0.5 },
  shake: { velocity: 20, amplitudeX: 0.12, amplitudeY: 0.12 },
  slice: {
    count: 8,
    velocity: 15,
    minHeight: 0.02,
    maxHeight: 0.30,
    cssFilters: 'blur(2px) brightness(1.2)',
  },
};

interface GlitchElement extends HTMLElement {
  _cyberGlitchInstance?: any;
}

/**
 * 为元素添加 PowerGlitch 实例并返回清理函数
 */
function initGlitchOnElements(
  container: HTMLElement,
  selectors: string[],
  config: Record<string, any>
): GlitchElement[] {
  const selector = selectors.join(', ');
  const elements = container.querySelectorAll<GlitchElement>(selector);
  const glitched: GlitchElement[] = [];

  elements.forEach((el) => {
    if (el._cyberGlitchInstance) return;
    try {
      el._cyberGlitchInstance = PowerGlitch.glitch(el, config);
      glitched.push(el);
    } catch {
      // 静默失败
    }
  });

  return glitched;
}

/**
 * 清理所有 glitch 实例
 */
function destroyGlitchInstances(elements: GlitchElement[]) {
  elements.forEach((el) => {
    try {
      if (el._cyberGlitchInstance) {
        el._cyberGlitchInstance.stopGlitch();
        delete el._cyberGlitchInstance;
      }
    } catch {
      // 静默失败
    }
  });

  // 清理 PowerGlitch 包装器
  const wrappers = document.querySelectorAll('.powerglitch');
  wrappers.forEach((w) => {
    const parent = w.parentNode;
    if (parent) {
      while (w.firstChild) {
        parent.insertBefore(w.firstChild, w);
      }
      parent.removeChild(w);
    }
  });
}

/**
 * 触发单个元素的 glitch 效果
 */
function triggerGlitch(el: GlitchElement) {
  if (!el._cyberGlitchInstance) return;
  el._cyberGlitchInstance.startGlitch();
  setTimeout(() => {
    if (el?._cyberGlitchInstance) {
      el._cyberGlitchInstance.stopGlitch();
    }
  }, 700);
}

/**
 * 赛博朋克 glitch composable
 *
 * @param containerRef - 容器元素的 ref
 * @param isActive - 是否激活（通常绑定 isCyberpunk）
 * @param options - 配置选项
 */
export function useCyberpunkGlitch(
  containerRef: Ref<HTMLElement | null>,
  isActive: Ref<boolean>,
  options: CyberpunkGlitchOptions
) {
  let glitchedElements: GlitchElement[] = [];
  let eventListeners: Array<{
    el: EventTarget;
    handler: EventListener;
    type: string;
  }> = [];
  let lastHovered: GlitchElement | null = null;

  const config = options.glitchConfig || DEFAULT_GLITCH_CONFIG;

  function setup() {
    const container = containerRef.value;
    if (!container) return;

    // 初始化 glitch 实例
    glitchedElements = initGlitchOnElements(
      container,
      options.selectors,
      config
    );

    if (glitchedElements.length === 0) return;

    // 事件处理器
    const overHandler = (e: Event) => {
      const target = e.target as GlitchElement;
      if (!target || target.nodeType !== 1 || !target._cyberGlitchInstance)
        return;
      if (target === lastHovered) return;
      lastHovered = target;
      triggerGlitch(target);
    };

    const outHandler = (e: Event) => {
      const target = e.target as GlitchElement;
      if (!target || target.nodeType !== 1 || !target._cyberGlitchInstance)
        return;
      if (target === lastHovered) {
        lastHovered = null;
      }
      triggerGlitch(target);
    };

    container.addEventListener('mouseover', overHandler);
    container.addEventListener('mouseout', outHandler);
    eventListeners.push(
      { el: container, handler: overHandler, type: 'mouseover' },
      { el: container, handler: outHandler, type: 'mouseout' }
    );
  }

  function teardown() {
    // 移除事件监听
    eventListeners.forEach(({ el, handler, type }) => {
      el.removeEventListener(type, handler);
    });
    eventListeners = [];
    lastHovered = null;

    // 清理 glitch 实例
    destroyGlitchInstances(glitchedElements);
    glitchedElements = [];
  }

  // 监听 isActive 变化
  watch(
    isActive,
    (active) => {
      if (active) {
        // 延迟一帧确保 DOM 已更新
        requestAnimationFrame(() => {
          setup();
        });
      } else {
        teardown();
      }
    },
    { immediate: true }
  );

  // 组件卸载时清理
  onBeforeUnmount(() => {
    teardown();
  });

  return {
    /** 手动重新初始化（例如列表数据更新后） */
    reinit: () => {
      teardown();
      if (isActive.value) {
        requestAnimationFrame(() => {
          setup();
        });
      }
    },
  };
}
