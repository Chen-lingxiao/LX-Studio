<script setup>
import { ref, onMounted, computed } from 'vue';

const emit = defineEmits(['edit', 'delete']);

const projects = ref([]);
const loading = ref(true);
const searchQuery = ref('');

const parseConfig = (config) => {
  if (!config) return {};
  try {
    return typeof config === 'string' ? JSON.parse(config) : config;
  } catch (e) {
    return {};
  }
};

const projectList = computed(() => {
  return projects.value.map(p => {
    const config = parseConfig(p.config);
    return {
      ...p,
      configObj: config,
      displayName: config.name || p.title || '',
      firstImage: (config.images && config.images[0]) || '',
      techStack: config.techStack || [],
      responsibilitiesCount: (config.responsibilities || []).length,
      hasGithub: !!config.github,
      hasGitee: !!config.gitee
    };
  });
});

const filteredProjects = computed(() => {
  if (!searchQuery.value) return projectList.value;
  const query = searchQuery.value.toLowerCase();
  return projectList.value.filter(p =>
    (p.title && p.title.toLowerCase().includes(query)) ||
    (p.displayName && p.displayName.toLowerCase().includes(query)) ||
    (p.route_index && p.route_index.toLowerCase().includes(query)) ||
    (p.description && p.description.toLowerCase().includes(query)) ||
    (p.configObj.description && p.configObj.description.toLowerCase().includes(query)) ||
    (p.techStack.length > 0 && p.techStack.some(t => t.toLowerCase().includes(query)))
  );
});

const loadProjects = async () => {
  loading.value = true;
  try {
    const response = await fetch('/lx-api/projects');
    const result = await response.json();
    if (result.success) {
      projects.value = result.data;
    }
  } catch (error) {
    console.error('Failed to load projects:', error);
  } finally {
    loading.value = false;
  }
};

const handleEdit = (project) => {
  emit('edit', project);
};

const handleDelete = (id) => {
  emit('delete', id);
};

onMounted(loadProjects);
</script>

<template>
  <div class="project-list">
    <div class="toolbar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索项目标题、名称、路由、技术栈..."
        class="search-input"
      />
    </div>

    <div v-if="loading" class="loading">
      <p>加载中...</p>
    </div>

    <div v-else class="table-container">
      <table class="data-table">
        <colgroup>
          <col style="width: 60px" />
          <col style="width: 200px" />
          <col style="width: 140px" />
          <col style="width: 260px" />
          <col style="width: 100px" />
          <col style="width: 180px" />
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>项目标题</th>
            <th>路由</th>
            <th>技术栈</th>
            <th>职责数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in filteredProjects" :key="project.id">
            <td>{{ project.id }}</td>
            <td class="title-cell">
              <div class="title-main">{{ project.title }}</div>
              <div class="title-desc" v-if="project.description">{{ project.description.slice(0, 30) }}{{ project.description.length > 30 ? '...' : '' }}</div>
            </td>
            <td class="route-cell">{{ project.route_index }}</td>
            <td class="tech-cell">
              <template v-if="project.techStack.length > 0">
                <span v-for="(tech, idx) in project.techStack.slice(0, 4)" :key="tech" class="tech-tag">{{ tech }}</span>
                <span v-if="project.techStack.length > 4" class="tech-tag more">+{{ project.techStack.length - 4 }}</span>
              </template>
              <span v-else class="empty-cell">-</span>
            </td>
            <td class="count-cell">
              <span v-if="project.responsibilitiesCount > 0" class="count-badge">{{ project.responsibilitiesCount }}</span>
              <span v-else class="empty-cell">-</span>
            </td>
            <td class="action-cell">
              <button class="edit-btn" @click="handleEdit(project)">编辑</button>
              <button class="delete-btn" @click="handleDelete(project.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredProjects.length === 0" class="empty-state">
        <p>暂无项目，点击右上角「新建项目」开始创建</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-list {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;
}

.search-input {
  width: 100%;
  max-width: 480px;
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

.search-input:focus {
  border-color: #667eea;
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 0 14px;
  text-align: left;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
  line-height: 1.4;
}

.data-table th {
  height: 44px;
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
  font-size: 13px;
  white-space: nowrap;
  line-height: 44px;
  padding: 0 14px;
}

.data-table td {
  height: 64px;
  font-size: 13px;
}

.data-table tbody tr:hover {
  background: #f8f9fa;
}

.title-cell {
  max-width: 200px;
}

.title-main {
  color: #2c3e50;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-desc {
  color: #888;
  font-size: 12px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.route-cell {
  font-family: 'Consolas', 'Monaco', monospace;
  color: #667eea;
  font-size: 12px;
  white-space: nowrap;
  line-height: 64px;
}

.tech-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 64px;
}

.tech-cell .tech-tag,
.tech-cell .empty-cell {
  vertical-align: middle;
  margin: 0;
}

.tech-cell .tech-tag + .tech-tag {
  margin-left: 6px;
}

.tech-tag {
  display: inline-block;
  padding: 3px 10px;
  background: #eef1ff;
  color: #667eea;
  border-radius: 10px;
  font-size: 12px;
  line-height: 1.4;
  height: 22px;
  box-sizing: border-box;
}

.tech-tag.more {
  background: #f0f0f0;
  color: #888;
}

.count-cell {
  text-align: center;
}

.count-badge {
  display: inline-block;
  min-width: 24px;
  padding: 3px 8px;
  background: #667eea;
  color: white;
  border-radius: 10px;
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
}

.empty-cell {
  color: #bbb;
  font-size: 13px;
}

.action-cell {
  white-space: nowrap;
}

.edit-btn,
.delete-btn {
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  margin-right: 8px;
  transition: background 0.2s;
}

.edit-btn {
  background: #667eea;
  color: white;
}

.edit-btn:hover {
  background: #5a6fd8;
}

.delete-btn {
  background: #ff5252;
  color: white;
}

.delete-btn:hover {
  background: #e53935;
}

.empty-state {
  text-align: center;
  padding: 60px;
  color: #999;
}
</style>
