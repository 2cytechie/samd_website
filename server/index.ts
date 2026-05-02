import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './db/connection';
import { initializeRedis } from './db/redis';
import apiRoutes from './routes';

const app = express();
const PORT = parseInt(process.env.PORT || '8001');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use('/api', apiRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

async function start() {
  try {
    try {
      await initializeDatabase();
    } catch (e) {
      console.warn('⚠️ 数据库连接失败，使用内存存储');
    }
    try {
      await initializeRedis();
    } catch (e) {
      console.warn('⚠️ Redis连接失败，不使用缓存');
    }
    app.listen(PORT, () => {
      console.log(`🚀 后端服务运行在 http://localhost:${PORT}`);
      console.log(`   API 端点:`);
      console.log(`   GET    /api/health               — 健康检查`);
    });
  } catch (error) {
    console.error('❌ 启动失败:', error);
    process.exit(1);
  }
}

start();
