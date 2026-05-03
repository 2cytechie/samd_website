import { Router } from 'express';

const router = Router();

// 内存存储作为 fallback
let memoryArtworks: any[] = [
  {
    id: 1,
    title: '霓虹星空',
    author_name: '小明',
    image_data: '',
    thumbnail_data: '',
    likes: 42,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: '赛博城市',
    author_name: '小红',
    image_data: '',
    thumbnail_data: '',
    likes: 38,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: '像素艺术',
    author_name: '匿名用户',
    image_data: '',
    thumbnail_data: '',
    likes: 25,
    created_at: new Date().toISOString()
  }
];
let nextId = 4;

// 尝试使用数据库连接，失败则使用内存
let useDatabase = false;
let pool: any = null;

// 初始化数据库连接的函数
async function initDb() {
  try {
    const dbModule = await import('../db/connection');
    pool = dbModule.pool;
    useDatabase = true;
    console.log('✅ 数据库连接可用');
  } catch (e) {
    console.warn('⚠️ 数据库连接失败，使用内存存储');
    useDatabase = false;
  }
}

// 在第一次请求时初始化
let initialized = false;
async function ensureInitialized() {
  if (!initialized) {
    await initDb();
    initialized = true;
  }
}

// 获取作品列表（按点赞排序，分页）
router.get('/', async (req, res) => {
  try {
    await ensureInitialized();
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const offset = (page - 1) * limit;

    let items: any[];
    let total: number;

    if (useDatabase && pool) {
      try {
        const [countResult] = await pool.query('SELECT COUNT(*) as total FROM artworks');
        total = (countResult as any)[0].total;
        
        const [rows] = await pool.query(
          'SELECT id, title, author_name, thumbnail_data, likes, created_at FROM artworks ORDER BY likes DESC, created_at DESC LIMIT ? OFFSET ?',
          [limit, offset]
        );
        items = rows as any[];
      } catch (e) {
        console.warn('⚠️ 数据库查询失败，使用内存存储');
        useDatabase = false;
        const sorted = [...memoryArtworks].sort((a, b) => b.likes - a.likes);
        items = sorted.slice(offset, offset + limit);
        total = sorted.length;
      }
    } else {
      const sorted = [...memoryArtworks].sort((a, b) => b.likes - a.likes);
      items = sorted.slice(offset, offset + limit);
      total = sorted.length;
    }

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        items,
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
    await ensureInitialized();
    const id = parseInt(req.params.id);

    if (useDatabase && pool) {
      try {
        const [rows] = await pool.query('SELECT * FROM artworks WHERE id = ?', [id]);
        const artworks = rows as any[];

        if (artworks.length === 0) {
          return res.status(404).json({ success: false, error: '作品不存在' });
        }

        return res.json({ success: true, data: artworks[0] });
      } catch (e) {
        console.warn('⚠️ 数据库查询失败，使用内存存储');
        useDatabase = false;
      }
    }

    const artwork = memoryArtworks.find(a => a.id === id);
    if (!artwork) {
      return res.status(404).json({ success: false, error: '作品不存在' });
    }

    res.json({ success: true, data: artwork });
  } catch (error) {
    console.error('获取作品详情失败:', error);
    res.status(500).json({ success: false, error: '获取作品详情失败' });
  }
});

// 上传新作品
router.post('/', async (req, res) => {
  try {
    await ensureInitialized();
    const { title, author_name, image_data, thumbnail_data } = req.body;

    if (!title || !image_data || !thumbnail_data) {
      return res.status(400).json({ success: false, error: '缺少必要参数' });
    }

    const author = author_name && author_name.trim() ? author_name.trim() : '匿名用户';

    if (useDatabase && pool) {
      try {
        const [result] = await pool.query(
          'INSERT INTO artworks (title, author_name, image_data, thumbnail_data) VALUES (?, ?, ?, ?)',
          [title, author, image_data, thumbnail_data]
        );

        const insertResult = result as any;

        return res.json({
          success: true,
          data: {
            id: insertResult.insertId,
            title,
            author_name: author
          }
        });
      } catch (e) {
        console.warn('⚠️ 数据库插入失败，使用内存存储');
        useDatabase = false;
      }
    }

    const newArtwork = {
      id: nextId++,
      title,
      author_name: author,
      image_data,
      thumbnail_data,
      likes: 0,
      created_at: new Date().toISOString()
    };
    memoryArtworks.unshift(newArtwork);

    res.json({
      success: true,
      data: {
        id: newArtwork.id,
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
    await ensureInitialized();
    const id = parseInt(req.params.id);

    if (useDatabase && pool) {
      try {
        const [checkRows] = await pool.query('SELECT id FROM artworks WHERE id = ?', [id]);
        if ((checkRows as any[]).length === 0) {
          return res.status(404).json({ success: false, error: '作品不存在' });
        }

        await pool.query('UPDATE artworks SET likes = likes + 1 WHERE id = ?', [id]);
        const [rows] = await pool.query('SELECT likes FROM artworks WHERE id = ?', [id]);

        return res.json({
          success: true,
          data: {
            likes: (rows as any[])[0].likes
          }
        });
      } catch (e) {
        console.warn('⚠️ 数据库更新失败，使用内存存储');
        useDatabase = false;
      }
    }

    const artwork = memoryArtworks.find(a => a.id === id);
    if (!artwork) {
      return res.status(404).json({ success: false, error: '作品不存在' });
    }

    artwork.likes++;

    res.json({
      success: true,
      data: {
        likes: artwork.likes
      }
    });
  } catch (error) {
    console.error('点赞失败:', error);
    res.status(500).json({ success: false, error: '点赞失败' });
  }
});

export default router;
