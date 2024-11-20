const questions = [
  {
    question: "מהו המין שלך?",
    type: "buttons",
    options: ["נקבה", "זכר "],
    callback: (answer) => (gender = answer),
    customClass: "gender-buttons",
  },
  {
    question: "מהו הגיל שלך?",
    type: "input",
    inputType: "number",
    callback: (answer) => (age = parseInt(answer)),
  },
  {
    question: 'מה הגובה שלך בס"מ?',
    type: "input",
    inputType: "number",
    callback: (answer) => (height = parseInt(answer)),
  },
  {
    question: 'מהו המשקל שלך בק"ג?',
    type: "input",
    inputType: "number",
    callback: (answer) => (weight = parseInt(answer)),
  },
];

let gender = "",
  age = 0,
  height = 0,
  weight = 0;
let currentQuestionIndex = 0;

function calculateBMR() {
  const baseCalories =
    gender === "זכר "
      ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
      : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  return Math.round(baseCalories);
}

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  const questionText = document.getElementById("questionText");
  const inputContainer = document.getElementById("inputContainer");

  questionText.innerText = question.question;
  inputContainer.innerHTML = "";

  if (question.type === "buttons") {
    const buttonContainer = document.createElement("div");
    buttonContainer.className = question.customClass || "";

    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.innerText = option;
      button.onclick = () => nextQuestion(option);
      buttonContainer.appendChild(button);
    });

    inputContainer.appendChild(buttonContainer);
  } else if (question.type === "input") {
    const input = document.createElement("input");
    input.type = question.inputType;
    input.placeholder = "הכנס ערך";

    const button = document.createElement("button");
    button.innerText = "המשך";
    button.onclick = () => nextQuestion(input.value);

    inputContainer.appendChild(input);
    inputContainer.appendChild(button);
  }
}

function validateAnswer(answer) {
  const question = questions[currentQuestionIndex];
  if (question.type === "input") {
    const num = parseInt(answer);
    return !isNaN(num) && num > 0 && num < 1000;
  }
  return true;
}

function nextQuestion(answer) {
  if (!validateAnswer(answer)) {
    alert("אנא הכנס ערך תקין");
    return;
  }

  const question = questions[currentQuestionIndex];
  question.callback(answer);

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const container = document.getElementById("questionContainer");
  const bmr = calculateBMR();
  container.innerHTML = `
                <div class="success-message">
                    <h2>התוצאה שלך</h2>
                    <p>ה-BMR שלך הוא ${bmr} קלוריות</p>
                </div>
            `;
}

document.addEventListener("DOMContentLoaded", displayQuestion);
