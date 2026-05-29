<script setup lang="ts">
import { Eye, Heart, MessageCircle, Clock } from 'lucide-vue-next'
import { ref } from 'vue'

defineProps<{
  article: {
    id: number
    title: string
    excerpt: string
    category: string
    readTime: string
    views: number
    likes: number
    comments: number
    date: string
    cover: string
  }
  isDark?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()

const imageLoaded = ref(true)

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.parentElement?.classList.add('no-cover')
  imageLoaded.value = false
}
</script>

<template>
  <div class="blog-card" :class="{ 'dark': isDark }" @click="$emit('click')">
    <div class="card-cover" :class="{ 'no-cover': !imageLoaded }">
      <img 
        v-show="imageLoaded"
        :src="article.cover" 
        :alt="article.title"
        @error="handleImageError"
      />
      <div class="category-tag">{{ article.category }}</div>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ article.title }}</h3>
      <p class="card-excerpt">{{ article.excerpt }}</p>
      <div class="card-meta">
        <span class="meta-item">
          <Clock :size="14" />
          {{ article.readTime }}
        </span>
        <span class="meta-item">
          <Eye :size="14" />
          {{ article.views }}
        </span>
        <span class="meta-item">
          <MessageCircle :size="14" />
          {{ article.comments }}
        </span>
        <span class="meta-item">
          <Heart :size="14" />
          {{ article.likes }}
        </span>
      </div>
      <div class="card-date">{{ article.date }}</div>
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  height: 240px;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-cover {
  position: relative;
  height: 100px;
  overflow: hidden;
  flex-shrink: 0;
}

.card-cover.no-cover {
  height: 0;
  min-height: 0;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .card-cover img {
  transform: scale(1.08);
}

.category-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 3px 10px;
  background: rgba(58, 90, 74, 0.9);
  backdrop-filter: blur(4px);
  border-radius: 16px;
  font-size: 11px;
  font-weight: 500;
  color: white;
}

.card-content {
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: #2a3a4a;
  margin: 0 0 6px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-excerpt {
  font-size: 12px;
  color: #5a6a7a;
  margin: 0 0 10px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-shrink: 0;
}

.card-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 6px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  color: #7a8a9a;
}

.card-date {
  font-size: 10px;
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
  color: #C0D0E0;
}

.blog-card.dark .card-excerpt {
  color: #8a9aab;
}

.blog-card.dark .meta-item {
  color: #6a7a8a;
}

.blog-card.dark .card-date {
  color: #5a6a7a;
}

.blog-card.dark .category-tag {
  background: rgba(80, 120, 100, 0.9);
}
</style>