/**
 * @jest-environment jsdom
 */

 const { viewChordsInKey } = require("./lessons-script");

 beforeAll(() => {
     let fs = require("fs");
     let fileContents = fs.readFileSync("lessons.html", "utf-8");
     document.open();
     document.write(fileContents);
     document.close();
 })
 
 describe("Select options display the correct chords", () => {
    test("A is selected", () => {
        document.getElementById('select-key').value = "A";
        viewChordsInKey();
        expect(document.getElementById('javascript-key').innerText).toEqual("A - D - E - F#m - Bm - C#m");
    });
    test("A# is selected", () => {
        document.getElementById('select-key').value = "A#";
        viewChordsInKey();
        expect(document.getElementById('javascript-key').innerText).toEqual("A# - D# - F - Gm - Cm - Dm");
    });
    test("B is selected", () => {
        document.getElementById('select-key').value = "B";
        viewChordsInKey();
        expect(document.getElementById('javascript-key').innerText).toEqual("B - E - F# - G#m - C#m - D#m");
    });
    test("C is selected", () => {
        document.getElementById('select-key').value = "C";
        viewChordsInKey();
        expect(document.getElementById('javascript-key').innerText).toEqual("C - F - G - Am - Dm - Em");
    });
    test("C# is selected", () => {
        document.getElementById('select-key').value = "C#";
        viewChordsInKey();
        expect(document.getElementById('javascript-key').innerText).toEqual("C# - F# - G# - A#m - D#m - Fm");
    });
    test("D is selected", () => {
        document.getElementById('select-key').value = "D";
        viewChordsInKey();
        expect(document.getElementById('javascript-key').innerText).toEqual("D - G - A - Bm - Em - F#m");
    });
    test("D# is selected", () => {
        document.getElementById('select-key').value = "D#";
        viewChordsInKey();
        expect(document.getElementById('javascript-key').innerText).toEqual("D# - G# - A# - Cm - Fm - Gm");
    });
    test("E is selected", () => {
        document.getElementById('select-key').value = "E";
        viewChordsInKey();
        expect(document.getElementById('javascript-key').innerText).toEqual("E - A - B - C#m - F#m - G#m");
    });
    test("F is selected", () => {
        document.getElementById('select-key').value = "F";
        viewChordsInKey();
        expect(document.getElementById('javascript-key').innerText).toEqual("F - A# - C - Dm - Gm - Am");
    });
    test("F# is selected", () => {
        document.getElementById('select-key').value = "F#";
        viewChordsInKey();
        expect(document.getElementById('javascript-key').innerText).toEqual("F# - B - C# - D#m - G#m - A#m");
    });
    test("G is selected", () => {
        document.getElementById('select-key').value = "G";
        viewChordsInKey();
        expect(document.getElementById('javascript-key').innerText).toEqual("G - C - D - Em - Am - Bm");
    });
    test("G# is selected", () => {
        document.getElementById('select-key').value = "G#";
        viewChordsInKey();
        expect(document.getElementById('javascript-key').innerText).toEqual("G# - C# - D# - Fm - A#m - Cm");
    });
    test("Invalid option is selected", () => {
        document.getElementById('select-key').value = "R";
        viewChordsInKey();
        expect(document.getElementById('javascript-key').innerText).toEqual("Error 404");
    });
 });