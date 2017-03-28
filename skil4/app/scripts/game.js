window.Game = (function () {
    'use strict';
    var bgSound = new Audio('../sounds/bGroundMusic.mp3');
    bgSound.preload = 'auto';
    bgSound.volume = 1;
    bgSound.loop = true;
    var newHiScore = new Audio('../sounds/whattaMan.mp3');
    newHiScore.preload = 'auto';
    newHiScore.volume = 0;
    newHiScore.loop = true;
    var secretCode = [];


    /**
     * Main game class.
     * @param {Element} el jQuery element containing the game.
     * @constructor
     */
    var Game = function (el) {
        this.debug = true;
        this.baseSpeed = 3.2
        this.el = el;
        this.width = 0;
        this.height = 0;
        this.groundHeight = 0;
        this.setGameSize();
        this.score = 0;
        this.hiScore = 0;
        this.volume = 1;


        this.player = new window.Player(this.el.find('.Player'), this);
        this.clouds = new window.Parallax(this.el.find('.Clouds'), this, this.baseSpeed * 0.02083, this.height, this.width*2);
        this.city = new window.Parallax(this.el.find('.City'), this, this.baseSpeed * 0.0625, this.groundHeight * 8, this.width*2);
        this.ground = new window.Parallax(this.el.find('.Ground'), this, this.baseSpeed, this.groundHeight * 1.3, this.width*2);
        this.city.el.css("bottom", `${this.groundHeight}px`);
        //this.scoreDisplay = new window.Parallax(this.el.find('.Score'), this, 0, 'Score');
        //this.hiScoreDisplay = new window.Parallax(this.el.find('.hiScore'), this, 0, 'hiScore');
        //this.currScore = new window.Parallax(this.el.find('.currScore'), this, 0, 'currScore');
        //this.topPipe = new window.Parallax(this.el.find('.TopPipe'), this, this.baseSpeed, 'TopPipe');
        //this.bottomPipe = new window.Parallax(this.el.find('.BottomPipe'), this, this.baseSpeed, 'BottomPipe');
        this.playMode = "normal";
        this.isPlaying = false;
        this.muteButton = this.el.find('.Mute');
        this.muteButton.click(function () {
            that.mute()
        });
        var that = this;
        this.easterEgg();

        // Cache a bound onFrame since we need it each frame.
        this.onFrame = this.onFrame.bind(this);
    };


    /**
     * Some shared constants.
     */
    Game.prototype.setGameSize = function () {
        var h = window.innerHeight;
        var w = window.innerWidth;
        if (h > 629) {
            w = 414;
            h = 736;
        } else {
            this.el.addClass('mobile');
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
        //this.topPipe.update();
        //this.bottomPipe.update();
        //this.scoreDisplay.update();
        //this.hiScoreDisplay.update();
        //this.currScore.update();

        // Request next frame.
        window.requestAnimationFrame(this.onFrame);
    };


    /**
     * Starts a new game.
     */
    Game.prototype.start = function () {
        bgSound.play();
        newHiScore.play();
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
        //this.topPipe.reset();
        //this.bottomPipe.reset();
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
        localStorage.setItem("hiScore", this.hiScore);
        //this.topPipe.reset();
        //this.bottomPipe.reset();


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
                that.resetEasterEgg();
                that.start();
            });
        this.playHighscore();
    };

    Game.prototype.playHighscore = function () {
        if (this.getTrophy() === 'goldTrophy' && this.volume > 0 && this.hiScore >= 10) {
            $(bgSound).animate({ volume: 0 }, 1500);
            newHiScore.currentTime = 0;
            $(newHiScore).animate({ volume: 1 }, 1000);
            var that = this;
            setTimeout(function () {
                $(newHiScore).animate({ volume: 0 }, 3000);
                if (that.volume > 0) {
                    setTimeout(function () {
                        $(bgSound).animate({ volume: 1 }, 1500);
                    }, 3000);
                }
            }, 15000);
        }
    }

    Game.prototype.getTrophy = function () {
        if (this.score >= 10) {
            return 'goldTrophy';
        }
        if (this.score >= 7) {
            return 'silverTrophy';
        }
        if (this.score >= 3) {
            return 'bronzeTrophy';
        }
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

    Game.prototype.easterEgg = function () {
        var that = this;
        $(window).on('keydown', function (ev) {
            secretCode.push(ev.keyCode);
            if (ev.keyCode === 80) {
                secretCode = [];
            }
            console.log("mode:" + that.playMode);
            if (secretCode.length >= 6 && !that.isPlaying) {
                if (secretCode[0] == 69 && secretCode[1] == 65 && secretCode[2] == 83 && secretCode[3] == 84 && secretCode[4] == 69 && secretCode[5] == 82) {
                    console.log('EASTER TIME');
                    that.playMode = 'easter';
                    bgSound.pause();
                    bgSound = new Audio('../sounds/erika.mp3');
                    bgSound.play();
                } else {
                    secretCode = [];
                }
            }
        });
    }

    Game.prototype.resetEasterEgg = function () {
        if (this.playMode === 'normal') {
            return;
        }
        this.player.el.removeClass('easterBird');
        this.playMode = 'easterTank';
        var that = this;
        setTimeout(function(){
            that.score=0;
            bgSound.currentTime = 0;
            bgSound.play();
            that.gameover();
        }, 135000);
    }

    return Game;
})();


