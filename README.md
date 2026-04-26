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

### 启动服务

```bash
# 启动后端服务
npm run server
# 启动前端开发服务器
npm run dev
# 同时启动前后端
npm run dev:all
```

## 生产部署

### 构建项目

```bash
# 1. 本地构建
npm run build

# 2. 上传前端到服务器
scp -r dist/* root@114.55.170.32:/root/website/frontend/dist/

# 3. 上传后端代码（如果有更新）
scp -r server root@114.55.170.32:/root/website/backend/

# 4. 修复权限并重启服务
ssh root@114.55.170.32 '
  chown -R root:www-data /root/website/frontend
  chmod -R 755 /root/website/frontend
  pm2 restart samd-backend
'
```
