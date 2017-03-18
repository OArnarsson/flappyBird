function Pipe() {
  this.gap = random(98,135);
  this.upper = random(height/2);
  this.lower = Math.abs(this.upper+this.gap);
  this.capHeight = 20;
  this.capWidth = 10;
  this.x = width;
  this.width = width/6;
  this.velocity = 2.5;

  console.log("Gap: " + this.gap);

  // Display
  this.show = () => {
    fill(color(0, 255, 0));
    // Top pipe
    rect(this.x, 0, this.width, this.upper);
    // Bottom pipe
    rect(this.x, this.lower, this.width, height);

    fill(color(0, 220, 0));
    rect(this.x-this.capWidth/2, this.upper-this.capHeight, this.width+this.capWidth, this.capHeight);
    rect(this.x-this.capWidth/2, this.lower, this.width+this.capWidth, this.capHeight);

  }

  // Happens every frame
  this.update= () => {
    // Update pipe location
    this.x -= this.velocity;
  }

  // If we can see it, return true
  this.onScreen= () => {
    return this.x > -this.width;
  }
}