<script setup>
import DandelionBackground from '../components/DandelionBackground.vue'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useHomeSection } from '../composables/useHomeSection'

const { setCurrentSection, setIsOnHome } = useHomeSection()

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

const scrollToSection = (index) => {
  if (scrollContainer.value) {
    currentSection.value = index
    scrollContainer.value.scrollTo({
      top: index * sectionHeight.value,
      behavior: 'smooth'
    })
  }
}

const handleWheel = (e) => {
  if (!scrollContainer.value) return
  const current = Math.floor(scrollContainer.value.scrollTop / sectionHeight.value)
  if (e.deltaY > 0 && current < 2) {
    e.preventDefault()
    scrollToSection(current + 1)
  } else if (e.deltaY < 0 && current > 0) {
    e.preventDefault()
    scrollToSection(current - 1)
  }
}

const updateSectionHeight = () => {
  sectionHeight.value = window.innerHeight
}

const handleScroll = () => {
  if (scrollContainer.value) {
    const section = Math.floor(scrollContainer.value.scrollTop / sectionHeight.value)
    setCurrentSection(section)
  }
}

const initScrollAnimation = () => {
  animationObserver.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
          animationObserver.value.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  const elements = document.querySelectorAll('.scroll-animate')
  elements.forEach((el) => {
    animatedElements.value.push(el)
    animationObserver.value.observe(el)
  })
}

onMounted(() => {
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
      mainContent.addEventListener('scroll', handleScroll)
    }
    setTimeout(() => initScrollAnimation(), 500)
  })
  window.addEventListener('resize', updateSectionHeight)
})

onUnmounted(() => {
  setIsOnHome(false)
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
      <DandelionBackground />
      <div class="gradient-overlay"></div>
      <div class="content">
        <div class="text-content">
          <h1 class="name scroll-animate fade-up delay-1">揽星河 | 知识库</h1>
          <p class="subtitle scroll-animate fade-up delay-4">天地一指也 · 万物一马也</p>
        </div>
      </div>
      <div class="scroll-indicator scroll-animate fade-up delay-3" @click="scrollToSection(1)">
        <span class="scroll-text">探索</span>
        <div class="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
    
    <section class="about-section" :style="{ height: sectionHeight + 'px' }">
      <div class="about-content">
        <div class="about-intro scroll-animate fade-up">
          <h2>关于我</h2>
          <p class="intro-text">专注于程序开发与WebGIS应用，喜欢探索新事物</p>
        </div>
        
        <div class="about-details">
          <div class="detail-item scroll-animate fade-left">
            <h3>教育背景</h3>
            <p>地理信息科学专业</p>
            <p class="sub-text">山东建筑大学 · 2018.09-2022.07</p>
          </div>
          
          <div class="detail-item scroll-animate fade-right">
            <h3>专业技能</h3>
            <div class="tech-stack">
              <span class="tech-tag">Vue 2/3</span>
              <span class="tech-tag">Cesium</span>
              <span class="tech-tag">OpenLayers</span>
              <span class="tech-tag">Mapbox</span>
              <span class="tech-tag">PostGIS</span>
              <span class="tech-tag">OGC</span>
              <span class="tech-tag">HTML5/CSS3/JavaScript</span>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator bottom scroll-animate fade-up delay-2" @click="scrollToSection(2)">
        <span class="scroll-text">技术生态</span>
        <div class="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
    
    <section class="links-section" :style="{ height: sectionHeight + 'px' }">
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
    </section>
  </div>
</template>

<style scoped>
/* 基础样式 */
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

/* Hero Section */
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

/* About Section */
.about-section {
  position: relative;
  width: 100%;
  background: var(--color-bg-base);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.about-content {
  max-width: 900px;
  padding: 3rem;
  width: 100%;
}

.about-intro {
  text-align: center;
  margin-bottom: 4rem;
}

.about-intro h2 {
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  color: var(--color-text-primary);
  letter-spacing: 0.2rem;
  transition: color 0.3s;
}

.intro-text {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
  transition: color 0.3s;
}

.about-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.detail-item h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
  letter-spacing: 0.1rem;
  transition: color 0.3s;
}

.detail-item p {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
  transition: color 0.3s;
}

.sub-text {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  transition: color 0.3s;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-tag {
  padding: 0.5rem 1.25rem;
  background: var(--color-bg-elevated);
  border-radius: 25px;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  transition: all 0.3s ease;
}

.tech-tag:hover {
  background: #1a1a2e;
  color: #ffffff;
}

.scroll-indicator.bottom {
  color: var(--color-text-primary);
  transition: color 0.3s;
}

/* Links Section */
.links-section {
  position: relative;
  width: 100%;
  background: var(--color-bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  overflow-y: auto;
}

.links-content {
  max-width: 1100px;
  padding: 3rem;
  width: 100%;
}

.links-content h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 0.75rem;
  color: var(--color-text-primary);
  letter-spacing: 0.2rem;
  transition: color 0.3s;
}

.links-subtitle {
  text-align: center;
  font-size: 1rem;
  color: var(--color-text-muted);
  margin-bottom: 3rem;
  transition: color 0.3s;
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
  background: var(--color-bg-surface);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  box-shadow: var(--shadow);
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
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.03) 0%, rgba(22, 33, 62, 0.03) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.link-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
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
  color: var(--color-text-primary);
  letter-spacing: 0.05rem;
  transition: color 0.3s;
}

.link-info p {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0;
  transition: color 0.3s;
}

.link-arrow {
  color: var(--color-text-muted);
  flex-shrink: 0;
  opacity: 0;
  transform: translate(-4px, 4px);
  transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s;
}

.link-card:hover .link-arrow {
  opacity: 1;
  transform: translate(0, 0);
  color: var(--color-text-primary);
}

/* 滚动触发动画 */
.scroll-animate {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
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

/* 动画延迟 */
.delay-1 {
  transition-delay: 0.1s;
}

.delay-2 {
  transition-delay: 0.2s;
}

.delay-3 {
  transition-delay: 0.3s;
}

.delay-4 {
  transition-delay: 0.6s;
}

/* 性能优化 */
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

/* 硬件加速优化 */
.hero-section,
.about-section,
.links-section {
  will-change: transform;
  -webkit-font-smoothing: antialiased;
}
</style>