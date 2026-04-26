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
