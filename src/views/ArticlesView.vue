<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useSettings } from '../composables/useSettings';
  import { articles, categories } from '../data/articles';
  import ArticleListItem from '../components/blog/ArticleListItem.vue';

  const { settings } = useSettings();

  const activeCategory = ref('全部');
  const selectedArticle = ref(null);
  const articleContent = ref('');

  const sortedArticles = computed(() => {
    const filtered =
      activeCategory.value === '全部'
        ? articles
        : articles.filter((a) => a.category === activeCategory.value);
    return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  const selectArticle = async (article) => {
    selectedArticle.value = article;
    if (article.contentPath) {
      try {
        const response = await fetch(`/data/content/${article.contentPath}`);
        articleContent.value = await response.text();
      } catch (error) {
        articleContent.value = '文章内容加载失败';
      }
    } else {
      articleContent.value = '暂无内容';
    }
  };

  onMounted(() => {
    if (sortedArticles.value.length > 0) {
      selectArticle(sortedArticles.value[0]);
    }
  });

  const handleCategoryChange = (category) => {
    activeCategory.value = category;
    if (sortedArticles.value.length > 0) {
      selectArticle(sortedArticles.value[0]);
    }
  };
</script>

<template>
  <div class="articles-page" :class="{ 'dark-mode': settings.isDark }">
    <div class="articles-background">
      <div class="sky-gradient"></div>
      <div class="clouds">
        <div class="cloud cloud-1"></div>
        <div class="cloud cloud-2"></div>
        <div class="cloud cloud-3"></div>
      </div>
      <div class="stars" v-if="settings.isDark">
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
            v-for="cat in categories"
            :key="cat.name"
            class="category-tab"
            :class="{ active: activeCategory === cat.name }"
            @click="handleCategoryChange(cat.name)"
          >
            {{ cat.name }}
            <span class="category-count">{{ cat.count }}</span>
          </button>
        </div>
      </header>

      <main class="articles-main">
        <aside class="articles-sidebar">
          <div class="sidebar-header">
            <span class="sidebar-title">文章列表</span>
            <span class="sidebar-count">{{ sortedArticles.length }} 篇</span>
          </div>

          <div class="articles-list custom-scrollbar">
            <ArticleListItem
              v-for="article in sortedArticles"
              :key="article.id"
              :article="article"
              :is-dark="settings.isDark"
              :selected="selectedArticle?.id === article.id"
              @click="selectArticle(article)"
            />
          </div>
        </aside>

        <article class="article-content-area">
          <div v-if="selectedArticle" class="article-detail">
            <header class="article-header">
              <div class="article-meta">
                <span class="article-category">{{
                  selectedArticle.category
                }}</span>
                <span class="article-date">{{ selectedArticle.date }}</span>
              </div>
              <h2 class="article-title">{{ selectedArticle.title }}</h2>
              <p class="article-excerpt">{{ selectedArticle.excerpt }}</p>
              <div class="article-tags">
                <span
                  v-for="tag in selectedArticle.tags"
                  :key="tag"
                  class="article-tag"
                >
                  {{ tag }}
                </span>
              </div>
              <div class="article-stats">
                <span class="stat-item">
                  <span class="stat-icon">📖</span>
                  {{ selectedArticle.readTime }}
                </span>
                <span class="stat-item">
                  <span class="stat-icon">👁️</span>
                  {{ selectedArticle.views }} 阅读
                </span>
                <span class="stat-item">
                  <span class="stat-icon">❤️</span>
                  {{ selectedArticle.likes }}
                </span>
                <span class="stat-item">
                  <span class="stat-icon">💬</span>
                  {{ selectedArticle.comments }}
                </span>
              </div>
            </header>

            <div class="article-cover">
              <img :src="selectedArticle.cover" :alt="selectedArticle.title" />
            </div>

            <div class="article-body">
              <div class="markdown-content" v-html="articleContent"></div>
            </div>
          </div>

          <div v-else class="empty-state">
            <div class="empty-icon">📝</div>
            <p>请选择一篇文章查看内容</p>
          </div>
        </article>
      </main>
    </div>
  </div>
</template>

<style scoped>
  .articles-page {
    min-height: 100vh;
    position: relative;
    transition: all 0.5s ease;
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
    margin: 0 auto;
    padding: 80px 20px 40px;
  }

  .articles-header {
    text-align: center;
    margin-bottom: 30px;
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
  }

  .articles-sidebar {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
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
    max-height: calc(100vh - 250px);
    overflow-y: auto;
    padding-right: 5px;
  }

  .articles-list::-webkit-scrollbar {
    width: 6px;
  }

  .articles-list::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }

  .dark-mode .articles-list::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  .articles-list::-webkit-scrollbar-thumb {
    background: rgba(58, 90, 74, 0.3);
    border-radius: 3px;
  }

  .dark-mode .articles-list::-webkit-scrollbar-thumb {
    background: rgba(100, 140, 120, 0.3);
  }

  .article-content-area {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    padding: 35px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    min-height: 500px;
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

  .article-header {
    margin-bottom: 25px;
  }

  .article-meta {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
  }

  .article-category {
    font-size: 12px;
    padding: 4px 12px;
    background: rgba(58, 90, 74, 0.15);
    color: #3a5a4a;
    border-radius: 15px;
    font-weight: 500;
  }

  .dark-mode .article-category {
    background: rgba(100, 160, 140, 0.2);
    color: #a8c8b8;
  }

  .article-date {
    font-size: 12px;
    color: #7a8a9a;
  }

  .dark-mode .article-date {
    color: #9aabbb;
  }

  .article-title {
    font-size: 1.8rem;
    font-weight: 600;
    color: #1a2a3a;
    margin: 0 0 15px 0;
    line-height: 1.4;
    transition: color 0.3s ease;
  }

  .dark-mode .article-title {
    color: #e8f4f8;
  }

  .article-excerpt {
    font-size: 1rem;
    color: #4a5a6a;
    line-height: 1.7;
    margin: 0 0 15px 0;
    transition: color 0.3s ease;
  }

  .dark-mode .article-excerpt {
    color: #aabbcc;
  }

  .article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 15px;
  }

  .article-tag {
    font-size: 12px;
    padding: 4px 10px;
    background: rgba(135, 206, 235, 0.2);
    color: #2a5a6a;
    border-radius: 8px;
  }

  .dark-mode .article-tag {
    background: rgba(100, 160, 180, 0.2);
    color: #a8d8e8;
  }

  .article-stats {
    display: flex;
    gap: 20px;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: #6a7a8a;
  }

  .dark-mode .stat-item {
    color: #8a9aaa;
  }

  .stat-icon {
    font-size: 14px;
  }

  .article-cover {
    margin-bottom: 25px;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.1);
  }

  .dark-mode .article-cover {
    background: rgba(0, 0, 0, 0.3);
  }

  .article-cover img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    background: rgba(0, 0, 0, 0.1);
  }

  .dark-mode .article-cover img {
    background: rgba(0, 0, 0, 0.3);
  }

  .article-body {
    color: #3a4a5a;
    line-height: 1.8;
    transition: color 0.3s ease;
  }

  .dark-mode .article-body {
    color: #c8d8e8;
  }

  .markdown-content h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 25px 0 15px 0;
    color: #1a2a3a;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .dark-mode .markdown-content h1 {
    color: #e8f4f8;
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .markdown-content h2 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 20px 0 12px 0;
    color: #2a3a4a;
  }

  .dark-mode .markdown-content h2 {
    color: #d8e8f8;
  }

  .markdown-content h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 18px 0 10px 0;
    color: #3a4a5a;
  }

  .dark-mode .markdown-content h3 {
    color: #c8d8e8;
  }

  .markdown-content p {
    margin: 12px 0;
  }

  .markdown-content code {
    background: rgba(0, 0, 0, 0.08);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
    font-family: 'Fira Code', monospace;
  }

  .dark-mode .markdown-content code {
    background: rgba(255, 255, 255, 0.08);
  }

  .markdown-content pre {
    background: rgba(0, 0, 0, 0.05);
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 15px 0;
  }

  .dark-mode .markdown-content pre {
    background: rgba(0, 0, 0, 0.3);
  }

  .markdown-content pre code {
    background: none;
    padding: 0;
  }

  .markdown-content blockquote {
    border-left: 3px solid #3a5a4a;
    padding-left: 15px;
    margin: 15px 0;
    color: #5a6a7a;
    font-style: italic;
  }

  .dark-mode .markdown-content blockquote {
    border-left-color: #6a9a8a;
    color: #9aabbb;
  }

  .markdown-content ul,
  .markdown-content ol {
    padding-left: 25px;
    margin: 12px 0;
  }

  .markdown-content li {
    margin: 6px 0;
  }

  .markdown-content a {
    color: #3a5a4a;
    text-decoration: none;
    border-bottom: 1px solid rgba(58, 90, 74, 0.3);
  }

  .dark-mode .markdown-content a {
    color: #8ab8a8;
    border-bottom-color: rgba(138, 184, 168, 0.3);
  }

  .markdown-content a:hover {
    border-bottom-color: #3a5a4a;
  }

  .dark-mode .markdown-content a:hover {
    border-bottom-color: #8ab8a8;
  }

  .markdown-content hr {
    border: none;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    margin: 25px 0;
  }

  .dark-mode .markdown-content hr {
    background: rgba(255, 255, 255, 0.1);
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400px;
    color: #7a8a9a;
  }

  .dark-mode .empty-state {
    color: #8a9aaa;
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 15px;
  }

  @media (max-width: 1200px) {
    .articles-main {
      grid-template-columns: 1fr;
    }

    .articles-list {
      max-height: 400px;
    }
  }
</style>
