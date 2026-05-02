-- 作品表
CREATE TABLE IF NOT EXISTS artworks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author_name VARCHAR(100),
  image_data LONGTEXT NOT NULL,
  thumbnail_data TEXT NOT NULL,
  likes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_likes (likes DESC),
  INDEX idx_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入一些示例数据
INSERT INTO artworks (title, author_name, image_data, thumbnail_data, likes) VALUES
('霓虹星空', '小明', 'data:image/png;base64,', 'data:image/png;base64,', 42),
('赛博城市', '小红', 'data:image/png;base64,', 'data:image/png;base64,', 38),
('像素艺术', '匿名用户', 'data:image/png;base64,', 'data:image/png;base64,', 25);
