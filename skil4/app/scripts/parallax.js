/**
 * Created by Andri on 21.3.2017.
 */
window.Parallax = (function () {

    var Parallax = function (el, game, speed, name) {
        this.el = el;
        this.game = game;
        this.speed = speed;
        this.pos = {x:0, y:0};
        this.name = name;
        this.reset();
    };

    Parallax.prototype.reset = function () {
        switch (this.name){
            case 'Cloud':
                this.pos.x = 10;
                this.pos.y = 15;
                break;
            case 'City':
                this.pos.x = 50;
                this.pos.y = 15;
                break;
            case 'Ground':
                this.pos.x = 100;
                this.pos.y = 15;
                break;
        }
    }
    Parallax.prototype.update = function () {
        // Check if out of bounce
        this.pos.x += this.speed;
        //this.el.css('transform', 'translateX(' + this.pos.x + 'em)');
    }

    return Parallax;
})();