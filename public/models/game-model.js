const game = function() {
    let _game = class Game {
        constructor() {}
        _enemy = undefined;
        set setEnemy(value) {
            this._enemy = value;
        }
        get getEnemy() {
            return this._enemy;
        }
        _startingPlayer = undefined;
        set setStartingPlayer(value) {
            this._startingPlayer = value;
        }
        get getStartingPlayer() {
            return this._startingPlayer;
        }
        _playerOne = undefined;
        set setPlayerOne(value) {
            this._playerOne = value;
        }
        get getPlayerOne() {
            return this._playerOne;
        }
        _playerTwo = undefined;
        set setPlayerTwo(value) {
            this._playerTwo = value;
        }
        get getPlayerTwo() {
            return this._playerTwo;
        }
        _difficulty = undefined;
        set setDifficulty(value) {
            this._difficulty = value;
        }
        get getDifficulty() {
            return this._playerTwo;
        }
    };
    let _player = class Player {
        constructor(name) {
            this._name = name
        }
        _coinSide = undefined;
        set setCoinSide(value) {
            this._coinSide = value;
        }
        get getCoinSide() {
            return this._coinSide;
        }
    };
    return {
        game: _game,
        player: _player
    }
}

export default game();