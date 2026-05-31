import { BLOCK_SIZE, GAME_HEIGHT } from './utils.js';

export class Trap {
    constructor(type, x, y, width, height, options = {}) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.active = true;
        this.triggered = false;
        this.delay = options.delay || 500;
        this.speed = options.speed || 2;
        this.direction = options.direction || 1;
        this.originalY = y;
        this.maxDistance = options.maxDistance || 100;
        this.timer = 0;
    }

    update(player) {
        switch (this.type) {
            case 'vanish':
                this.updateVanish(player);
                break;
            case 'spike':
                this.updateSpike(player);
                break;
            case 'ceiling':
                this.updateCeiling(player);
                break;
            case 'moving':
                this.updateMoving();
                break;
            case 'fake':
                break;
            case 'shooter':
                this.updateShooter();
                break;
        }
    }

    updateVanish(player) {
        if (!this.triggered && this.checkPlayerOnBlock(player)) {
            this.triggered = true;
            setTimeout(() => {
                this.active = false;
            }, this.delay);
        }
    }

    updateSpike(player) {
        if (this.checkPlayerNear(player, 50)) {
            this.active = true;
        }
    }

    updateCeiling(player) {
        if (!this.triggered && this.checkPlayerNear(player, 150)) {
            this.triggered = true;
        }
        if (this.triggered && this.y < GAME_HEIGHT - BLOCK_SIZE) {
            this.y += this.speed;
        }
    }

    updateMoving() {
        this.x += this.speed * this.direction;
        if (Math.abs(this.x - this.originalX) > this.maxDistance) {
            this.direction *= -1;
        }
    }

    updateShooter() {
        if (this.timer++ > 60) {
            this.timer = 0;
        }
    }

    checkPlayerOnBlock(player) {
        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y + player.height >= this.y &&
               player.y + player.height <= this.y + this.height + 5;
    }

    checkPlayerNear(player, distance) {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        const playerCenterX = player.x + player.width / 2;
        const playerCenterY = player.y + player.height / 2;
        return Math.abs(centerX - playerCenterX) < distance &&
               Math.abs(centerY - playerCenterY) < distance;
    }

    onCollide(player) {
        switch (this.type) {
            case 'spike':
            case 'ceiling':
                player.die();
                break;
            case 'fake':
                break;
            case 'shooter':
                player.die();
                break;
        }
    }

    draw(ctx, cameraX) {
        if (!this.active) return;

        ctx.save();
        ctx.translate(this.x - cameraX, this.y);

        switch (this.type) {
            case 'vanish':
                this.drawVanish(ctx);
                break;
            case 'spike':
                this.drawSpike(ctx);
                break;
            case 'ceiling':
                this.drawCeiling(ctx);
                break;
            case 'moving':
                this.drawMoving(ctx);
                break;
            case 'fake':
                this.drawFake(ctx);
                break;
            case 'shooter':
                this.drawShooter(ctx);
                break;
        }

        ctx.restore();
    }

    drawVanish(ctx) {
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, 0, this.width, this.height);
        if (this.triggered) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.fillRect(0, 0, this.width, this.height);
        } else {
            ctx.fillStyle = '#A0522D';
            ctx.fillRect(2, 2, this.width - 4, 4);
        }
    }

    drawSpike(ctx) {
        ctx.fillStyle = '#666';
        const spikes = Math.floor(this.width / 10);
        for (let i = 0; i < spikes; i++) {
            const spikeX = i * 10;
            ctx.beginPath();
            ctx.moveTo(spikeX + 5, 0);
            ctx.lineTo(spikeX, 15);
            ctx.lineTo(spikeX + 10, 15);
            ctx.closePath();
            ctx.fill();
        }
        ctx.fillRect(0, 15, this.width, this.height - 15);
    }

    drawCeiling(ctx) {
        ctx.fillStyle = '#444';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(0, this.height - 5, this.width, 5);
    }

    drawMoving(ctx) {
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = '#388E3C';
        ctx.fillRect(2, 2, this.width - 4, 4);
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(this.width / 2 - 5, this.height / 2 - 5, 10, 10);
    }

    drawFake(ctx) {
        ctx.fillStyle = '#60A917';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = '#888';
        ctx.globalAlpha = 0.6;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.globalAlpha = 1;
    }

    drawShooter(ctx) {
        ctx.fillStyle = '#8B0000';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = '#FF0000';
        if (this.timer < 30) {
            ctx.fillRect(this.width / 2 - 3, -10, 6, 10);
        }
    }

    reset() {
        this.active = true;
        this.triggered = false;
        this.y = this.originalY;
        if (this.originalX !== undefined) {
            this.x = this.originalX;
        }
        this.timer = 0;
    }
}