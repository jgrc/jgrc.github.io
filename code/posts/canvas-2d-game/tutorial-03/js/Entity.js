'use strict'
class Entity {
    constructor(x, y, dx, dy, width, height, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    move(delta) {
        this.x += Math.round(delta * this.dx / 1000);
        this.y += Math.round(delta * this.dy / 1000);
    }
}
