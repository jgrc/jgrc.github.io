'use strict'
class Game {
    constructor(id) {
        this._renderer = new Render2D(id, 800, 600, 'black');
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
        this._render();
    }

    _render() {
        this._renderer.clear();
        this._renderer.entity(this._player);
        this._aliens.forEach(alien => this._renderer.entity(alien));
    }
}
