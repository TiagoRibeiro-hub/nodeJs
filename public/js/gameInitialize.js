import constants from "../global/constants.js";
import helper from "../global/helper.js";
import validation from "../global/validations.js";
import { Game, Player } from "../models/game-model.js";
import loader from "./loader.js";
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
function setEnemy() {
    helper.toggleHideAndShow(constants.game.ENEMY);
    helper.toggle(goBackBtn, 'hidden');
    helper.toggleHideAndShow(constants.game.PLAYERS);
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

    helper.toggleHideAndShow(constants.game.PLAYERS);

    if (game._enemy === constants.game.CPU) {
        helper.toggleHideAndShow(constants.game.DIFFICULTY);
        goBackBtn.setAttribute("data-screen", constants.game.DIFFICULTY);
    } else {
        helper.toggleHideAndShow(constants.game.FILPCOIN);
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
        helper.toggleHideAndShow(constants.game.DIFFICULTY);
        helper.toggleHideAndShow(constants.game.FILPCOIN);
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
        helper.toggleHideAndShow(constants.game.FILPCOIN);
        helper.toggleHideAndShow(constants.game.INTRO);
        goBackBtn.setAttribute("data-previous-screen", constants.game.FILPCOIN);
        goBackBtn.setAttribute("data-screen", constants.game.INTRO);
    });
});

pieceBtns.forEach((btn) => {
    btn.addEventListener("click", function(e) {
        loader.addLoader();
        const target = e.target;
        switch (e.target.id) {
            case "0":
                setPiece(1);
                break;
            case "1":
                setPiece(0);
                break;
        }
        helper.toggleHideAndShow(constants.game.INTRO);
        helper.toggleHideAndShow(constants.game.GAME_TABLE);
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

goBackBtn.addEventListener('click', function(e) {
    const thisScreen = e.target.getAttribute("data-screen");
    const previousScreen = e.target.getAttribute("data-previous-screen");
    helper.toggleHideAndShow(thisScreen);
    helper.toggleHideAndShow(previousScreen);
    switch (previousScreen) {
        case constants.game.ENEMY:
            helper.toggle(goBackBtn, 'hidden');
            document.getElementById('lbl-playerTwo').classList.add("hidden");
            inputPlayerTwo.classList.add("hidden");
            inputPlayerOne.classList.remove('required');
            inputPlayerTwo.classList.remove('required');
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

document.addEventListener('keyup', function(e) {
    const target = e.target;
    if (document.activeElement == inputPlayerOne || document.activeElement == inputPlayerTwo) {
        saveBtn.disabled = true;
    }
    switch (target.id) {
        case "input-playerOne":
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
            break;
        case "input-playerTwo":
            if (!validation.isValid(target.value)) {
                target.classList.add('required');
                target.focus();
            } else {
                target.classList.remove('required');
                target.setAttribute("data-validation", "valid");
                if (inputPlayerOne.getAttribute("data-validation") === "valid") {
                    saveBtn.disabled = false
                } else {
                    inputPlayerOne.classList.add('required');
                }
            }
            validation.setErrorMsg(target);
            break;
    }
});


export default game;