window.Game = (function () {
    'use strict';
    var bgSound = new Audio('../sounds/bGroundMusic.mp3');
    bgSound.preload = 'auto';
    bgSound.volume = 1;
    bgSound.loop = true;
    var newHiScore = new Audio('../sounds/whattaMan.mp3');
    newHiScore.preload = 'auto';
    newHiScore.volume = 1;
    bgSound.loop = false;


    /**
     * Main game class.
     * @param {Element} el jQuery element containing the game.
     * @constructor
     */
    var Game = function (el) {
        this.debug = false;
        this.baseSpeed = 3.2
        this.el = el;
        this.width = 0;
        this.height = 0;
        this.setGameSize();
        this.score = 0;
        this.hiScore = 0;
        this.volume = 1;
        this.player = new window.Player(this.el.find('.Player'), this);
        this.clouds = new window.Parallax(this.el.find('.Clouds'), this, this.baseSpeed * 0.02083, 'Cloud');
        this.city = new window.Parallax(this.el.find('.City'), this, this.baseSpeed * 0.0625, 'City');
        this.ground = new window.Parallax(this.el.find('.Ground'), this, this.baseSpeed, 'Ground');
        this.scoreDisplay = new window.Parallax(this.el.find('.Score'), this, 0, 'Score');
        this.hiScoreDisplay = new window.Parallax(this.el.find('.hiScore'), this, 0, 'hiScore');
        this.currScore = new window.Parallax(this.el.find('.currScore'), this, 0, 'currScore');
        this.topPipe = new window.Parallax(this.el.find('.TopPipe'), this, this.baseSpeed, 'TopPipe');
        this.bottomPipe = new window.Parallax(this.el.find('.BottomPipe'), this, this.baseSpeed, 'BottomPipe');
        this.isPlaying = false;
        this.muteButton = this.el.find('.Mute');
        this.muteButton.click(function () {
            that.mute()
        });
        var that = this;

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
        this.groundHeight = h * 0.11;
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
        this.currScore.update();

        // Request next frame.
        window.requestAnimationFrame(this.onFrame);
    };


    /**
     * Starts a new game.
     */
    Game.prototype.start = function () {
        bgSound.play();
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
        this.topPipe.reset();
        this.bottomPipe.reset();
        this.player.reset();
        this.score = 0;
        var scoreboardEl = this.el.find('.Scoreboard');
        scoreboardEl.removeClass('is-visible');
    };

    /**
     * Signals that the game is over.
     */
    Game.prototype.gameover = function () {
        this.isPlaying = false;
        if (this.score > this.hiScore) {
            this.hiScore = this.score;
        }
        localStorage.setItem("hiScore", "0");
        this.topPipe.reset();
        this.bottomPipe.reset();


        // Should be refactored into a Scoreboard class.
        var scoreboardEl = this.el.find('.Scoreboard');
        var trophy = this.el.find('.medal');
        trophy
            .removeClass('goldTrophy')
            .removeClass('silverTrophy')
            .removeClass('bronzeTrophy')
            .removeClass('amatureTrophy');
        trophy.addClass(this.getTrophy());
        var that = this;
        scoreboardEl
            .addClass('is-visible')
            .find('.Scoreboard-restart')
            .one('click', function () {
                scoreboardEl.removeClass('is-visible');
                that.start();
            });
        if (this.getTrophy() === 'goldTrophy' && this.volume > 0) {
            console.log('im here!');
            $(bgSound).animate({volume: 0}, 1500);
            newHiScore.play();
            $(newHiScore).animate({volume: 1}, 1000);
            var that = this;
            setTimeout(function () {
                $(newHiScore).animate({volume: 0}, 3000);
                if (that.volume > 0) {
                    setTimeout(function () {
                        $(bgSound).animate({volume: 1}, 1500);
                    }, 3000);
                }
            }, 15000);
        }
    };

    Game.prototype.getTrophy = function () {
        console.log("score :" + this.score + ", hiscore :" + this.hiScore)
        if (this.score >= this.hiScore * 0.9) {
            return 'goldTrophy';
        }
        if (this.score >= this.hiScore * 0.66) {
            console.log('im here2!!');
            return 'silverTrophy';
        }
        if (this.score >= this.hiScore * 0.5) {
            console.log('im here3!!');
            return 'bronzeTrophy';
        }
        console.log('im here4!!');
        return 'amatureTrophy';
    }

    Game.prototype.mute = function () {
        if (this.volume == 1) {
            this.volume = 0;
            bgSound.volume = 0;
            this.muteButton.css('background', 'url(../images/mute.svg')
        }
        else {
            this.volume = 1;
            bgSound.volume = 1;
            this.muteButton.css('background', 'url(../images/volume.svg')
        }
        newHiScore.volume = 0;
    }


    return Game;
})();


