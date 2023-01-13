import Game from "./gameInitialize.js";
import loader from "./loader.js";
import constants from "../global/constants.js";
import helper from "../global/helper.js";

// board-info
const labelInfo = document.getElementById('board-info');
const playerPiece = document.getElementById('player-piece');
// buttons
const goBackBtn = document.getElementById('go-back');
const restartBtn = document.getElementById('restart');
// function
function setPlayerBoard() {
    const intervalIdBoard = setInterval(function() {
        if (!loader.loaderSelector.classList.contains("loader-hidden")) {
            if (playerPiece.textContent === '') {
                if (Game._startingPlayer !== undefined && Game._startingPlayer !== '' && Game._playerOne._piece !== undefined && Game._playerOne._piece !== '') {
                    labelInfo.textContent = "Player " + Game._startingPlayer + " turn";
                    if (Game._startingPlayer === Game._playerOne._name) {
                        playerPiece.textContent += Game._playerOne._piece;
                    } else {
                        playerPiece.textContent += Game._playerTwo._piece;
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
    playerPiece.textContent = '';
    helper.restartGame(goBackBtn);
    setPlayerBoard();
});