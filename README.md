# TMT Blog

这是一个使用 Next.js、Markdown 和 TypeScript 构建的静态博客。

## 功能特点

- 使用 Next.js 14 的静态生成功能
- 支持 Markdown 格式的博客文章
- TypeScript 类型安全
- 使用 Tailwind CSS 进行样式设计
- 响应式设计，支持移动端

## 技术栈

- **Next.js 14**: React 框架，支持静态生成
- **TypeScript**: 提供类型安全
- **Tailwind CSS**: CSS 框架
- **remark**: Markdown 处理
- **gray-matter**: frontmatter 解析

## 项目结构

```
├── posts/                 # 博客文章目录
├── src/
│   ├── app/               # Next.js App Router
│   ├── interfaces/        # TypeScript 接口定义
│   └── lib/               # 工具函数
├── public/                # 静态资源
└── package.json
```

## 本地开发

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 添加文章

在 `posts` 目录下创建新的 `.md` 文件，文件开头需要包含 frontmatter：

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

## 构建和部署

```bash
npm run build
npm start
```
