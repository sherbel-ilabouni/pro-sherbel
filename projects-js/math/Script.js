// משתנים גלובליים משותפים
let currentGame = "math";

// משתנים למשחק המתמטיקה
let mathNum1, mathNum2;
let mathCurrentLevel = 1;
let mathCurrentOperation = "+";
let mathQuestionsCount = 0;
let mathCorrectAnswers = 0;
let mathWrongAnswers = 0;
let mathWrongQuestions = [];

// משתנים למשחק הסדרות
let sequenceCurrentLevel = 1;
let sequenceCurrentType = "descending";
let sequenceQuestionsCount = 0;
let sequenceCorrectAnswers = 0;
let sequenceWrongAnswers = 0;
let currentSequence = [];
let sequenceCorrectAnswer;
let sequenceWrongQuestions = [];

// משתנים למשחק השוואת מספרים
let comparisonNum1, comparisonNum2, comparisonCorrectSymbol;
let comparisonCurrentLevel = 1;
let comparisonQuestionsCount = 0;
let comparisonCorrectAnswers = 0;
let comparisonWrongAnswers = 0;

// טווחי מספרים למשחק המתמטיקה
const mathLevelRanges = {
  "+": {
    1: { min: 1, max: 10 },
    2: { min: 1, max: 20 },
    3: { min: 1, max: 50 },
    4: { min: 1, max: 100 },
    5: { min: 1, max: 200 },
  },
  "-": {
    1: { min: 1, max: 10 },
    2: { min: 1, max: 20 },
    3: { min: 1, max: 50 },
    4: { min: 1, max: 100 },
    5: { min: 1, max: 200 },
  },
  "×": {
    1: { min: 1, max: 5 },
    2: { min: 1, max: 10 },
    3: { min: 1, max: 12 },
    4: { min: 1, max: 15 },
    5: { min: 1, max: 20 },
  },
  "÷": {
    1: { min: 1, max: 5 },
    2: { min: 1, max: 10 },
    3: { min: 1, max: 12 },
    4: { min: 1, max: 15 },
    5: { min: 1, max: 20 },
  },
};

// טווחי מספרים למשחק הסדרות
const sequenceLevelRanges = {
  descending: {
    1: { start: 20, diff: 2 },
    2: { start: 50, diff: 3 },
    3: { start: 100, diff: 5 },
    4: { start: 200, diff: 7 },
    5: { start: 500, diff: 10 },
  },
  geometric: {
    1: { start: 64, ratio: 2 },
    2: { start: 128, ratio: 2 },
    3: { start: 243, ratio: 3 },
    4: { start: 625, ratio: 5 },
    5: { start: 1024, ratio: 4 },
  },
};

// טווחי מספרים למשחק השוואת מספרים
const comparisonLevelRanges = {
  1: { min: 1, max: 10 },
  2: { min: 1, max: 50 },
  3: { min: 1, max: 100 },
  4: { min: 1, max: 200 },
  5: { min: 1, max: 500 },
};

// פונקציות עזר
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateMathQuestion() {
  const range = mathLevelRanges[mathCurrentOperation][mathCurrentLevel];

  if (mathCurrentOperation === "÷") {
    mathNum2 = getRandomNumber(range.min, range.max);
    const result = getRandomNumber(range.min, range.max);
    mathNum1 = mathNum2 * result;
  } else {
    mathNum1 = getRandomNumber(range.min, range.max);
    mathNum2 = getRandomNumber(range.min, range.max);

    if (mathCurrentOperation === "-" && mathNum2 > mathNum1) {
      [mathNum1, mathNum2] = [mathNum2, mathNum1];
    }
  }

  document.querySelector(".exercise").innerHTML = `
        <div class="exercise-content">
            <input type="number" id="answer" class="regular-input">
            <span class="equals">=</span>
            <span class="expression">${mathNum1} <span id="op">${mathCurrentOperation}</span> ${mathNum2}</span>
        </div>
    `;
  document.getElementById("answer").focus();
}
function checkMathAnswer() {
  const userAnswer = parseInt(document.getElementById("answer").value);

  if (isNaN(userAnswer)) {
    document.getElementById("math-message").textContent = "נא להזין מספר";
    document.getElementById("math-message").className = "incorrect";
    return;
  }

  let correctAnswer;
  switch (mathCurrentOperation) {
    case "+":
      correctAnswer = mathNum1 + mathNum2;
      break;
    case "-":
      correctAnswer = mathNum1 - mathNum2;
      break;
    case "×":
      correctAnswer = mathNum1 * mathNum2;
      break;
    case "÷":
      correctAnswer = mathNum1 / mathNum2;
      break;
  }

  handleMathAnswer(userAnswer === correctAnswer, userAnswer, correctAnswer);
}

function handleMathAnswer(isCorrect, userAnswer, correctAnswer) {
  const messageDiv = document.getElementById("math-message");

  if (isCorrect) {
    messageDiv.textContent = "כל הכבוד! התשובה נכונה";
    messageDiv.className = "correct";
    mathCorrectAnswers++;
    setTimeout(generateMathQuestion, 1500);
  } else {
    messageDiv.textContent = `תשובה שגויה. התשובה הנכונה היא ${correctAnswer}`;
    messageDiv.className = "incorrect";
    mathWrongAnswers++;
    mathWrongQuestions.push({
      question: document.querySelector(".exercise").innerHTML,
      correctAnswer: correctAnswer,
      userAnswer: userAnswer,
    });
  }

  mathQuestionsCount++;
  updateMathScore();

  if (mathQuestionsCount >= 25) {
    setTimeout(() => showSummary("math"), 1000);
  }
}

// פונקציות למשחק הסדרות
function generateSequence() {
  const range = sequenceLevelRanges[sequenceCurrentType][sequenceCurrentLevel];
  currentSequence = [];

  if (sequenceCurrentType === "descending") {
    // מגריל מספר התחלתי בטווח מתאים לרמה
    const startNum = getRandomNumber(range.start / 2, range.start * 1.5);
    let current = startNum;

    // יצירת סדרה יורדת עם הפרש רנדומלי
    const diff = getRandomNumber(range.diff, range.diff * 2);
    for (let i = 0; i < 5; i++) {
      currentSequence.push(current);
      current -= diff;
    }
  } else {
    // geometric
    // מגריל מספר התחלתי בטווח מתאים לרמה
    const startNum = getRandomNumber(range.start / 2, range.start);
    let current = startNum;

    // יצירת סדרה גאומטרית עם יחס רנדומלי
    const ratio = range.ratio;
    for (let i = 0; i < 5; i++) {
      currentSequence.push(Math.round(current)); // עיגול למספר שלם
      current = current / ratio;
    }
  }

  const hiddenIndex = Math.floor(Math.random() * 5);
  sequenceCorrectAnswer = currentSequence[hiddenIndex];

  const sequenceHTML = currentSequence
    .map((num, index) => {
      if (index === hiddenIndex) {
        return `<input type="number" id="sequence-answer" class="sequence-input">`;
      }
      return `<span class="number">${num}</span>`;
    })
    .join(" , ");

  document.querySelector(".sequence").innerHTML = sequenceHTML;
  document.getElementById("sequence-answer")?.focus();
}
function checkSequenceAnswer() {
  const userAnswer = parseInt(document.getElementById("sequence-answer").value);

  if (isNaN(userAnswer)) {
    document.getElementById("sequence-message").textContent = "נא להזין מספר";
    document.getElementById("sequence-message").className = "incorrect";
    return;
  }

  handleSequenceAnswer(userAnswer === sequenceCorrectAnswer, userAnswer);
}

function handleSequenceAnswer(isCorrect, userAnswer) {
  const messageDiv = document.getElementById("sequence-message");

  if (isCorrect) {
    messageDiv.textContent = "כל הכבוד! התשובה נכונה";
    messageDiv.className = "correct";
    sequenceCorrectAnswers++;
    setTimeout(generateSequence, 1500);
  } else {
    messageDiv.textContent = `תשובה שגויה. המספר הנכון הוא ${sequenceCorrectAnswer}`;
    messageDiv.className = "incorrect";
    sequenceWrongAnswers++;

    sequenceWrongQuestions.push({
      sequence: [...currentSequence],
      correctAnswer: sequenceCorrectAnswer,
      userAnswer: userAnswer,
    });
  }

  sequenceQuestionsCount++;
  updateSequenceScore();

  if (sequenceQuestionsCount >= 25) {
    setTimeout(() => showSummary("sequence"), 1000);
  }
}
// פונקציה מעודכנת למשחק ההשוואה
function generateComparisonQuestion() {
  const range = comparisonLevelRanges[comparisonCurrentLevel];
  comparisonNum1 = getRandomNumber(range.min, range.max);
  comparisonNum2 = getRandomNumber(range.min, range.max);

  comparisonCorrectSymbol =
    comparisonNum1 < comparisonNum2
      ? "<"
      : comparisonNum1 > comparisonNum2
      ? ">"
      : "=";

  document.querySelector(".comparison").innerHTML = `
        <div class="comparison-content">
            <span class="number">${comparisonNum1}</span>
            <span class="comparison-symbol">?</span>
            <span class="number">${comparisonNum2}</span>
        </div>
        <div class="comparison-buttons">
            <button class="comparison-symbol-btn" data-symbol="<">&lt;</button>
            <button class="comparison-symbol-btn" data-symbol="=">=</button>
            <button class="comparison-symbol-btn" data-symbol=">">&gt;</button>
        </div>
    `;

  // הוספת מאזיני אירועים לכפתורי הסימנים
  document.querySelectorAll(".comparison-symbol-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedSymbol = btn.dataset.symbol;
      checkComparisonAnswer(selectedSymbol);

      // הוספת אפקט ויזואלי לכפתור הנבחר
      document
        .querySelectorAll(".comparison-symbol-btn")
        .forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });
}

function checkComparisonAnswer(userAnswer) {
  if (!userAnswer) {
    document.getElementById("comparison-message").textContent =
      "נא לבחור סימן השוואה";
    document.getElementById("comparison-message").className = "incorrect";
    return;
  }

  const isCorrect = userAnswer === comparisonCorrectSymbol;

  const messageDiv = document.getElementById("comparison-message");
  if (isCorrect) {
    messageDiv.textContent = "כל הכבוד! התשובה נכונה";
    messageDiv.className = "correct";
    comparisonCorrectAnswers++;
    setTimeout(generateComparisonQuestion, 1500);
  } else {
    messageDiv.textContent = `תשובה שגויה. הסימן הנכון הוא ${comparisonCorrectSymbol}`;
    messageDiv.className = "incorrect";
    comparisonWrongAnswers++;
  }

  comparisonQuestionsCount++;
  updateComparisonScore();

  if (comparisonQuestionsCount >= 25) {
    setTimeout(() => showSummary("comparison"), 1000);
  }
}

// פונקציות עדכון ניקוד
function updateMathScore() {
  document.getElementById(
    "math-score-display"
  ).textContent = `תשובות נכונות: ${mathCorrectAnswers} מתוך ${mathQuestionsCount}`;
}

function updateSequenceScore() {
  document.getElementById(
    "sequence-score-display"
  ).textContent = `תשובות נכונות: ${sequenceCorrectAnswers} מתוך ${sequenceQuestionsCount}`;
}

function updateComparisonScore() {
  document.getElementById(
    "comparison-score-display"
  ).textContent = `תשובות נכונות: ${comparisonCorrectAnswers} מתוך ${comparisonQuestionsCount}`;
}

// פונקציית החלפת משחק
function switchGame(gameType) {
  currentGame = gameType;

  document.querySelectorAll(".game-section").forEach((section) => {
    section.classList.remove("active");
  });

  document.getElementById(`${gameType}-game`).classList.add("active");

  document.querySelectorAll(".switch-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`.switch-btn[data-game="${gameType}"]`)
    .classList.add("active");

  if (gameType === "math") {
    generateMathQuestion();
  } else if (gameType === "sequence") {
    generateSequence();
  } else {
    generateComparisonQuestion();
  }
}

// פונקציית הצגת סיכום
function showSummary(gameType) {
  const correctAnswers =
    gameType === "math"
      ? mathCorrectAnswers
      : gameType === "sequence"
      ? sequenceCorrectAnswers
      : comparisonCorrectAnswers;
  const questionsCount =
    gameType === "math"
      ? mathQuestionsCount
      : gameType === "sequence"
      ? sequenceQuestionsCount
      : comparisonQuestionsCount;
  const wrongAnswers =
    gameType === "math"
      ? mathWrongAnswers
      : gameType === "sequence"
      ? sequenceWrongAnswers
      : comparisonWrongAnswers;

  const percentage = Math.round((correctAnswers / questionsCount) * 100);

  const summaryHTML = `
        <div class="summary-popup">
            <div class="summary-content">
                <h2>סיכום המשחק</h2>
                <div class="summary-stats">
                    <p>מספר שאלות כולל: <span class="total-num">${questionsCount}</span></p>
                    <p>תשובות נכונות: <span class="correct-num">${correctAnswers}</span></p>
                    <p>תשובות שגויות: <span class="wrong-num">${wrongAnswers}</span></p>
                    <p>אחוז הצלחה: <span class="percentage">${percentage}%</span></p>
                </div>
                <button onclick="resetGame('${gameType}')" class="reset-btn">משחק חדש</button>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", summaryHTML);
}

/// פונקציית איפוס משחק
function resetGame(gameType) {
  if (gameType === "math") {
    mathQuestionsCount = 0;
    mathCorrectAnswers = 0;
    mathWrongAnswers = 0;
    mathWrongQuestions = [];
    updateMathScore();
    generateMathQuestion();
  } else if (gameType === "sequence") {
    sequenceQuestionsCount = 0;
    sequenceCorrectAnswers = 0;
    sequenceWrongAnswers = 0;
    sequenceWrongQuestions = [];
    updateSequenceScore();
    generateSequence();
  } else {
    comparisonQuestionsCount = 0;
    comparisonCorrectAnswers = 0;
    comparisonWrongAnswers = 0;
    updateComparisonScore();
    generateComparisonQuestion();
  }

  document.querySelector(".summary-popup")?.remove();
}

// אתחול המשחק
window.onload = function () {
  // מאזיני אירועים לכפתורי החלפת משחק
  document.querySelectorAll(".switch-btn").forEach((button) => {
    button.addEventListener("click", function () {
      switchGame(this.dataset.game);
    });
  });

  // מאזיני אירועים לרמות משחק מתמטיקה
  document.querySelectorAll("#math-game .level-btn").forEach((button) => {
    button.addEventListener("click", function () {
      mathCurrentLevel = parseInt(this.dataset.level);
      document.querySelectorAll("#math-game .level-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");
      generateMathQuestion();
    });
  });

  // מאזיני אירועים לפעולות חשבון
  document.querySelectorAll(".operation-btn").forEach((button) => {
    button.addEventListener("click", function () {
      mathCurrentOperation = this.dataset.operation;
      document.querySelectorAll(".operation-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");
      generateMathQuestion();
    });
  });

  // מאזיני אירועים למשחק הסדרות
  document.querySelectorAll(".sequence-type-btn").forEach((button) => {
    button.addEventListener("click", function () {
      sequenceCurrentType = this.dataset.type;
      document.querySelectorAll(".sequence-type-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");
      generateSequence();
    });
  });

  // מאזיני אירועים לרמות משחק סדרות
  document.querySelectorAll("#sequence-game .level-btn").forEach((button) => {
    button.addEventListener("click", function () {
      sequenceCurrentLevel = parseInt(this.dataset.level);
      document.querySelectorAll("#sequence-game .level-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");
      generateSequence();
    });
  });

  // מאזיני אירועים למשחק השוואת מספרים
  document.querySelectorAll("#comparison-game .level-btn").forEach((button) => {
    button.addEventListener("click", function () {
      comparisonCurrentLevel = parseInt(this.dataset.level);
      document
        .querySelectorAll("#comparison-game .level-btn")
        .forEach((btn) => {
          btn.classList.remove("active");
        });
      this.classList.add("active");
      generateComparisonQuestion();
    });
  });

  // מאזיני אירועים לכפתורי בדיקה ותרגיל הבא במתמטיקה
  document
    .getElementById("math-check")
    .addEventListener("click", checkMathAnswer);
  document
    .getElementById("math-next")
    .addEventListener("click", generateMathQuestion);

  // מאזיני אירועים לכפתורי בדיקה וסדרה הבאה
  document
    .getElementById("sequence-check")
    .addEventListener("click", checkSequenceAnswer);
  document
    .getElementById("sequence-next")
    .addEventListener("click", generateSequence);

  // מאזיני אירועים לכפתורי בדיקה למשחק השוואה
  document
    .getElementById("comparison-check")
    .addEventListener("click", checkComparisonAnswer);
  document
    .getElementById("comparison-next")
    .addEventListener("click", generateComparisonQuestion);

  // מאזין אירועים למקש Enter בשדה הקלט
  document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      if (currentGame === "math" && document.activeElement.id === "answer") {
        checkMathAnswer();
      } else if (
        currentGame === "sequence" &&
        document.activeElement.id === "sequence-answer"
      ) {
        checkSequenceAnswer();
      } else if (
        currentGame === "comparison" &&
        document.activeElement.id === "comparison-answer"
      ) {
        checkComparisonAnswer();
      }
    }
  });

  // אתחול ראשוני
  updateMathScore();
  updateSequenceScore();
  updateComparisonScore();
  generateMathQuestion();
};
