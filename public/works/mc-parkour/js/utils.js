export const BLOCK_SIZE = 32;
export const GAME_WIDTH = 1200;
export const GAME_HEIGHT = 600;
export const GRAVITY = 0.5;
export const JUMP_FORCE = -12;
export const MOVE_SPEED = 5;
export const FLY_SPEED = 6;

export function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

export function createElement(type, className, style = {}) {
    const el = document.createElement(type);
    if (className) el.className = className;
    Object.keys(style).forEach(key => el.style[key] = style[key]);
    return el;
}