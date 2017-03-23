window.Player = (function () {
    'use strict';

    var Controls = window.Controls;

    // All these constants are in em's, multiply by 10 pixels
    // for 1024x576px canvas.
    var SPEED = 30; // * 10 pixels per second
    var WIDTH = 5;
    var HEIGHT = 5;
    var INITIAL_POSITION_X = 0.3;
    var INITIAL_POSITION_Y = 35;
    var MAXSPEED = 0.85;
    var volume = 1;
    var flapSound = new Audio('../sounds/flap.wav');
    var deadSound = new Audio('../sounds/gameOver.wav');
    flapSound.volume = volume;
    flapSound.preload = 'auto';
    flapSound.load();
    deadSound.volume = volume;
    deadSound.preload = 'auto';
    deadSound.load();

    var Player = function (el, game) {
        this.el = el;
        this.game = game;
        this.pos = { x: INITIAL_POSITION_X, y: 0 };
        this.gravity = 0.024;
        this.power = 0.80;
        this.velocity = 0;
        this.el.css("left", INITIAL_POSITION_X * 100 + '%');
        this.el.css("top", INITIAL_POSITION_Y + '%');
        this.givingScore = false;
    };

    /**
     * Resets the state of the player for a new game.
     */
    Player.prototype.reset = function () {
        this.pos.x = 0;
        this.pos.y = 0;
        this.velocity = 0;
        this.el.css("top", INITIAL_POSITION_Y + '%');
        this.el.css('transform', 'translateY(' + this.pos.y + 'em) rotate(' + this.velocity * 20 + 'deg)');
        flapSound.volume = volume;
        deadSound.volume = volume;
    };


    Player.prototype.onFrame = function (delta) {
        this.velocity += this.gravity;
        //this.velocity += 0;
        this.pos.y += this.velocity * 10;

        if (this.velocity > MAXSPEED) {
            this.velocity = MAXSPEED;
        } else if (this.velocity < -MAXSPEED) {
            this.velocity = -MAXSPEED;
        }

        if (Controls.didJump() == true) {
            this.flap();
        }

        this.checkCollision();
        this.checkScore();

        // Update UI
        this.el.css('transform', 'translateY(' + this.pos.y + 'px) rotate(' + this.velocity * 20 + 'deg)');

    };

    Player.prototype.flap = function () {
        this.velocity -= this.power;
        flapSound.cloneNode().play();
    }

    Player.prototype.checkScore = function () {
        if (this.givingScore) {
            if (this.game.topPipe.pos.x + this.game.topPipe.width <= this.game.width * INITIAL_POSITION_X) {
                this.givingScore = false;
                this.game.score += 1;
            }
        }

        if (this.game.topPipe.pos.x-this.game.topPipe.width > this.game.width * INITIAL_POSITION_X) {
            this.givingScore = true;
        }
    }

    Player.prototype.checkCollision = function () {
        if (this.game.topPipe.pos.x - (this.game.topPipe.width / 2) <= this.game.width * INITIAL_POSITION_X && this.game.topPipe.pos.x + (this.game.topPipe.width) > this.game.width * INITIAL_POSITION_X) {
            if (this.pos.y + this.game.height * 0.35 <= this.game.topPipe.height || this.pos.y + this.game.height * 0.35 + 50 >= this.game.bottomPipe.el.position().top) {
                deadSound.play();
                return this.game.gameover();
            }
        }
        if (this.el.position().top-10 < 0 ||
            this.el.position().top + this.el.height()+10 > (this.game.height - this.game.groundHeight)) {
            deadSound.play();
            return this.game.gameover();
        }
    }

    return Player;
})();
