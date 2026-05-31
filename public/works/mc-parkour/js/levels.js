import { BLOCK_SIZE, GAME_HEIGHT, GAME_WIDTH } from './utils.js';
import { Trap } from './traps.js';

export const LEVELS = [
    {
        id: 1,
        name: '入门训练',
        difficulty: 'easy',
        startX: 80,
        startY: GAME_HEIGHT - 100,
        endX: 1100,
        endY: GAME_HEIGHT - 60,
        blocks: [
            { x: 0, y: GAME_HEIGHT - BLOCK_SIZE, width: GAME_WIDTH * 2, height: BLOCK_SIZE, type: 'grass' },
            { x: 200, y: GAME_HEIGHT - BLOCK_SIZE * 3, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, type: 'stone' },
            { x: 350, y: GAME_HEIGHT - BLOCK_SIZE * 5, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, type: 'wood' },
            { x: 480, y: GAME_HEIGHT - BLOCK_SIZE * 4, width: BLOCK_SIZE * 4, height: BLOCK_SIZE, type: 'brick' },
            { x: 650, y: GAME_HEIGHT - BLOCK_SIZE * 6, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, type: 'stone' },
            { x: 780, y: GAME_HEIGHT - BLOCK_SIZE * 4, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, type: 'wood' },
            { x: 950, y: GAME_HEIGHT - BLOCK_SIZE * 3, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, type: 'brick' },
            { x: 1050, y: GAME_HEIGHT - BLOCK_SIZE * 2, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, type: 'goldOre' },
        ],
        traps: []
    },
    {
        id: 2,
        name: '消失的地板',
        difficulty: 'normal',
        startX: 80,
        startY: GAME_HEIGHT - 100,
        endX: 1100,
        endY: GAME_HEIGHT - 60,
        blocks: [
            { x: 0, y: GAME_HEIGHT - BLOCK_SIZE, width: 200, height: BLOCK_SIZE, type: 'grass' },
            { x: 400, y: GAME_HEIGHT - BLOCK_SIZE, width: 200, height: BLOCK_SIZE, type: 'grass' },
            { x: 700, y: GAME_HEIGHT - BLOCK_SIZE, width: 200, height: BLOCK_SIZE, type: 'grass' },
            { x: 1000, y: GAME_HEIGHT - BLOCK_SIZE, width: 200, height: BLOCK_SIZE, type: 'grass' },
            { x: 200, y: GAME_HEIGHT - BLOCK_SIZE * 2, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, type: 'stone' },
            { x: 650, y: GAME_HEIGHT - BLOCK_SIZE * 2, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, type: 'stone' },
            { x: 900, y: GAME_HEIGHT - BLOCK_SIZE * 2, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, type: 'stone' },
        ],
        traps: [
            { type: 'vanish', x: 200, y: GAME_HEIGHT - BLOCK_SIZE * 2, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, delay: 500 },
            { type: 'vanish', x: 650, y: GAME_HEIGHT - BLOCK_SIZE * 2, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, delay: 800 },
            { type: 'vanish', x: 900, y: GAME_HEIGHT - BLOCK_SIZE * 2, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, delay: 300 },
        ]
    },
    {
        id: 3,
        name: '尖刺丛林',
        difficulty: 'normal',
        startX: 80,
        startY: GAME_HEIGHT - 100,
        endX: 1100,
        endY: GAME_HEIGHT - 60,
        blocks: [
            { x: 0, y: GAME_HEIGHT - BLOCK_SIZE, width: 150, height: BLOCK_SIZE, type: 'grass' },
            { x: 250, y: GAME_HEIGHT - BLOCK_SIZE * 2, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, type: 'stone' },
            { x: 400, y: GAME_HEIGHT - BLOCK_SIZE * 3, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, type: 'brick' },
            { x: 550, y: GAME_HEIGHT - BLOCK_SIZE * 2, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, type: 'stone' },
            { x: 700, y: GAME_HEIGHT - BLOCK_SIZE * 4, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, type: 'wood' },
            { x: 900, y: GAME_HEIGHT - BLOCK_SIZE * 2, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, type: 'stone' },
            { x: 1000, y: GAME_HEIGHT - BLOCK_SIZE, width: 200, height: BLOCK_SIZE, type: 'grass' },
        ],
        traps: [
            { type: 'spike', x: 150, y: GAME_HEIGHT - BLOCK_SIZE - 15, width: BLOCK_SIZE * 2, height: BLOCK_SIZE },
            { type: 'spike', x: 350, y: GAME_HEIGHT - BLOCK_SIZE - 15, width: BLOCK_SIZE * 2, height: BLOCK_SIZE },
            { type: 'spike', x: 500, y: GAME_HEIGHT - BLOCK_SIZE - 15, width: BLOCK_SIZE * 2, height: BLOCK_SIZE },
            { type: 'spike', x: 800, y: GAME_HEIGHT - BLOCK_SIZE - 15, width: BLOCK_SIZE * 3, height: BLOCK_SIZE },
        ]
    },
    {
        id: 4,
        name: '天降杀机',
        difficulty: 'hard',
        startX: 80,
        startY: GAME_HEIGHT - 100,
        endX: 1100,
        endY: GAME_HEIGHT - 60,
        blocks: [
            { x: 0, y: GAME_HEIGHT - BLOCK_SIZE, width: 150, height: BLOCK_SIZE, type: 'grass' },
            { x: 250, y: GAME_HEIGHT - BLOCK_SIZE * 3, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, type: 'stone' },
            { x: 450, y: GAME_HEIGHT - BLOCK_SIZE * 2, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, type: 'brick' },
            { x: 600, y: GAME_HEIGHT - BLOCK_SIZE * 4, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, type: 'wood' },
            { x: 800, y: GAME_HEIGHT - BLOCK_SIZE * 3, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, type: 'stone' },
            { x: 950, y: GAME_HEIGHT - BLOCK_SIZE * 2, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, type: 'goldOre' },
            { x: 1050, y: GAME_HEIGHT - BLOCK_SIZE, width: 200, height: BLOCK_SIZE, type: 'grass' },
        ],
        traps: [
            { type: 'ceiling', x: 200, y: 50, width: BLOCK_SIZE * 4, height: BLOCK_SIZE, speed: 3 },
            { type: 'ceiling', x: 500, y: 30, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, speed: 4 },
            { type: 'ceiling', x: 750, y: 40, width: BLOCK_SIZE * 5, height: BLOCK_SIZE, speed: 3.5 },
        ]
    },
    {
        id: 5,
        name: '移动迷宫',
        difficulty: 'hard',
        startX: 80,
        startY: GAME_HEIGHT - 100,
        endX: 1100,
        endY: GAME_HEIGHT - 60,
        blocks: [
            { x: 0, y: GAME_HEIGHT - BLOCK_SIZE, width: 150, height: BLOCK_SIZE, type: 'grass' },
            { x: 300, y: GAME_HEIGHT - BLOCK_SIZE * 4, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, type: 'stone' },
            { x: 550, y: GAME_HEIGHT - BLOCK_SIZE * 3, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, type: 'brick' },
            { x: 750, y: GAME_HEIGHT - BLOCK_SIZE * 5, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, type: 'wood' },
            { x: 1000, y: GAME_HEIGHT - BLOCK_SIZE, width: 200, height: BLOCK_SIZE, type: 'grass' },
        ],
        traps: [
            { type: 'moving', x: 200, y: GAME_HEIGHT - BLOCK_SIZE * 2, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, speed: 2, maxDistance: 80 },
            { type: 'moving', x: 450, y: GAME_HEIGHT - BLOCK_SIZE * 2, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, speed: 3, maxDistance: 60 },
            { type: 'moving', x: 650, y: GAME_HEIGHT - BLOCK_SIZE * 4, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, speed: 2.5, maxDistance: 100 },
            { type: 'moving', x: 850, y: GAME_HEIGHT - BLOCK_SIZE * 3, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, speed: 2, maxDistance: 70 },
        ]
    },
    {
        id: 6,
        name: '终极挑战',
        difficulty: 'hell',
        startX: 80,
        startY: GAME_HEIGHT - 100,
        endX: 1100,
        endY: GAME_HEIGHT - 60,
        blocks: [
            { x: 0, y: GAME_HEIGHT - BLOCK_SIZE, width: 100, height: BLOCK_SIZE, type: 'grass' },
            { x: 180, y: GAME_HEIGHT - BLOCK_SIZE * 3, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, type: 'stone' },
            { x: 350, y: GAME_HEIGHT - BLOCK_SIZE * 4, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, type: 'brick' },
            { x: 500, y: GAME_HEIGHT - BLOCK_SIZE * 3, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, type: 'wood' },
            { x: 700, y: GAME_HEIGHT - BLOCK_SIZE * 5, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, type: 'stone' },
            { x: 850, y: GAME_HEIGHT - BLOCK_SIZE * 4, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, type: 'goldOre' },
            { x: 980, y: GAME_HEIGHT - BLOCK_SIZE * 2, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, type: 'ironOre' },
            { x: 1080, y: GAME_HEIGHT - BLOCK_SIZE, width: 200, height: BLOCK_SIZE, type: 'grass' },
        ],
        traps: [
            { type: 'vanish', x: 180, y: GAME_HEIGHT - BLOCK_SIZE * 3, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, delay: 400 },
            { type: 'spike', x: 300, y: GAME_HEIGHT - BLOCK_SIZE - 15, width: BLOCK_SIZE * 2, height: BLOCK_SIZE },
            { type: 'ceiling', x: 450, y: 30, width: BLOCK_SIZE * 4, height: BLOCK_SIZE, speed: 4 },
            { type: 'moving', x: 650, y: GAME_HEIGHT - BLOCK_SIZE * 3, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, speed: 3, maxDistance: 80 },
            { type: 'vanish', x: 700, y: GAME_HEIGHT - BLOCK_SIZE * 5, width: BLOCK_SIZE * 2, height: BLOCK_SIZE, delay: 500 },
            { type: 'spike', x: 800, y: GAME_HEIGHT - BLOCK_SIZE - 15, width: BLOCK_SIZE * 3, height: BLOCK_SIZE },
            { type: 'ceiling', x: 900, y: 50, width: BLOCK_SIZE * 3, height: BLOCK_SIZE, speed: 3.5 },
        ]
    }
];

export class Level {
    constructor(levelData) {
        this.id = levelData.id;
        this.name = levelData.name;
        this.difficulty = levelData.difficulty;
        this.startX = levelData.startX;
        this.startY = levelData.startY;
        this.endX = levelData.endX;
        this.endY = levelData.endY;
        this.blocks = levelData.blocks.map(b => ({ ...b }));
        this.traps = levelData.traps.map(t => {
            const trap = new Trap(t.type, t.x, t.y, t.width, t.height, {
                delay: t.delay,
                speed: t.speed,
                direction: t.direction,
                maxDistance: t.maxDistance
            });
            trap.originalX = t.x;
            return trap;
        });
        this.flag = { x: levelData.endX - 20, y: levelData.endY - 80, width: 40, height: 80 };
    }

    resetTraps() {
        this.traps.forEach(trap => trap.reset());
    }

    update(player) {
        this.traps.forEach(trap => trap.update(player));
    }

    draw(ctx, cameraX) {
        this.blocks.forEach(block => {
            const colors = {
                grass: '#60A917',
                dirt: '#8B4513',
                stone: '#888888',
                sand: '#F4D03F',
                wood: '#A0522D',
                leaves: '#228B22',
                brick: '#CD5C5C',
                goldOre: '#FFD700',
                ironOre: '#B0C4DE'
            };
            ctx.fillStyle = colors[block.type] || '#60A917';
            ctx.fillRect(block.x - cameraX, block.y, block.width, block.height);
            ctx.fillStyle = 'rgba(0,0,0,0.2)';
            ctx.fillRect(block.x - cameraX, block.y, block.width, 4);
            ctx.fillRect(block.x - cameraX, block.y, 4, block.height);
        });

        this.traps.forEach(trap => trap.draw(ctx, cameraX));

        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.flag.x - cameraX, this.flag.y, this.flag.width, this.flag.height);
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(this.flag.x - cameraX + this.flag.width - 10, this.flag.y, 10, this.flag.height);
    }

    checkWin(player) {
        return player.x + player.width > this.endX &&
               player.x < this.endX + 100 &&
               player.y + player.height >= this.endY - BLOCK_SIZE &&
               player.y <= this.endY;
    }
}