# 前端开发指南

## 📋 项目概述

seemse-ai-web 是一个基于 Vue 3 + TypeScript 的现代化 AI 聊天应用前端，支持 ChatGPT、Midjourney 等多种 AI 功能。

## 🛠️ 技术栈

- **框架**: Vue 3.2.47 + TypeScript 4.9.5
- **构建工具**: Vite 4.2.0
- **UI 组件**: Naive UI 2.34.3 + Element Plus 2.9.2
- **状态管理**: Pinia 2.0.33
- **路由**: Vue Router 4.1.6
- **样式**: TailwindCSS 3.3.6 + Less
- **图标**: Iconify + @vicons/ionicons5
- **国际化**: Vue I18n 9.2.2
- **PWA**: Vite PWA Plugin

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0.0 (推荐 v18.19.0 LTS 或 v20.11.0 LTS)
- **包管理器**: npm >= 9.0.0 (或 pnpm/yarn)

### 安装和运行

```bash
# 克隆项目
git clone https://github.com/seemse/seemse-ai-web.git
cd seemse-ai-web

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📁 项目结构

```
src/
├── api/                    # API 接口封装
│   ├── index.ts           # API 统一导出
│   ├── openai.ts          # OpenAI 相关接口
│   └── mj.ts              # Midjourney 相关接口
├── assets/                 # 静态资源
│   ├── images/            # 图片资源
│   └── styles/            # 全局样式
├── components/             # 可复用组件
│   ├── common/            # 通用组件
│   ├── chat/              # 聊天相关组件
│   └── mj/                # Midjourney 相关组件
├── composables/            # 组合式函数 (Vue 3)
│   ├── useTheme.ts        # 主题切换
│   ├── useI18n.ts         # 国际化
│   └── useApi.ts          # API 调用
├── locales/                # 国际化配置
│   ├── zh-CN.ts           # 简体中文
│   ├── en-US.ts           # 英文
│   └── ko-KR.ts           # 韩文
├── router/                 # 路由配置
│   ├── index.ts           # 路由实例
│   └── routes.ts          # 路由定义
├── store/                  # 状态管理 (Pinia)
│   ├── modules/           # 状态模块
│   └── index.ts           # Store 实例
├── styles/                 # 样式文件
│   ├── tailwind.css       # TailwindCSS 配置
│   └── variables.less     # Less 变量
├── utils/                  # 工具函数
│   ├── request/           # HTTP 请求封装
│   ├── storage/           # 本地存储封装
│   └── index.ts           # 工具函数导出
├── views/                  # 页面级组件
│   ├── chat/              # 聊天页面
│   ├── mj/                # Midjourney 页面
│   └── settings/        # 设置页面
├── App.vue                 # 根组件
└── main.ts                 # 应用入口
```

## 💻 开发规范

### 代码规范

1. **使用 Composition API**: 优先使用 `<script setup>` 语法
2. **TypeScript**: 所有代码使用 TypeScript，避免使用 `any` 类型
3. **组件命名**: 使用 PascalCase，如 `ChatComponent.vue`
4. **组合式函数**: 使用 camelCase，以 `use` 开头，如 `useTheme`
5. **常量命名**: 使用 UPPER_SNAKE_CASE，如 `API_BASE_URL`

### 组件开发规范

```vue
<!-- 推荐的组件结构 -->
<template>
  <div class="chat-component">
    <!-- 模板内容 -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 类型定义
interface Props {
  message: string
  type?: 'text' | 'image'
}

// Props 和 Emits
const props = withDefaults(defineProps<Props>(), {
  type: 'text'
})

const emit = defineEmits<{
  send: [message: string]
}>()

// 响应式数据
const loading = ref(false)
const messages = ref<string[]>([])

// 计算属性
const hasMessages = computed(() => messages.value.length > 0)

// 生命周期
onMounted(() => {
  // 初始化逻辑
})

// 方法
const sendMessage = async (message: string) => {
  loading.value = true
  try {
    // 发送消息逻辑
    emit('send', message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 组件样式 */
</style>
```

### API 封装规范

```typescript
// api/request.ts
import axios, { type AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/store/modules/user'

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 统一错误处理
    if (error.response?.status === 401) {
      // 处理未授权
    }
    return Promise.reject(error)
  }
)

export default request
```

## 🎨 样式规范

### TailwindCSS 使用

```vue
<template>
  <!-- 使用 TailwindCSS 工具类 -->
  <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
      {{ title }}
    </h1>
    <button class="btn-primary">
      按钮
    </button>
  </div>
</template>
```

### 自定义样式

```less
/* styles/variables.less */
@primary-color: #3b82f6;
@success-color: #10b981;
@warning-color: #f59e0b;
@error-color: #ef4444;

/* styles/common.less */
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
}

.btn-secondary {
  @apply px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300;
}
```

## 🔧 工具函数

### 常用工具函数

```typescript
// utils/index.ts

/**
 * 判断是否为移动端
 */
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * 格式化文件大小
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 深拷贝
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 防抖函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }) as T
}

/**
 * 节流函数
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean
  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }) as T
}
```

## 🌍 国际化

### 语言文件结构

```typescript
// locales/zh-CN.ts
export default {
  common: {
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    add: '添加'
  },
  chat: {
    title: 'AI 聊天',
    placeholder: '输入消息...',
    send: '发送',
    thinking: '思考中...'
  },
  mj: {
    title: 'Midjourney 绘图',
    generate: '生成图片',
    prompt: '提示词'
  }
}
```

### 在组件中使用

```vue
<template>
  <div>
    <h1>{{ $t('chat.title') }}</h1>
    <input :placeholder="$t('chat.placeholder')" />
    <button>{{ $t('chat.send') }}</button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 在脚本中使用
const title = t('chat.title')
</script>
```

## 🔍 调试技巧

### 开发环境调试

```typescript
// 在控制台打印调试信息
if (import.meta.env.DEV) {
  console.log('Debug info:', data)
}

// 使用调试工具
import { createDebugger } from '@/utils/debug'

const debug = createDebugger('ChatComponent')
debug('Component mounted', props)
```

### 性能优化

```typescript
// 使用 computed 缓存计算结果
const expensiveValue = computed(() => {
  return heavyComputation(props.data)
})

// 使用 watchEffect 监听响应式数据
watchEffect(() => {
  console.log('Data changed:', data.value)
})

// 组件懒加载
const LazyComponent = defineAsyncComponent(() => 
  import('./components/LazyComponent.vue')
)
```

## 🧪 测试

### 单元测试示例

```typescript
// __tests__/utils/index.test.ts
import { describe, it, expect } from 'vitest'
import { formatFileSize, debounce } from '@/utils'

describe('Utils', () => {
  it('formatFileSize should format bytes correctly', () => {
    expect(formatFileSize(0)).toBe('0 Bytes')
    expect(formatFileSize(1024)).toBe('1 KB')
    expect(formatFileSize(1048576)).toBe('1 MB')
  })

  it('debounce should delay function execution', async () => {
    let count = 0
    const increment = debounce(() => {
      count++
    }, 100)

    increment()
    increment()
    increment()

    expect(count).toBe(0)
    
    await new Promise(resolve => setTimeout(resolve, 150))
    expect(count).toBe(1)
  })
})
```

## 📦 构建优化

### Vite 配置优化

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['naive-ui', 'element-plus'],
          'utils-vendor': ['axios', 'dayjs']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
```

## 🔧 常见问题

### 依赖安装失败

```bash
# 清理缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### TypeScript 类型错误

```typescript
// 添加类型声明文件
// types/global.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'virtual:*' {
  const result: any
  export default result
}
```

### 内存不足

```bash
# 增加 Node.js 内存限制
export NODE_OPTIONS="--max-old-space-size=4096"

# 或者使用
node --max-old-space-size=4096 node_modules/.bin/vite build
```

## 📚 相关资源

- [Vue 3 官方文档](https://v3.vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Naive UI 官方文档](https://www.naiveui.com/)
- [Element Plus 官方文档](https://element-plus.org/)
- [TailwindCSS 官方文档](https://tailwindcss.com/)