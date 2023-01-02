const express = require('express');
const router = express.Router();

const gamesOptions = [];
gamesOptions.push("https://source.unsplash.com/random/250x250/?beach", "https://source.unsplash.com/random/250x250/?animal", "https://source.unsplash.com/random/250x250/?street");

router.get('/', function(req, res) {
    res.render('games/index', {
        title: "Game",
        images: gamesOptions
    });
})

router.get('/tictactoe', function(req, res) {
    res.render('games/tictactoe');
})


module.exports = router;