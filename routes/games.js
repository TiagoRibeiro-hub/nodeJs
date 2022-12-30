const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('games/index');
})

router.get('/tictactoe', (req, res) => {
    res.render('games/tictactoe');
})


module.exports = router;