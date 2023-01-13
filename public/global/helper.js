import constants from "./constants.js";
// screens
const enemyScreen = document.getElementById('enemy-screen');
const playersScreen = document.getElementById('players-screen');
const difficultyScreen = document.getElementById('difficulty-screen');
const flipCoinScreen = document.getElementById('flipCoin-screen');
const introScreen = document.getElementById('intro-screen');
const gameScreen = document.getElementById('game-screen')
    // function
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
    let _toggleHideAndShow = function(screen) {
        switch (screen) {
            case constants.game.ENEMY:
                _toggle(enemyScreen, 'hidden');
                break;
            case constants.game.PLAYERS:
                _toggle(playersScreen, 'hidden');
                break;
            case constants.game.DIFFICULTY:
                _toggle(difficultyScreen, 'hidden');
                break;
            case constants.game.FILPCOIN:
                _toggle(flipCoinScreen, 'hidden');
                break;
            case constants.game.INTRO:
                _toggle(introScreen, 'hidden');
                break;
            case constants.game.GAME_TABLE:
                _toggle(gameScreen, 'hidden');
                break;
        }
    };
    let _restartGame = function(goBackBtn) {
        _toggleHideAndShow(constants.game.GAME_TABLE);
        _toggleHideAndShow(constants.game.INTRO);
        goBackBtn.click();
        goBackBtn.classList.remove('hidden');
    }
    return {
        randomNumber: _randomNumber,
        flipCoin: _flipCoin,
        toggle: _toggle,
        toggleHideAndShow: _toggleHideAndShow,
        restartGame: _restartGame
    };
}

export default helper();