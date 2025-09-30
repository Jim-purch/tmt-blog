# BAT Blog

这是一个使用 Next.js、Markdown 和 TypeScript 构建的静态博客，专注于叉车配件和相关产品的展示。

## 功能特点

- 使用 Next.js 15 的静态生成功能
- 支持多语言国际化 (i18n)
- 多货币支持和价格本地化
- 支持 Markdown 格式的博客文章
- TypeScript 类型安全
- 使用 Tailwind CSS 进行样式设计
- 响应式设计，支持移动端
- 产品搜索和筛选功能
- 购物车功能
- SEO 优化

## 技术栈

- **Next.js 15**: React 框架，支持静态生成和服务端渲染
- **TypeScript**: 提供类型安全
- **Tailwind CSS**: CSS 框架
- **remark**: Markdown 处理
- **gray-matter**: frontmatter 解析
- **React 19**: 最新的 React 版本

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

## 安全性

### 环境变量管理
- 所有敏感配置都存储在 `.env.local` 文件中
- `.env.local` 已添加到 `.gitignore` 中，不会被提交到版本控制
- 生产环境中使用 Vercel 的环境变量管理

### 安全最佳实践
- 使用 TypeScript 提供类型安全
- 所有用户输入都经过适当的验证和清理
- 实施了 CSP (Content Security Policy) 头部
- 启用了 XSS 保护和其他安全头部
- 定期更新依赖项以修复安全漏洞

### 依赖项安全
定期运行以下命令检查安全漏洞：
```bash
npm audit
npm audit fix
```

### 敏感信息处理
- 不在代码中硬编码 API 密钥或敏感信息
- 使用环境变量存储配置
- 生产环境中的敏感数据通过 Vercel 环境变量管理

## 部署安全配置

### Vercel 安全头部
项目配置了以下安全头部：
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### HTTPS 强制
- 生产环境强制使用 HTTPS
- 所有 HTTP 请求自动重定向到 HTTPS

## 贡献指南

### 安全报告
如果发现安全漏洞，请通过以下方式报告：
- 发送邮件至：security@blueant.top
- 请不要在公开的 issue 中报告安全问题

### 代码审查
- 所有代码更改都需要经过审查
- 确保新代码遵循安全最佳实践
- 检查是否引入了新的安全风险
