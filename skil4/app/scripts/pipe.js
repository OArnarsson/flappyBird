window.Pipe = ((() => {
  let gap;
  let topHeight;
  let pipeWidth;
  let playField;

  class Pipe extends window.Parallax {

    constructor(el, game, speed, name) {
      super(el, game, speed, name);
      pipeWidth = this.game.width / 5;
      playField = (this.game.height - this.game.groundHeight);
      gap = Math.floor((Math.random() * 45) + 200); //105
      this.reset();
    }

    reset() {
      switch (this.name) {
        case 'TopPipe':
          this.pos.x = this.game.width + 50;
          this.width = pipeWidth;
          this.height = Math.floor((Math.random() * (playField / 2)));
          this.el.width(this.width);
          this.el.height(this.height);

          topHeight = this.height;
          this.el.css("top", 0);
          break;
        case 'BottomPipe':
          this.pos.x = this.game.width + 50;
          this.width = pipeWidth;
          this.height = (playField - topHeight - 200);
          this.el.width(this.width);
          this.el.height(this.height);

          this.el.css("bottom", `${this.game.groundHeight}px`);
          break;
      }
    }

    update() {
      this.pos.x -= this.speed;
      switch (this.name) {
        case 'TopPipe':
          if (pipeWidth + this.pos.x < 0) {
            this.pos.x = this.game.width;
            this.height = Math.floor((Math.random() * (playField / 2)));
            topHeight = this.height;
            this.el.height(this.height);
          }
          break;
        case 'BottomPipe':
          if (pipeWidth + this.pos.x < 0) {
            this.pos.x = this.game.width;
            if (gap > 100) {
              gap = gap * 0.99;
            } else {
              gap = Math.floor((Math.random() * 45) + 200); //105
            }
            this.height = (playField - topHeight - gap);
            this.el.height(this.height);
          }
          break;
      }
      this.speed = this.speed += 0.0001;
      this.el.css({ "transform": `translate3d(${this.pos.x}px, 0px, 0px)` });
    }

  }

  return Pipe;
}))();