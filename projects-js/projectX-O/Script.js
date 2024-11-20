// הקוד JavaScript נשאר זהה
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
let currentPlayer = "X";
let gameActive = false;
let gameState = ["", "", "", "", "", "", "", "", ""];
let playerXName = "";
let playerOName = "";

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  playerXName = document.getElementById("playerX").value || "שחקן X";
  playerOName = document.getElementById("playerO").value || "שחקן O";
  if (!playerXName || !playerOName) {
    alert("אנא מלאו שמות לשני השחקנים!");
    return;
  }
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  board.style.display = "grid";
  message.innerText = `תורו של ${
    currentPlayer === "X" ? playerXName : playerOName
  }`;
  cells.forEach((cell) => (cell.innerText = ""));
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedIndex = parseInt(clickedCell.getAttribute("data-index"));

  if (gameState[clickedIndex] !== "" || !gameActive) return;

  gameState[clickedIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;

  if (checkWinner()) {
    message.innerText = `הניצחון של ${
      currentPlayer === "X" ? playerXName : playerOName
    }!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    message.innerText = "תיקו!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.innerText = `תורו של ${
    currentPlayer === "X" ? playerXName : playerOName
  }`;
}

function checkWinner() {
  return winningConditions.some((condition) => {
    const [a, b, c] = condition;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = false;
  board.style.display = "none";
  message.innerText = "";
  document.getElementById("playerX").value = "";
  document.getElementById("playerO").value = "";
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
