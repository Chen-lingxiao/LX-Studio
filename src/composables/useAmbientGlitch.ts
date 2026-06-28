/**
 * useAmbientGlitch.ts - 环境文字故障效果
 *
 * 随机为页面中的 .glitchable-text 元素添加短暂的 glitch 动画，
 * 营造赛博朋克风格的环境氛围。
 */

let ambientTimer: ReturnType<typeof setInterval> | null = null;

const AMBIENT_INTERVAL = 400; // 每次触发间隔 (ms)
const GLITCH_DURATION = 500; // 单次 glitch 动画时长 (ms)
const MAX_TARGETS = 3; // 每次最多 glitch 的元素数

/**
 * 启动环境文字故障效果
 */
export function startAmbientGlitch() {
  if (ambientTimer) return;

  ambientTimer = setInterval(() => {
    const elements = document.querySelectorAll<HTMLElement>('.glitchable-text');
    if (elements.length === 0) return;

    const count = Math.min(MAX_TARGETS, Math.ceil(Math.random() * MAX_TARGETS));
    for (let i = 0; i < count; i++) {
      const el = elements[Math.floor(Math.random() * elements.length)];
      if (!el || el.classList.contains('text-glitch-ambient')) continue;

      el.classList.add('text-glitch-ambient');
      setTimeout(() => {
        el.classList.remove('text-glitch-ambient');
      }, GLITCH_DURATION);
    }
  }, AMBIENT_INTERVAL);
}

/**
 * 停止环境文字故障效果
 */
export function stopAmbientGlitch() {
  if (ambientTimer) {
    clearInterval(ambientTimer);
    ambientTimer = null;
  }
  // 清理残留的 glitch class
  document.querySelectorAll('.text-glitch-ambient').forEach((el) => {
    el.classList.remove('text-glitch-ambient');
  });
}
