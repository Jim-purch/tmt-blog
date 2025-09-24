---
title: '欢迎来到 TMT Blog'
date: '2024-01-15'
excerpt: '这是 TMT Blog 的第一篇文章，介绍了这个博客的特点和使用方法。'
author:
  name: 'TMT Team'
tags: ['博客', '介绍', 'Next.js']
---

# 欢迎来到 TMT Blog

欢迎来到 TMT Blog！这是一个使用 Next.js 构建的现代化静态博客，专注于分享技术见解与思考。

## 博客特点

### 🚀 现代化技术栈
- **Next.js 14**: 使用最新的 App Router 和 React Server Components
- **TypeScript**: 提供类型安全的开发体验
- **Tailwind CSS**: 现代化的 CSS 框架，支持响应式设计
- **Markdown**: 支持 Markdown 格式的文章编写

### 📝 简单易用
- 只需在 `posts` 文件夹中添加 `.md` 文件即可创建新文章
- 支持 frontmatter 元数据（标题、日期、摘要、标签等）
- 自动生成文章列表和详情页面

### 🎨 美观的设计
- 响应式设计，支持桌面和移动设备
- 深色模式支持
- 清晰的排版和阅读体验

## 如何添加文章

1. 在项目根目录的 `posts` 文件夹中创建新的 `.md` 文件
2. 在文件开头添加 frontmatter：

```markdown
---
title: '文章标题'
date: '2024-01-15'
excerpt: '文章摘要'
tags: ['标签1', '标签2']
---

# 文章内容

这里是文章的正文内容...
```

3. 保存文件后，文章将自动显示在博客中

## 部署到 Vercel

这个博客已经配置好了 Vercel 部署：

1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中连接你的 GitHub 仓库
3. Vercel 会自动检测 Next.js 项目并进行部署

每次向 `main` 分支推送代码时，Vercel 都会自动重新部署你的博客。

## 开始写作

现在你可以开始在 `posts` 文件夹中添加你的文章了。支持所有标准的 Markdown 语法，包括：

- **粗体文本**
- *斜体文本*
- `代码片段`
- [链接](https://example.com)
- 列表
- 引用
- 代码块

> 这是一个引用示例。你可以用它来突出重要的信息。

```javascript
// 这是一个代码块示例
function hello() {
  console.log('Hello, TMT Blog!');
}
```

祝你写作愉快！🎉