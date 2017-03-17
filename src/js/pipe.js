function Pipe() {
  this.upper = random(height/2);
  this.lower = random(height/2);
  this.x = width;
  this.width = width/6;
  this.velocity = 2.5;

  // Display
  this.show = () => {
    fill(222);
    rect(this.x, 0, this.width, this.upper);
    rect(this.x, height-this.lower, this.width, this.lower);
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