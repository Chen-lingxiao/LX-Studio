<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  data: { type: Object, default: null }
});

const emit = defineEmits(['close', 'save']);

const isEditing = computed(() => !!props.data);

const defaultConfig = () => ({
  name: '',
  url: '',
  description: '',
  techStack: [],
  newTech: '',
  responsibilities: [{ title: '', content: '' }],
  github: '',
  gitee: '',
  images: []
});

const form = ref({
  title: '',
  route_index: '',
  description: '',
  config: defaultConfig()
});

const parseConfig = (config) => {
  if (!config) return defaultConfig();
  try {
    if (typeof config === 'string') return JSON.parse(config);
    return config;
  } catch (e) {
    return defaultConfig();
  }
};

watch(() => props.data, (newData) => {
  if (newData) {
    const configObj = parseConfig(newData.config);
    form.value = {
      title: newData.title || '',
      route_index: newData.route_index || '',
      description: newData.description || '',
      config: {
        name: configObj.name || newData.title || '',
        url: configObj.url || '',
        description: configObj.description || '',
        techStack: Array.isArray(configObj.techStack) ? [...configObj.techStack] : [],
        newTech: '',
        responsibilities: configObj.responsibilities?.length
          ? configObj.responsibilities.map(r => ({ ...r }))
          : [{ title: '', content: '' }],
        github: configObj.github || '',
        gitee: configObj.gitee || '',
        images: Array.isArray(configObj.images) ? [...configObj.images] : []
      }
    };
  } else {
    form.value = {
      title: '',
      route_index: '',
      description: '',
      config: defaultConfig()
    };
  }
}, { immediate: true });

const addTech = () => {
  const tech = form.value.config.newTech.trim();
  if (tech && !form.value.config.techStack.includes(tech)) {
    form.value.config.techStack.push(tech);
    form.value.config.newTech = '';
  }
};

const removeTech = (index) => {
  form.value.config.techStack.splice(index, 1);
};

const addResponsibility = () => {
  form.value.config.responsibilities.push({ title: '', content: '' });
};

const removeResponsibility = (index) => {
  if (form.value.config.responsibilities.length > 1) {
    form.value.config.responsibilities.splice(index, 1);
  }
};

const addImage = () => {
  form.value.config.images.push('');
};

const removeImage = (index) => {
  form.value.config.images.splice(index, 1);
};

const uploadFile = async (file) => {
  const token = localStorage.getItem('admin_token');
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/lx-api/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  const result = await response.json();
  if (result.success) {
    return result.data.url;
  }
  throw new Error('上传失败');
};

const handleBatchUpload = async (event) => {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  try {
    for (const file of files) {
      try {
        const url = await uploadFile(file);
        form.value.config.images.push(url);
      } catch (e) {
        console.error('单文件上传失败:', e);
      }
    }
  } catch (error) {
    console.error('批量上传失败:', error);
    alert('图片上传失败');
  } finally {
    event.target.value = '';
  }
};

const handleSingleUpload = async (event, index) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const url = await uploadFile(file);
    form.value.config.images[index] = url;
  } catch (error) {
    console.error('上传失败:', error);
    alert('图片上传失败');
  } finally {
    event.target.value = '';
  }
};

const handleSave = () => {
  if (!form.value.title.trim()) {
    alert('请填写项目标题');
    return;
  }
  if (!form.value.route_index.trim()) {
    alert('请填写路由路径');
    return;
  }
  if (!form.value.config.name?.trim()) {
    alert('请填写项目名称');
    return;
  }

  const configData = {
    name: form.value.config.name,
    url: form.value.config.url,
    description: form.value.config.description,
    techStack: form.value.config.techStack,
    responsibilities: form.value.config.responsibilities.filter(r => r.title?.trim()),
    github: form.value.config.github,
    gitee: form.value.config.gitee,
    images: form.value.config.images.filter(img => img?.trim())
  };

  emit('save', {
    type: 'projects',
    title: form.value.title,
    route_index: form.value.route_index,
    description: form.value.description,
    config: JSON.stringify(configData)
  });
};
</script>

<template>
  <div class="editor-overlay">
    <div class="editor-modal">
      <header class="editor-header">
        <h2>{{ isEditing ? '编辑项目' : '新建项目' }}</h2>
        <button class="close-btn" @click="emit('close')">×</button>
      </header>

      <div class="editor-body">
        <section class="form-section">
          <h3 class="section-title">基础信息</h3>
          <div class="form-row">
            <div class="form-item">
              <label>项目标题 *</label>
              <input v-model="form.title" type="text" placeholder="项目名称（如：校园消防栓可视化管理系统）" />
            </div>
            <div class="form-item">
              <label>路由路径 *</label>
              <input v-model="form.route_index" type="text" placeholder="如: /project/digital-campus" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-item full-width">
              <label>简短描述</label>
              <textarea v-model="form.description" rows="2" placeholder="项目简短描述（用于列表展示）"></textarea>
            </div>
          </div>
        </section>

        <section class="form-section">
          <h3 class="section-title">项目详情</h3>
          <div class="form-row">
            <div class="form-item">
              <label>项目名称</label>
              <input v-model="form.config.name" type="text" placeholder="显示在详情页的项目名称" />
            </div>
            <div class="form-item">
              <label>项目链接</label>
              <input v-model="form.config.url" type="text" placeholder="项目在线访问地址" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-item full-width">
              <label>项目详细描述</label>
              <textarea v-model="form.config.description" rows="3" placeholder="详细描述项目内容、功能和技术特点"></textarea>
            </div>
          </div>
        </section>

        <section class="form-section">
          <h3 class="section-title">技术栈</h3>
          <div class="form-row">
            <div class="form-item full-width">
              <div class="tags-input">
                <div class="tags-input-row">
                  <input
                    v-model="form.config.newTech"
                    type="text"
                    placeholder="输入技术名称后回车添加（如：Vue 3）"
                    @keyup.enter="addTech"
                  />
                  <button type="button" class="primary-btn" @click="addTech">添加</button>
                </div>
                <div class="tags-list" v-if="form.config.techStack.length > 0">
                  <span v-for="(tech, index) in form.config.techStack" :key="index" class="tag-item">
                    {{ tech }}
                    <button type="button" @click="removeTech(index)">×</button>
                  </span>
                </div>
                <div v-else class="empty-tip">暂无技术栈，添加一些技术标签</div>
              </div>
            </div>
          </div>
        </section>

        <section class="form-section">
          <h3 class="section-title">
            核心职责与成果
            <button type="button" class="primary-btn small-btn" @click="addResponsibility">+ 添加</button>
          </h3>
          <div class="responsibility-list">
            <div v-for="(resp, index) in form.config.responsibilities" :key="index" class="responsibility-item">
              <div class="item-header">
                <span class="item-label">第 {{ index + 1 }} 项</span>
                <button
                  type="button"
                  class="danger-btn small-btn"
                  @click="removeResponsibility(index)"
                  v-if="form.config.responsibilities.length > 1"
                >删除</button>
              </div>
              <div class="form-item">
                <label>标题</label>
                <input v-model="resp.title" type="text" placeholder="如：三维可视化引擎开发" />
              </div>
              <div class="form-item">
                <label>详细内容</label>
                <textarea v-model="resp.content" rows="4" placeholder="描述这部分工作的具体内容（支持 HTML 标签如 <br/> 换行）"></textarea>
              </div>
            </div>
          </div>
        </section>

        <section class="form-section">
          <h3 class="section-title">项目链接</h3>
          <div class="form-row">
            <div class="form-item">
              <label>GitHub 仓库</label>
              <input v-model="form.config.github" type="text" placeholder="如：https://github.com/user/repo" />
            </div>
            <div class="form-item">
              <label>Gitee 仓库</label>
              <input v-model="form.config.gitee" type="text" placeholder="如：https://gitee.com/user/repo" />
            </div>
          </div>
        </section>

        <section class="form-section">
          <h3 class="section-title">
            项目截图
            <div class="section-actions">
              <label class="upload-label">
                批量上传
                <input type="file" accept="image/*" multiple @change="handleBatchUpload" hidden />
              </label>
              <button type="button" class="primary-btn small-btn" @click="addImage">+ 添加路径</button>
            </div>
          </h3>
          <div class="image-list">
            <div v-for="(img, index) in form.config.images" :key="index" class="image-item">
              <div class="item-header">
                <span class="item-label">截图 {{ index + 1 }}</span>
                <button type="button" class="danger-btn small-btn" @click="removeImage(index)">删除</button>
              </div>
              <div class="image-upload-row">
                <div class="image-preview" v-if="img">
                  <img :src="img" alt="预览" />
                </div>
                <div class="upload-controls">
                  <label class="upload-label">
                    选择图片
                    <input type="file" accept="image/*" @change="(e) => handleSingleUpload(e, index)" hidden />
                  </label>
                  <input v-model="form.config.images[index]" type="text" placeholder="图片路径（上传后自动填充）" />
                </div>
              </div>
            </div>
            <div v-if="form.config.images.length === 0" class="empty-tip">
              暂无截图，点击上方「批量上传」或「+ 添加路径」按钮添加
            </div>
          </div>
        </section>
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
  max-width: 1000px;
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #f0f0f0;
}

.editor-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px 30px;
}

.form-section {
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.form-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 14px;
}

.form-row:last-child {
  margin-bottom: 0;
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
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #555;
}

.form-item input,
.form-item textarea {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;
  font-family: inherit;
}

.form-item input:focus,
.form-item textarea:focus {
  border-color: #667eea;
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.tags-input {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tags-input-row {
  display: flex;
  gap: 8px;
}

.tags-input-row input {
  flex: 1;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  background: #667eea;
  color: white;
  border-radius: 20px;
  font-size: 13px;
}

.tag-item button {
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  padding: 0;
}

.tag-item button:hover {
  background: rgba(255, 255, 255, 0.5);
}

.empty-tip {
  text-align: center;
  padding: 16px;
  color: #999;
  font-size: 13px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px dashed #ddd;
}

.responsibility-list,
.image-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.responsibility-item,
.image-item {
  background: #f8f9fa;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid #e8e8e8;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.item-label {
  font-size: 13px;
  color: #667eea;
  font-weight: 500;
}

.primary-btn,
.danger-btn,
.upload-label {
  padding: 6px 14px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.primary-btn:hover,
.upload-label:hover {
  background: #5a6fd8;
}

.primary-btn.small-btn,
.danger-btn.small-btn {
  padding: 4px 10px;
  font-size: 12px;
}

.danger-btn {
  background: #ff5252;
}

.danger-btn:hover {
  background: #e53935;
}

.upload-label {
  cursor: pointer;
}

.image-upload-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.image-preview {
  width: 120px;
  height: 90px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: white;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-controls {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.upload-controls input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
}

.editor-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 30px;
  border-top: 1px solid #eee;
}

.cancel-btn,
.save-btn {
  padding: 10px 24px;
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
