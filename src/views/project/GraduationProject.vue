<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const project = {
  name: '消防栓智能管理系统',
  subtitle: '本科毕业设计项目',
  url: '#',
  description:
    '独立设计并开发了面向公众与运维人员的一体化消防栓管理平台，依托Web GIS可视化与移动端小程序能力，实现消防设施数字化台账管理、点位可视化管控、故障线上上报，夯实区域消防安全运维能力。',
  techStack: [
    'HTML5',
    'jQuery',
    'Mapbox GL JS',
    '天地图API',
    '微信小程序',
    'Spring Boot',
    'MyBatis Plus',
    'PostgreSQL',
    'PostGIS',
    'Turf.js',
  ],
  responsibilities: [
    {
      title: '项目背景与业务定位',
      content:
        '现阶段城市消防设施分布零散、线下巡检管控成本高、故障处置流程滞后，依托Web GIS可视化、移动端小程序能力，搭建一体化消防栓管理平台，打通运维人员、巡检人员业务链路，实现消防设施数字化台账管理、点位可视化管控、故障线上上报，夯实区域消防安全运维能力。',
    },
    {
      title: '分层技术架构搭建',
      content:
        '前端展示层：依托HTML5+jQuery搭建管理后台，接入Mapbox GL JS、天地图API、GeoServer服务完成二维GIS地图渲染，实现消防设施点位可视化管控<br/><br/>移动终端层：基于原生微信小程序开发巡检端，提供地理定位、轻量化扫码巡检、故障上报、点位查询移动端能力<br/><br/>业务逻辑层：基于Spring Boot搭建后端业务服务，整合MyBatis Plus完成业务CURD、业务权限逻辑封装<br/><br/>数据存储层：采用PostgreSQL搭配PostGIS拓展插件，结构化存储业务数据、空间点位数据，适配GIS空间检索业务<br/><br/>前端工具层：集成Turf.js空间算法库，完成距离测算、范围筛选、点位空间校验等前端地理计算工作',
    },
    {
      title: '核心业务功能开发',
      content:
        '1. 消防栓台账信息管理模块：多维信息检索、上下游厂商联动、可视化状态分级<br/><br/>2. 二维GIS地图可视化模块：多源底图适配、点位交互管控、周边空间检索、用户地理定位<br/><br/>3. 移动端故障巡检上报模块：二维码快捷核验、标准化故障上报、工单溯源管理<br/><br/>4. 系统用户权限管理模块：账号体系搭建、个人档案运维',
    },
    {
      title: '关键技术实现亮点',
      content:
        '空间业务能力落地：集成Turf.js空间算法，实现多边形范围点位筛选、自定义半径周边检索<br/><br/>标准化地图服务接入：合规接入天地图官方WMTS瓦片服务，优化瓦片加载逻辑<br/><br/>标准化接口开发：遵循RESTful规范设计后端接口，统一入参出参格式<br/><br/>轻量化交互开发：封装地图弹窗、实时测距、联动列表组件<br/><br/>标准前后端分离架构：前端依托Axios完成接口调用，后端专注业务逻辑与数据处理',
    },
    {
      title: '数据库架构设计',
      content:
        '基于业务分层设计四张核心业务数据表：<br/><br/>- Hydrants消防栓点位表：存储设备编号、运行状态、水压数值、安装时间等核心台账数据<br/><br/>- Faults故障工单表：关联消防栓ID，存储故障描述、上报时间、处理状态工单数据<br/><br/>- User系统用户表：存储账号密码、个人基础信息，支撑账号登录与人员管理<br/><br/>- Companies合作厂商表：留存厂商名称、地址、联系方式，绑定对应供货消防栓设备',
    },
    {
      title: '项目业务价值',
      content:
        '降本增效：数字化整合全域消防设施台账，简化人工线下巡检工作量<br/><br/>提速应急处置：线上闭环故障上报、派单、维修流程，缩短消防设施故障维修周期<br/><br/>辅助运维决策：沉淀设施分布、故障频次数据，为后续消防设施新增、点位优化提供数据参考<br/><br/>便民普惠赋能：面向公众开放就近消防栓查询能力，满足日常应急取水、消防自查便民使用需求',
    },
  ],
  github: 'https://github.com/Chen-lingxiao/GraduationProject',
  gitee: '#',
};

const images = [
  '/Preview/WxFireHydrant/WxFireHydrant1.png',
  '/Preview/WxFireHydrant/WxFireHydrant2.png',
  '/Preview/WxFireHydrant/WxFireHydrant3.png',
  '/Preview/WxFireHydrant/WxFireHydrant4.png',
  '/Preview/WxFireHydrant/WxFireHydrant5.png',
  '/Preview/WxFireHydrant/WxFireHydrant6.png',
  '/Preview/WxFireHydrant/WxFireHydrant7.png',
  '/Preview/WxFireHydrant/WxFireHydrant8.png',
];

const currentIndex = ref(0);
const isTransitioning = ref(false);
let autoPlayTimer: ReturnType<typeof setInterval> | null = null;

const totalImages = computed(() => images.length);

const prevIndex = computed(() => {
  return (currentIndex.value - 1 + totalImages.value) % totalImages.value;
});

const nextIndex = computed(() => {
  return (currentIndex.value + 1) % totalImages.value;
});

const visibleImages = computed(() => {
  return {
    prev: images[prevIndex.value],
    current: images[currentIndex.value],
    next: images[nextIndex.value],
  };
});

const goToNext = () => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
  currentIndex.value = nextIndex.value;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
};

const goToPrev = () => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
  currentIndex.value = prevIndex.value;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
};

const goToSlide = (index: number) => {
  if (isTransitioning.value || index === currentIndex.value) return;
  isTransitioning.value = true;
  currentIndex.value = index;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
};

const startAutoPlay = () => {
  autoPlayTimer = setInterval(goToNext, 5000);
};

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<template>
  <div class="project-container">
    <div class="project-card">
      <div class="card-header">
        <div class="carousel-wrapper" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
          <button class="nav-btn prev-btn" @click="goToPrev" aria-label="上一张">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          <div class="carousel-container">
            <div class="carousel-track">
              <div class="slide prev-slide" :class="{ transitioning: isTransitioning }" @click="goToPrev">
                <img :src="visibleImages.prev" :alt="'预览图 ' + prevIndex" class="slide-image" />
              </div>
              <div class="slide current-slide" :class="{ transitioning: isTransitioning }">
                <img :src="visibleImages.current" :alt="'预览图 ' + currentIndex" class="slide-image" />
                <div class="slide-overlay">
                  <span class="device-label">手机截图</span>
                </div>
              </div>
              <div class="slide next-slide" :class="{ transitioning: isTransitioning }" @click="goToNext">
                <img :src="visibleImages.next" :alt="'预览图 ' + nextIndex" class="slide-image" />
              </div>
            </div>
          </div>

          <button class="nav-btn next-btn" @click="goToNext" aria-label="下一张">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>

          <div class="carousel-indicators">
            <button v-for="(image, index) in images" :key="index" class="indicator"
              :class="{ active: index === currentIndex }" @click="goToSlide(index)"
              :aria-label="'切换到第 ' + (index + 1) + ' 张'"></button>
          </div>
        </div>
      </div>

      <div class="card-body">
        <div class="project-header">
          <div class="title-section">
            <h2 class="project-title">{{ project.name }}</h2>
            <span class="project-subtitle">{{ project.subtitle }}</span>
          </div>
          <div class="project-links">
            <a :href="project.github" target="_blank" rel="noopener noreferrer" class="link-btn github">
              <svg class="link-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
        <p class="project-desc">{{ project.description }}</p>

        <div class="tech-stack">
          <span v-for="tech in project.techStack" :key="tech" class="tech-badge">
            {{ tech }}
          </span>
        </div>

        <div class="responsibilities">
          <h3 class="section-title">核心职责与成果</h3>
          <div v-for="(item, index) in project.responsibilities" :key="index" class="responsibility-item">
            <h4 class="item-title">{{ item.title }}</h4>
            <p class="item-content" v-html="item.content"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-container {
  padding: 24px;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 60px);
  background: var(--color-bg-base);
}

.project-card {
  width: 100%;
  max-width: 1200px;
  background: var(--color-bg-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-header {
  position: relative;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 450px;
  overflow: hidden;
  background: var(--color-bg-elevated);
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 8px;
  padding: 0 40px;
}

.slide {
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.prev-slide {
  width: 15%;
  height: 55%;
  opacity: 0.4;
  transform: translateX(20%) scale(0.8);
}

.current-slide {
  width: 45%;
  height: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  z-index: 10;
}

.next-slide {
  width: 15%;
  height: 55%;
  opacity: 0.4;
  transform: translateX(-20%) scale(0.8);
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.5s ease;
  background: #1a1a1a;
}

.slide:hover .slide-image {
  transform: scale(1.02);
}

.slide-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.6);
  padding: 6px 12px;
  border-radius: 20px;
}

.device-label {
  font-size: 12px;
  color: white;
  font-weight: 500;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-primary);
  transition: all 0.3s ease;
  z-index: 20;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

.nav-btn svg {
  width: 20px;
  height: 20px;
}

.nav-btn:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-50%) scale(1.1);
}

.prev-btn {
  left: 12px;
}

.next-btn {
  right: 12px;
}

.carousel-indicators {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 20;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator:hover {
  border-color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.3);
}

.indicator.active {
  background: white;
  border-color: white;
  transform: scale(1.2);
}

.card-body {
  padding: 28px 32px;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 12px;
}

.title-section {
  flex: 1;
  min-width: 280px;
}

.project-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 6px 0;
  line-height: 1.4;
}

.project-subtitle {
  font-size: 14px;
  color: var(--color-primary);
  font-weight: 500;
}

.project-desc {
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: 20px;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.tech-badge {
  padding: 6px 14px;
  background: var(--color-primary-bg-light);
  color: var(--color-primary);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.tech-badge:hover {
  background: var(--color-primary-bg-hover);
  transform: translateY(-1px);
}

.section-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--color-border);
}

.responsibilities {
  margin-bottom: 28px;
}

.responsibility-item {
  margin-bottom: 18px;
  padding-left: 16px;
  border-left: 3px solid var(--color-primary);
  background: var(--color-bg-elevated);
  padding: 14px 18px;
  border-radius: 0 8px 8px 0;
  transition: background 0.2s ease;
}

.responsibility-item:hover {
  background: var(--color-bg-hover);
}

.responsibility-item:last-child {
  margin-bottom: 0;
}

.item-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 6px;
}

.item-content {
  font-size: 14px;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.project-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.link-btn:hover {
  transform: translateY(-2px);
}

.link-icon {
  width: 18px;
  height: 18px;
}

.link-btn.github {
  background: #24292e;
  color: #ffffff;
}

.link-btn.github:hover {
  background: #1b1f23;
  box-shadow: 0 4px 12px rgba(36, 41, 46, 0.4);
}

@media (max-width: 768px) {
  .project-container {
    padding: 16px;
  }

  .card-body {
    padding: 20px;
  }

  .carousel-wrapper {
    height: 300px;
  }

  .carousel-track {
    padding: 0 30px;
    gap: 8px;
  }

  .prev-slide,
  .next-slide {
    display: none;
  }

  .current-slide {
    width: 100%;
  }

  .nav-btn {
    width: 36px;
    height: 36px;
  }

  .nav-btn svg {
    width: 16px;
    height: 16px;
  }

  .project-title {
    font-size: 20px;
  }

  .project-links {
    flex-direction: column;
  }

  .link-btn {
    justify-content: center;
  }
}
</style>
