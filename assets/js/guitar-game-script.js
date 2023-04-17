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

let game = {
    score: 0,
    larrysMessage: "",
    larryCorrectChoice: ["C1", "C2", "C3"],
    larryWrongChoice: ["W1", "W2", "W3"],
    gameTurn: 0,
    currentChord: "",
    choices: ["a","c","d","e","g"],
    oldMessage: "",
    newMessage: "",
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
    randomChordGenerator();
}

function updateScore() {
    document.getElementById('score').innerText = game.score;
}

function randomChordGenerator() {
    let previousChord = game.currentChord;
    let newChord = game.choices[(Math.floor(Math.random() * 5))];
    if (newChord == previousChord) {
        randomChordGenerator();
    } else {
        game.currentChord = newChord;
        changeChord();
    }
}

function changeChord() {
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

function randomCorrectGenerator() {
    game.newMessage = game.larryCorrectChoice[(Math.floor(Math.random() * 3))];
    if (game.larrysMessage == document.getElementById('larry-correct-one') || game.larrysMessage == "C1") {
        game.oldMessage = "C1";
    } else if (game.larrysMessage == document.getElementById('larry-correct-two') || game.larrysMessage == "C2") {
        game.oldMessage = "C2";
    } else if (game.larrysMessage == document.getElementById('larry-correct-three') || game.larrysMessage == "C3") {
        game.oldMessage = "C3";
    } else {
        game.oldMessage = "A wrong answer";
    }
    checkIfCorrectIsSame()
}

function checkIfCorrectIsSame() {
    if (game.newMessage == game.oldMessage) {
        randomCorrectGenerator();
    } else {
        game.larrysMessage = game.newMessage;
    }
}

function randomWrongGenerator() {
    game.newMessage = game.larryWrongChoice[(Math.floor(Math.random() * 3))];
    if (game.larrysMessage == document.getElementById('larry-wrong-one') || game.larrysMessage == "W1") {
        game.oldMessage = "W1";
    } else if (game.larrysMessage == document.getElementById('larry-wrong-two') || game.larrysMessage == "W2") {
        game.oldMessage = "W2";
    } else if (game.larrysMessage == document.getElementById('larry-wrong-three') || game.larrysMessage == "W3") {
        game.oldMessage = "W3";
    } else {
        game.oldMessage = "A correct answer";
    }
    checkIfWrongIsSame()
}

function checkIfWrongIsSame() {
    if (game.newMessage == game.oldMessage) {
        randomWrongGenerator();
    } else {
        console.log(game.larrysMessage);
        game.larrysMessage = game.newMessage;
    }
}

function checkAnswer() {
    let userAnswer = document.getElementById("answer-box").value;
    lowerAnswer = userAnswer.toLowerCase();
    let actualAnswer = game.currentChord;
    let isCorrect = lowerAnswer == actualAnswer;
    document.getElementById('larry-first-move').style.display = "none";

    if (isCorrect) {
        randomCorrectGenerator()
        if (game.larrysMessage === "C1") {
            game.larrysMessage = document.getElementById('larry-correct-one');
        } else if (game.larrysMessage === "C2") {
            game.larrysMessage = document.getElementById('larry-correct-two');
        } else {
            game.larrysMessage = document.getElementById('larry-correct-three');
        }
        game.score++;
        randomChordGenerator();
        document.getElementById('chord').classList.add('chord-shadow-green');
        setTimeout(() => {
            document.getElementById('chord').classList.remove('chord-shadow-green');
        }, 500);
    } else {
        randomWrongGenerator()
        if (game.larrysMessage === "W1") {
            game.larrysMessage = document.getElementById('larry-wrong-one');
        } else if (game.larrysMessage === "W2") {
            game.larrysMessage = document.getElementById('larry-wrong-two');
        } else {
            game.larrysMessage = document.getElementById('larry-wrong-three');
        }
        randomChordGenerator();
        document.getElementById('chord').classList.add('chord-shadow-red');
        setTimeout(() => {
            document.getElementById('chord').classList.remove('chord-shadow-red');
        }, 500);
    }
    larryMessage();
}

function larryMessage() {
    let C1 = document.getElementById('larry-correct-one');
    let C2 = document.getElementById('larry-correct-two');
    let C3 = document.getElementById('larry-correct-three');
    let corrects = [C1, C2, C3];
    let W1 = document.getElementById('larry-wrong-one');
    let W2 = document.getElementById('larry-wrong-two');
    let W3 = document.getElementById('larry-wrong-three');
    let wrongs = [W1, W2, W3];

    for (i = 0; i < corrects.length; i++) {
        if (corrects[i] == game.larrysMessage) {
            corrects[i].style.display = "block";
        } else
            corrects[i].style.display = "none";
    }
    for (i = 0; i < wrongs.length; i++) {
        if (wrongs[i] == game.larrysMessage) {
            wrongs[i].style.display = "block";
        } else
            wrongs[i].style.display = "none";
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

module.exports = { game, newGame, updateScore, changeChord, cssChange, checkAnswer, finishGame, betweenGameAppearance, larryMessage, randomChordGenerator, randomCorrectGenerator, randomWrongGenerator, checkIfCorrectIsSame, checkIfWrongIsSame };