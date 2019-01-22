'use strict'
class Entity {
    constructor(x, y, dx, dy, width, height, color, eventDispatcher) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.width = width;
        this.height = height;
        this.color = color;
        this.alive = true;
        this._eventDispatcher = eventDispatcher;
    }

    move(delta) {
        this.x += Math.round(delta * this.dx / 1000);
        this.y += Math.round(delta * this.dy / 1000);
    }

    kill() {
        this.alive = false;
    }

    _inCollisionWith(other) {
        if (this.x + this.width < other.x) {
            return false;
        }
        if (this.y + this.height < other.y) {
            return false;
        }
        if (this.x > other.x + other.width) {
            return false;
        }
        if (this.y > other.y + other.height) {
            return false;
        }

        return true;
    }
}
