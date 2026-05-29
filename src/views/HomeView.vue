<script setup>
import StarryBackground from '../components/background/StarryBackground.vue'
import SkyBackground from '../components/background/SkyBackground.vue'
import FieldBackground from '../components/background/FieldBackground.vue'
import WaterBackground from '../components/background/WaterBackground.vue'
import RelaxSection from '../components/relax/RelaxSection.vue'
import BlogCard from '../components/blog/BlogCard.vue'
import BlogPagination from '../components/blog/BlogPagination.vue'
import { articles, categories } from '../data/articles'
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useHomeSection } from '../composables/useHomeSection'
import { useTheme } from '../composables/useTheme'

const { setCurrentSection, setIsOnHome } = useHomeSection()
const router = useRouter()
const { isDark, toggleTheme } = useTheme()

const handleToggleTheme = () => {
  toggleTheme()
}

const linksData = [
  {
    name: 'Leaflet',
    desc: '轻量级开源交互式地图 JavaScript 库，专注于移动设备友好的交互式地图开发，拥有丰富的插件生态和简洁的 API 设计',
    url: 'https://leafletjs.cn/'
  },
  {
    name: 'OpenLayers',
    desc: '高性能开源地图渲染与交互框架，支持多种地图源和投影方式，适用于企业级 GIS 应用与复杂地理数据可视化',
    url: 'https://openlayers.org/'
  },
  {
    name: 'Mapbox',
    desc: '全球领先的地图与位置数据平台，提供自定义地图样式、矢量瓦片和导航 SDK，广泛应用于出行和物流领域',
    url: 'https://www.mapbox.com/'
  },
  {
    name: '天地图',
    desc: '国家地理信息公共服务平台，由国家测绘地理信息局主导建设，提供权威的地理信息数据服务和在线地图 API',
    url: 'https://www.tianditu.gov.cn/'
  },
  {
    name: 'Cesium',
    desc: '世界级三维地球与地理空间可视化引擎，支持全球高精度地形和影像加载，适用于数字孪生、智慧城市等场景',
    url: 'https://cesium.com/'
  },
  {
    name: 'ECharts',
    desc: 'Apache 基金会开源可视化图表库，提供丰富的图表类型和交互能力，支持大数据量渲染和自定义主题配置',
    url: 'https://echarts.apache.org/zh/index.html'
  },
  {
    name: 'Unreal Engine',
    desc: '虚幻引擎是 Epic Games 开发的实时 3D 创作平台，可用于游戏开发、影视制作、建筑可视化及仿真模拟',
    url: 'https://www.unrealengine.com/'
  }
]

const sectionHeight = ref(0)
const scrollContainer = ref(null)
const isLoaded = ref(false)
const currentSection = ref(0)
const animatedElements = ref([])
const animationObserver = ref(null)
let isScrolling = false
let scrollRAF = null

const activeCategory = ref('全部')
const currentPage = ref(1)
const pageSize = 6

const filteredArticles = computed(() => {
  if (activeCategory.value === '全部') {
    return articles
  }
  return articles.filter(a => a.category === activeCategory.value)
})

const totalPages = computed(() => {
  return Math.ceil(filteredArticles.value.length / pageSize)
})

const displayedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredArticles.value.slice(start, start + pageSize)
})

const scrollToSection = (index) => {
  if (scrollContainer.value && !isScrolling) {
    isScrolling = true
    currentSection.value = index
    scrollContainer.value.scrollTo({
      top: index * sectionHeight.value,
      behavior: 'smooth'
    })
    setTimeout(() => {
      isScrolling = false
    }, 600)
  }
}

const handleArticleClick = (article) => {
  router.push('/articles')
}

const handleWheel = (e) => {
  if (!scrollContainer.value || isScrolling) return
  
  let target = e.target
  let shouldPreventPageScroll = false
  
  while (target) {
    if (target.classList && (target.classList.contains('playlist') || target.classList.contains('history-list'))) {
      const scrollTop = target.scrollTop
      const scrollHeight = target.scrollHeight
      const clientHeight = target.clientHeight
      
      if (e.deltaY < 0 && scrollTop > 0) {
        shouldPreventPageScroll = true
      }
      if (e.deltaY > 0 && scrollTop < scrollHeight - clientHeight - 10) {
        shouldPreventPageScroll = true
      }
      break
    }
    target = target.parentNode
  }
  
  if (shouldPreventPageScroll) {
    return
  }
  
  e.preventDefault()
  const current = Math.floor((scrollContainer.value.scrollTop + sectionHeight.value / 2) / sectionHeight.value)
  if (e.deltaY > 0 && current < 3) {
    scrollToSection(current + 1)
  } else if (e.deltaY < 0 && current > 0) {
    scrollToSection(current - 1)
  }
}

const updateSectionHeight = () => {
  sectionHeight.value = window.innerHeight
}

const handleScroll = () => {
  if (scrollRAF) return
  scrollRAF = requestAnimationFrame(() => {
    scrollRAF = null
    if (scrollContainer.value) {
      const section = Math.floor((scrollContainer.value.scrollTop + sectionHeight.value / 2) / sectionHeight.value)
      if (section !== currentSection.value) {
        currentSection.value = section
        setCurrentSection(section)
      }
    }
  })
}

const initScrollAnimation = () => {
  if (animationObserver.value) {
    animationObserver.value.disconnect()
  }
  
  animationObserver.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
        } else {
          entry.target.classList.remove('animate')
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    }
  )

  document.querySelectorAll('.scroll-animate').forEach((el) => {
    if (!animatedElements.value.includes(el)) {
      animatedElements.value.push(el)
      animationObserver.value.observe(el)
    }
  })
}

onMounted(() => {
  setCurrentSection(0)
  setIsOnHome(true)
  updateSectionHeight()
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
  nextTick(() => {
    const mainContent = document.querySelector('.main-content')
    if (mainContent) {
      scrollContainer.value = mainContent
      mainContent.addEventListener('wheel', handleWheel, { passive: false })
      mainContent.addEventListener('scroll', handleScroll, { passive: true })
    }
    setTimeout(() => initScrollAnimation(), 300)
  })
  window.addEventListener('resize', updateSectionHeight)
})

onUnmounted(() => {
  setIsOnHome(false)
  if (scrollRAF) {
    cancelAnimationFrame(scrollRAF)
  }
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('wheel', handleWheel)
    scrollContainer.value.removeEventListener('scroll', handleScroll)
  }
  if (animationObserver.value) {
    animationObserver.value.disconnect()
  }
  window.removeEventListener('resize', updateSectionHeight)
})
</script>

<template>
  <div class="home-wrapper" :class="{ loaded: isLoaded }">
    <section class="hero-section" :style="{ height: sectionHeight + 'px' }">
      <StarryBackground />
      <div class="gradient-overlay"></div>
      <div class="content">
        <div class="text-content">
          <h1 class="name scroll-animate fade-up delay-1">揽星河 | 研习站</h1>
          <p class="subtitle scroll-animate fade-up delay-4">天地一指也 · 万物一马也</p>
        </div>
      </div>
      <div class="scroll-indicator fade-in-delay" @click="scrollToSection(1)">
        <span class="scroll-text">探索</span>
        <div class="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
    
    <section class="about-section" :style="{ height: sectionHeight + 'px' }" :class="{ 'dark': isDark }">
      <SkyBackground :visible="currentSection >= 1" :is-dark="isDark" />
      <div class="blog-section">
        <div class="blog-header">
          <h2 class="blog-title scroll-animate fade-up">文章</h2>
          <p class="blog-subtitle scroll-animate fade-up delay-1">记录技术与生活</p>
          
          <div class="category-tabs scroll-animate fade-up delay-2">
            <button
              v-for="cat in categories"
              :key="cat.name"
              class="category-tab"
              :class="{ active: activeCategory === cat.name }"
              @click="activeCategory = cat.name; currentPage = 1"
            >
              {{ cat.name }}
              <span class="category-count">{{ cat.count }}</span>
            </button>
          </div>
        </div>
        
        <div class="blog-grid">
          <BlogCard
            v-for="(article, index) in displayedArticles"
            :key="article.id"
            :article="article"
            :is-dark="isDark"
            :style="{ animationDelay: (index % 3) * 0.1 + 's' }"
            @click="handleArticleClick(article)"
          />
        </div>
        
        <div class="pagination-wrapper">
          <BlogPagination
            v-if="totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            @change="currentPage = $event"
          />
        </div>
      </div>
      <div class="scroll-indicator bottom fade-in-delay" @click="scrollToSection(2)">
        <span class="scroll-text">技术生态</span>
        <div class="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
    
    <section class="links-section" :style="{ height: sectionHeight + 'px' }" :class="{ 'dark': isDark }">
      <FieldBackground :visible="currentSection >= 2" :scroll-progress="sectionHeight > 0 ? ((scrollContainer?.scrollTop || 0) / sectionHeight) : 0" :is-dark="isDark" />
      <div class="links-content">
        <h2 class="scroll-animate fade-up">技术生态</h2>
        <p class="links-subtitle scroll-animate fade-up delay-1">常用工具与平台</p>
        <div class="links-grid">
          <a
            v-for="(item, index) in linksData"
            :key="item.name"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="link-card scroll-animate fade-up"
            :class="'delay-' + (index % 4 + 1)"
          >
            <div class="link-info">
              <h3>{{ item.name }}</h3>
              <p>{{ item.desc }}</p>
            </div>
            <span class="link-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
      </div>
      <div class="scroll-indicator bottom fade-in-delay" @click="scrollToSection(3)">
        <span class="scroll-text">向下潜水</span>
        <div class="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
    
    <section class="water-section" :style="{ height: sectionHeight + 'px' }" :class="{ 'dark': isDark }">
      <WaterBackground :visible="currentSection >= 3" :scroll-progress="sectionHeight > 0 ? ((scrollContainer?.scrollTop || 0) / sectionHeight) : 0" :is-dark="isDark" />
      <RelaxSection :is-dark="isDark" />
    </section>
  </div>
</template>

<style scoped>
.home-wrapper {
  width: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.home-wrapper.loaded {
  opacity: 1;
  transform: translateY(0);
}

.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0f1628 100%);
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
  pointer-events: none;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.text-content {
  text-align: center;
  color: #ffffff;
}

.name {
  font-size: 4.5rem;
  font-weight: 300;
  letter-spacing: 0.5rem;
  margin: 0 0 1.5rem 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
}

.subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.3rem;
  margin: 0;
  opacity: 0.8;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #ffffff;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.scroll-indicator:hover {
  opacity: 1;
}

.fade-in-delay {
  opacity: 0;
  animation: fadeInIndicator 1s ease-out forwards;
  animation-delay: 1.5s;
}

@keyframes fadeInIndicator {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 0.6; transform: translateY(0); }
}

.scroll-text {
  font-size: 0.875rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.scroll-arrow {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(10px);
  }
  60% {
    transform: translateY(5px);
  }
}

.about-section {
  position: relative;
  width: 100%;
  background: linear-gradient(180deg, #E8F4F8 0%, #F0F7F9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: background 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.blog-section {
  max-width: 1200px;
  padding: 50px 2rem;
  width: 100%;
  position: relative;
  z-index: 10;
  box-sizing: border-box;
}

.blog-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.blog-title {
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  color: #1a2a3a;
  letter-spacing: 0.2rem;
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8);
}

.blog-subtitle {
  font-size: 1rem;
  color: #4a5a6a;
  line-height: 1.8;
  margin: 0;
}

.category-tabs {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 25px;
  font-size: 0.875rem;
  color: #4a5a6a;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-tab:hover {
  background: rgba(255, 255, 255, 0.9);
  color: #1a2a3a;
}

.category-tab.active {
  background: rgba(58, 90, 74, 0.8);
  color: white;
}

.category-count {
  font-size: 0.75rem;
  opacity: 0.8;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1.25rem;
  min-height: 530px;
}

.pagination-wrapper {
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-indicator.bottom {
  color: #4a5a6a;
}

.scroll-indicator.bottom:hover {
  color: #1a2a3a;
}

.links-section {
  position: relative;
  width: 100%;
  background: linear-gradient(180deg, #F5FAF8 0%, #E8F4E8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: background 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.links-content {
  max-width: 1100px;
  padding: 3rem;
  width: 100%;
  position: relative;
  z-index: 10;
}

.links-content h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 0.75rem;
  color: #2a4a3a;
  letter-spacing: 0.2rem;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.links-subtitle {
  text-align: center;
  font-size: 1rem;
  color: #5a7a6a;
  margin-bottom: 3rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1.75rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.link-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(180, 220, 160, 0.1) 0%, rgba(140, 200, 150, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.link-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(100, 160, 120, 0.15);
  background: rgba(255, 255, 255, 0.8);
}

.link-card:hover::before {
  opacity: 1;
}

.link-info {
  flex: 1;
  min-width: 0;
}

.link-info h3 {
  font-size: 1.0625rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2a4a3a;
  letter-spacing: 0.05rem;
}

.link-info p {
  font-size: 0.8125rem;
  color: #5a7a6a;
  line-height: 1.7;
  margin: 0;
}

.link-arrow {
  color: #7a9a8a;
  flex-shrink: 0;
  opacity: 0;
  transform: translate(-4px, 4px);
  transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s;
}

.link-card:hover .link-arrow {
  opacity: 1;
  transform: translate(0, 0);
  color: #3a5a4a;
}

.water-section {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.water-content {
  max-width: 800px;
  padding: 3rem;
  width: 100%;
  position: relative;
  z-index: 10;
  text-align: center;
}

.water-content h2 {
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  color: #E0F8FF;
  letter-spacing: 0.3rem;
  text-shadow: 0 2px 10px rgba(0, 50, 60, 0.5);
}

.water-subtitle {
  font-size: 1.25rem;
  color: #B0E0E8;
  margin-bottom: 2.5rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
}

.water-description {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.water-description p {
  font-size: 1rem;
  color: #90C8D0;
  line-height: 1.8;
  font-weight: 300;
  letter-spacing: 0.05rem;
  max-width: 600px;
}

.scroll-animate {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
}

.scroll-animate.fade-up {
  transform: translateY(40px);
}

.scroll-animate.fade-left {
  transform: translateX(-40px);
}

.scroll-animate.fade-right {
  transform: translateX(40px);
}

.scroll-animate.scale-up {
  transform: scale(0.85);
}

.scroll-animate.animate {
  opacity: 1;
  transform: none;
}

.delay-1 {
  transition-delay: 0.08s;
}

.delay-2 {
  transition-delay: 0.16s;
}

.delay-3 {
  transition-delay: 0.24s;
}

.delay-4 {
  transition-delay: 0.5s;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .scroll-arrow {
    animation: none;
  }
}

/* 暗色模式样式 */
.about-section.dark {
  background: linear-gradient(180deg, #0a1520 0%, #1a2530 100%);
  transition: background 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-section.dark .blog-title {
  color: #E0E8F0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

.about-section.dark .blog-subtitle {
  color: #8a9aab;
}

.about-section.dark .category-tab {
  background: rgba(30, 40, 50, 0.6);
  color: #8a9aab;
  border: 1px solid rgba(100, 120, 140, 0.3);
}

.about-section.dark .category-tab:hover {
  background: rgba(50, 60, 70, 0.8);
  color: #E0E8F0;
}

.about-section.dark .category-tab.active {
  background: rgba(80, 120, 100, 0.8);
  color: white;
}

.about-section.dark .scroll-indicator.bottom {
  color: #8a9aab;
}

.about-section.dark .scroll-indicator.bottom:hover {
  color: #E0E8F0;
}

/* 技术生态区暗色模式 */
.links-section.dark {
  background: linear-gradient(180deg, #0a1a15 0%, #152520 100%);
  transition: background 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.links-section.dark .links-content h2 {
  color: #C0E0D0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

.links-section.dark .links-subtitle {
  color: #6a8a7a;
}

.links-section.dark .link-card {
  background: rgba(30, 50, 40, 0.6);
  border: 1px solid rgba(80, 120, 100, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.links-section.dark .link-card:hover {
  background: rgba(50, 70, 60, 0.8);
  box-shadow: 0 8px 30px rgba(80, 140, 120, 0.2);
}

.links-section.dark .link-card::before {
  background: linear-gradient(135deg, rgba(80, 140, 120, 0.1) 0%, rgba(60, 120, 100, 0.05) 100%);
}

.links-section.dark .link-info h3 {
  color: #C0E0D0;
}

.links-section.dark .link-info p {
  color: #6a8a7a;
}

.links-section.dark .link-arrow {
  color: #6a8a7a;
}

.links-section.dark .link-card:hover .link-arrow {
  color: #A0C0B0;
}

/* 水下区暗色模式 */
.water-section.dark .water-content h2 {
  color: #80A0B0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
}

.water-section.dark .water-subtitle {
  color: #507080;
}

.water-section.dark .water-description p {
  color: #406070;
}

.hero-section,
.about-section,
.links-section,
.water-section {
  will-change: transform;
  -webkit-font-smoothing: antialiased;
}
</style>