document.addEventListener("DOMContentLoaded", function() {
//insert css changes in display: none items on page load.
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
});

let game = {
    score: 0,
    gameTurn: 0,
    currentChord: "",
    choices: ["a","c","d","e","g"],
}

function newGame() {
    game.score = 0;
    game.gameTurn = 0;
    changeChord();
    let button = document.getElementById('submit-game');
    button.addEventListener("click", function() {
        checkAnswer();
    });
}

//add data-listener to event listener buttons

function updateScore() {
    document.getElementById('score').innerText = game.score;
}

function changeChord() {
    game.currentChord = game.choices[(Math.floor(Math.random() * 5))];
    cssChange()
    game.gameTurn++;
    updateScore();
    let answer = document.getElementById("answer-box");
    answer.value = "";
    answer.focus();
    finishGame();
}

function cssChange() {
    if (game.currentChord == "a") {
        document.getElementById('chord').classList.remove("c", "d", "e", "g");
    } else if (game.currentChord == "c") {
        document.getElementById('chord').classList.remove("a", "d", "e", "g");
    } else if (game.currentChord == "d") {
        document.getElementById('chord').classList.remove("a", "c", "e", "g");
    } else if (game.currentChord == "e") {
        document.getElementById('chord').classList.remove("a", "c", "d", "g");
    } else {
        document.getElementById('chord').classList.remove("a", "c", "d", "e");
    }
    document.getElementById('chord').classList.add(game.currentChord);
}

function checkAnswer() {
    let userAnswer = document.getElementById("answer-box").value;
    let actualAnswer = game.currentChord;
    let isCorrect = userAnswer == actualAnswer;

    if (isCorrect) {
        alert("Correct!");
        game.score++;
        changeChord();
        document.getElementById('chord').classList.add('chord-shadow-green');
        setTimeout(() => {
            document.getElementById('chord').classList.remove('chord-shadow-green');
        }, 500);
    } else {
        alert("Wrong!");
        changeChord();
        document.getElementById('chord').classList.add('chord-shadow-red');
        setTimeout(() => {
            document.getElementById('chord').classList.remove('chord-shadow-red');
        }, 500);
    }
}

function finishGame() {
    if (game.gameTurn == 11) {
        alert("Congratulations! You've scored " + game.score + "/10!");
        newGame();
    }
}

module.exports = { game, newGame, updateScore, changeChord, cssChange, checkAnswer, finishGame };

/*
userTurn()

assign id from current game array to 'button'


*/ 