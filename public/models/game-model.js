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
}

export class TicTacToe extends Game {
    constructor(game) {
        super(game);
        this._winnigPossibilities = this.winnigPossibilities();
        this._board = this.initBoard();
    }

    initBoard() {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }

    setBoard(move, symbol) {
        this._board[move] = symbol;
    }

    emptySquares(board = this._board) {
        return board.filter((x) => typeof x == "number");
    }

    winnigPossibilities() {
        return [
            ["0", "1", "2"],
            ["0", "4", "8"],
            ["0", "3", "6"],
            ["1", "4", "7"],
            ["3", "4", "5"],
            ["2", "4", "6"],
            ["2", "5", "8"],
            ["6", "7", "8"],
        ];
    }

    hasWon(playedMoves) {
        let combo,
            hasWon = undefined;
        this._winnigPossibilities.some((combination) => {
            var result = combination.every((c) => playedMoves.includes(c));
            if (result) {
                combo = combination;
                hasWon = result;
            }
        });
        return { result: hasWon, combo: combo };
    }
}

// https://mostafa-samir.github.io/Tic-Tac-Toe-AI/
export class AI {
    constructor(game, level, aiPlayerPiece, humanPlayerPiece) {
        this._aiPlayerPiece = aiPlayerPiece;
        this._humanPlayerPiece = humanPlayerPiece;
        this._game = game;
        var aiPlayer = new Ai.AIPlayer(level);
        // game to play
        this._aiGame = new Ai.Game(aiPlayer);
        aiPlayer.plays(this._aiGame);
        aiGame.advanceTo(this._aiGame._currentState);
    }

    static State = function(oldState) {
        this._turn = "";

        /* public : the number of moves of the AI player */
        this._oMovesCount = 0;

        /*  public : the board configuration in this state */
        this._stateBoard = [];

        if (typeof oldState !== "undefined") {
            // if the state is constructed using a copy of another state
            var len = oldState._stateBoard.length;
            this._stateBoard = new Array(len);
            for (var itr = 0; itr < len; itr++) {
                this._stateBoard[itr] = oldState._stateBoard[itr];
            }

            this._oMovesCount = oldState._oMovesCount;
            this.result = oldState.result;
            this._turn = oldState._turn;
        }

        advanceTurn = function() {
            this._turn = this._turn === "X" ? "O" : "X";
        }

        isTerminal = function() {
            if (winning(this._stateBoard, this._humanPlayerPiece)) {
                // the human player won
                return 10 - this._oMovesCount;
            } else if (winning(this._stateBoard, this._aiPlayerPiece)) {
                //the human player lost
                return -10 + this._oMovesCount;
            } else if (this._stateBoard.length === 0) {
                return 0;
            }
            return false;
        }

        function winning(board, player) {
            if (
                (board[0] == player && board[1] == player && board[2] == player) ||
                (board[3] == player && board[4] == player && board[5] == player) ||
                (board[6] == player && board[7] == player && board[8] == player) ||
                (board[0] == player && board[3] == player && board[6] == player) ||
                (board[1] == player && board[4] == player && board[7] == player) ||
                (board[2] == player && board[5] == player && board[8] == player) ||
                (board[0] == player && board[4] == player && board[8] == player) ||
                (board[2] == player && board[4] == player && board[6] == player)
            ) {
                return true;
            } else {
                return false;
            }
        }
    };

    static AIPlayer = function(level) {
        //private attribute: level of intelligence the player has
        var levelOfIntelligence = level;

        //private attribute: the game the player is playing
        var AIPlayerGame = {};

        function minimaxValue(state) {
            const result = state.isTerminal();
            if (result !== false) {
                return result;
            } else {
                var stateScore = undefined; // this stores the minimax value we'll compute

                if (state.turn !== this._aiPlayerPiece) {
                    // X maximizes --> initialize to a value smaller than any possible score
                    stateScore = -1000;
                } else {
                    // O minimizes --> initialize to a value larger than any possible score
                    stateScore = 1000;
                }

                var availablePositions = this._game.emptySquares(state.board);

                //enumerate next available states using the info form available positions
                var availableNextStates = availablePositions.map(function(pos) {
                    var action = new AI.AIAction(pos);
                    var nextState = action.applyTo(state);
                    return nextState;
                });

                /* calculate the minimax value for all available next states
                 * and evaluate the current state's value */
                availableNextStates.forEach(function(nextState) {

                    var nextScore = minimaxValue(nextState); //recursive call

                    if (state.turn === "X") {
                        // X wants to maximize --> update stateScore iff nextScore is larger
                        if (nextScore > stateScore)
                            stateScore = nextScore;
                    } else {
                        // O wants to minimize --> update stateScore iff nextScore is smaller
                        if (nextScore < stateScore)
                            stateScore = nextScore;
                    }
                });

                //backup the minimax value
                return stateScore;
            }
        }

        // function takeEasyMove(turn) { }

        // function takeMediumMove(turn) { }

        function takeHardMove(turn) {
            var available = this._game.emptySquares(AIPlayerGame._currentState.board);

            //enumerate and calculate the score for each avaialable actions to the ai player
            var availableActions = available.map(function(pos) {
                var action = new AI.AIAction(pos); //create the action object

                //get next state by applying the action
                var next = action.applyTo(AIPlayerGame._currentState);

                //calculate and set the action's minmax value
                action.minimaxVal = minimaxValue(next);

                return action;
            });

            //sort the enumerated actions list by score
            if (turn !== this._aiPlayerPiece) {
                //X maximizes --> descend sort the actions to have the largest minimax at first
                availableActions.sort(AI.AIAction.DESCENDING);
            } else {
                //O minimizes --> acend sort the actions to have the smallest minimax at first
                availableActions.sort(AI.AIAction.ASCENDING);
            }

            //take the first action as it's the optimal
            var chosenAction = availableActions[0];
            var nextState = chosenAction.applyTo(AIPlayerGame._currentState);

            // take the game to the next state
            AIPlayerGame.advanceTo(nextState);

            return chosenAction._movePosition;
        }

        plays = function(game) {
            AIPlayerGame = game;
        };

        notify = function(turn) {
            switch (levelOfIntelligence) {
                case constants.game.EASY:
                    takeEasyMove(turn);
                    break;
                case constants.game.MEDIUM:
                    takeMediumMove(turn);
                    break;
                case constants.game.HARD:
                    return takeHardMove(turn);
            }
        };
    };

    static AIAction = function(pos) {
        // public : the position on the board that the action would put the letter on
        this._movePosition = pos;

        //public : the minimax value of the state that the action leads to when applied
        this._minimaxVal = 0;

        applyTo = function(state) {
            var nextState = new AI.State(state);
            //put the letter on the board
            nextState.board[this._movePosition] = state.turn;
            if (state.turn === this._aiPlayerPiece) {
                nextState._oMovesCount++;
            }
            nextState.advanceTurn();
            return nextState;
        };

        /*
         * public static method that defines a rule for sorting AIAction in ascending manner
         * @param firstAction [AIAction] : the first action in a pairwise sort
         * @param secondAction [AIAction]: the second action in a pairwise sort
         */
        ASCENDING = function(firstAction, secondAction) {
            if (firstAction.minimaxVal < secondAction.minimaxVal) {
                return -1; //indicates that firstAction goes before secondAction
            } else if (firstAction.minimaxVal > secondAction.minimaxVal) {
                return 1; //indicates that secondAction goes before firstAction
            } else {
                return 0;
            }
        };

        /*
         * public static method that defines a rule for sorting AIAction in descending manner
         * @param firstAction [AIAction] : the first action in a pairwise sort
         * @param secondAction [AIAction]: the second action in a pairwise sort
         */
        DESCENDING = function(firstAction, secondAction) {
            if (firstAction.minimaxVal > secondAction.minimaxVal) {
                return -1;
            } else if (firstAction.minimaxVal < secondAction.minimaxVal) {
                return 1;
            } else {
                return 0;
            }
        };
    };

    static Game = function(aIPlayer) {
        //public : initialize the ai player for this game
        this._ai = aIPlayer;

        // public : initialize the game current state to empty board configuration
        this._currentState = new AI.State();

        this._currentState.board = this._game.emptySquares();

        //who plays first
        this._currentState.turn =
            this._game._startingPlayer === this._game._playerOne._name ?
            this._game._playerOne._piece :
            this._game._playerTwo._piece;

        /*
         * public function that advances the game to a new state
         * @param _state [State]: the new state to advance the game to
         */
        advanceTo = function(state) {
            if (this._currentState.turn === this._aiPlayerPiece) {
                this._currentState = state;
                return this._ai.notify(this._currentState.turn);
            }
        };
    };
}