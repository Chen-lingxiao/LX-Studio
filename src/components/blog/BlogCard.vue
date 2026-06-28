<script setup lang="ts">
  import { Clock } from 'lucide-vue-next';

  defineProps<{
    article: {
      id: number;
      title: string;
      excerpt: string;
      tags?: string[];
      readTime: string;
      date: string;
    };
    isDark?: boolean;
    isCyberpunk?: boolean;
  }>();

  defineEmits<{
    (e: 'click'): void;
  }>();
</script>

<template>
  <div class="blog-card" :class="{ dark: isDark, cyberpunk: isCyberpunk }" @click="$emit('click')">
    <div class="card-content">
      <div class="card-header">
        <span v-for="tag in article.tags?.slice(0, 2)" :key="tag" class="category-tag">{{ tag }}</span>
      </div>
      <h3 class="card-title">{{ article.title }}</h3>
      <p class="card-excerpt">{{ article.excerpt }}</p>
      <div class="card-meta">
        <span class="meta-item">
          <Clock :size="14" />
          {{ article.readTime }}
        </span>
        <span class="meta-item date">{{ article.date }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .blog-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.3);
    height: 200px;
    display: flex;
    flex-direction: column;
  }

  .blog-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  .card-content {
    padding: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card-header {
    margin-bottom: 10px;
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .category-tag {
    display: inline-block;
    padding: 2px 10px;
    background: rgba(58, 90, 74, 0.9);
    backdrop-filter: blur(4px);
    border-radius: 16px;
    font-size: 11px;
    font-weight: 500;
    color: white;
  }

  .card-title {
    font-size: 14px;
    font-weight: 600;
    color: #2a3a4a;
    margin: 0 0 8px 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-excerpt {
    font-size: 12px;
    color: #5a6a7a;
    margin: 0 0 12px 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }

  .card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 11px;
    color: #7a8a9a;
  }

  .meta-item.date {
    color: #9a9a9a;
  }

  /* 暗色模式样式 */
  .blog-card.dark {
    background: rgba(30, 40, 50, 0.85);
    border: 1px solid rgba(80, 100, 120, 0.3);
    transition: all 0.3s ease;
  }

  .blog-card.dark:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }

  .blog-card.dark .card-title {
    color: #c0d0e0;
  }

  .blog-card.dark .card-excerpt {
    color: #8a9aab;
  }

  .blog-card.dark .meta-item {
    color: #6a7a8a;
  }

  .blog-card.dark .meta-item.date {
    color: #5a6a7a;
  }

  .blog-card.dark .category-tag {
    background: rgba(80, 120, 100, 0.9);
  }

  /* Cyberpunk theme styles */
  .blog-card.cyberpunk {
    background: #05050a;
    border: 1px solid rgba(var(--cyber-cyan-rgb), 0.15);
    border-radius: 0;
    box-shadow:
      inset 0 0 4px rgba(var(--cyber-cyan-rgb), 0.2),
      inset 0 0 12px rgba(var(--cyber-cyan-rgb), 0.1);
    transition:
      box-shadow 0.3s ease,
      border-color 0.3s ease;
  }

  .blog-card.cyberpunk:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 46, 147, 0.3);
    box-shadow:
      inset 0 0 8px rgba(255, 46, 147, 0.5),
      inset 0 0 30px rgba(255, 46, 147, 0.25),
      0 0 25px rgba(255, 46, 147, 0.5),
      0 0 50px rgba(255, 46, 147, 0.25);
  }

  @keyframes blog-card-glitch {
    0% { transform: translate(0); }
    100% { transform: translate(0); }
  }

  .blog-card.cyberpunk .category-tag {
    background: transparent;
    border: 1px solid rgba(var(--cyber-pink-alt-rgb), 0.5);
    color: var(--cyber-neon-pink-alt);
    border-radius: 0;
    font-family: 'Share Tech Mono', monospace;
    padding: 2px 8px;
    letter-spacing: 0.05rem;
  }

  .blog-card.cyberpunk .card-title {
    color: var(--cyber-neon-cyan);
    font-family: 'Noto Sans SC', sans-serif;
    text-shadow: 0 0 10px rgba(var(--cyber-cyan-rgb), 0.35);
    transition: color 0.25s, text-shadow 0.25s;
  }

  .blog-card.cyberpunk:hover .card-title {
    color: var(--cyber-neon-pink-alt) !important;
    text-shadow:
      0 0 12px rgba(var(--cyber-pink-alt-rgb), 0.7),
      0 0 24px rgba(var(--cyber-pink-alt-rgb), 0.4);
  }

  .blog-card.cyberpunk .card-excerpt {
    color: rgba(255, 255, 255, 0.55);
    transition: color 0.25s;
  }

  .blog-card.cyberpunk:hover .card-excerpt {
    color: rgba(var(--cyber-cyan-rgb), 0.9) !important;
  }

  .blog-card.cyberpunk .category-tag {
    transition: all 0.25s;
  }

  .blog-card.cyberpunk:hover .category-tag {
    background: var(--cyber-neon-pink-alt) !important;
    color: #000 !important;
    box-shadow: 0 0 10px rgba(var(--cyber-pink-alt-rgb), 0.6);
  }

  .blog-card.cyberpunk .meta-item {
    color: rgba(255, 255, 255, 0.55);
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
  }

  .blog-card.cyberpunk .meta-item.date {
    color: rgba(var(--cyber-cyan-rgb), 0.75);
  }
</style>
