window.Player = (function () {
    'use strict';

    var Controls = window.Controls;

    // All these constants are in em's, multiply by 10 pixels
    // for 1024x576px canvas.
    var SPEED = 30; // * 10 pixels per second
    var WIDTH = 5;
    var HEIGHT = 5;
    var INITIAL_POSITION_X = 0.3;
    var INITIAL_POSITION_Y = 0.35;
    var MAXSPEED = 1.2; // 1.2
    var flapSound = new Audio('../sounds/flap.wav');
    var deadSound = new Audio('../sounds/gameOver.wav');
    flapSound.preload = 'auto';
    flapSound.load();
    deadSound.preload = 'auto';
    deadSound.load();

    var Player = function (el, game) {
        this.el = el;
        this.game = game;
        this.pos = { x: INITIAL_POSITION_X, y: 0 };
        this.gravity = 0.024; //0.024
        this.power = 0.85; //0.85
        if (this.game.debug) {
            this.gravity = 0;
            this.power = 0;
        }
        this.velocity = 0;
        this.el.css("left", INITIAL_POSITION_X * 100 + '%');
        this.el.css("top", INITIAL_POSITION_Y * 100 + '%');
        this.givingScore = false;
    };

    /**
     * Resets the state of the player for a new game.
     */
    Player.prototype.reset = function () {
        this.pos.x = 0;
        this.pos.y = 0;
        this.velocity = 0;
        this.el.css("top", INITIAL_POSITION_Y * 100 + '%');
        this.el.css('transform', 'translate3d(0,' + this.pos.y + 'px, 0) rotate(' + this.velocity * 20 + 'deg)');
    };


    Player.prototype.onFrame = function (delta) {
        this.velocity += this.gravity;
        //this.velocity += 0;
        this.pos.y += this.velocity * 11;

        if (this.velocity > MAXSPEED) {
            this.velocity = MAXSPEED;
        } else if (this.velocity < -MAXSPEED * .75) {
            this.velocity = -MAXSPEED * .75;
        }

        if (Controls.didJump() == true) {
            this.flap();
        }
        if (!this.game.debug && this.game.playMode !== 'easterTank') {
            this.checkCollision();
        }
        this.checkScore();

        // Update UI
        if (this.velocity <= 0) {
            this.uiAnimation('up');
        } else {
            this.uiAnimation('down');
        }
        if (this.game.playMode === 'easterTank') {
            if (this.pos.y >= 0.434 * this.game.height) {
                this.pos.y = 0.434 * this.game.height;
                this.velocity = 0;
            }
        }
        this.el.css('transform', 'translate3d(0,' + this.pos.y + 'px, 0) rotate(' + this.velocity * 20 + 'deg)');

    };

    Player.prototype.flap = function () {
        this.velocity -= this.power;
        var newFlap = flapSound.cloneNode()
        newFlap.volume = this.game.volume;
        newFlap.play();
    }

    Player.prototype.checkScore = function () {
        if (this.givingScore) {
            if (this.game.topPipe.pos.x + this.game.topPipe.width <= this.game.width * INITIAL_POSITION_X) {
                this.givingScore = false;
                this.game.score += 1;
            }
        }

        if (this.game.topPipe.pos.x - this.game.topPipe.width > this.game.width * INITIAL_POSITION_X) {
            this.givingScore = true;
        }
    }

    Player.prototype.checkCollision = function () {
        if (this.el.position().top + 100 < 0 ||
            this.el.position().top + this.el.height() > (this.game.height - this.game.groundHeight)) {
            deadSound.volume = this.game.volume / 2;
            deadSound.play();
            return this.game.gameover();
        }
        else {
            var circle = {
                x: this.el.position().left + this.el.width() / 2,
                y: this.el.position().top + this.el.height() / 2,
                r: 22
            };
            var rectTop = {
                x: this.game.topPipe.el.position().left,
                y: this.game.topPipe.el.position().top,
                w: this.game.topPipe.el.width(),
                h: this.game.topPipe.el.height()
            };
            var rectBottom = {
                x: this.game.bottomPipe.el.position().left,
                y: this.game.bottomPipe.el.position().top,
                w: this.game.bottomPipe.el.width(),
                h: this.game.bottomPipe.el.height()
            };
            if (this.pipeCollision(circle, rectTop) || this.pipeCollision(circle, rectBottom)) {
                deadSound.volume = this.game.volume / 2;
                deadSound.play();
                return this.game.gameover();
            }
        }
    }

    Player.prototype.pipeCollision = function (circle, rect) {
        var distX = Math.abs(circle.x - rect.x - rect.w / 2);
        var distY = Math.abs(circle.y - rect.y - rect.h / 2);

        if (distX > (rect.w / 2 + circle.r)) {
            return false;
        }
        if (distY > (rect.h / 2 + circle.r)) {
            return false;
        }

        if (distX <= (rect.w / 2)) {
            return true;
        }
        if (distY <= (rect.h / 2)) {
            return true;
        }

        var dx = distX - rect.w / 2;
        var dy = distY - rect.h / 2;
        return (dx * dx + dy * dy <= (circle.r * circle.r));
    }

    Player.prototype.uiAnimation = function (direction) {
        if (direction == 'up') {
            if (this.game.playMode === 'easter') {
                this.el.addClass('easterBird');
                return;
            }
            if (this.game.playMode === 'easterTank') {
                this.el.addClass('easterTank');
                return;
            }
            else {
                this.el.addClass('moveBird');
                return;
            }

        } else {
            this.el.removeClass('moveBird');
        }
    }

    return Player;
})();
