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
        pipeWidth = this.game.width / 6;
        playField = this.game.height - this.game.groundHeight;
        // TODO: FIX HEIGHT MESS UP!
        gap = Math.floor((Math.random() * 35) + 100);
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
                this.width = this.game.width * 1.5;
                this.height = this.game.groundHeight;
                this.el.width(this.width);
                this.el.height(this.game.groundHeight);
                this.el.css("bottom", this.game.groundHeight + 'px');
                break;
            case 'Ground':
                this.pos.x = 0;
                this.pos.y = 0;
                this.width = this.game.width * 1.5;
                this.height = this.game.height * 0.25;
                this.el.width(this.width);
                this.el.height(this.game.groundHeight);
                break;
            case 'TopPipe':
                this.pos.x = this.game.width + 50;
                this.pos.y = 0;
                this.width = pipeWidth;
                this.height = Math.floor((Math.random() * (playField / 2)));
                topHeight = this.height;
                this.el.width(this.width);
                this.el.height(this.height);
                this.el.css("top", 0);
            case 'BottomPipe':
                this.pos.x = this.game.width + 50;
                this.pos.y = 0;
                this.width = pipeWidth;
                this.height = playField - topHeight - gap;
                this.el.width(this.width);
                this.el.height(this.height);
                this.el.css("bottom", this.game.groundHeight + 'px');
        }
    }
    Parallax.prototype.update = function () {
        // Check if out of bounds
        this.pos.x -= this.speed;

        switch (this.name) {
            case 'Cloud':
                if (this.game.width + this.width + this.pos.x < 0) {
                    this.pos.x = this.width / 2;
                }
                break;
            case 'Ground':
                if (this.width * 0.25 + this.pos.x < 0) {
                    this.pos.x = 0;
                }
                break;
            case 'City':
                if (this.width * 0.25 + this.pos.x < 0) {
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
                    gap = Math.floor((Math.random() * 35) + 100);
                    this.height = playField - topHeight - gap;
                    this.el.height(this.height);
                    console.log('Gap: ' + gap);
                }
                break;
        }
        this.el.css('transform', 'translateX(' + this.pos.x + 'px)');
    }
    return Parallax;
})();