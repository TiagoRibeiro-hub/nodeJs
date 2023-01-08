const { ElementConfig, InputConfig, CarouselOption } = require('../../models/element-model');

const carouselOption = new CarouselOption("/files/images/tic_tac_toe.png", "/game/tictactoe", "Game Tic Tac Toe");

const inputs = []
inputs.push({
    label: new ElementConfig(null, null, null, "Player one name :"),
    input: new InputConfig("text", "input-playerOne", "", "player one user name", null),
    span: new ElementConfig(null, null, null, "Player one name can only contain letters, numbers and this symbols ._-!@")
}, {
    label: new ElementConfig("lbl-playerTwo", "hidden", null, "Player two name :"),
    input: new InputConfig("text", "input-playerTwo", "hidden", "player two user name", null),
    span: new ElementConfig(null, null, null, "Player two name can only contain letters, numbers and this symbols ._-!@")
})

const tableSize = [];
for (let i = 0; i < 9; i++) {
    tableSize.push(i);
}

const playersOptions = [];
playersOptions.push("X", "O");

module.exports = {
    carouselOption,
    inputs,
    tableSize,
    playersOptions
}