 

window.Score = ((() => {

    class Score {
         constructor(el, game, name) {
      this.el = el;
      this.game = game;
      this.name = name;
      this.reset();
    }

    reset() {
      switch (this.name) {
        case 'Score':
          this.el.text(this.game.score);
          break;
        case 'hiScore':
          const score = localStorage.getItem("hiScore") || 0;
          this.game.hiScore = score;
          this.el.text(`Highscore: ${score}`);
          break;
        case 'currScore':
          this.el.text(`Score: ${this.game.score}`);
          break;
      }
    }

    update() {
      console.log(this.game.score)
      switch (this.name) {
        case 'Score':
          this.el.text(this.game.score);
          return;
          break;
        case 'hiScore':
          this.el.text(`Best: ${this.game.hiScore}`);
          return;
          break;
        case 'currScore':
          this.el.text(`Score: ${this.game.score}`);
          return;
          break;
      }
    }
    }
    return Score;
}))();