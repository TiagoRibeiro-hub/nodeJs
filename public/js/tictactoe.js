import { TicTacToe } from "../models/game-model.js";
import Game from "./gameInitialize.js";
import loader from "./loader.js";
import constants from "../global/constants.js";
import helper from "../global/helper.js";

// board-info
const labelInfo = document.getElementById('board-info');
const playerPiece = document.getElementById('player-piece');
const tictactoeBoard = document.querySelector('.tictactoe-board');
const winningContainer = document.getElementById('winning-container');
const winningMessage = document.getElementById('winning-message');
// buttons
const goBackBtn = document.getElementById('go-back');
const restartBtn = document.getElementById('restart');
// cells
const cells = document.querySelectorAll('.cell');
// tictactoe
var tictactoe = undefined;
// function
function setPlayerBoard() {
    const intervalIdBoard = setInterval(function() {
        if (!loader.loaderSelector.classList.contains("loader-hidden")) {
            if (playerPiece.textContent === '') {
                if (Game._startingPlayer !== undefined && Game._startingPlayer !== '' && Game._playerOne._piece !== undefined && Game._playerOne._piece !== '') {
                    labelInfo.textContent = "Player " + Game._startingPlayer + " turn";
                    if (Game._startingPlayer === Game._playerOne._name) {
                        playerPiece.textContent += Game._playerOne._piece;
                        tictactoeBoard.classList.add(Game._playerOne._piece.toLowerCase());
                    } else {
                        playerPiece.textContent += Game._playerTwo._piece;
                        tictactoeBoard.classList.add(Game._playerTwo._piece.toLowerCase());
                    }
                    if (tictactoe === undefined) {
                        tictactoe = new TicTacToe(Game);
                    }
                    loader.removeLoader(loader.loaderSelector);
                    clearInterval(intervalIdBoard);
                }
            };
        }
    }, 500);
}
// events
setPlayerBoard();

restartBtn.addEventListener('click', function() {
    Game._playerOne._piece = '';
    Game._playerTwo._piece = '';
    Game._playerOne._playedMoves = [];
    Game._playerTwo._playedMoves = [];

    tictactoe = undefined;
    playerPiece.textContent = '';

    helper.restartGame(goBackBtn);

    winningContainer.classList.remove('show');
    cells.forEach((cell) => {
        helper.removeClass(cell, ['x', 'o']);
    })
    setPlayerBoard();
});

cells.forEach((cell) => {
    cell.addEventListener('click', function(e) {
        const target = e.target;

        if (tictactoeBoard.classList.contains('x')) {
            setBoardAndPlayedCell('x', 'o');

        } else {
            setBoardAndPlayedCell('o', 'x');
        }

        if (tictactoe._playerOne._turn) {
            tictactoe._playerOne.setPlayedMoves = target.id.substring(0, 1);
            setWinningMessage(setPlayerTurn(false, true, tictactoe._playerOne._playedMoves), tictactoe._playerOne._name);

        } else {
            tictactoe._playerTwo.setPlayedMoves = target.id.substring(0, 1);
            setWinningMessage(setPlayerTurn(true, false, tictactoe._playerTwo._playedMoves), tictactoe._playerTwo._name);
        }


        function setWinningMessage(hasWon, playerName) {
            if (hasWon.result) {
                let count = 6;
                const intervalId = setInterval(function() {
                    if (count % 2 == 0) {
                        hasWon.combo.map(id => {
                            document.getElementById(id + '-cell').classList.add('wincell');
                        });
                    } else {
                        hasWon.combo.map(id => {
                            document.getElementById(id + '-cell').classList.remove('wincell');
                        });
                    }
                    count -= 1;
                    if (count === 0) {
                        winningMessage.textContent = "You won " + playerName;
                        winningContainer.classList.add('show');
                        clearInterval(intervalId);
                    }
                }, 250)
            }
        }

        function setPlayerTurn(x, y, playedMoves) {
            tictactoe._playerOne._turn = x;
            tictactoe._playerTwo._turn = y;
            return tictactoe.hasWon(playedMoves);
        }

        function setBoardAndPlayedCell(y, z) {
            target.classList.add(y);
            tictactoeBoard.classList.remove(y);
            tictactoeBoard.classList.add(z);
        };
    })
})