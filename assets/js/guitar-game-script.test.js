/**
 * @jest-environment jsdom
 */

const {
  game,
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
  allLetter,
} = require("./guitar-game-script");

// This is listening for any error alerts
jest.spyOn(window, "alert").mockImplementation(() => {});

beforeAll(() => {
  let fs = require("fs");
  let fileContents = fs.readFileSync("guitar-game.html", "utf-8");
  document.open();
  document.write(fileContents);
  document.close();
});

describe("game object contains correct keys", () => {
  test("score key exists", () => {
    expect("score" in game).toBe(true);
  });
  test("gameTurn key exists", () => {
    expect("gameTurn" in game).toBe(true);
  });
  test("currentChord key exists", () => {
    expect("currentChord" in game).toBe(true);
  });
  test("choices key exists", () => {
    expect("choices" in game).toBe(true);
  });
  test("larrysMessage key exists", () => {
    expect("larrysMessage" in game).toBe(true);
  });
  test("larryCorrectChoice key exists", () => {
    expect("larryCorrectChoice" in game).toBe(true);
  });
  test("larryWrongChoice key exists", () => {
    expect("larryWrongChoice" in game).toBe(true);
  });
  test("score set to 0", () => {
    expect(game.score).toEqual(0);
  });
  test("gameTurn set to 0", () => {
    expect(game.gameTurn).toEqual(0);
  });
  test("larrysMessage set to empty string", () => {
    expect(game.larrysMessage).toEqual("");
  });
  test("currentChord set to empty string", () => {
    expect(game.currentChord).toEqual("");
  });
  test("choices contains correct options", () => {
    expect(game.choices).toEqual(["a", "c", "d", "e", "g"]);
  });
  test("larryCorrectChoice contains correct options", () => {
    expect(game.larryCorrectChoice).toEqual(["C1", "C2", "C3"]);
  });
  test("larryWrongChoice contains correct options", () => {
    expect(game.larryWrongChoice).toEqual(["W1", "W2", "W3"]);
  });
});
// ALL PASS

describe("betweenGameAppearance works correctly", () => {
  beforeAll(() => {
    game.gameTurn = 2;
    game.LarrysMessage = "W1";
    betweenGameAppearance();
  });
  test("larrysMessage is an empty string", () => {
    expect(game.larrysMessage).toEqual("");
  });
  test("gameTurn set to 0", () => {
    expect(game.gameTurn).toEqual(0);
  });
  test("#play-button display property should be empty, cancelling out the previous display: none property", () => {
    expect(document.getElementById("play-button").style.display).toBe("");
  });
  test("#chords-appear display property should be empty, cancelling out the previous display: none property", () => {
    expect(document.getElementById("chords-appear").style.display).toBe("");
  });
  test("#larry-welcome display property should be block", () => {
    expect(document.getElementById("larry-welcome").style.display).toBe(
      "block"
    );
  });
  test("#my-guess display property should be none, making it invisible", () => {
    expect(document.getElementById("my-guess").style.display).toBe("none");
  });
  test("#score-box display property should be none, making it invisible", () => {
    expect(document.getElementById("score-box").style.display).toBe("none");
  });
});
// ALL PASS

describe("newGame works correctly", () => {
  beforeAll(() => {
    game.score = 14;
    game.gameTurn = 9;
    document.getElementById("score").innerText = "42";
    newGame();
  });
  test("removes class that adds css styling to 'letter's only please' comment", () => {
    document
      .getElementById("larry-welcome")
      .classList.add("finished-game-message-margin-small");
    newGame();
    expect(
      document
        .getElementById("larry-welcome")
        .classList.contains("finished-game-message-margin-small")
    ).toBe(false);
  });
  test("should set game score to zero", () => {
    expect(game.score).toEqual(0);
  });
  test("should be a chord in currentChord", () => {
    expect(game.currentChord.length).toEqual(1);
  });
  test("should set gameTurn to zero, but the chordChange function inside makes the first chord gameTurn 1", () => {
    expect(game.gameTurn).toEqual(1);
  });
  test("randomChordGenerator function has been called", () => {
    expect(randomChordGenerator).toHaveBeenCalled;
  });
  test("p with id of score should display zero", () => {
    expect(document.getElementById("score").innerText).toBe(0);
  });
  test("#larry-welcome display property should be none, making it invisible", () => {
    expect(document.getElementById("larry-welcome").style.display).toBe("none");
  });
  test("#play-button display property should be none, making it invisible", () => {
    expect(document.getElementById("play-button").style.display).toBe("none");
  });
  test("#chords-appear display property should be none, making it invisible", () => {
    expect(document.getElementById("chords-appear").style.display).toBe("none");
  });
  test("#score-box display property should be an empty string, making it visible", () => {
    expect(document.getElementById("score-box").style.display).toBe("");
  });
  test("#my-guess display property should be an empty string, making it visible", () => {
    expect(document.getElementById("my-guess").style.display).toBe("");
  });
  test('#larry-first-move display property should set to "block", making it visible', () => {
    expect(document.getElementById("larry-first-move").style.display).toBe(
      "block"
    );
  });
});
// ALL PASS

describe("updateScore works correctly", () => {
  beforeAll(() => {
    game.score = 3;
    game.score++;
    game.gameTurn = 2;
    game.gameTurn++;
    updateScore();
  });
  test("game.score should be 4", () => {
    expect(game.score).toEqual(4);
  });
  test("The innertext for the element with the ID of score should have changed", () => {
    expect(document.getElementById("score").innerText).toBe(4);
  });
  test("game.gameTurn should be 3", () => {
    expect(game.gameTurn).toEqual(3);
  });
  test("The innertext for the element with the ID of round should have changed", () => {
    expect(document.getElementById("round").innerText).toBe(3);
  });
});
// ALL PASS

describe("randomChordGenerator and changeChord work correctly together", () => {
  beforeAll(() => {
    game.gameTurn = 0;
    randomChordGenerator();
  });
  test("cssChange function has been called", () => {
    expect(cssChange).toHaveBeenCalled;
  });
  test("updateScore function has been called", () => {
    expect(updateScore).toHaveBeenCalled;
  });
  test("finishGame function has been called, which only acts on gameTurn 11", () => {
    expect(finishGame).toHaveBeenCalled;
  });
  test("currentChord has a length of 1, this doesn't happen on page load so we know it's come from the function", () => {
    expect(game.currentChord.length).toBe(1);
  });
  test("The function should have added to gameTurn, which should now be 1", () => {
    expect(game.gameTurn).toEqual(1);
  });
  test("answer.value should be reset, giving the user an empty input box for the next turn", () => {
    expect(document.getElementById("answer-box").value).toEqual("");
  });
  test("#answer-box has focus", () => {
    expect(document.getElementById("answer-box").focus());
  });
});
// ALL PASS

describe("cssChange works correctly", () => {
  beforeAll(() => {
    newGame();
    game.currentChord = "c";
    cssChange();
  });
  test("cssChange has changed the image to the correct chord", () => {
    expect(document.getElementById('java-chord').src).toEqual("http://localhost/assets/images/c.webp");
  });
});
// ALL PASS

describe("checkAnswer works correctly", () => {
  beforeAll(() => {
    game.currentChord = "c";
    document.getElementById("answer-box").value = "C";
    checkAnswer();
  });
  test("#larry-first-move display set to none, making it invisible", () => {
    expect(document.getElementById("larry-first-move").style.display).toBe(
      "none"
    );
  });
  test("game.score increases", () => {
    expect(game.score).toBe(1);
  });
  test("larryMessage function has been called", () => {
    expect(larryMessage).toHaveBeenCalled;
  });
  test("Should display a correct message", () => {
    expect(
      game.larrysMessage == game.larryCorrectChoice[0] ||
        game.larryCorrectChoice[1] ||
        game.larryCorrectChoice[2]
    );
  });
});
// ALL PASS

describe("checkAnswer works correctly with wrong answers", () => {
  beforeAll(() => {
    game.currentChord = "d";
    document.getElementById("answer-box").value = "g";
    checkAnswer();
  });
  test("Should display a wrong message", () => {});
});
// ALL PASS

describe("finishGame works correctly", () => {
  test("Correct message should be shown when score is 0", () => {
    newGame();
    game.gameTurn = 11;
    game.score = 0;
    finishGame();
    expect(document.getElementById("larry-welcome").textContent).toBe(
      "Practice makes perfect! You've scored " + game.score + "/10!"
    );
  });
  test("finishGame should call the betweenGameAppearance function", () => {
    newGame();
    game.gameTurn = 11;
    finishGame();
    expect(betweenGameAppearance).toHaveBeenCalled;
  });
  test("Correct message should be shown when score is 4", () => {
    newGame();
    game.gameTurn = 11;
    game.score = 4;
    finishGame();
    expect(document.getElementById("larry-welcome").textContent).toEqual(
      "Practice makes perfect! You've scored " + game.score + "/10!"
    );
  });
  test("Correct message should be shown when score is 5", () => {
    newGame();
    game.gameTurn = 11;
    game.score = 5;
    finishGame();
    expect(document.getElementById("larry-welcome").textContent).toEqual(
      "Good Score! See if you can beat it! You've scored " + game.score + "/10!"
    );
  });
  test("Correct message should be shown when score is 7", () => {
    newGame();
    game.gameTurn = 11;
    game.score = 7;
    finishGame();
    expect(document.getElementById("larry-welcome").textContent).toEqual(
      "Good Score! See if you can beat it! You've scored " + game.score + "/10!"
    );
  });
  test("Correct message should be shown when score is 8", () => {
    newGame();
    game.gameTurn = 11;
    game.score = 8;
    finishGame();
    expect(document.getElementById("larry-welcome").textContent).toEqual(
      "Almost perfect! You've scored " + game.score + "/10!"
    );
  });
  test("Correct message should be shown when score is 10", () => {
    newGame();
    game.gameTurn = 11;
    game.score = 10;
    finishGame();
    expect(document.getElementById("larry-welcome").textContent).toEqual(
      "Wow! Congratulations! You've scored " + game.score + "/10!"
    );
  });
  test("Should make sure correct-one is not displayed", () => {
    newGame();
    game.gameTurn = 11;
    document.getElementById("larry-correct-one").style.display = "block";
    finishGame();
    expect(document.getElementById("larry-correct-one").style.display).toEqual(
      "none"
    );
  });
  test("Should make sure correct-two is not displayed", () => {
    newGame();
    game.gameTurn = 11;
    document.getElementById("larry-correct-two").style.display = "block";
    finishGame();
    expect(document.getElementById("larry-correct-two").style.display).toEqual(
      "none"
    );
  });
  test("Should make sure correct-three is not displayed", () => {
    newGame();
    game.gameTurn = 11;
    document.getElementById("larry-correct-three").style.display = "block";
    finishGame();
    expect(
      document.getElementById("larry-correct-three").style.display
    ).toEqual("none");
  });
  test("Should make sure wrong-one is not displayed", () => {
    newGame();
    game.gameTurn = 11;
    document.getElementById("larry-wrong-one").style.display = "block";
    finishGame();
    expect(document.getElementById("larry-wrong-one").style.display).toEqual(
      "none"
    );
  });
  test("Should make sure wrong-two is not displayed", () => {
    newGame();
    game.gameTurn = 11;
    document.getElementById("larry-wrong-two").style.display = "block";
    finishGame();
    expect(document.getElementById("larry-wrong-two").style.display).toEqual(
      "none"
    );
  });
  test("Should make sure wrong-three is not displayed", () => {
    newGame();
    game.gameTurn = 11;
    document.getElementById("larry-wrong-three").style.display = "block";
    finishGame();
    expect(document.getElementById("larry-wrong-three").style.display).toEqual(
      "none"
    );
  });
});
// ALL PASS

describe("randomCorrectGenerator works correctly", () => {
  beforeAll(() => {
    randomCorrectGenerator();
  });
  test("game.newMessage has content within the string", () => {
    expect(game.newMessage).not.toEqual("");
  });
  test("game.oldMessage has content within the string", () => {
    expect(game.newMessage).not.toEqual("");
  });
});
// ALL PASS

describe("randomWrongGenerator works correctly", () => {
  beforeAll(() => {
    randomWrongGenerator();
  });
  test("game.newMessage has content within the string", () => {
    expect(game.newMessage).not.toEqual("");
  });
  test("game.oldMessage has content within the string", () => {
    expect(game.newMessage).not.toEqual("");
  });
});
// ALL PASS

describe("checkIfCorrectIsSame works correctly", () => {
  test("game.larrysMessage should now equal C2, as it is different to game.oldMessage", () => {
    game.oldMessage = "C1";
    game.newMessage = "C2";
    checkIfCorrectIsSame();
    expect(game.larrysMessage).toEqual("C2");
  });
  test("game.larrysMessage should equal something other than C2, as the generator will be called again", () => {
    game.oldMessage = "C2";
    game.newMessage = "C2";
    checkIfCorrectIsSame();
    expect(game.larrysMessage).not.toEqual("C2");
  });
});
// ALL PASS

describe("checkIfWrongIsSame works correctly", () => {
  test("game.larrysMessage should now equal W2, as it is different to game.oldMessage", () => {
    game.oldMessage = "W1";
    game.newMessage = "W2";
    checkIfWrongIsSame();
    expect(game.larrysMessage).toEqual("W2");
  });
  test("game.larrysMessage should equal something other than W2, as the generator will be called again", () => {
    game.oldMessage = "W2";
    game.newMessage = "W2";
    checkIfWrongIsSame();
    expect(game.larrysMessage).not.toEqual("W2");
  });
});
// ALL PASS

describe("Players can't cheat", () => {
  test("Chord box 'a' can't be clicked when game is in play", () => {
    newGame();
    document.getElementById("a-chord").click();
    // Alert listener
    expect(window.alert).toBeCalledWith(
      "ERROR The game is in play! Don't cheat!"
    );
  });
  test("Chord box 'c' can't be clicked when game is in play", () => {
    newGame();
    document.getElementById("c-chord").click();
    // Alert listener
    expect(window.alert).toBeCalledWith(
      "ERROR The game is in play! Don't cheat!"
    );
  });
  test("Chord box 'd' can't be clicked when game is in play", () => {
    newGame();
    document.getElementById("d-chord").click();
    // Alert listener
    expect(window.alert).toBeCalledWith(
      "ERROR The game is in play! Don't cheat!"
    );
  });
  test("Chord box 'e' can't be clicked when game is in play", () => {
    newGame();
    document.getElementById("e-chord").click();
    // Alert listener
    expect(window.alert).toBeCalledWith(
      "ERROR The game is in play! Don't cheat!"
    );
  });
  test("Chord box 'g' can't be clicked when game is in play", () => {
    newGame();
    document.getElementById("g-chord").click();
    // Alert listener
    expect(window.alert).toBeCalledWith(
      "ERROR The game is in play! Don't cheat!"
    );
  });
});
// ALL PASS

describe("allLetters works correctly, displaying a message when a non-letter is entered", () => {
  test("answer-box contains the number '1'", () => {
    document.getElementById("answer-box").value = "1";
    allLetter();
    expect(document.getElementById("larry-welcome").textContent).toEqual(
      "Letters only please!"
    );
  });
  test("answer-box contains the character '?'", () => {
    document.getElementById("answer-box").value = "?";
    allLetter();
    expect(document.getElementById("larry-welcome").textContent).toEqual(
      "Letters only please!"
    );
  });
  test("answer-box contains the symbol '@'", () => {
    document.getElementById("answer-box").value = "@";
    allLetter();
    expect(document.getElementById("larry-welcome").textContent).toEqual(
      "Letters only please!"
    );
  });
});
//ALL PASS
