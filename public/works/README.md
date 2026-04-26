# 作品文件夹管理指南

## 如何添加新作品

1. 在 `public/works/` 目录下为每个作品创建独立文件夹，例如：
   ```
   public/works/
   ├── racing-game/          # 赛车游戏
   ├── my-new-game/      # 新作品
   │   ├── thumbnail.png  # 缩略图
   │   ├── game.html      # 作品文件
   │   └── screenshot.png  # 详情页图片
   ```

2. 在 `pages/data/worksData.ts` 中添加作品数据，使用 `/works/your-folder/your-file.ext` 的路径。

## 文件夹结构建议

每个作品文件夹可以包含：
- `thumbnail.png` - 作品缩略图（用于列表页
- `screenshot.png` - 作品详情页大图
- `index.html` 或 `game.html` - 作品入口文件
- `README.md - 作品说明文件

## 作品数据结构

在 `pages/data/worksData.ts 中添加：

```typescript
{
  id: '2',
  title: '你的作品标题',
  description: '作品描述',
  type: '作品类型',
  thumbnail: '/works/your-folder/thumbnail.png',
  detailImage: '/works/your-folder/screenshot.png',
  workUrl: '/works/your-folder/index.html',
  tags: ['标签1', '标签2'],
}
```
