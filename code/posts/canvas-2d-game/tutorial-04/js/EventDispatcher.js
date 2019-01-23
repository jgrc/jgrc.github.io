'use strict'
class EventDispatcher {
    constructor() {
        this.events = [];
    }

    clear() {
        this.events = [];
    }

    add(event) {
        this.events.push({ event: event });
    }

    static get Event() {
        return {
            ALIEN_KILLED : 'alien_killed',
            PLAYER_KILLED : 'player_killed'
        };
    }
}
