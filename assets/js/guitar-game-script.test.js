/**
 * @jest-environment jsdom
 */

const { createTestScheduler } = require("jest");
const { game, newGame, updateScore, changeChord, cssChange, checkAnswer, finishGame, betweenGameAppearance } = require("./guitar-game-script");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("guitar-game.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
})

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
    test("choices contains correct options", () => {
        expect(game.choices).toEqual(["a","c","d","e","g"]);
    });
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 14;
        game.gameTurn = 9;
        document.getElementById('score').innerText = '42';
        newGame();
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
    test("p with id of score should display zero", () => {
        expect(document.getElementById('score').innerText).toBe(0);
    });
    test("newGame should contain checkAnswer function", () => {
        expect(checkAnswer).toHaveBeenCalled;
    })
});
//gameturn goes up

describe("updateScore works correctly", () => {
    beforeAll(() => {
        game.score = 3;
        game.score++;
        updateScore();
    });
    test("Update score should have changed game.score to 4", () => {
        expect(game.score).toEqual(4);
    });
    test("The innertext for the element with the if of score should have changed", () => {
        expect(document.getElementById('score').innerText).toBe(4);
    });
});

describe("changeChord works correctly", () => {
    beforeAll(() => {
        game.gameTurn = 0;
        changeChord();
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
});

describe("cssChange works correctly", () => {
    beforeAll(() => {
        newGame();
        game.currentChord = "c";
        cssChange();
    });
    test("cssChange has added currentChord value to classList", () => {
        expect(game.currentChord).toEqual(document.getElementById('chord').classList[2]);
    });
    test("None of the following classes should be in the classList 'a', 'd', 'e', 'g' - but 'c' should", () => {
        expect(document.getElementById('chord').classList.contains("a")).toBe(false);
        expect(document.getElementById('chord').classList.contains("c")).toBe(true);
        expect(document.getElementById('chord').classList.contains("d")).toBe(false);
        expect(document.getElementById('chord').classList.contains("e")).toBe(false);
        expect(document.getElementById('chord').classList.contains("g")).toBe(false);
    });
    
describe("checkAnswer works correctly", () => {
    beforeAll(() => {
        game.score = 0;
        game.currentChord = "a";
        document.getElementById("answer-box").value = "a";
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        checkAnswer();
    });
    test('game.score should have increased, as the two values are the same', () => {
        expect(game.score).toEqual(1);
    });
    test("Alert containing the message 'Correct!' was called", () => {
        expect(window.alert).toBeCalledWith('Correct!');
    });
    beforeEach(() => {
        game.currentChord = 'a';
        document.getElementById('answer-box').value = 'c';
        checkAnswer();
    });
    test('Alert containing the message "Wrong!" was called', () => {
        expect(window.alert).toBeCalledWith('Wrong!');
    });
});

describe("finishGame works correctly", () => {
    beforeAll(() => {
        finishGame();
    });
    test('finishGame should call the betweenGameAppearance function', () => {
        expect(betweenGameAppearance).toHaveBeenCalled;
    });
});

});

//visual tests

// when answer is correct, turns shadow green
// when answer is wrong, turns shadow red
// congratulations message