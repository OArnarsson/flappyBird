let pipes = [];
let floppyFont;
const MAXSPEED = 13;

// Load assets before starting game
function preload() {
  floppyFont = loadFont("./fonts/04B_19__.ttf");
}

// Initialization
function setup() {
  createCanvas(400, 600);
  noStroke();
  bird = new Bird();
  bird.rotateToDirection = true;
  pipes.push(new Pipe());
  distance = 0;
}

// Happens every frame
function draw() {
  background(33);

  // Update bird location and velocity
  this.bird.update();
  this.bird.show();
  this.distance += 0.1;

  // Loop through all pipes to update location
  for (let pipe of pipes) {
    pipe.show();
    pipe.update();

    // Delete pipe if we cannot see it
    if (!pipe.onScreen()) {
      pipes.splice(pipes.indexOf(pipe), 1);
    }
  }

  // Every 140 frames we create a new pipe
  if (frameCount % 140 == 0) {
    pipes.push(new Pipe());
  }

  // Draws the score
  textSize(36);
  textFont(floppyFont);
  fill(255);
  text(Math.floor(this.distance), 20, 40);
}

// Flap the bird when mouse is pressed
function mousePressed() {
  this.bird.flap();
}