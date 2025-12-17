# Docker Compose 部署指南

## 📋 前置要求

在开始部署之前，请确保您的系统已安装：

- **Docker**: v20.10.0 或更高版本
- **Docker Compose**: v2.0.0 或更高版本
- **Node.js**: v18.0.0 或更高版本 (用于构建)

## 🚀 快速部署

### 1. 克隆项目

```bash
git clone https://github.com/seemse/seemse-ai-web.git
cd seemse-ai-web
```

### 2. 构建前端项目

```bash
# 安装依赖
npm install

# 构建生产版本
npm run build

# 构建完成后，dist 目录将包含所有静态文件
```

### 3. 准备部署文件

```bash
# 创建nginx目录
mkdir -p docker-compose/nginx/html

# 复制构建文件到nginx目录
cp -r dist/* docker-compose/nginx/html/

# 或者使用 PowerShell (Windows)
Copy-Item -Path "dist\*" -Destination "docker-compose\nginx\html" -Recurse -Force
```

### 4. 配置环境变量

编辑 `docker-compose/.env` 文件：

```env
# API 后端地址
VITE_APP_API_BASE_URL=http://your-api-server:8080/

# 其他配置...
```

### 5. 启动服务

```bash
cd docker-compose

# 启动服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

## 🔧 配置说明

### docker-compose.yml 配置

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/html:/usr/share/nginx/html
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
    restart: unless-stopped
    networks:
      - seemse-network

networks:
  seemse-network:
    driver: bridge
```

### Nginx 配置

nginx.conf 主要配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # 前端静态文件
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # API 代理
    location /api/ {
        proxy_pass http://your-api-server:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 📊 性能优化

### 1. 启用 Gzip 压缩

在 nginx.conf 中添加：

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### 2. 配置缓存策略

```nginx
# 静态资源缓存
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML 文件不缓存
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

### 3. 启用 HTTP/2

```nginx
server {
    listen 443 ssl http2;
    # ... SSL 配置
}
```

## 🔍 监控与日志

### 查看容器状态

```bash
# 查看所有容器
docker ps

# 查看特定服务
docker-compose ps

# 查看资源使用情况
docker stats
```

### 日志管理

```bash
# 查看实时日志
docker-compose logs -f

# 查看最近100行日志
docker-compose logs --tail=100

# 查看特定服务的日志
docker-compose logs nginx
```

## 🔄 更新部署

### 平滑更新

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 重新构建前端
npm install
npm run build

# 3. 复制新的构建文件
cp -r dist/* docker-compose/nginx/html/

# 4. 重启服务
docker-compose restart
```

## 🛠️ 故障排查

### 常见问题

#### 1. 容器无法启动

```bash
# 查看详细错误信息
docker-compose logs nginx

# 检查端口占用
netstat -tulpn | grep :80

# 检查配置文件语法
nginx -t -c /etc/nginx/nginx.conf
```

#### 2. 页面空白或资源加载失败

```bash
# 检查文件是否正确复制
ls -la docker-compose/nginx/html/

# 检查nginx配置
nginx -t

# 检查浏览器控制台错误
# F12 -> Console
```

#### 3. API 请求失败

```bash
# 检查API地址配置
grep -r "VITE_APP_API_BASE_URL" docker-compose/

# 测试API连通性
curl -I http://your-api-server:8080/health

# 查看nginx错误日志
docker-compose logs nginx | grep error
```

### 性能问题

#### 检查资源使用

```bash
# 查看容器资源使用
docker stats

# 检查磁盘空间
df -h

# 检查内存使用
free -h
```

## 🔐 安全配置

### 1. 启用 HTTPS

```bash
# 使用 certbot 获取 SSL 证书
certbot --nginx -d your-domain.com
```

### 2. 配置防火墙

```bash
# 仅开放必要端口
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### 3. 安全头配置

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

## 📚 相关命令速查

```bash
# 基础操作
docker-compose up -d          # 启动服务
docker-compose down           # 停止服务
docker-compose restart        # 重启服务
docker-compose logs -f        # 查看日志
docker-compose pull           # 更新镜像
docker-compose build          # 构建镜像

# 维护命令
docker system prune           # 清理无用资源
docker volume prune           # 清理无用卷
docker image prune            # 清理无用镜像
```