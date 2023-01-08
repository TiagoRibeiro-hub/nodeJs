const express = require('express');
const { ElementConfig, InputConfig, CarouselOption } = require('../models/element-model');
const router = express.Router();

const gamesOptions = [];
const optionTicTacToe = new CarouselOption("/files/images/tic_tac_toe.png", "/game/tictactoe", "Game Tic Tac Toe");
gamesOptions.push(optionTicTacToe);


router.get('/', function(req, res) {
    res.render('games/index', {
        title: "Game",
        options: gamesOptions
    });
})

const playersOptionsTicTacToe = [];
playersOptionsTicTacToe.push("X", "O");

const gameTableSize = [];
for (let i = 0; i < 9; i++) {
    gameTableSize.push(i);
}

const inputs = [];
inputs.push({
    label: new ElementConfig(null, null, null, "Player one name :"),
    input: new InputConfig("text", "input-playerOne", "", "player one user name", null),
    span: new ElementConfig(null, null, null, "Player one name can only contain letters, numbers and this symbols ._-!@")
}, {
    label: new ElementConfig("lbl-playerTwo", "hidden", null, "Player two name :"),
    input: new InputConfig("text", "input-playerTwo", "hidden", "player two user name", null),
    span: new ElementConfig(null, null, null, "Player two name can only contain letters, numbers and this symbols ._-!@")
})

router.get('/tictactoe', function(req, res) {
    res.render('games/tictactoe', {
        title: "Tic Tac Toe",
        playersOptions: playersOptionsTicTacToe,
        gameTable: gameTableSize,
        inputs: inputs
    });
})


module.exports = router;