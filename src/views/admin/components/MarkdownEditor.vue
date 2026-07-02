<script setup>
import { ref, computed, watch } from 'vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);

const props = defineProps({
  type: { type: String, required: true },
  data: { type: Object, default: null }
});

const emit = defineEmits(['close', 'save']);

const isEditing = computed(() => !!props.data);
const isArticle = computed(() => props.type === 'articles');

const form = ref({
  title: '',
  excerpt: '',
  tags: [],
  newTag: '',
  readTime: '',
  date: new Date().toISOString().split('T')[0],
  content: ''
});

const noteCategories = ['学习', '工作', '生活', '其他'];

watch(() => props.data, (newData) => {
  if (newData) {
    form.value = {
      title: newData.title || '',
      excerpt: newData.excerpt || '',
      tags: Array.isArray(newData.tags) ? newData.tags : [],
      newTag: '',
      readTime: newData.readTime || '',
      date: newData.date || new Date().toISOString().split('T')[0],
      content: newData.content || ''
    };
  }
}, { immediate: true });

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const result = hljs.highlight(str, { language: lang, ignoreIllegals: true });
        return '<pre class="hljs"><code>' + result.value + '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

const previewHtml = computed(() => {
  return md.render(form.value.content || '');
});

const addTag = () => {
  if (form.value.newTag.trim() && !form.value.tags.includes(form.value.newTag.trim())) {
    form.value.tags.push(form.value.newTag.trim());
    form.value.newTag = '';
  }
};

const removeTag = (tag) => {
  const index = form.value.tags.indexOf(tag);
  if (index > -1) {
    form.value.tags.splice(index, 1);
  }
};

const insertImageMarkdown = (imageUrl) => {
  const textarea = document.getElementById('content-editor');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = form.value.content;
  const before = text.substring(0, start);
  const after = text.substring(end);
  const imageMarkdown = `![图片](${imageUrl})`;
  form.value.content = before + imageMarkdown + after;
};

const handleContentImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const token = localStorage.getItem('admin_token');
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/lx-api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const result = await response.json();
    if (result.success) {
      insertImageMarkdown(result.data.url);
    }
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

const handleSave = () => {
  if (!form.value.title.trim()) {
    alert('请输入标题');
    return;
  }

  const data = {
    type: props.type,
    title: form.value.title,
    content: form.value.content,
    date: form.value.date
  };

  if (isArticle.value) {
    data.excerpt = form.value.excerpt;
    data.tags = form.value.tags;
    data.readTime = form.value.readTime;
  } else {
    data.category = form.value.category;
  }

  emit('save', data);
};

const insertCodeBlock = () => {
  const textarea = document.getElementById('content-editor');
  const start = textarea.selectionStart;
  const text = form.value.content;
  const before = text.substring(0, start);
  const after = text.substring(start);
  const codeBlock = '\n```javascript\n// 代码\n```\n';
  form.value.content = before + codeBlock + after;
};

const insertHeading = () => {
  const textarea = document.getElementById('content-editor');
  const start = textarea.selectionStart;
  const text = form.value.content;
  const before = text.substring(0, start);
  const after = text.substring(start);
  const heading = '\n## 标题\n';
  form.value.content = before + heading + after;
};
</script>

<template>
  <div class="editor-overlay">
    <div class="editor-modal">
      <header class="editor-header">
        <h2>{{ isEditing ? '编辑' : '新建' }}{{ isArticle ? '文章' : '笔记' }}</h2>
        <button class="close-btn" @click="emit('close')">×</button>
      </header>

      <div class="editor-body">
        <div class="form-section">
          <div class="form-row">
            <div class="form-item">
              <label>标题 *</label>
              <input v-model="form.title" type="text" placeholder="请输入标题" />
            </div>
          </div>

          <div v-if="isArticle" class="form-row">
            <div class="form-item">
              <label>发布日期</label>
              <input v-model="form.date" type="date" />
            </div>
            <div class="form-item">
              <label>阅读时间</label>
              <input v-model="form.readTime" type="text" placeholder="例如：10分钟" />
            </div>
          </div>
          <div v-else class="form-row">
            <div class="form-item">
              <label>分类</label>
              <select v-model="form.category">
                <option v-for="cat in noteCategories" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>
            </div>
            <div class="form-item">
              <label>日期</label>
              <input v-model="form.date" type="date" />
            </div>
          </div>

          <div v-if="isArticle" class="form-row">
            <div class="form-item full-width">
              <label>标签</label>
              <div class="tags-input">
                <input
                  v-model="form.newTag"
                  type="text"
                  placeholder="输入标签后回车添加"
                  @keyup.enter="addTag"
                />
                <div class="tags-list">
                  <span v-for="tag in form.tags" :key="tag" class="tag-item">
                    {{ tag }}
                    <button @click="removeTag(tag)">×</button>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="isArticle" class="form-row">
            <div class="form-item full-width">
              <label>摘要</label>
              <textarea v-model="form.excerpt" rows="2" placeholder="文章摘要" />
            </div>
          </div>
        </div>

        <div class="editor-section">
          <div class="editor-toolbar">
            <span class="toolbar-title">Markdown 内容</span>
            <div class="toolbar-actions">
              <button type="button" @click="insertHeading">标题</button>
              <button type="button" @click="insertCodeBlock">代码块</button>
              <label class="upload-btn">
                插入图片
                <input type="file" accept="image/*" @change="handleContentImageUpload" hidden />
              </label>
            </div>
          </div>

          <div class="editor-panes">
            <div class="editor-pane">
              <div class="pane-header">编辑区</div>
              <textarea
                id="content-editor"
                v-model="form.content"
                placeholder="在这里输入 Markdown 内容..."
                class="content-textarea"
              ></textarea>
            </div>
            <div class="editor-pane">
              <div class="pane-header">预览区</div>
              <div class="preview-content markdown-body" v-html="previewHtml"></div>
            </div>
          </div>
        </div>
      </div>

      <footer class="editor-footer">
        <button class="cancel-btn" @click="emit('close')">取消</button>
        <button class="save-btn" @click="handleSave">保存</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.editor-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.editor-modal {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid #eee;
}

.editor-header h2 {
  margin: 0;
  font-size: 20px;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
}

.editor-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 30px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.form-item {
  flex: 1;
  min-width: 200px;
}

.form-item.full-width {
  flex-basis: 100%;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.form-item input,
.form-item select,
.form-item textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

.form-item input:focus,
.form-item select:focus,
.form-item textarea:focus {
  border-color: #667eea;
  outline: none;
}

.tags-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tags-input input {
  width: 100%;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: #e8f4fd;
  color: #2196f3;
  border-radius: 14px;
  font-size: 12px;
}

.tag-item button {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 14px;
}

.upload-btn {
  padding: 6px 12px;
  background: #f0f0f0;
  color: #666;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.editor-section {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.editor-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.toolbar-title {
  font-weight: 600;
  color: #333;
}

.toolbar-actions {
  display: flex;
  gap: 10px;
}

.toolbar-actions button {
  padding: 6px 12px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.toolbar-actions button:hover {
  background: #e8e8e8;
}

.editor-panes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  height: 400px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.editor-pane {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
  min-height: 0;
  overflow: hidden;
}

.editor-pane:last-child {
  border-right: none;
}

.pane-header {
  padding: 8px 12px;
  background: #f8f9fa;
  border-bottom: 1px solid #ddd;
  font-size: 12px;
  font-weight: 600;
  color: #666;
}

.content-textarea {
  flex: 1;
  padding: 12px;
  border: none;
  resize: none;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.6;
  overflow-y: auto;
  min-height: 0;
}

.content-textarea:focus {
  outline: none;
}

.preview-content {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  min-height: 0;
  background: #ffffff;
  font-size: 14px;
  line-height: 1.6;
  color: #333333;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3) {
  margin-top: 16px;
  margin-bottom: 8px;
}

.markdown-body :deep(pre) {
  background: #282c34;
  color: #abb2bf;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
}

.markdown-body :deep(code) {
  font-family: 'Consolas', 'Monaco', monospace;
}

.editor-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 20px 30px;
  border-top: 1px solid #eee;
}

.cancel-btn,
.save-btn {
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.cancel-btn {
  background: #f0f0f0;
  color: #666;
}

.save-btn {
  background: #667eea;
  color: white;
}

.save-btn:hover {
  background: #5a6fd8;
}
</style>
