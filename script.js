// Random Words
const words = [
    "ataraxia",
    "borborygmus",
    "cabotage",
    "defenestration",
    "eidetic",
    "floccinaucinihilipilification",
    "gobemouche",
    "hiraeth",
    "irenic",
    "jentacular",
    "kakistocracy",
    "limerence",
    "mumpsimus",
    "nephilim",
    "obambulate",
    "petrichor",
    "quixotic",
    "recumbentibus",
    "sesquipedalian",
    "taradiddle",
    "ultracrepidarian",
    "verisimilitude",
    "widdershins",
    "xenodochial",
    "yonderly",
    "zeugma"
];

// Targeting Elements
const wordDiv = document.querySelector(".word-div");
const attemptsDiv = document.querySelector(".attempts");
const keyboardDiv = document.querySelector(".keyboard");
const retryButton = document.querySelector("#retry-button");

// Creating Game Variables
let secretWord;
let attempts;
let guessedLetters;

// Create Random Word
function randomWord() {
    return words[Math.floor(Math.random() * words.length - 1)];
}

// Initialize Game Board
function initialize() {
    // initializing/resetting game variables
    let letters = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    ];
    let display = "";
    attempts = 7;
    guessedLetters = [];
    secretWord = randomWord().toUpperCase();

    // creating display for word
    for (let i = 0; i < secretWord.length; i++) {
        display += "_";
    }

    // initializing/resetting game elements
    retryButton.style.display = "none";
    wordDiv.innerHTML = display;
    attemptsDiv.innerHTML = `You have ${attempts} attempts left.`;
    keyboardDiv.innerHTML = "";

    // adding keyboard to game
    letters.forEach((letter) => {
        const letterElement = document.createElement("button");
        letterElement.innerText = letter;
        letterElement.classList.add("letter");
        letterElement.addEventListener("click", (e) => {
            e.target.disabled = true;
            guess(secretWord, e.target.innerText);
        });
        keyboardDiv.append(letterElement);
    });
}

// Update Word Status
function guess(word, letter) {
    let display = "";

    guessedLetters.push(letter);
    for (let i = 0; i < word.length; i++) {
        if (guessedLetters.includes(word.charAt(i))) {
            display += word.charAt(i);
        } else {
            display += "_";
        }
    }

    wordDiv.innerHTML = display;

    if (!display.includes("_")) {
        gameOver(true);
    } else if (secretWord.includes(letter)) {
        attemptsDiv.innerHTML = `The letter, ${letter}, is in the word! <br> You have ${attempts} attempts left.`;
    } else if (attempts > 1) {
        attempts--;
        attemptsDiv.innerHTML = `You have ${attempts} attempts left.`;
    } else {
        gameOver(false);
    }
}

// Disable Buttons on Game Over
function gameOver(win) {
    const letterButtons = document.querySelectorAll(".letter");
    let disabledButtons = 0;
    letterButtons.forEach((button) => {
        if (button.disabled) {
            disabledButtons++;
        } else {
            button.disabled = true;
        }
    });

    if (win) {
        attemptsDiv.innerHTML = `Correct! <br> It took you ${disabledButtons} letters to guess it.`;
    } else {
        attemptsDiv.innerHTML = `Failed! The word is ${secretWord}.`;
    }
    retryButton.style.display = "block";
}

// Reset/Retry event
retryButton.addEventListener("click", initialize);

// Initialize Game Board
initialize();