# Astro Blog

一个面向个人写作的现代静态博客，基于 `Astro + TypeScript + MDX + Content Collections + Tailwind CSS 4`。

## 技术栈

- Astro `6.1.8`
- TypeScript `5.9.3`
- MDX
- Astro Content Collections
- Tailwind CSS 4
- GitHub Pages 部署

## 本地开发

建议先切到 `Node 22 LTS`。项目根目录已经提供 `.nvmrc`：

```bash
nvm install 22
nvm use
npm install
npm run dev
```

默认开发地址：

```text
http://localhost:4321/
```

## 项目结构

```text
astro-blog/
├─ public/
├─ src/
│  ├─ components/
│  ├─ content/blog/
│  ├─ layouts/
│  ├─ pages/
│  ├─ styles/
│  └─ utils/
├─ astro.config.mjs
└─ package.json
```

## 写文章

文章放在 `src/content/blog/`，使用 `.md` 或 `.mdx` 都可以。

示例 frontmatter：

```md
---
title: 一篇新文章
description: 用一句话概括这篇文章。
pubDate: 2026-04-20
updatedDate: 2026-04-20
tags:
  - Astro
  - 写作
featured: false
draft: false
---
```

## 自定义站点信息

优先修改这些文件：

- `src/layouts/MainLayout.astro`
- `src/pages/index.astro`
- `src/pages/about.astro`
- `public/favicon.svg`

## GitHub Pages 部署

项目自带 GitHub Actions 工作流：`.github/workflows/deploy.yml`

如果仓库地址是：

```text
https://github.com/<your-name>/<repo>
```

GitHub Pages 默认会发布到：

```text
https://<your-name>.github.io/<repo>/
```

如果以后绑定自定义域名，建议在仓库 Secrets 或 Actions 变量里设置：

- `SITE=https://你的域名`

例如：

```text
SITE=https://blog.example.com
```
