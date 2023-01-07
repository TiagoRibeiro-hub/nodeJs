export class Player {
    constructor(name) {
        this._name = name
    }

    set setCoinSide(value) {
        this._coinSide = value;
    }

    set setPiece(value) {
        this.piece = value;
    }

}
export class Game {
    constructor() {}

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