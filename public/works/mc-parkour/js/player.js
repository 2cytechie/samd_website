import { BLOCK_SIZE, GAME_WIDTH, GAME_HEIGHT, GRAVITY, JUMP_FORCE, MOVE_SPEED, FLY_SPEED, checkCollision, clamp } from './utils.js';

export class Player {
    constructor() {
        this.reset();
        this.onJump = null;
    }

    reset() {
        this.x = 80;
        this.y = GAME_HEIGHT - 100;
        this.width = 28;
        this.height = 28;
        this.vx = 0;
        this.vy = 0;
        this.isJumping = false;
        this.isDead = false;
        this.isFlying = false;
        this.faceDirection = 1;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
    }

    update(keys, blocks, traps) {
        if (this.isDead) return;

        this.handleInput(keys);
        
        if (!this.isFlying) {
            this.vy += GRAVITY;
            if (this.vy > 15) this.vy = 15;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (!this.isFlying) {
            this.checkBlockCollisions(blocks);
        }

        this.checkTrapCollisions(traps);

        this.x = clamp(this.x, 0, GAME_WIDTH - this.width);

        if (this.y > GAME_HEIGHT + 50) {
            this.die();
        }
    }

    handleInput(keys) {
        if (this.isFlying) {
            this.vx = 0;
            this.vy = 0;

            if (keys['a'] || keys['arrowleft']) {
                this.vx = -FLY_SPEED;
                this.faceDirection = -1;
            }
            if (keys['d'] || keys['arrowright']) {
                this.vx = FLY_SPEED;
                this.faceDirection = 1;
            }
            if (keys['w'] || keys[' '] || keys['arrowup']) this.vy = -FLY_SPEED;
            if (keys['s'] || keys['arrowdown']) this.vy = FLY_SPEED;
        } else {
            this.vx = 0;

            if (keys['a'] || keys['arrowleft']) {
                this.vx = -MOVE_SPEED;
                this.faceDirection = -1;
            }
            if (keys['d'] || keys['arrowright']) {
                this.vx = MOVE_SPEED;
                this.faceDirection = 1;
            }
            if ((keys['w'] || keys[' '] || keys['arrowup']) && !this.isJumping) {
                this.vy = JUMP_FORCE;
                this.isJumping = true;
                if (this.onJump) this.onJump();
            }
        }
    }

    checkBlockCollisions(blocks) {
        this.isJumping = true;

        for (const block of blocks) {
            if (checkCollision(this, block)) {
                const overlapLeft = (this.x + this.width) - block.x;
                const overlapRight = (block.x + block.width) - this.x;
                const overlapTop = (this.y + this.height) - block.y;
                const overlapBottom = (block.y + block.height) - this.y;

                const minOverlapX = Math.min(overlapLeft, overlapRight);
                const minOverlapY = Math.min(overlapTop, overlapBottom);

                if (minOverlapX < minOverlapY) {
                    if (overlapLeft < overlapRight) this.x -= minOverlapX;
                    else this.x += minOverlapX;
                    this.vx = 0;
                } else {
                    if (overlapTop < overlapBottom) {
                        this.y -= minOverlapTop;
                        if (this.vy > 0) this.vy = 0;
                    } else {
                        this.y += minOverlapBottom;
                        this.vy = 0;
                    }
                    if (overlapBottom < overlapTop) {
                        this.isJumping = false;
                    }
                }
            }
        }
    }

    checkTrapCollisions(traps) {
        for (const trap of traps) {
            if (trap.active && checkCollision(this, trap)) {
                trap.onCollide(this);
            }
        }
    }

    die() {
        this.isDead = true;
    }

    draw(ctx, cameraX) {
        ctx.save();
        ctx.translate(this.x - cameraX, this.y);

        ctx.fillStyle = this.isFlying ? '#FF69B4' : '#4169E1';
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.fillStyle = '#FFDAB9';
        ctx.fillRect(4, -12, 20, 16);

        ctx.fillStyle = '#000';
        const eyeX = this.faceDirection === 1 ? 20 : 8;
        ctx.fillRect(eyeX - 2, 8, 4, 4);

        ctx.restore();
    }
}