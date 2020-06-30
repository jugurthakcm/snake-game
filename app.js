const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let snake = [
  { x: 120, y: 40 },
  { x: 100, y: 40 },
  { x: 80, y: 40 },
  { x: 60, y: 40 },
  { x: 40, y: 40 },
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

//Generate Random Positions for the food
function randomFoodPosition() {
  let num = Math.floor(Math.random() * 600);
  if (num % 20 == 0) {
    return num;
  } else {
    return randomFoodPosition();
  }
}
// The Food Class
class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
// The food object
let food = new Food(randomFoodPosition(), randomFoodPosition());

// Verify if the food is eaten
function foodEaten() {
  if (food.x == snake[0].x && food.y == snake[0].y) {
    food = new Food(randomFoodPosition(), randomFoodPosition());
  }
}

// Draw the food on the canvas
function drawFood(param) {
  ctx.fillStyle = 'red';
  ctx.fillRect(param.x, param.y, 20, 20);
  ctx.strokeStyle = 'darkred';
  ctx.strokeRect(param.x, param.y, 20, 20);
}

// Interval Function
setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createCanvas();
  moveSnake();
  drawSnake();
  foodEaten();
  drawFood(food);
}, 100);
