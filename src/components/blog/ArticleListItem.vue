<script setup lang="ts">
  defineProps<{
    article: {
      id: number;
      title: string;
      date?: string;
    };
    isDark?: boolean;
    cyberpunk?: boolean;
    selected?: boolean;
  }>();

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return dateStr.replace(/-/g, '.');
  };

  defineEmits<{
    (e: 'click'): void;
  }>();
</script>

<template>
  <div
    class="article-list-item"
    :class="{ dark: isDark, cyberpunk: cyberpunk, selected: selected }"
    @click="$emit('click')"
  >
    <span class="item-date">{{ formatDate(article.date) }}</span>
    <span class="item-title">{{ article.title }}</span>
  </div>
</template>

<style scoped>
  .article-list-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.25s ease;
    border: 1px solid transparent;
  }

  :root:not(.dark) .article-list-item {
    background: var(--color-bg-surface, rgba(255, 255, 255, 0.7));
  }

  .article-list-item:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateX(4px);
    border-color: rgba(58, 90, 74, 0.2);
  }

  :root:not(.dark) .article-list-item:hover {
    background: var(--color-bg-hover, rgba(255, 255, 255, 0.9));
  }

  .article-list-item.selected {
    background: rgba(58, 90, 74, 0.12);
    border-color: rgba(58, 90, 74, 0.3);
    box-shadow: 0 2px 8px rgba(58, 90, 74, 0.1);
  }

  :root:not(.dark) .article-list-item.selected {
    background: rgba(58, 90, 74, 0.12);
  }

  .item-date {
    flex-shrink: 0;
    font-size: 11px;
    color: #8a9aaa;
    font-variant-numeric: tabular-nums;
  }

  .article-list-item.dark .item-date {
    color: #6a7a8a;
  }

  .item-title {
    flex: 1;
    font-size: 13px;
    font-weight: 500;
    color: #2a3a4a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
  }

  /* 暗色模式样式 */
  .article-list-item.dark {
    background: rgba(30, 40, 55, 0.7);
    border-color: transparent;
  }

  .article-list-item.dark:hover {
    background: rgba(40, 55, 70, 0.9);
    border-color: rgba(100, 140, 120, 0.2);
  }

  .article-list-item.dark.selected {
    background: rgba(80, 120, 100, 0.2);
    border-color: rgba(100, 160, 140, 0.3);
  }

  .article-list-item.dark .item-title {
    color: #b8c8d8;
  }

  /* 赛博朋克主题样式 */
  .article-list-item.cyberpunk {
    background: #05050a;
    border: 1px solid rgba(0, 240, 255, 0.15);
    border-radius: 0;
    font-family: 'Share Tech Mono', monospace;
  }

  .article-list-item.cyberpunk:hover {
    background: rgba(0, 240, 255, 0.06);
    border-color: rgba(255, 46, 147, 0.3);
    transform: none;
  }

  .article-list-item.cyberpunk.selected {
    background: rgba(255, 46, 147, 0.15);
    border-color: rgba(255, 46, 147, 0.5);
    box-shadow: 0 0 15px rgba(255, 46, 147, 0.3);
  }

  .article-list-item.cyberpunk .item-date {
    color: #00f0ff;
    text-shadow: 0 0 6px rgba(0, 240, 255, 0.5);
  }

  .article-list-item.cyberpunk .item-title {
    color: rgba(255, 255, 255, 0.85);
    letter-spacing: 0.03rem;
  }

  .article-list-item.cyberpunk:hover .item-title {
    color: #ff2e93;
    text-shadow: 0 0 10px rgba(255, 46, 147, 0.6);
  }
</style>
