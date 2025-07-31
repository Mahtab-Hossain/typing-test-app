// Get DOM elements by their IDs
const sampleText = document.getElementById("sample-text").innerText; // The reference text to type
const inputText = document.getElementById("input-text"); // The textarea where the user types
const startButton = document.getElementById("start-button"); // The button to start the test
const time = document.getElementById("timer"); // Element to show remaining time
const totalWordsTyped = document.getElementById("total-words-types"); // Display for total words typed
const correctWordsTyped = document.getElementById("correct-words-types"); // Display for correct words typed
const accuracy = document.getElementById("acc"); // Display for typing accuracy
const accuracyPercentage = document.getElementById("acc"); // Redundant, same as above (can be removed)

// Initialize test state variables
let timeLimit = 60; // Total time allowed for the test (in seconds)
let timeLeft = timeLimit; // Current time remaining
let timer = null; // Holds reference to the interval timer
let isTyping = false; // Flag to check whether the test is running

// Starts the typing test
const startTypingTest = () => {
    if (isTyping) return; // Prevent multiple clicks on Start

    isTyping = true; // Set test as running
    inputText.disabled = false; // Enable the input field
    inputText.value = ""; // Clear previous text
    inputText.focus(); // Focus the textarea
    timeLeft = timeLimit; // Reset timer
    time.innerText = `Time: ${timeLeft} Seconds`; // Display initial time

    // Start countdown timer
    timer = setInterval(() => {
        timeLeft--;
        time.innerText = `Time: ${timeLeft} Seconds`;

        // When time runs out
        if (timeLeft <= 0) {
            clearInterval(timer); // Stop timer
            isTyping = false; // Mark test as finished
            inputText.disabled = true; // Disable input
            calculateResults(); // Show final results (not defined in your code, but assumed)
        }
    }, 1000); // Runs every 1 second
};

// Optional helper function (currently unused)
const updateTimer = () => {
    timerDisplay.innerText = `Time: ${timeLeft}s`; // Updates timer display
};

// Resets all results before starting a new test
const resetResults = () => {
    totalWordsTyped.innerText = "Total Words Typed: 0";
    correctWordsTyped.innerText = "Correct Words Typed: 0";
    accuracy.innerText = "Accuracy: 0%";
};

// Manually ends the test (currently not used directly)
const finishTypingTest = () => {
    clearInterval(timer); // Stop the timer
    isTyping = false; // Update typing status
    inputText.disabled = true; // Prevent further input
    calculateResults(); // Final evaluation (again, not defined here)
};

// Real-time input evaluation: runs every time the user types something
const evaluateInput = () => {
    const inputValue = inputText.value.trim(); // Get current input
    const wordsTyped = inputValue
        .split(/\s+/) // Split by any whitespace
        .filter(word => word.length > 0) // Filter out empty strings
        .length;

    const correctWords = inputValue
        .split(/\s+/) // Split typed text
        .filter((word, index) => word === sampleText.split(/\s+/)[index]) // Match each word with reference
        .length;

    // Update results in the UI
    totalWordsTyped.innerText = `Total Words Typed: ${wordsTyped}`;
    correctWordsTyped.innerText = `Correct Words Typed: ${correctWords}`;

    const accuracyValue = wordsTyped > 0 
        ? Math.round((correctWords / wordsTyped) * 100) 
        : 0;

    accuracy.innerText = `Accuracy: ${accuracyValue}%`;
};

// Event listener: triggers when user clicks the Start button
startButton.addEventListener("click", () => {
    resetResults(); // Clear old results
    startTypingTest(); // Start a new test
});

// Event listener: triggers whenever user types inside the input field
inputText.addEventListener("input", evaluateInput);
