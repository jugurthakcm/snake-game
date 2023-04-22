const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let snake = [
  { x: 120, y: 300 },
  { x: 100, y: 300 },
  { x: 80, y: 300 },
  { x: 60, y: 300 },
  { x: 40, y: 300 },
];
let dx = 20;
let dy = 0;
let score = 0;

// Initialize best score
let bestScore = localStorage.getItem("bestScore")
  ? localStorage.getItem("bestScore")
  : 0;

document.getElementById("bestScore-p").innerText = bestScore;

// Create the canvas
function createCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "lightgreen";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "black";
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
  if (direction.keyCode == "38" && dy == 0) {
    dx = 0;
    dy = -20;
  }

  // Press arrow key DOWN
  if (direction.keyCode == "40" && dy == 0) {
    dx = 0;
    dy = 20;
  }

  // Press arrow key LEFT
  if (direction.keyCode == "37" && dx == 0) {
    dx = -20;
    dy = 0;
  }

  // Press arrow key RIGHT
  if (direction.keyCode == "39" && dx == 0) {
    dx = 20;
    dy = 0;
  }
}

// Change direction of the snake using arrows on screen
document.querySelector(".key-up").addEventListener("click", () => {
  if (dy == 0) {
    dx = 0;
    dy = -20;
  }
});
document.querySelector(".key-down").addEventListener("click", () => {
  if (dy == 0) {
    dx = 0;
    dy = 20;
  }
});
document.querySelector(".key-left").addEventListener("click", () => {
  if (dx == 0) {
    dx = -20;
    dy = 0;
  }
});
document.querySelector(".key-right").addEventListener("click", () => {
  if (dx == 0) {
    dx = 20;
    dy = 0;
  }
});

// Draw a part of the snake
function drawSnakePart(snakePart) {
  ctx.fillStyle = "lightblue";
  ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
  ctx.strokeStyle = "darkblue";
  ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

// Draw all the snake
function drawSnake() {
  ctx.fillStyle = "orange";
  ctx.fillRect(snake[0].x, snake[0].y, 20, 20);
  ctx.strokeStyle = "#764100";
  ctx.strokeRect(snake[0].x, snake[0].y, 20, 20);

  for (let i = 1; i < snake.length; i++) {
    drawSnakePart(snake[i]);
  }

  // return snake.forEach(drawSnakePart);
}

//Generate Random Positions for the food
function randomFoodPosition() {
  let num = Math.floor(Math.random() * 500);
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

// Expand the snake if the food is eaten
function foodEaten() {
  snake.forEach((el) => {
    if (food.x == el.x && food.y == el.y) {
      food = new Food(randomFoodPosition(), randomFoodPosition());
      snake.push({
        x: snake[snake.length - 1].x + 20,
        y: snake[snake.length - 1].y + 20,
      });
      score++;
      bestScore = score > bestScore ? score : bestScore;
      document.querySelector("#score-p").innerText = score;
      document.querySelector("#bestScore-p").innerText = bestScore;
    }
  });
}

// Draw the food on the canvas
function drawFood(param) {
  ctx.fillStyle = "red";
  ctx.fillRect(param.x, param.y, 20, 20);
  ctx.strokeStyle = "darkred";
  ctx.strokeRect(param.x, param.y, 20, 20);
}

//check if the snake eats its self
function snakeDie() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      return true;
    }
  }
}

// Game Over
function gameOver() {
  if (
    snake[0].x > 480 ||
    snake[0].y > 480 ||
    snake[0].x < 0 ||
    snake[0].y < 0 ||
    snakeDie()
  ) {
    document.getElementsByClassName("over")[0].style.display = "block";
    document.getElementsByClassName("pop-up")[0].style.display = "flex";
    localStorage.setItem("bestScore", bestScore);
    return true;
  }
}

//Start the game
let startGame = false;

document.addEventListener("keydown", () => {
  startGame = true;
});

document.addEventListener("click", () => {
  startGame = true;
});

let time = 110;
// Interval Function (Game Runner)
let interval = setInterval(() => {
  createCanvas();
  document.getElementsByClassName("over")[0].style.display = "block";
  document.getElementsByClassName("start-game")[0].style.display = "flex";
  if (startGame) {
    document.getElementsByClassName("over")[0].style.display = "none";
    document.getElementsByClassName("start-game")[0].style.display = "none";
    drawFood(food);
    moveSnake();
    drawSnake();
    foodEaten();
    gameOver();
    if (gameOver()) {
      clearInterval(interval);
    }
  } else return;
}, time);

// Restart Game
function restartGame() {
  clearInterval(interval);
  startGame = false;

  score = 0;
  document.querySelector("#score-p").innerText = score;
  snake = [
    { x: 120, y: 300 },
    { x: 100, y: 300 },
    { x: 80, y: 300 },
    { x: 60, y: 300 },
    { x: 40, y: 300 },
  ];
  dx = 20;
  dy = 0;
  food = new Food(randomFoodPosition(), randomFoodPosition());
  document.getElementsByClassName("over")[0].style.display = "none";
  document.getElementsByClassName("pop-up")[0].style.display = "none";
  interval = setInterval(() => {
    createCanvas();
    drawFood(food);
    moveSnake();
    drawSnake();
    foodEaten();
    gameOver();
    if (gameOver()) {
      clearInterval(interval);
    }
  }, time);
}
