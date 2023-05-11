document.addEventListener("DOMContentLoaded", function() { 
    viewChordsInKey();
    /* This code has been created to ensure the navbar opens when the burger icon is clicked */
    /* It also closes the navbar when clicked again */
    document.getElementById("smallscreen-nav").addEventListener("click", function(event) {
        let dropdown = document.getElementById('navbarNavDropdown');
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            console.log('taking away show class');
        } else {
            dropdown.classList.add('show');
            console.log('adding show class');
            dropdown.classList.remove('in');
        }
    });
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
        display.innerText = "D# - G# - A# - Cm - Fm - Gm";
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
        console.log('A selection has been made that should not be possible');
    }
}