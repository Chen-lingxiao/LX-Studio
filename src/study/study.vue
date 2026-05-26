<template>
  <div class="study-layout">
    <!-- 左侧菜单 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>学习笔记</h2>
      </div>
      <div class="sidebar-menu">
        <el-menu :default-active="currentPath" mode="vertical" @select="handleMenuSelect">
          <template v-for="(group, groupIndex) in studyMenu" :key="groupIndex">
            <el-sub-menu :index="group.title">
              <template #title>
                <i class="el-icon-folder-opened"></i>
                <span>{{ group.title }}</span>
              </template>
              <el-menu-item v-for="(item, itemIndex) in group.children" :key="itemIndex" :index="item.path">
                <i class="el-icon-document"></i>
                <span>{{ item.title }}</span>
              </el-menu-item>
            </el-sub-menu>
          </template>
        </el-menu>
      </div>
    </aside>

    <!-- 中间内容：100% 占满剩余高度 + 内部滚动 -->
    <main class="content-area">
      <div class="content-header">
        <h1>{{ currentTitle }}</h1>
      </div>
      <div v-if="loading" class="loading-content">
        <el-icon class="is-loading">
          <Loading />
        </el-icon>
        <span>加载中...</span>
      </div>
      <div v-else class="content-body" v-html="renderedContent"></div>
    </main>

    <!-- 右侧大纲 -->
    <aside class="outline-panel">
      <div class="outline-header">
        <h3>大纲</h3>
      </div>
      <div class="outline-content">
        <el-tree :data="outlineData" :props="treeProps" :expand-on-click-node="false"
          @node-click="scrollToAnchor"></el-tree>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import { studyMenu } from './config'
import MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'

const currentPath = ref('/docs/frontend/HTML.md')
const currentTitle = ref('HTML')
const renderedContent = ref('')
const outlineData = ref([])
const loading = ref(false)

const treeProps = { label: 'title', children: 'children' }

// 开启 HTML 渲染，支持语雀 font 颜色
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
})

md.use(container, 'color1', {
  render: (tokens, idx) => tokens[idx].nesting === 1
    ? '<div class="note-block color1"><div class="note-content">'
    : '</div></div>'
})
md.use(container, 'color4', {
  render: (tokens, idx) => tokens[idx].nesting === 1
    ? '<div class="note-block color4"><div class="note-content">'
    : '</div></div>'
})
md.use(container, 'danger', {
  render: (tokens, idx) => tokens[idx].nesting === 1
    ? '<div class="note-block danger"><div class="note-icon">⚠️</div><div class="note-content">'
    : '</div></div>'
})

// 读取 MD
const fileMap = import.meta.glob('/docs/**/*.md', { eager: true, query: '?raw', import: 'default' })

// 提取纯净大纲（过滤 font 标签）
const extractOutline = (content) => {
  const headings = content.match(/^(#{1,3})\s+(.+)$/gm) || []
  const outline = []
  let l1 = null, l2 = null

  headings.forEach(h => {
    const [_, hash, rawTitle] = h.match(/^(#+)\s+(.+)$/) || []
    if (!rawTitle) return
    const level = hash.length
    const title = rawTitle.replace(/<[^>]+>/g, '').trim()
    const id = title.replace(/\W+/g, '-').toLowerCase()

    if (level === 1) {
      l1 = { title, id, children: [] }
      outline.push(l1)
      l2 = null
    } else if (level === 2 && l1) {
      l2 = { title, id, children: [] }
      l1.children.push(l2)
    } else if (level === 3 && l2) {
      l2.children.push({ title, id })
    }
  })
  return outline
}

// 加载 MD
const loadMarkdown = async (path) => {
  currentPath.value = path
  loading.value = true
  const item = studyMenu.flatMap(g => g.children).find(i => i.path === path)
  if (item) currentTitle.value = item.title

  try {
    const content = fileMap[path]
    if (!content) {
      renderedContent.value = `<div class="empty-content">文件不存在：${path}</div>`
      return
    }
    renderedContent.value = md.render(content)
    outlineData.value = extractOutline(content)
  } catch (e) {
    renderedContent.value = `<div class="empty-content">加载失败：${e.message}</div>`
  } finally {
    loading.value = false
  }
}

const handleMenuSelect = (index) => loadMarkdown(index)
const scrollToAnchor = (node) => {
  const el = document.getElementById(node.id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => loadMarkdown(currentPath.value))
</script>

<style scoped>
/* 🔥 核心修复：用 100vh 全屏，不再用 calc 减固定高度，适配顶部导航 */
.study-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* 左侧菜单 */
.sidebar {
  width: 280px;
  background: #f5f5f5;
  border-right: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e6e6e6;
  background: #fff;
  flex-shrink: 0;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
}

.sidebar-menu {
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
}

/* 中间内容：强制占满剩余空间，内部滚动 */
.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  overflow: hidden;
}

.content-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e6e6e6;
  flex-shrink: 0;
}

.content-header h1 {
  margin: 0;
  font-size: 24px;
}

.loading-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
}

/* ✅ 终极修复：内容区域 100% 高度 + 内部滚动 */
.content-body {
  flex: 1;
  padding: 24px;
  line-height: 1.8;
  overflow-y: auto;
  /* 滚动在内容内部，不是全局 */
  color: #606266;
}

/* 右侧大纲 */
.outline-panel {
  width: 240px;
  background: #fafafa;
  border-left: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
}

.outline-header {
  padding: 16px;
  border-bottom: 1px solid #e6e6e6;
  background: #fff;
  flex-shrink: 0;
}

.outline-header h3 {
  margin: 0;
  font-size: 14px;
}

.outline-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

/* 语雀样式 & 代码块全局渲染 */
:deep(font) {
  display: inline;
}

:deep(.note-block) {
  margin: 16px 0;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid;
}

:deep(.note-block.color1) {
  background: #fff7e6;
  border-left-color: #faad14;
}

:deep(.note-block.color4) {
  background: #e6f7ff;
  border-left-color: #1890ff;
}

:deep(.note-block.danger) {
  background: #fff2f0;
  border-left-color: #f5222d;
  display: flex;
  gap: 8px;
}

:deep(h1, h2, h3, h4, h5, h6) {
  color: #303133;
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
}

:deep(h1) {
  font-size: 24px;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
}

:deep(h2) {
  font-size: 20px;
  border-left: 4px solid #409eff;
  padding-left: 12px;
}

:deep(h3) {
  font-size: 18px;
}

:deep(p) {
  margin: 12px 0;
}

:deep(ul, ol) {
  padding-left: 24px;
  margin: 12px 0;
}

:deep(li) {
  margin: 8px 0;
}

:deep(code) {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  color: #e74c3c;
}

:deep(pre) {
  background: #2d2d2d;
  color: #ccc;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0;
}

:deep(pre code) {
  background: transparent;
  color: #ccc;
  padding: 0;
}

/* 树形大纲样式 */
.outline-content :deep(.el-tree-node__content) {
  padding: 4px 8px;
  font-size: 13px;
}

.outline-content :deep(.el-tree-node__label:hover) {
  color: #409eff;
}

.outline-content :deep(.el-tree-node.is-current > .el-tree-node__content) {
  background: #e8f4fd;
}
</style>