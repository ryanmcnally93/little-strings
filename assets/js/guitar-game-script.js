let game = {
    score: 0,
    gameTurn: 0,
    currentChord: [],
    playerMove: [],
    choices: ["a","c","d","e","g"],
}

function newGame() {
    game.score = 0;
    game.gameTurn = 0;
    game.playerMove = [];
    updateScore();
    changeChord();
}

function updateScore() {
    document.getElementById('score').innerText = game.score;
}

function changeChord() {
    game.playerMove = [];
    game.currentChord.push(game.choices[(Math.floor(Math.random() * 4))]);
    //cssChange()
}

module.exports = { game, newGame, updateScore, changeChord };

/*
changeChord()
cssChange()
userTurn()
*/ 