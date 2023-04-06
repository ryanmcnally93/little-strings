let game = {
    score: 0,
    gameTurn: 0,
    currentChord: [],
    chordChange: [],
    playerMove: [],
    choices: ["a","c","d","e","g"],
}

function newGame() {
    game.score = 0;
    game.gameTurn = 0;
    game.playerMove = [];
    game.currentChord = document.getElementById('chord').classList[2];
    updateScore();
    changeChord();
}

function updateScore() {
    document.getElementById('score').innerText = game.score;
}

function changeChord() {
    game.playerMove = [];
    game.chordChange.push(game.choices[(Math.floor(Math.random() * 5))]);
    cssChange()
    game.chordChange.splice(0, 1);
}

function cssChange() {
    if (game.chordChange == "a") {
        document.getElementById('chord').classList.remove("c", "d", "e", "g");
    } else if (game.chordChange == "c") {
        document.getElementById('chord').classList.remove("a", "d", "e", "g");
    } else if (game.chordChange == "d") {
        document.getElementById('chord').classList.remove("a", "c", "e", "g");
    } else if (game.chordChange == "e") {
        document.getElementById('chord').classList.remove("a", "c", "d", "g");
    } else {
        document.getElementById('chord').classList.remove("a", "c", "d", "e");
    }
    document.getElementById('chord').classList.add(game.chordChange[0]);
}

module.exports = { game, newGame, updateScore, changeChord, cssChange };

/*
userTurn()

assign id from current game array to 'button'


*/ 