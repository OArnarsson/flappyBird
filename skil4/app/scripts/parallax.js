/**
 * Created by Andri on 21.3.2017.
 */
window.Parallax = ((() => {

    class Parallax {
        constructor(el, game, speed, height, width) {
            this.el = el;
            this.game = game;
            this.speed = speed;
            this.pos = { x: 0 };
            this.setSize(height, width);
            this.reset();
        }

        setSize(height, width){
            this.el.height(height);
            this.el.width(width);
        }

        reset() {
            this.pos.x = 0;
        }

        update() {
            this.pos.x -= this.speed;
            if (this.pos.x * -1 > this.el.width()/2) {
                this.pos.x = 0;
            }
            this.speed = this.speed += 0.0001;
            this.el.css({ "transform": `translate3d(${this.pos.x}px, 0px, 0px)` });
        }
    }
    return Parallax;
}))();