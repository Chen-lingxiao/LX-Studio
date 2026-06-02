<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { studyMenu } from '../data/config'
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import java from 'highlight.js/lib/languages/java'
import python from 'highlight.js/lib/languages/python'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import sql from 'highlight.js/lib/languages/sql'
import yaml from 'highlight.js/lib/languages/yaml'
import 'highlight.js/styles/github.css'

// 注册常用语言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('html', html)
hljs.registerLanguage('css', css)
hljs.registerLanguage('java', java)
hljs.registerLanguage('python', python)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('yaml', yaml)

// 状态管理
const activeMenu = ref('')
const markdownContent = ref('')
const outline = ref<Array<{ level: number; text: string; id: string; expanded: boolean; children?: any[] }>>([])
const contentRef = ref<HTMLElement | null>(null)
const outlineRef = ref<HTMLElement | null>(null)
const searchQuery = ref('')
const activeHeadingId = ref('')
const sidebarCollapsed = ref(false)
const outlineCollapsed = ref(false)
const currentFileDir = ref('')

// 过滤菜单搜索
const filteredMenu = computed(() => {
  if (!searchQuery.value.trim()) return studyMenu
  const query = searchQuery.value.toLowerCase()
  return studyMenu
    .map(category => ({
      ...category,
      children: category.children.filter(item =>
        item.title.toLowerCase().includes(query) || item.path.toLowerCase().includes(query)
      )
    }))
    .filter(category => category.children.length > 0)
})

// 滚动防抖定时器
let scrollTimer: ReturnType<typeof requestAnimationFrame> | null = null
const slugCountMap = new Map<string, number>()
const headingIdMap = new Map<string, string>()

// 生成唯一ID
function generateSlug(text: string): string {
  let base = text
    .toLowerCase()
    .replace(/[^\w\s-\u4e00-\u9fa5]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50)

  if (!/^[a-zA-Z]/.test(base)) {
    base = 'h-' + base
  }

  const count = slugCountMap.get(base) || 0
  slugCountMap.set(base, count + 1)

  return count === 0 ? base : `${base}-${count}`
}

// 清理标题文本
function cleanHeadingText(raw: string): string {
  let text = raw.trim()
  text = text.replace(/<[^>]*>/g, '').trim()
  text = text.replace(/[*_`~]+/g, '').trim()
  return text
}

// Markdown 解析器配置
const md = new MarkdownIt({
  html: false, // 禁用 HTML 解析
  linkify: true, // 开启自动链接识别
  typographer: true,  // 开启智能引号替换
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return ''
  }
})

// 自定义标题渲染器，添加ID
md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const contentToken = tokens[idx + 1]
  if (contentToken && contentToken.type === 'inline') {
    const decoded = contentToken.content
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
    const cleanText = cleanHeadingText(decoded)
    const id = headingIdMap.get(cleanText) || generateSlug(cleanText)
    token.attrSet('id', id)
  }
  return self.renderToken(tokens, idx, options)
}

const defaultImageRenderer = md.renderer.rules.image || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))
md.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const src = token.attrGet('src')
  if (src && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
    token.attrSet('src', `${currentFileDir.value}/${src}`)
  }
  return defaultImageRenderer(tokens, idx, options, env, self)
}

// 预处理Markdown文本，转义行内HTML标签
function preprocessMarkdown(text: string): string {
  const lines = text.split('\n')
  let inCodeBlock = false
  let inHtmlComment = false

  return lines.map(line => {
    const trimmed = line.trim()

    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock
      return line
    }

    if (inCodeBlock) {
      return line
    }

    if (trimmed.startsWith('<!--')) {
      inHtmlComment = true
    }
    if (inHtmlComment) {
      if (trimmed.endsWith('-->')) {
        inHtmlComment = false
      }
      return line
    }

    return escapeInlineHtml(line)
  }).join('\n')
}

function escapeInlineHtml(line: string): string {
  const parts = line.split(/(`+[^`]+`+)/g)
  return parts.map((part, i) => {
    if (i % 2 === 1) return part

    return part.replace(/<([^>]+)>/g, (match, content) => {
      const commonHtmlTags = /^(br|hr|wbr|mark|del|ins|sup|sub|kbd|samp|var|time|data|meter|progress|details|summary|dialog|template|slot|canvas|script|style|link|meta|title|head|body|html|div|span|p|a|img|table|tr|td|th|thead|tbody|tfoot|ul|ol|li|dl|dt|dd|h1|h2|h3|h4|h5|h6|blockquote|pre|code|em|strong|b|i|u|s|strike|small|big|center|font|basefont|frame|frameset|noframes|iframe|embed|object|param|applet|map|area|form|input|textarea|select|option|optgroup|button|label|fieldset|legend|datalist|keygen|output|audio|video|source|track|article|aside|figcaption|figure|footer|header|hgroup|main|nav|section|address|abbr|acronym|cite|dfn|q|blockquote|bdo|bdi|ruby|rt|rp)(\s|>|\/)/i

      if (commonHtmlTags.test(content)) {
        return `&lt;${content}&gt;`
      }
      return match
    })
  }).join('')
}

// 加载Markdown文件
async function loadMarkdown(path: string) {
  try {
    activeHeadingId.value = ''
    contentRef.value?.scrollTo(0, 0)
    outlineRef.value?.scrollTo(0, 0)

    const fullPath = path.startsWith('/') ? path : `/${path}`
    currentFileDir.value = fullPath.substring(0, fullPath.lastIndexOf('/'))
    const response = await fetch(fullPath)
    const text = await response.text()

    slugCountMap.clear()
    headingIdMap.clear()
    generateOutline(text)

    const processedText = preprocessMarkdown(text)
    const html = md.render(processedText)
    markdownContent.value = html

    await nextTick()
    scrollToHash()
  } catch (error) {
    console.error('Failed to load markdown:', error)
    markdownContent.value = '<h1>加载失败</h1><p>无法加载该文档，请检查文件路径是否正确。</p>'
  }
}

// 生成树形结构大纲
function generateOutline(content: string) {
  const lines = content.split('\n')
  const flatOutline: Array<{ level: number; text: string; id: string }> = []
  let inCodeBlock = false

  lines.forEach(line => {
    const trimmed = line.trim()
    if (!trimmed) return

    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock
      return
    }

    if (inCodeBlock || trimmed.startsWith('<!--')) return

    const headingMatch = trimmed.match(/^(#+)\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      if (level >= 1 && level <= 4) {
        const text = cleanHeadingText(headingMatch[2])
        if (text) {
          const id = generateSlug(text)
          headingIdMap.set(text, id)
          flatOutline.push({ level, text, id })
        }
      }
    }
  })

  outline.value = buildTree(flatOutline)
}

// 将扁平结构转换为树形结构
function buildTree(items: Array<{ level: number; text: string; id: string }>): Array<{ level: number; text: string; id: string; expanded: boolean; children?: any[] }> {
  if (items.length === 0) return []

  const tree: any[] = []
  const stack: any[] = []

  items.forEach(item => {
    const node = { ...item, expanded: true, children: [] }

    while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      tree.push(node)
    } else {
      stack[stack.length - 1].children.push(node)
    }

    stack.push(node)
  })

  return tree
}

// 切换展开/折叠状态
function toggleExpand(event: Event, node: any) {
  event.stopPropagation()
  node.expanded = !node.expanded
}

// 侧边栏切换
function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// 大纲面板切换
function toggleOutline() {
  outlineCollapsed.value = !outlineCollapsed.value
}

// 展开/折叠全部大纲
function toggleAllOutline(event?: Event) {
  if (event) event.stopPropagation()
  const allExpanded = outline.value.every(item => item.expanded)
  const setExpanded = (items: any[]) => {
    items.forEach(item => {
      item.expanded = !allExpanded
      if (item.children?.length) {
        setExpanded(item.children)
      }
    })
  }
  setExpanded(outline.value)
}

// 滚动到指定标题
function scrollToHeading(event: Event, id: string) {
  event.stopPropagation()
  const element = document.getElementById(id)
  if (element && contentRef.value) {
    const offsetTop = element.offsetTop
    const paddingOffset = 24
    const maxScrollTop = contentRef.value.scrollHeight - contentRef.value.clientHeight
    const targetScrollTop = Math.max(0, Math.min(offsetTop - paddingOffset, maxScrollTop))
    
    contentRef.value.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    })
  }
}

// 根据URL hash滚动
function scrollToHash() {
  const hash = window.location.hash
  if (hash && contentRef.value) {
    const element = document.getElementById(hash.slice(1))
    if (element) {
      const offsetTop = element.offsetTop
      const paddingOffset = 24
      const maxScrollTop = contentRef.value.scrollHeight - contentRef.value.clientHeight
      const targetScrollTop = Math.max(0, Math.min(offsetTop - paddingOffset, maxScrollTop))
      
      contentRef.value.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      })
    }
  }
}

// 内容滚动处理
function handleContentScroll() {
  if (!contentRef.value || !outlineRef.value) return
  if (scrollTimer) cancelAnimationFrame(scrollTimer)
  scrollTimer = requestAnimationFrame(() => {
    if (!contentRef.value || !outlineRef.value) return
    const headings = contentRef.value.querySelectorAll('h1[id], h2[id], h3[id], h4[id]')
    if (headings.length === 0) return

    const containerTop = contentRef.value.getBoundingClientRect().top
    let currentHeadingId = ''

    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect()
      if (rect.top - containerTop <= 60) {
        currentHeadingId = heading.id
      }
    })

    if (currentHeadingId && currentHeadingId !== activeHeadingId.value) {
      activeHeadingId.value = currentHeadingId
      const activeItem = outlineRef.value.querySelector(`a[data-id="${currentHeadingId}"]`)
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  })
}

// 窗口resize处理
function handleResize() {
  if (window.innerWidth < 900) {
    sidebarCollapsed.value = true
    outlineCollapsed.value = true
  } else {
    sidebarCollapsed.value = false
    outlineCollapsed.value = false
  }
}

// 生命周期钩子
onMounted(() => {
  const pathname = window.location.pathname
  const match = pathname.match(/\/study(\/.*\.md)$/)
  if (match) {
    activeMenu.value = match[1]
  } else {
    const firstItem = studyMenu[0]?.children?.[0]
    if (firstItem) {
      activeMenu.value = firstItem.path
    }
  }
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (scrollTimer) cancelAnimationFrame(scrollTimer)
  window.removeEventListener('resize', handleResize)
})

// 监听菜单变化
watch(activeMenu, (newPath) => {
  if (newPath) {
    loadMarkdown(newPath)
    window.history.pushState({}, '', `/study${newPath}`)
  }
})
</script>

<template>
  <div class="study-page">
    <!-- 左侧菜单区域 -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <header class="sidebar-header">
        <div class="sidebar-search">
          <div class="search-input-wrapper">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              placeholder="搜索笔记..."
            />
          </div>
        </div>
      </header>

      <nav class="menu-container">
        <ElMenu
          mode="vertical"
          :default-active="activeMenu"
          @select="(key) => activeMenu = key"
          class="study-menu"
        >
          <ElSubMenu
            v-for="category in filteredMenu"
            :key="category.title"
            :index="category.title"
          >
            <template #title>
              <span>{{ category.title }}</span>
            </template>
            <ElMenuItem
              v-for="item in category.children"
              :key="item.path"
              :index="item.path"
            >
              <span>{{ item.title }}</span>
            </ElMenuItem>
          </ElSubMenu>
        </ElMenu>

        <div v-if="filteredMenu.length === 0 && searchQuery.trim()" class="search-empty">
          <span>未找到相关笔记</span>
        </div>
      </nav>
    </aside>

    <button 
      class="sidebar-toggle-handle" 
      @click="toggleSidebar" 
      :title="sidebarCollapsed ? '展开菜单' : '收起菜单'"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path v-if="!sidebarCollapsed" d="M15 18l-6-6 6-6"/>
        <path v-else d="M9 18l6-6-6-6"/>
      </svg>
    </button>

    <!-- 中间内容区域 -->
    <main class="content-area custom-scrollbar" ref="contentRef" @scroll="handleContentScroll">
      <article class="markdown-content" v-html="markdownContent"></article>
    </main>

    <!-- 右侧大纲区域 -->
    <aside class="outline-panel" :class="{ collapsed: outlineCollapsed }">
      <header class="outline-header">
        <div class="outline-header-content">
          <button class="outline-toggle-btn" @click="toggleAllOutline" :title="outline.every(i => i.expanded) ? '折叠全部' : '展开全部'">
            <svg 
              class="outline-icon" 
              :class="{ rotated: outline.every(i => i.expanded) }"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2"
            >
              <path d="M4 6h16M4 12h10M4 18h14"/>
            </svg>
          </button>
          <span class="outline-title">文档大纲</span>
        </div>
      </header>

      <nav class="outline-content custom-scrollbar" ref="outlineRef">
        <ul class="outline-list">
          <template v-for="item in outline" :key="item.id">
            <li class="outline-item">
              <div
                class="outline-item-header level-1"
                @click="toggleExpand($event, item)"
              >
                <span class="outline-expand-icon" :class="{ expanded: item.expanded }">›</span>
                <a
                  href="javascript:void(0)"
                  :data-id="item.id"
                  class="outline-link-text"
                  :class="{ active: activeHeadingId === item.id }"
                  @click="scrollToHeading($event, item.id)"
                >
                  {{ item.text }}
                </a>
              </div>
              <ul v-if="item.expanded && item.children?.length" class="outline-sub-list">
                <template v-for="child in item.children" :key="child.id">
                  <li class="outline-item">
                    <div
                      class="outline-item-header level-2"
                      @click="toggleExpand($event, child)"
                    >
                      <span class="outline-expand-icon" :class="{ expanded: child.expanded }">›</span>
                      <a
                        href="javascript:void(0)"
                        :data-id="child.id"
                        class="outline-link-text"
                        :class="{ active: activeHeadingId === child.id }"
                        @click="scrollToHeading($event, child.id)"
                      >
                        {{ child.text }}
                      </a>
                    </div>
                    <ul v-if="child.expanded && child.children?.length" class="outline-sub-list">
                      <template v-for="grandchild in child.children" :key="grandchild.id">
                        <li class="outline-item">
                          <div
                            class="outline-item-header level-3"
                            @click="toggleExpand($event, grandchild)"
                          >
                            <span class="outline-expand-icon" :class="{ expanded: grandchild.expanded }">›</span>
                            <a
                              href="javascript:void(0)"
                              :data-id="grandchild.id"
                              class="outline-link-text"
                              :class="{ active: activeHeadingId === grandchild.id }"
                              @click="scrollToHeading($event, grandchild.id)"
                            >
                              {{ grandchild.text }}
                            </a>
                          </div>
                          <ul v-if="grandchild.expanded && grandchild.children?.length" class="outline-sub-list">
                            <li v-for="greatgrandchild in grandchild.children" :key="greatgrandchild.id" class="outline-item">
                              <a
                                href="javascript:void(0)"
                                :data-id="greatgrandchild.id"
                                class="outline-item-header level-4"
                                :class="{ active: activeHeadingId === greatgrandchild.id }"
                                @click="scrollToHeading($event, greatgrandchild.id)"
                              >
                                {{ greatgrandchild.text }}
                              </a>
                            </li>
                          </ul>
                        </li>
                      </template>
                    </ul>
                  </li>
                </template>
              </ul>
            </li>
          </template>
        </ul>

        <div v-if="outline.length === 0" class="outline-empty">
          <span>暂无大纲</span>
        </div>
      </nav>
    </aside>

    <button 
      class="outline-toggle-handle" 
      @click="toggleOutline" 
      :title="outlineCollapsed ? '展开大纲' : '收起大纲'"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path v-if="!outlineCollapsed" d="M9 18l6-6-6-6"/>
        <path v-else d="M15 18l-6-6 6-6"/>
      </svg>
    </button>
  </div>
</template>

<style scoped lang="scss">
// ============================================
// Sass 变量体系
// ============================================
$transition-fast: 0.15s ease-out;
$transition-normal: 0.2s ease-out;
$transition-medium: 0.3s ease;

$sidebar-width: 240px;
$outline-width: 220px;
$handle-width: 20px;
$handle-height: 48px;
$handle-border-radius: 12px;

$header-padding: 12px 14px;
$content-padding: 24px;
$menu-padding: 8px;

// ============================================
// Mixins
// ============================================
@mixin theme-transition($properties...) {
  will-change: $properties;
  transition: $properties $transition-normal;
}

@mixin gpu-optimize {
  transform: translateZ(0);
  backface-visibility: hidden;
  contain: style layout paint;
}

@mixin panel-base($direction: right) {
  position: relative;
  height: 100%;
  background-color: var(--color-bg-surface);
  border-#{$direction}: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
  @include theme-transition(background-color, border-color, width);
  @include gpu-optimize;
}

@mixin handle-base($position, $direction) {
  position: fixed;
  #{$position}: 0;
  top: 50%;
  transform: translateY(-50%) translateX(10px);
  width: $handle-width;
  height: $handle-height;
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: $handle-border-radius;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  z-index: 100;
  transition: background-color $transition-fast, color $transition-fast, #{$position} $transition-medium, transform $transition-medium;
  
  &:hover {
    background-color: var(--color-bg-hover);
    color: var(--color-text-primary);
  }
  
  svg {
    width: 14px;
    height: 14px;
    transition: transform $transition-normal;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
}

@mixin heading-base($level) {
  @if $level <= 2 {
    font-weight: 600;
  } @else {
    font-weight: 500;
  }
  color: var(--color-text-primary);
  @include theme-transition(color, border-color);
}

// ============================================
// 页面容器
// ============================================
.study-page {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--color-bg-base);
  @include theme-transition(background-color);
  @include gpu-optimize;
}

// ============================================
// 左侧侧边栏
// ============================================
.sidebar-toggle-handle {
  @include handle-base(left, left);
  left: $sidebar-width - $handle-width;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  
  .sidebar.collapsed + & {
    left: 0;
    transform: translateY(-50%) translateX(0);
  }
}

.sidebar {
  @include panel-base(right);
  width: $sidebar-width;

  &.collapsed {
    width: 0;
    border-right: none;
    
    .sidebar-header,
    .menu-container {
      display: none;
    }
  }
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding-right: $menu-padding;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-bg-elevated);
  @include theme-transition(background-color, border-color);
}

.sidebar-search {
  flex: 1;
  padding: $header-padding;
  background-color: var(--color-bg-elevated);
  @include theme-transition(background-color);
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  background-color: var(--color-bg-base);
  border: 1px solid var(--color-border-muted);
  @include theme-transition(background-color, border-color);
  
  &:focus-within {
    border-color: var(--color-primary);
  }
}

.search-icon {
  width: 14px;
  height: 14px;
  color: var(--color-text-muted);
  flex-shrink: 0;
  @include theme-transition(color);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  color: var(--color-text-primary);
  line-height: 1.4;
  @include theme-transition(color);
  
  &::placeholder {
    color: var(--color-text-muted);
  }
}

.search-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: var(--color-text-muted);
  font-size: 13px;
}

.menu-container {
  flex: 1;
  overflow-y: auto;
  padding: $menu-padding;
}

// ============================================
// Element Plus 菜单样式覆盖
// ============================================
.study-menu {
  --el-menu-bg-color: transparent !important;
  --el-menu-border-color: transparent !important;
  --el-menu-item-color: var(--color-text-secondary) !important;
  --el-menu-item-hover-bg-color: var(--color-bg-hover) !important;
  --el-menu-item-active-bg-color: var(--color-primary-bg-hover) !important;
  --el-menu-item-active-color: var(--color-primary) !important;
  --el-sub-menu-title-color: var(--color-text-primary) !important;
  --el-sub-menu-title-hover-bg-color: var(--color-bg-hover) !important;
  
  border: none;
  background-color: var(--el-menu-bg-color) !important;
  @include theme-transition(color);
  @include gpu-optimize;

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: var(--color-text-secondary);
    background-color: transparent;
    @include theme-transition(color, background-color);
  }

  :deep(.el-menu-item) {
    padding-left: 40px !important;
  }

  :deep(.el-sub-menu__title) {
    padding-left: 16px !important;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  :deep(.el-menu-item:hover),
  :deep(.el-sub-menu__title:hover) {
    background-color: var(--color-bg-hover);
  }

  :deep(.el-menu-item.is-active) {
    background-color: var(--color-primary-bg-hover);
    color: var(--color-primary);
  }

  :deep(.el-menu-item.is-active:hover) {
    background-color: var(--color-primary-bg-active);
  }

  // 隐藏箭头图标
  :deep(.el-sub-menu__icon-arrow) {
    display: none !important;
  }

  // 弹出子菜单主题适配
  :deep(.el-menu--popup) {
    --el-menu-bg-color: var(--color-bg-surface) !important;
    --el-menu-border-color: var(--color-border) !important;
    --el-menu-item-color: var(--color-text-secondary) !important;
    --el-menu-item-hover-bg-color: var(--color-bg-hover) !important;
    --el-menu-item-active-bg-color: var(--color-primary-bg-hover) !important;
    --el-menu-item-active-color: var(--color-primary) !important;
    
    background-color: var(--el-menu-bg-color) !important;
    border: 1px solid var(--el-menu-border-color) !important;
    @include theme-transition(background-color, border-color, color);
    @include gpu-optimize;

    .el-menu-item {
      background-color: transparent !important;
      color: var(--el-menu-item-color) !important;

      &:hover {
        background-color: var(--el-menu-item-hover-bg-color) !important;
      }

      &.is-active {
        background-color: var(--el-menu-item-active-bg-color) !important;
        color: var(--el-menu-item-active-color) !important;
      }
    }
  }

  // 嵌套子菜单
  :deep(.el-sub-menu .el-menu) {
    --el-menu-bg-color: var(--color-bg-surface) !important;
    background-color: var(--el-menu-bg-color) !important;
    border: none !important;
  }
}

// ============================================
// 中间内容区域
// ============================================
.content-area {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  background-color: var(--color-bg-base);
  @include theme-transition(background-color);
  @include gpu-optimize;
}

.markdown-content {
  padding: $content-padding;
  line-height: 1.8;
  color: var(--color-text-primary);
  min-height: 100%;
  @include theme-transition(color);
  @include gpu-optimize;

  // 标题样式
  :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
    @include theme-transition(color);
  }

  :deep(h1) {
    font-size: 24px;
    font-weight: 700;
    margin: 24px 0 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--color-primary);
    @include theme-transition(color, border-color);
  }

  :deep(h2) {
    font-size: 20px;
    margin: 20px 0 12px;
    padding-left: 8px;
    border-left: 4px solid var(--color-primary);
    @include heading-base(2);
  }

  :deep(h3) {
    font-size: 16px;
    margin: 16px 0 8px;
    padding-left: 12px;
    border-left: 3px solid var(--color-primary);
    @include heading-base(3);
  }

  :deep(h4) {
    font-size: 15px;
    margin: 14px 0 6px;
    padding-left: 12px;
    border-left: 2px solid var(--color-primary);
    @include heading-base(4);
  }

  // 正文内容
  :deep(p), :deep(ul), :deep(ol) {
    margin: 12px 0;
    padding-left: 20px;
    color: var(--color-text-secondary);
    @include theme-transition(color);
  }

  :deep(strong) {
    font-weight: 600;
    color: var(--color-text-primary);
    @include theme-transition(color);
  }

  :deep(code) {
    background-color: var(--color-bg-elevated);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Fira Code', 'Monaco', monospace;
    font-size: 0.9em;
    color: var(--color-primary);
    @include theme-transition(background-color, color);
  }

  :deep(pre) {
    background-color: var(--color-bg-elevated);
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 16px 0;
    @include theme-transition(background-color);
    @include gpu-optimize;

    code {
      background: none;
      padding: 0;
      color: inherit;
      @include theme-transition(color);
    }

    // 代码高亮样式
    :deep(.hljs) {
      background: transparent;
      padding: 0;
      color: var(--color-text-primary);
    }

    :deep(.hljs-comment),
    :deep(.hljs-quote) {
      color: #6a737d;
      font-style: italic;
    }

    :deep(.hljs-keyword),
    :deep(.hljs-selector-tag) {
      color: #d73a49;
      font-weight: 600;
    }

    :deep(.hljs-string),
    :deep(.hljs-doctag),
    :deep(.hljs-template-variable) {
      color: #032f62;
    }

    :deep(.hljs-title),
    :deep(.hljs-section),
    :deep(.hljs-selector-id) {
      color: #6f42c1;
      font-weight: 600;
    }

    :deep(.hljs-variable),
    :deep(.hljs-template-variable) {
      color: #e36209;
    }

    :deep(.hljs-type),
    :deep(.hljs-class) {
      color: #22863a;
    }

    :deep(.hljs-number) {
      color: #005cc5;
    }

    :deep(.hljs-built_in),
    :deep(.hljs-builtin-name) {
      color: #005cc5;
    }

    :deep(.hljs-attr) {
      color: #005cc5;
    }

    :deep(.hljs-symbol),
    :deep(.hljs-bullet) {
      color: #005cc5;
    }

    :deep(.hljs-link) {
      color: #032f62;
      text-decoration: underline;
    }

    :deep(.hljs-deletion) {
      background: #ffeef0;
    }

    :deep(.hljs-addition) {
      background: #e6ffed;
    }
  }

  :deep(li) {
    margin: 6px 0;
  }

  :deep(a) {
    color: var(--color-primary);
    text-decoration: none;
    @include theme-transition(color);

    &:hover {
      text-decoration: underline;
    }
  }

  :deep(blockquote) {
    border-left: 4px solid var(--color-primary);
    padding: 8px 16px;
    margin: 16px 0;
    background-color: var(--color-primary-bg-light);
    color: var(--color-text-secondary);
    @include theme-transition(border-color, background-color, color);
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;

    th, td {
      border: 1px solid var(--color-border);
      padding: 10px 12px;
      text-align: left;
      @include theme-transition(border-color);
    }

    th {
      background-color: var(--color-bg-elevated);
      font-weight: 600;
      @include theme-transition(background-color);
    }

    tr:hover {
      background-color: var(--color-bg-hover);
      @include theme-transition(background-color);
    }
  }

  :deep(img) {
    max-width: 100%;
    border-radius: 8px;
    margin: 16px auto;
    display: block;
  }

  :deep(font) {
    font-size: inherit;
  }
}

// ============================================
// 右侧大纲面板
// ============================================
.outline-toggle-handle {
  position: fixed;
  right: $outline-width - $handle-width;
  top: 50%;
  transform: translateY(-50%) translateX(-10px);
  width: $handle-width;
  height: $handle-height;
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: $handle-border-radius;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  z-index: 100;
  transition: background-color $transition-fast, color $transition-fast, right $transition-medium, transform $transition-medium;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.05);
  
  &:hover {
    background-color: var(--color-bg-hover);
    color: var(--color-text-primary);
  }
  
  svg {
    width: 14px;
    height: 14px;
    transition: transform $transition-normal;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
  
  .outline-panel.collapsed + & {
    right: 0;
    transform: translateY(-50%) translateX(0);
    border-radius: $handle-border-radius 0 0 $handle-border-radius;
  }
}

.outline-panel {
  @include panel-base(left);
  width: $outline-width;

  &.collapsed {
    width: 0;
    border-left: none;
    
    .outline-header,
    .outline-content {
      display: none;
    }
  }
}

.outline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $header-padding;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-bg-elevated);
  @include theme-transition(background-color, border-color);
}

.outline-header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
}

.outline-icon {
  width: 16px;
  height: 16px;
  color: var(--color-primary);
  flex-shrink: 0;
  transition: transform $transition-medium;

  &.rotated {
    transform: rotate(90deg);
  }
}

.outline-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  color: var(--color-primary);
  transition: background-color $transition-fast;

  &:hover {
    background-color: var(--color-bg-hover);
  }
}

.outline-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  @include theme-transition(color);
}

.outline-content {
  flex: 1;
  overflow-y: auto;
  padding: $menu-padding 0;
}

.outline-list,
.outline-sub-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.outline-item {
  margin: 0;
}

.outline-item-header {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px 8px;
  color: var(--color-text-secondary);
  cursor: pointer;
  border-radius: 4px;
  @include theme-transition(color, background-color);

  &:hover {
    background-color: var(--color-bg-hover);
    color: var(--color-text-primary);
  }

  // 层级样式
  &.level-1 {
    padding-left: 10px;
    font-weight: 600;
    font-size: 13px;
  }

  &.level-2 {
    padding-left: 24px;
    font-size: 12px;
  }

  &.level-3 {
    padding-left: 38px;
    font-size: 12px;
  }

  &.level-4 {
    padding-left: 52px;
    font-size: 11px;
    opacity: 0.85;
  }

  &.active {
    color: var(--color-primary);
    font-weight: 600;
    background-color: var(--color-primary-bg-hover);
    border-radius: 4px;
    padding: 2px 6px;
    margin: -2px -6px;
  }
}

.outline-expand-icon {
  font-size: 10px;
  width: 12px;
  text-align: left;
  color: var(--color-primary);
  opacity: 0.7;
  transition: transform $transition-fast;

  &.expanded {
    transform: rotate(90deg);
  }
}

.outline-link-text {
  flex: 1;
  text-decoration: none;
  color: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 2px 6px;
  margin: -2px -6px;
  border-radius: 4px;
  transition: color $transition-fast, background-color $transition-fast;

  &.active {
    color: var(--color-primary);
    font-weight: 600;
    background-color: var(--color-primary-bg-hover);
  }
}

.outline-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: var(--color-text-muted);
  font-size: 13px;
  @include theme-transition(color);
}

// ============================================
// 滚动条样式
// ============================================
.menu-container,
.content-area,
.outline-content {
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-border-muted);
    border-radius: 3px;
    @include theme-transition(background-color);

    &:hover {
      background-color: var(--color-text-muted);
    }
  }
}
</style>
