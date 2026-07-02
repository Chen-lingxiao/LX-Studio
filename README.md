# 揽星河 | LX-Studio

一个基于 Vue 3 + Express 的全栈个人技术博客与项目展示平台，集成了现代前端技术、后端 API 与管理后台。平台融合了技术文章分享、项目案例展示、学习笔记记录等核心功能

## 目录

- [项目概述](#项目概述)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [环境要求](#环境要求)
- [安装步骤](#安装步骤)
- [页面模块](#页面模块)
- [项目结构](#项目结构)
- [组件说明](#组件说明)
- [配置说明](#配置说明)
- [自定义配置指南](#自定义配置指南)
- [贡献规范](#贡献规范)
- [许可证](#许可证)
- [致谢](#致谢)

---

## 项目概述

揽星河 | LX-Studio 是一个面向开发者的全栈个人技术站点，采用 Vue 3 + Express 架构，旨在记录技术成长、分享项目经验与展示开发成果。

### 核心理念

- **技术沉淀**：通过博客文章系统地记录前端开发、Web 技术等领域的实践经验
- **项目展示**：以详尽的案例展示项目背景、技术栈、开发过程与个人贡献
- **知识积累**：构建结构化的学习笔记体系，便于知识回顾与分享
- **美学体验**：追求极致的视觉设计与交互体验，展现技术与人文的融合
- **全栈架构**：前后端分离设计，支持管理后台与 API 服务

---

## 功能特性

### 首页模块

| 功能 | 描述 |
|------|------|
| **星空动画背景** | 首页顶部全屏星空粒子动画，包含星星闪烁、流星划过效果，营造沉浸式宇宙视觉体验 |
| **滚动视差效果** | 支持滚轮滚动切换章节，实现平滑的视差过渡效果 |
| **项目展示区域** | 展示精选项目案例，支持分页浏览，点击可跳转项目详情 |
| **文章推荐展示** | 展示最新技术文章，支持分页浏览 |
| **休息区域** | 首页底部放松模块，包含音乐播放器等娱乐功能 |
| **赛博朋克模式** | 彩蛋特性，触发 Matrix Rain、故障动画等特效 |

### 文章模块

| 功能 | 描述 |
|------|------|
| **分类导航** | 支持按技术分类筛选文章（全部、技术随笔等） |
| **文章列表** | 卡片式文章列表，展示封面、标题、摘要、阅读时间等信息 |
| **文章详情** | Markdown 内容渲染，支持代码高亮、链接、图片等富文本 |
| **文章统计** | 显示阅读量、点赞数、评论数等互动数据 |

### 学习模块

| 功能 | 描述 |
|------|------|
| **知识目录** | 分类展示 Web 开发、GIS 学习等学习路径与笔记 |
| **Markdown 渲染** | 支持完整的 Markdown 语法解析与渲染 |
| **标题目录** | 自动提取文章标题生成目录导航，支持点击跳转 |
| **搜索功能** | 支持按标题或路径搜索学习内容 |
| **响应式布局** | 自适应侧边栏折叠与目录展开状态 |

### 项目模块

| 功能 | 描述 |
|------|------|
| **项目画廊** | 侧边栏导航展示多个项目案例，数据从 API 动态加载 |
| **项目详情** | 详尽展示项目背景、技术栈、个人职责与项目截图 |
| **技术栈展示** | 标签式展示项目使用的技术栈 |
| **职责描述** | 结构化描述在项目中的具体工作内容与贡献 |
| **图片轮播** | 支持多张项目截图轮播展示，自适应高度 |
| **链接跳转** | 提供 GitHub、Gitee 仓库地址与在线演示地址 |

### 音乐模块

| 功能 | 描述 |
|------|------|
| **迷你播放器** | 全局浮动迷你音乐播放器，支持播放/暂停、切歌 |
| **播放动画** | 播放状态下显示动态均衡器效果与呼吸光晕 |
| **展开控制** | 点击展开完整播放器，显示歌曲列表 |

### 设置与主题

| 功能 | 描述 |
|------|------|
| **明暗模式** | 一键切换亮色/暗色主题，自动记忆用户偏好 |
| **主题色预设** | 提供 6 种主题色方案（默认白、淡紫色、淡绿色、薄荷绿、柔蓝色、淡粉色） |
| **主题色切换** | 实时预览主题色效果，即时生效 |
| **赛博朋克模式** | 彩蛋特性，触发特殊的故障动画效果 |
| **本地存储** | 用户偏好设置自动保存到浏览器本地存储 |
| **FPS 显示** | 可选的帧率显示功能 |

### 管理后台

| 功能 | 描述 |
|------|------|
| **身份认证** | JWT Token 认证，安全登录管理后台 |
| **文章管理** | 创建、编辑、删除文章，支持 Markdown 编辑器 |
| **笔记管理** | 管理学习笔记内容 |
| **项目管理** | 管理项目展示信息，支持图片上传 |
| **文件上传** | 支持图片等文件上传，自动存储到服务器 |

### UI 组件

| 功能 | 描述 |
|------|------|
| **加载动画** | 应用启动时的品牌加载动画，增强仪式感 |
| **顶部导航栏** | 透明悬浮导航栏，支持路由高亮、滚动变色、赛博朋克故障效果 |
| **底部页脚** | 响应式页脚，支持透明模式与项目/学习页面融合，显示系统版本 |
| **博客卡片** | 文章卡片组件，支持悬停动画与点击反馈 |
| **博客分页** | 文章列表分页组件，简洁易用 |

---

## 技术栈

### 前端框架与构建

| 类别 | 技术 | 版本 |
|------|------|------|
| 核心框架 | Vue | 3.5.x |
| 构建工具 | Vite | 8.0.x |
| 类型支持 | TypeScript | 6.0.x |
| 路由管理 | Vue Router | 5.0.x |
| HTTP 客户端 | Axios | 1.16.x |

### 后端服务

| 类别 | 技术 | 版本 |
|------|------|------|
| 服务框架 | Express | 4.21.x |
| 数据库 | sql.js (SQLite) | 1.14.x |
| 身份认证 | jsonwebtoken | 9.0.x |
| 密码加密 | bcryptjs | 2.4.x |
| 文件上传 | multer | 2.2.x |
| 跨域支持 | cors | 2.8.x |
| 环境变量 | dotenv | 17.4.x |

### UI 与样式

| 类别 | 技术 | 版本 |
|------|------|------|
| UI 组件库 | Element Plus | 2.13.x |
| 图标库 | @element-plus/icons-vue | 2.3.x |
| 图标组件 | Lucide Vue Next | 1.0.x |
| 样式预处理 | Sass | 1.99.x |
| 动画效果 | PowerGlitch | 2.5.x |

### 内容处理

| 类别 | 技术 | 版本 |
|------|------|------|
| Markdown 解析 | markdown-it | 14.2.x |
| Markdown 扩展 | markdown-it-container | 4.0.x |
| 代码高亮 | highlight.js | 11.11.x |

### 开发工具

| 类别 | 技术 | 版本 |
|------|------|------|
| Vue 类型支持 | vue-tsc | 3.2.x |
| 组件自动导入 | unplugin-vue-components | 32.0.x |
| 自动导入支持 | unplugin-auto-import | 21.0.x |
| Markdown 组件 | unplugin-vue-markdown | 32.0.x |
| Vue 开发工具 | vite-plugin-vue-devtools | 8.1.x |
| 并发运行 | concurrently | 9.1.x |

---

## 环境要求

| 环境 | 版本要求 |
|------|----------|
| Node.js | ^20.19.0 或 >=22.12.0 |
| pnpm | ^8.0.0（推荐） |
| npm | >=9.0.0（备选） |
| 操作系统 | Windows / macOS / Linux |

---

## 安装步骤

### 1. 克隆项目

```bash
git clone <repository-url>
cd LX-Studio
```

### 2. 安装依赖

使用 pnpm（推荐）：

```bash
pnpm install
```

或使用 npm：

```bash
npm install
```

### 3. 启动开发服务器

启动前端开发服务器：

```bash
pnpm dev
```

访问 http://localhost:5173 查看运行效果。

启动后端 API 服务器：

```bash
pnpm dev:server
```

同时启动前端和后端：

```bash
pnpm dev:all
```

### 4. 构建生产版本

```bash
pnpm build
```

构建产物将输出到 `dist` 目录。

### 5. 预览生产构建

```bash
pnpm preview
```

### 6. Docker 部署

项目支持 Docker 容器化部署：

```bash
docker-compose up -d
```

---

## 页面模块

### 首页（Home）

首页采用全屏滚动设计，包含四个主要部分：

1. **首屏（Hero）**：星空背景动画，展示站点名称与标语
2. **项目展示区**：天空背景，展示精选项目案例，支持分页浏览
3. **文章区**：渐变背景，展示最新技术文章，支持分页浏览
4. **休息区**：水波动画效果，包含音乐播放器等放松模块

### 文章页面（Articles）

文章页面采用左侧列表 + 右侧详情的双栏布局：

- **左侧边栏**：分类标签导航 + 文章列表
- **右侧内容区**：文章详情渲染，包含标题、元信息、正文内容

### 学习页面（Study）

学习页面提供知识目录与文档阅读功能：

- **左侧边栏**：可折叠的知识目录树，支持搜索
- **右侧内容区**：Markdown 文档渲染，支持目录导航

### 项目页面（Project）

项目页面采用侧边栏 + 主内容区布局：

- **左侧边栏**：项目列表导航（从 API 动态加载）
- **主内容区**：项目详情展示，包含：
  - 项目概述与链接
  - 技术栈标签
  - 个人职责描述
  - 项目截图轮播

### 管理后台（Admin）

管理后台提供内容管理功能，支持 JWT 身份认证：

- **文章管理**：创建、编辑、删除文章
- **笔记管理**：管理学习笔记内容
- **项目管理**：管理项目展示信息
- **文件上传**：支持图片等文件上传

---

## 项目结构

```
LX-Studio/
├── public/                          # 静态资源目录
│   ├── Preview/                     # 项目预览图片
│   ├── docs/                        # 学习笔记文档
│   ├── music/                       # 音乐文件
│   └── favicon.ico                  # 网站图标
│
├── server/                          # 后端服务目录
│   ├── middleware/                   # 中间件
│   │   └── auth.js                  # JWT 认证中间件
│   ├── routes/                      # API 路由
│   │   ├── admin.js                 # 管理后台 API
│   │   ├── articles.js              # 文章 API
│   │   ├── notes.js                 # 笔记 API
│   │   ├── projects.js              # 项目 API
│   │   └── upload.js                # 文件上传 API
│   ├── db.js                        # 数据库初始化
│   ├── index.js                     # 服务器入口
│   └── init-projects.js             # 项目数据初始化
│
├── src/                             # 源代码目录
│   ├── assets/                      # 资源文件
│   │   ├── fonts/                   # 字体文件
│   │   └── styles/                  # 样式文件
│   │
│   ├── components/                  # Vue 组件
│   │   ├── background/              # 背景动画组件
│   │   ├── blog/                    # 博客相关组件
│   │   ├── relax/                   # 放松模块组件
│   │   └── settings/                # 设置组件
│   │
│   ├── composables/                 # 可组合函数
│   │   ├── useSettings.ts           # 设置管理
│   │   ├── useTheme.ts              # 主题管理系统
│   │   ├── useHomeSection.js        # 首页章节状态管理
│   │   └── useAudioPlayer.ts        # 音乐播放器状态管理
│   │
│   ├── data/                        # 数据文件
│   │   ├── articles.js              # 文章数据配置
│   │   ├── config.js                # 学习模块配置
│   │   └── content/                 # 文章内容
│   │
│   ├── router/                      # 路由配置
│   ├── views/                       # 页面组件
│   │   ├── admin/                   # 管理后台组件
│   │   ├── project/                 # 项目子页面
│   │   ├── HomeView.vue             # 首页
│   │   ├── ArticlesView.vue         # 文章页面
│   │   ├── StudyView.vue            # 学习页面
│   │   └── AdminView.vue            # 管理后台页面
│   │
│   ├── utils/                       # 工具函数
│   ├── App.vue                      # 根组件
│   ├── main.js                      # 应用入口
│   └── env.d.ts                     # TypeScript 环境声明
│
├── uploads/                         # 上传文件目录
├── data/                            # SQLite 数据库目录
├── .env.example                     # 环境变量示例
├── index.html                       # HTML 入口
├── vite.config.ts                   # Vite 配置
├── package.json                     # 依赖配置
├── tsconfig.json                    # TypeScript 配置
├── Dockerfile                       # Docker 配置
├── docker-compose.yml               # Docker Compose 配置
└── .gitignore                       # Git 忽略配置
```

---

## 组件说明

### 背景组件

| 组件 | 文件位置 | 描述 |
|------|----------|------|
| 星空背景 | [StarryBackground.vue](src/components/background/StarryBackground.vue) | 全屏星空粒子动画，包含星星闪烁、流星划过效果，支持暗色模式适配 |
| 天空背景 | [SkyBackground.vue](src/components/background/SkyBackground.vue) | 渐变天空背景，带云朵漂浮动画 |
| 草地背景 | [FieldBackground.vue](src/components/background/FieldBackground.vue) | 草地渐变背景，带草动效果 |
| 水面背景 | [WaterBackground.vue](src/components/background/WaterBackground.vue) | 水波纹动画背景，支持暗色模式 |

### 博客组件

| 组件 | 文件位置 | 描述 |
|------|----------|------|
| 博客卡片 | [BlogCard.vue](src/components/blog/BlogCard.vue) | 文章列表卡片，展示封面、标题、摘要等信息 |
| 博客分页 | [BlogPagination.vue](src/components/blog/BlogPagination.vue) | 文章列表分页控件 |

### 放松模块组件

| 组件 | 文件位置 | 描述 |
|------|----------|------|
| 放松区域 | [RelaxSection.vue](src/components/relax/RelaxSection.vue) | 历史上的今天、日历、音乐播放器组合区域 |
| 迷你播放器 | [MiniPlayer.vue](src/components/MiniPlayer.vue) | 全局浮动迷你音乐播放器 |
| 音乐播放器 | [MusicPlayer.vue](src/components/relax/MusicPlayer.vue) | 完整音乐播放器组件 |

### 布局组件

| 组件 | 文件位置 | 描述 |
|------|----------|------|
| 顶部导航 | [AppHeader.vue](src/components/AppHeader.vue) | 顶部导航栏，支持透明悬浮、路由高亮、滚动变色、赛博朋克故障效果 |
| 底部页脚 | [AppFooter.vue](src/components/AppFooter.vue) | 底部页脚，支持透明模式适配，显示系统版本与同步时间 |

### 设置组件

| 组件 | 文件位置 | 描述 |
|------|----------|------|
| 设置面板 | [SettingsPanel.vue](src/components/settings/SettingsPanel.vue) | 主题切换、主题色选择等设置项 |

---

## 配置说明

### 路由配置

路由定义在 [src/router/index.js](src/router/index.js)：

| 路由路径 | 组件 | 描述 |
|----------|------|------|
| `/` | - | 重定向到 `/home` |
| `/home` | HomeView.vue | 首页 |
| `/articles` | ArticlesView.vue | 文章页面 |
| `/study/*` | StudyView.vue | 学习页面（捕获所有子路由） |
| `/project` | ProjectView.vue | 项目列表 |
| `/project/:slug` | ProjectDetail.vue | 项目详情（动态路由） |
| `/admin` | AdminView.vue | 管理后台 |

### API 路由

后端 API 路由定义在 `server/routes/` 目录：

| API 路径 | 描述 |
|----------|------|
| `/lx-api/articles` | 文章 CRUD 接口 |
| `/lx-api/notes` | 笔记 CRUD 接口 |
| `/lx-api/projects` | 项目 CRUD 接口 |
| `/lx-api/upload` | 文件上传接口 |
| `/lx-api/admin` | 管理员认证接口 |
| `/lx-api/health` | 健康检查接口 |

---

## 自定义配置指南

### 一、添加新文章

文章系统支持两种方式添加：

#### 方式一：通过管理后台（推荐）

1. 访问 `/admin` 路径，登录管理后台
2. 在"文章管理"标签页点击"新建文章"
3. 使用 Markdown 编辑器编写内容并保存

#### 方式二：手动配置

文章系统由两部分组成：**数据配置** + **Markdown 内容文件**。

##### 1. 编写 Markdown 内容

在 `src/data/content/` 目录下创建 Markdown 文件：

```
src/data/content/
├── article-1.md
├── article-2.md
└── my-new-article.md    ← 新建文件
```

支持标准 Markdown 语法，包括标题、代码块、图片、链接、列表等。

##### 2. 注册文章数据

编辑 [src/data/articles.js](src/data/articles.js)，在 `articles` 数组中添加新条目：

```javascript
{
  id: 12,                              // 唯一 ID（递增）
  title: '我的新文章标题',
  excerpt: '文章摘要，显示在卡片列表中...',
  category: '技术',                    // 分类名，需与 categories 中一致
  tags: ['Vue', 'JavaScript'],         // 文章标签
  readTime: '15分钟',                  // 预计阅读时间
  views: 0,                           // 阅读量
  likes: 0,                           // 点赞数
  comments: 0,                        // 评论数
  date: '2026/05/29 10:00',           // 发布日期
  cover: 'https://example.com/cover.jpg', // 封面图片 URL
  contentPath: 'my-new-article.md'     // 对应 src/data/content/ 下的文件名
}
```

##### 3. 更新分类计数

在同文件的 `categories` 数组中更新对应分类的 `count`：

```javascript
export const categories = [
  { name: '全部', count: 12 },   // 总数 +1
  { name: '技术', count: 9 },    // 对应分类 +1
  { name: '闲聊', count: 3 }
]
```

> **注意**：文章列表在首页和文章页都会展示，新添加的文章会自动出现在列表中。

---

### 二、添加学习笔记

学习笔记系统由 **目录配置** + **Markdown 文档文件** 组成。

#### 1. 编写 Markdown 文档

在 `public/docs/` 目录下按分类创建文件：

```
public/docs/
├── frontend/
│   ├── web-intro.md
│   ├── HTML.md
│   └── CSS.md
├── GIS/
│   ├── webgis-basic.md
│   ├── Leaflet.md
│   └── Cesium.md
└── backend/              ← 新建分类目录
    └── Node.md           ← 新建文档
```

文档支持标准 Markdown 语法。标题（h1-h4）会自动生成右侧大纲目录，支持点击跳转和滚动高亮。

#### 2. 注册目录配置

编辑 [src/data/config.js](src/data/config.js)，在 `studyMenu` 数组中添加：

```javascript
// 添加新分类
{
  title: '后端开发',
  icon: 'folder',
  children: [
    { title: 'Node.js', path: '/docs/backend/Node.md' }
  ]
}

// 或在已有分类中添加新文档
{
  title: 'Web开发',
  icon: 'folder',
  children: [
    // ... 已有条目
    { title: 'Vue3深入', path: '/docs/frontend/Vue3-advanced.md' }  // 新增
  ]
}
```

> **路径说明**：`path` 以 `/docs/` 开头，对应 `public/docs/` 文件夹。

---

### 三、添加项目示例

项目系统支持两种方式添加：

#### 方式一：通过管理后台（推荐）

1. 访问 `/admin` 路径，登录管理后台
2. 在"项目管理"标签页点击"新建项目"
3. 填写项目信息、上传截图并保存

#### 方式二：API 接口

项目数据存储在 SQLite 数据库中，通过 API 动态加载。可以使用以下 API：

```bash
# 获取所有项目
GET /lx-api/projects

# 创建新项目（需要认证）
POST /lx-api/projects
{
  "title": "项目名称",
  "route_index": "project/my-project",
  "description": "项目描述",
  "config": {
    "name": "项目名称",
    "url": "https://example.com",
    "description": "详细描述",
    "techStack": ["Vue", "Express"],
    "responsibilities": ["负责前端开发"],
    "images": ["/uploads/screenshot1.png"]
  }
}
```

---

### 四、添加音乐

音乐文件放在 `public/music/` 目录下，包含 MP3 音频和封面图片：

```
public/music/
├── song-name.mp3        ← 音频文件
└── song-name.png        ← 封面图片
```

#### 注册歌曲

编辑 [src/composables/useAudioPlayer.ts](src/composables/useAudioPlayer.ts)，在 `defaultSongs` 数组中添加：

```typescript
{
  name: '歌曲名称',
  artist: '艺术家',
  url: '/music/song-name.mp3',
  cover: '/music/song-name.png'
}
```

---

---

### 六、主题色配置

主题色预设定义在 [src/composables/useTheme.ts](src/composables/useTheme.ts) 的 `themeColorPresets` 对象中，支持 6 种预设主题：

- **默认白** - 纯净白色主题
- **淡紫色** - 优雅紫色调
- **淡绿色** - 清新绿色调
- **薄荷绿** - 凉爽薄荷色
- **柔蓝色** - 温和蓝色调
- **淡粉色** - 柔和粉色调

此外还支持**赛博朋克模式**（彩蛋特性），通过特殊方式触发。

---

### 七、环境变量配置

API 密钥等敏感信息通过 `.env` 文件配置（参考 `.env.example`）：

```env
# 后端服务端口
PORT=3000

# JWT 密钥
JWT_SECRET=your-jwt-secret

# 管理员账户
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-password

# 聚合数据 API（可选）
VITE_JUHE_API_KEY_CALENDAR=your-calendar-api-key
VITE_JUHE_API_KEY_HISTORY=your-history-api-key
```

---

### 资源文件目录速查

| 资源类型 | 目录路径 | 说明 |
|----------|----------|------|
| 文章内容 | `src/data/content/` | 文章 Markdown 文件 |
| 学习笔记 | `public/docs/` | 学习文档 Markdown 文件 |
| 项目截图 | `public/Preview/` | 项目预览图片（按项目分文件夹） |
| 音乐文件 | `public/music/` | MP3 音频 + 封面图片 |
| 图标字体 | `src/assets/fonts/` | iconfont 图标文件 |
| 全局样式 | `src/assets/styles/main.scss` | 主题变量、全局样式 |
| 文章数据 | `src/data/articles.js` | 文章列表配置 |
| 学习目录 | `src/data/config.js` | 学习模块菜单配置 |
| 音乐列表 | `src/composables/useAudioPlayer.ts` | 播放器歌曲配置 |
| 上传文件 | `uploads/` | 用户上传的文件 |
| 数据库 | `data/` | SQLite 数据库文件 |
| 后端路由 | `server/routes/` | API 路由定义 |
| 主题配置 | `src/composables/useTheme.ts` | 主题色与模式配置 |

---

## 贡献规范

### 代码风格

1. 使用 Vue 3 Composition API (`<script setup>`)
2. 使用中文进行代码注释
3. 遵循 ESLint 代码规范
4. 组件文件使用 PascalCase 命名

### Git 提交规范

```
type: subject

body (可选)

footer (可选)
```

**type 类型**：
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 样式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具变更

### 问题反馈

通过 GitHub Issues 反馈问题时，请包含：
- 清晰的标题和描述
- 复现步骤
- 预期 vs 实际行为
- 环境信息（操作系统、Node 版本等）

---

## 许可证

MIT License

---

## 致谢

### 开源框架与库

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Vue Router](https://router.vuejs.org/) - Vue.js 官方路由管理
- [Element Plus](https://element-plus.org/) - 基于 Vue 3 的组件库
- [Express](https://expressjs.com/) - 快速、开放、极简的 Web 框架
- [sql.js](https://sql.js.org/) - SQLite 的 JavaScript 实现
- [markdown-it](https://markdown-it.github.io/) - Markdown 解析器
- [highlight.js](https://highlightjs.org/) - 语法高亮库

### 设计灵感

- 动画效果参考 Dribbble 与 CodePen 上的优秀作品
- UI 设计借鉴了现代极简主义风格
- 配色方案源自自然与宇宙的视觉元素

### 字体与图标

- 图标字体使用 iconfont.cn 生成
- 中文字体使用系统默认字体栈优化显示

---

*在技术的星河中探索，与开发者共同成长*
