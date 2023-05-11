/**
 * @jest-environment jsdom
 */

 const {  } = require("./lessons-script");

 beforeAll(() => {
     let fs = require("fs");
     let fileContents = fs.readFileSync("lessons.html", "utf-8");
     document.open();
     document.write(fileContents);
     document.close();
 })
 
 describe("Select options display the correct chords", () => {
    test("A is selected", () => {
        selectedKey == "A";
        expect(document.getElementById('javascript-key').innerText).toEqual("A - D - E - F#m - Bm - C#m");
    });
    test("A# is selected", () => {
        selectedKey == "A#";
        expect(document.getElementById('javascript-key').innerText).toEqual("A# - D# - F - Gm - Cm - Dm");
    });
    test("B is selected", () => {
        selectedKey == "B";
        expect(document.getElementById('javascript-key').innerText).toEqual("B - E - F# - G#m - C#m - D#m");
    });
    test("C is selected", () => {
        selectedKey == "C";
        expect(document.getElementById('javascript-key').innerText).toEqual("C - F - G - Am - Dm - Em");
    });
    test("C# is selected", () => {
        selectedKey == "C#";
        expect(document.getElementById('javascript-key').innerText).toEqual("C# - F# - G# - A#m - D#m - Fm");
    });
    test("D is selected", () => {
        selectedKey == "D";
        expect(document.getElementById('javascript-key').innerText).toEqual("D - G - A - Bm - Em - F#m");
    });
    test("D# is selected", () => {
        selectedKey == "D#";
        expect(document.getElementById('javascript-key').innerText).toEqual("D# - G# - A# - Cm - Fm - Gm");
    });
    test("E is selected", () => {
        selectedKey == "E";
        expect(document.getElementById('javascript-key').innerText).toEqual("E - A - B - C#m - F#m - G#m");
    });
    test("F is selected", () => {
        selectedKey == "F";
        expect(document.getElementById('javascript-key').innerText).toEqual("F - A# - C - Dm - Gm - Am");
    });
    test("F# is selected", () => {
        selectedKey == "F#";
        expect(document.getElementById('javascript-key').innerText).toEqual("F# - B - C# - D#m - G#m - A#m");
    });
    test("G is selected", () => {
        selectedKey == "G";
        expect(document.getElementById('javascript-key').innerText).toEqual("G - C - D - Em - Am - Bm");
    });
    test("G# is selected", () => {
        selectedKey == "G#";
        expect(document.getElementById('javascript-key').innerText).toEqual("G# - C# - D# - Fm - A#m - Cm");
    });
 });