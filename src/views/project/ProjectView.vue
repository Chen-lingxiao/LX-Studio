<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTheme } from '../../composables/useTheme';

const router = useRouter();
const route = useRoute();
const mainRef = ref<HTMLElement | null>(null);
const { isCyberpunk } = useTheme();

interface ProjectItem {
  index: string;
  title: string;
}

const projectList = ref<ProjectItem[]>([]);

const toChildPath = (routeIndex: string): string => {
  if (!routeIndex) return '';
  const cleaned = routeIndex.replace(/\/+$/, '').replace(/^\/+/, '');
  if (cleaned.startsWith('project/')) {
    return cleaned.slice('project/'.length);
  }
  if (cleaned === 'project') return '';
  return cleaned;
};

const fromChildPath = (childPath: string): string => {
  if (childPath === '/' || childPath === '') return '/project';
  return childPath.startsWith('/') ? childPath : '/' + childPath;
};

const loadProjects = async () => {
  try {
    const response = await fetch('/api/projects');
    const result = await response.json();
    if (result.success) {
      projectList.value = result.data.map((p: any) => ({
        index: p.route_index,
        title: p.title
      }));
    }
  } catch (error) {
    console.error('Failed to load projects:', error);
  }
};

const activeMenu = computed(() => route.path);

const handleSelect = (index: string) => {
  const slug = toChildPath(index);
  const targetPath = '/project' + (slug ? '/' + slug : '');
  if (route.path === targetPath) {
    nextTick(() => {
      if (mainRef.value) mainRef.value.scrollTop = 0;
    });
    return;
  }
  router.push({ name: 'ProjectDetail', params: { slug } });
};

const ensureDefault = async () => {
  if (route.path === '/project' || route.path === '/project/') {
    await loadProjects();
    if (projectList.value.length > 0) {
      const first = projectList.value[0];
      const slug = toChildPath(first.index);
      router.replace({ name: 'ProjectDetail', params: { slug } });
    }
  }
};

onMounted(async () => {
  await loadProjects();
  await ensureDefault();
});

watch(
  () => route.path,
  () => {
    if (projectList.value.length === 0) {
      loadProjects();
    }
    ensureDefault();
    nextTick(() => {
      if (mainRef.value) {
        mainRef.value.scrollTop = 0;
      }
    });
  }
);
</script>

<template>
  <div class="project-layout" :class="{ cyberpunk: isCyberpunk }">
    <el-aside width="220px" class="project-aside">
      <div class="aside-header">
        <h2 class="aside-title">项目示例</h2>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="project-menu"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="item in projectList"
          :key="item.index"
          :index="item.index"
        >
          <template #title>
            <span>{{ item.title }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <main class="project-main custom-scrollbar" ref="mainRef">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.project-layout {
  display: flex;
  height: calc(100vh - 60px);
  background: var(--color-bg-base);
}

.project-aside {
  width: 220px;
  background: var(--color-bg-surface);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
}

.aside-header {
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid var(--color-border);
}

.aside-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.project-menu {
  flex: 1;
  border-right: none;
  background: transparent;
}

.project-menu .el-menu-item {
  height: 56px;
  line-height: 56px;
  color: var(--color-text-secondary);
}

.project-menu .el-menu-item:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.project-menu .el-menu-item.is-active {
  background: var(--color-primary-bg-light);
  color: var(--color-primary);
}

.project-main {
  flex: 1;
  overflow-y: auto;
  background: var(--color-bg-base);
}

/* ========== 赛博朋克主题 ========== */
.project-layout.cyberpunk {
  background: var(--color-bg-base);
}

.project-layout.cyberpunk .project-aside {
  background: var(--color-bg-surface);
  border-right: 1px solid var(--color-border);
}

.project-layout.cyberpunk .aside-header {
  border-bottom: 1px solid var(--color-border);
}

.project-layout.cyberpunk .aside-title {
  color: var(--cyber-neon-cyan);
  font-family: var(--cyber-font-mono);
  text-shadow: var(--cyber-glow-cyan-subtle);
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.15rem;
}

.project-layout.cyberpunk .project-menu .el-menu-item {
  color: rgba(255, 255, 255, 0.65);
  font-family: var(--cyber-font-mono);
  border-radius: 0;
  border-left: 2px solid transparent;
  transition: all 0.2s ease;
}

.project-layout.cyberpunk .project-menu .el-menu-item:hover {
  background: var(--color-bg-hover);
  color: var(--cyber-neon-cyan);
  border-left-color: var(--cyber-neon-cyan);
  text-shadow: var(--cyber-glow-cyan-subtle);
}

.project-layout.cyberpunk .project-menu .el-menu-item.is-active {
  background: rgba(0, 240, 255, 0.06);
  color: var(--cyber-neon-pink);
  border-left-color: var(--cyber-neon-pink);
  text-shadow: var(--cyber-glow-pink-subtle);
}

.project-layout.cyberpunk .project-main {
  background: var(--color-bg-base);
}

/* 覆盖 el-menu 的默认样式 */
.project-layout.cyberpunk :deep(.el-menu) {
  background-color: transparent;
  border-right: none;
}

.project-layout.cyberpunk :deep(.el-menu-item) {
  background-color: transparent;
}
</style>
