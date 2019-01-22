'use strict'
class Player extends Entity {
    constructor(x, y, eventDispatcher) {
        super(x, y, 0, 0, 40, 25, 'green', eventDispatcher);
        this.velocity = 120;
        this._shotDelay = 1000;
        this._lastShot = Date.now() - this._shotDelay;
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

    shot() {
        let now = Date.now();
        if (now - this._lastShot > this._shotDelay) {
            this._lastShot = now;
            return new Shot(Math.round(this.x + this.width / 2), this.y, this._eventDispatcher)
        }

        return null;
    }

    kill() {
        super.kill();
        this._eventDispatcher.add(EventDispatcher.Event.PLAYER_KILLED);
    }
}
