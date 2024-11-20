// משתנים לחישוב BMR
let gender = "",
  age = 0,
  height = 0,
  weight = 0;
let baseCalories = 0,
  additionalCalories = 0,
  totalCalories = 0;
let currentQuestionIndex = 0;

const questions = [
  {
    question: "מהו המין שלך?",
    type: "buttons",
    options: ["איש", "אישה"],
    callback: (answer) => (gender = answer),
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
    callback: (answer) => {
      weight = parseInt(answer);
      calculateBMR();
    },
  },
  {
    question: "כמה ארוחות ביום את/ה אוכל/ת?",
    type: "buttons",
    options: ["2 ארוחות", "3 ארוחות", "4 ארוחות", "5 ומעלה"],
    calorieAdjustment: {
      "2 ארוחות": -200,
      "3 ארוחות": 0,
      "4 ארוחות": 100,
      "5 ומעלה": 200,
    },
    callback: (answer) =>
      adjustCalories(answer, questions[4].calorieAdjustment),
  },
  {
    question: "האם את/ה מתאמן/ת?",
    type: "buttons",
    options: ["כן", "לא"],
    calorieAdjustment: { כן: 300, לא: -100 },
    callback: (answer) =>
      adjustCalories(answer, questions[5].calorieAdjustment),
  },
  {
    question: "מהי רמת הפעילות היומית שלך?",
    type: "buttons",
    options: ["נמוכה", "בינונית", "גבוהה"],
    calorieAdjustment: { נמוכה: -100, בינונית: 0, גבוהה: 200 },
    callback: (answer) =>
      adjustCalories(answer, questions[6].calorieAdjustment),
  },
  {
    question: "מהו יעד התזונה שלך?",
    type: "buttons",
    options: ["ירידה במשקל", "שמירה על המשקל", "עלייה במשקל"],
    calorieAdjustment: {
      "ירידה במשקל": -500,
      "שמירה על המשקל": 0,
      "עלייה במשקל": 500,
    },
    callback: (answer) =>
      adjustCalories(answer, questions[7].calorieAdjustment),
  },
];

// חישוב BMR
function calculateBMR() {
  baseCalories =
    gender === "איש"
      ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
      : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  baseCalories = Math.round(baseCalories);
  totalCalories = Math.round(baseCalories + additionalCalories);
  updateCaloriesDisplay();
}

// עדכון תצוגת הקלוריות
function updateCaloriesDisplay() {
  const caloriesDisplay = document.getElementById("caloriesDisplay");
  let displayHTML =
    '<div class="calories-box" style="background: white; padding: 15px; border-radius: 8px;">';
  if (gender && age && height && weight) {
    displayHTML += `<div>קלוריות בסיסיות (BMR): ${baseCalories} קלוריות</div>`;
  }
  if (additionalCalories !== 0) {
    displayHTML += `<div>התאמות נוספות: ${Math.round(
      additionalCalories
    )} קלוריות</div>`;
  }
  displayHTML += `<div style="font-weight: bold; color: #1976D2;">סך הכל קלוריות מומלץ: ${totalCalories} קלוריות</div>`;
  displayHTML += "</div>";
  caloriesDisplay.innerHTML = displayHTML;
  caloriesDisplay.style.display = "block";
}

// הצגת שאלה
function displayQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("questionText").innerText = question.question;
  document.getElementById("inputContainer").innerHTML = "";
  document.getElementById("statusBar").innerText = `שאלה ${
    currentQuestionIndex + 1
  } מתוך ${questions.length}`;
  updateCaloriesDisplay();

  if (question.type === "buttons") {
    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.innerText = option;
      button.onclick = () => nextQuestion(option);
      document.getElementById("inputContainer").appendChild(button);
    });
  } else if (question.type === "input") {
    const input = document.createElement("input");
    input.type = question.inputType;
    input.placeholder = "הכנס ערך";
    input.onchange = () => nextQuestion(input.value);
    document.getElementById("inputContainer").appendChild(input);
  }
}

// מעבר לשאלה הבאה
function nextQuestion(answer) {
  if (!validateAnswer(answer)) {
    alert("אנא הכנס ערך תקין");
    return;
  }

  const question = questions[currentQuestionIndex];
  if (question.callback) question.callback(answer);

  currentQuestionIndex++;
  currentQuestionIndex < questions.length
    ? displayQuestion()
    : showFinalResults();
}

// פונקציה לעדכון קלוריות בהתבסס על תשובה
function adjustCalories(answer, adjustments) {
  additionalCalories += adjustments[answer] || 0;
  totalCalories = baseCalories + additionalCalories;
  updateCaloriesDisplay();
}

// אימות תשובה
function validateAnswer(answer) {
  const question = questions[currentQuestionIndex];
  if (question.type === "input") {
    const num = parseInt(answer);
    return !isNaN(num) && num > 0 && num < 1000;
  }
  return true;
}

// הצגת תוצאות סופיות
function showFinalResults() {
  document.getElementById("questionContainer").innerHTML = `
        <div class="success-message">
            <h2>מעולה! סיימנו לאסוף את הנתונים</h2>
            <div class="calories-box">
                <div>קלוריות בסיסיות (BMR): ${baseCalories} קלוריות</div>
                <div>התאמות נוספות: ${Math.round(
                  additionalCalories
                )} קלוריות</div>
                <div style="font-weight: bold; color: #1976D2;">סך הכל קלוריות מומלץ: ${totalCalories} קלוריות</div>
            </div>
        </div>
    `;
}

// התחלת השאלון
document.addEventListener("DOMContentLoaded", function () {
  displayQuestion();
});
