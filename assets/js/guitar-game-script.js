document.addEventListener("DOMContentLoaded", function () {
  betweenGameAppearance();
  document
    .getElementById("answer-box")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        // Runs the check answer function when 'enter' is pressed
        checkAnswer();
      }
    });

  let buttons = document.getElementsByTagName("button");
  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "submit") {
        checkAnswer();
      } else if (
        this == document.getElementById("a-chord") &&
        game.gameTurn > 0
      ) {
        console.log("ERROR The game is in play! Don't cheat!");
        alert("ERROR The game is in play! Don't cheat!");
      } else if (
        this == document.getElementById("c-chord") &&
        game.gameTurn > 0
      ) {
        console.log("ERROR The game is in play! Don't cheat!");
        alert("ERROR The game is in play! Don't cheat!");
      } else if (
        this == document.getElementById("d-chord") &&
        game.gameTurn > 0
      ) {
        console.log("ERROR The game is in play! Don't cheat!");
        alert("ERROR The game is in play! Don't cheat!");
      } else if (
        this == document.getElementById("e-chord") &&
        game.gameTurn > 0
      ) {
        console.log("ERROR The game is in play! Don't cheat!");
        alert("ERROR The game is in play! Don't cheat!");
      } else if (
        this == document.getElementById("g-chord") &&
        game.gameTurn > 0
      ) {
        console.log("ERROR The game is in play! Don't cheat!");
        alert("ERROR The game is in play! Don't cheat!");
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
      } else if (this == document.getElementById("burger-icon")) {
        console.log("Burger icon clicked!");
      } else {
        alert("Error! A button has been clicked that should not exist.");
        console.log("Error! A button has been clicked that should not exist.");
      }
    });
  }
});

let divs = document.getElementsByTagName("div");
for (let div of divs) {
  div.addEventListener("click", function () {
    if (this == document.getElementById("play-button")) {
      newGame();
    }
  });
}

let game = {
  score: 0,
  // This is the current message
  larrysMessage: "",
  // This is the three different 'correct' responses
  larryCorrectChoice: ["C1", "C2", "C3"],
  // This is the three different 'wrong' responses
  larryWrongChoice: ["W1", "W2", "W3"],
  gameTurn: 0,
  currentChord: "",
  // These are the guitar chord posibilities
  choices: ["a", "c", "d", "e", "g"],
  // This is the last message 'Larry' said
  oldMessage: "",
  // This is what the new message will be, unless it is the same as before.
  // In that case, a new value will be generated
  newMessage: "",
};

function betweenGameAppearance() {
  game.larrysMessage = "";
  // Making the gameTurn 0 at this point means that the alert will not pop up when chord boxes are clicked
  game.gameTurn = 0;
  // Making the game components invisible and displaying the chords, so the user can practice
  document.getElementById("play-button").style.display = null;
  document.getElementById("chords-appear").style.display = null;
  document.getElementById("larry-welcome").style.display = "block";
  document.getElementById("my-guess").style.display = "none";
  document.getElementById("score-box").style.display = "none";
}

function newGame() {
  // Making the score, and answer box visible
  document.getElementById("my-guess").style.display = null;
  document.getElementById("score-box").style.display = null;
  document.getElementById("larry-welcome").style.display = "none";
  document.getElementById("larry-first-move").style.display = "block";
  document.getElementById("play-button").style.display = "none";
  // Removing 'Letter's only please' message CSS
  document
    .getElementById("larry-welcome")
    .classList.remove("finished-game-message-margin-small");
  // Taking away the chords so the user cannot cheat
  document.getElementById("chords-appear").style.display = "none";
  // Reseting the game state
  game.score = 0;
  game.gameTurn = 0;
  // Generating the first chord
  randomChordGenerator();
}

function updateScore() {
  // Making the number in the score box go up with correct answers
  document.getElementById("score").innerText = game.score;
  document.getElementById("round").innerText = game.gameTurn;
}

function randomChordGenerator() {
  // Setting the current chord as the old one, as we are about to create a new one
  let previousChord = game.currentChord;
  // This is the creation of a new chord
  let newChord = game.choices[Math.floor(Math.random() * 5)];
  // If we have the same chord as last time, start the function again
  // If not then we're good to play
  if (newChord == previousChord) {
    randomChordGenerator();
  } else {
    game.currentChord = newChord;
    changeChord();
  }
}

function changeChord() {
  // Changes the chord image
  cssChange();
  game.gameTurn++;
  updateScore();
  // Sets an empty value in the answer box, so the user doesn't have to keep deleting the old answer
  let answer = document.getElementById("answer-box");
  answer.value = "";
  // Makes the answer box ready to type on each new turn, meaning we don't have to click on the box to enter our next answer
  answer.focus();
  // Has an if statement for gameturn 11, so this does nothing until the end of the game
  finishGame();
}

function cssChange() {
  // This if statement changes the image source, so it is the same as the game.currentChord
  if (game.currentChord == "a") {
    document.getElementById("java-chord").src = "./assets/images/a.webp";
  } else if (game.currentChord == "c") {
    document.getElementById("java-chord").src = "./assets/images/c.webp";
  } else if (game.currentChord == "d") {
    document.getElementById("java-chord").src = "./assets/images/d.webp";
  } else if (game.currentChord == "e") {
    document.getElementById("java-chord").src = "./assets/images/e.webp";
  } else {
    document.getElementById("java-chord").src = "./assets/images/g.webp";
  }
}

function checkAnswer() {
  let userAnswer = document.getElementById("answer-box").value;
  // Makes sure that if uppercase correct answers are inserted, they are still accepted
  let lowerAnswer = userAnswer.toLowerCase();
  let actualAnswer = game.currentChord;
  let isCorrect = lowerAnswer == actualAnswer;
  // Gets rid of the 'question' message given on the first chord
  document.getElementById("larry-first-move").style.display = "none";
  document.getElementById("larry-welcome").style.display = "none";
  let message = document.getElementById("larry-welcome");
  message.classList.remove("letters-only-please");
  if (isCorrect) {
    randomCorrectGenerator();
    // This if statement takes the values given in the larry correct array, and assigns them to the correct id's
    if (game.larrysMessage === "C1") {
      game.larrysMessage = document.getElementById("larry-correct-one");
    } else if (game.larrysMessage === "C2") {
      game.larrysMessage = document.getElementById("larry-correct-two");
    } else {
      game.larrysMessage = document.getElementById("larry-correct-three");
    }
    // The answer is correct, so the score is increased
    game.score++;
    // Green shadow on the image, more verification that the answer inserted was correct.
    document.getElementById("java-chord").classList.add("chord-shadow-green");
    setTimeout(() => {
      document
        .getElementById("java-chord")
        .classList.remove("chord-shadow-green");
    }, 500);
  } else {
    randomWrongGenerator();
    if (game.larrysMessage === "W1") {
      game.larrysMessage = document.getElementById("larry-wrong-one");
    } else if (game.larrysMessage === "W2") {
      game.larrysMessage = document.getElementById("larry-wrong-two");
    } else {
      game.larrysMessage = document.getElementById("larry-wrong-three");
    }
    document.getElementById("java-chord").classList.add("chord-shadow-red");
    setTimeout(() => {
      document
        .getElementById("java-chord")
        .classList.remove("chord-shadow-red");
    }, 500);
  }
  larryMessage();
  // Checking whether input was a letter or not
  allLetter();
  // Starting the next move
  randomChordGenerator();
}

function randomCorrectGenerator() {
  // This code generates a random correct answer
  game.newMessage = game.larryCorrectChoice[Math.floor(Math.random() * 3)];
  if (
    game.larrysMessage == document.getElementById("larry-correct-one") ||
    game.larrysMessage == "C1"
  ) {
    game.oldMessage = "C1";
  } else if (
    game.larrysMessage == document.getElementById("larry-correct-two") ||
    game.larrysMessage == "C2"
  ) {
    game.oldMessage = "C2";
  } else if (
    game.larrysMessage == document.getElementById("larry-correct-three") ||
    game.larrysMessage == "C3"
  ) {
    game.oldMessage = "C3";
  } else {
    game.oldMessage = "A wrong answer";
  }
  checkIfCorrectIsSame();
}

function checkIfCorrectIsSame() {
  // Does exactly what is said, testing to see if the generator needs to be called again to return a different message
  if (game.newMessage == game.oldMessage) {
    randomCorrectGenerator();
  } else {
    game.larrysMessage = game.newMessage;
  }
}

function randomWrongGenerator() {
  game.newMessage = game.larryWrongChoice[Math.floor(Math.random() * 3)];
  if (
    game.larrysMessage == document.getElementById("larry-wrong-one") ||
    game.larrysMessage == "W1"
  ) {
    game.oldMessage = "W1";
  } else if (
    game.larrysMessage == document.getElementById("larry-wrong-two") ||
    game.larrysMessage == "W2"
  ) {
    game.oldMessage = "W2";
  } else if (
    game.larrysMessage == document.getElementById("larry-wrong-three") ||
    game.larrysMessage == "W3"
  ) {
    game.oldMessage = "W3";
  } else {
    game.oldMessage = "A correct answer";
  }
  checkIfWrongIsSame();
}

function checkIfWrongIsSame() {
  if (game.newMessage == game.oldMessage) {
    randomWrongGenerator();
  } else {
    game.larrysMessage = game.newMessage;
  }
}

function larryMessage() {
  let C1 = document.getElementById("larry-correct-one");
  let C2 = document.getElementById("larry-correct-two");
  let C3 = document.getElementById("larry-correct-three");
  let corrects = [C1, C2, C3];
  let W1 = document.getElementById("larry-wrong-one");
  let W2 = document.getElementById("larry-wrong-two");
  let W3 = document.getElementById("larry-wrong-three");
  let wrongs = [W1, W2, W3];

  // This for loop looks for the message that larrysmessage has been assigned, and makes it visible, and the previous message invisible
  for (let i = 0; i < corrects.length; i++) {
    if (corrects[i] == game.larrysMessage) {
      corrects[i].style.display = "block";
    } else corrects[i].style.display = "none";
  }
  for (let i = 0; i < wrongs.length; i++) {
    if (wrongs[i] == game.larrysMessage) {
      wrongs[i].style.display = "block";
    } else wrongs[i].style.display = "none";
  }
}

function finishGame() {
  // This if statement controls the finishing statement made by Larry
  // The response he produces depends on the end score of the user
  if (game.gameTurn == 11) {
    document.getElementById("larry-correct-one").style.display = "none";
    document.getElementById("larry-correct-two").style.display = "none";
    document.getElementById("larry-correct-three").style.display = "none";
    document.getElementById("larry-wrong-one").style.display = "none";
    document.getElementById("larry-wrong-two").style.display = "none";
    document.getElementById("larry-wrong-three").style.display = "none";
    let message = document.getElementById("larry-welcome");
    if (game.score < 5) {
      message.textContent =
        "Practice makes perfect! You've scored " + game.score + "/10!";
      message.style.display = "block";
      message.style.marginTop = "55px";
      message.classList.add("finished-game-message-margin-small");
      betweenGameAppearance();
    } else if (game.score >= 5 && game.score < 8) {
      message.textContent =
        "Good Score! See if you can beat it! You've scored " +
        game.score +
        "/10!";
      message.style.display = "block";
      message.style.marginTop = "55px";
      message.classList.add("finished-game-message-margin-small");
      betweenGameAppearance();
    } else if (game.score >= 8 && game.score < 10) {
      message.textContent =
        "Almost perfect! You've scored " + game.score + "/10!";
      message.style.display = "block";
      message.style.marginTop = "55px";
      message.classList.add("finished-game-message-margin-small");
      betweenGameAppearance();
    } else {
      message.textContent =
        "Wow! Congratulations! You've scored " + game.score + "/10!";
      message.style.display = "block";
      message.style.marginTop = "55px";
      message.classList.add("finished-game-message-margin-small");
      betweenGameAppearance();
    }
  }
}

function allLetter() {
  let message = document.getElementById("larry-welcome");
  var letters = /^[A-Za-z]+$/;
  if (document.getElementById("answer-box").value.match(letters)) {
    return true;
  } else {
    document.getElementById("larry-wrong-one").style.display = "none";
    document.getElementById("larry-wrong-two").style.display = "none";
    document.getElementById("larry-wrong-three").style.display = "none";
    message.textContent = "Letters only please!";
    message.style.display = "block";
    message.classList.add("letters-only-please");
    console.log(document.getElementById("answer-box").value);
    return false;
  }
}
if (typeof module !== "undefined") {
  module.exports = {
    game,
    allLetter,
    newGame,
    updateScore,
    changeChord,
    cssChange,
    checkAnswer,
    finishGame,
    betweenGameAppearance,
    larryMessage,
    randomChordGenerator,
    randomCorrectGenerator,
    randomWrongGenerator,
    checkIfCorrectIsSame,
    checkIfWrongIsSame,
  };
}
