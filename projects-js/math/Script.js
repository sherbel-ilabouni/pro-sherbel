let currentGame = "math";

// משתנים למשחקים
const gameStates = {
  math: {
    num1: 0,
    num2: 0,
    level: 1,
    operation: "+",
    questionsCount: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    wrongQuestions: []
  },
  sequence: {
    level: 1,
    type: "descending",
    questionsCount: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    currentSequence: [],
    correctAnswer: null,
    wrongQuestions: []
  },
  comparison: {
    num1: 0,
    num2: 0,
    correctSymbol: null,
    level: 1,
    questionsCount: 0,
    correctAnswers: 0,
    wrongAnswers: 0
  }
};

// טווחי מספרים למשחקים
const ranges = {
  math: {
    "+": {
      1: { min: 1, max: 10 },
      2: { min: 1, max: 20 },
      3: { min: 1, max: 50 },
      4: { min: 1, max: 100 },
      5: { min: 1, max: 200 }
    },
    "-": {
      1: { min: 1, max: 10 },
      2: { min: 1, max: 20 },
      3: { min: 1, max: 50 },
      4: { min: 1, max: 100 },
      5: { min: 1, max: 200 }
    },
    "×": {
      1: { min: 1, max: 5 },
      2: { min: 1, max: 10 },
      3: { min: 1, max: 12 },
      4: { min: 1, max: 15 },
      5: { min: 1, max: 20 }
    },
    "÷": {
      1: { min: 1, max: 5 },
      2: { min: 1, max: 10 },
      3: { min: 1, max: 12 },
      4: { min: 1, max: 15 },
      5: { min: 1, max: 20 }
    }
  },
  sequence: {
    descending: {
      1: { start: 20, diff: 2 },
      2: { start: 50, diff: 3 },
      3: { start: 100, diff: 5 },
      4: { start: 200, diff: 7 },
      5: { start: 500, diff: 10 }
    }
  },
  comparison: {
    1: { min: 1, max: 10 },
    2: { min: 1, max: 50 },
    3: { min: 1, max: 100 },
    4: { min: 1, max: 200 },
    5: { min: 1, max: 500 }
  }
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const updateScore = (gameType) => {
  const state = gameStates[gameType];
  document.getElementById(`${gameType}-score-display`).textContent = 
    `תשובות נכונות: ${state.correctAnswers} מתוך ${state.questionsCount}`;
};

const showMessage = (gameType, text, isCorrect) => {
  const messageDiv = document.getElementById(`${gameType}-message`);
  messageDiv.textContent = text;
  messageDiv.className = isCorrect ? "correct" : "incorrect";
};

function generateMathQuestion() {
  const state = gameStates.math;
  const range = ranges.math[state.operation][state.level];

  if (state.operation === "÷") {
    state.num2 = getRandomNumber(range.min, range.max);
    const result = getRandomNumber(range.min, range.max);
    state.num1 = state.num2 * result;
  } else {
    state.num1 = getRandomNumber(range.min, range.max);
    state.num2 = getRandomNumber(range.min, range.max);
    if (state.operation === "-" && state.num2 > state.num1) {
      [state.num1, state.num2] = [state.num2, state.num1];
    }
  }

  document.querySelector(".exercise").innerHTML = `
    <div class="exercise-content">
      <input type="number" id="answer" class="regular-input">
      <span class="equals">=</span>
      <span class="expression">${state.num1} <span id="op">${state.operation}</span> ${state.num2}</span>
    </div>
  `;
  document.getElementById("answer").focus();
}

function checkMathAnswer() {
  const state = gameStates.math;
  const userAnswer = parseInt(document.getElementById("answer").value);

  if (isNaN(userAnswer)) {
    showMessage("math", "נא להזין מספר", false);
    return;
  }

  const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "×": (a, b) => a * b,
    "÷": (a, b) => a / b
  };

  const correctAnswer = operations[state.operation](state.num1, state.num2);
  const isCorrect = userAnswer === correctAnswer;

  if (isCorrect) {
    showMessage("math", "כל הכבוד! התשובה נכונה", true);
    state.correctAnswers++;
    setTimeout(generateMathQuestion, 1500);
  } else {
    showMessage("math", `תשובה שגויה. התשובה הנכונה היא ${correctAnswer}`, false);
    state.wrongAnswers++;
    state.wrongQuestions.push({
      question: document.querySelector(".exercise").innerHTML,
      correctAnswer,
      userAnswer
    });
  }

  state.questionsCount++;
  updateScore("math");

  if (state.questionsCount >= 25) {
    setTimeout(() => showSummary("math"), 1000);
  }
}

function generateSequence() {
  const state = gameStates.sequence;
  const range = ranges.sequence[state.type][state.level];
  
  const startNum = getRandomNumber(range.start / 2, range.start * 1.5);
  let current = startNum;
  state.currentSequence = [];

  for (let i = 0; i < 5; i++) {
    state.currentSequence.push(current);
    current -= range.diff;
  }

  const hiddenIndex = Math.floor(Math.random() * 5);
  state.correctAnswer = state.currentSequence[hiddenIndex];

  const sequenceHTML = state.currentSequence
    .map((num, index) => index === hiddenIndex ? 
      '<input type="number" id="sequence-answer" class="sequence-input">' :
      `<span class="number">${num}</span>`)
    .join(" , ");

  document.querySelector(".sequence").innerHTML = sequenceHTML;
  document.getElementById("sequence-answer")?.focus();
}

function checkSequenceAnswer() {
  const state = gameStates.sequence;
  const userAnswer = parseInt(document.getElementById("sequence-answer").value);

  if (isNaN(userAnswer)) {
    showMessage("sequence", "נא להזין מספר", false);
    return;
  }

  const isCorrect = userAnswer === state.correctAnswer;

  if (isCorrect) {
    showMessage("sequence", "כל הכבוד! התשובה נכונה", true);
    state.correctAnswers++;
    setTimeout(generateSequence, 1500);
  } else {
    showMessage("sequence", `תשובה שגויה. המספר הנכון הוא ${state.correctAnswer}`, false);
    state.wrongAnswers++;
    state.wrongQuestions.push({
      sequence: [...state.currentSequence],
      correctAnswer: state.correctAnswer,
      userAnswer
    });
  }

  state.questionsCount++;
  updateScore("sequence");

  if (state.questionsCount >= 25) {
    setTimeout(() => showSummary("sequence"), 1000);
  }
}

function generateComparisonQuestion() {
  const state = gameStates.comparison;
  const range = ranges.comparison[state.level];
  
  state.num1 = getRandomNumber(range.min, range.max);
  state.num2 = getRandomNumber(range.min, range.max);
  state.correctSymbol = state.num1 < state.num2 ? "<" : state.num1 > state.num2 ? ">" : "=";

  document.querySelector(".comparison").innerHTML = `
    <div class="comparison-content">
      <span class="number">${state.num1}</span>
      <span class="comparison-symbol">?</span>
      <span class="number">${state.num2}</span>
    </div>
    <div class="comparison-buttons">
      <button class="comparison-symbol-btn" data-symbol="<">&lt;</button>
      <button class="comparison-symbol-btn" data-symbol="=">=</button>
      <button class="comparison-symbol-btn" data-symbol=">">&gt;</button>
    </div>
  `;

  document.querySelectorAll(".comparison-symbol-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".comparison-symbol-btn")
        .forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      checkComparisonAnswer(btn.dataset.symbol);
    });
  });
}

function checkComparisonAnswer(userAnswer) {
  const state = gameStates.comparison;

  if (!userAnswer) {
    showMessage("comparison", "נא לבחור סימן השוואה", false);
    return;
  }

  const isCorrect = userAnswer === state.correctSymbol;

  if (isCorrect) {
    showMessage("comparison", "כל הכבוד! התשובה נכונה", true);
    state.correctAnswers++;
    setTimeout(generateComparisonQuestion, 1500);
  } else {
    showMessage("comparison", `תשובה שגויה. הסימן הנכון הוא ${state.correctSymbol}`, false);
    state.wrongAnswers++;
  }

  state.questionsCount++;
  updateScore("comparison");

  if (state.questionsCount >= 25) {
    setTimeout(() => showSummary("comparison"), 1000);
  }
}

function switchGame(gameType) {
  currentGame = gameType;

  document.querySelectorAll(".game-section").forEach(section => section.classList.remove("active"));
  document.getElementById(`${gameType}-game`).classList.add("active");

  document.querySelectorAll(".switch-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.switch-btn[data-game="${gameType}"]`).classList.add("active");

  const generators = {
    math: generateMathQuestion,
    sequence: generateSequence,
    comparison: generateComparisonQuestion
  };

  generators[gameType]();
}

function showSummary(gameType) {
  const state = gameStates[gameType];
  const percentage = Math.round((state.correctAnswers / state.questionsCount) * 100);

  const summaryHTML = `
    <div class="summary-popup">
      <div class="summary-content">
        <h2>סיכום המשחק</h2>
        <div class="summary-stats">
          <p>מספר שאלות כולל: <span class="total-num">${state.questionsCount}</span></p>
          <p>תשובות נכונות: <span class="correct-num">${state.correctAnswers}</span></p>
          <p>תשובות שגויות: <span class="wrong-num">${state.wrongAnswers}</span></p>
          <p>אחוז הצלחה: <span class="percentage">${percentage}%</span></p>
        </div>
        <button onclick="resetGame('${gameType}')" class="reset-btn">משחק חדש</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", summaryHTML);
}

function resetGame(gameType) {
  const state = gameStates[gameType];
  Object.assign(state, {
    questionsCount: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    wrongQuestions: []
  });

  updateScore(gameType);
  document.querySelector(".summary-popup")?.remove();

  const generators = {
    math: generateMathQuestion,
    sequence: generateSequence,
    comparison: generateComparisonQuestion
  };

  generators[gameType]();
}

window.onload = function () {
  document
    .querySelectorAll(".switch-btn")
    .forEach((btn) =>
      btn.addEventListener("click", () => switchGame(btn.dataset.game))
    );

  ["math", "sequence", "comparison"].forEach((gameType) => {
    document.querySelectorAll(`#${gameType}-game .level-btn`).forEach((btn) => {
      btn.addEventListener("click", function () {
        gameStates[gameType].level = parseInt(this.dataset.level);
        document
          .querySelectorAll(`#${gameType}-game .level-btn`)
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        const generators = {
          math: generateMathQuestion,
          sequence: generateSequence,
          comparison: generateComparisonQuestion,
        };
        generators[gameType]();
      });
    });
  });

  document.querySelectorAll(".operation-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      gameStates.math.operation = this.dataset.operation;
      document
        .querySelectorAll(".operation-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      generateMathQuestion();
    });
  });

  document
    .getElementById("math-check")
    .addEventListener("click", checkMathAnswer);
  document
    .getElementById("math-next")
    .addEventListener("click", generateMathQuestion);
  document
    .getElementById("sequence-check")
    .addEventListener("click", checkSequenceAnswer);
  document
    .getElementById("sequence-next")
    .addEventListener("click", generateSequence);
  document
    .getElementById("comparison-check")
    .addEventListener("click", checkComparisonAnswer);
  document
    .getElementById("comparison-next")
    .addEventListener("click", generateComparisonQuestion);

  document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const handlers = {
        math: { id: "answer", handler: checkMathAnswer },
        sequence: { id: "sequence-answer", handler: checkSequenceAnswer },
        comparison: { id: "comparison-answer", handler: checkComparisonAnswer },
      };

      const activeHandler = handlers[currentGame];
      if (activeHandler && document.activeElement.id === activeHandler.id) {
        activeHandler.handler();
      }
    }
  });

  // אתחול ראשוני
  ["math", "sequence", "comparison"].forEach(updateScore);
  generateMathQuestion();
};