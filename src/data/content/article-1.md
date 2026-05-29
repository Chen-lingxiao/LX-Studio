# 震惊，AI直接把我整个项目画成了知识图谱

## 引言

最近发现了一个神奇的 Claude Code 插件，可以扫描你的代码库，自动生成可视化知识图谱。这对于理解大型项目的架构非常有帮助。

## 安装步骤

首先，你需要安装 Claude Code 插件：

```bash
npm install @claude-code/core
```

## 使用方法

```javascript
import { KnowledgeGraph } from '@claude-code/core'

const graph = new KnowledgeGraph({
  projectPath: './src',
  exclude: ['node_modules', '.git']
})

await graph.build()
graph.render('knowledge-graph.html')
```

## 效果展示

生成的知识图谱包含：
- 模块依赖关系
- 类继承层次
- 函数调用链
- 文件组织结构

## 总结

这个工具大大提升了我对项目架构的理解效率，强烈推荐给所有开发者！