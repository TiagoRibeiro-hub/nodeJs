import constants from "./constants.js";

const helper = function() {
    let _randomNumber = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    let _flipCoin = function() {
        const result = _randomNumber(1, 2);
        return result % 2 == 0 ? constants.game.HEADS : constants.game.TAILS;
    };
    let _toggle = function(element, className) {
        if (element.classList.contains(className)) {
            element.classList.remove(className)
        } else {
            element.classList.add(className)
        }
    };
    return {
        randomNumber: _randomNumber,
        flipCoin: _flipCoin,
        toggle: _toggle,
    };
}

export default helper();