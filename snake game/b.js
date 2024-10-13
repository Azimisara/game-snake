const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const boxSize = 20;
let snake = [{ x: 9 * boxSize, y: 9 * boxSize }];
let direction = { x: 0, y: 0 };
let score = 0;
let gameInterval;
let food = { x: 0, y: 0 };

function generateFood() {
    food.x = Math.floor(Math.random() * (gameArea.clientWidth / boxSize)) * boxSize;
    food.y = Math.floor(Math.random() * (gameArea.clientHeight / boxSize)) * boxSize;
}
function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.width = `${boxSize}px`;
    foodElement.style.height = `${boxSize}px`;
    foodElement.style.backgroundColor = 'blue'; 
    foodElement.style.position = 'absolute';
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    gameArea.appendChild(foodElement);
}
function drawSnake() {
    gameArea.innerHTML = '';
    drawFood(); 
    snake.forEach(segment => {
        const snakePart = document.createElement('div');
        snakePart.classList.add('snake');
        snakePart.style.width = `${boxSize}px`;
        snakePart.style.height = `${boxSize}px`;
        snakePart.style.left = `${segment.x}px`;
        snakePart.style.top = `${segment.y}px`;
        gameArea.appendChild(snakePart);
    });
}
function moveSnake() {
    const head = { x: snake[0].x + direction.x * boxSize, y: snake[0].y + direction.y * boxSize };
    if (head.x < 0 || head.x >= gameArea.clientWidth || head.y < 0 || head.y >= gameArea.clientHeight) {
        clearInterval(gameInterval);
        alert('Game Over! Your score: ' + score);
        return;
    }
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.innerText = 'Score: ' + score;
        snake.unshift(head); 
        generateFood(); 
    } else {
        snake.unshift(head);
        snake.pop(); 
    }
    drawSnake();
}
function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                direction = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction = { x: 1, y: 0 };
            }
            break;
    }
}
document.addEventListener('keydown', changeDirection);
generateFood(); 
gameInterval = setInterval(moveSnake, 100);
drawSnake();