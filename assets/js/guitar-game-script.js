document.addEventListener("DOMContentLoaded", function() {
    betweenGameAppearance();
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            }
        });
    }
});

let game = {
    score: 0,
    gameTurn: 0,
    currentChord: "",
    choices: ["a","c","d","e","g"],
}

function betweenGameAppearance() {
    document.getElementById('play-button').style.display = null;
    document.getElementById('chords-appear').style.display = null;
    document.getElementById('larry-welcome').style.display = "block";
    document.getElementById('my-guess').style.display = "none";
    document.getElementById('score-box').style.display = "none";
}

function newGame() {
    document.getElementById('my-guess').style.display = null;
    document.getElementById('score-box').style.display = null;
    document.getElementById('larry-welcome').style.display = "none";
    document.getElementById('larry-first-move').style.display = "block";
    document.getElementById('play-button').style.display = "none";
    document.getElementById('chords-appear').style.display = "none";
    game.score = 0;
    game.gameTurn = 0;
    changeChord();
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
        betweenGameAppearance();
    }
}

module.exports = { game, newGame, updateScore, changeChord, cssChange, checkAnswer, finishGame, betweenGameAppearance };

// On page load
// #my-guess needs to be invisible
// #score-box needs to be invisible

//On newGame()
// The same two need to now be visible
// The play button needs to be invisible
// #chords-appear needs to disappear

/*
userTurn()

assign id from current game array to 'button'


*/ 