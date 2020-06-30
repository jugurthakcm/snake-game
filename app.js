const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let snake = [
  { x: 130, y: 50 },
  { x: 110, y: 50 },
  { x: 90, y: 50 },
  { x: 70, y: 50 },
  { x: 50, y: 50 },
];
let dx = 20;
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
document.onkeydown = changeDirection;
function changeDirection(direction) {
  // Press arrow key UP
  if (direction.keyCode == '38' && dy == 0) {
    dx = 0;
    dy = -20;
    moveSnake();
  }

  // Press arrow key DOWN
  if (direction.keyCode == '40' && dy == 0) {
    dx = 0;
    dy = 20;
    moveSnake();
  }

  // Press arrow key LEFT
  if (direction.keyCode == '37' && dx == 0) {
    dx = -20;
    dy = 0;
    moveSnake();
  }

  // Press arrow key RIGHT
  if (direction.keyCode == '39' && dx == 0) {
    dx = 20;
    dy = 0;
    moveSnake();
  }
}

// Draw a part of the snake
function drawSnakePart(snakePart) {
  ctx.fillStyle = 'lightgreen';
  ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
  ctx.strokeStyle = 'darkgreen';
  ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

// Draw all the snake
function drawSnake() {
  snake.forEach(drawSnakePart);
}

// Interval Function
setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createCanvas();
  moveSnake();
  drawSnake();
}, 100);
