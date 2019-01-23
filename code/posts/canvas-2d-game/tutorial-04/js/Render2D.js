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

    gui(score, lives) {
        this._ctx.fillStyle = "white";
        this._ctx.font = "bold 20px monospace";
        this._ctx.fillText(score + " Score", 20, 30);
        this._ctx.fillText(lives + " Lives", this._canvas.width - 110, 30);
    }

    menu(title, subtitle) {
        this._ctx.fillStyle = "red";
        this._ctx.font = "bold 30px monospace";
        let titleWidth = this._ctx.measureText(title).width;
        this._ctx.fillText(
            title,
            (this._canvas.width - titleWidth) / 2,
            this._canvas.height / 2 - 30,
        );

        this._ctx.font = "bold 20px monospace";
        let subtitleWidth = this._ctx.measureText(subtitle).width;
        this._ctx.fillText(
            subtitle,
            (this._canvas.width - subtitleWidth) / 2,
            this._canvas.height / 2 + 5,
        );
    }
}
