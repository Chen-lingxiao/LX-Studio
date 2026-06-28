<script setup>
  import { ref, computed, onMounted } from 'vue';
  import ArticleListItem from '../components/blog/ArticleListItem.vue';
  import MarkdownIt from 'markdown-it';
  import hljs from 'highlight.js/lib/core';
  import javascript from 'highlight.js/lib/languages/javascript';
  import bash from 'highlight.js/lib/languages/bash';
  import xml from 'highlight.js/lib/languages/xml';
  import css from 'highlight.js/lib/languages/css';
  import json from 'highlight.js/lib/languages/json';
  import typescript from 'highlight.js/lib/languages/typescript';
  import { useTheme } from '../composables/useTheme';
  import { useCyberpunkGlitch } from '../composables/useCyberpunkGlitch';

  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('bash', bash);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('html', xml);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('json', json);
  hljs.registerLanguage('typescript', typescript);

  const { isDark, isCyberpunk } = useTheme();

  const pageRef = ref<HTMLElement | null>(null);
  useCyberpunkGlitch(
    pageRef,
    isCyberpunk,
    { selectors: ['.article-list-item', '.category-tab'] }
  );

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          const result = hljs.highlight(str, { language: lang, ignoreIllegals: true });
          return '<pre class="hljs"><code>' + result.value + '</code></pre>';
        } catch (__) {}
      }
      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    },
  });

  const articles = ref([]);
  const tags = ref([]);
  const loading = ref(true);
  const activeTag = ref('全部');
  const selectedArticle = ref(null);
  const articleContent = ref('');

  const sortedArticles = computed(() => {
    const filtered =
      activeTag.value === '全部'
        ? articles.value
        : articles.value.filter((a) => a.tags && a.tags.includes(activeTag.value));
    return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  const loadArticles = async () => {
    loading.value = true;
    try {
      const response = await fetch('/api/articles');
      const result = await response.json();
      if (result.success) {
        articles.value = result.data;
      }
    } catch (error) {
      console.error('加载文章列表失败:', error);
    }
  };

  const loadTags = async () => {
    try {
      const response = await fetch('/api/articles/tags');
      const result = await response.json();
      if (result.success) {
        tags.value = result.data;
      }
    } catch (error) {
      console.error('加载标签失败:', error);
    }
  };

  const selectArticle = async (article) => {
    selectedArticle.value = article;
    if (article.content) {
      articleContent.value = md.render(article.content);
    } else {
      articleContent.value = '<p>暂无内容</p>';
    }
  };

  onMounted(async () => {
    await Promise.all([loadArticles(), loadTags()]);
    loading.value = false;
    if (sortedArticles.value.length > 0) {
      selectArticle(sortedArticles.value[0]);
    }
  });

  const handleTagChange = (tag) => {
    activeTag.value = tag;
    if (sortedArticles.value.length > 0) {
      selectArticle(sortedArticles.value[0]);
    }
  };
</script>

<template>
  <div class="articles-page" ref="pageRef" :class="{ 'dark-mode': isDark, cyberpunk: isCyberpunk }">
    <div class="articles-background">
      <div class="sky-gradient"></div>
      <div class="clouds">
        <div class="cloud cloud-1"></div>
        <div class="cloud cloud-2"></div>
        <div class="cloud cloud-3"></div>
      </div>
      <div class="stars" v-if="isDark">
        <div
          v-for="i in 50"
          :key="i"
          class="star"
          :style="{
            left: Math.random() * 100 + '%',
            top: Math.random() * 60 + '%',
            animationDelay: Math.random() * 3 + 's',
            opacity: Math.random() * 0.5 + 0.5,
          }"
        ></div>
      </div>
    </div>

    <div class="articles-container">
      <header class="articles-header">
        <div class="category-tabs">
          <button
            v-for="tag in tags"
            :key="tag.name"
            class="category-tab"
            :class="{ active: activeTag === tag.name }"
            @click="handleTagChange(tag.name)"
          >
            {{ tag.name }}
            <span class="category-count">{{ tag.count }}</span>
          </button>
        </div>
      </header>

      <main class="articles-main">
        <aside class="articles-sidebar">
          <div class="sidebar-header">
            <span class="sidebar-title">文章列表</span>
            <span class="sidebar-count">{{ sortedArticles.length }} 篇</span>
          </div>

          <div v-if="loading" class="loading-state">加载中...</div>
          
          <div v-else class="articles-list custom-scrollbar">
            <ArticleListItem
              v-for="article in sortedArticles"
              :key="article.id"
              :article="article"
              :is-dark="isDark"
              :selected="selectedArticle?.id === article.id"
              @click="selectArticle(article)"
            />
          </div>
        </aside>

        <article class="article-content-area">
          <div v-if="selectedArticle" class="article-detail">
            <header class="article-header">
              <div class="article-meta">
                <span
                  v-for="tag in selectedArticle.tags"
                  :key="tag"
                  class="article-tag"
                  >{{ tag }}</span
                >
                <span class="article-date">{{ selectedArticle.date }}</span>
                <span v-if="selectedArticle.readTime" class="article-read-time">
                  📖 {{ selectedArticle.readTime }}
                </span>
              </div>
              <h2 class="article-title">{{ selectedArticle.title }}</h2>
              <p class="article-excerpt">{{ selectedArticle.excerpt }}</p>
            </header>

            <div class="article-body">
              <div class="markdown-content" v-html="articleContent"></div>
            </div>
          </div>

          <div v-else class="empty-state">
            <div class="empty-icon">📝</div>
            <p>{{ loading ? '加载中...' : '请选择一篇文章查看内容' }}</p>
          </div>
        </article>
      </main>
    </div>
  </div>
</template>

<style scoped>
  .articles-page {
    height: 100%;
    position: relative;
    transition: all 0.5s ease;
    overflow: hidden;
  }

  .articles-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    overflow: hidden;
  }

  .sky-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, #e8f4f8 0%, #f0f7f9 40%, #f5faf8 100%);
    transition: background 0.5s ease;
  }

  .dark-mode .sky-gradient {
    background: linear-gradient(180deg, #0a0a1a 0%, #1a1a3a 40%, #0f1f2f 100%);
  }

  .clouds {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  .cloud {
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    filter: blur(20px);
    animation: float 20s ease-in-out infinite;
  }

  .cloud-1 {
    width: 300px;
    height: 80px;
    top: 15%;
    left: -10%;
    animation-delay: 0s;
  }

  .cloud-2 {
    width: 400px;
    height: 100px;
    top: 25%;
    left: 30%;
    animation-delay: -5s;
  }

  .cloud-3 {
    width: 250px;
    height: 70px;
    top: 10%;
    left: 60%;
    animation-delay: -10s;
  }

  .dark-mode .cloud {
    background: rgba(30, 30, 60, 0.5);
  }

  @keyframes float {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(30px);
    }
  }

  .stars {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    animation: twinkle 3s ease-in-out infinite;
  }

  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.5);
    }
  }

  .articles-container {
    position: relative;
    z-index: 1;
    max-width: 1400px;
    height: 100%;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .articles-header {
    text-align: center;
    margin-bottom: 20px;
    flex-shrink: 0;
  }

  .category-tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .category-tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 24px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 25px;
    font-size: 14px;
    font-weight: 500;
    color: #3a4a5a;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .dark-mode .category-tab {
    background: rgba(25, 35, 55, 0.8);
    color: #b8c8d8;
    border-color: rgba(80, 100, 120, 0.3);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .category-tab:hover {
    background: rgba(255, 255, 255, 0.95);
    color: #1a2a3a;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .dark-mode .category-tab:hover {
    background: rgba(50, 65, 90, 0.95);
    color: #e8f4f8;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }

  .category-tab.active {
    background: rgba(58, 90, 74, 0.9);
    color: white;
    border-color: rgba(58, 90, 74, 0.5);
    box-shadow: 0 4px 15px rgba(58, 90, 74, 0.3);
  }

  .category-count {
    font-size: 12px;
    opacity: 0.8;
  }

  .articles-main {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 30px;
    flex: 1;
    min-height: 0;
  }

  .articles-sidebar {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    overflow-y: auto;
    min-height: 0;
  }

  :root:not(.dark) .articles-sidebar {
    background: var(--color-bg-surface, rgba(255, 255, 255, 0.85));
    border-color: var(--color-border, rgba(0, 0, 0, 0.08));
  }

  .dark-mode .articles-sidebar {
    background: rgba(15, 20, 35, 0.85);
    border-color: rgba(80, 100, 120, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .dark-mode .sidebar-header {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .sidebar-title {
    font-size: 14px;
    font-weight: 600;
    color: #3a5a4a;
  }

  .dark-mode .sidebar-title {
    color: #c8d8e8;
  }

  .sidebar-count {
    font-size: 12px;
    color: #7a8a9a;
    background: rgba(0, 0, 0, 0.05);
    padding: 3px 8px;
    border-radius: 10px;
  }

  .dark-mode .sidebar-count {
    background: rgba(255, 255, 255, 0.05);
    color: #9aabbb;
  }

  .articles-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .articles-sidebar::-webkit-scrollbar {
    width: 6px;
  }

  .articles-sidebar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }

  .dark-mode .articles-sidebar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  .articles-sidebar::-webkit-scrollbar-thumb {
    background: rgba(58, 90, 74, 0.3);
    border-radius: 3px;
  }

  .dark-mode .articles-sidebar::-webkit-scrollbar-thumb {
    background: rgba(100, 140, 120, 0.3);
  }

  .article-content-area {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    padding: 35px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    overflow-y: auto;
    min-height: 0;
    transition: all 0.3s ease;
  }

  :root:not(.dark) .article-content-area {
    background: var(--color-bg-elevated, rgba(255, 255, 255, 0.95));
    border-color: var(--color-border, rgba(0, 0, 0, 0.08));
  }

  .dark-mode .article-content-area {
    background: rgba(15, 20, 35, 0.9);
    border-color: rgba(80, 100, 120, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .article-content-area::-webkit-scrollbar {
    width: 6px;
  }

  .article-content-area::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.03);
    border-radius: 3px;
  }

  .dark-mode .article-content-area::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.03);
  }

  .article-content-area::-webkit-scrollbar-thumb {
    background: rgba(58, 90, 74, 0.25);
    border-radius: 3px;
  }

  .dark-mode .article-content-area::-webkit-scrollbar-thumb {
    background: rgba(100, 140, 120, 0.25);
  }

  .article-detail {
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ── 文章头部信息 ── */
  .article-header {
    margin-bottom: 28px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  .dark-mode .article-header {
    border-bottom-color: rgba(255, 255, 255, 0.06);
  }

  /* 元信息行：分类 + 日期 */
  .article-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
    flex-wrap: wrap;
  }

  .article-tag {
    display: inline-flex;
    align-items: center;
    padding: 4px 14px;
    background: rgba(58, 90, 74, 0.1);
    color: #3a6a4a;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.03em;
  }

  .dark-mode .article-tag {
    background: rgba(106, 196, 138, 0.12);
    color: #6ac48a;
  }

  .article-date {
    font-size: 13px;
    color: #8a9aaa;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .article-date::before {
    content: '📅';
    font-size: 13px;
  }

  .article-read-time {
    font-size: 13px;
    color: #7a8a9a;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .dark-mode .article-read-time {
    color: #6a7a8a;
  }

  /* 标题 */
  .article-title {
    font-size: 28px;
    font-weight: 700;
    color: #1a2a3a;
    margin: 0 0 12px;
    line-height: 1.35;
    letter-spacing: 0.01em;
  }

  .dark-mode .article-title {
    color: #e8f0f8;
  }

  /* 描述 / 摘要 */
  .article-excerpt {
    font-size: 15px;
    color: #5a6a7a;
    line-height: 1.7;
    margin: 0 0 16px;
  }

  .dark-mode .article-excerpt {
    color: #8a9aaa;
  }

  /* ── Markdown 正文排版 ── */
  .markdown-content {
    font-size: 16px;
    line-height: 1.85;
    letter-spacing: 0.02em;
    color: #2c3e50;
    word-break: break-word;
  }

  .dark-mode .markdown-content {
    color: #d0d8e0;
  }

  /* ── 标题 ── */
  .markdown-content :deep(h1) {
    font-size: 28px;
    font-weight: 700;
    margin: 40px 0 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid rgba(58, 90, 74, 0.2);
    line-height: 1.4;
    letter-spacing: 0.03em;
  }

  .markdown-content :deep(h2) {
    font-size: 23px;
    font-weight: 700;
    margin: 36px 0 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(58, 90, 74, 0.12);
    line-height: 1.4;
    letter-spacing: 0.02em;
  }

  .markdown-content :deep(h3) {
    font-size: 19px;
    font-weight: 600;
    margin: 28px 0 12px;
    line-height: 1.5;
  }

  .markdown-content :deep(h4) {
    font-size: 17px;
    font-weight: 600;
    margin: 24px 0 10px;
    line-height: 1.5;
  }

  .markdown-content :deep(h5),
  .markdown-content :deep(h6) {
    font-size: 15px;
    font-weight: 600;
    margin: 20px 0 8px;
    line-height: 1.5;
    color: #5a6a7a;
  }

  .dark-mode .markdown-content :deep(h5),
  .dark-mode .markdown-content :deep(h6) {
    color: #8a9aaa;
  }

  /* ── 段落 ── */
  .markdown-content :deep(p) {
    margin: 0 0 18px;
    line-height: 1.85;
  }

  /* ── 链接 ── */
  .markdown-content :deep(a) {
    color: #3a7a5a;
    text-decoration: none;
    border-bottom: 1px solid rgba(58, 122, 90, 0.3);
    transition: all 0.2s ease;
  }

  .markdown-content :deep(a:hover) {
    color: #2a5a3a;
    border-bottom-color: #2a5a3a;
  }

  .dark-mode .markdown-content :deep(a) {
    color: #6ac48a;
    border-bottom-color: rgba(106, 196, 138, 0.3);
  }

  .dark-mode .markdown-content :deep(a:hover) {
    color: #8ae4aa;
    border-bottom-color: #8ae4aa;
  }

  /* ── 粗体 / 斜体 ── */
  .markdown-content :deep(strong) {
    font-weight: 600;
    color: #1a2a3a;
  }

  .dark-mode .markdown-content :deep(strong) {
    color: #e8f0f8;
  }

  .markdown-content :deep(em) {
    font-style: italic;
    color: #4a5a6a;
  }

  .dark-mode .markdown-content :deep(em) {
    color: #9aaaba;
  }

  /* ── 列表 ── */
  .markdown-content :deep(ul),
  .markdown-content :deep(ol) {
    margin: 0 0 18px;
    padding-left: 28px;
    line-height: 1.85;
  }

  .markdown-content :deep(li) {
    margin-bottom: 6px;
  }

  .markdown-content :deep(li > ul),
  .markdown-content :deep(li > ol) {
    margin-top: 6px;
    margin-bottom: 0;
  }

  .markdown-content :deep(ul > li) {
    list-style-type: disc;
  }

  .markdown-content :deep(ul > li > ul > li) {
    list-style-type: circle;
  }

  .markdown-content :deep(ol > li) {
    list-style-type: decimal;
  }

  /* ── 引用块 ── */
  .markdown-content :deep(blockquote) {
    margin: 20px 0;
    padding: 14px 20px;
    border-left: 4px solid rgba(58, 90, 74, 0.5);
    background: rgba(58, 90, 74, 0.04);
    border-radius: 0 8px 8px 0;
    color: #4a5a6a;
    font-size: 15px;
    line-height: 1.75;
  }

  .markdown-content :deep(blockquote p:last-child) {
    margin-bottom: 0;
  }

  .dark-mode .markdown-content :deep(blockquote) {
    background: rgba(106, 196, 138, 0.06);
    border-left-color: rgba(106, 196, 138, 0.4);
    color: #9aaaba;
  }

  /* ── 行内代码 ── */
  .markdown-content :deep(code) {
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 0.9em;
    background: rgba(58, 90, 74, 0.08);
    color: #3a7a5a;
    padding: 2px 6px;
    border-radius: 4px;
    word-break: break-word;
  }

  .dark-mode .markdown-content :deep(code) {
    background: rgba(106, 196, 138, 0.1);
    color: #6ac48a;
  }

  /* ── 代码块 ── */
  .markdown-content :deep(pre) {
    margin: 20px 0;
    border-radius: 10px;
    overflow: hidden;
  }

  .markdown-content :deep(pre.hljs) {
    background: #1e2127;
    padding: 0;
  }

  .markdown-content :deep(pre code) {
    display: block;
    padding: 18px 22px;
    background: #1e2127;
    color: #abb2bf;
    font-size: 14px;
    line-height: 1.7;
    overflow-x: auto;
    border-radius: 0;
  }

  .markdown-content :deep(pre code::-webkit-scrollbar) {
    height: 6px;
  }

  .markdown-content :deep(pre code::-webkit-scrollbar-track) {
    background: rgba(255, 255, 255, 0.05);
  }

  .markdown-content :deep(pre code::-webkit-scrollbar-thumb) {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 3px;
  }

  /* ── 表格 ── */
  .markdown-content :deep(table) {
    width: 100%;
    margin: 20px 0;
    border-collapse: collapse;
    font-size: 15px;
  }

  .markdown-content :deep(th) {
    background: rgba(58, 90, 74, 0.08);
    font-weight: 600;
    text-align: left;
    padding: 10px 14px;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  .markdown-content :deep(td) {
    padding: 10px 14px;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  .markdown-content :deep(tr:nth-child(even)) {
    background: rgba(0, 0, 0, 0.02);
  }

  .dark-mode .markdown-content :deep(th) {
    background: rgba(106, 196, 138, 0.08);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .dark-mode .markdown-content :deep(td) {
    border-color: rgba(255, 255, 255, 0.08);
  }

  .dark-mode .markdown-content :deep(tr:nth-child(even)) {
    background: rgba(255, 255, 255, 0.02);
  }

  /* ── 分割线 ── */
  .markdown-content :deep(hr) {
    margin: 32px 0;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .dark-mode .markdown-content :deep(hr) {
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  /* ── 图片 ── */
  .markdown-content :deep(img) {
    max-width: 100%;
    border-radius: 10px;
    margin: 20px 0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  .dark-mode .markdown-content :deep(img) {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }

  /* ── 删除线 ── */
  .markdown-content :deep(del) {
    color: #999;
    text-decoration: line-through;
  }

  .loading-state {
    text-align: center;
    padding: 40px;
    color: #999;
  }

  /* ========== 赛博朋克主题 ========== */
  .articles-page.cyberpunk {
    background: #000;
  }

  .articles-page.cyberpunk .articles-background {
    display: none;
  }

  .articles-page.cyberpunk .articles-container {
    background: transparent;
  }

  .articles-page.cyberpunk .articles-header {
    border-bottom-color: var(--color-border);
    background: rgba(0, 0, 0, 0.8);
  }

  .articles-page.cyberpunk .category-tab {
    background: var(--cyber-bg-card);
    border: 1px solid var(--color-border);
    color: rgba(255, 255, 255, 0.55);
    font-family: var(--cyber-font-mono);
    border-radius: 0;
  }

  .articles-page.cyberpunk .category-tab:hover {
    background: rgba(0, 240, 255, 0.06);
    color: var(--cyber-neon-cyan);
    border-color: var(--cyber-neon-cyan);
    text-shadow: var(--cyber-glow-cyan-subtle);
  }

  .articles-page.cyberpunk .category-tab.active {
    background: var(--cyber-neon-pink);
    color: #000;
    border-color: var(--cyber-neon-pink);
    box-shadow: 0 0 12px rgba(255, 46, 147, 0.5);
  }

  .articles-page.cyberpunk .articles-sidebar {
    background: var(--color-bg-surface);
    border-right: 1px solid var(--color-border);
  }

  .articles-page.cyberpunk .sidebar-header {
    border-bottom-color: var(--color-border);
  }

  .articles-page.cyberpunk .sidebar-title {
    color: var(--cyber-neon-cyan);
    font-family: var(--cyber-font-mono);
    text-shadow: var(--cyber-glow-cyan-subtle);
  }

  .articles-page.cyberpunk .sidebar-count {
    color: rgba(255, 255, 255, 0.45);
    font-family: var(--cyber-font-mono);
  }

  .articles-page.cyberpunk .article-content-area {
    background: var(--color-bg-base);
  }

  .articles-page.cyberpunk .article-header {
    border-bottom-color: var(--color-border);
  }

  .articles-page.cyberpunk .article-title {
    color: var(--cyber-neon-cyan);
    text-shadow: var(--cyber-glow-cyan-subtle);
  }

  .articles-page.cyberpunk .article-tag {
    background: rgba(0, 240, 255, 0.1);
    color: var(--cyber-neon-cyan);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: 0;
  }

  .articles-page.cyberpunk .article-date,
  .articles-page.cyberpunk .article-read-time {
    color: rgba(255, 255, 255, 0.45);
    font-family: var(--cyber-font-mono);
  }

  .articles-page.cyberpunk .empty-state {
    color: rgba(255, 255, 255, 0.45);
    font-family: var(--cyber-font-mono);
  }

  /* markdown 内容区域 */
  .articles-page.cyberpunk .markdown-content {
    color: rgba(255, 255, 255, 0.85);
  }

  .articles-page.cyberpunk .markdown-content :deep(h1),
  .articles-page.cyberpunk .markdown-content :deep(h2),
  .articles-page.cyberpunk .markdown-content :deep(h3) {
    color: var(--cyber-neon-cyan);
    text-shadow: var(--cyber-glow-cyan-subtle);
  }

  .articles-page.cyberpunk .markdown-content :deep(a) {
    color: var(--cyber-neon-pink);
  }

  .articles-page.cyberpunk .markdown-content :deep(a:hover) {
    text-shadow: var(--cyber-glow-pink-subtle);
  }

  .articles-page.cyberpunk .markdown-content :deep(code) {
    background: rgba(0, 240, 255, 0.08);
    color: var(--cyber-neon-cyan);
    border: 1px solid rgba(0, 240, 255, 0.15);
  }

  .articles-page.cyberpunk .markdown-content :deep(blockquote) {
    border-left-color: var(--cyber-neon-pink);
    color: rgba(255, 255, 255, 0.65);
  }

  .articles-page.cyberpunk .markdown-content :deep(pre) {
    background: var(--cyber-bg-card);
    border: 1px solid var(--color-border);
  }

  .articles-page.cyberpunk .category-count {
    opacity: 0.7;
  }
</style>
