import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '../../.env.server') });

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'website',
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function initializeDatabase() {
  const dbName = process.env.DB_NAME || 'website';
  const conn = await pool.getConnection();
  try {
    console.log(`✅ 数据库 ${dbName} 已连接`);
    
    // 初始化表结构
    const initSqlPath = join(dirname(fileURLToPath(import.meta.url)), 'init.sql');
    const initSql = fs.readFileSync(initSqlPath, 'utf-8');
    await conn.query(initSql);
    console.log('✅ 数据库表已初始化');
  } catch (error) {
    console.error('⚠️  数据库表初始化可能已存在:', error);
  } finally {
    conn.release();
  }
}
