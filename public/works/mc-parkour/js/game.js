import { GAME_WIDTH, GAME_HEIGHT } from './utils.js';
import { Player } from './player.js';
import { LEVELS, Level } from './levels.js';
import { UI } from './ui.js';
import { AudioManager } from './audio.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;
        
        this.container = document.getElementById('gameContainer');
        this.ui = new UI(this.container);
        this.audio = new AudioManager();
        
        this.player = new Player();
        this.currentLevel = null;
        this.currentLevelIndex = 0;
        this.deathCount = 0;
        this.completedLevels = [];
        
        this.camera = { x: 0, y: 0 };
        this.keys = {};
        this.isPaused = false;
        this.gameRunning = false;
        
        this.particles = [];
        this.stepTimer = 0;
        
        this.setupEventListeners();
        this.ui.populateLevelGrid(LEVELS, this.completedLevels);
        this.ui.showMenu();
    }
    
    setupEventListeners() {
        const game = this;
        
        window.addEventListener('keydown', function(e) {
            game.keys[e.key.toLowerCase()] = true;
            
            if (e.keyCode === 49 || e.key === '1') {
                game.toggleFlyMode();
            }
            
            if (e.key === 'p' || e.key === 'Escape') {
                game.togglePause();
            }
            
            if (['w', ' ', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        });
        
        window.addEventListener('keyup', function(e) {
            game.keys[e.key.toLowerCase()] = false;
        });
        
        this.ui.onLevelSelect((index) => this.startLevel(index));
        this.ui.onFlyModeToggle(() => this.toggleFlyMode());
        this.ui.onResume(() => this.togglePause());
        this.ui.onRestart(() => this.restartLevel());
        this.ui.onMainMenu(() => this.returnToMenu());
        this.ui.onNextLevel(() => this.nextLevel());
        this.ui.onReplay(() => this.restartLevel());
        this.ui.onBackToMenu(() => this.returnToMenu());
    }
    
    startLevel(index) {
        this.currentLevelIndex = index;
        this.currentLevel = new Level(LEVELS[index]);
        this.player.reset();
        this.player.setPosition(this.currentLevel.startX, this.currentLevel.startY);
        this.player.onJump = () => this.audio.playJump();
        this.deathCount = 0;
        this.camera.x = 0;
        this.isPaused = false;
        this.gameRunning = true;
        
        this.ui.showGameHUD();
        this.ui.updateLevel(index + 1);
        this.ui.updateDeaths(this.deathCount);
        
        if (!this.animationFrameId) {
            this.gameLoop();
        }
    }
    
    toggleFlyMode() {
        this.player.isFlying = !this.player.isFlying;
        this.ui.toggleFlyMode(this.player.isFlying);
    }
    
    togglePause() {
        if (!this.gameRunning) return;
        
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.ui.showPause();
        } else {
            this.ui.hidePause();
        }
    }
    
    restartLevel() {
        this.startLevel(this.currentLevelIndex);
    }
    
    returnToMenu() {
        this.gameRunning = false;
        this.ui.showMenu();
        this.ui.populateLevelGrid(LEVELS, this.completedLevels);
    }
    
    nextLevel() {
        const nextIndex = this.currentLevelIndex + 1;
        if (nextIndex < LEVELS.length) {
            this.startLevel(nextIndex);
        } else {
            this.returnToMenu();
        }
    }
    
    handlePlayerDeath() {
        this.deathCount++;
        this.ui.updateDeaths(this.deathCount);
        this.audio.playDeath();
        this.createDeathParticles();
        
        setTimeout(() => {
            this.player.reset();
            this.player.setPosition(this.currentLevel.startX, this.currentLevel.startY);
            this.currentLevel.resetTraps();
            this.camera.x = 0;
            this.particles = [];
        }, 500);
    }
    
    checkWin() {
        if (this.currentLevel.checkWin(this.player)) {
            this.gameRunning = false;
            this.audio.playWin();
            this.createWinParticles();
            
            if (!this.completedLevels.includes(this.currentLevelIndex)) {
                this.completedLevels.push(this.currentLevelIndex);
            }
            
            const message = `关卡 ${this.currentLevelIndex + 1} 完成！\n死亡次数: ${this.deathCount}`;
            this.ui.showWin(message);
        }
    }
    
    createDeathParticles() {
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: this.player.x + this.player.width / 2,
                y: this.player.y + this.player.height / 2,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 30,
                color: ['#FF4444', '#FF8844', '#FFAAAA'][Math.floor(Math.random() * 3)]
            });
        }
    }
    
    createWinParticles() {
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: this.player.x + this.player.width / 2,
                y: this.player.y + this.player.height / 2,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6 - 2,
                life: 60,
                color: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347'][Math.floor(Math.random() * 4)]
            });
        }
    }
    
    updateCamera() {
        const targetX = this.player.x - GAME_WIDTH / 2 + this.player.width / 2;
        this.camera.x += (targetX - this.camera.x) * 0.1;
        this.camera.x = Math.max(0, Math.min(this.camera.x, 2000));
    }
    
    update() {
        if (!this.gameRunning || this.isPaused) return;
        
        this.player.update(this.keys, this.currentLevel.blocks, this.currentLevel.traps);
        this.currentLevel.update(this.player);
        this.updateParticles();
        
        if (this.player.isDead) {
            this.handlePlayerDeath();
            return;
        }
        
        this.checkWin();
        this.updateCamera();
        this.updateStepSound();
    }
    
    updateParticles() {
        this.particles = this.particles.filter(p => p.life > 0);
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2;
            p.life--;
        });
    }
    
    updateStepSound() {
        if ((this.keys['a'] || this.keys['d'] || this.keys['arrowleft'] || this.keys['arrowright']) && !this.player.isJumping && !this.player.isFlying) {
            this.stepTimer++;
            if (this.stepTimer >= 15) {
                this.audio.playStep();
                this.stepTimer = 0;
            }
        } else {
            this.stepTimer = 0;
        }
    }
    
    draw() {
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        
        this.drawBackground();
        
        this.ctx.save();
        this.ctx.translate(-this.camera.x, 0);
        
        this.currentLevel.draw(this.ctx, this.camera.x);
        this.player.draw(this.ctx, this.camera.x);
        this.drawParticles();
        
        this.ctx.restore();
    }
    
    drawBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.6, '#B0E0E6');
        gradient.addColorStop(1, '#98FB98');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        
        this.ctx.fillStyle = '#FFFFFF';
        for (let i = 0; i < 5; i++) {
            const cloudX = (Date.now() / 1000 + i * 200) % (GAME_WIDTH + 100) - 50;
            this.drawCloud(cloudX, 50 + i * 40);
        }
    }
    
    drawCloud(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 25, 0, Math.PI * 2);
        this.ctx.arc(x + 30, y - 10, 30, 0, Math.PI * 2);
        this.ctx.arc(x + 60, y, 25, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawParticles() {
        this.particles.forEach(p => {
            this.ctx.globalAlpha = p.life / 30;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 5 * (p.life / 30), 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
    }
    
    gameLoop() {
        this.update();
        this.draw();
        this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new Game();
});