const quizData = {
  general: [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      answer: "Paris",
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: [
        "Harper Lee",
        "J.K. Rowling",
        "Ernest Hemingway",
        "F. Scott Fitzgerald",
      ],
      answer: "Harper Lee",
    },
  ],
  science: [
    {
      question: "What planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "NaCl"],
      answer: "H2O",
    },
  ],
};

let currentCategory = "general";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

// Get elements
const categorySelect = document.getElementById("category");
const startQuizButton = document.getElementById("start-quiz");
const quizInterface = document.getElementById("quiz-interface");
const questionElement = document.getElementById("question");
const optionsList = document.getElementById("options");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result-container");
const finalScoreElement = document.getElementById("final-score");
const restartQuizButton = document.getElementById("restart-quiz");
const timerElement = document.getElementById("time-left");

// Event Listeners
startQuizButton.addEventListener("click", startQuiz);
prevButton.addEventListener("click", showPreviousQuestion);
nextButton.addEventListener("click", showNextQuestion);
submitButton.addEventListener("click", showResults);
restartQuizButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentCategory = categorySelect.value;
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 30;
  quizInterface.style.display = "block";
  startQuizButton.parentElement.style.display = "none";
  resultContainer.style.display = "none";
  startTimer();
  displayQuestion();
}

function displayQuestion() {
  const currentQuestion = quizData[currentCategory][currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsList.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => selectOption(li));
    optionsList.appendChild(li);
  });
  submitButton.style.display =
    currentQuestionIndex === quizData[currentCategory].length - 1
      ? "block"
      : "none";
}

function selectOption(selectedLi) {
  document
    .querySelectorAll("#options li")
    .forEach((li) => li.classList.remove("selected"));
  selectedLi.classList.add("selected");
}

function showNextQuestion() {
  if (currentQuestionIndex < quizData[currentCategory].length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  }
}

function showPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      showResults();
    }
  }, 1000);
}

function showResults() {
  clearInterval(timer);
  quizInterface.style.display = "none";
  resultContainer.style.display = "block";
  const totalQuestions = quizData[currentCategory].length;
  finalScoreElement.textContent = `You scored ${score} out of ${totalQuestions}`;
}

function restartQuiz() {
  startQuizButton.parentElement.style.display = "block";
  quizInterface.style.display = "none";
  resultContainer.style.display = "none";
}
