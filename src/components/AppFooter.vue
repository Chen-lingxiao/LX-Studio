<script setup>
/**
 * AppFooter.vue - 首页专属页脚组件
 *
 * 布局（参考图片样式）：
 * - 左侧：SYS 版本行 + 版权行
 * - 右侧：ICP 备案 + 公安备案 + LAST_SYNC 时间（三行）
 */
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useTheme } from '../composables/useTheme';

const { isDark, isCyberpunk } = useTheme();

const currentYear = new Date().getFullYear();
const sysVersion = 'v3.7.1';

const syncTimeText = ref('');
let timeTimer = null;

const pad = (n) => String(n).padStart(2, '0');

const formatSyncTime = (date) => {
  const y = date.getFullYear();
  const mo = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  const tz = -date.getTimezoneOffset() / 60;
  const tzStr = `UTC${tz >= 0 ? '+' : '-'}${pad(Math.abs(tz))}`;
  return `LAST_SYNC: ${y}-${mo}-${d} ${hh}:${mm}:${ss} ${tzStr}`;
};

const updateTime = () => {
  syncTimeText.value = formatSyncTime(new Date());
};

onMounted(() => {
  updateTime();
  timeTimer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timeTimer) {
    clearInterval(timeTimer);
  }
});

const yearText = computed(() => `${currentYear}`);
</script>

<template>
  <footer class="app-footer" :class="{ dark: isDark, cyberpunk: isCyberpunk }">
    <div class="footer-inner">
      <div class="footer-left">
        <p class="brand-line">【揽星河】 SYS:{{ sysVersion }}</p>
        <p class="copyright-line">© {{ yearText }} 揽星河 · 研习站</p>
      </div>
      <div class="footer-right">
        <a
          class="record-line"
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >陇ICP备2026004546号</a
        >
        <a
          class="record-line"
          href="https://beian.mps.gov.cn/#/query/webSearch?code=62072202000212"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/备案图标.png" alt="备案图标" class="record-icon" />
          甘公网安备62072202000212号
        </a>
        <span class="sync-line">{{ syncTimeText }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  width: 100%;
  height: 140px;
  background-color: #000000;
  color: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-family: 'Consolas', 'Menlo', 'Courier New', monospace;
  letter-spacing: 0.03rem;
}

.app-footer.dark {
  background-color: #000000;
  color: rgba(224, 232, 240, 0.8);
}

.footer-inner {
  width: 100%;
  max-width: 1400px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  line-height: 1.7;
}

.brand-line {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
}

.copyright-line {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}

.app-footer.dark .brand-line {
  color: rgba(255, 255, 255, 0.9);
}

.app-footer.dark .copyright-line {
  color: rgba(224, 232, 240, 0.5);
}

.footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
  line-height: 1.7;
}

.record-line {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s;
}

.record-line:hover {
  color: #ffffff;
}

.app-footer.dark .record-line {
  color: rgba(224, 232, 240, 0.65);
}

.app-footer.dark .record-line:hover {
  color: #ffffff;
}

.sync-line {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.app-footer.dark .sync-line {
  color: rgba(224, 232, 240, 0.45);
}

.record-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  vertical-align: -2px;
}

@media (max-width: 900px) {
  .app-footer {
    height: auto;
    min-height: 140px;
    padding: 1rem 0;
  }
  .footer-inner {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .footer-right {
    align-items: flex-start;
  }
}

/* ── 赛博朋克模式 ── */
.app-footer.cyberpunk {
  background-color: #05050a;
  border-top: 1px solid rgba(0, 240, 255, 0.15);
  font-family: 'Share Tech Mono', monospace;
}

.app-footer.cyberpunk .brand-line {
  color: #00f0ff;
  text-shadow: 0 0 6px rgba(0, 240, 255, 0.5);
}

.app-footer.cyberpunk .copyright-line {
  color: rgba(255, 255, 255, 0.4);
}

.app-footer.cyberpunk .record-line {
  color: rgba(255, 255, 255, 0.45);
}

.app-footer.cyberpunk .record-line:hover {
  color: #00f0ff;
  text-shadow: 0 0 6px rgba(0, 240, 255, 0.5);
}

.app-footer.cyberpunk .sync-line {
  color: rgba(0, 240, 255, 0.5);
}
</style>
