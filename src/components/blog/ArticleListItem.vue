<script setup lang="ts">
  defineProps<{
    article: {
      id: number;
      title: string;
      category: string;
    };
    isDark?: boolean;
    selected?: boolean;
  }>();

  defineEmits<{
    (e: 'click'): void;
  }>();
</script>

<template>
  <div
    class="article-list-item"
    :class="{ dark: isDark, selected: selected }"
    @click="$emit('click')"
  >
    <span class="item-category">{{ article.category }}</span>
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

  .item-category {
    flex-shrink: 0;
    padding: 3px 10px;
    background: rgba(58, 90, 74, 0.85);
    border-radius: 12px;
    font-size: 11px;
    font-weight: 500;
    color: white;
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

  .article-list-item.dark .item-category {
    background: rgba(80, 120, 100, 0.85);
  }
</style>
