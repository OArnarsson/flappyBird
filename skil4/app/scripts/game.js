
window.Game = (function() {
	'use strict';



	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.clouds = new window.Parallax(this.el.find('.Clouds'), this, 0.1, 'Cloud');
        this.city = new window.Parallax(this.el.find('.City'), this, 0.1, 'City');
        this.ground = new window.Parallax(this.el.find('.Ground'), this, 0.5, 'Ground');
		this.isPlaying = false;
		this.pipes;
		this.score = 0;
		this.width = 0;
		this.height = 0;
		this.setGameSize();

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

    /**
     * Some shared constants.
     */
    Game.prototype.setGameSize = function () {
      var h = window.innerHeight;
      var w = window.innerWidth;

      if(h > 576){
          h = 576;
          w = 1024;
      }
        this.height = h;
        this.width = w;
      console.log(this.el);
      this.el.height(h);
      this.el.width(w);
    }

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
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

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.score = 0;
		this.pipes = setInterval(function () {console.log('laying pipe')}, 1000);
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;
		clearInterval(this.pipes);

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};



	return Game;
})();


