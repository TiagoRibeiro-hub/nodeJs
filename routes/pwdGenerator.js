const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('pwdGenerator/index', {
        title: "Password Generator"
    });
})

module.exports = router;