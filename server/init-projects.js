import { queryAll, runQuery, saveDB } from './db.js';

/** 示例项目 — 仅首次运行时插入，帮助用户了解字段填写方式 */
const exampleProject = {
  title: '示例项目（可编辑或删除）',
  route_index: '/project/example',
  description: '这是一个示例项目，展示如何通过管理系统创建项目',
  config: JSON.stringify({
    name: '示例项目',
    url: 'https://example.com',
    description: '这是项目的详细介绍，支持描述项目的功能、技术架构、核心亮点等。编辑此项目来了解完整的配置项。',
    techStack: ['Vue 3', 'Vite', 'TypeScript'],
    responsibilities: [
      {
        title: '功能特性',
        content: '这是「职责/亮点」模块的描述，支持 HTML 标签渲染，例如：<br/><br/><b>加粗文本</b>、<i>斜体文本</i>、<br/>换行等格式'
      },
      {
        title: '技术实现',
        content: '每个职责模块包含标题和内容两部分，用于在项目详情页展示你的工作内容和技术方案'
      }
    ],
    github: 'https://github.com/',
    gitee: 'https://gitee.com/',
    images: []
  })
};

/** 示例文章 — 仅首次运行时插入，帮助用户了解文章字段 */
const exampleArticle = {
  title: '欢迎使用 LX-Studio（可编辑或删除）',
  excerpt: '这是一篇示例文章，帮助你了解如何通过管理系统创建和管理文章内容。',
  category: '技术',
  tags: JSON.stringify(['入门指南']),
  readTime: '3 分钟',
  date: new Date().toISOString().split('T')[0],
  content: `# 欢迎使用 LX-Studio

这是一篇示例文章，帮助你了解文章管理系统的各项字段。

## 字段说明

- **标题**：文章标题，会显示在文章列表和详情页
- **摘要**：文章简介，显示在列表卡片中
- **分类**：文章分类（如：技术、随笔、生活）
- **标签**：文章标签，支持多个，用于筛选
- **阅读时间**：预计阅读时长
- **封面**：文章封面图片（可选）
- **正文**：支持 Markdown 格式

## Markdown 示例

> 这是一段引用文本

\`\`\`javascript
const greeting = 'Hello, LX-Studio!';
console.log(greeting);
\`\`\`

你可以在后台管理系统中编辑或删除这篇文章，开始创建你自己的内容。`
};

/**
 * 初始化默认数据
 * 仅在项目表和文章表都为空时执行（首次运行）
 * 用户删除或修改后不会重新创建
 */
export async function initProjects() {
  try {
    const existingProjects = queryAll('SELECT id FROM projects');
    const existingArticles = queryAll('SELECT id FROM articles');

    if (existingProjects.length === 0) {
      runQuery(
        'INSERT INTO projects (title, route_index, description, config, sort_order) VALUES (?, ?, ?, ?, ?)',
        [exampleProject.title, exampleProject.route_index, exampleProject.description, exampleProject.config, 1]
      );
      console.log('Created example project');
    }

    if (existingArticles.length === 0) {
      runQuery(
        'INSERT INTO articles (title, excerpt, category, tags, readTime, date, content) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [exampleArticle.title, exampleArticle.excerpt, exampleArticle.category, exampleArticle.tags, exampleArticle.readTime, exampleArticle.date, exampleArticle.content]
      );
      console.log('Created example article');
    }

    saveDB();
    console.log('Data initialization check complete');
  } catch (err) {
    console.error('Failed to initialize data:', err);
  }
}
