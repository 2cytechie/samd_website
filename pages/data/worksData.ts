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
    title: '太空射击小游戏',
    description: '使用HTML5 Canvas开发的2D太空射击游戏，支持键盘和触摸操作',
    type: '网页小游戏',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20space%20shooter%20game%20with%20spaceships%20and%20lasers&image_size=square',
    detailImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=space%20shooter%20game%20screenshot%20with%20stars%20background%20and%20explosions&image_size=landscape_16_9',
    workUrl: 'https://example.com/space-shooter',
    tags: ['Canvas', 'JavaScript', '游戏开发'],
  },
  {
    id: '2',
    title: '天气查询小程序',
    description: '微信小程序，实时查询天气信息，支持定位和城市搜索',
    type: '小程序',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=weather%20app%20mobile%20interface%20with%20sun%20clouds%20and%20temperature&image_size=square',
    detailImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=weather%20forecast%20app%20screenshot%20showing%207%20day%20forecast&image_size=landscape_16_9',
    workUrl: 'https://example.com/weather-miniprogram',
    tags: ['微信小程序', 'API', '位置服务'],
  },
  {
    id: '3',
    title: '任务管理系统',
    description: '基于React和Node.js的网页应用，支持任务创建、分类、提醒功能',
    type: '网页应用',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=task%20management%20dashboard%20with%20to-do%20lists%20and%20calendar&image_size=square',
    detailImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=project%20management%20software%20interface%20with%20kanban%20boards&image_size=landscape_16_9',
    workUrl: 'https://example.com/task-manager',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: '4',
    title: '记忆翻牌游戏',
    description: '经典记忆配对游戏，多种难度可选，记录最高分',
    type: '网页小游戏',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=memory%20card%20game%20with%20colorful%20cards%20flipped%20over&image_size=square',
    detailImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=memory%20match%20game%20screenshot%20with%20score%20display&image_size=landscape_16_9',
    workUrl: 'https://example.com/memory-game',
    tags: ['Vue.js', 'CSS动画', '游戏逻辑'],
  },
  {
    id: '5',
    title: '个人理财助手',
    description: '记账小程序，自动分类消费，生成月度报表',
    type: '小程序',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=personal%20finance%20app%20with%20charts%20and%20budget%20tracking&image_size=square',
    detailImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=expense%20tracker%20app%20showing%20monthly%20spending%20charts&image_size=landscape_16_9',
    workUrl: 'https://example.com/finance-helper',
    tags: ['小程序', '数据可视化', '财务管理'],
  },
  {
    id: '6',
    title: '在线学习平台',
    description: '视频课程网页应用，支持进度跟踪、笔记、问答功能',
    type: '网页应用',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=online%20learning%20platform%20with%20course%20cards%20and%20videos&image_size=square',
    detailImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=e-learning%20dashboard%20with%20video%20player%20and%20progress%20bar&image_size=landscape_16_9',
    workUrl: 'https://example.com/learning-platform',
    tags: ['React', '视频流', '用户系统'],
  },
];
