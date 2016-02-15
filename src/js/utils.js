/**
 * Created by jasonwang on 16/2/7.
 */

class DOM {

    constructor(domObj) {
        this._domElement = domObj;
    }

    get domElement() {
        return this._domElement;
    }

    hasClass(cls) {
        return this._domElement.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    addClass(cls) {
        if (!this.hasClass(cls))
            this._domElement.className += " " + cls;
        return this;
    }

    removeClass(cls) {
        if (this.hasClass(cls)) {
            let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            this._domElement.className = this._domElement.className.replace(reg, ' ');
        }
        return this;
    };
}

export default class Utils {
};

Utils.DOM = DOM;