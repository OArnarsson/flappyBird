window.Pipe = ((() => {
  let gap;
  let topHeight;
  let playField;

  class Pipe extends window.Parallax {

    constructor(el, game, speed, width, name) {
      super(el, game, speed, 0, width);
      this.name = name;
      playField = (this.game.height - this.game.groundHeight);
      gap = Math.floor((Math.random() * 45) + 200); //105
      this.reset();
    }

    reset() {
      this.pos.x = this.game.width + 50;
      switch (this.name) {
        case 'TopPipe':
          topHeight = Math.floor((Math.random() * (playField / 2)));
          this.el.height(topHeight);
          this.el.css("top", 0);
          break;
        case 'BottomPipe':
          this.height = (playField - topHeight - 200);
          this.el.height(this.height);
          this.el.css("bottom", `${this.game.groundHeight}px`);
          break;
      }
    }

    update() {
      this.pos.x -= this.speed;
      if (this.el.width() + this.pos.x < 0) {
        this.pos.x = this.game.width;
        if (this.name === 'TopPipe') {
          topHeight = Math.floor((Math.random() * (playField / 2)));
          this.el.height(topHeight);
        }
        else if (this.name === 'BottomPipe') {
          if (gap > 100) {
            gap = gap * 0.97;
          } else {
            gap = Math.floor((Math.random() * 45) + 200); //105
          }
          this.height = (playField - topHeight - gap);
          this.el.height(this.height);
        }
      }

      this.speed = this.speed += 0.0001;
      this.el.css({ "transform": `translate3d(${this.pos.x}px, 0px, 0px)` });
    }
  }

  return Pipe;
}))();