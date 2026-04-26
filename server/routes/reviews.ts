import { Router, Request, Response } from 'express';
import { pool } from '../db/connection.js';
import { getRedis } from '../db/redis.js';

const router = Router();

// 辅助函数：格式化IP地址
const formatIpAddress = (ip: string | undefined): string => {
  if (!ip) return 'unknown';
  // 将 IPv6 映射的 IPv4 地址转换为标准 IPv4 格式
  const ipv4Mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (ipv4Mapped) {
    return ipv4Mapped[1];
  }
  return ip;
};

// 提交评论
router.post('/', async (req: Request, res: Response) => {
  try {
      const { workId, rating, content } = req.body;
    const rawIp = req.ip || req.socket?.remoteAddress || 'unknown';
    const ipAddress = formatIpAddress(rawIp);

    // 验证输入
    if (!workId || !rating || !content) {
      return res.status(400).json({ error: '缺少必要参数' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: '评分必须在1-5之间' });
    }

    if (content.length > 500) {
      return res.status(400).json({ error: '评论内容不能超过500字' });
    }

    // 检查频率限制（同一IP每2秒1条）
    const redis = getRedis();
    const rateLimitKey = `rate_limit:${ipAddress}`;
    const lastCommentTime = await redis.get(rateLimitKey);
    
    if (lastCommentTime) {
      const timeDiff = Date.now() - parseInt(lastCommentTime);
      if (timeDiff < 2000) {
        return res.status(429).json({ error: '请稍后再试' });
      }
    }

    // 保存评论
    const conn = await pool.getConnection();
    try {
      await conn.query(
        'INSERT INTO reviews (work_id, rating, content, ip_address) VALUES (?, ?, ?, ?)',
        [workId, rating, content, ipAddress]
      );
    } finally {
      conn.release();
    }

    // 更新频率限制
    await redis.set(rateLimitKey, Date.now().toString(), 'EX', 2);

    // 清除缓存
    const cacheKey = `reviews:${workId}`;
    await redis.del(cacheKey);

    res.json({ success: true });
  } catch (error) {
    console.error('提交评论失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 获取评论列表和评分统计
router.get('/:workId', async (req: Request, res: Response) => {
  try {
    const { workId } = req.params;
    const redis = getRedis();
    const cacheKey = `reviews:${workId}`;

    // 尝试从缓存读取
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const conn = await pool.getConnection();
    try {
      // 获取评论列表
      const [reviews] = await conn.query(
        'SELECT id, rating, content, created_at FROM reviews WHERE work_id = ? ORDER BY created_at DESC',
        [workId]
      );

      // 获取评分统计
      const [statsResult] = await conn.query(
        'SELECT AVG(rating) as avgRating, COUNT(*) as totalCount FROM reviews WHERE work_id = ?',
        [workId]
      );

      const stats = statsResult[0] || { avgRating: 0, totalCount: 0 };
      
      const result = {
        reviews,
        stats: {
          avgRating: stats.avgRating ? parseFloat(stats.avgRating).toFixed(1) : '0',
          totalCount: stats.totalCount,
          reviewCount: reviews[0].totalCount || 0
        }
      };

      // 缓存结果（10分钟）
      await redis.set(cacheKey, JSON.stringify(result), 'EX', 600);

      res.json(result);
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error('获取评论失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

export default router;
