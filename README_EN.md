# seemse-ai-web

English | [简体中文](./README.md)

🚀 **Version**: v2.0.0 | 📅 **Updated**: January 2025 | 🌐 **Repository**: [https://github.com/seemse/seemse-ai-web.git](https://github.com/seemse/seemse-ai-web.git)

A modern AI chat application frontend based on Vue 3, supporting ChatGPT, Midjourney and other AI features.

## 📚 Project Ecosystem

Seemse AI is a complete artificial intelligence solution that includes the following core projects:

- **Backend Project** : [https://github.com/seemse/seemse_ai](https://github.com/seemse/seemse_ai) 
  - AI service backend built with Spring Boot + MyBatis Plus
  - Provides core API services for user management, AI model management, conversation processing
  - Supports multiple AI model integrations (OpenAI, Claude, Wenxin Yiyan, etc.)

- **Admin Panel** : [https://github.com/seemse/seemse-ai-admin](https://github.com/seemse/seemse-ai-admin)  
  - Enterprise-level admin backend based on Vue 3 + Ant Design Vue
  - Provides user management, system configuration, AI model configuration, data statistics
  - Supports enterprise features like permission management, system monitoring, log management

- **Chat Application Frontend** : [https://github.com/seemse/seemse-ai-web](https://github.com/seemse/seemse-ai-web)
  - Modern chat application based on Vue 3 + TypeScript
  - Supports multi-model conversations, history records, file uploads
  - Responsive design supporting PC and mobile access

## ✨ Features

- 🤖 **ChatGPT Conversations** - Multi-turn dialogues with intelligent responses
- 🎨 **Midjourney Drawing** - AI image generation and editing
- 🎵 **Voice Features** - Speech recognition and text-to-speech
- 📱 **Responsive Design** - Desktop and mobile support
- 🌍 **Internationalization** - Multi-language support
- 🎨 **Theme Switching** - Light and dark theme toggle

## 🛠️ Tech Stack

- **Framework**: Vue 3 + TypeScript
- **Build Tool**: Vite
- **UI Components**: Naive UI + Element Plus
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: TailwindCSS + Less
- **Icons**: Iconify
- **PWA**: Vite PWA Plugin

## 📋 Requirements

- **Node.js**: >= 18.0.0 (Recommended **v18.19.0** or **v20.11.0** LTS)
- **npm**: >= 9.0.0 (or use pnpm/yarn)

> ⚠️ **Compatibility Note**: This project has been tested on Node.js 18.x and 20.x. Using other versions may cause dependency installation or build issues.

## 🚀 Quick Start

### Download Project

```bash
# Using HTTPS
git clone https://github.com/seemse/seemse-ai-web.git
cd seemse-ai-web

# Or using SSH
git clone git@github.com:seemse/seemse-ai-web.git
cd seemse-ai-web
```

### Install Dependencies

```bash
npm install
```

### Run Project

```bash
npm run dev
```

The project will start at `http://localhost:1002`

### Build for Production

```bash
npm run build
```

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Lint code
npm run lint

# Auto-fix code formatting
npm run lint:fix

# Documentation development
npm run docs:dev

# Build documentation
npm run docs:build
```

## 🔧 Configuration

The project uses environment variables for configuration. Create a `.env` file as needed:

### Core Configuration

```env
# API base URL (backend service address)
VITE_APP_API_BASE_URL=http://localhost:8080/

# Global API URL prefix
VITE_GLOB_API_URL=/api

# Enable PWA
VITE_GLOB_APP_PWA=false

# Enable long replies (may incur higher API costs)
VITE_GLOB_OPEN_LONG_REPLY=false
```

### Configuration Template Files

The project provides the following configuration templates:

- `.env` - Basic configuration
- `.env.development` - Development environment configuration
- `.env.production` - Production environment configuration

> 💡 **Configuration Priority**: `.env.production` > `.env.development` > `.env`

### Frontend-specific Configuration

```env
# Application title
VITE_GLOB_APP_TITLE=seemse-ai-web

# Application short title
VITE_GLOB_APP_SHORT_TITLE=seemse

# Local storage prefix
VITE_GLOB_APP_LOCAL_STORAGE_KEY=seemse_
```

## 📁 Project Structure

```
seemse-ai-web/
├── public/                 # Static assets
│   ├── config.js          # Global runtime configuration
│   ├── favicon.ico        # Website icon
│   └── index.html         # HTML template
├── src/
│   ├── api/               # API interface encapsulation
│   ├── assets/            # Static asset files
│   ├── components/        # Reusable components
│   ├── hooks/             # Vue composition functions
│   ├── locales/           # Internationalization configuration
│   ├── router/            # Router configuration
│   ├── store/             # State management (Pinia)
│   ├── styles/            # Global styles
│   ├── utils/             # Utility functions
│   ├── views/             # Page-level components
│   ├── App.vue            # Root component
│   └── main.ts            # Application entry file
├── docs/                  # Project documentation and screenshots
├── docker-compose/        # Docker deployment configuration
├── kubernetes/           # Kubernetes deployment configuration
├── .env*                 # Environment variable configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
└── tailwind.config.js    # TailwindCSS configuration
```

## 🚀 Deployment Comparison

| Deployment Method | Use Case | Advantages | Disadvantages | Recommendation |
|---------|---------|------|------|----------|
| **Development** | Local development | Hot reload, easy debugging | Only for development | ⭐⭐⭐⭐⭐ |
| **Docker Compose** | Small production | Simple deployment, environment isolation | Single point of failure risk | ⭐⭐⭐⭐ |
| **Kubernetes** | Large production | High availability, elastic scaling | Complex configuration, high resource requirements | ⭐⭐⭐⭐ |
| **Static** | CDN deployment | Fast access, low cost | Requires backend API support | ⭐⭐⭐ |

## 👨‍💻 Development Guide

### Frontend Development Standards

1. **Code Standards**: Project uses ESLint + Prettier for code formatting
2. **Commit Standards**: Follow Conventional Commits specification
3. **Branch Strategy**: Use Git Flow workflow
4. **Component Development**: Prioritize Composition API

### Environment Variable Configuration

Recommended development environment configuration:

```env
# .env.development
VITE_APP_API_BASE_URL=http://localhost:8080/
VITE_GLOB_API_URL=/api
VITE_GLOB_APP_PWA=false
```

Production environment recommended configuration:

```env
# .env.production
VITE_APP_API_BASE_URL=https://api.yourdomain.com/
VITE_GLOB_API_URL=/api
VITE_GLOB_APP_PWA=true
```

### Performance Optimization Suggestions

1. **Component Lazy Loading**: Use dynamic imports for route-level code splitting
2. **Image Optimization**: Use WebP format and configure image compression
3. **Caching Strategy**: Configure HTTP cache headers appropriately
4. **CDN Acceleration**: Use CDN for static resource distribution

## 📚 Related Documentation

- [Docker Deployment Guide](./docker-compose/readme.md)
- [Kubernetes Deployment Guide](./kubernetes/README.md)
- [API Documentation](./docs/api.md) (To be improved)
- [Component Documentation](./docs/components.md) (To be improved)

## 🤝 Contributing

We welcome all forms of contribution, including but not limited to:

- 🐛 [Report Bugs](https://github.com/seemse/seemse-ai-web/issues)
- 💡 [Feature Suggestions](https://github.com/seemse/seemse-ai-web/issues)
- 📝 [Documentation Improvements](https://github.com/seemse/seemse-ai-web/pulls)
- 🔧 [Code Contributions](https://github.com/seemse/seemse-ai-web/pulls)

### Development Process

1. Fork the project to your personal repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📄 License

![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)

This project is open source under the Apache-2.0 License.

---

⭐ If this project helps you, please give it a star!

## 📊 Project Statistics

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Vue](https://img.shields.io/badge/vue-3.x-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/typescript-4.9.x-blue.svg)