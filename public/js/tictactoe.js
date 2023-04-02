import { TicTacToe } from "../models/game-model.js";
import Game from "./gameInitialize.js";
import loader from "./loader.js";
import constants from "../global/constants.js";
import helper from "../global/helper.js";

// board-info
const labelInfo = document.getElementById("board-info");
const playerPiece = document.getElementById("player-piece");
const tictactoeBoard = document.querySelector(".tictactoe-board");
const winningContainer = document.getElementById("winning-container");
const winningMessage = document.getElementById("winning-message");
// buttons
const goBackBtn = document.getElementById("go-back");
const restartBtn = document.getElementById("restart");
// cells
const cells = document.querySelectorAll(".cell");
// tictactoe
var tictactoe = undefined;
// function
function setPlayerBoard() {
    const intervalIdBoard = setInterval(function() {
        if (!loader.loaderSelector.classList.contains("loader-hidden")) {
            if (playerPiece.textContent === "") {
                if (
                    Game._startingPlayer !== undefined &&
                    Game._startingPlayer !== "" &&
                    Game._playerOne._piece !== undefined &&
                    Game._playerOne._piece !== ""
                ) {
                    let machineStart = false;
                    labelInfo.textContent = setBoardInfo(Game._startingPlayer);
                    if (Game._startingPlayer === Game._playerOne._name) {
                        playerPiece.textContent += Game._playerOne._piece;
                        tictactoeBoard.classList.add(Game._playerOne._piece.toLowerCase());
                    } else {
                        playerPiece.textContent += Game._playerTwo._piece;
                        tictactoeBoard.classList.add(Game._playerTwo._piece.toLowerCase());

                        machineStart = Game._playerTwo._name === constants.game.The_Machine;
                    }
                    if (tictactoe === undefined) {
                        tictactoe = new TicTacToe(Game);
                    }
                    loader.removeLoader(loader.loaderSelector);
                    clearInterval(intervalIdBoard);

                    clickCellsEvent();
                    if (machineStart) {
                        theMachineMove(tictactoe._playerTwo._piece, tictactoe._playerOne._piece);
                    }
                }
            }
        }
    }, 500);
}

// events
setPlayerBoard();

restartBtn.addEventListener("click", function() {
    Game._playerOne._piece = "";
    Game._playerTwo._piece = "";
    Game._playerOne._playedMoves = [];
    Game._playerTwo._playedMoves = [];
    Game._playerOne._turn = false;
    Game._playerTwo._turn = false;

    tictactoe = undefined;

    playerPiece.textContent = "";
    labelInfo.textContent = "";

    helper.restartGame(goBackBtn);

    winningContainer.classList.remove("show");

    tictactoeBoard.classList.remove("x");
    tictactoeBoard.classList.remove("o");

    cells.forEach((cell) => {
        helper.removeClass(cell, ["x", "o"]);
    });
    setPlayerBoard();
});

function clickCellsEvent() {
    cells.forEach((cell) => {
        cell.addEventListener(
            "click",
            function(e) {
                const target = e.target;
                const move = target.id.substring(0, 1);
                const boardLength = tictactoe.emptySquares().length - 1;

                if (tictactoeBoard.classList.contains("x")) {
                    setBoard("x", "o");
                    tictactoe.setBoard(parseInt(move), "X");
                } else {
                    setBoard("o", "x");
                    tictactoe.setBoard(parseInt(move), "O");
                }

                let won = undefined;
                if (tictactoe._playerOne._turn) {
                    tictactoe._playerOne.setPlayedMoves = move;
                    won = setPlayerTurn(false, true, tictactoe._playerOne._playedMoves);
                    setWinningMessage(won, tictactoe._playerOne._name);

                    if (
                        boardLength > 0 &&
                        won.result == undefined &&
                        tictactoe._playerTwo._name === constants.game.The_Machine
                    ) {
                        theMachineMove(tictactoe._playerTwo._piece, tictactoe._playerOne._piece);
                    }
                } else {
                    tictactoe._playerTwo.setPlayedMoves = move;
                    won = setPlayerTurn(true, false, tictactoe._playerTwo._playedMoves);
                    setWinningMessage(won, tictactoe._playerTwo._name);
                }

                if (won != undefined && won.result == undefined && boardLength === 0) {
                    winningMessage.textContent = "Is a tie";
                    winningContainer.classList.add("show");
                }

                function setWinningMessage(hasWon, playerName) {
                    if (hasWon.result) {
                        let count = 6;
                        const intervalId = setInterval(function() {
                            if (count % 2 == 0) {
                                hasWon.combo.map((id) => {
                                    document
                                        .getElementById(id + "-cell")
                                        .classList.add("wincell");
                                });
                            } else {
                                hasWon.combo.map((id) => {
                                    document
                                        .getElementById(id + "-cell")
                                        .classList.remove("wincell");
                                });
                            }
                            count -= 1;
                            if (count === 0) {
                                winningMessage.textContent = "You won " + playerName;
                                winningContainer.classList.add("show");
                                clearInterval(intervalId);
                            }
                        }, 150);
                    }
                }

                function setPlayerTurn(pOne, pTwo, playedMoves) {
                    tictactoe._playerOne._turn = pOne;
                    tictactoe._playerTwo._turn = pTwo;

                    labelInfo.textContent = pOne ?
                        setBoardInfo(tictactoe._playerOne._name) :
                        setBoardInfo(tictactoe._playerTwo._name);

                    playerPiece.textContent = pOne ?
                        tictactoe._playerOne._piece :
                        tictactoe._playerTwo._piece;

                    return tictactoe.hasWon(playedMoves);
                }

                function setBoard(y, z) {
                    target.classList.add(y);
                    tictactoeBoard.classList.remove(y);
                    tictactoeBoard.classList.add(z);
                }
            }, { once: true }
        );
    });
};

function setBoardInfo(playerName) {
    return "Player " + playerName + " turn";
}

// THE MANCHINE GAME
function theMachineMove(aiPlayer, humanPlayer) {
    var _aiPlayer = aiPlayer;
    var _humanPlayer = humanPlayer;
    switch (tictactoe._difficulty) {
        case constants.game.EASY:
            playEasy();
            break;
        case constants.game.MEDIUM:
            playMedium();
            break;
        case constants.game.HARD:
            playHard();
            break;
    }

    function playEasy() {
        const possibelMoves = tictactoe.emptySquares();
        const randomIndex = Math.floor(Math.random() * possibelMoves.length);
        document
            .getElementById(possibelMoves[randomIndex].toString() + "-cell")
            .click();
    }

    function playMedium() {}

    function playHard() {
        const bestMove = tictactoe.emptySquares().length === 9 ?
            4 :
            minimax(tictactoe._board, tictactoe._playerTwo._piece).index;

        document.getElementById(bestMove.toString() + "-cell").click();
    }

    function minimax(newBoard, playerPiece, level = undefined) {
        var availableSpots = tictactoe.emptySquares(newBoard);

        // checks for the terminal states such as win, lose, and tie and returning a value accordingly
        // _playerTwo always AI     
        if (winning(newBoard, _humanPlayer)) {
            return { score: -10 };
        } else if (winning(newBoard, _aiPlayer)) {
            return { score: 10 };
        } else if (availableSpots.length === 0) {
            return { score: 0 };
        }

        // an array to collect all the objects
        var moves = [];
        // loop through available spots
        for (var i = 0; i < availableSpots.length; i++) {
            //create an object for each and store the index of that spot 
            var move = {};
            move.index = newBoard[availableSpots[i]];

            // set the empty spot to the current player
            newBoard[availableSpots[i]] = playerPiece;

            // collect the score resulted from calling minimax on the opponent of the current player
            if (playerPiece == _aiPlayer) {
                var result = minimax(newBoard, _humanPlayer);
                move.score = result.score;
            } else {
                var result = minimax(newBoard, _aiPlayer);
                move.score = result.score;
            }
            // reset the spot to empty
            newBoard[availableSpots[i]] = move.index;
            // push the object to the array
            moves.push(move);
        }

        // if it is the computer's turn loop over the moves and choose the move with the highest score
        var bestMove;
        if (playerPiece === _aiPlayer) {
            var bestScore = -10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            // else loop over the moves and choose the move with the lowest score
            var bestScore = 10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        // return the chosen move (object) from the moves array
        return moves[bestMove];
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
}