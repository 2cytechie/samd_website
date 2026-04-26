export interface Work {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  detailImage: string;
  workUrl: string;
  tags: string[];
}

export const worksData: Work[] = [
  {
    id: '1',
    title: '赛车游戏',
    description: '双人对战赛车游戏，支持自定义赛车颜色，碰撞爆炸效果，观众互动系统。\n玩家1使用WASD控制，玩家2使用方向键控制，第一个到达终点者获胜！',
    thumbnail: '/works/racing-game/racing-game-thumbnail.png',
    detailImage: '/works/racing-game/racing-game-thumbnail.png',
    workUrl: '/works/racing-game/racing-game.html',
    tags: ['Canvas', 'JavaScript', '游戏开发', '双人游戏'],
  },
];
