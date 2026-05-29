# Next.js App Router 组件边界：什么时候用服务端组件，什么时候用客户端

## 概述

Next.js 13 引入了 App Router，带来了服务端组件（Server Components）和客户端组件（Client Components）的概念。理解它们的边界非常重要。

## 服务端组件

服务端组件运行在服务器端，适合：

- 获取数据
- 访问数据库
- 调用 API
- 不需要交互的静态内容

```jsx
// 服务端组件 - 默认
async function BlogPost({ id }) {
  const post = await db.posts.find({ id })
  return <article>{post.content}</article>
}
```

## 客户端组件

客户端组件运行在浏览器，需要使用 `"use client"` 指令：

- 处理用户交互
- 使用 useState、useEffect
- 访问浏览器 API
- 使用第三方库

```jsx
'use client'

function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0)
  
  const handleLike = () => {
    setLikes(prev => prev + 1)
  }
  
  return <button onClick={handleLike}>{likes} ❤️</button>
}
```

## 最佳实践

1. **默认使用服务端组件** - 减少客户端 bundle 大小
2. **按需添加交互** - 只在需要时使用客户端组件
3. **分离关注点** - 将数据获取和展示逻辑分离