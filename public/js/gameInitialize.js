import constants from "../global/constants.js";
import helper from "../global/helper.js";
import model from "../models/game-model.js";
// screens
const enemyScreen = document.getElementById('enemy-screen');
const playersScreen = document.getElementById('players-screen');
const difficultyScreen = document.getElementById('flipCoin-screen');
const flipCoinScreen = document.getElementById('flipCoin-screen');
const introScreen = document.getElementById('intro-screen');
// buttons
const humanBtn = document.getElementById('btn-human');
const cpuBtn = document.getElementById('btn-cpu');
const saveBtn = document.getElementById('btn-save');
const flipCoinBtns = document.querySelectorAll(".flipCoin");
// inputs
const inputPlayerOne = document.getElementById('input-playerOne');
const inputPlayerTwo = document.getElementById('input-playerTwo');



let game = new model.game();

function toggleHideAndShow(screen) {
    switch (screen) {
        case constants.game.ENEMY:
            helper.toggle(enemyScreen);
            break;
        case constants.game.PLAYERS:
            helper.toggle(playersScreen);
            break;
        case constants.game.DIFFICULTY:
            helper.toggle(difficultyScreen);
            break;
        case constants.game.FILPCOIN:
            helper.toggle(flipCoinScreen);
            break;
        case constants.game.INTRO:
            helper.toggle(introScreen);
            break;
    }
};


humanBtn.addEventListener('click', function() {
    toggleHideAndShow(constants.game.ENEMY);
    game.setEnemy(constants.game.HUMAN);
    helper.toggle(document.getElementById('lbl-playerTwo'));
    helper.toggle(inputPlayerTwo);
    toggleHideAndShow(constants.game.PLAYERS);
});

cpuBtn.addEventListener('click', function() {
    toggleHideAndShow(constants.game.ENEMY);
    game.setEnemy(constants.game.CPU);
    toggleHideAndShow(constants.game.PLAYERS);
});

saveBtn.addEventListener('click', function() {
    game._playerOne = new Player(inputPlayerOne.value);
    if (game._enemy === constants.game.HUMAN) {
        game._playerTwo = new Player(inputPlayerTwo.value);
    }
    toggleHideAndShow(constants.game.PLAYERS);
    if (game._enemy === constants.game.CPU) {
        const difficultyBtns = document.querySelectorAll(".difficulty");
        difficultyBtns.forEach((btn) => {
            btn.addEventListener("click",
                (e) => {
                    const target = e.target;
                    switch (target.id) {
                        case constants.game.EASY:
                            game.setDifficulty(constants.game.EASY);
                            break;
                        case constants.game.MEDIUM:
                            game.setDifficulty(constants.game.MEDIUM);
                            break;
                        case constants.game.DIFFICULTY:
                            game.setDifficulty(constants.game.DIFFICULTY);
                            break;
                    }
                    toggleHideAndShow(constants.game.DIFFICULTY);
                    toggleHideAndShow(constants.game.FILPCOIN);
                });
        });
        toggleHideAndShow(constants.game.DIFFICULTY);
    } else {
        toggleHideAndShow(constants.game.FILPCOIN);
    }
});

flipCoinBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const target = e.target;
        switch (target.id) {
            case constants.game.HEADS:
                game._playerOne.setCoinSide(constants.game.HEADS);
                game._playerTwo.setCoinSide(constants.game.TAILS);
                break;
            case constants.game.TAILS:
                game._playerOne.setCoinSide(constants.game.TAILS);
                game._playerTwo.setCoinSide(constants.game.HEADS);
                break;
        }
        const result = helper.flipCoin();
        const introSymbol = document.getElementById("intro-symbol");
        if (game._playerOne.getCoinSide() === result) {
            game._startingPlayer.setStartingPlayer(constants.game.PLAYER_ONE);
            introSymbol.textContent = "Choose your symbol " + game._playerOne._name + " :"
        } else {
            game._startingPlayer.setStartingPlayer(constants.game.PLAYER_TWO);
            introSymbol.textContent = "Choose your symbol " + game._playerTwo._name + " :"
        }
        toggleHideAndShow(constants.game.FILPCOIN);
        toggleHideAndShow(constants.game.INTRO);
    });
});

introScreen.addEventListener('click', function() {

});