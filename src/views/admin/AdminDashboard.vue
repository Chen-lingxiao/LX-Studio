<script setup>
import { ref, watch, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import ArticleList from './components/ArticleList.vue';
import NoteList from './components/NoteList.vue';
import ProjectList from './components/ProjectList.vue';
import MarkdownEditor from './components/MarkdownEditor.vue';
import ProjectEditor from './components/ProjectEditor.vue';

const activeTab = ref(localStorage.getItem('admin_active_tab') || 'articles');

watch(activeTab, (val) => {
  localStorage.setItem('admin_active_tab', val);
});
const editingItem = ref(null);
const showEditor = ref(false);
const showProjectEditor = ref(false);
const editingProject = ref(null);

const tabs = [
  { key: 'articles', label: '文章管理' },
  { key: 'notes', label: '笔记管理' },
  { key: 'projects', label: '项目管理' }
];

const handleNew = () => {
  if (activeTab.value === 'projects') {
    editingProject.value = null;
    showProjectEditor.value = true;
    return;
  }
  editingItem.value = null;
  showEditor.value = true;
};

const handleEdit = (item) => {
  editingItem.value = item;
  showEditor.value = true;
};

const handleEditProject = (project) => {
  editingProject.value = project;
  showProjectEditor.value = true;
};

const handleDelete = async (id, type) => {
  try {
    await ElMessageBox.confirm('确定要删除这篇内容吗？此操作不可恢复。', '删除确认', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning'
    });

    const token = localStorage.getItem('admin_token');
    const response = await fetch(`/lx-api/${type}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();
    if (result.success) {
      ElMessage.success('删除成功');
      window.location.reload();
    } else {
      ElMessage.error(result.error || '删除失败');
    }
  } catch (err) {
    if (err !== 'cancel') {
      ElMessage.error('删除失败');
    }
  }
};

const handleSave = async (data) => {
  try {
    const token = localStorage.getItem('admin_token');
    const url = editingItem.value 
      ? `/lx-api/${data.type}/${editingItem.value.id}` 
      : `/lx-api/${data.type}`;
    const method = editingItem.value ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.success) {
      ElMessage.success('保存成功');
      showEditor.value = false;
      editingItem.value = null;
      window.location.reload();
    } else {
      ElMessage.error(result.error || '保存失败');
    }
  } catch (error) {
    ElMessage.error('保存失败');
  }
};

const handleProjectSave = async (data) => {
  try {
    const token = localStorage.getItem('admin_token');
    const url = editingProject.value
      ? `/lx-api/projects/${editingProject.value.id}`
      : '/lx-api/projects';
    const method = editingProject.value ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.success) {
      ElMessage.success('保存成功');
      showProjectEditor.value = false;
      editingProject.value = null;
      window.location.reload();
    } else {
      ElMessage.error(result.error || '保存失败');
    }
  } catch (error) {
    ElMessage.error('保存失败');
  }
};

const handleLogout = () => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_username');
  window.location.reload();
};

const userInfo = ref({ username: '' });

onMounted(() => {
  userInfo.value.username = localStorage.getItem('admin_username') || '';
});
</script>

<template>
  <div class="admin-container">
    <aside class="admin-sidebar">
      <div class="logo">
        <h2>LX-Studio</h2>
        <span>内容管理系统</span>
      </div>
      <nav class="nav-menu">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="['nav-item', { active: activeTab === tab.key }]"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </nav>
      <div class="sidebar-footer">
        <div class="user-info">
          <span>{{ userInfo.username }}</span>
        </div>
        <button class="logout-btn" @click="handleLogout">退出登录</button>
      </div>
    </aside>

    <main class="admin-main">
      <header class="main-header">
        <h1>{{ activeTab === 'articles' ? '文章管理' : activeTab === 'notes' ? '笔记管理' : '项目管理' }}</h1>
        <button class="new-btn" @click="handleNew">
          新建{{ activeTab === 'articles' ? '文章' : activeTab === 'notes' ? '笔记' : '项目' }}
        </button>
      </header>

      <div class="main-content">
        <ArticleList
          v-if="activeTab === 'articles'"
          @edit="handleEdit"
          @delete="(id) => handleDelete(id, 'articles')"
        />
        <NoteList
          v-if="activeTab === 'notes'"
          @edit="handleEdit"
          @delete="(id) => handleDelete(id, 'notes')"
        />
        <ProjectList
          v-if="activeTab === 'projects'"
          @edit="handleEditProject"
          @delete="(id) => handleDelete(id, 'projects')"
        />
      </div>
    </main>

    <MarkdownEditor
      v-if="showEditor"
      :type="activeTab === 'articles' ? 'articles' : 'notes'"
      :data="editingItem"
      @close="showEditor = false"
      @save="handleSave"
    />

    <ProjectEditor
      v-if="showProjectEditor"
      :data="editingProject"
      @close="showProjectEditor = false"
      @save="handleProjectSave"
    />
  </div>
</template>

<style scoped>
.admin-container {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}

.admin-sidebar {
  width: 240px;
  background: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
}

.logo {
  padding: 30px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.logo h2 {
  margin: 0;
  font-size: 20px;
}

.logo span {
  font-size: 12px;
  opacity: 0.7;
}

.nav-menu {
  flex: 1;
  padding: 20px 10px;
}

.nav-item {
  display: block;
  width: 100%;
  padding: 14px 20px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 8px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 600;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  font-size: 13px;
  margin-bottom: 10px;
  opacity: 0.8;
}

.logout-btn {
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.main-header h1 {
  margin: 0;
  font-size: 24px;
  color: #2c3e50;
}

.new-btn {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.new-btn:hover {
  background: #5a6fd8;
}

.main-content {
  flex: 1;
  padding: 30px;
  overflow: auto;
}
</style>
