const express = require('express');
const tictactoe = require('../route-configurations/game-config/config-tictactoe');
const router = express.Router();

const gamesOptions = [];
gamesOptions.push(tictactoe.carouselOption);

router.get('/', function(req, res) {
    res.render('games/index', {
        title: "Game",
        options: gamesOptions
    });
})

router.get('/tictactoe', function(req, res) {
    res.render('games/tictactoe', {
        title: "Tic Tac Toe",
        playersOptions: tictactoe.playersOptions,
        gameTable: tictactoe.tableSize,
        inputs: tictactoe.inputs
    });
})


module.exports = router;