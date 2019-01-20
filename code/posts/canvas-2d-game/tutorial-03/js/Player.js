'use strict'
class Player extends Entity {
    constructor(x, y) {
        super(x, y, 0, 0, 40, 25, 'green');
        this.velocity = 120;
    }

    stop() {
        this.dx = 0;
    }

    toRight() {
        this.dx = this.velocity;
    }

    toLeft() {
        this.dx = -this.velocity;
    }
}
