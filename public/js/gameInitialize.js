import constants from "../global/constants.js";
import helper from "../global/helper.js";
import validation from "../global/validations.js";
import { Game, Player } from "../models/game-model.js";
// screens
const enemyScreen = document.getElementById('enemy-screen');
const playersScreen = document.getElementById('players-screen');
const difficultyScreen = document.getElementById('difficulty-screen');
const flipCoinScreen = document.getElementById('flipCoin-screen');
const introScreen = document.getElementById('intro-screen');
// buttons
const goBackBtn = document.getElementById('go-back');
const humanBtn = document.getElementById('btn-human');
const cpuBtn = document.getElementById('btn-cpu');
const saveBtn = document.getElementById('btn-save');
const flipCoinBtns = document.querySelectorAll(".flipCoin");
// inputs
const inputPlayerOne = document.getElementById('input-playerOne');
const inputPlayerTwo = document.getElementById('input-playerTwo');
// all
const difficultyBtns = document.querySelectorAll(".difficulty");
const pieceBtns = document.querySelectorAll(".piece");
// functions
function toggleHideAndShow(screen) {
    switch (screen) {
        case constants.game.ENEMY:
            helper.toggle(enemyScreen, 'hidden');
            break;
        case constants.game.PLAYERS:
            helper.toggle(playersScreen, 'hidden');
            break;
        case constants.game.DIFFICULTY:
            helper.toggle(difficultyScreen, 'hidden');
            break;
        case constants.game.FILPCOIN:
            helper.toggle(flipCoinScreen, 'hidden');
            break;
        case constants.game.INTRO:
            helper.toggle(introScreen, 'hidden');
            break;
        case constants.game.GAME_TABLE:
            helper.toggle(document.getElementById('game-screen'), 'hidden');
            break;
    }
};

function setEnemy() {
    toggleHideAndShow(constants.game.ENEMY);
    helper.toggle(goBackBtn, 'hidden');
    toggleHideAndShow(constants.game.PLAYERS);
    goBackBtn.setAttribute("data-screen", constants.game.PLAYERS);
    goBackBtn.setAttribute("data-previous-screen", constants.game.ENEMY);
}
// set Game
var game = new Game();
// events
humanBtn.addEventListener('click', function() {
    setEnemy();
    game.setEnemy = constants.game.HUMAN;
    helper.toggle(document.getElementById('lbl-playerTwo'), 'hidden');
    helper.toggle(inputPlayerTwo, 'hidden');
});

cpuBtn.addEventListener('click', function() {
    setEnemy();
    game.setEnemy = constants.game.CPU;
});

saveBtn.addEventListener('click', function() {
    game._playerOne = new Player(inputPlayerOne.value);
    if (game._enemy === constants.game.HUMAN) {
        game._playerTwo = new Player(inputPlayerTwo.value);
    } else {
        game._playerTwo = new Player(constants.game.The_Machine);
    }

    toggleHideAndShow(constants.game.PLAYERS);

    if (game._enemy === constants.game.CPU) {
        toggleHideAndShow(constants.game.DIFFICULTY);
        goBackBtn.setAttribute("data-screen", constants.game.DIFFICULTY);
    } else {
        toggleHideAndShow(constants.game.FILPCOIN);
        goBackBtn.setAttribute("data-screen", constants.game.FILPCOIN);
    }
    goBackBtn.setAttribute("data-previous-screen", constants.game.PLAYERS);
});

difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", function(e) {
        const target = e.target;
        switch (target.id) {
            case constants.game.EASY:
                game.setDifficulty = constants.game.EASY;
                break;
            case constants.game.MEDIUM:
                game.setDifficulty = constants.game.MEDIUM;
                break;
            case constants.game.DIFFICULTY:
                game.setDifficulty = constants.game.DIFFICULTY;
                break;
        }
        toggleHideAndShow(constants.game.DIFFICULTY);
        toggleHideAndShow(constants.game.FILPCOIN);
        goBackBtn.setAttribute("data-previous-screen", constants.game.DIFFICULTY);
        goBackBtn.setAttribute("data-screen", constants.game.FILPCOIN);
    });
});

flipCoinBtns.forEach((btn) => {
    btn.addEventListener("click", function(e) {
        const target = e.target;
        switch (target.id) {
            case constants.game.HEADS:
                game._playerOne.setCoinSide = constants.game.HEADS;
                game._playerTwo.setCoinSide = constants.game.TAILS;
                break;
            case constants.game.TAILS:
                game._playerOne.setCoinSide = constants.game.TAILS;
                game._playerTwo.setCoinSide = constants.game.HEADS;
                break;
        }
        const result = helper.flipCoin();
        const introSymbol = document.getElementById("intro-symbol");
        if (game._playerOne._coinSide === result) {
            game.setStartingPlayer = game._playerOne._name;
            introSymbol.textContent = "Choose your symbol " + game._playerOne._name + " :"
        } else {
            game.setStartingPlayer = game._playerTwo._name;
            introSymbol.textContent = "Choose your symbol " + game._playerTwo._name + " :"
        }
        toggleHideAndShow(constants.game.FILPCOIN);
        toggleHideAndShow(constants.game.INTRO);
        goBackBtn.setAttribute("data-previous-screen", constants.game.FILPCOIN);
        goBackBtn.setAttribute("data-screen", constants.game.INTRO);
    });
});

pieceBtns.forEach((btn) => {
    btn.addEventListener("click", function(e) {
        const target = e.target;
        switch (e.target.id) {
            case "0":
                setPiece(1);
                break;
            case "1":
                setPiece(0);
                break;
        }
        toggleHideAndShow(constants.game.INTRO);
        toggleHideAndShow(constants.game.GAME_TABLE);
        helper.toggle(goBackBtn, 'hidden');

        function setPiece(index) {
            if (game._startingPlayer == game._playerOne._name) {
                game._playerOne.setPiece = e.target.title;
                game._playerTwo.setPiece = pieceBtns[index].title;
            } else {
                game._playerTwo.setPiece = e.target.title;
                game._playerOne.setPiece = pieceBtns[index].title;
            }
        }
    });
});

inputPlayerOne.addEventListener('blur', function(e) {
    const target = e.target;
    if (!validation.isValid(target.value)) {
        target.classList.add('required');
        target.focus();
    } else {
        target.classList.remove('required');
        target.setAttribute("data-validation", "valid");
        if (game._enemy === constants.game.CPU) {
            saveBtn.disabled = false;
        } else {
            if (inputPlayerTwo.getAttribute("data-validation") === "invalid") {
                inputPlayerTwo.focus();
            } else {
                saveBtn.disabled = false;
            }
        }
    }
    validation.setErrorMsg(target);
});

inputPlayerTwo.addEventListener('blur', function(e) {
    const target = e.target;
    if (!validation.isValid(target.value)) {
        target.classList.add('required');
        target.focus();
    } else {
        target.setAttribute("data-validation", "valid");
        if (inputPlayerOne.getAttribute("data-validation") === "valid") {
            saveBtn.disabled = false
        } else {
            inputPlayerOne.classList.add('required');
        }
    }
    validation.setErrorMsg(target);
});

goBackBtn.addEventListener('click', function(e) {
    const thisScreen = e.target.getAttribute("data-screen");
    const previousScreen = e.target.getAttribute("data-previous-screen");
    toggleHideAndShow(thisScreen);
    toggleHideAndShow(previousScreen);
    switch (previousScreen) {
        case constants.game.ENEMY:
            helper.toggle(goBackBtn, 'hidden');
            document.getElementById('lbl-playerTwo').classList.add("hidden");
            inputPlayerTwo.classList.add("hidden");
            break;
        case constants.game.PLAYERS:
            goBackBtn.setAttribute("data-screen", constants.game.PLAYERS);
            goBackBtn.setAttribute("data-previous-screen", constants.game.ENEMY);
            break;
        case constants.game.DIFFICULTY:
            goBackBtn.setAttribute("data-screen", constants.game.DIFFICULTY);
            goBackBtn.setAttribute("data-previous-screen", constants.game.PLAYERS);
            break;
        case constants.game.FILPCOIN:
            goBackBtn.setAttribute("data-screen", constants.game.FILPCOIN);
            if (game._enemy === constants.game.CPU) {
                goBackBtn.setAttribute("data-previous-screen", constants.game.DIFFICULTY);
            } else {
                goBackBtn.setAttribute("data-previous-screen", constants.game.PLAYERS);
            }
            break;
    }
});
export default game;