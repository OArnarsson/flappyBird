window.Game = (function () {
    'use strict';


    /**
     * Main game class.
     * @param {Element} el jQuery element containing the game.
     * @constructor
     */
    var Game = function (el) {
        this.baseSpeed = 3.2
        this.el = el;
        this.width = 0;
        this.height = 0;
        this.setGameSize();
        this.groundHeight = 80;
        this.score = 0;
        this.hiScore = 0;
        this.volume = 1;
        this.player = new window.Player(this.el.find('.Player'), this);
        this.clouds = new window.Parallax(this.el.find('.Clouds'), this, 0.5, 'Cloud');
        this.city = new window.Parallax(this.el.find('.City'), this, 0.15, 'City');
        this.ground = new window.Parallax(this.el.find('.Ground'), this, this.baseSpeed, 'Ground');
        this.scoreDisplay = new window.Parallax(this.el.find('.Score'), this, 0, 'Score');
        this.hiScoreDisplay = new window.Parallax(this.el.find('.hiScore'), this, 0, 'hiScore');
        this.isPlaying = false;
        this.muteButton = this.el.find('.Mute');
        var that = this;
        this.muteButton.click(function () {that.mute()});

        // Cache a bound onFrame since we need it each frame.
        this.onFrame = this.onFrame.bind(this);
    };

    /**
     * Some shared constants.
     */
    Game.prototype.setGameSize = function () {
        var h = window.innerHeight;
        var w = window.innerWidth;

        if (h > 576) {
            w = 414;
            h = 736;
        }
        this.width = w;
        this.height = h;
        this.el.height(h);
        this.el.width(w);
    }

    /**
     * Runs every frame. Calculates a delta and allows each game
     * entity to update itself.
     */
    Game.prototype.onFrame = function () {
        // Check if the game loop should stop.
        if (!this.isPlaying) {
            return;
        }

        // Calculate how long since last frame in seconds.
        var now = +new Date() / 1000,
            delta = now - this.lastFrame;
        this.lastFrame = now;

        // Update game entities.
        this.player.onFrame(delta);
        this.clouds.update();
        this.city.update();
        this.ground.update();
        this.topPipe.update();
        this.bottomPipe.update();
        this.scoreDisplay.update();
        this.hiScoreDisplay.update();

        // Request next frame.
        window.requestAnimationFrame(this.onFrame);
    };

    /**
     * Starts a new game.
     */
    Game.prototype.start = function () {
        this.reset();

        // Restart the onFrame loop
        this.lastFrame = +new Date() / 1000;
        window.requestAnimationFrame(this.onFrame);
        this.isPlaying = true;
    };

    /**
     * Resets the state of the game so a new game can be started.
     */
    Game.prototype.reset = function () {
        this.player.reset();
        if (this.score > this.hiScore) {
            this.hiScore = this.score;
        }
        localStorage.setItem("hiScore", this.hiScore);
        this.score = 0;
        this.topPipe = new window.Parallax(this.el.find('.TopPipe'), this, this.baseSpeed, 'TopPipe');
        this.bottomPipe = new window.Parallax(this.el.find('.BottomPipe'), this, this.baseSpeed, 'BottomPipe');
    };

    /**
     * Signals that the game is over.
     */
    Game.prototype.gameover = function () {
        this.isPlaying = false;

        // Should be refactored into a Scoreboard class.
        var that = this;
        var scoreboardEl = this.el.find('.Scoreboard');
        scoreboardEl
            .addClass('is-visible')
            .find('.Scoreboard-restart')
            .one('click', function () {
                scoreboardEl.removeClass('is-visible');
                that.start();
            });
    };

    Game.prototype.mute = function () {
        console.log('mutebutton');
        if (this.volume == 1) {
            this.volume = 0;
            this.muteButton.css('background', 'url(../images/mute.svg')
        }
        else {
            this.volume = 1;
            this.muteButton.css('background', 'url(../images/volume.svg')
        }
    }


    return Game;
})();


