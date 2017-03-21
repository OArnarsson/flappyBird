window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var MAXSPEED = 0.85;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: INITIAL_POSITION_X, y: 0 };
		this.gravity = 0.024;
		this.power = 0.80;
  	this.velocity = 0;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.velocity = 0;
	};


	Player.prototype.onFrame = function(delta) {
		this.velocity += this.gravity;
    this.pos.y += this.velocity*0.95;

		if (this.velocity > MAXSPEED) {
      this.velocity = MAXSPEED;
    } else if (this.velocity < -MAXSPEED) {
      this.velocity = -MAXSPEED;
    }

		if (Controls.didJump() == true) {
			console.log(this.velocity);
			console.log(this.power);
			this.velocity -= this.power;
		}


		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + this.velocity*20 + 'deg)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		//if (this.pos.x < 0 ||
		//	this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
		//	this.pos.y < 0 ||
		//	this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
		//	return this.game.gameover();
		//}
	};

	return Player;

})();
