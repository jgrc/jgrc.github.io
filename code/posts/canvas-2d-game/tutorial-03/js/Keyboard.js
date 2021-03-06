'use strict'
class Keyboard {
    constructor() {
        this._element = document.body;
        this._pressed = {};
        this.addEvent('keydown', evt => this._pressed[evt.keyCode] = true);
        this.addEvent('keyup', evt => this._pressed[evt.keyCode] = false);
    }

    addEvent(event_name, callback) {
        this._element.addEventListener(event_name, callback);
    }

    is(key) {
        return !!this._pressed[key];
    }

    static get Key() {
        return {
            ESC : 27,
            F1 : 112,
            F2 : 113,
            F3 : 114,
            F4 : 115,
            F5 : 116,
            F6 : 117,
            F7 : 118,
            F8 : 119,
            F9 : 120,
            F10 : 121,
            F11 : 122,
            F12 : 123,
            LEFT : 37,
            UP : 38,
            RIGHT : 39,
            DOWN : 40,
            A : 65,
            B : 66,
            C : 67,
            D : 68,
            E : 69,
            F : 70,
            G : 71,
            H : 72,
            I : 73,
            J : 74,
            K : 75,
            L : 76,
            M : 77,
            N : 78,
            N_TILDE : 192,
            O : 79,
            P : 80,
            Q : 81,
            R : 82,
            S : 83,
            T : 84,
            U : 85,
            V : 86,
            W : 87,
            X : 88,
            Y : 89,
            Z : 90,
            SPACE : 32,
            ENTER : 13,
            CTRL : 17,
            ALT : 18,
            TAB : 9,
            CAPS_LOCK : 20,
            SHIFT : 16,
            DEL : 8
        }
    }
}
