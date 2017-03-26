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
    };


    /**
     * A singleton class which abstracts all player input,
     * should hide complexity of dealing with keyboard, mouse
     * and touch devices.
     * @constructor
     */
    var Controls = function () {
        this._didJump = false;
        this.keys = {};
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
                return p.toString() === "[object SafariRemoteNotification]";
            })(!window['safari'] || safari.pushNotification);
        if (isSafari) {
            //we need this for safari.
            document.ontouchmove = function (event) {
                event.preventDefault();
            }
            $(window).on('touchstart', this._onClick.bind(this));
        } else {
            $(window)
                .on('click', this._onClick.bind(this));
        }
        // This is for iphone.
    };


    Controls.prototype._onClick = function (e) {
        this._didJump = true;
    }

    Controls.prototype._onKeyDown = function (e) {
        // Only jump if space wasn't pressed.
        if (e.keyCode === 32 && !this.keys.space) {
            this._didJump = true;
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

    // Export singleton.
    return new Controls();
})();
