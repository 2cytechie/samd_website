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
  {
    id: '2',
    title: '打砖块 2.0',
    description: '霓虹风格的经典打砖块游戏！具有多种砖块类型（普通、多重打击、爆炸）、炫酷粒子特效、多关卡设计。\n使用←→方向键或鼠标控制挡板，击碎所有砖块通关！',
    thumbnail: '/works/breakout-game/breakout-game-thumbnail.png',
    detailImage: '/works/breakout-game/breakout-game-thumbnail.png',
    workUrl: '/works/breakout-game/breakout-game.html',
    tags: ['Canvas', 'JavaScript', '游戏开发', '经典游戏'],
  },
  {
    id: '3',
    title: '跳一跳',
    description: '复刻经典跳一跳游戏！按住蓄力，松开跳跃，完美着陆获得更高分数，挑战你的节奏感和判断力！\n连续完美着陆触发连击系统，获得倍数加分，不断刷新你的最高分！',
    thumbnail: '/works/jump-game/jump-game-thumbnail.png',
    detailImage: '/works/jump-game/jump-game-thumbnail.png',
    workUrl: '/works/jump-game/jump-game.html',
    tags: ['Canvas', 'JavaScript', '游戏开发', '休闲游戏'],
  },
];
