'use strict'
class Game {
    constructor(id) {
        this._renderer = new Render2D(id, 800, 600, 'black');
        this._keyboard = new Keyboard();
        this._eventDispatcher = new EventDispatcher();
    }

    init() {
        this._restart();
        this._loop();
    }

    _restart() {
        this._score = 0;
        this._lives = 2;
        this._reload();
    }

    _reload() {
        this._player = new Player(370, 550, this._eventDispatcher);
        this._shots = [];
        this._aliens = [];
        for (var row = 0; row < 5; row++) {
            for (var column = 0; column < 12; column++) {
                this._aliens.push(
                    new Alien(100 + column * 50, 50 + row * 30, this._eventDispatcher)
                );
            }
        }
        this._time = Date.now();
        this._status = Game.Status.RUNNING;
    }

    _loop() {
        switch(this._status) {
            case Game.Status.RUNNING:
                this._gameLogic();
                this._update();
                this._applyEvents();
                break;
            case Game.Status.WIN:
                this._winLogic();
                break;
            case Game.Status.CONTINUE:
                this._continueLogic();
                break;
            case Game.Status.GAME_OVER:
                this._gameoverLogic();
        }
        this._render();
        window.requestAnimationFrame(() => this._loop());
    }

    _gameLogic() {
        this._shotsLogic();
        this._alienLogic();
        this._playerLogic();
    }

    _shotsLogic() {
        this._shots = this._shots.filter(shot => shot.y > 0);
        this._shots.forEach(
            shot => this._aliens.forEach(
                alien => alien.collide(shot)
            )
        );
        this._shots = this._shots.filter(shot => shot.alive);
        this._aliens = this._aliens.filter(alien => alien.alive);
    }

    _alienLogic() {
        this._aliens.forEach(
            alien => function(alien) {
                if (alien.dx < 0 && alien.x < 10 || alien.dx > 0 && alien.x > 790 - alien.width) {
                    this._aliens.forEach(alien => alien.changeDirection());
                }
            }.call(this, alien)
        );
    }

    _playerLogic() {
        this._player.stop();
        if (this._keyboard.is(Keyboard.Key.LEFT) && this._player.x > 10) {
            this._player.toLeft();
        }
        if (this._keyboard.is(Keyboard.Key.RIGHT) && this._player.x < 790 - this._player.width) {
            this._player.toRight();
        }
        if (this._keyboard.is(Keyboard.Key.SPACE)) {
            let shot = this._player.shot();
            if (shot) {
                this._shots.push(shot);
            }
        }
        this._aliens.forEach(
            alien => alien.collide(this._player)
        );
    }

    _update() {
        let delta = this._delta();
        this._aliens.forEach(alien => alien.move(delta));
        this._player.move(delta);
        this._shots.forEach(shot => shot.move(delta));
    }

    _delta() {
        let now = Date.now();
        let delta = Math.min(now - this._time, 100);
        this._time = now;
        return delta;
    }

    _winLogic() {
        if (this._keyboard.is(Keyboard.Key.ENTER)) {
            this._reload();
        }
    }

    _continueLogic() {
        if (this._keyboard.is(Keyboard.Key.ENTER)) {
            this._lives--;
            this._reload();
        }
    }

    _gameoverLogic() {
        if (this._keyboard.is(Keyboard.Key.ENTER)) {
            this._restart();
        }
    }

    _render() {
        this._renderer.clear();
        this._renderer.entity(this._player);
        this._aliens.forEach(alien => this._renderer.entity(alien));
        this._shots.forEach(shot => this._renderer.entity(shot));
        this._renderer.gui(this._score, this._lives);
        switch(this._status) {
            case Game.Status.CONTINUE:
                this._renderer.menu('Yo are death, but you have more lives.', 'Press <ENTER> to continue the game...');
                break;
            case Game.Status.GAME_OVER:
                this._renderer.menu('Game over!', 'Press <ENTER> to start a new game...');
                break;
            case Game.Status.WIN:
                this._renderer.menu('Congratulations! You won the game!', 'Press <ENTER> to start new level...');
                break;
        }
    }

    _applyEvents() {
        this._eventDispatcher.events.forEach(
            event => function(event) {
                switch(event.event) {
                    case EventDispatcher.Event.ALIEN_KILLED:
                        this._score += 10;
                        if (this._aliens.length === 0) {
                            this._status = Game.Status.WIN;
                        }
                        break;
                    case EventDispatcher.Event.PLAYER_KILLED:
                        this._status = this._lives > 0 ? Game.Status.CONTINUE : Game.Status.GAME_OVER;
                        break;
                }
            }.call(this, event)
        );
        this._eventDispatcher.clear();
    }

    static get Status() {
        return {
            WIN : 'win',
            CONTINUE : 'continue',
            GAME_OVER : 'game_over',
            RUNNING : 'running'
        }
    }
}
