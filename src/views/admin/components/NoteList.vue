<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['edit', 'delete']);

const notes = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const filteredNotes = ref([]);

const loadNotes = async () => {
  loading.value = true;
  try {
    const response = await fetch('/lx-api/notes');
    const result = await response.json();
    if (result.success) {
      notes.value = result.data;
      filteredNotes.value = result.data;
    }
  } catch (error) {
    console.error('Failed to load notes:', error);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  if (!searchQuery.value) {
    filteredNotes.value = notes.value;
  } else {
    const query = searchQuery.value.toLowerCase();
    filteredNotes.value = notes.value.filter(n => 
      (n.title && n.title.toLowerCase().includes(query)) ||
      (n.content && n.content.toLowerCase().includes(query))
    );
  }
};

const handleEdit = (note) => {
  emit('edit', note);
};

const handleDelete = (id) => {
  emit('delete', id);
};

onMounted(loadNotes);
</script>

<template>
  <div class="note-list">
    <div class="toolbar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索笔记..."
        @keyup="handleSearch"
        class="search-input"
      />
    </div>

    <div v-if="loading" class="loading">
      <p>加载中...</p>
    </div>

    <div v-else class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>标题</th>
            <th>分类</th>
            <th>内容预览</th>
            <th>日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="note in filteredNotes" :key="note.id">
            <td>{{ note.id }}</td>
            <td class="title-cell">{{ note.title || '无标题' }}</td>
            <td>
              <span class="category-tag">{{ note.category }}</span>
            </td>
            <td class="content-preview">
              {{ note.content?.slice(0, 80) }}...
            </td>
            <td>{{ note.date }}</td>
            <td class="action-cell">
              <button class="edit-btn" @click="handleEdit(note)">编辑</button>
              <button class="delete-btn" @click="handleDelete(note.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredNotes.length === 0" class="empty-state">
        <p>暂无笔记，点击右上角"新建笔记"开始创建</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.note-list {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.toolbar {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

.search-input:focus {
  border-color: #667eea;
  outline: none;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
  font-size: 13px;
  text-transform: uppercase;
}

.data-table tbody tr:hover {
  background: #f8f9fa;
}

.title-cell {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #2c3e50;
  font-weight: 500;
}

.category-tag {
  padding: 4px 10px;
  background: #e8f4fd;
  color: #2196f3;
  border-radius: 12px;
  font-size: 12px;
}

.content-preview {
  max-width: 300px;
  color: #666;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  transition: all 0.2s;
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
