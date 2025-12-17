# seemse-ai-web

[English](./README_EN.md) | 简体中文

🚀 **版本**: v2.0.0 | 📅 **更新日期**: 2025年1月 | 🌐 **项目地址**: [https://github.com/seemse/seemse-ai-web.git](https://github.com/seemse/seemse-ai-web.git)

一个基于 Vue 3 的现代化 AI 聊天应用前端，支持 ChatGPT、Midjourney 等多种 AI 功能。

## 📚 项目生态

Seemse AI 是一套完整的人工智能解决方案，包含以下核心项目：

- **后端项目** : [https://github.com/seemse/seemse_ai](https://github.com/seemse/seemse_ai) 
  - 基于 Spring Boot + MyBatis Plus 构建的AI服务后端
  - 提供用户管理、AI模型管理、对话处理等核心API服务
  - 支持多种AI模型集成（OpenAI、Claude、文心一言等）

- **管理端地址** : [https://github.com/seemse/seemse-ai-admin](https://github.com/seemse/seemse-ai-admin)  
  - 基于 Vue 3 + Ant Design Vue 的企业级管理后台
  - 提供用户管理、系统配置、AI模型配置、数据统计等功能
  - 支持权限管理、系统监控、日志管理等企业级特性

- **聊天应用前端地址** : [https://github.com/seemse/seemse-ai-web](https://github.com/seemse/seemse-ai-web)
  - 基于 Vue 3 + TypeScript 的现代化聊天应用
  - 支持多模型对话、历史记录、文件上传等功能
  - 响应式设计，支持PC端和移动端访问

## ✨ 功能特性

- 🤖 **ChatGPT 对话** - 支持多轮对话，智能回复
- 🎨 **Midjourney 绘图** - AI 图像生成和编辑
- 🎵 **语音功能** - 语音识别和文字转语音
- 📱 **响应式设计** - 支持桌面端和移动端
- 🌍 **国际化** - 多语言支持
- 🎨 **主题切换** - 明暗主题切换

## 🛠️ 技术栈

- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **UI 组件**: Naive UI + Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router
- **样式**: TailwindCSS + Less
- **图标**: Iconify
- **PWA**: Vite PWA Plugin

## 📋 环境要求

- **Node.js**: >= 18.0.0 (推荐 **v18.19.0** 或 **v20.11.0** LTS版本)
- **npm**: >= 9.0.0 (或使用 pnpm/yarn)

> ⚠️ **兼容性说明**: 项目已在 Node.js 18.x 和 20.x 版本上测试通过。使用其他版本可能导致依赖安装或构建问题。

## 🚀 快速开始

### 下载项目

```bash
# 使用HTTPS
git clone https://github.com/seemse/seemse-ai-web.git
cd seemse-ai-web

# 或使用SSH
git clone git@github.com:seemse/seemse-ai-web.git
cd seemse-ai-web
```

### 安装依赖

```bash
npm install
```

### 运行项目

```bash
npm run dev
```

项目将在 `http://localhost:1002` 启动

### 打包构建

```bash
npm run build
```

## 📦 可用脚本

```bash
# 开发环境启动
npm run dev

# 生产环境构建
npm run build

# 预览构建结果
npm run preview

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 自动修复代码格式
npm run lint:fix

# 文档开发
npm run docs:dev

# 文档构建
npm run docs:build
```

## 🔧 配置说明

项目使用环境变量进行配置，请根据需要创建 `.env` 文件：

### 核心配置项

```env
# API 基础地址 (后端服务地址)
VITE_APP_API_BASE_URL=http://localhost:8080/

# 全局 API URL 前缀
VITE_GLOB_API_URL=/api

# 是否启用 PWA
VITE_GLOB_APP_PWA=false

# 是否支持长回复 (可能产生更高 API 费用)
VITE_GLOB_OPEN_LONG_REPLY=false
```

### 配置示例文件

项目提供以下配置模板：

- `.env` - 基础配置
- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置

> 💡 **配置优先级**: `.env.production` > `.env.development` > `.env`

### 前端特有配置

```env
# 应用标题
VITE_GLOB_APP_TITLE=seemse-ai-web

# 应用短标题
VITE_GLOB_APP_SHORT_TITLE=seemse

# 本地存储前缀
VITE_GLOB_APP_LOCAL_STORAGE_KEY=seemse_
```

## 📁 项目结构

```
seemse-ai-web/
├── public/                 # 静态资源
│   ├── config.js          # 全局运行时配置
│   ├── favicon.ico        # 网站图标
│   └── index.html         # HTML模板
├── src/
│   ├── api/               # API 接口封装
│   ├── assets/            # 静态资源文件
│   ├── components/        # 可复用组件
│   ├── hooks/             # Vue组合式函数
│   ├── locales/           # 国际化配置
│   ├── router/            # 路由配置
│   ├── store/             # 状态管理 (Pinia)
│   ├── styles/            # 全局样式
│   ├── utils/             # 工具函数
│   ├── views/             # 页面级组件
│   ├── App.vue            # 根组件
│   └── main.ts            # 应用入口文件
├── docs/                  # 项目文档和截图
├── docker-compose/        # Docker部署配置
├── kubernetes/           # Kubernetes部署配置
├── .env*                 # 环境变量配置
├── package.json          # 项目依赖和脚本
├── tsconfig.json         # TypeScript配置
├── vite.config.ts        # Vite构建配置
└── tailwind.config.js    # TailwindCSS配置
```

## 🚀 部署方式对比

| 部署方式 | 适用场景 | 优点 | 缺点 | 推荐程度 |
|---------|---------|------|------|----------|
| **开发环境** | 本地开发调试 | 热重载、调试方便 | 仅适用于开发 | ⭐⭐⭐⭐⭐ |
| **Docker Compose** | 小型生产环境 | 部署简单、环境隔离 | 单点故障风险 | ⭐⭐⭐⭐ |
| **Kubernetes** | 大型生产环境 | 高可用、弹性伸缩 | 配置复杂、资源要求高 | ⭐⭐⭐⭐ |
| **静态部署** | CDN部署 | 访问速度快、成本低 | 需要后端API支持 | ⭐⭐⭐ |

## 👨‍💻 开发指南

### 前端开发规范

1. **代码规范**: 项目使用 ESLint + Prettier 进行代码格式化
2. **提交规范**: 遵循 Conventional Commits 规范
3. **分支策略**: 使用 Git Flow 工作流
4. **组件开发**: 优先使用 Composition API

### 环境变量配置

开发环境推荐配置：

```env
# .env.development
VITE_APP_API_BASE_URL=http://localhost:8080/
VITE_GLOB_API_URL=/api
VITE_GLOB_APP_PWA=false
```

生产环境推荐配置：

```env
# .env.production
VITE_APP_API_BASE_URL=https://api.yourdomain.com/
VITE_GLOB_API_URL=/api
VITE_GLOB_APP_PWA=true
```

### 性能优化建议

1. **组件懒加载**: 使用动态导入实现路由级代码分割
2. **图片优化**: 使用 WebP 格式，配置图片压缩
3. **缓存策略**: 合理配置 HTTP 缓存头
4. **CDN加速**: 静态资源使用 CDN 分发

## 📚 相关文档

- [Docker部署指南](./docker-compose/readme.md)
- [Kubernetes部署指南](./kubernetes/README.md)
- [API接口文档](./docs/api.md) (待完善)
- [组件文档](./docs/components.md) (待完善)

## 🤝 贡献指南

我们欢迎所有形式的贡献，包括但不限于：

- 🐛 [提交Bug](https://github.com/seemse/seemse-ai-web/issues)
- 💡 [功能建议](https://github.com/seemse/seemse-ai-web/issues)
- 📝 [文档改进](https://github.com/seemse/seemse-ai-web/pulls)
- 🔧 [代码贡献](https://github.com/seemse/seemse-ai-web/pulls)

### 开发流程

1. Fork 项目到个人仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交变更 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目基于 [Apache-2.0](./license) 许可证开源。

---

⭐ 如果这个项目对你有帮助，请给它一个星标！

## 📊 项目统计

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Vue](https://img.shields.io/badge/vue-3.x-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/typescript-4.9.x-blue.svg)