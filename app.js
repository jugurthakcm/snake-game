const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let snake = [
  { x: 90, y: 50 },
  { x: 80, y: 50 },
  { x: 70, y: 50 },
  { x: 60, y: 50 },
  { x: 50, y: 50 },
];
let dx = 10;
let dy = 0;

// Create the canvas
function createCanvas() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Move the snake
function moveSnake() {
  let head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}

//change direction of the snake
function changeDirection(direction) {
  if (direction == 'up' && dy == 0) {
    dx = 0;
    dy = -10;
    moveSnake();
  }

  if (direction == 'down' && dy == 0) {
    dx = 0;
    dy = 10;
    moveSnake();
  }

  if (direction == 'left' && dx == 0) {
    dx = -10;
    dy = 0;
    moveSnake();
  }

  if (direction == 'right' && dx == 0) {
    dx = 10;
    dy = 0;
    moveSnake();
  }
}

// Draw a part of the snake
function drawSnakePart(snakePart) {
  ctx.fillStyle = 'lightgreen';
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeStyle = 'darkgreen';
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// Draw all the snake
function drawSnake() {
  snake.forEach(drawSnakePart);
}

// Interval Function
setInterval(() => {
  ctx.clearRect(0, 0, 500, 500);
  createCanvas();
  moveSnake();
  drawSnake();
}, 100);
