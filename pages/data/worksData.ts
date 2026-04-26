export interface Work {
  id: string;
  title: string;
  description: string;
  type: string;
  thumbnail: string;
  detailImage: string;
  workUrl: string;
  tags: string[];
}

export const worksData: Work[] = [
  {
    id: '1',
    title: '赛车游戏',
    description: '双人对战赛车游戏，支持自定义赛车颜色，碰撞爆炸效果，观众互动系统',
    type: '网页小游戏',
    thumbnail: '/racing-game-thumbnail.png',
    detailImage: '/racing-game-thumbnail.png',
    workUrl: '/racing-game.html',
    tags: ['Canvas', 'JavaScript', '游戏开发', '双人游戏'],
  },
];
