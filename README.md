# Samd.top 全栈项目

技术栈: React + Express + MySQL + Redis + TypeScript

## 项目结构

```
.
├── server/              # 后端代码
│   ├── db/            # 数据库连接
│   │   ├── connection.ts    # MySQL 连接
│   │   └── redis.ts         # Redis 连接
│   ├── routes/        # API 路由
│   │   └── index.ts
│   └── index.ts       # 服务器入口
├── pages/             # React 页面
│   └── Home.tsx
├── App.tsx            # React 应用入口
├── index.tsx          # React DOM 入口
├── index.html         # HTML 模板
├── nginx.conf         # Nginx 配置
├── package.json       # 项目依赖
├── tsconfig.json      # TypeScript 配置
└── vite.config.ts     # Vite 配置
```

## 开发

### 安装依赖

```bash
npm install
```

### 启动后端服务

```bash
npm run server
```

### 启动前端开发服务器

```bash
npm run dev
```

### 同时启动前后端

```bash
npm run dev:all
```

## 生产部署

### 构建前端

```bash
npm run build
```

### 启动后端服务

```bash
npm run server
```

### Nginx 配置

使用项目根目录下的 `nginx.conf` 配置文件进行部署。

## 服务器部署指南

### 服务器信息

- **服务器地址**: 114.55.170.32
- **用户名**: root
- **密码**: Samd1017
- **项目路径**: /www/samd_website
- **后端端口**: 8001
- **网站地址**: http://www.samd.top

### 部署流程

#### 1. 连接服务器

```bash
ssh root@114.55.170.32
```

#### 2. 创建项目目录（首次部署）

```bash
mkdir -p /www/samd_website
```

#### 3. 上传项目文件

在本地项目目录（samd_website）下执行：

```bash
rsync -avz --exclude='node_modules' --exclude='.git' -e "ssh -o StrictHostKeyChecking=no" ./ root@114.55.170.32:/www/samd_website/
```

#### 4. 安装依赖

```bash
cd /www/samd_website
npm install
```

#### 5. 构建前端

```bash
npm run build
```

#### 6. 上传静态资源文件

如果 `racing-game.html` 和 `racing-game-thumbnail.png` 等文件不在 dist 目录，需要手动上传：

```bash
rsync -avz racing-game.html racing-game-thumbnail.png root@114.55.170.32:/www/samd_website/dist/
```

并修复权限：

```bash
ssh root@114.55.170.32 "chmod 644 /www/samd_website/dist/racing-game.html /www/samd_website/dist/racing-game-thumbnail.png"
```

#### 7. 配置 Nginx

创建或更新 Nginx 配置文件 `/etc/nginx/sites-available/samd.top`：

```nginx
server {
    listen 80;
    server_name samd.top www.samd.top;

    # 前端静态文件
    location / {
        root /www/samd_website/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # API 反向代理到后端
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

测试并重新加载 Nginx：

```bash
nginx -t
systemctl reload nginx
```

#### 8. 启动/重启后端服务

使用 PM2 管理后端服务：

```bash
# 启动服务
cd /www/samd_website
pm2 start --name samd-backend -- npm -- run server

# 重启服务
pm2 restart samd-backend

# 查看状态
pm2 list

# 查看日志
pm2 logs samd-backend
```

### 验证部署

#### 检查网站是否正常

```bash
# 检查主页面
curl http://www.samd.top/

# 检查 API
curl http://www.samd.top/api/health

# 检查赛车游戏页面
curl http://www.samd.top/racing-game.html
```

#### 预期输出

- 主页面应返回 HTML 内容
- API 应返回 `{"status":"ok","timestamp":"..."}`
- 赛车游戏页面应返回游戏 HTML 内容

### 常见问题

#### 500 Internal Server Error

检查 Nginx 错误日志：

```bash
tail -20 /var/log/nginx/error.log
```

常见原因：静态文件路径错误或权限不足。

#### 403 Forbidden

检查文件权限：

```bash
ls -la /www/samd_website/dist/
chmod 644 /www/samd_website/dist/*.html /www/samd_website/dist/*.png
```

#### 后端无法连接

检查 PM2 服务状态：

```bash
pm2 list
pm2 logs samd-backend
```

检查端口占用：

```bash
lsof -i :8001
```

### 一键部署脚本

创建 `deploy.sh` 脚本：

```bash
#!/bin/bash

SERVER="root@114.55.170.32"
PROJECT_PATH="/www/samd_website"
DIST_PATH="/www/samd_website/dist"

echo "=== 开始部署 Samd.top ==="

# 1. 上传项目文件
echo "1. 上传项目文件..."
rsync -avz --exclude='node_modules' --exclude='.git' -e "ssh -o StrictHostKeyChecking=no" ./ $SERVER:$PROJECT_PATH/

# 2. 安装依赖
echo "2. 安装依赖..."
ssh $SERVER "cd $PROJECT_PATH && npm install"

# 3. 构建前端
echo "3. 构建前端..."
ssh $SERVER "cd $PROJECT_PATH && npm run build"

# 4. 上传静态资源
echo "4. 上传静态资源..."
rsync -avz racing-game.html racing-game-thumbnail.png $SERVER:$DIST_PATH/
ssh $SERVER "chmod 644 $DIST_PATH/racing-game.html $DIST_PATH/racing-game-thumbnail.png"

# 5. 重启后端服务
echo "5. 重启后端服务..."
ssh $SERVER "cd $PROJECT_PATH && pm2 restart samd-backend"

# 6. 重新加载 Nginx
echo "6. 重新加载 Nginx..."
ssh $SERVER "nginx -t && systemctl reload nginx"

echo "=== 部署完成 ==="
echo "访问 http://www.samd.top 查看网站"
```

赋予执行权限并运行：

```bash
chmod +x deploy.sh
./deploy.sh
```