let score = 0;
let highScore = 0;
let currMoleTile;
let currPiranhaTile;
let gameOver = false;

function restartGame() {
  document.getElementById("score").innerText = "Score: 0";
  highScore = Math.max(highScore, score);
  document.getElementById("highscore").innerText = "High score: " + highScore;
  score = 0;
  gameOver = false;
}

window.onload = function () {
  setGame();
};

function setGame() {
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }
  let restart = document.getElementById("restart");
  restart.addEventListener("click", restartGame);
  setInterval(setMole, 1000);
  setInterval(setPiranha, 2000);
}

function getRandomTile() {
  return Math.floor(Math.random() * 9).toString();
}

function setMole() {
  if (gameOver == true) {
    return;
  }
  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }
  let mole = document.createElement("img");
  mole.src = "./monty-mole.png";
  let num = getRandomTile();
  if (currPiranhaTile && currPiranhaTile.id === num) {
    return;
  }
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
}

function setPiranha() {
  if (gameOver == true) {
    return;
  }
  if (currPiranhaTile) {
    currPiranhaTile.innerHTML = "";
  }
  let piranha = document.createElement("img");
  piranha.src = "./piranha-plant.png";
  let num = getRandomTile();
  if (currMoleTile && currMoleTile.id === num) {
    return;
  }
  currPiranhaTile = document.getElementById(num);
  currPiranhaTile.appendChild(piranha);
}

function selectTile() {
  if (gameOver == true) return;
  if (this == currPiranhaTile) {
    document.getElementById("score").innerText = "GAME OVER: " + score;
    highScore = Math.max(highScore, score);
    gameOver = true;
    score = 0;
  } else if (this == currMoleTile) {
    score = score + 10;
    document.getElementById("score").innerText = "Score: " + score.toString();
  }
}
