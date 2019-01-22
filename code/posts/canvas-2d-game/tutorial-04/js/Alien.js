'use strict'
class Alien extends Entity {
    constructor(x, y, eventDispatcher) {
        super(x, y, 75, 0, 40, 25, 'white', eventDispatcher);
    }

    changeDirection() {
        this.dx *= -1.045;
        this.y += 10;
    }

    collide(anything) {
        if (this._inCollisionWith(anything)) {
            this.kill();
            anything.kill();
        }
    }

    kill() {
        super.kill();
        this._eventDispatcher.add(EventDispatcher.Event.ALIEN_KILLED);
    }
}
