const constants = function() {
    const _regExp = Object.freeze({
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        userName: /^[a-zA-ZãáàéêíóõúçÃÁÀÉÊÍÓÕÚÇ0-9._\-!@\s]+$/
    });
    const _pwd = Object.freeze({
        nrOfLetters: 26,
        nrOfNumbers: 10,
        nrOfSymbols: 31,
        totalChars: 93

    });
    const _game = Object.freeze({
        The_Machine: "The Machine",
        ENEMY: "enemy",
        PLAYERS: "players",
        PLAYER_ONE: "playerOne",
        PLAYER_TWO: "playerTwo",
        DIFFICULTY: "difficulty",
        FILPCOIN: "flipCoin",
        INTRO: "intro",
        HUMAN: "Human",
        CPU: "CPU",
        EASY: "easy",
        MEDIUM: "medium",
        HARD: "hard",
        HEADS: "heads",
        TAILS: "tails",
        GAME_TABLE: "game"
    });
    return {
        regExp: _regExp,
        pwd: _pwd,
        game: _game
    }
}

export default constants();