<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['edit', 'delete']);

const articles = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const filteredArticles = ref([]);

const loadArticles = async () => {
  loading.value = true;
  try {
    const response = await fetch('/api/articles');
    const result = await response.json();
    if (result.success) {
      articles.value = result.data;
      filteredArticles.value = result.data;
    }
  } catch (error) {
    console.error('Failed to load articles:', error);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  if (!searchQuery.value) {
    filteredArticles.value = articles.value;
  } else {
    const query = searchQuery.value.toLowerCase();
    filteredArticles.value = articles.value.filter(a => 
      a.title.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query)
    );
  }
};

const handleEdit = (article) => {
  emit('edit', article);
};

const handleDelete = (id) => {
  emit('delete', id);
};

onMounted(loadArticles);
</script>

<template>
  <div class="article-list">
    <div class="toolbar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索文章..."
        @keyup="handleSearch"
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
          <col style="width: 350px" />
          <col style="width: 300px" />
          <col style="width: 120px" />
          <col style="width: 160px" />
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>标题</th>
            <th>标签</th>
            <th>日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in filteredArticles" :key="article.id">
            <td>{{ article.id }}</td>
            <td class="title-cell">{{ article.title }}</td>
            <td class="tags-cell">
              <span v-for="tag in article.tags.slice(0, 3)" :key="tag" class="tag">
                {{ tag }}
              </span>
            </td>
            <td class="date-cell">{{ article.date }}</td>
            <td class="action-cell">
              <button class="edit-btn" @click="handleEdit(article)">编辑</button>
              <button class="delete-btn" @click="handleDelete(article.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredArticles.length === 0" class="empty-state">
        <p>暂无文章，点击右上角"新建文章"开始创建</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-list {
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
  text-transform: none;
}

.data-table td {
  height: 60px;
  font-size: 13px;
}

.data-table tbody tr:hover {
  background: #f8f9fa;
}

.title-cell {
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #2c3e50;
  font-weight: 500;
  line-height: 60px;
}

.tags-cell {
  white-space: nowrap;
  line-height: 60px;
}

.tags-cell .tag {
  vertical-align: middle;
  line-height: 1.4;
  margin: 0;
}

.tags-cell .tag + .tag {
  margin-left: 6px;
}

.tag {
  display: inline-block;
  padding: 3px 10px;
  background: #eef1ff;
  color: #667eea;
  border-radius: 10px;
  font-size: 12px;
  height: 22px;
  box-sizing: border-box;
}

.date-cell {
  line-height: 60px;
  color: #666;
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
