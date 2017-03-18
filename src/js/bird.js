function Bird() {
  this.y = height/2;
  this.x = 128;
  this.gravity = 0.35;
  this.jump = 9;
  this.velocity = 0;

  // Display
  this.show = () => {
    fill(color(255,255,0));
    ellipse(this.x, this.y, 48, 48);
    fill(255);
    ellipse(this.x+8, this.y-10, 14, 14);
    fill(0);
    ellipse(this.x+10, this.y-11, 6, 6);
    fill(color(225,0,0));
    triangle(this.x+23, this.y, this.x+33, this.y+3, this.x+23, this.y-7);
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
      this.die();
    } else if (this.y < 0) {
      this.die();
      this.velocity = 0;
    }
  }

  this.die = () => {
    noLoop();
  }
}