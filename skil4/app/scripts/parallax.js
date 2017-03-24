/**
 * Created by Andri on 21.3.2017.
 */
window.Parallax = (function () {
    var gap;
    var topHeight;
    var pipeWidth;
    var playField;

    var Parallax = function (el, game, speed, name) {
        this.el = el;
        this.game = game;
        this.speed = speed;
        this.pos = { x: 0, y: 0 };
        this.name = name;
        this.width = 0;
        this.height = 0;
        this.reset();
        pipeWidth = this.game.width / 5;
        playField = (this.game.height - this.game.groundHeight);
        gap = Math.floor((Math.random() * 45) + this.game.player.el.height()*4); //105
    };

    Parallax.prototype.reset = function () {
        switch (this.name) {
            case 'Cloud':
                this.pos.x = 0;
                this.pos.y = 0;
                this.width = this.game.groundHeight;
                this.height = this.game.groundHeight;
                this.el.width(this.width);
                this.el.height(this.game.groundHeight);
                break;
            case 'City':
                this.pos.x = 0;
                this.pos.y = 0;
                this.el.width(this.game.el.width()*2);
                this.el.height(this.game.groundHeight*8);
                this.width = (this.game.el.width());
                this.height = this.game.groundHeight*8;
                this.el.css("bottom", this.game.groundHeight + 'px');
                break;
            case 'Ground':
                this.pos.x = 0;
                this.pos.y = 0;
                this.el.width(this.game.el.width()*2);
                this.el.height(this.game.groundHeight+(this.game.groundHeight*0.3));
                this.width = this.game.el.width();
                this.height = this.game.groundHeight;
                break;
            case 'TopPipe':
                this.pos.x = this.game.width + 50;
                this.width = pipeWidth;
                this.height = Math.floor((Math.random() * (playField / 2) + 25));
                this.el.width(this.width);
                this.el.height(this.height);
                topHeight = this.height;
                this.el.css("top", 0);
                break;
            case 'BottomPipe':
                this.pos.x = this.game.width + 50;
                this.width = pipeWidth;
                this.height = (playField - topHeight - gap);
                this.el.width(this.width);
                this.el.height(this.height);
                this.el.css("bottom", this.game.groundHeight + 'px');
                break;
            case 'hiScore':
                var score = localStorage.getItem("hiScore") || 0;
                this.game.hiScore = score;
                this.el.text("Highscore: " + score);
                break;
            case 'currScore':
                this.el.text("Score: " + this.game.score);
                break;
        }
    }
    Parallax.prototype.update = function () {
        this.pos.x -= this.speed;

        switch (this.name) {
            case 'Cloud':
                if (this.game.width + this.width + this.pos.x < 0) {
                    this.pos.x = this.width / 2;
                }
                break;
            case 'Ground':
                if(this.pos.x*-1 >this.width){
                    this.pos.x = 0;
                }
                break;
            case 'City':
                if(this.pos.x*-1 >=this.width){
                    this.pos.x = 0;
                }
                break;
            case 'TopPipe':
                if (pipeWidth + this.pos.x < 0) {
                    this.pos.x = this.game.width;
                    this.height = Math.floor((Math.random() * (playField / 2) + 25));
                    topHeight = this.height;
                    this.el.height(this.height);
                }
                break;
            case 'BottomPipe':
                if (pipeWidth + this.pos.x < 0) {
                    this.pos.x = this.game.width;
                    gap = Math.floor((Math.random() * 45) + 105);
                    this.height = (playField - topHeight - gap);
                    this.el.height(this.height);
                }
                break;
            case 'Score':
                this.el.text(this.game.score);
                break;
            case 'hiScore':
                this.el.text("Best: " + this.game.hiScore);
                break;
            case 'currScore':
                this.el.text("Score: " + this.game.score);
                break;
        }
        this.el.css({"transform": "translate3d(" + this.pos.x +"px, 0px, 0px)"});
    }
    return Parallax;
})();