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
    maxRetriesPerRequest: 1,
    retryStrategy: (times) => {
      if (times > 3) {
        return null;
      }
      return Math.min(times * 100, 1000);
    },
    lazyConnect: true
  });

  let firstConnection = true;

  redis.on('connect', () => {
    console.log('✅ Redis 连接成功');
  });

  redis.on('error', (err) => {
    if (firstConnection) {
      console.warn('⚠️ Redis 连接失败，将不使用缓存:', err.message);
      firstConnection = false;
    }
  });
}

export function getRedis() {
  if (!redis) {
    throw new Error('Redis 尚未初始化');
  }
  return redis;
}
