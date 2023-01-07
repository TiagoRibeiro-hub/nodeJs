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

playersOptionsTicTacToe = [];
playersOptionsTicTacToe.push("X", "O");

router.get('/tictactoe', function(req, res) {
    res.render('games/tictactoe', {
        title: "Tic Tac Toe",
        playersOptions: playersOptionsTicTacToe
    });
})


module.exports = router;