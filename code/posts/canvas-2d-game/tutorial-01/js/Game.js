'use strict'
class Game {
    constructor(render) {
        this._render = render;
    }

    init() {
        this._player = new Player(370, 550);
        this._aliens = [];
        for (var row = 0; row < 5; row++) {
            for (var column = 0; column < 12; column++) {
                this._aliens.push(
                    new Alien(100 + column * 50, 50 + row * 30)
                );
            }
        }
    }

    render() {
        let self = this;
        this._render.clear();
        this._render.entity(this._player);
        this._aliens.forEach(function(alien) {
            self._render.entity(alien);
        });
    }
}
