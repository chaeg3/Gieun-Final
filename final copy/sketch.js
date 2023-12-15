// maze
var cols, rows;
var w = 50;
var grid = [];

var current;

var stack = [];

// character
var xMain = 0;
var yMain = 0;
var speedR = 1.5;

// random object
var randomCake;

// score/level/reset
var score = 0;
var level = 1;

// timer
var timer = 30;

var gameOverFlag = false;

// Oscillator setup
var osc;
var frequency = 440;
var playing = false;

function preload(){
  imgR = loadImage("assets/redHood.png")
  imgC = loadImage("assets/cake.png")
}

function setup() {
  createCanvas(400, 400);

  cols = floor(width/w);
  rows = floor(height/w);

  // creates the columns and rows(in this case 10x10)
  for(var j = 0; j < rows; j++){
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i,j);
      grid.push(cell);
    }
  }

  current = grid[0];

  // Create the randomly generated object
  randomCake = new RandomCake();
  initialTimer = frameCount;
  textAlign(CENTER, CENTER);

  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(frequency);
  osc.amp(0);
  osc.start();
}

function draw() {
  background(50);

  if (!gameOverFlag) {
  for (var i = 0; i < grid.length; i++){
    grid[i].show();
    // ellipse(grid[i].x + 20, grid.y + 20, 20);
  }

  current.visited = true;
  current.highlight();

   // STEP 1
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;

   // STEP 2
    stack.push(current);

   // STEP 3
    removeWalls(current, next);

   // STEP 4
    current = next;

  }else if (stack.length > 0){
    current = stack.pop();
  }

  if (keyIsPressed) {
    if (!playing) {
      // var freqX = map(xMain, 0, width, 100, 500)
      var freqY = map(yMain, 0, height, 100, 500)
      osc.start();
      // osc.freq(freqX);
      osc.freq(freqY)
      // osc.freq(constrain(xMain / width), 200, 600)
      // osc.freq(constrain(yMain / width), 200, 600)
      osc.amp(0.5, 0.1);
      // osc.amp(0, 0.1, 0.5);
      playing = true;
    }
  } else {
    osc.amp(0, 0.5); // If the down key is not pressed, set amplitude to 0
    playing = false;
  }

  stroke(255);
  line(0, 0, 0, 400);
  line(0, 0, 400, 0);
  line(400, 0, 400, 400);
  line(0, 400, 400, 400);

  //   Main Character Image
  image(imgR, xMain, yMain, 45, 45);

  randomCake.display();

  characterMovement();

  checkCollision();

  // level counter
  fill(255);
  textSize(16);
  text("Level: " + level, 35, height - 10)

  // score counter
  fill(255);
  textSize(16);
  text("Score: " + score, 350, height - 10)

  // timer
  if (frameCount % 60 == 0 && timer > 0){
    timer --;
  }
  text("Timer: " + timer, 200, height - 10);
  if (timer === 0){
    gameOverFlag = true;
  }
} else {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over :(", width / 2, height / 2 - 20);
  textSize(16);
  text("Click to Restart", width / 2, height / 2 + 20);
}
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1){
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b){
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  }else if (x === -1){
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  }else if (y === -1){
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function checkCollision() {
  let characterCenterX = xMain + (w/2);
  let characterCenterY = yMain + (w/2);
  let cakeCenterX = randomCake.x + randomCake.size / 2;
  let cakeCenterY = randomCake.y + randomCake.size / 2;

  let distance = dist(characterCenterX, characterCenterY, cakeCenterX, cakeCenterY);

  if (distance < 50) {
    score++;
    if(score % 3 === 0){
      resetGame();
    } else {
      initialReset();
    }
  }
}

function mouseClicked(){
  if (gameOverFlag) {
    gameOver();
  }
}

class RandomCake {
  constructor() {
    this.size = 45;
    this.respawn();
  }

  display() {
    image(imgC, this.x, this.y, this.size, this.size);
  }

  respawn() {
    this.x = floor(random(cols)) * w + 5;
    this.y = floor(random(rows)) * w + 5;
  }
}
