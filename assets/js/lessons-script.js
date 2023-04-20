document.addEventListener("DOMContentLoaded", function() { 
    viewChordsInKey();
});

document.addEventListener("change", function() { 
    viewChordsInKey();
});

function viewChordsInKey() {

    let display = document.getElementById('javascript-key');
    let selectedKey = document.getElementById('select-key').value;
    if (selectedKey == "A") {
        display.innerText = "A - D - E - F#m - Bm - C#m";
    } else if (selectedKey == "A#") {
        display.innerText = "A# - D# - F - Gm - Cm - Dm";
    } else if (selectedKey == "B") {
        display.innerText = "B - E - F# - G#m - C#m - D#m";
    } else if (selectedKey == "C") {
        display.innerText = "C - F - G - Am - Dm - Em";
    } else if (selectedKey == "C#") {
        display.innerText = "C# - F# - G# - A#m - D#m - Fm";
    } else if (selectedKey == "D") {
        display.innerText = "D - G - A - Bm - Em - F#m";
    } else if (selectedKey == "D#") {
        display.innerText = "D - G# - A# - Cm - Fm - Gm";
    } else if (selectedKey == "E") {
        display.innerText = "E - A - B - C#m - F#m - G#m";
    } else if (selectedKey == "F") {
        display.innerText = "F - A# - C - Dm - Gm - Am";
    } else if (selectedKey == "F#") {
        display.innerText = "F# - B - C# - D#m - G#m - A#m";
    } else if (selectedKey == "G") {
        display.innerText = "G - C - D - Em - Am - Bm";
    } else if (selectedKey == "G#") {
        display.innerText = "G# - C# - D# - Fm - A#m - Cm";
    } else {
        display.innerText = "Error 404";
    }
}