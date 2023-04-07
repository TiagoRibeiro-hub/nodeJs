export class Player {
    constructor(name) {
        this._name = name;
        this._turn = false;
    }

    set setCoinSide(value) {
        this._coinSide = value;
    }

    set setPiece(value) {
        this._piece = value;
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
}

export class TicTacToe extends Game {
    constructor(game) {
        super(game);
        this._board = this.initBoard();
    }

    initBoard() {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    setBoard(move, symbol) {
        this._board[move] = symbol;
    }

    emptySquares(newBoard = this._board) {
        let availSpots = [];
        for (var i = 0; i < newBoard.length; i++) {
            if (newBoard[i] == 0) {
                availSpots.push(i);
            }
        }
        return availSpots;
    }

    winnigPossibilities() {
        return [
            [0, 1, 2],
            [0, 4, 8],
            [0, 3, 6],
            [1, 4, 7],
            [3, 4, 5],
            [2, 4, 6],
            [2, 5, 8],
            [6, 7, 8],
        ];
    }

    winning(board, playerPiece) {
        if (
            (board[0] == playerPiece && board[1] == playerPiece && board[2] == playerPiece) ||
            (board[3] == playerPiece && board[4] == playerPiece && board[5] == playerPiece) ||
            (board[6] == playerPiece && board[7] == playerPiece && board[8] == playerPiece) ||
            (board[0] == playerPiece && board[3] == playerPiece && board[6] == playerPiece) ||
            (board[1] == playerPiece && board[4] == playerPiece && board[7] == playerPiece) ||
            (board[2] == playerPiece && board[5] == playerPiece && board[8] == playerPiece) ||
            (board[0] == playerPiece && board[4] == playerPiece && board[8] == playerPiece) ||
            (board[2] == playerPiece && board[4] == playerPiece && board[6] == playerPiece)
        ) {
            return true;
        } else {
            return false;
        }
    }

    hasWon(playerPiece) {
        let combo = undefined;
        const hasWon = this.winning(this._board, playerPiece);
        if (hasWon) {
            this.winnigPossibilities().some((combination) => {
                let count = 0;
                combination.map((c) => {
                    if (this._board[c] == playerPiece) {
                        count += 1;
                    }
                });
                if (count == 3) {
                    combo = combination;
                }
            });
        }
        return { result: hasWon, combo: combo };
    }
}


export class AI {
    constructor(aiPlayer, humanPlayer, alpha, beta, availableSpotsFunc, winningFunc) {
        this._aiPlayer = aiPlayer;
        this._humanPlayer = humanPlayer;
        this._alpha = alpha;
        this._beta = beta
        this._availableSpotsFunc = availableSpotsFunc;
        this._winningFunc = winningFunc
    }

    minimax(
        newBoard, playerPiece, depth,
        alpha = this._alpha, beta = this._beta) {

        var availableSpots = this._availableSpotsFunc(newBoard);

        // checks for the terminal states such as win, lose, and tie and returning a value accordingly
        // _playerTwo always AI     
        if (this._winningFunc(newBoard, this._humanPlayer)) {
            return { score: -20 + depth };
        } else if (this._winningFunc(newBoard, this._aiPlayer)) {
            return { score: 20 + depth };
        } else if (availableSpots.length === 0) {
            return { score: 0 };
        }

        let bestMove = {};
        depth += 1;
        if (playerPiece === this._aiPlayer) {
            // ai is the maximiser
            bestMove.bestScore = this._alpha;

            for (var i = 0; i < availableSpots.length; i++) {
                // set the empty spot to the current player
                newBoard[availableSpots[i]] = playerPiece;

                // maximiser
                bestMove = this.max(bestMove, availableSpots[i], this.minimax(newBoard, this._humanPlayer, depth, alpha, beta));

                // reset the spot to empty for the next loop itereration
                newBoard[availableSpots[i]] = 0;

                alpha = Math.max(alpha, bestMove.score);
                if (beta <= alpha) {
                    break;
                }
            }
            return bestMove;

        } else {
            // human is the minimiser
            bestMove.bestScore = this._beta;

            for (var i = 0; i < availableSpots.length; i++) {
                // set the empty spot to the current player
                newBoard[availableSpots[i]] = playerPiece;

                // minimiser
                bestMove = this.min(bestMove, availableSpots[i], this.minimax(newBoard, this._aiPlayer, depth, alpha, beta));

                // reset the spot to empty for the next loop itereration
                newBoard[availableSpots[i]] = 0;

                beta = Math.min(beta, bestMove.bestScore);
                if (beta <= alpha) {
                    break;
                }
            }
            return bestMove;
        }
    }

    max(bestMove, availableSpot, value) {
        if (value.score > bestMove.bestScore) {
            bestMove.bestScore = value.score;
            bestMove.index = availableSpot;
            bestMove.score = bestMove.bestScore;
        }
        return bestMove;
    }

    min(bestMove, availableSpot, value) {
        if (value.score < bestMove.bestScore) {
            bestMove.bestScore = value.score;
            bestMove.index = availableSpot;
            bestMove.score = bestMove.bestScore;
        }
        return bestMove;
    }


}