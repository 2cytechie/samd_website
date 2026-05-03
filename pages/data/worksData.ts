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
  {
    id: '4',
    title: '2D 射击游戏',
    description: '刺激的 2D 射击游戏，包含训练场和无尽对战两种模式！支持鼠标/键盘和触屏控制，长按连发机制，弹药系统，还有三种难度可选！\n训练场：无限弹药，练习射击靶子；无尽对战：击杀敌人获取弹药，存活越久越厉害！',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=2D%20top-down%20shooter%20game%20thumbnail%2C%20dark%20background%2C%20blue%20player%20circle%2C%20red%20targets%2C%20game%20style%2C%20vector%20art%2C%20clean%20design&image_size=landscape_16_9',
    detailImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=2D%20top-down%20shooter%20game%20thumbnail%2C%20dark%20background%2C%20blue%20player%20circle%2C%20red%20targets%2C%20game%20style%2C%20vector%20art%2C%20clean%20design&image_size=landscape_16_9',
    workUrl: '/works/2d-shooting-game/2d-shooting-game.html',
    tags: ['Canvas', 'JavaScript', '游戏开发', '射击游戏', '移动端支持'],
  },
  {
    id: '5',
    title: 'MC 超长跑酷',
    description: '基于 Phaser3 引擎制作的我的世界风格跑酷游戏！包含三种难度模式（简单、中等、困难），还有自定义地图编辑器！\n使用 WASD 控制，W/空格跳跃，在超长地图中奔跑跳跃，到达终点旗帜即可获胜！',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minecraft%20parkour%20game%20thumbnail%2C%20sky%20background%2C%20grass%20blocks%2C%20wooden%20platforms%2C%20pixel%20art%20style%2C%20clean%20design&image_size=landscape_16_9',
    detailImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minecraft%20parkour%20game%20thumbnail%2C%20sky%20background%2C%20grass%20blocks%2C%20wooden%20platforms%2C%20pixel%20art%20style%2C%20clean%20design&image_size=landscape_16_9',
    workUrl: '/works/mc-parkour/mc-parkour.html',
    tags: ['Phaser3', 'JavaScript', '游戏开发', '跑酷游戏', '地图编辑器'],
  },
];
