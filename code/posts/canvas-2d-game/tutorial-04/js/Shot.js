'use strict'
class Shot extends Entity {
    constructor(x, y, eventDispatcher) {
        super(x, y, 0, -400, 2, 5, 'yellow', eventDispatcher);
        this._eventDispatcher.add(EventDispatcher.Event.SHOT);
    }
}
