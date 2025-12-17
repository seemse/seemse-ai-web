# 环境变量配置指南

## 📋 概述

seemse-ai-web 使用 Vite 的环境变量系统，支持多环境配置。所有环境变量必须以 `VITE_` 前缀开头。

## 🔧 核心配置项

### API 配置

| 变量名 | 说明 | 默认值 | 示例 |
|--------|------|--------|------|
| `VITE_APP_API_BASE_URL` | 后端 API 基础地址 | - | `http://localhost:8080/` |
| `VITE_GLOB_API_URL` | API URL 前缀 | `/api` | `/api` |
| `VITE_GLOB_OPEN_LONG_REPLY` | 是否支持长回复 | `false` | `true/false` |

### 应用配置

| 变量名 | 说明 | 默认值 | 示例 |
|--------|------|--------|------|
| `VITE_GLOB_APP_TITLE` | 应用标题 | `seemse-ai-web` | `My AI Assistant` |
| `VITE_GLOB_APP_SHORT_TITLE` | 应用短标题 | `seemse` | `AI` |
| `VITE_GLOB_APP_LOCAL_STORAGE_KEY` | 本地存储前缀 | `seemse_` | `myapp_` |
| `VITE_GLOB_APP_PWA` | 是否启用 PWA | `false` | `true/false` |

## 📁 配置文件结构

```
seemse-ai-web/
├── .env                    # 基础配置 (所有环境共享)
├── .env.development       # 开发环境配置
├── .env.production        # 生产环境配置
└── .env.staging           # 预发布环境配置 (可选)
```

## 🚀 配置优先级

环境变量的加载优先级（从高到低）：

1. `.env.[mode].local` (本地模式特定配置)
2. `.env.[mode]` (模式特定配置)
3. `.env.local` (本地配置)
4. `.env` (基础配置)

## 💡 配置示例

### 开发环境 (.env.development)

```env
# API 配置
VITE_APP_API_BASE_URL=http://localhost:8080/
VITE_GLOB_API_URL=/api

# 应用配置
VITE_GLOB_APP_TITLE=seemse-ai-web (Dev)
VITE_GLOB_APP_PWA=false

# 功能配置
VITE_GLOB_OPEN_LONG_REPLY=true
```

### 生产环境 (.env.production)

```env
# API 配置
VITE_APP_API_BASE_URL=https://api.seemse.com/
VITE_GLOB_API_URL=/api

# 应用配置
VITE_GLOB_APP_TITLE=seemse-ai-web
VITE_GLOB_APP_PWA=true

# 功能配置
VITE_GLOB_OPEN_LONG_REPLY=false
```

### 基础配置 (.env)

```env
# 共享配置
VITE_GLOB_APP_SHORT_TITLE=seemse
VITE_GLOB_APP_LOCAL_STORAGE_KEY=seemse_
```

## ⚠️ 注意事项

1. **安全性**: 不要将敏感信息（如密钥、密码）直接写入环境变量文件
2. **版本控制**: `.env.local` 文件应该添加到 `.gitignore` 中
3. **命名规范**: 所有环境变量必须以 `VITE_` 前缀开头
4. **类型转换**: 环境变量都是字符串类型，需要在代码中进行类型转换

## 🔍 调试技巧

### 查看当前配置

在浏览器控制台中运行：

```javascript
// 查看所有环境变量
console.log(import.meta.env)

// 查看特定变量
console.log(import.meta.env.VITE_APP_API_BASE_URL)
```

### 配置验证

在 `src/utils/env.ts` 中添加配置验证：

```typescript
export function validateEnv() {
  const requiredEnvVars = [
    'VITE_APP_API_BASE_URL',
    'VITE_GLOB_API_URL'
  ]
  
  const missing = requiredEnvVars.filter(key => !import.meta.env[key])
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing)
    return false
  }
  
  return true
}
```

## 🐛 常见问题

### Q: 环境变量不生效？

A: 检查以下几点：
- 变量名是否以 `VITE_` 开头
- 文件命名是否正确 (`.env.development` vs `.env.development.local`)
- 是否重启了开发服务器
- 是否在正确的文件中定义了变量

### Q: 如何根据不同环境加载不同配置？

A: 使用 Vite 的模式功能：

```bash
# 开发模式
npm run dev

# 生产模式
npm run build

# 自定义模式
vite build --mode staging
```

### Q: 如何在运行时动态修改配置？

A: 对于需要运行时配置的场景，使用 `public/config.js`：

```javascript
// public/config.js
window.APP_CONFIG = {
  API_BASE_URL: 'http://localhost:8080/',
  // ...其他配置
}
```

然后在代码中读取：

```typescript
const config = (window as any).APP_CONFIG
```