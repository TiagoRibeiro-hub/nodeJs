import Game from "./gameInitialize.js";
// board-info
const labelInfo = document.getElementById('board-info');
const playerPiece = document.getElementById('player-piece');

const myInterval = setInterval(function() {
    if (Game._startingPlayer !== undefined && Game._startingPlayer !== '' && Game._playerOne !== undefined && Game._playerOne._piece !== undefined && Game._playerOne._piece !== '') {
        labelInfo.textContent = "Player " + Game._startingPlayer + " turn";
        if (Game._startingPlayer === Game._playerOne._name) {
            playerPiece.textContent += Game._playerOne._piece;
        } else {
            playerPiece.textContent += Game._playerTwo._piece;
        }
        clearInterval(myInterval);
    }
}, 500);