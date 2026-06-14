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
  {
    id: '6',
    title: '像素幸存者',
    description: '基于 Phaser3 + TypeScript 开发的割草小游戏！自动攻击系统，海量敌人（同屏 200+），4 把武器（旋转飞刀、能量弹、闪电链、火焰瓶），升级系统（10 种被动技能），还有程序化生成的 8-bit 背景音乐！\nPC端使用 WASD/方向键移动，移动端支持虚拟摇杆，存活 5 分钟即为胜利！',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20survivor%20game%20thumbnail%2C%20dark%20background%2C%20pixel%20art%20style%2C%20player%20character%2C%20slimes%2C%20weapons%20flying%2C%20clean%20design&image_size=landscape_16_9',
    detailImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20survivor%20game%20thumbnail%2C%20dark%20background%2C%20pixel%20art%20style%2C%20player%20character%2C%20slimes%2C%20weapons%20flying%2C%20clean%20design&image_size=landscape_16_9',
    workUrl: '/works/pixel-survivor/pixel-survivor.html',
    tags: ['Phaser3', 'TypeScript', '游戏开发', '割草游戏', '移动端支持'],
  },
  {
    id: '7',
    title: '坦克大战',
    description: '经典FC坦克大战游戏！具有多种地形（砖墙、钢铁、水域、草地），敌人AI系统，关卡系统！\n使用方向键移动，空格发射子弹，消灭所有敌人，保护你的基地！',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tank%20battle%20game%20thumbnail%2C%20classic%208-bit%20style%2C%20green%20player%20tank%2C%20red%20enemy%20tank%2C%20brick%20walls%2C%20dark%20background%2C%20pixel%20art%2C%20clean%20design&image_size=landscape_16_9',
    detailImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tank%20battle%20game%20thumbnail%2C%20classic%208-bit%20style%2C%20green%20player%20tank%2C%20red%20enemy%20tank%2C%20brick%20walls%2C%20dark%20background%2C%20pixel%20art%2C%20clean%20design&image_size=landscape_16_9',
    workUrl: '/works/tank-battle/tank-battle.html',
    tags: ['Canvas', 'JavaScript', '游戏开发', '经典游戏', '坦克'],
  },
  {
    id: '8',
    title: 'Minecraft Web Client',
    description: '一个在浏览器中运行的 Minecraft 克隆客户端！支持连接到 Java 版服务器（1.8-1.21.5），具有完整的资源包支持和触屏操作。\n**参考项目**: https://github.com/zardoy/minecraft-web-client\n\n功能特性：单人模式、多人模式、资源包支持、触屏/控制器操作、完整的游戏界面。',
    thumbnail: '/works/minecraft-web-client/thumbnail.png',
    detailImage: '/works/minecraft-web-client/thumbnail.png',
    workUrl: '/works/minecraft-web-client/minecraft-web-client.html',
    tags: ['TypeScript', 'React', 'Three.js', '游戏开发', 'Minecraft'],
  },
  {
    id: '9',
    title: '密码攻防演示工具',
    description: '密码安全科普学习工具！包含多种密码学演示功能：\n\n🔐 **AI出题你来破** - AI随机生成密码，通过A/B提示推理破解\n🔑 **你设密码AI破** - 设置密码让AI尝试破解，体验暴力破解过程\n🔒 **加密解密** - 支持凯撒密码、栅栏密码、维吉尼亚密码、Base64、MD5\n💥 **暴力破解** - 展示暴力破解和字典破解的完整过程\n\n⚠️ 本工具仅用于密码安全科普学习，请勿用于非法用途！',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=password%20security%20tool%20thumbnail%2C%20dark%20theme%2C%20lock%20icon%2C%20code%20binary%20background%2C%20cyber%20style%2C%20clean%20design%2C%20professional&image_size=landscape_16_9',
    detailImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=password%20security%20tool%20thumbnail%2C%20dark%20theme%2C%20lock%20icon%2C%20code%20binary%20background%2C%20cyber%20style%2C%20clean%20design%2C%20professional&image_size=landscape_16_9',
    workUrl: '/works/password-tool/password-tool.html',
    tags: ['HTML', 'JavaScript', '密码学', '安全教育', '工具'],
  },
];
