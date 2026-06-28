﻿﻿﻿<script setup>
  import StarryBackground from '../components/background/StarryBackground.vue';
  import SkyBackground from '../components/background/SkyBackground.vue';
  import FieldBackground from '../components/background/FieldBackground.vue';
  import WaterBackground from '../components/background/WaterBackground.vue';
  import RelaxSection from '../components/relax/RelaxSection.vue';
  import BlogCard from '../components/blog/BlogCard.vue';
  import BlogPagination from '../components/blog/BlogPagination.vue';
  import AppFooter from '../components/AppFooter.vue';
  import { startAmbientGlitch, stopAmbientGlitch } from '../composables/useAmbientGlitch';
  import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import { useHomeSection } from '../composables/useHomeSection';
  import { useTheme } from '../composables/useTheme';
  import { PowerGlitch } from 'powerglitch';

  const { setCurrentSection, setIsOnHome } = useHomeSection();
  const router = useRouter();
  const { isDark, isCyberpunk, enterCyberpunk: themeEnterCyberpunk, exitCyberpunk: themeExitCyberpunk } = useTheme();

  // ── 赛博朋克 hover 故障配置 ──
  const CYBER_HOVER_SELECTORS = [
    '.link-card',
    '.blog-card',
    '.track-item',
    '.section-title',
    '.cyber-section-label',
    '.playlist-item',
  ];
  const HOVER_GLITCH_CONFIG = {
    playMode: 'manual',
    hideOverflow: false,
    timing: { duration: 500, iterations: 1 },
    glitchTimeSpan: { start: 0, end: 1 },
    shake: { velocity: 25, amplitudeX: 0.15, amplitudeY: 0.15 },
    slice: { count: 8, velocity: 18, minHeight: 0.02, maxHeight: 0.15, hueRotate: true },
  };

  let heroGlitch = null;
  let subtitleGlitchInstance = null;
  let cyberHoverCleanup = null;
  let switching = false;

  const isTitleHovered = ref(false);
  const titleElRef = ref(null);
  const subtitleElRef = ref(null);
  const glitchCanvasRef = ref(null);
  let ambientTimer = null;

  // ── Hero 标题 PowerGlitch ──
  function initHeroGlitch() {
    if (!titleElRef.value) return;
    heroGlitch = PowerGlitch.glitch(titleElRef.value, {
      playMode: 'manual',
      hideOverflow: false,
      timing: { duration: 400, iterations: 1 },
      glitchTimeSpan: { start: 0, end: 1 },
      shake: { velocity: 20, amplitudeX: 0.08, amplitudeY: 0.08 },
      slice: { count: 4, velocity: 10, minHeight: 0.02, maxHeight: 0.15, hueRotate: true },
    });
  }

  // ── 赛博朋克 hover 故障（PowerGlitch，事件委托 + 正确清理）──
  const SELECTORS_STR = CYBER_HOVER_SELECTORS.join(',');
  let _cyberOverHandler = null;
  let _cyberOutHandler = null;
  let _headerOverHandler = null;
  let _headerOutHandler = null;
  let _cyberContainer = null;
  let _cyberHeader = null;
  let _activeGlitch = null;
  let _activeTarget = null;
  let _headerGlitch = null;
  let _headerTarget = null;

  function initCyberpunkHover() {
    _cyberContainer = document.querySelector('.home-wrapper');
    _cyberHeader = document.querySelector('.app-header');

    function stopGlitch(inst) {
      if (inst) { try { inst.stopGlitch(); } catch (_) {} }
    }

    if (_cyberContainer) {
      _cyberOverHandler = (e) => {
        const target = e.target.closest(SELECTORS_STR);
        if (!target || !_cyberContainer.contains(target) || target === _activeTarget) return;
        stopGlitch(_activeGlitch);
        _activeTarget = target;
        _activeGlitch = PowerGlitch.glitch(target, HOVER_GLITCH_CONFIG);
        _activeGlitch.startGlitch();
      };
      _cyberOutHandler = (e) => {
        const target = e.target.closest(SELECTORS_STR);
        if (!target) return;
        const related = e.relatedTarget;
        if (related && target.contains(related)) return;
        stopGlitch(_activeGlitch);
        _activeGlitch = null;
        _activeTarget = null;
      };
      _cyberContainer.addEventListener('mouseover', _cyberOverHandler);
      _cyberContainer.addEventListener('mouseout', _cyberOutHandler);
    }

    if (_cyberHeader) {
      _headerOverHandler = (e) => {
        const target = e.target.closest('.nav-link');
        if (!target || !_cyberHeader.contains(target) || target === _headerTarget) return;
        stopGlitch(_headerGlitch);
        _headerTarget = target;
        _headerGlitch = PowerGlitch.glitch(target, HOVER_GLITCH_CONFIG);
        _headerGlitch.startGlitch();
      };
      _headerOutHandler = (e) => {
        const target = e.target.closest('.nav-link');
        if (!target) return;
        const related = e.relatedTarget;
        if (related && target.contains(related)) return;
        stopGlitch(_headerGlitch);
        _headerGlitch = null;
        _headerTarget = null;
      };
      _cyberHeader.addEventListener('mouseover', _headerOverHandler);
      _cyberHeader.addEventListener('mouseout', _headerOutHandler);
    }

    cyberHoverCleanup = destroyCyberpunkHover;
  }

  function destroyCyberpunkHover() {
    if (_cyberContainer && _cyberOverHandler) {
      _cyberContainer.removeEventListener('mouseover', _cyberOverHandler);
      _cyberContainer.removeEventListener('mouseout', _cyberOutHandler);
    }
    if (_cyberHeader && _headerOverHandler) {
      _cyberHeader.removeEventListener('mouseover', _headerOverHandler);
      _cyberHeader.removeEventListener('mouseout', _headerOutHandler);
    }
    if (_activeGlitch) { try { _activeGlitch.stopGlitch(); } catch (_) {} _activeGlitch = null; _activeTarget = null; }
    if (_headerGlitch) { try { _headerGlitch.stopGlitch(); } catch (_) {} _headerGlitch = null; _headerTarget = null; }
    _cyberOverHandler = _cyberOutHandler = _headerOverHandler = _headerOutHandler = null;
    _cyberContainer = _cyberHeader = null;
    cyberHoverCleanup = null;
  }

  // ── 副标题故障闪烁 ──
  function triggerSubtitleGlitch() {
    const el = subtitleElRef.value;
    if (!el) return;
    if (!subtitleGlitchInstance) {
      subtitleGlitchInstance = PowerGlitch.glitch(el, {
        playMode: 'manual',
        hideOverflow: false,
        timing: { duration: 800, iterations: 2 },
        glitchTimeSpan: { start: 0, end: 1 },
        shake: { velocity: 15, amplitudeX: 0.06, amplitudeY: 0.06 },
        slice: { count: 4, velocity: 10, minHeight: 0.02, maxHeight: 0.12, hueRotate: true },
      });
    }
    subtitleGlitchInstance.startGlitch();
    setTimeout(() => { try { subtitleGlitchInstance.stopGlitch(); } catch (_) {} }, 1600);
  }

  // ── 主题切换动画（纯 CSS class，无 PowerGlitch）──
  function triggerThemeSwitch(callback) {
    const wrapper = document.querySelector('.home-wrapper');
    if (!wrapper) { callback(); return; }
    wrapper.classList.add('theme-switching');
    requestAnimationFrame(() => {
      callback();
      setTimeout(() => { wrapper.classList.remove('theme-switching'); }, 600);
    });
  }

  // ── 进入/退出赛博朋克 ──
  function enterCyberpunk() {
    themeEnterCyberpunk();
    if (titleElRef.value) titleElRef.value.textContent = '> HELLO_WORLD';
    nextTick(() => {
      if (subtitleElRef.value) subtitleElRef.value.classList.add('animate');
      triggerSubtitleGlitch();
      initCyberpunkHover();
    });
  }

  function exitCyberpunk() {
    themeExitCyberpunk();
    destroyCyberpunkHover();
    if (subtitleGlitchInstance) { try { subtitleGlitchInstance.stopGlitch(); } catch (_) {} }
    if (titleElRef.value) titleElRef.value.textContent = '揽星河 · 研习站';
    if (subtitleElRef.value) {
      subtitleElRef.value.classList.remove('animate');
      nextTick(() => { if (subtitleElRef.value) subtitleElRef.value.classList.add('animate'); });
    }
  }

  // ── 标题 hover/click ──
  const onTitleMouseEnter = () => {
    isTitleHovered.value = true;
    if (isCyberpunk.value) {
      if (titleElRef.value) titleElRef.value.textContent = '揽星河 · 研习站';
    } else {
      if (titleElRef.value) titleElRef.value.textContent = '> HELLO_WORLD';
    }
    if (heroGlitch) heroGlitch.startGlitch();
    ambientTimer = setTimeout(() => { startAmbientGlitch(); }, 2000);
  };

  const onTitleMouseLeave = () => {
    isTitleHovered.value = false;
    if (isCyberpunk.value) {
      if (titleElRef.value) titleElRef.value.textContent = '> HELLO_WORLD';
    } else {
      if (titleElRef.value) titleElRef.value.textContent = '揽星河 · 研习站';
    }
    if (ambientTimer) { clearTimeout(ambientTimer); ambientTimer = null; }
    stopAmbientGlitch();
    if (heroGlitch) heroGlitch.stopGlitch();
  };

  const onTitleClick = () => {
    if (switching) return;
    switching = true;
    if (isCyberpunk.value) {
      triggerThemeSwitch(exitCyberpunk);
    } else {
      triggerThemeSwitch(enterCyberpunk);
    }
    setTimeout(() => { switching = false; }, 800);
  };

  const projects = ref([]);
  const projectPage = ref(1);
  const projectPageSize = 6;

  const totalProjectPages = computed(() => {
    return Math.ceil(projects.value.length / projectPageSize);
  });

  const displayedProjects = computed(() => {
    const start = (projectPage.value - 1) * projectPageSize;
    return projects.value.slice(start, start + projectPageSize);
  });

  // 翻页前清理活跃的 PowerGlitch 实例，避免 DOM 修改与 Vue 虚拟 DOM 冲突
  function cleanupActiveGlitch() {
    if (_activeGlitch) {
      try { _activeGlitch.stopGlitch(); } catch (_) {}
      try { _activeGlitch.stop?.(); } catch (_) {}
      _activeGlitch = null;
      _activeTarget = null;
    }
  }

  const setProjectPage = (page) => {
    if (page >= 1 && page <= totalProjectPages.value) {
      cleanupActiveGlitch();
      projectPage.value = page;
    }
  };

  const visibleProjectPages = computed(() => {
    const total = totalProjectPages.value;
    const current = projectPage.value;
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const pages = [];
    pages.push(1);
    if (current > 3) pages.push('...');
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i);
    }
    if (current < total - 2) pages.push('...');
    pages.push(total);
    return pages;
  });

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const result = await response.json();
      if (result.success) {
        projects.value = result.data.map((p) => {
          let config = {};
          try {
            config = typeof p.config === 'string' ? JSON.parse(p.config) : (p.config || {});
          } catch (_) {}
          return {
            title: p.title,
            desc: p.description || config.description || '',
            route: p.route_index || '',
            techStack: config.techStack || [],
          };
        });
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  };

  const navigateToProject = (route) => {
    if (route) {
      router.push('/' + route.replace(/^\/+/, ''));
    }
  };

  const sectionHeight = ref(0);
  const scrollContainer = ref(null);
  const isLoaded = ref(false);
  const currentSection = ref(0);
  const animatedElements = ref([]);
  const animationObserver = ref(null);
  let isScrolling = false;
  let scrollRAF = null;

  // 文章数据从API获取
  const articles = ref([]);
  const tags = ref([{ name: '全部', count: 0 }]);
  const loadingArticles = ref(false);

  const activeTag = ref('全部');
  const currentPage = ref(1);
  const pageSize = 6;

  // 加载文章数据
  const loadArticles = async () => {
    loadingArticles.value = true;
    try {
      const response = await fetch('/api/articles');
      const result = await response.json();
      if (result.success) {
        articles.value = result.data;
        // 从API获取标签统计
        const tagsResponse = await fetch('/api/articles/tags');
        const tagsResult = await tagsResponse.json();
        if (tagsResult.success) {
          tags.value = tagsResult.data;
        }
      }
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      loadingArticles.value = false;
    }
  };

  const filteredArticles = computed(() => {
    if (activeTag.value === '全部') {
      return articles.value;
    }
    return articles.value.filter((a) => a.tags && a.tags.includes(activeTag.value));
  });

  const totalPages = computed(() => {
    return Math.ceil(filteredArticles.value.length / pageSize);
  });

  const displayedArticles = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredArticles.value.slice(start, start + pageSize);
  });

  const scrollToSection = (index) => {
    if (scrollContainer.value && !isScrolling) {
      isScrolling = true;
      currentSection.value = index;
      scrollContainer.value.scrollTo({
        top: index * sectionHeight.value,
        behavior: 'smooth',
      });
      setTimeout(() => {
        isScrolling = false;
      }, 600);
    }
  };

  const handleArticleClick = (article) => {
    router.push('/articles');
  };

  const handleWheel = (e) => {
    if (!scrollContainer.value || isScrolling) return;

    let target = e.target;
    let shouldPreventPageScroll = false;

    while (target) {
      if (
        target.classList &&
        (target.classList.contains('playlist') ||
          target.classList.contains('history-list'))
      ) {
        const scrollTop = target.scrollTop;
        const scrollHeight = target.scrollHeight;
        const clientHeight = target.clientHeight;

        if (e.deltaY < 0 && scrollTop > 0) {
          shouldPreventPageScroll = true;
        }
        if (e.deltaY > 0 && scrollTop < scrollHeight - clientHeight - 10) {
          shouldPreventPageScroll = true;
        }
        break;
      }
      target = target.parentNode;
    }

    if (shouldPreventPageScroll) {
      return;
    }

    const container = scrollContainer.value;
    const H = sectionHeight.value;

    const atBottom =
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 2;
    const atTop = container.scrollTop <= 2;

    if (e.deltaY > 0) {
      if (atBottom) {
        return;
      }
      // 已进入 Water Section 后，不再吸附，允许自然滚到页脚
      if (container.scrollTop >= H * 3) {
        return;
      }
      e.preventDefault();
      // 向下滚：吸附到"下一个"板块
      if (container.scrollTop >= H * 2.5) {
        // Articles Section 下半部分：进入 Water Section
        scrollToSection(3);
      } else if (container.scrollTop >= H * 1.5) {
        // Articles Section 上半部分：进入 Water Section
        scrollToSection(3);
      } else if (container.scrollTop >= H * 0.5) {
        // Projects Section 内向下滚：进入 Articles Section
        scrollToSection(2);
      } else {
        // Hero Section 内向下滚：进入 Projects Section
        scrollToSection(1);
      }
    } else if (e.deltaY < 0) {
      if (atTop) {
        return;
      }
      e.preventDefault();
      // 向上滚：吸附到"所在区间的起始板块"（即上一个板块）
      if (container.scrollTop >= H * 3.5) {
        // 页脚区域上滚：回到 Water Section
        scrollToSection(3);
      } else if (container.scrollTop >= H * 2.5) {
        // Water Section 内上滚：回到 Articles Section
        scrollToSection(2);
      } else if (container.scrollTop >= H * 1.5) {
        // Articles Section 内上滚：回到 Projects Section
        scrollToSection(1);
      } else if (container.scrollTop >= H * 0.5) {
        // Projects Section 内上滚：回到 Hero Section
        scrollToSection(0);
      } else {
        // Hero Section 内上滚：保持 Hero Section
        scrollToSection(0);
      }
    }
  };

  const updateSectionHeight = () => {
    sectionHeight.value = window.innerHeight;
  };

  const handleScroll = () => {
    if (scrollRAF) return;
    scrollRAF = requestAnimationFrame(() => {
      scrollRAF = null;
      if (scrollContainer.value) {
        const section = Math.floor(
          (scrollContainer.value.scrollTop + sectionHeight.value / 2) /
            sectionHeight.value
        );
        if (section !== currentSection.value) {
          currentSection.value = section;
          setCurrentSection(section);
        }
      }
    });
  };

  const initScrollAnimation = () => {
    if (animationObserver.value) {
      animationObserver.value.disconnect();
    }

    animationObserver.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          } else {
            entry.target.classList.remove('animate');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      if (!animatedElements.value.includes(el)) {
        animatedElements.value.push(el);
        animationObserver.value.observe(el);
      }
    });
  };

  onMounted(async () => {
    // 加载文章和项目数据
    loadArticles();
    loadProjects();
    setCurrentSection(0);
    setIsOnHome(true);
    updateSectionHeight();
    setTimeout(() => {
      isLoaded.value = true;
    }, 100);

    // Glitch canvas 初始化
    resizeGlitchCanvas();
    window.addEventListener('resize', resizeGlitchCanvas);

    // 初始化 hero 标题 PowerGlitch
    initHeroGlitch();

    nextTick(() => {
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        scrollContainer.value = mainContent;
        mainContent.addEventListener('wheel', handleWheel, { passive: false });
        mainContent.addEventListener('scroll', handleScroll, { passive: true });
      }
      setTimeout(() => initScrollAnimation(), 300);
    });

    // Mark glitchable text for ambient text glitch
    setTimeout(() => {
      document
        .querySelectorAll(
          '.section-title, .subtitle, .section-label, .card-title, .card-desc, .card-excerpt, .page, .tag-item, .track-title, .track-artist, .today-date, .today-day, .event, .history-label, .today-label, .footer-tag, .footer-copyright, .footer-icp, .footer-sync, .playlist-label, .hero-status, .article-meta, .time-text, .link-info h3, .link-desc, .relax-title, .relax-subtitle, .section-header span, .history-year, .history-event, .date-num, .date-weekday'
        )
        .forEach((el) => el.classList.add('glitchable-text'));
    }, 800);

    window.addEventListener('resize', updateSectionHeight);
  });

  onUnmounted(() => {
    setIsOnHome(false);
    if (ambientTimer) { clearTimeout(ambientTimer); ambientTimer = null; }
    stopAmbientGlitch();
    if (heroGlitch) { try { heroGlitch.stopGlitch(); } catch (_) {} heroGlitch = null; }
    if (subtitleGlitchInstance) { try { subtitleGlitchInstance.stopGlitch(); } catch (_) {} subtitleGlitchInstance = null; }
    destroyCyberpunkHover();
    if (scrollRAF) cancelAnimationFrame(scrollRAF);
    if (scrollContainer.value) {
      scrollContainer.value.removeEventListener('wheel', handleWheel);
      scrollContainer.value.removeEventListener('scroll', handleScroll);
    }
    if (animationObserver.value) animationObserver.value.disconnect();
    window.removeEventListener('resize', updateSectionHeight);
    window.removeEventListener('resize', resizeGlitchCanvas);
  });

  const resizeGlitchCanvas = () => {
    const canvas = glitchCanvasRef.value;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
</script>

<template>
  <div class="home-wrapper" :class="{ loaded: isLoaded, cyberpunk: isCyberpunk }">
    <canvas ref="glitchCanvasRef" class="glitch-canvas"></canvas>
    <section class="hero-section" :style="{ height: sectionHeight + 'px' }">
      <StarryBackground />
      <div class="gradient-overlay"></div>
      <div class="content">
        <div class="text-content">
          <div
            class="title-wrapper"
            :class="{
              'is-hovered': isTitleHovered,
              'is-cyberpunk': isCyberpunk,
            }"
            @mouseenter="onTitleMouseEnter"
            @mouseleave="onTitleMouseLeave"
            @click="onTitleClick"
          >
            <p class="hack-hint" :class="{ visible: isCyberpunk || isTitleHovered }">
              <template v-if="isCyberpunk">&gt;&gt; SYSTEM_BOOT_OK_</template>
              <template v-else-if="isTitleHovered">$ sudo ./inject --target=root_</template>
              <template v-else>&nbsp;</template>
            </p>
            <h1
              ref="titleElRef"
              class="name scroll-animate fade-up delay-1 cyber-title-target"
            >揽星河 · 研习站</h1>
          </div>
          <p
            ref="subtitleElRef"
            class="subtitle scroll-animate fade-up delay-4"
            :class="{ 'cyber-subtitle': isCyberpunk }"
          >
            天地一指也 · 万物一马也
          </p>
        </div>
      </div>
      <div class="scroll-indicator fade-in-delay" @click="scrollToSection(1)">
        <span class="scroll-text">项目展示</span>
        <div class="scroll-arrow">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>

    <!-- Projects Section（原 Links Section 内容，背景保持 SkyBackground） -->
    <section
      class="projects-section"
      :style="{ height: sectionHeight + 'px' }"
      :class="{ dark: isDark, cyberpunk: isCyberpunk }"
    >
      <SkyBackground v-if="!isCyberpunk" :visible="currentSection >= 1" :is-dark="isDark" />
      <div class="links-content">
        <h2 class="section-title scroll-animate fade-up" @click="router.push('/project')" style="cursor:pointer">
          <span v-if="isCyberpunk" class="cyber-section-label">&gt; /projects</span>
          <span v-else>项目展示</span>
        </h2>
        <div class="links-grid" :key="'project-page-' + projectPage">
          <div
            v-for="(item, index) in displayedProjects"
            :key="item.route"
            class="link-card"
            @click="navigateToProject(item.route)"
          >
            <div class="link-info">
              <h3>{{ item.title }}</h3>
              <p class="link-desc">{{ item.desc }}</p>
            </div>
            <span class="link-arrow">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12L12 4M12 4H6M12 4V10"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
        <div class="project-pagination" v-if="totalProjectPages > 1">
          <button
            class="page-btn"
            :disabled="projectPage === 1"
            @click.stop="setProjectPage(projectPage - 1)"
          >
            &laquo;
          </button>
          <template v-for="(p, idx) in visibleProjectPages" :key="idx">
            <span v-if="p === '...'" class="page-ellipsis">...</span>
            <button
              v-else
              class="page-num"
              :class="{ active: projectPage === p }"
              @click.stop="setProjectPage(p)"
            >
              {{ p }}
            </button>
          </template>
          <button
            class="page-btn"
            :disabled="projectPage === totalProjectPages"
            @click.stop="setProjectPage(projectPage + 1)"
          >
            &raquo;
          </button>
        </div>
      </div>
      <div
        class="scroll-indicator bottom fade-in-delay"
        @click="scrollToSection(2)"
      >
        <span class="scroll-text">随笔</span>
        <div class="scroll-arrow">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>

    <!-- Articles Section（原 About Section 内容，背景保持 FieldBackground） -->
    <section
      class="articles-section"
      :style="{ height: sectionHeight + 'px' }"
      :class="{ dark: isDark, cyberpunk: isCyberpunk }"
    >
      <FieldBackground
        v-if="!isCyberpunk"
        :visible="currentSection >= 2"
        :scroll-progress="
          sectionHeight > 0
            ? (scrollContainer?.scrollTop || 0) / sectionHeight
            : 0
        "
        :is-dark="isDark"
      />
      <div class="blog-section">
        <div class="blog-header">
          <h2 class="section-title scroll-animate fade-up" @click="router.push('/articles')" style="cursor:pointer">
            <span v-if="isCyberpunk" class="cyber-section-label">&gt; /articles</span>
            <span v-else>随笔</span>
          </h2>

          <div class="category-tabs scroll-animate fade-up delay-2">
            <button
              v-for="tag in tags"
              :key="tag.name"
              class="category-tab"
              :class="{ active: activeTag === tag.name }"
              @click="
                activeTag = tag.name;
                cleanupActiveGlitch();
                currentPage = 1;
              "
            >
              {{ tag.name }}
              <span class="category-count">{{ tag.count }}</span>
            </button>
          </div>
        </div>

        <div class="blog-grid" :key="'article-page-' + currentPage + '-' + activeTag">
          <BlogCard
            v-for="(article, index) in displayedArticles"
            :key="article.id"
            :article="article"
            :is-dark="isDark"
            :is-cyberpunk="isCyberpunk"
            :style="{ animationDelay: (index % 3) * 0.1 + 's' }"
            @click="handleArticleClick(article)"
          />
        </div>

        <div class="pagination-wrapper">
          <BlogPagination
            v-if="totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            :cyberpunk="isCyberpunk"
            @change="cleanupActiveGlitch(); currentPage = $event"
          />
        </div>
      </div>
      <div
        class="scroll-indicator bottom fade-in-delay"
        @click="scrollToSection(3)"
      >
        <span class="scroll-text">向下潜水</span>
        <div class="scroll-arrow">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>

    <section
      class="water-section"
      :style="{ height: sectionHeight + 'px' }"
      :class="{ dark: isDark, cyberpunk: isCyberpunk }"
    >
      <WaterBackground
        v-if="!isCyberpunk"
        :visible="currentSection >= 3"
        :scroll-progress="
          sectionHeight > 0
            ? (scrollContainer?.scrollTop || 0) / sectionHeight
            : 0
        "
        :is-dark="isDark"
      />
      <RelaxSection :is-dark="isDark" :cyberpunk="isCyberpunk" />
    </section>

    <AppFooter :is-cyberpunk="isCyberpunk" />
  </div>
</template>

<style scoped>
  .home-wrapper {
    width: 100%;
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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
    background: radial-gradient(
      circle at 50% 50%,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
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
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 0.6;
      transform: translateY(0);
    }
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
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(10px);
    }
    60% {
      transform: translateY(5px);
    }
  }

  .projects-section {
    position: relative;
    width: 100%;
    background: linear-gradient(180deg, #e8f4f8 0%, #f0f7f9 100%);
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
    height: 80vh;
    position: relative;
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .blog-header {
    text-align: center;
    margin-bottom: 1.5rem;
    flex-shrink: 0;
  }

  .blog-title {
    font-size: 2rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
    color: #1a2a3a;
    letter-spacing: 0.2rem;
    text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8);
  }

  .section-title {
    font-size: 2rem;
    font-weight: 300;
    margin: 0 0 2rem;
    color: #2a4a3a;
    letter-spacing: 0.2rem;
    text-align: center;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  }

  .projects-section .section-title {
    margin-bottom: 3rem;
  }

  .articles-section .section-title {
    margin-bottom: 1.5rem;
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
    height: 60vh;
  }

  .pagination-wrapper {
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .scroll-indicator.bottom {
    color: #4a5a6a;
  }

  .scroll-indicator.bottom:hover {
    color: #1a2a3a;
  }

  .articles-section {
    position: relative;
    width: 100%;
    background: linear-gradient(180deg, #f5faf8 0%, #e8f4e8 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: background 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .links-content {
    max-width: 1200px;
    padding: 2rem 3rem;
    width: 100%;
    height: 80vh;
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  /* 顶部标题区 ~5% */
  .links-content h2 {
    text-align: center;
    font-size: 2.2rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
    color: #2a4a3a;
    letter-spacing: 0.2rem;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
    flex-shrink: 0;
  }

  /* 核心卡片网格 */
  .links-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 24px;
    height: 60vh;
    width: 100%;
    align-items: stretch;
  }

  .link-card {
    width: 100%;
    height: calc(30vh - 12px);
    min-height: 0;
    display: flex;
    flex-direction: column;
    padding: 2rem 1.75rem;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease,
      background-color 0.3s;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }

  .link-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(180, 220, 160, 0.1) 0%,
      rgba(140, 200, 150, 0.05) 100%
    );
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

  /* 卡片内部分层 */
  .link-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .link-info h3 {
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 0.6rem;
    color: #2a4a3a;
    letter-spacing: 0.05rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 0;
  }

  .link-desc {
    font-size: 0.8125rem;
    color: #5a7a6a;
    line-height: 1.7;
    margin: 0;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .link-arrow {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    color: #7a9a8a;
    flex-shrink: 0;
    opacity: 0;
    transform: translate(-4px, 4px);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease,
      color 0.3s;
  }

  .link-card:hover .link-arrow {
    opacity: 1;
    transform: translate(0, 0);
    color: #3a5a4a;
  }

  /* 底部分页控件 */
  .project-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin: 24px auto 0;
    flex-shrink: 0;
  }

  .page-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    border: none;
    border-radius: 6px;
    background: rgba(58, 90, 74, 0.1);
    color: #3a5a4a;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .page-btn:hover:not(:disabled) {
    background: rgba(58, 90, 74, 0.2);
  }

  .page-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .page-num {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: #3a5a4a;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .page-num:hover {
    background: rgba(58, 90, 74, 0.15);
  }

  .page-num.active {
    background: rgba(58, 90, 74, 0.8);
    color: white;
    font-weight: 600;
  }

  .page-ellipsis {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    color: #7a9a8a;
    font-size: 14px;
    letter-spacing: 2px;
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
    color: #e0f8ff;
    letter-spacing: 0.3rem;
    text-shadow: 0 2px 10px rgba(0, 50, 60, 0.5);
  }

  .water-subtitle {
    font-size: 1.25rem;
    color: #b0e0e8;
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
    color: #90c8d0;
    line-height: 1.8;
    font-weight: 300;
    letter-spacing: 0.05rem;
    max-width: 600px;
  }

  .scroll-animate {
    opacity: 0;
    transform: translateY(40px);
    transition:
      opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
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

  /* 暗色模式样式 - 项目展示区（位置2，SkyBackground） */
  .projects-section.dark {
    background: linear-gradient(180deg, #0a1520 0%, #1a2530 100%);
    transition: background 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .projects-section.dark .scroll-indicator.bottom {
    color: #8a9aab;
  }

  .projects-section.dark .scroll-indicator.bottom:hover {
    color: #e0e8f0;
  }

  .projects-section.dark .section-title {
    color: #c0e0d0;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  }

  .projects-section.dark .link-card {
    background: rgba(30, 50, 40, 0.6);
    border: 1px solid rgba(80, 120, 100, 0.3);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .projects-section.dark .link-card:hover {
    background: rgba(50, 70, 60, 0.8);
    box-shadow: 0 8px 30px rgba(80, 140, 120, 0.2);
  }

  .projects-section.dark .link-card::before {
    background: linear-gradient(
      135deg,
      rgba(80, 140, 120, 0.1) 0%,
      rgba(60, 120, 100, 0.05) 100%
    );
  }

  .projects-section.dark .link-info h3 {
    color: #c0e0d0;
  }

  .projects-section.dark .link-desc {
    color: #6a8a7a;
  }

  .projects-section.dark .link-arrow {
    color: #6a8a7a;
  }

  .projects-section.dark .link-card:hover .link-arrow {
    color: #a0c0b0;
  }

  .projects-section.dark .project-pagination .page-btn {
    background: rgba(100, 160, 140, 0.15);
    color: #a0c0b0;
  }

  .projects-section.dark .project-pagination .page-btn:hover:not(:disabled) {
    background: rgba(100, 160, 140, 0.25);
  }

  .projects-section.dark .project-pagination .page-num {
    color: #a0c0b0;
  }

  .projects-section.dark .project-pagination .page-num:hover {
    background: rgba(100, 160, 140, 0.15);
  }

  .projects-section.dark .project-pagination .page-num.active {
    background: rgba(100, 160, 140, 0.7);
    color: white;
  }

  .projects-section.dark .project-pagination .page-ellipsis {
    color: #6a8a7a;
  }

  /* 暗色模式样式 - 随笔区（位置3，FieldBackground） */
  .articles-section.dark {
    background: linear-gradient(180deg, #0a1a15 0%, #152520 100%);
    transition: background 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .articles-section.dark .section-title {
    color: #e0e8f0;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  }

  .articles-section.dark .blog-subtitle {
    color: #8a9aab;
  }

  .articles-section.dark .category-tab {
    background: rgba(30, 40, 50, 0.6);
    color: #8a9aab;
    border: 1px solid rgba(100, 120, 140, 0.3);
  }

  .articles-section.dark .category-tab:hover {
    background: rgba(50, 60, 70, 0.8);
    color: #e0e8f0;
  }

  .articles-section.dark .category-tab.active {
    background: rgba(80, 120, 100, 0.8);
    color: white;
  }

  .articles-section.dark .scroll-indicator.bottom {
    color: #8a9aab;
  }

  .articles-section.dark .scroll-indicator.bottom:hover {
    color: #e0e8f0;
  }

  /* 水下区暗色模式 */
  .water-section.dark .water-content h2 {
    color: #80a0b0;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  }

  .water-section.dark .water-subtitle {
    color: #507080;
  }

  .water-section.dark .water-description p {
    color: #406070;
  }

  .hero-section,
  .projects-section,
  .articles-section,
  .water-section {
    will-change: transform;
    -webkit-font-smoothing: antialiased;
  }

  /* ==================== 标题 Hover / 点击 交互 ==================== */
  .title-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    cursor: default;
    transition: transform 0.3s ease;
  }

  .title-wrapper.is-hovered {
    cursor: pointer;
  }

  .title-wrapper.is-hovered .name {
    color: #ff2e93;
    text-shadow:
      0 0 10px rgba(255, 46, 147, 0.8),
      0 0 20px rgba(255, 46, 147, 0.5),
      0 0 40px rgba(255, 46, 147, 0.3);
  }

  .name.cyber-title-target {
    display: inline-block;
    transition: color 0.25s ease, text-shadow 0.25s ease, letter-spacing 0.25s ease;
  }

  /* ==================== Cyberpunk 主题 ==================== */
  .home-wrapper.cyberpunk .hero-section {
    background: #000;
  }

  .home-wrapper.cyberpunk .gradient-overlay {
    background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  }

  .home-wrapper.cyberpunk .content {
    background:
      linear-gradient(rgba(255, 46, 147, 0.03) 50%, transparent 50%),
      linear-gradient(90deg, rgba(0, 240, 255, 0.03) 50%, transparent 50%);
    background-size: 4px 4px;
  }

  .home-wrapper.cyberpunk .text-content .name {
    color: #ff2e93;
    text-shadow:
      0 0 20px rgba(255, 46, 147, 0.6),
      0 0 40px rgba(255, 46, 147, 0.3);
  }

  .home-wrapper.cyberpunk .subtitle.cyber-subtitle {
    color: rgba(255, 255, 255, 0.55);
    font-family: 'Noto Sans SC', sans-serif;
    letter-spacing: 0.3rem;
  }

  .home-wrapper.cyberpunk .title-wrapper {
    cursor: pointer;
  }

  .home-wrapper.cyberpunk .scroll-indicator {
    color: #00f0ff;
    text-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
  }

  .home-wrapper.cyberpunk .scroll-indicator .scroll-text {
    font-family: 'Share Tech Mono', monospace;
    color: #00f0ff;
  }

  /* Projects / Articles sections cyberpunk overrides */
  .projects-section.cyberpunk,
  .articles-section.cyberpunk,
  .water-section.cyberpunk {
    background: #000 !important;
    transition: background 0.8s ease;
  }

  .home-wrapper.cyberpunk .section-title {
    font-family: 'Share Tech Mono', monospace;
    color: #00f0ff;
    letter-spacing: 0.25rem;
    font-size: 1.5rem;
    font-weight: 400;
    text-shadow: 0 0 12px rgba(0, 240, 255, 0.6);
  }

  .home-wrapper.cyberpunk .cyber-section-label {
    color: #00f0ff;
  }

  /* Link card (projects) */
  .home-wrapper.cyberpunk .link-card {
    background: #05050a;
    border: 1px solid rgba(0, 240, 255, 0.15);
    border-radius: 0;
    box-shadow:
      inset 0 0 4px rgba(0, 240, 255, 0.2),
      inset 0 0 12px rgba(0, 240, 255, 0.1);
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s;
  }

  .home-wrapper.cyberpunk .link-card::before {
    display: none;
  }

  .home-wrapper.cyberpunk .link-card:hover {
    transform: translateY(-4px);
    background: #05050a;
    border-color: rgba(255, 46, 147, 0.3);
    box-shadow:
      inset 0 0 8px rgba(255, 46, 147, 0.5),
      inset 0 0 30px rgba(255, 46, 147, 0.25),
      0 0 25px rgba(255, 46, 147, 0.5),
      0 0 50px rgba(255, 46, 147, 0.25);
  }

  .home-wrapper.cyberpunk .link-info h3 {
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    color: #00f0ff;
    letter-spacing: 0.05rem;
  }

  .home-wrapper.cyberpunk .link-desc {
    color: rgba(255, 255, 255, 0.55);
    font-family: 'Inter', sans-serif;
  }

  .home-wrapper.cyberpunk .link-arrow {
    color: rgba(255, 46, 147, 0.8);
  }

  .home-wrapper.cyberpunk .link-card:hover .link-arrow {
    color: #ff2e93;
  }

  /* Project pagination cyberpunk */
  .home-wrapper.cyberpunk .project-pagination .page-btn,
  .home-wrapper.cyberpunk .project-pagination .page-num {
    background: transparent;
    color: #00f0ff;
    font-family: 'Share Tech Mono', monospace;
    border: 1px solid rgba(0, 240, 255, 0.15);
  }

  .home-wrapper.cyberpunk .project-pagination .page-btn:hover:not(:disabled),
  .home-wrapper.cyberpunk .project-pagination .page-num:hover {
    background: rgba(0, 240, 255, 0.08);
  }

  .home-wrapper.cyberpunk .project-pagination .page-num.active {
    background: #ff2e93;
    color: #000;
    border-color: #ff2e93;
    box-shadow: 0 0 12px rgba(255, 46, 147, 0.5);
  }

  .home-wrapper.cyberpunk .project-pagination .page-ellipsis {
    color: rgba(255, 255, 255, 0.45);
    font-family: 'Share Tech Mono', monospace;
  }

  /* Category tabs */
  .home-wrapper.cyberpunk .category-tab {
    background: #05050a;
    border: 1px solid rgba(0, 240, 255, 0.2);
    color: rgba(255, 255, 255, 0.55);
    backdrop-filter: none;
    font-family: 'Share Tech Mono', monospace;
    border-radius: 0;
    padding: 0.4rem 1rem;
  }

  .home-wrapper.cyberpunk .category-tab:hover {
    background: rgba(0, 240, 255, 0.08);
    color: #00f0ff;
  }

  .home-wrapper.cyberpunk .category-tab.active {
    background: #ff2e93;
    color: #000;
    border-color: #ff2e93;
    box-shadow: 0 0 12px rgba(255, 46, 147, 0.5);
  }

  .home-wrapper.cyberpunk .category-count {
    opacity: 0.8;
  }

  /* Scroll indicators */
  .home-wrapper.cyberpunk .scroll-indicator.bottom {
    color: rgba(0, 240, 255, 0.8);
  }

  .home-wrapper.cyberpunk .scroll-indicator.bottom .scroll-text {
    font-family: 'Share Tech Mono', monospace;
  }

  .home-wrapper.cyberpunk .scroll-indicator.bottom:hover {
    color: #ff2e93;
    text-shadow: 0 0 10px rgba(255, 46, 147, 0.6);
  }

  /* Global cyberpunk view transition */
  :root.cyberpunk-theme {
    --neon-pink: #ff2e93;
    --neon-cyan: #00f0ff;
  }

  @media (prefers-reduced-motion: no-preference) {
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation-duration: 0.6s;
    }
  }

  /* Project link card cyberpunk hover — enhanced */
  .home-wrapper.cyberpunk .link-card:hover .link-arrow {
    transform: translate(0, 0);
    filter: drop-shadow(0 0 6px rgba(255, 46, 147, 0.8));
  }

  /* Cyberpunk text hover glow for subtitles / labels / meta */
  .home-wrapper.cyberpunk .subtitle.cyber-subtitle {
    transition: color 0.25s, text-shadow 0.25s;
  }
  .home-wrapper.cyberpunk .subtitle.cyber-subtitle:hover {
    color: #00f0ff;
    text-shadow: 0 0 10px rgba(0, 240, 255, 0.6);
  }

  .home-wrapper.cyberpunk .scroll-indicator.bottom .scroll-text {
    font-family: 'Share Tech Mono', monospace;
    letter-spacing: 0.15rem;
  }

  /* === Cyberpunk hover for text elements === */
  .home-wrapper.cyberpunk .section-title,
  .home-wrapper.cyberpunk .section-label,
  .home-wrapper.cyberpunk .cyber-section-label {
    transition: color 0.25s, text-shadow 0.25s;
  }
  .home-wrapper.cyberpunk .section-title:hover,
  .home-wrapper.cyberpunk .section-label:hover,
  .home-wrapper.cyberpunk .cyber-section-label:hover {
    color: #ff2e93 !important;
    text-shadow:
      0 0 10px rgba(255, 46, 147, 0.8),
      0 0 20px rgba(255, 46, 147, 0.5);
  }

  .home-wrapper.cyberpunk .link-info h3 {
    transition: color 0.25s, text-shadow 0.25s;
  }
  .home-wrapper.cyberpunk .link-info h3:hover {
    color: #ff2e93 !important;
    text-shadow: 0 0 12px rgba(255, 46, 147, 0.7);
  }

  .home-wrapper.cyberpunk .link-desc {
    transition: color 0.25s;
  }
  .home-wrapper.cyberpunk .link-desc:hover {
    color: rgba(255, 255, 255, 0.85);
  }

  .home-wrapper.cyberpunk .blog-card .card-title {
    transition: color 0.25s, text-shadow 0.25s;
  }
  .home-wrapper.cyberpunk .blog-card .card-title:hover {
    color: #ff2e93 !important;
    text-shadow: 0 0 12px rgba(255, 46, 147, 0.7);
  }

  .home-wrapper.cyberpunk .blog-card .card-excerpt {
    transition: color 0.25s;
  }
  .home-wrapper.cyberpunk .blog-card .card-excerpt:hover {
    color: rgba(0, 240, 255, 0.85);
  }

  .home-wrapper.cyberpunk .blog-card .category-tag {
    transition: all 0.25s;
  }
  .home-wrapper.cyberpunk .blog-card .category-tag:hover {
    background: #ff2e93 !important;
    color: #000 !important;
    box-shadow: 0 0 10px rgba(255, 46, 147, 0.6);
  }

  /* Relax section hover in cyberpunk */
  .home-wrapper.cyberpunk .relax-section .relax-title {
    transition: color 0.25s, text-shadow 0.25s;
  }
  .home-wrapper.cyberpunk .relax-section .relax-title:hover {
    color: #00f0ff;
    text-shadow: 0 0 14px rgba(0, 240, 255, 0.7);
  }
  .home-wrapper.cyberpunk .relax-section .history-year {
    transition: color 0.25s, text-shadow 0.25s;
  }
  .home-wrapper.cyberpunk .relax-section .history-year:hover {
    color: #00f0ff !important;
    text-shadow: 0 0 10px rgba(0, 240, 255, 0.7);
  }
  .home-wrapper.cyberpunk .relax-section .date-num {
    transition: color 0.25s, text-shadow 0.25s;
  }
  .home-wrapper.cyberpunk .relax-section .date-num:hover {
    color: #ff2e93 !important;
    text-shadow: 0 0 20px rgba(255, 46, 147, 0.7);
  }

  /* Footer hover in cyberpunk */
  .home-wrapper.cyberpunk .app-footer .brand-line:hover,
  .home-wrapper.cyberpunk .app-footer .sync-line:hover {
    color: #ff2e93 !important;
    text-shadow: 0 0 10px rgba(255, 46, 147, 0.6);
  }

  /* ── Hack hint（标题上方终端命令）── */
  .hack-hint {
    font-family: 'Share Tech Mono', 'Courier New', monospace;
    font-size: 0.85rem;
    color: #00f0ff;
    text-shadow: 0 0 6px rgba(0, 240, 255, 0.5);
    margin-bottom: 0.5rem;
    letter-spacing: 0.1rem;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .hack-hint.visible {
    visibility: visible;
    opacity: 1;
  }

  .hack-hint.visible::after {
    content: '';
    display: inline-block;
    width: 0.5rem;
    height: 1rem;
    background: #00f0ff;
    margin-left: 2px;
    vertical-align: text-bottom;
    animation: cursorBlink 1s step-end infinite;
  }

  @keyframes cursorBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* ── 主题切换动画 ── */
  .home-wrapper.theme-switching {
    animation: themeGlitchSwitch 0.6s ease;
  }

  @keyframes themeGlitchSwitch {
    0%   { filter: none; transform: translate(0); }
    10%  { filter: hue-rotate(90deg) brightness(1.3); transform: translate(-2px, 1px); }
    20%  { filter: hue-rotate(-60deg) brightness(0.7); transform: translate(3px, -1px); }
    30%  { filter: hue-rotate(180deg) brightness(1.5) saturate(2); transform: translate(-1px, 2px); }
    40%  { filter: hue-rotate(-120deg) brightness(0.5); transform: translate(2px, -2px); }
    50%  { filter: hue-rotate(45deg) brightness(1.8) contrast(1.5); transform: translate(0); }
    60%  { filter: hue-rotate(-30deg) brightness(0.8); transform: translate(-3px, 1px); }
    70%  { filter: hue-rotate(60deg) brightness(1.2); transform: translate(1px, -1px); }
    80%  { filter: hue-rotate(-90deg) brightness(1.1); transform: translate(-1px, 0); }
    90%  { filter: hue-rotate(15deg) brightness(1.05); transform: translate(0); }
    100% { filter: none; transform: translate(0); }
  }

  /* 赛博朋克模式下标题区域可点击 */
  .home-wrapper.cyberpunk .title-wrapper {
    cursor: pointer;
  }
</style>

<!-- Non-scoped styles for ambient glitch (PowerGlitch wrappers & canvas) -->
<style>
  :root {
    --neon-pink: #ff2e93;
    --neon-cyan: #00f0ff;
  }

  .glitch-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    pointer-events: none;
  }

  @keyframes ambientTextGlitch {
    0% { transform: translate(0); opacity: 1; filter: none; }
    8% { transform: translate(3px, -2px); opacity: 0.75; filter: blur(1.2px) brightness(1.18); }
    16% { transform: translate(-2px, 3px); opacity: 1; filter: blur(0.4px) brightness(1.06); }
    24% { transform: translate(5px, 0); opacity: 0.7; filter: blur(1.8px) brightness(1.22); }
    35% { transform: translate(-4px, -1px); opacity: 0.85; filter: blur(0.6px) brightness(1.1); }
    45% { transform: translate(0, 2px); opacity: 1; filter: none; }
    55% { transform: translate(1px, -1px); opacity: 0.9; filter: blur(0.3px) brightness(1.04); }
    100% { transform: translate(0); opacity: 1; filter: none; }
  }

  .text-glitch-ambient {
    animation: ambientTextGlitch 0.5s ease-out;
    color: #ff2e93 !important;
    text-shadow: 2px 0 0 #00f0ff, -2px 0 0 #ff2e93, 0 0 8px rgba(255, 46, 147, 0.8) !important;
  }

  .glitchable-text {
    display: inline-block;
  }
</style>
