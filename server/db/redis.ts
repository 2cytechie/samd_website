import Redis from 'ioredis';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '../../.env.server') });

let redis: Redis | null = null;

export async function initializeRedis() {
  const redisHost = process.env.REDIS_HOST || 'localhost';
  const redisPort = parseInt(process.env.REDIS_PORT || '6379');
  const redisPassword = process.env.REDIS_PASSWORD || undefined;

  redis = new Redis({
    host: redisHost,
    port: redisPort,
    password: redisPassword,
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    }
  });

  redis.on('connect', () => {
    console.log('✅ Redis 连接成功');
  });

  redis.on('error', (err) => {
    console.error('❌ Redis 连接错误:', err);
  });
}

export function getRedis() {
  if (!redis) {
    throw new Error('Redis 尚未初始化');
  }
  return redis;
}
