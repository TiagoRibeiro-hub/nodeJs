const constants = function() {
    const _pwd = Object.freeze({
        nrOfLetters: 26,
        nrOfNumbers: 10,
        nrOfSymbols: 31,
        totalChars: 93

    });
    const _game = Object.freeze({
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
        TAILS: "tails"
    });
    return {
        pwd: _pwd,
        game: _game
    }
}

export default constants();