import constants from "./constants.js";

const helper = function() {
    let _randomNumber = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    let _flipCoin = function() {
        const result = _randomNumber(1, 2);
        return result % 2 == 0 ? constants.game.HEADS : constants.game.TAILS;
    };
    let _toggle = function(element) {
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden')
        } else {
            element.classList.add('hidden')
        }
    };
    return {
        randomNumber: _randomNumber,
        flipCoin: _flipCoin,
        toggle: _toggle

    };
}

export default helper();