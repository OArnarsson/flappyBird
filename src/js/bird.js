function Bird() {
  this.y = height/2;
  this.x = 64;
  this.gravity = 0.35;
  this.jump = 9;
  this.velocity = 0;

  // Display
  this.show = () => {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  }

  // Happens on mouse click
  this.flap = () => {
    this.velocity -= this.jump;
  }

  // Happens every frame
  this.update = () => {
    // Updates the speed
    this.velocity += this.gravity;
    this.y += this.velocity*0.95;

    // Caps the speed to +-MAXSPEED
    if (this.velocity > MAXSPEED) {
      this.velocity = MAXSPEED;
    } else if (this.velocity < -MAXSPEED) {
      this.velocity = -MAXSPEED;
    }

    // Stops the bird where it died
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
      console.log(Math.floor(distance));
    } else if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}