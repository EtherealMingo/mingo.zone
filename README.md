# mingo.zone 个人主页

本项目为「Mingo」的个人主页，基于 React + Vite + Tailwind CSS 构建，展示了前端开发、项目作品、摄影作品及简历等内容。

## 功能特性

- 响应式设计，适配 PC 与移动端
- 个人简介、技能展示、项目作品、摄影作品、在线简历
- 支持简历 PDF 一键下载
- 暗色/亮色主题切换
- 现代前端技术栈：React 18、Vite、Tailwind CSS、Framer Motion、Radix UI

## 快速开始

### 1. 安装 Node.js（推荐使用 NVM）

```bash
# 安装 NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# 安装 Node.js 16
nvm install 16
nvm use 16
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:8080](http://localhost:8080) 查看效果。

### 4. 构建生产环境

```bash
npm run build
```

构建产物输出至 `build/` 目录。

## 目录结构

```
.
├── src/                # 源码目录
│   ├── components/     # 通用组件
│   ├── data/           # 数据文件（简历、项目等）
│   ├── pages/          # 页面组件
│   └── lib/            # 工具函数
├── public/             # 公共资源（如 resume.pdf）
├── build/              # 构建输出目录
├── index.html          # 入口 HTML
├── tailwind.config.js  # Tailwind 配置
├── vite.config.js      # Vite 配置
└── package.json
```

## 主要依赖

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)

## 其他

- 如需自定义简历内容，请修改 [`src/data/resumeData.js`](src/data/resumeData.js)
- 如需更换简历 PDF，请替换 [`public/resume.pdf`](public/resume.pdf)

---

> © 2024 Mingo | [https://www.mingo.zone](https://www.mingo.zone)
