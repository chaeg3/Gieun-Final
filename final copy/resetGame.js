function resetGame() {
    timer = 30;
    level++;
    randomCake.respawn();
    xMain = 0;
    yMain = 0;
    grid = [];
    stack = [];

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
          var cell = new Cell(i, j);
          grid.push(cell);
        }
    }
  }

function initialReset(){
    timer = 30;
    randomCake.respawn();
    xMain = 0;
    yMain = 0;
}

function gameOver(){
    gameOverFlag = false;
  randomCake.respawn();
  xMain = 0;
  yMain = 0;
  score = 0;
  level = 1;
  timer = 30;
}