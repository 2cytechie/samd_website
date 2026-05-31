import { createElement } from './utils.js';

export class UI {
    constructor(container) {
        this.container = container;
        this.createElements();
    }

    createElements() {
        this.menuUI = createElement('div', 'menuUI');
        this.menuUI.innerHTML = `
            <h1>MC超大跑酷</h1>
            <div class="levelSelect">
                <h2>选择关卡</h2>
                <div class="levelGrid" id="levelGrid"></div>
            </div>
            <button class="menuBtn" id="flyModeBtn">飞行模式: 关闭</button>
        `;
        
        this.gameHUD = createElement('div', 'hud', { display: 'none' });
        this.gameHUD.innerHTML = `
            <div class="hudLeft">
                <span>关卡: <span id="currentLevel">1</span></span>
            </div>
            <div class="hudCenter">
                <span>死亡: <span id="deathCount">0</span></span>
            </div>
            <div class="hudRight">
                <span id="flyIndicator" style="display:none">✈️ 飞行中</span>
            </div>
        `;
        
        this.pauseUI = createElement('div', 'pauseUI', { display: 'none' });
        this.pauseUI.innerHTML = `
            <h2>游戏暂停</h2>
            <button class="menuBtn" id="resumeBtn">继续游戏</button>
            <button class="menuBtn" id="restartBtn">重新开始</button>
            <button class="menuBtn" id="mainMenuBtn">返回主菜单</button>
        `;
        
        this.winUI = createElement('div', 'winUI', { display: 'none' });
        this.winUI.innerHTML = `
            <h2>🎉 恭喜通关！</h2>
            <p id="winMessage"></p>
            <button class="menuBtn" id="nextLevelBtn">下一关</button>
            <button class="menuBtn" id="replayBtn">重新挑战</button>
            <button class="menuBtn" id="backToMenuBtn">返回主菜单</button>
        `;
        
        this.container.appendChild(this.menuUI);
        this.container.appendChild(this.gameHUD);
        this.container.appendChild(this.pauseUI);
        this.container.appendChild(this.winUI);
    }

    showMenu() {
        this.menuUI.style.display = 'flex';
        this.gameHUD.style.display = 'none';
        this.pauseUI.style.display = 'none';
        this.winUI.style.display = 'none';
    }

    showGameHUD() {
        this.menuUI.style.display = 'none';
        this.gameHUD.style.display = 'flex';
        this.pauseUI.style.display = 'none';
        this.winUI.style.display = 'none';
    }

    showPause() {
        this.pauseUI.style.display = 'flex';
    }

    hidePause() {
        this.pauseUI.style.display = 'none';
    }

    showWin(message) {
        document.getElementById('winMessage').textContent = message;
        this.winUI.style.display = 'flex';
    }

    updateLevel(levelNum) {
        document.getElementById('currentLevel').textContent = levelNum;
    }

    updateDeaths(count) {
        document.getElementById('deathCount').textContent = count;
    }

    toggleFlyMode(isFlying) {
        const indicator = document.getElementById('flyIndicator');
        const btn = document.getElementById('flyModeBtn');
        indicator.style.display = isFlying ? 'block' : 'none';
        btn.textContent = `飞行模式: ${isFlying ? '开启' : '关闭'}`;
    }

    populateLevelGrid(levels, completedLevels) {
        const grid = document.getElementById('levelGrid');
        grid.innerHTML = '';
        levels.forEach((level, index) => {
            const levelBtn = createElement('button', `levelBtn ${completedLevels.includes(index) ? 'completed' : ''}`);
            levelBtn.textContent = `${level.id}. ${level.name}`;
            levelBtn.dataset.levelIndex = index;
            grid.appendChild(levelBtn);
        });
    }

    onLevelSelect(callback) {
        document.getElementById('levelGrid').addEventListener('click', (e) => {
            if (e.target.classList.contains('levelBtn')) {
                const index = parseInt(e.target.dataset.levelIndex);
                callback(index);
            }
        });
    }

    onFlyModeToggle(callback) {
        document.getElementById('flyModeBtn').addEventListener('click', () => {
            callback();
        });
    }

    onResume(callback) {
        document.getElementById('resumeBtn').addEventListener('click', callback);
    }

    onRestart(callback) {
        document.getElementById('restartBtn').addEventListener('click', callback);
    }

    onMainMenu(callback) {
        document.getElementById('mainMenuBtn').addEventListener('click', callback);
    }

    onNextLevel(callback) {
        document.getElementById('nextLevelBtn').addEventListener('click', callback);
    }

    onReplay(callback) {
        document.getElementById('replayBtn').addEventListener('click', callback);
    }

    onBackToMenu(callback) {
        document.getElementById('backToMenuBtn').addEventListener('click', callback);
    }
}