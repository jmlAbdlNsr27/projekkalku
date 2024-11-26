const navLinks = document.querySelectorAll(".nav-link, .dropdown-item");

// Dapatkan absolute path halaman saat ini
const currentUrl = new URL(window.location.href).pathname;

// Loop melalui semua tautan
navLinks.forEach((link) => {
  const linkHref = new URL(link.href).pathname;
  if (linkHref === currentUrl) {
    link.classList.add("active");

    // Untuk dropdown, tambahkan kelas 'active' ke parent-nya
    const parentDropdown = link.closest(".dropdown");
    if (parentDropdown) {
      parentDropdown.querySelector(".nav-link").classList.add("active");
    }
  }
});


const questions = [
  {
    question: "Berapakah Lim (x→3) dari (2x^2 - 5x + 7)?",
    options: ["10", "5", "4", "8"],
    answer: 0, // Jawaban benar: "10" (index 0)
  },
  {
    question: "Berapakah Lim (x→9) dari (√x - 3 / x - 9)?",
    options: ["1/4", "1", "0", "1/6"],
    answer: 3, // Jawaban benar: "1/6" (index 3)
  },
  {
    question: "Berapakah Lim (x→2) dari (x^2 - 4 / x - 2)?",
    options: ["3", "6", "4", "9"],
    answer: 2, // Jawaban benar: "4" (index 2)
  },
];

let currentQuestion = 0;
let score = 0;
let answers = Array(questions.length).fill(null); // Menyimpan jawaban pengguna

function startQuiz() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const question = questions[currentQuestion];
  document.getElementById("question-text").textContent = question.question;
  const options = document.querySelectorAll(".option");
  options.forEach((button, index) => {
    button.textContent = question.options[index];
    button.classList.remove("selected");
    if (answers[currentQuestion] === index) {
      button.classList.add("selected"); // Menyoroti jawaban yang sudah dipilih
    }
  });

  document.getElementById("progress").textContent = `Pertanyaan ${
    currentQuestion + 1
  } dari ${questions.length}`;

  // Atur tombol Kembali dan Next
  document.getElementById("back-btn").disabled = currentQuestion === 0;
  document.getElementById("next-btn").textContent =
    currentQuestion === questions.length - 1 ? "Selesai" : "Next";
}

function selectAnswer(selectedOption) {
  answers[currentQuestion] = selectedOption;
  const options = document.querySelectorAll(".option");
  options.forEach((button) => button.classList.remove("selected"));
  options[selectedOption].classList.add("selected");
}

function skipQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    endQuiz();
  } else {
    loadQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  score = answers.reduce((total, answer, index) => {
    return total + (answer === questions[index].answer ? 1 : 0);
  }, 0);

  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("score-screen").style.display = "block";

  document.getElementById(
    "score-text"
  ).textContent = `Skor kamu adalah ${score} dari ${questions.length}`;

  const correctAnswersList = document.getElementById("correct-answers");
  correctAnswersList.innerHTML = "";
  questions.forEach((question, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${question.question} Jawaban: ${
      question.options[question.answer]
    }`;
    correctAnswersList.appendChild(li);
  });
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answers.fill(null);
  document.getElementById("score-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
}

document.getElementById("current-year").textContent = new Date().getFullYear();
