// ---------- נתונים ומשתנים למשחק הזיכרון ----------
const memoryLevels = {
  1: {
    pairs: 6,
    words: ["בית", "אמא", "אבא", "כלב", "חתול", "ילד"],
    gridSize: 3,
    info: "מילים פשוטות - מתאים לכיתות א-ב",
  },
  2: {
    pairs: 8,
    words: ["מחשב", "שולחן", "מחברת", "עיפרון", "ילקוט", "כיסא", "ספר", "מורה"],
    gridSize: 4,
    info: "מילים מבית הספר - מתאים לכיתות ג-ד",
  },
  3: {
    pairs: 12,
    words: [
      "מתמטיקה",
      "היסטוריה",
      "גיאוגרפיה",
      "ספורט",
      "מדעים",
      "אנגלית",
      "מחשבים",
      "אומנות",
      "מוזיקה",
      "ספרות",
      'תנ"ך',
      "עברית",
    ],
    gridSize: 4,
    info: "מקצועות לימוד - מתאים לכיתות ה-ו",
  },
};

// ---------- נתונים למשחק המילים הנרדפות ----------
const synonymLevels = {
  1: {
    pairs: [
      { word1: "שמח", word2: "עליז" },
      { word1: "גדול", word2: "ענק" },
      { word1: "קטן", word2: "זעיר" },
      { word1: "יפה", word2: "נאה" },
      { word1: "מהר", word2: "מיד" },
      { word1: "חכם", word2: "נבון" },
    ],
    info: "מילים נרדפות פשוטות",
  },
  2: {
    pairs: [
      { word1: "להסתכל", word2: "להביט" },
      { word1: "לרוץ", word2: "לדהור" },
      { word1: "לדבר", word2: "לשוחח" },
      { word1: "לחשוב", word2: "להרהר" },
      { word1: "להתחיל", word2: "לפתוח" },
      { word1: "לסיים", word2: "לגמור" },
    ],
    info: "פעלים נרדפים",
  },
  3: {
    pairs: [
      { word1: "אופטימי", word2: "חיובי" },
      { word1: "פסימי", word2: "שלילי" },
      { word1: "אקטואלי", word2: "עכשווי" },
      { word1: "אמביציוזי", word2: "שאפתן" },
      { word1: "דומיננטי", word2: "שולט" },
      { word1: "אותנטי", word2: "מקורי" },
    ],
    info: "מילים מורכבות",
  },
};

// ---------- משתני משחק הזיכרון ----------
let currentMemoryLevel = 1;
let memoryScore = 0;
let memoryMatches = 0;
let memoryFlippedCards = [];
let canFlipMemory = true;
let memoryTimerInterval;
let memoryStartTime;
let memoryTotalMoves = 0;

// ---------- משתני משחק המילים הנרדפות ----------
let currentSynonymLevel = 1;
let synonymScore = 0;
let synonymStartTime;
let synonymTimerInterval;
let selectedWord = null;
let synonymPairsCompleted = 0;
let currentWords = [];
let synonymTotalMoves = 0;

// ---------- פונקציות כלליות ----------
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function playSound(type) {
  const audio = new Audio();
  switch (type) {
    case "match":
      audio.src =
        "https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3";
      break;
    case "flip":
      audio.src =
        "https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3";
      break;
    case "win":
      audio.src =
        "https://assets.mixkit.co/active_storage/sfx/2002/2002-preview.mp3";
      break;
  }
  audio.play().catch((err) => console.log("Audio play failed:", err));
}

function switchGame(game) {
  const memoryGame = document.getElementById("memoryGame");
  const synonymGame = document.getElementById("synonymGame");
  const buttons = document.querySelectorAll(".mode-btn");

  buttons.forEach((btn) => btn.classList.remove("active"));

  if (game === "memory") {
    memoryGame.style.display = "block";
    synonymGame.style.display = "none";
    document.getElementById("memoryBtn").classList.add("active");
    resetMemoryGame();
  } else {
    memoryGame.style.display = "none";
    synonymGame.style.display = "block";
    document.getElementById("synonymsBtn").classList.add("active");
    initSynonymGame();
  }
}

// ---------- פונקציות משחק הזיכרון ----------
function resetMemoryGame() {
  memoryScore = 0;
  memoryMatches = 0;
  memoryTotalMoves = 0;
  document.getElementById("memoryScore").textContent = "0";
  document.getElementById("memoryMoves").textContent = "0";
  document.getElementById("memoryTimer").textContent = "00:00";
  if (memoryTimerInterval) clearInterval(memoryTimerInterval);
  memoryStartTime = null;
  initializeMemoryGame();
}

function createMemoryCards() {
  const level = memoryLevels[currentMemoryLevel];
  const cards = [];
  level.words.forEach((word) => {
    cards.push({ word: word, id: Math.random() });
    cards.push({ word: word, id: Math.random() });
  });
  return shuffleArray(cards);
}

function initializeMemoryGame() {
  const level = memoryLevels[currentMemoryLevel];
  const cards = createMemoryCards();
  const grid = document.getElementById("memoryGrid");

  grid.style.gridTemplateColumns = `repeat(${level.gridSize}, 1fr)`;
  document.getElementById("memoryLevelInfo").textContent = level.info;

  grid.innerHTML = cards
    .map(
      (card, index) => `
            <div class="card" data-index="${index}" data-word="${card.word}" onclick="flipMemoryCard(this, ${index})">
                <div class="card-face card-front">?</div>
                <div class="card-face card-back">${card.word}</div>
            </div>
        `
    )
    .join("");

  memoryMatches = 0;
  memoryFlippedCards = [];
  canFlipMemory = true;
}

function flipMemoryCard(card, index) {
  if (!canFlipMemory || memoryFlippedCards.includes(index)) return;

  if (!memoryStartTime) {
    memoryStartTime = new Date();
    memoryTimerInterval = setInterval(updateMemoryTimer, 1000);
  }

  playSound("flip");
  card.classList.add("flipped");
  memoryFlippedCards.push(index);

  if (memoryFlippedCards.length === 2) {
    memoryTotalMoves++;
    document.getElementById("memoryMoves").textContent = memoryTotalMoves;

    canFlipMemory = false;
    const [firstIndex, secondIndex] = memoryFlippedCards;
    const firstCard = document.querySelector(`[data-index="${firstIndex}"]`);
    const secondCard = document.querySelector(`[data-index="${secondIndex}"]`);

    if (
      firstCard.getAttribute("data-word") ===
      secondCard.getAttribute("data-word")
    ) {
      // התאמה נכונה
      memoryMatches++;
      memoryScore += 10;
      document.getElementById("memoryScore").textContent = memoryScore;

      setTimeout(() => {
        firstCard.querySelector(".card-back").classList.add("matched");
        secondCard.querySelector(".card-back").classList.add("matched");
        playSound("match");

        if (memoryMatches === memoryLevels[currentMemoryLevel].pairs) {
          clearInterval(memoryTimerInterval);
          setTimeout(showMemoryGameOver, 500);
        }
      }, 300);

      memoryFlippedCards = [];
      canFlipMemory = true;
    } else {
      // התאמה שגויה
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        memoryFlippedCards = [];
        canFlipMemory = true;
      }, 1000);
    }
  }
}

function updateMemoryTimer() {
  if (!memoryStartTime) return;

  const now = new Date();
  const elapsed = Math.floor((now - memoryStartTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  document.getElementById("memoryTimer").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function showMemoryGameOver() {
  const endTime = document.getElementById("memoryTimer").textContent;
  const accuracy = Math.round(((memoryMatches * 2) / memoryTotalMoves) * 100);

  const gameOver = document.createElement("div");
  gameOver.className = "game-over";
  gameOver.innerHTML = `
            <div class="game-over-content">
                <h2>כל הכבוד! 🎉</h2>
                <p>סיימת את משחק הזיכרון!</p>
                <p>ניקוד: ${memoryScore}</p>
                <p>זמן: ${endTime}</p>
                <p>מספר מהלכים: ${memoryTotalMoves}</p>
                <p>אחוז הצלחה: ${accuracy}%</p>
                <button class="btn" onclick="resetMemoryGame()">שחק שוב</button>
                ${
                  currentMemoryLevel < 3
                    ? `
                    <button class="btn" onclick="changeMemoryLevel(${
                      currentMemoryLevel + 1
                    })">
                        עבור לרמה הבאה
                    </button>
                `
                    : ""
                }
            </div>
        `;
  document.body.appendChild(gameOver);
  playSound("win");
}

function changeMemoryLevel(newLevel) {
  if (newLevel) {
    currentMemoryLevel = newLevel;
    document.getElementById("memoryLevelSelect").value = newLevel;
  } else {
    currentMemoryLevel = parseInt(
      document.getElementById("memoryLevelSelect").value
    );
  }
  resetMemoryGame();
}

// ---------- פונקציות משחק המילים הנרדפות ----------
function initSynonymGame() {
  synonymScore = 0;
  synonymPairsCompleted = 0;
  synonymTotalMoves = 0;
  document.getElementById("synonymScore").textContent = "0";
  document.getElementById("synonymMoves").textContent = "0";
  document.getElementById("synonymTimer").textContent = "00:00";
  if (synonymTimerInterval) clearInterval(synonymTimerInterval);
  synonymStartTime = null;
  displaySynonymPairs();
}

function shuffleSynonyms(pairs) {
  const words = [];
  pairs.forEach((pair) => {
    words.push({ word: pair.word1, pairId: pair.word1 + pair.word2 });
    words.push({ word: pair.word2, pairId: pair.word1 + pair.word2 });
  });
  return shuffleArray([...words]);
}

function displaySynonymPairs() {
  const level = synonymLevels[currentSynonymLevel];
  currentWords = shuffleSynonyms(level.pairs);
  document.getElementById("synonymLevelInfo").textContent = level.info;

  const container = document.getElementById("synonymsContainer");
  container.innerHTML = currentWords
    .map(
      (wordObj, index) => `
            <div class="word-box" onclick="selectWord(this, '${wordObj.pairId}', ${index})">
                ${wordObj.word}
            </div>
        `
    )
    .join("");
}

function selectWord(element, pairId, index) {
  if (element.classList.contains("correct")) return;

  if (!synonymStartTime) {
    synonymStartTime = new Date();
    synonymTimerInterval = setInterval(updateSynonymTimer, 1000);
  }

  playSound("flip");

  if (!selectedWord) {
    selectedWord = { element, pairId, index };
    element.classList.add("selected");
  } else {
    if (selectedWord.index !== index) {
      synonymTotalMoves++;
      document.getElementById("synonymMoves").textContent = synonymTotalMoves;

      const currentElement = element;
      currentElement.classList.add("selected");

      setTimeout(() => {
        if (selectedWord.pairId === pairId) {
          // התאמה נכונה
          selectedWord.element.classList.remove("selected");
          currentElement.classList.remove("selected");
          selectedWord.element.classList.add("correct");
          currentElement.classList.add("correct");
          synonymScore += 10;
          document.getElementById("synonymScore").textContent = synonymScore;
          synonymPairsCompleted++;
          playSound("match");

          if (
            synonymPairsCompleted ===
            synonymLevels[currentSynonymLevel].pairs.length
          ) {
            clearInterval(synonymTimerInterval);
            setTimeout(showSynonymGameOver, 500);
          }
        } else {
          // התאמה שגויה
          selectedWord.element.classList.remove("selected");
          currentElement.classList.remove("selected");
        }
        selectedWord = null;
      }, 500);
    }
  }
}

function updateSynonymTimer() {
  if (!synonymStartTime) return;

  const now = new Date();
  const elapsed = Math.floor((now - synonymStartTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  document.getElementById("synonymTimer").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function showSynonymGameOver() {
  const endTime = document.getElementById("synonymTimer").textContent;
  const accuracy = Math.round(
    ((synonymPairsCompleted * 2) / synonymTotalMoves) * 100
  );

  const gameOver = document.createElement("div");
  gameOver.className = "game-over";
  gameOver.innerHTML = `
        <div class="game-over-content">
            <h2>כל הכבוד! 🎉</h2>
            <p>סיימת את משחק המילים הנרדפות!</p>
            <p>ניקוד: ${synonymScore}</p>
            <p>זמן: ${endTime}</p>
            <p>מספר מהלכים: ${synonymTotalMoves}</p>
            <p>אחוז הצלחה: ${accuracy}%</p>
            <button class="btn" onclick="initSynonymGame()">שחק שוב</button>
            ${
              currentSynonymLevel < 3
                ? `
                <button class="btn" onclick="changeSynonymLevel(${
                  currentSynonymLevel + 1
                })">
                    עבור לרמה הבאה
                </button>
            `
                : ""
            }
        </div>
    `;
  document.body.appendChild(gameOver);
  playSound("win");
}

function changeSynonymLevel(newLevel) {
  if (newLevel) {
    currentSynonymLevel = newLevel;
    document.getElementById("synonymLevelSelect").value = newLevel;
  } else {
    currentSynonymLevel = parseInt(
      document.getElementById("synonymLevelSelect").value
    );
  }
  initSynonymGame();
}

// ---------- אתחול המשחק וטיפול באירועי מקלדת ----------
document.addEventListener("DOMContentLoaded", function () {
  initializeMemoryGame();
  initSynonymGame();

  // הוספת האזנה ללחיצות מקשים
  document.addEventListener("keydown", function (e) {
    // מקש Enter מפעיל את כפתור "שחק שוב" אם יש מסך סיום
    if (e.key === "Enter") {
      const restartBtn = document.querySelector(".game-over .btn");
      if (restartBtn) restartBtn.click();
    }

    // מקש Escape מסיר את מסך הסיום ומאתחל את המשחק הנוכחי
    if (e.key === "Escape") {
      const gameOver = document.querySelector(".game-over");
      if (gameOver) {
        gameOver.remove();
        if (document.getElementById("memoryGame").style.display !== "none") {
          resetMemoryGame();
        } else {
          initSynonymGame();
        }
      }
    }

    // מקשי מספרים 1-3 משנים רמת קושי
    if (["1", "2", "3"].includes(e.key)) {
      const level = parseInt(e.key);
      if (document.getElementById("memoryGame").style.display !== "none") {
        changeMemoryLevel(level);
      } else {
        changeSynonymLevel(level);
      }
    }
  });

  /*     // הוספת האזנה לשינוי גודל מסך
            window.addEventListener('resize', function () {
                if (document.getElementById('memoryGame').style.display !== 'none') {
                    const grid = document.getElementById('memoryGrid');
                    const level = memoryLevels[currentMemoryLevel];
                    if (window.innerWidth <= 480) {
                        grid.style.gridTemplateColumns = `repeat(${level.gridSize}, 1fr)`;
                    }
                }
            }); */

  // הוספת האזנה לטעינת תמונות ואודיו
  /*     window.addEventListener('load', function () {
                // טעינה מוקדמת של קבצי אודיו
                const audioFiles = [
                    'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
                    'https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3',
                    'https://assets.mixkit.co/active_storage/sfx/2002/2002-preview.mp3'
                ];

                audioFiles.forEach(file => {
                    const audio = new Audio();
                    audio.src = file;
                });
            });
 */
  // שמירת נתונים בלוקל סטורג'
  /*     function saveGameStats() {
                const stats = {
                    memoryHighScores: {
                        1: localStorage.getItem('memoryHighScore1') || 0,
                        2: localStorage.getItem('memoryHighScore2') || 0,
                        3: localStorage.getItem('memoryHighScore3') || 0
                    },
                    synonymHighScores: {
                        1: localStorage.getItem('synonymHighScore1') || 0,
                        2: localStorage.getItem('synonymHighScore2') || 0,
                        3: localStorage.getItem('synonymHighScore3') || 0
                    }
                };

                // עדכון שיאים חדשים
                if (memoryScore > stats.memoryHighScores[currentMemoryLevel]) {
                    localStorage.setItem(`memoryHighScore${currentMemoryLevel}`, memoryScore);
                }
                if (synonymScore > stats.synonymHighScores[currentSynonymLevel]) {
                    localStorage.setItem(`synonymHighScore${currentSynonymLevel}`, synonymScore);
                }
            }
 */
  // בדיקת תמיכה בדפדפן
  /*   function checkBrowserSupport() {
                if (!localStorage) {
                    console.warn('Local Storage is not supported');
                }
                if (!window.Audio) {
                    console.warn('Audio is not supported');
                }
            }

            checkBrowserSupport(); */
});
