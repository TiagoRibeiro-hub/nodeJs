const express = require('express');
const router = express.Router();

const gamesOptions = [];
class CarouselOption {
    constructor(src, href, name) {
        this._src = src,
            this._href = href,
            this._name = name
    }
}

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

router.get('/tictactoe', function(req, res) {
    res.render('games/tictactoe', {
        title: "Tic Tac Toe",
        playersOptions: playersOptionsTicTacToe,
        gameTable: gameTableSize
    });
})


module.exports = router;