const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart-btn");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left
  [2, 4, 6], // Diagonal from top-right
];

// Handle cell click
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const cellIndex = cell.getAttribute("data-index");
    if (board[cellIndex] === "" && isGameActive) {
      updateCell(cell, cellIndex);
      checkWinner();
    }
  });
});

// Update the cell and board
function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for a winner or a draw
function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${
      currentPlayer === "X" ? "O" : "X"
    } wins! 🎉`;
    isGameActive = false;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a draw! 🤝";
    isGameActive = false;
  }
}

// Restart the game
restartButton.addEventListener("click", restartGame);

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player X's turn`;
  cells.forEach((cell) => (cell.textContent = ""));
}
