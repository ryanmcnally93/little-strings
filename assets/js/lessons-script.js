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

// This code was provided from Ben Smith, who discoved it on Chatgpt
const songTitle = "Wonderwall"; // replace with the song title you want to search for
const apiUrl = `https://www.songsterr.com/a/ra/songs.json?pattern=${songTitle}`;


/*fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // get the first song ID from the API response
    const songId = data[0].id;

    // use the song ID to retrieve chord data
    const chordUrl = `https://www.songsterr.com/a/wa/song?id=${songId}&instrument=any&inst=voice`;

 

    fetch(chordUrl)
      .then(response => response.json())
      .then(chordData => {
        // do something with the chord data
        console.log(chordData);
      })
      .catch(error => console.error(error));
  })
  .catch(error => console.error(error));*/

// Set up the API endpoint
const apiBaseUrl = 'https://www.songsterr.com/a/wa/api/';
const apiKey = 'AIzaSyDQjYZj-V3e4rOM6gWZod4RCiMhc2tPmGU';
const songId = 2;

// Make a request for song data
fetch(`${apiBaseUrl}/songs/${songId}?apikey=${apiKey}`)
  .then(response => response.json())
  .then(data => console.log(data));