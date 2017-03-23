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
        gap = Math.floor((Math.random() * 45) + 105);
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
                this.width = 825;
                this.height = 400;
                this.el.width(this.width);
                this.el.height(this.height);
                this.el.css("bottom", this.game.groundHeight + 'px');
                break;
            case 'Ground':
                this.pos.x = 0;
                this.pos.y = 0;
                this.width = this.game.width * 2;
                this.el.width(this.game.width * 2);
                this.height = this.game.groundHeight;
                break;
            case 'TopPipe':
                this.pos.x = this.game.width + 50;
                this.pos.y = 0;
                this.width = pipeWidth;
                this.height = Math.floor((Math.random() * (playField / 2)));
                this.el.width(this.width);
                this.el.height(this.height);
                topHeight = this.height;
                this.el.css("top", 0);
                break;
            case 'BottomPipe':
                this.pos.x = this.game.width + 50;
                this.pos.y = 0;
                this.width = pipeWidth;
                this.height = (playField - topHeight - gap);
                this.el.width(this.width);
                this.el.height(this.height);
                this.el.css("bottom", this.game.groundHeight + 'px');
                break;
            case 'hiScore':
                var score = localStorage.getItem("hiScore") || 0;
                console.log('score:'+ score);
                this.game.hiScore = score;
                this.el.text("Highscore: " + score);
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
                this.el.css('background-position-x', this.pos.x + 'px');
                return;
            case 'City':
                if (this.width / 3.4 + this.pos.x < 0) {
                    this.pos.x = 0;
                }
                break;
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
                    gap = Math.floor((Math.random() * 45) + 105);
                    this.height = (playField - topHeight - gap);
                    this.el.height(this.height);
                }
                break;
            case 'Score':
                this.el.text(this.game.score);
                break;
            case 'hiScore':
                this.el.text("Highscore: " + this.game.hiScore);
                break;
        }
        this.el.css({"transform": "translate3d(" + this.pos.x +"px, 0px, 0px)"});
        //this.el.css('transform', 'translateX(' + this.pos.x + 'px)');
    }
    return Parallax;
})();