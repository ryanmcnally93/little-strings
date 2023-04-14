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
            } else if (this == document.getElementById("a-chord")) {
                game.currentChord = "a";
                cssChange();
            } else if (this == document.getElementById("c-chord")) {
                game.currentChord = "c";
                cssChange();
            } else if (this == document.getElementById("d-chord")) {
                game.currentChord = "d";
                cssChange();
            } else if (this == document.getElementById("e-chord")) {
                game.currentChord = "e";
                cssChange();
            } else if (this == document.getElementById("g-chord")) {
                game.currentChord = "g";
                cssChange();
            } else {
                alert("Error! A button has been clicked that should not exist.");
                console.log("Error! A button has been clicked that should not exist.");
            }
        });
    }
});

let C1 = document.getElementById('larry-correct-one');
let C2 = document.getElementById('larry-correct-two');
let C3 = document.getElementById('larry-correct-three');
let W1 = document.getElementById('larry-wrong-one');
let W2 = document.getElementById('larry-wrong-two');
let W3 = document.getElementById('larry-wrong-three');

let game = {
    score: 0,
    larrysMessage: "",
    larryCorrectChoice: [C1, C2, C3],
    larryWrongChoice: [W1, W2, W3],
    gameTurn: 0,
    currentChord: "",
    choices: ["a","c","d","e","g"],
}

function betweenGameAppearance() {
    game.larrysMessage = "";
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
    lowerAnswer = userAnswer.toLowerCase();
    let actualAnswer = game.currentChord;
    let isCorrect = lowerAnswer == actualAnswer;
    document.getElementById('larry-first-move').style.display = "none";

    if (isCorrect) {
        game.larrysMessage = game.larryCorrectChoice[(Math.floor(Math.random() * 3))];
        game.score++;
        changeChord();
        document.getElementById('chord').classList.add('chord-shadow-green');
        setTimeout(() => {
            document.getElementById('chord').classList.remove('chord-shadow-green');
        }, 500);
    } else {
        game.larrysMessage = game.larryWrongChoice[(Math.floor(Math.random() * 3))];
        changeChord();
        document.getElementById('chord').classList.add('chord-shadow-red');
        setTimeout(() => {
            document.getElementById('chord').classList.remove('chord-shadow-red');
        }, 500);
    }
    larryMessage();
}

function larryMessage() {
    for (i = 0; i < game.larryCorrectChoice.length; i++) {
        if (game.larryCorrectChoice[i] === game.larrysMessage) {
            game.larryCorrectChoice[i].style.display = "block";
        } else
            game.larryCorrectChoice[i].style.display = "none";
    }
    for (i = 0; i < game.larryWrongChoice.length; i++) {
        if (game.larryWrongChoice[i] === game.larrysMessage) {
            game.larryWrongChoice[i].style.display = "block";
        } else
            game.larryWrongChoice[i].style.display = "none";
    }
}

function finishGame() {
    if (game.gameTurn == 11) {
        let message = document.getElementById('larry-welcome');
        if (game.score < 5) {
            message.textContent ="Practice makes perfect! You've scored " + game.score + "/10!";
            message.style.display = "block";
            message.style.marginTop = "60px";
            betweenGameAppearance();
        } else if (game.score >= 5 && game.score < 8) {
            message.textContent ="Good Score! See if you can beat it! You've scored " + game.score + "/10!";
            message.style.display = "block";
            message.style.marginTop = "60px";
            betweenGameAppearance();
        } else if (game.score >= 8 && game.score < 10) {
            message.textContent ="Almost perfect! You've scored " + game.score + "/10!";
            message.style.display = "block";
            message.style.marginTop = "60px";
            betweenGameAppearance();
        } else {
            message.textContent ="Wow! Congratulations! You've scored " + game.score + "/10!";
            message.style.display = "block";
            message.style.marginTop = "60px";
            betweenGameAppearance();
        }
    }
}

module.exports = { game, newGame, updateScore, changeChord, cssChange, checkAnswer, finishGame, betweenGameAppearance, larryMessage };