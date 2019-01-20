'use strict'
class Game {
    constructor(id) {
        this._renderer = new Render2D(id, 800, 600, 'black');
        this._keyboard = new Keyboard();
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
        this._time = Date.now();
        this._loop();
    }

    _loop() {
        this._gameLogic();
        this._update();
        this._render();
        window.requestAnimationFrame(() => this._loop());
    }

    _gameLogic() {
        this._aliens.forEach(alien => this._alienInMapLimit(alien));
        this._playerMovement();
    }

    _alienInMapLimit(alien) {
        if (alien.dx < 0 && alien.x < 10 || alien.dx > 0 && alien.x > 790 - alien.width) {
            this._aliens.forEach(alien => alien.changeDirection());
        }
    }

    _playerMovement() {
        this._player.stop();
        if (this._keyboard.is(Keyboard.Key.LEFT) && this._player.x > 10) {
            this._player.toLeft();
        }
        if (this._keyboard.is(Keyboard.Key.RIGHT) && this._player.x < 790 - this._player.width) {
            this._player.toRight();
        }
    }

    _update() {
        let delta = this._delta();
        this._aliens.forEach(alien => alien.move(delta));
        this._player.move(delta);
    }

    _delta() {
        let now = Date.now();
        let delta = Math.min(now - this._time, 100);
        this._time = now;

        return delta;
    }

    _render() {
        this._renderer.clear();
        this._renderer.entity(this._player);
        this._aliens.forEach(alien => this._renderer.entity(alien));
    }

}
