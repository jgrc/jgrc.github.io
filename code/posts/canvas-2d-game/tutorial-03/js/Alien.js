'use strict'
class Alien extends Entity {
    constructor(x, y) {
        super(x, y, 75, 0, 40, 25, 'white');
    }

    changeDirection() {
        this.dx *= -1;
        this.y += 10;
    }
}
