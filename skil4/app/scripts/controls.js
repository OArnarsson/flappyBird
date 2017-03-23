
window.Controls = (function () {
    'use strict';

    /**
     * Key codes we're interested in.
     */
    var KEYS = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        77: 'mute',
        82: 'reset'
    };

    /**
     * A singleton class which abstracts all player input,
     * should hide complexity of dealing with keyboard, mouse
     * and touch devices.
     * @constructor
     */
    var Controls = function () {
        this._didJump = false;
        this._mute = false;
        this._reset = false;
        this.keys = {};
        $(window)
            .on('keydown', this._onKeyDown.bind(this))
            .on('keyup', this._onKeyUp.bind(this))
            .on('click', this._onClick.bind(this));
    };


    Controls.prototype._onClick = function (e) {
        this._didJump = true;
    }

    Controls.prototype._onKeyDown = function (e) {
        // Only jump if space wasn't pressed.
        if (e.keyCode === 32 && !this.keys.space) {
            this._didJump = true;
        }

        if (e.keyCode === 77 && !this.keys.mute) {
            this._mute = true;
        }

        if (e.keyCode === 82 && !this.keys.reset) {
            this._reset = true;
        }

        // Remember that this button is down.
        if (e.keyCode in KEYS) {
            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = true;
            return false;
        }
    };

    Controls.prototype._onKeyUp = function (e) {
        if (e.keyCode in KEYS) {
            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = false;
            return false;
        }
    };

    /**
     * Only answers true once until a key is pressed again.
     */
    Controls.prototype.didJump = function () {
        var answer = this._didJump;
        this._didJump = false;
        return answer;
    };

    Controls.prototype.reset = function () {
        var answer = this._reset;
        this._reset = false;
        return answer;
    };

    Controls.prototype.mute = function () {
        var answer = this._mute;
        this._mute = false;
        return answer;
    };

    // Export singleton.
    return new Controls();
})();
