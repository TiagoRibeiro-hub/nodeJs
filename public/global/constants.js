const constants = function() {
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
        pwd: _pwd,
        game: _game
    }
}

export default constants();