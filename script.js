// Get DOM elements
const sampleText = document.getElementById("sample-text").innerText;
const inputText = document.getElementById("input-text");
const startButton = document.getElementById("start-button");
const time = document.getElementById("timer");
const totalWordsTyped = document.getElementById("total-words-types");
const correctWordsTyped = document.getElementById("correct-words-types");
const accuracy = document.getElementById("acc");
const typingSpeed = document.getElementById("wpm");

// State variables
let timeLimit = 60; // in seconds
let timeLeft = timeLimit;
let timer = null;
let isTyping = false;

// Resets all display values
const resetResults = () => {
    totalWordsTyped.innerText = "0";
    correctWordsTyped.innerText = " 0";
    accuracy.innerText = " 0%";
    typingSpeed.innerText = " 0";
};

// Called to start the typing test
const startTypingTest = () => {
    if (isTyping) return;

    isTyping = true;
    inputText.disabled = false;      // Enable textarea
    inputText.value = "";            // Clear previous text
    inputText.focus();               // Put cursor in textarea
    timeLeft = timeLimit;
    time.innerText = `Time: ${timeLeft} Seconds`;
    resetResults();

    // Start the countdown
    timer = setInterval(() => {
        timeLeft--;
        time.innerText = `Time: ${timeLeft} Seconds`;

        //Stop test when time runs out
        if (timeLeft <= 0) {
            clearInterval(timer);
            isTyping = false;
            inputText.disabled = true;     // Disable textarea
            evaluateInput();               // Show final result
        }
    }, 1000);
};

//Evaluates typed text and updates display
const evaluateInput = () => {
    const inputValue = inputText.value.trim();

    const typedWords = inputValue
        .split(/\s+/)
        .filter(word => word.length > 0);

    const sampleWords = sampleText
        .split(/\s+/);

    const totalWords = typedWords.length;

    // Count correct words at correct positions
    const correctWords = typedWords.filter((word, index) => word === sampleWords[index]).length;

    const accuracyPercent = totalWords > 0
        ? Math.round((correctWords / totalWords) * 100)
        : 0;

    //Calculate Typing Speed (WPM)
    const minutesTaken = (timeLimit - timeLeft) / 60;
    const wpm = minutesTaken > 0 ? Math.round(correctWords / minutesTaken) : 0;

    // Update UI
    totalWordsTyped.innerText = `${totalWords}`;
    correctWordsTyped.innerText = `${correctWords}`;
    accuracy.innerText = `${accuracyPercent}%`;
    typingSpeed.innerText = `${wpm} WPM`;
};

//Event: Start button
startButton.addEventListener("click", () => {
    startTypingTest(); // Begin test
});

//Event: On every input update
inputText.addEventListener("input", evaluateInput);
