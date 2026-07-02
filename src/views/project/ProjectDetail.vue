<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const projectData = ref({
  id: null,
  title: '',
  route_index: '',
  description: '',
  config: {}
});
const loading = ref(true);
const notFound = ref(false);
const searchedKey = ref('');

const currentIndex = ref(0);
const isTransitioning = ref(false);
let autoPlayTimer = null;

const project = computed(() => {
  const config = projectData.value.config || {};
  return {
    name: config.name || projectData.value.title || '',
    url: config.url || '#',
    description: config.description || projectData.value.description || '',
    techStack: config.techStack || [],
    responsibilities: config.responsibilities || [],
    github: config.github || '',
    gitee: config.gitee || ''
  };
});

const images = computed(() => {
  const config = projectData.value.config || {};
  return config.images || [];
});

const totalImages = computed(() => images.value.length);

const prevIndex = computed(() => {
  return (currentIndex.value - 1 + totalImages.value) % totalImages.value;
});

const nextIndex = computed(() => {
  return (currentIndex.value + 1) % totalImages.value;
});

const visibleImages = computed(() => {
  if (images.value.length === 0) return { prev: '', current: '', next: '' };
  return {
    prev: images.value[prevIndex.value],
    current: images.value[currentIndex.value],
    next: images.value[nextIndex.value]
  };
});

const goToNext = () => {
  if (isTransitioning.value || totalImages.value <= 1) return;
  isTransitioning.value = true;
  currentIndex.value = nextIndex.value;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
};

const goToPrev = () => {
  if (isTransitioning.value || totalImages.value <= 1) return;
  isTransitioning.value = true;
  currentIndex.value = prevIndex.value;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
};

const goToSlide = (index) => {
  if (isTransitioning.value || index === currentIndex.value) return;
  isTransitioning.value = true;
  currentIndex.value = index;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
};

const startAutoPlay = () => {
  if (totalImages.value <= 1) return;
  stopAutoPlay();
  autoPlayTimer = setInterval(goToNext, 5000);
};

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
};

const normalize = (v) => (v || '').replace(/\/+$/, '');

const getSlug = () => {
  const slug = route.params.slug;
  if (Array.isArray(slug)) return slug.join('/');
  if (slug == null) return '';
  return String(slug);
};

const matchProject = (list, slug) => {
  if (!Array.isArray(list)) return null;
  const rawKey = (slug || '').trim();

  const candidates = new Set();
  if (rawKey === '' || rawKey === '/') {
    candidates.add('');
    candidates.add('/');
    candidates.add('/project');
  } else {
    candidates.add(rawKey);
    candidates.add(rawKey.startsWith('/') ? rawKey : '/' + rawKey);
    candidates.add(rawKey.replace(/^\/+/, ''));
    if (!rawKey.startsWith('/project')) {
      candidates.add('/project/' + rawKey.replace(/^\/+/, ''));
      candidates.add('/project' + (rawKey.startsWith('/') ? rawKey : '/' + rawKey));
    }
  }

  const candidateArr = Array.from(candidates).filter(v => v !== '');

  for (const candidate of candidateArr) {
    const found = list.find(p => normalize(p.route_index) === normalize(candidate));
    if (found) return found;
  }

  for (const candidate of candidateArr) {
    const found = list.find(p => p.route_index && normalize(p.route_index).endsWith(normalize(candidate)));
    if (found) return found;
  }

  for (const candidate of candidateArr) {
    const found = list.find(p => p.route_index && normalize(p.route_index).startsWith(normalize(candidate)));
    if (found) return found;
  }

  const idMatch = list.find(p => p.id && String(p.id) === rawKey);
  if (idMatch) return idMatch;

  return null;
};

const loadProject = async () => {
  loading.value = true;
  notFound.value = false;
  currentIndex.value = 0;
  stopAutoPlay();

  try {
    const slug = getSlug();
    searchedKey.value = slug;

    const response = await fetch('/lx-api/projects');
    const result = await response.json();

    if (result.success) {
      const project = matchProject(result.data, slug);
      if (project) {
        let configObj = {};
        if (project.config) {
          try {
            configObj = typeof project.config === 'string' ? JSON.parse(project.config) : project.config;
          } catch (e) {
            configObj = {};
          }
        }
        projectData.value = {
          id: project.id,
          title: project.title,
          route_index: project.route_index,
          description: project.description,
          config: configObj
        };
        startAutoPlay();
      } else {
        notFound.value = true;
      }
    } else {
      notFound.value = true;
    }
  } catch (error) {
    console.error('Failed to load project:', error);
    notFound.value = true;
  } finally {
    loading.value = false;
  }
};

watch(
  () => route.params.slug,
  () => {
    loadProject();
  }
);

watch(
  () => route.fullPath,
  () => {
    if (!route.params.slug && route.path === '/project') {
      fetch('/lx-api/projects')
        .then(r => r.json())
        .then(r => {
          if (r.success && r.data && r.data.length > 0) {
            const first = r.data[0];
            const raw = first.route_index || '';
            const slug = raw
              .replace(/\/+$/, '')
              .replace(/^\/+/, '')
              .replace(/^project\//, '')
              .replace(/^project$/, '');
            router.replace({ name: 'ProjectDetail', params: { slug } });
          }
        })
        .catch(() => {});
    }
  }
);

onMounted(() => {
  loadProject();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<template>
  <div class="project-container">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="notFound" class="not-found">
      <div class="not-found-icon">🔍</div>
      <h2>项目未找到</h2>
      <p>该项目可能已被删除或不存在</p>
      <p v-if="searchedKey" class="not-found-hint">
        查找键: <code>/{{ searchedKey }}</code>
      </p>
      <router-link to="/project" class="back-link">返回项目列表</router-link>
    </div>

    <div v-else class="project-card">
      <div v-if="images.length > 0" class="card-header">
        <div class="carousel-wrapper" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
          <button v-if="images.length > 1" class="nav-btn prev-btn" @click="goToPrev" aria-label="上一张">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          <div class="carousel-container">
            <div class="carousel-track">
              <div v-if="images.length > 1" class="slide prev-slide" :class="{ transitioning: isTransitioning }" @click="goToPrev">
                <img :src="visibleImages.prev" :alt="'预览图 ' + prevIndex" class="slide-image" />
              </div>
              <div class="slide current-slide" :class="{ transitioning: isTransitioning }">
                <img :src="visibleImages.current" :alt="'预览图 ' + currentIndex" class="slide-image" />
                <div class="slide-overlay">
                  <a :href="project.url" target="_blank" rel="noopener noreferrer" class="visit-btn">
                    访问项目
                  </a>
                </div>
              </div>
              <div v-if="images.length > 1" class="slide next-slide" :class="{ transitioning: isTransitioning }" @click="goToNext">
                <img :src="visibleImages.next" :alt="'预览图 ' + nextIndex" class="slide-image" />
              </div>
            </div>
          </div>

          <button v-if="images.length > 1" class="nav-btn next-btn" @click="goToNext" aria-label="下一张">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>

          <div v-if="images.length > 1" class="carousel-indicators">
            <button v-for="(image, index) in images" :key="index" class="indicator"
              :class="{ active: index === currentIndex }" @click="goToSlide(index)"
              :aria-label="'切换到第 ' + (index + 1) + ' 张'"></button>
          </div>
        </div>
      </div>

      <div class="card-body">
        <div class="project-header">
          <h2 class="project-title">{{ project.name }}</h2>
          <div class="project-links" v-if="project.github || project.gitee">
            <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer"
              class="link-btn github">
              <svg class="link-icon" viewBox="0 0 24  24" fill="currentColor">
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a v-if="project.gitee" :href="project.gitee" target="_blank" rel="noopener noreferrer"
              class="link-btn gitee">
              <svg class="link-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M10.184 0c-.944 0-1.784.39-2.423 1.018C7.34.39 6.5.78 6.5 1.535v21.323c0 .755.84 1.145 1.261.723.421-.421.763-.963.763-1.538V6.295l5.66 5.66c.193.193.451.29.708.29.258 0 .516-.097.708-.29.385-.385.385-1.012 0-1.397L10.18 5.006V1.535c0-.755-.84-1.145-1.261-.723-.421.421-.763.963-.763 1.538v16.54c0 1.018-.842 1.847-1.885 1.847-.755 0-1.368-.63-1.368-1.385V1.535C5.603.78 6.44.39 7.34.39c.902 0 1.62-.51 2.025-1.232C9.78-.51 10.5.03 11.26.03c.755 0 1.385-.54 1.385-1.295 0-.755-.63-1.385-1.385-1.385L10.184 0z" />
              </svg>
              Gitee
            </a>
          </div>
        </div>
        <p v-if="project.description" class="project-desc">{{ project.description }}</p>

        <div v-if="project.techStack.length > 0" class="tech-stack">
          <span v-for="tech in project.techStack" :key="tech" class="tech-badge">
            {{ tech }}
          </span>
        </div>

        <div v-if="project.responsibilities.length > 0" class="responsibilities">
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

.loading-state,
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  color: var(--color-text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.not-found-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.not-found-hint {
  margin-top: 8px;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.not-found-hint code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.back-link {
  margin-top: 20px;
  padding: 10px 24px;
  background: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s;
}

.back-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.project-card {
  width: 100%;
  max-width: 1200px;
  background: var(--color-bg-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
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
  padding: 0 20px;
}

.slide {
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.prev-slide {
  width: 8%;
  height: 60%;
  opacity: 0.5;
  transform: translateX(15%) scale(0.85);
}

.current-slide {
  width: 85%;
  height: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  z-index: 10;
}

.next-slide {
  width: 8%;
  height: 60%;
  opacity: 0.5;
  transform: translateX(-15%) scale(0.85);
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.slide:hover .slide-image {
  transform: scale(1.05);
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.current-slide:hover .slide-overlay {
  opacity: 1;
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

.visit-btn {
  padding: 12px 32px;
  background: linear-gradient(135deg, var(--color-primary) 0%, #1a7de0 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.visit-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(30, 144, 255, 0.4);
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

.project-title {
  font-size: 26px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
  flex: 1;
  min-width: 200px;
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
  transition: background 0.2s ease, transform 0.2s ease;
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
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
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

.link-btn.gitee {
  background: #c71a27;
  color: #ffffff;
}

.link-btn.gitee:hover {
  background: #a01620;
  box-shadow: 0 4px 12px rgba(199, 26, 39, 0.4);
}

@media (max-width: 768px) {
  .project-container {
    padding: 16px;
  }

  .card-body {
    padding: 20px;
  }

  .carousel-wrapper {
    height: 220px;
  }

  .carousel-track {
    padding: 0 40px;
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
    font-size: 22px;
  }

  .project-links {
    flex-direction: column;
  }

  .link-btn {
    justify-content: center;
  }
}
</style>
