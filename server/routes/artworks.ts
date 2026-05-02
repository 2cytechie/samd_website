import { Router } from 'express';
import { pool } from '../db/connection';

const router = Router();

// 获取作品列表（按点赞排序，分页）
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const offset = (page - 1) * limit;

    // 获取总数
    const [countResult] = await pool.query('SELECT COUNT(*) as total FROM artworks');
    const total = (countResult as any)[0].total;
    const totalPages = Math.ceil(total / limit);

    // 获取分页数据
    const [rows] = await pool.query(
      'SELECT id, title, author_name, thumbnail_data, likes, created_at FROM artworks ORDER BY likes DESC, created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    res.json({
      success: true,
      data: {
        items: rows,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      }
    });
  } catch (error) {
    console.error('获取作品列表失败:', error);
    res.status(500).json({ success: false, error: '获取作品列表失败' });
  }
});

// 获取单个作品详情
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM artworks WHERE id = ?', [id]);
    const artworks = rows as any[];

    if (artworks.length === 0) {
      return res.status(404).json({ success: false, error: '作品不存在' });
    }

    res.json({ success: true, data: artworks[0] });
  } catch (error) {
    console.error('获取作品详情失败:', error);
    res.status(500).json({ success: false, error: '获取作品详情失败' });
  }
});

// 上传新作品
router.post('/', async (req, res) => {
  try {
    const { title, author_name, image_data, thumbnail_data } = req.body;

    if (!title || !image_data || !thumbnail_data) {
      return res.status(400).json({ success: false, error: '缺少必要参数' });
    }

    // 处理匿名用户
    const author = author_name && author_name.trim() ? author_name.trim() : '匿名用户';

    const [result] = await pool.query(
      'INSERT INTO artworks (title, author_name, image_data, thumbnail_data) VALUES (?, ?, ?, ?)',
      [title, author, image_data, thumbnail_data]
    );

    const insertResult = result as any;

    res.json({
      success: true,
      data: {
        id: insertResult.insertId,
        title,
        author_name: author
      }
    });
  } catch (error) {
    console.error('上传作品失败:', error);
    res.status(500).json({ success: false, error: '上传作品失败' });
  }
});

// 点赞作品
router.post('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;

    // 检查作品是否存在
    const [checkRows] = await pool.query('SELECT id FROM artworks WHERE id = ?', [id]);
    if ((checkRows as any[]).length === 0) {
      return res.status(404).json({ success: false, error: '作品不存在' });
    }

    // 增加点赞数
    await pool.query('UPDATE artworks SET likes = likes + 1 WHERE id = ?', [id]);

    // 获取更新后的点赞数
    const [rows] = await pool.query('SELECT likes FROM artworks WHERE id = ?', [id]);

    res.json({
      success: true,
      data: {
        likes: (rows as any[])[0].likes
      }
    });
  } catch (error) {
    console.error('点赞失败:', error);
    res.status(500).json({ success: false, error: '点赞失败' });
  }
});

export default router;
