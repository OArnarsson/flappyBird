let pipes = [];
const MAXSPEED = 13;

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
  distance = 0;
}

// Happens every frame
function draw() {
  background(0);

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

  // Every 121 frames we create a new pipe
  if (frameCount % 121 == 0) {
    pipes.push(new Pipe());
  }
}

// Flap the bird when mouse is pressed
function mousePressed() {
  this.bird.flap();
}