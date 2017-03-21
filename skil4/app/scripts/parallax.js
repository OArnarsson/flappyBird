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
        this.width = 0;
        this.height = 0;
        this.reset();
    };

    Parallax.prototype.reset = function () {
        switch (this.name){
            case 'Cloud':
                this.pos.x = 0;
                this.pos.y = 0;
                this.width = this.game.groundHeight;
                this.height = this.game.groundHeight;
                this.el.width(this.width);
                this.el.height(this.game.groundHeight);
                break;
            case 'City':
                this.pos.x = 0;
                this.pos.y = 0;
                this.width = this.game.width*1.5;
                this.height = this.game.groundHeight;
                this.el.width(this.width);
                this.el.height(this.game.groundHeight);
                this.el.css("bottom", this.game.groundHeight + 'px');
                console.log('im here!!!!');
                break;
            case 'Ground':
                this.pos.x = 0;
                this.pos.y = 0;
                this.width = this.game.width*1.5;
                this.height = this.game.height * 0.25;
                this.el.width(this.width);
                this.el.height(this.game.groundHeight);
                break;
        }
    }
    Parallax.prototype.update = function () {
        // Check if out of bounce
        this.pos.x -= this.speed;

        switch (this.name) {
            case 'Cloud':
                if(this.game.width+this.width + this.pos.x < 0){
                    this.pos.x = this.width/2;
                }
                break;
            case 'Ground':
                if(this.width*0.25 + this.pos.x < 0){
                    this.pos.x = 0;
                }
                break;
            case 'City':
                if(this.width*0.25 + this.pos.x < 0){
                    this.pos.x = 0;
                }
                break;
        }
            this.el.css('transform', 'translateX(' + this.pos.x + 'px)');
    }

    return Parallax;
})();