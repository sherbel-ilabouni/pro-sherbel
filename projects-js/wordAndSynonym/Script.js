 const levels = {
            1: [
                { word: "שמחה", options: ["אושר", "עצב", "כעס"], correct: "אושר" },
                { word: "חבר", options: ["ידיד", "אויב", "מכוער"], correct: "ידיד" },
                { word: "ילד", options: ["תינוק", "איש", "נער"], correct: "נער" },
                { word: "בית", options: ["מבנה", "רחוב", "מכונית"], correct: "מבנה" },
                { word: "חכם", options: ["נבון", "טיפש", "איטי"], correct: "נבון" },
                { word: "עבודה", options: ["מקצוע", "חג", "משחק"], correct: "מקצוע" },
                { word: "חולצה", options: ["בגד", "כיסא", "שולחן"], correct: "בגד" },
                { word: "עצוב", options: ["דיכאון", "שמחה", "הצלחה"], correct: "דיכאון" },
                { word: "גבוה", options: ["רם", "נמוך", "קטן"], correct: "רם" },
                { word: "שקר", options: ["כזב", "אמת", "צדק"], correct: "כזב" },
                { word: "כלב", options: ["חיה", "רכב", "צמח"], correct: "חיה" },
                { word: "אדמה", options: ["קרקע", "שמים", "ים"], correct: "קרקע" },
                { word: "צחוק", options: ["חיוך", "בכי", "צעקה"], correct: "חיוך" },
                { word: "תפוח", options: ["פרי", "ירק", "חיה"], correct: "פרי" },
                { word: "ספר", options: ["קריאה", "כתיבה", "ציור"], correct: "קריאה" }
            ],
            2: [
                { word: "מורה", options: ["מנחה", "חבר", "שונא"], correct: "מנחה" },
                { word: "אומץ", options: ["תעוזה", "פחד", "הססנות"], correct: "תעוזה" },
                { word: "יופי", options: ["חן", "עיוות", "גאווה"], correct: "חן" },
                { word: "שמח", options: ["מאושר", "מדוכא", "עייף"], correct: "מאושר" },
                { word: "רכב", options: ["מכונית", "מטוס", "אופניים"], correct: "מכונית" },
                { word: "חברות", options: ["ידידות", "איבה", "חוזק"], correct: "ידידות" },
                { word: "רגש", options: ["תחושה", "מחשבה", "היגיון"], correct: "תחושה" },
                { word: "תמונה", options: ["ציור", "קול", "ספר"], correct: "ציור" },
                { word: "שקט", options: ["דממה", "רעש", "תנועה"], correct: "דממה" },
                { word: "ערב", options: ["לילה", "יום", "בוקר"], correct: "לילה" },
                { word: "ארוחה", options: ["סעודה", "רעש", "מנוחה"], correct: "סעודה" },
                { word: "אור", options: ["זוהר", "חושך", "ריח"], correct: "זוהר" },
                { word: "אוויר", options: ["רוח", "מים", "אדמה"], correct: "רוח" },
                { word: "ענן", options: ["שמים", "רוח", "ים"], correct: "שמים" },
                { word: "כבד", options: ["משא", "קל", "רזה"], correct: "משא" }
            ],
            3: [
                { word: "מדע", options: ["ידע", "אמונה", "פחד"], correct: "ידע" },
                { word: "תבונה", options: ["חכמה", "טיפשות", "רעש"], correct: "חכמה" },
                { word: "דיון", options: ["ויכוח", "צחוק", "עבודה"], correct: "ויכוח" },
                { word: "שירה", options: ["פזמון", "סיפור", "ריקוד"], correct: "פזמון" },
                { word: "הצלחה", options: ["ניצחון", "כישלון", "עבודה"], correct: "ניצחון" },
                { word: "מסורת", options: ["מנהג", "תחביב", "אופנה"], correct: "מנהג" },
                { word: "רגישות", options: ["עדינות", "עוצמה", "התלהבות"], correct: "עדינות" },
                { word: "עירבון", options: ["בטחון", "סיכון", "דאגה"], correct: "בטחון" },
                { word: "בדידות", options: ["ניכור", "חברה", "אהבה"], correct: "ניכור" },
                { word: "תבוסה", options: ["הפסד", "ניצחון", "משחק"], correct: "הפסד" },
                { word: "מושג", options: ["רעיון", "חפץ", "מחשבה"], correct: "רעיון" },
                { word: "שכנוע", options: ["הוכחה", "טעות", "וויכוח"], correct: "הוכחה" },
                { word: "איכות", options: ["מצוינות", "כישלון", "בינוניות"], correct: "מצוינות" },
                { word: "משבר", options: ["קושי", "הצלחה", "שמחה"], correct: "קושי" },
                { word: "תועלת", options: ["רווח", "הפסד", "כישלון"], correct: "רווח" }
            ]
        };

        let gameMode = 'practice';
        let currentLevel = 1;
        let currentQuestionIndex = 0;
        let score = 0;
        const questionsPerLevel = 10;
        let shuffledQuestions = [];
        let wrongAnswers = [];

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function setGameMode(mode) {
            gameMode = mode;
            document.getElementById('practiceButton').classList.toggle('active', mode === 'practice');
            document.getElementById('examButton').classList.toggle('active', mode === 'exam');
            startGame();
        }

        function startGame() {
            currentLevel = parseInt(document.getElementById("levelSelect").value);
            currentQuestionIndex = 0;
            score = 0;
            wrongAnswers = [];
            shuffledQuestions = shuffleArray([...levels[currentLevel]]);
            document.getElementById("scoreContainer").style.display = "none";
            document.querySelector(".game-container").style.display = "block";
            loadQuestion();
        }

        function loadQuestion() {
            const question = shuffledQuestions[currentQuestionIndex];
            document.getElementById("word").textContent = question.word;
            document.getElementById("feedback").textContent = "";
            const optionsDiv = document.getElementById("options");
            optionsDiv.innerHTML = "";

            shuffleArray([...question.options]).forEach(option => {
                const button = document.createElement("button");
                button.className = "option";
                button.textContent = option;
                button.onclick = () => checkAnswer(option, button);
                optionsDiv.appendChild(button);
            });
        }

        function checkAnswer(selectedOption, buttonElement) {
            const question = shuffledQuestions[currentQuestionIndex];
            const feedback = document.getElementById("feedback");
            if (selectedOption === question.correct) {
                handleCorrectAnswer(buttonElement, feedback);
            } else {
                handleIncorrectAnswer(selectedOption, question, buttonElement, feedback);
            }
        }

        function handleCorrectAnswer(buttonElement, feedback) {
            buttonElement.style.backgroundColor = '#4CAF50';
            feedback.textContent = "נכון! כל הכבוד!";
            feedback.style.color = "green";
            playSound("match");
            score += 5;
            setTimeout(() => nextQuestion(), gameMode === 'practice' ? 1000 : 0);
        }

        function handleIncorrectAnswer(selectedOption, question, buttonElement, feedback) {
            buttonElement.style.backgroundColor = '#f44336';
            feedback.textContent = "טעות, נסה שוב!";
            feedback.style.color = "red";
            playSound("flip");
            if (gameMode === 'exam') {
                wrongAnswers.push({
                    word: question.word,
                    selected: selectedOption,
                    correct: question.correct
                });
                setTimeout(() => nextQuestion(), 0);
            } else {
                setTimeout(() => {
                    buttonElement.style.backgroundColor = '#2196F3';
                }, 1000);
            }
        }

        function nextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questionsPerLevel) {
                loadQuestion();
            } else {
                showScore();
            }
        }

        function showScore() {
            document.querySelector(".game-container").style.display = "none";
            document.getElementById("scoreContainer").style.display = "block";
            const totalPossibleScore = questionsPerLevel * 5;
            const percentage = Math.round((score / totalPossibleScore) * 100);

            let scoreHtml = `<div class="final-grade">ציון סופי: ${percentage}%</div>`;
            scoreHtml += `<div class="exam-score">צברת ${score} נקודות מתוך ${totalPossibleScore}</div>`;

            if (gameMode === 'exam' && wrongAnswers.length > 0) {
                scoreHtml += `<div class="exam-feedback">
                    <h3>תשובות שגויות:</h3>
                    <div class="wrong-answers">`;
                wrongAnswers.forEach(wrong => {
                    scoreHtml += `<div class="wrong-answer-item">
                    המילה: ${wrong.word}<br>
                    בחרת: ${wrong.selected}<br>
                    התשובה הנכונה: ${wrong.correct}
                    </div>`;
                });
                scoreHtml += `</div></div>`;
            }

            document.getElementById("finalScore").innerHTML = scoreHtml;
        }

        function playSound(type) {
            const audio = new Audio(type === 'match' ? 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3' : 'https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3');
            audio.play().catch(err => console.log('Audio play failed:', err));
        }

        // Start the game initially
        startGame();