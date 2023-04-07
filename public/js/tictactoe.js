import { TicTacToe, AI } from "../models/game-model.js";
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
const restartBtn = document.getElementById("restart");
// cells
const cells = document.querySelectorAll(".cell");
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
                    clearInterval(intervalIdBoard);

                    labelInfo.textContent = setBoardInfo(Game._startingPlayer);
                    if (Game._startingPlayer === Game._playerOne._name) {
                        playerPiece.textContent += Game._playerOne._piece;
                        tictactoeBoard.classList.add(Game._playerOne._piece.toLowerCase());
                    } else {
                        playerPiece.textContent += Game._playerTwo._piece;
                        tictactoeBoard.classList.add(Game._playerTwo._piece.toLowerCase());
                    }
                    theGame();
                }
            }
        }
    }, 500);
}
var _TicTacToe = undefined;
var _AI = undefined;
// events
setPlayerBoard();

restartBtn.addEventListener("click", function() {
    Game._playerOne._piece = "";
    Game._playerTwo._piece = "";
    Game._playerOne._turn = false;
    Game._playerTwo._turn = false;

    playerPiece.textContent = "";
    labelInfo.textContent = "";

    helper.restartGame();

    winningContainer.classList.remove("show");

    tictactoeBoard.classList.remove("x");
    tictactoeBoard.classList.remove("o");

    cells.forEach((cell) => {
        helper.removeClass(cell, ["x", "o"]);
    });
    setPlayerBoard();
});


function theGame() {
    clickCellsEvent();

    _TicTacToe = new TicTacToe(Game);
    _AI = new AI(
        _TicTacToe._playerTwo._piece,
        _TicTacToe._playerOne._piece, -10000,
        10000,
        _TicTacToe.emptySquares,
        _TicTacToe.winning
    );

    loader.removeLoader(loader.loaderSelector);

    if (_TicTacToe._playerTwo._name === constants.game.The_Machine && _TicTacToe._playerTwo._turn) {
        theMachineMove(_TicTacToe, _AI);
    }
}

function clickCellsEvent() {
    cells.forEach((cell) => {
        cell.addEventListener(
            "click",
            function(e) {
                e.stopImmediatePropagation();

                const target = e.target;
                const move = target.id.substring(0, 1);

                if (tictactoeBoard.classList.contains("x")) {
                    target.classList.add("x");
                    setTictactoeBoard("x", "o");
                    _TicTacToe.setBoard(parseInt(move), "X");
                } else {
                    target.classList.add("o");
                    setTictactoeBoard("o", "x");
                    _TicTacToe.setBoard(parseInt(move), "O");
                }
                const boardLength = _TicTacToe.emptySquares(_TicTacToe._board).length;

                let won = _TicTacToe._playerOne._turn ?
                    _TicTacToe.hasWon(_TicTacToe._playerOne._piece) :
                    _TicTacToe.hasWon(_TicTacToe._playerTwo._piece);

                if (won.result) {
                    _TicTacToe._playerOne._turn ?
                        setWinningMessage(won, _TicTacToe._playerOne._name) :
                        setWinningMessage(won, _TicTacToe._playerTwo._name);

                } else if (!won.result && boardLength === 0) {
                    winningMessage.textContent = "It is a tie";
                    winningContainer.classList.add("show");

                } else {
                    _TicTacToe._playerOne._turn ?
                        setPlayerTurn(false, true, _TicTacToe) :
                        setPlayerTurn(true, false, _TicTacToe);

                    if (boardLength > 0 && won.result == false && _TicTacToe._playerTwo._turn && _TicTacToe._playerTwo._name === constants.game.The_Machine) {
                        const id = setTimeout(function() {
                            clearTimeout(id);
                            theMachineMove(_TicTacToe, _AI);
                        }, 1000);
                    }
                }
            }, { once: true }
        );
    });
}

function setWinningMessage(hasWon, playerName) {
    if (hasWon.result) {
        let count = 6;
        const intervalId = setInterval(function() {
            if (count % 2 == 0) {
                hasWon.combo.map((id) => {
                    document.getElementById(id + "-cell").classList.add("wincell");
                });
            } else {
                hasWon.combo.map((id) => {
                    document.getElementById(id + "-cell").classList.remove("wincell");
                });
            }
            count -= 1;
            if (count === 0) {
                clearInterval(intervalId);
                winningMessage.textContent = "You won " + playerName;
                winningContainer.classList.add("show");
            }
        }, 150);
    }
}

function setPlayerTurn(pOne, pTwo, tictactoe) {
    tictactoe._playerOne._turn = pOne;
    tictactoe._playerTwo._turn = pTwo;

    labelInfo.textContent = pOne ?
        setBoardInfo(tictactoe._playerOne._name) :
        setBoardInfo(tictactoe._playerTwo._name);

    playerPiece.textContent = pOne ?
        tictactoe._playerOne._piece :
        tictactoe._playerTwo._piece;
}

function setTictactoeBoard(y, z) {
    tictactoeBoard.classList.remove(y);
    tictactoeBoard.classList.add(z);
}

function setBoardInfo(playerName) {
    return "Player " + playerName + " turn";
}

// THE MANCHINE GAME
function theMachineMove(tictactoe, ai) {
    if (tictactoe._board[4] === 0) {
        document.getElementById("4-cell").click();
    } else {
        switch (tictactoe._difficulty) {
            case constants.game.EASY:
                playEasy(tictactoe);
                break;
            case constants.game.MEDIUM:
                playMedium();
                break;
            case constants.game.HARD:
                playHard(tictactoe, ai);
                break;
        }
    }
}

function playEasy(tictactoe) {
    const possibelMoves = tictactoe.emptySquares(tictactoe._board);
    const randomIndex = Math.floor(Math.random() * possibelMoves.length);
    document
        .getElementById(possibelMoves[randomIndex].toString() + "-cell")
        .click();
}

function playMedium() {}

function playHard(tictactoe, ai) {
    const bestMove = ai.minimax(
        tictactoe._board,
        tictactoe._playerTwo._piece,
        0,
        ai._alpha,
        ai._beta
    );
    console.log(bestMove.index)
    document.getElementById(bestMove.index.toString() + "-cell").click();
}