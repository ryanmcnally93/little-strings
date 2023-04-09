/**
 * @jest-environment jsdom
 */

const { game, newGame, updateScore, changeChord, cssChange, checkAnswer, gameFinished } = require("./guitar-game-script");

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
    test("playerMove key exists", () => {
        expect("playerMove" in game).toBe(true);
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
        game.playerMove = "a";
        document.getElementById('score').innerText = '42';
        newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should be a chord in currentChord", () => {
        expect(game.currentChord.length).toEqual(1);
    });
    test("should set gameTurn to one", () => {
        expect(game.gameTurn).toEqual(1);
    });
    test("should set playerMove to zero", () => {
        expect(game.playerMove.length).toEqual(0);
    });
    test("p with id of score should display zero", () => {
        expect(document.getElementById('score').innerText).toBe(0);
    });
});
//gameturn goes up

describe("changeChord works correctly", () => {
    beforeAll(() => {
        game.playerMove = "c";
        changeChord();
    });
    test("should set playerMove to zero", () => {
        expect(game.playerMove.length).toEqual(0);
    });
});

describe("cssChange works correctly", () => {
    beforeAll(() => {
        newGame();
        changeChord();
    });
    test("cssChange has added currentChord value to classList", () => {
        expect(game.currentChord).toEqual(document.getElementById('chord').classList[2]);
    });
    // test if a class is removed
    //check chord shadow transition once fixed
});