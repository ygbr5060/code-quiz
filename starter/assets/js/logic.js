// Variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Elements
var startScreenEl = document.getElementById("start-screen");
var questionsEl = document.getElementById("questions");
var questionTitleEl = document.getElementById("question-title");
var choicesEl = document.getElementById("choices");
var endScreenEl = document.getElementById("end-screen");
var finalScoreEl = document.getElementById("final-score");
var initialsInputEl = document.getElementById("initials");
var submitBtnEl = document.getElementById("submit");
var feedbackEl = document.getElementById("feedback");

// Start the quiz
function startQuiz() {
  startScreenEl.classList.add("hide");
  questionsEl.classList.remove("hide");

  // Start the timer
  timerId = setInterval(function () {
    time--;
    document.getElementById("time").textContent = time;

    if (time <= 0) {
      endQuiz();
    }
  }, 1000);

  // Display the first question
  displayQuestion(currentQuestionIndex);
}

// Display a question
function displayQuestion(index) {
  var currentQuestion = questions[index];
  questionTitleEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";

  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var choiceBtn = document.createElement("button");
    choiceBtn.textContent = choice;
    choiceBtn.setAttribute("data-index", i);
    choiceBtn.addEventListener("click", handleAnswerClick);
    choicesEl.appendChild(choiceBtn);
  }
}

// Handle answer click
function handleAnswerClick(event) {
  var selectedAnswerIndex = parseInt(event.target.getAttribute("data-index"));

  if (selectedAnswerIndex === questions[currentQuestionIndex].answer) {
    feedbackEl.textContent = "Correct!";
  } else {
    feedbackEl.textContent = "Wrong!";
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    document.getElementById("time").textContent = time;
  }

  feedbackEl.classList.remove("hide");
  setTimeout(function () {
    feedbackEl.classList.add("hide");
  }, 1000);

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    displayQuestion(currentQuestionIndex);
  }
}

// End the quiz
function endQuiz() {
  clearInterval(timerId);
  questionsEl.classList.add("hide");
  endScreenEl.classList.remove("hide");
  finalScoreEl.textContent = time;
}

// Handle submit button click
function handleSubmitClick() {
  var initials = initialsInputEl.value.trim();

  if (initials !== "") {
    // Save the score and initials
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    var newScore = {
      initials: initials,
      score: time
    };
    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));

    // Redirect to highscores page
    window.location.href = "highscores.html";
  }
}

// Attach event listeners
document.getElementById("start").addEventListener("click", startQuiz);
submitBtnEl.addEventListener("click", handleSubmitClick);
