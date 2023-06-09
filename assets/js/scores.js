// Elements
var highscoresEl = document.getElementById("highscores");
var clearBtnEl = document.getElementById("clear");

// Retrieve highscores from localStorage
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

// Display highscores
function displayHighscores() {
  highscoresEl.innerHTML = "";

  for (var i = 0; i < highscores.length; i++) {
    var highscore = highscores[i];
    var li = document.createElement("li");
    li.textContent = highscore.initials + " - " + highscore.score;
    highscoresEl.appendChild(li);
  }
}

// Clear highscores
function clearHighscores() {
  highscores = [];
  localStorage.setItem("highscores", JSON.stringify(highscores));
  displayHighscores();
}

// Attach event listener
clearBtnEl.addEventListener("click", clearHighscores);

// Display highscores when the page loads
displayHighscores();
