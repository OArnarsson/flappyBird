function Pipe() {
  this.gap = random(98,135);
  this.upper = random(height/2);
  this.lower = this.upper+this.gap;
  this.capHeight = 20;
  this.capWidth = 10;
  this.x = width;
  this.width = width/6;
  this.velocity = 2.5;

  console.log("Gap: " + this.gap);

  // Display
  this.show = () => {
    // Big pipes
    fill(color(0, 255, 0));
    rect(this.x, 0, this.width, this.upper); // Top
    rect(this.x, this.lower, this.width, height); // Bottom

    // Pipe hats
    fill(color(0, 210, 0));
    rect(this.x-this.capWidth/2, this.upper-this.capHeight, this.width+this.capWidth, this.capHeight); // Top
    rect(this.x-this.capWidth/2, this.lower, this.width+this.capWidth, this.capHeight); // Bottom

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