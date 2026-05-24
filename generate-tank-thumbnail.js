import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const canvas = createCanvas(800, 600);
const ctx = canvas.getContext('2d');

const TILE_SIZE = 40;

// 背景
ctx.fillStyle = '#1a1a1a';
ctx.fillRect(0, 0, 800, 600);

// 画砖墙
function drawBrick(x, y) {
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    ctx.fillStyle = '#A0522D';
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            if ((i + j) % 2 === 0) {
                ctx.fillRect(x + i * 20, y + j * 20, 20, 20);
            }
        }
    }
}

// 画钢铁
function drawSteel(x, y) {
    ctx.fillStyle = '#708090';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    ctx.fillStyle = '#A9A9A9';
    ctx.fillRect(x + 4, y + 4, TILE_SIZE - 8, TILE_SIZE - 8);
}

// 画坦克
function drawTank(x, y, color, direction) {
    ctx.save();
    ctx.translate(x + TILE_SIZE / 2, y + TILE_SIZE / 2);
    
    switch(direction) {
        case 'right': ctx.rotate(Math.PI / 2); break;
        case 'down': ctx.rotate(Math.PI); break;
        case 'left': ctx.rotate(-Math.PI / 2); break;
    }
    
    ctx.fillStyle = color;
    ctx.fillRect(-14, -14, 28, 28);
    
    ctx.fillStyle = color === '#4CAF50' ? '#2E7D32' : '#c62828';
    ctx.fillRect(-12, -12, 24, 24);
    
    ctx.fillStyle = '#333';
    ctx.fillRect(-14, -12, 8, 24);
    ctx.fillRect(6, -12, 8, 24);
    
    ctx.fillStyle = '#555';
    ctx.fillRect(-4, -22, 8, 12);
    
    ctx.restore();
}

// 画基地
function drawBase(x, y) {
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.moveTo(x + TILE_SIZE / 2, y + 4);
    ctx.lineTo(x + TILE_SIZE - 4, y + TILE_SIZE - 4);
    ctx.lineTo(x + 4, y + TILE_SIZE - 4);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#FF4500';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('★', x + TILE_SIZE / 2, y + TILE_SIZE / 2 + 7);
}

// 画地图
const mapStartX = 80;
const mapStartY = 100;

for (let i = 0; i < 8; i++) {
    drawBrick(mapStartX + i * TILE_SIZE, mapStartY);
    drawBrick(mapStartX + i * TILE_SIZE, mapStartY + TILE_SIZE);
}

drawSteel(mapStartX + 3 * TILE_SIZE, mapStartY + 3 * TILE_SIZE);
drawSteel(mapStartX + 4 * TILE_SIZE, mapStartY + 3 * TILE_SIZE);
drawSteel(mapStartX + 3 * TILE_SIZE, mapStartY + 4 * TILE_SIZE);
drawSteel(mapStartX + 4 * TILE_SIZE, mapStartY + 4 * TILE_SIZE);

for (let i = 0; i < 8; i++) {
    if (i !== 3 && i !== 4) {
        drawBrick(mapStartX + i * TILE_SIZE, mapStartY + 7 * TILE_SIZE);
    }
}

drawTank(mapStartX + 3 * TILE_SIZE, mapStartY + 6 * TILE_SIZE, '#4CAF50', 'up');
drawTank(mapStartX, mapStartY, '#f44336', 'down');
drawTank(mapStartX + 7 * TILE_SIZE, mapStartY, '#f44336', 'down');

drawBase(mapStartX + 3.5 * TILE_SIZE, mapStartY + 8 * TILE_SIZE);

// 画标题
ctx.font = 'bold 48px Impact, Arial, sans-serif';
ctx.textAlign = 'center';
const gradient = ctx.createLinearGradient(200, 0, 600, 0);
gradient.addColorStop(0, '#ffd700');
gradient.addColorStop(0.5, '#fff');
gradient.addColorStop(1, '#ff8c00');
ctx.fillStyle = gradient;
ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
ctx.shadowBlur = 15;
ctx.fillText('坦 克 大 战', 400, 60);
ctx.shadowBlur = 0;

ctx.font = '16px "Courier New", monospace';
ctx.fillStyle = '#aaa';
ctx.fillText('经典FC游戏 · 保护基地', 400, 550);

// 保存文件
const buffer = canvas.toBuffer('image/png');
const outputPath = path.join('public', 'works', 'tank-battle', 'tank-battle-thumbnail.png');
fs.writeFileSync(outputPath, buffer);
console.log('缩略图已生成：', outputPath);
