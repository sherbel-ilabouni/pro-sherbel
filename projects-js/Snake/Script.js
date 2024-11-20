function createStars() {
  const starsContainer = document.getElementById("stars");
  const numStars = 100;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = Math.random() * 3 + "px";
    star.style.height = star.style.width;
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 2 + "s";
    starsContainer.appendChild(star);
  }
}

createStars();

const boardSize = 20;
const gameBoard = document.getElementById("game-board");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const startButton = document.getElementById("start-button");

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = generateFood();
let score = 0;
let highScore = 0;
let gameInterval;
let isGameRunning = false;
let speed = 100;

function drawBoard() {
  gameBoard.innerHTML = "";
  snake.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });

  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function generateFood() {
  let newFoodPosition;
  while (!newFoodPosition || isOnSnake(newFoodPosition)) {
    newFoodPosition = {
      x: Math.floor(Math.random() * boardSize) + 1,
      y: Math.floor(Math.random() * boardSize) + 1,
    };
  }
  return newFoodPosition;
}

function isOnSnake(position) {
  return snake.some(
    (segment) => segment.x === position.x && segment.y === position.y
  );
}

function showGameOver() {
  const gameOver = document.createElement("div");
  gameOver.className = "game-over";
  gameOver.innerHTML = `
                <h2>Game Over!</h2>
                <p>Final Score: ${score}</p>
            `;
  gameBoard.appendChild(gameOver);
  setTimeout(() => gameOver.remove(), 2000);
}

function moveSnake() {
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  if (
    newHead.x < 1 ||
    newHead.x > boardSize ||
    newHead.y < 1 ||
    newHead.y > boardSize ||
    isOnSnake(newHead)
  ) {
    showGameOver();
    updateHighScore();
    resetGame();
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    score += 1;
    scoreElement.textContent = score;
    food = generateFood();
  } else {
    snake.pop();
  }
}

function resetGame() {
  clearInterval(gameInterval);
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  food = generateFood();
  score = 0;
  scoreElement.textContent = score;
  startButton.style.display = "block";
  isGameRunning = false;
}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    highScoreElement.textContent = highScore;
  }
}

function update() {
  if (isGameRunning) {
    moveSnake();
    drawBoard();
  }
}

function changeDirection(event) {
  if (!isGameRunning) return;

  const key = event.key;
  switch (key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

function startGame() {
  resetGame();
  direction = { x: 1, y: 0 };
  startButton.style.display = "none";
  isGameRunning = true;
  gameInterval = setInterval(update, speed);
}

function setSpeed(newSpeed) {
  speed = newSpeed;
  if (isGameRunning) {
    clearInterval(gameInterval);
    gameInterval = setInterval(update, speed);
  }
}

window.addEventListener("keydown", changeDirection);
