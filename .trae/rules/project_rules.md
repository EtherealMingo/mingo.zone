# mingo.zone 项目开发规范

## 1. 技术栈

- 前端框架：React 18
- 构建工具：Vite
- 样式：Tailwind CSS
- 动画：Framer Motion
- UI 组件：Radix UI、Lucide React
- 其他依赖：axios、react-router-dom、react-hook-form、zod 等

## 2. 目录结构

- `src/components/`：通用组件，按功能拆分，复用性强
- `src/pages/`：页面级组件，每个页面一个文件
- `src/data/`：静态数据文件（如简历、项目等）
- `src/lib/`：工具函数和通用逻辑
- `public/`：静态资源（如 resume.pdf）
- `build/`：生产环境构建输出

## 3. 代码规范

- 使用 ES6+ 语法，推荐使用函数式组件和 Hooks
- 组件命名采用大驼峰（PascalCase），文件名与组件名一致
- 变量、函数、常量使用小驼峰（camelCase）
- 样式优先使用 Tailwind CSS 工具类，避免写自定义 CSS
- 动画统一使用 Framer Motion
- 路由统一在 `src/nav-items.jsx` 配置
- 静态数据统一放在 `src/data/`，避免硬编码到组件中

## 4. 依赖管理

- 使用 npm 统一管理依赖
- 安装新依赖需更新 `package.json` 并说明用途
- 不允许在项目中引入未声明的依赖

## 5. 代码质量

- 强制使用 ESLint 进行代码检查，保持代码风格一致
- 推荐使用 Prettier 进行格式化
- 组件拆分合理，避免单文件过大
- 复用性强的 UI 组件放在 `src/components/ui/`

## 6. 资源管理

- 图片等静态资源优先使用 CDN 或 public 目录
- 简历 PDF 文件放在 `public/resume.pdf`
- 生产构建输出到 `build/` 目录

## 7. 版本控制

- 遵循 Git 分支管理规范，主分支为 `main`
- 提交信息需简明扼要，建议使用英文
- 忽略 node_modules、build、.env 等敏感或大文件

## 8. 其他约定

- 如需自定义简历内容，修改 [`src/data/resumeData.js`](../../src/data/resumeData.js)
- 如需更换简历 PDF，替换 [`public/resume.pdf`](../../public/resume.pdf)
- 所有外链需加 `rel="noopener noreferrer"`，新窗口打开需加 `target="_blank"`
