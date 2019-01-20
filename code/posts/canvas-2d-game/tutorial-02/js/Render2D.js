'use strict'
class Render2D {
    constructor(id, width, height, color) {
        this._canvas = document.getElementById(id);
        this._canvas.width = width;
        this._canvas.height = height;
        this._canvas.style.backgroundColor = color;
        this._ctx = this._canvas.getContext('2d');
    }

    clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    entity(entity) {
        this._ctx.fillStyle = entity.color;
        this._ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
    }
}
