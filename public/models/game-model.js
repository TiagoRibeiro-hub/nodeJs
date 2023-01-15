export class Player {
    constructor(name) {
        this._name = name;
        this._turn = false;
        this._playedMoves = [];
    }

    set setCoinSide(value) {
        this._coinSide = value;
    }

    set setPiece(value) {
        this._piece = value;
    }

    set setPlayedMoves(value) {
        this._playedMoves.push(value);
    }

    set setTurn(value) {
        this._turn = value;
    }
}
export class Game {
    constructor(game) {
        if (arguments.length === 1) {
            this._enemy = game._enemy;
            this._startingPlayer = game._startingPlayer;

            this._playerOne = game._playerOne;
            this._playerTwo = game._playerTwo;

            this._difficulty = game._difficulty;
        }
    }

    set setEnemy(value) {
        this._enemy = value;
    }

    set setStartingPlayer(value) {
        this._startingPlayer = value;
    }

    set setPlayerOne(value) {
        this._playerOne = value;
    }

    set setPlayerTwo(value) {
        this._playerTwo = value;
    }

    set setDifficulty(value) {
        this._difficulty = value;
    }

};

export class TicTacToe extends Game {

    constructor(game) {
        super(game);
        this._winnigPossibilities = this.winnigPossibilities();
    }

    winnigPossibilities() {
        return [
            ['0', '1', '2'],
            ['0', '4', '8'],
            ['0', '3', '6'],
            ['1', '4', '7'],
            ['3', '4', '5'],
            ['2', '4', '6'],
            ['2', '5', '8'],
            ['6', '7', '8']
        ]
    }

    hasWon(playedMoves) {
        return this._winnigPossibilities.some(combo => {
            return combo.every(c => playedMoves.includes(c))
        })
    }
}