// --- 1. DATA AND STATE ---

const puzzleData = [
    {
        "day_index": 0,
        "target_word": "RIVER",
        "clues": [
            { "pos": 0, "char": "R", "riddle": "The chemical symbol for **R**adon (R)." },
            { "pos": 1, "char": "I", "riddle": "The letter that looks like a vertical line." },
            { "pos": 2, "char": "V", "riddle": "The letter that comes immediately before **W** in the alphabet." },
            { "pos": 3, "char": "E", "riddle": "The letter that is often silent at the end of words like 'time'." },
            { "pos": 4, "char": "R", "riddle": "It's the letter that completes the word 'ROCKE**__**T'." }
        ]
    },
    {
        "day_index": 1,
        "target_word": "PLACE",
        "clues": [
            { "pos": 0, "char": "P", "riddle": "The first letter of a popular breakfast food (Pancake)." },
            { "pos": 1, "char": "L", "riddle": "The letter that completes the word 'LION' (a big cat)." },
            { "pos": 2, "char": "A", "riddle": "The first letter of the alphabet." },
            { "pos": 3, "char": "C", "riddle": "The letter after 'B'." },
            { "pos": 4, "char": "E", "riddle": "The first letter of the word Emergency." }
        ]
    }
    // Add more puzzles here!
];

// Simple word list for validation (should be large in final version)
const VALID_WORDS = ["RIVER", "PLACE", "SNAIL", "AUDIO", "VIERR", "RAVER", "DRIVE", "AILER", "PEACE", "NAILS"]; 

// Game State Variables
let currentPuzzle = null;
let revealedLetters = []; 
let solvedClues = new Array(5).fill(false); 
const MAX_ATTEMPTS = 6;
let currentAttempt = 0;
let currentGuess = "";
let guessHistory = []; 
let keyboardButtons = {};

const WORD_LENGTH = 5;
const CURRENT_STATE_KEY = 'clueWordCurrentState';
const EPOCH_START_DATE = new Date('2025-01-01T00:00:00Z'); 
let activeClueElement = null; 
let activeClueData = null; 


// --- 2. GAME SETUP AND DAILY LOGIC ---

function getPuzzleIndex() {
    const now = new Date();
    const nowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const epochUTC = EPOCH_START_DATE.getTime();
    const msInDay = 86400000;
    let daysElapsed = Math.floor((nowUTC - epochUTC) / msInDay);
    daysElapsed = daysElapsed % puzzleData.length;
    return daysElapsed;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initializeGame() {
    const todayIndex = getPuzzleIndex();
    currentPuzzle = puzzleData[todayIndex];

    const isLoaded = loadGameState(todayIndex);

    if (!isLoaded) {
        // Render from scratch if no saved state
        renderClueBoxes();
    } else {
        // Re-render based on loaded state
        reRenderClueStage();
    }

    renderGuessGrid();
    renderKeyboard();
    setupInputListeners();
}


// --- 3. STATE MANAGEMENT ---

function saveGameState() {
    const gameState = {
        puzzleIndex: currentPuzzle.day_index,
        revealedLetters: revealedLetters,
        solvedClues: solvedClues,
        currentAttempt: currentAttempt,
        guessHistory: guessHistory,
        currentGuess: currentGuess,
    };
    localStorage.setItem(CURRENT_STATE_KEY, JSON.stringify(gameState));
}

function loadGameState(todayIndex) {
    const savedState = localStorage.getItem(CURRENT_STATE_KEY);

    if (savedState) {
        const state = JSON.parse(savedState);
        
        if (state.puzzleIndex === todayIndex) {
            revealedLetters = state.revealedLetters;
            solvedClues = state.solvedClues;
            currentAttempt = state.currentAttempt;
            guessHistory = state.guessHistory;
            currentGuess = state.currentGuess;
            
            if (revealedLetters.length === WORD_LENGTH) {
                transitionToArrangement();
                reRenderArrangementStage();
            }
            return true;
        }
    }
    return false;
}


// --- 4. CLUE INTERACTION ---

function renderClueBoxes() {
    const clueContainer = document.getElementById('clue-boxes');
    const shuffledClues = shuffleArray([...currentPuzzle.clues]); 

    shuffledClues.forEach((clue, index) => {
        const button = document.createElement('button');
        button.classList.add('clue-button');
        button.textContent = `Clue ${index + 1}`;
        button.dataset.cluePos = clue.pos; 
        button.dataset.clueIndex = index;

        button.addEventListener('click', () => openClueModal(clue, button));
        clueContainer.appendChild(button);
    });

    const revealedContainer = document.getElementById('revealed-letters');
    for (let i = 0; i < WORD_LENGTH; i++) {
        const box = document.createElement('div');
        box.classList.add('revealed-letter-box');
        revealedContainer.appendChild(box);
    }
}

function openClueModal(clueData, clueElement) {
    if (clueElement.classList.contains('solved')) {
        // Simple alert for clicking solved clue
        alert('This clue has already been solved! The letter is ' + clueData.char);
        return;
    }

    activeClueElement = clueElement;
    activeClueData = clueData;

    document.getElementById('modal-title').textContent = `Clue for Position ${clueData.pos + 1}`;
    document.getElementById('modal-riddle').innerHTML = clueData.riddle;
    document.getElementById('clue-feedback').textContent = '';
    document.getElementById('clue-answer-input').value = '';
    document.getElementById('modal-backdrop').classList.remove('hidden');
    document.getElementById('clue-modal').classList.remove('hidden');
    document.getElementById('clue-answer-input').focus();
}

function checkClueAnswer() {
    const input = document.getElementById('clue-answer-input').value.trim().toUpperCase();
    // For simplicity, let's allow either the letter itself OR the full word
    const correctLetter = activeClueData.char;
    const feedback = document.getElementById('clue-feedback');

    // Check if the input is the correct single letter
    if (input === correctLetter) {
        revealLetter(correctLetter, activeClueElement);
        closeModal();
    } else {
        feedback.textContent = `Incorrect! Hint: The answer is the single letter ${correctLetter}.`;
        feedback.style.color = '#dc2626'; // Red
    }
}

function revealLetter(letter, element) {
    if (!revealedLetters.includes(letter) || revealedLetters.filter(l => l === letter).length < currentPuzzle.target_word.split('').filter(l => l === letter).length) {
        revealedLetters.push(letter);
        revealedLetters.sort(); // Sort so the jumble pool order is predictable
        
        const jumbleBoxes = document.querySelectorAll('.revealed-letter-box');
        // Update the jumble pool display
        jumbleBoxes.forEach((box, index) => {
            box.textContent = revealedLetters[index] || '';
        });
    }
    
    element.classList.add('solved');
    element.textContent = letter;
    
    const originalPos = parseInt(element.dataset.cluePos);
    solvedClues[originalPos] = true;

    saveGameState(); 

    if (revealedLetters.length === WORD_LENGTH) {
        transitionToArrangement();
    }
}

function closeModal() {
    document.getElementById('modal-backdrop').classList.add('hidden');
    document.getElementById('clue-modal').classList.add('hidden');
}


// --- 5. ARRANGEMENT LOGIC (WORDLE) ---

function transitionToArrangement() {
    document.getElementById('clue-section').classList.add('hidden');
    document.getElementById('arrangement-section').classList.remove('hidden');
    // Hide the jumble pool since the keyboard now represents the available letters
    document.getElementById('revealed-letters-container').classList.add('hidden');
}

function isLetterSetValid(guess, revealedLetters) {
    // Create copies to manipulate
    const revealedCopy = [...revealedLetters];
    const guessCopy = guess.split('');

    if (guessCopy.length !== revealedCopy.length) return false;

    // Check if every letter in the guess exists in the revealed set
    for (const char of guessCopy) {
        const index = revealedCopy.indexOf(char);
        if (index === -1) {
            return false; // Found a letter not in the revealed set
        } else {
            revealedCopy.splice(index, 1); // Remove it to handle duplicates
        }
    }
    return revealedCopy.length === 0; // Ensures the count is exact
}

function submitGuess(guess) {
    const normalizedGuess = guess.toUpperCase();

    // 1. Initial Validation: Is it a valid word?
    if (!VALID_WORDS.includes(normalizedGuess)) {
        alert("Not a recognized 5-letter word.");
        return;
    }

    // 2. ClueWord Validation: Check if the letter set is correct
    if (!isLetterSetValid(normalizedGuess, revealedLetters)) {
        alert("Must use the exact letters in the Jumble Pool for the anagram!");
        return;
    }

    // 3. Process Feedback
    const feedback = checkWordleFeedback(normalizedGuess, currentPuzzle.target_word);
    
    guessHistory.push({ guess: normalizedGuess, feedback: feedback });
    
    applyFeedbackToGrid(feedback);
    applyFeedbackToKeyboard(feedback);

    // 4. Update Game State
    if (normalizedGuess === currentPuzzle.target_word) {
        endGame(true);
    } else {
        currentAttempt++;
        document.getElementById('attempts-left').textContent = MAX_ATTEMPTS - currentAttempt;
        currentGuess = "";
        
        saveGameState(); 

        if (currentAttempt >= MAX_ATTEMPTS) {
            endGame(false);
        }
    }
}

function checkWordleFeedback(guess, target) {
    const feedback = [];
    const targetArray = target.split('');
    const targetCounts = {};
    targetArray.forEach(char => {
        targetCounts[char] = (targetCounts[char] || 0) + 1;
    });

    // 1. First Pass: GREEN
    for (let i = 0; i < WORD_LENGTH; i++) {
        const letter = guess[i];
        if (letter === targetArray[i]) {
            feedback[i] = { letter, color: 'solved' }; 
            targetCounts[letter]--;
        } else {
            feedback[i] = { letter, color: 'none' }; 
        }
    }

    // 2. Second Pass: YELLOW and GRAY
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (feedback[i].color === 'none') {
            const letter = guess[i];
            
            if (targetCounts[letter] > 0) {
                feedback[i] = { letter, color: 'present' }; 
                targetCounts[letter]--;
            } else {
                feedback[i] = { letter, color: 'absent' }; 
            }
        }
    }
    return feedback;
}

function applyFeedbackToGrid(feedback) {
    const rowCells = document.querySelectorAll(`.guess-cell[data-row="${currentAttempt}"]`);

    feedback.forEach((f, index) => {
        const cell = rowCells[index];
        cell.textContent = f.letter;
        setTimeout(() => {
            cell.classList.add(f.color); 
        }, index * 200);
    });
}

function applyFeedbackToKeyboard(feedback) {
    feedback.forEach(f => {
        const key = keyboardButtons[f.letter];
        if (key) {
            if (f.color === 'solved') {
                key.classList.remove('present', 'absent');
                key.classList.add('solved');
            } else if (f.color === 'present' && !key.classList.contains('solved')) {
                 key.classList.remove('absent');
                 key.classList.add('present');
            } else if (f.color === 'absent' && !key.classList.contains('solved') && !key.classList.contains('present')) {
                key.classList.add('absent');
            }
        }
    });
}

function endGame(win) {
    const message = win 
        ? "🥳 Congratulations! You solved the ClueWord!" 
        : `😭 Game Over! The word was ${currentPuzzle.target_word}.`;
    alert(message); 
    // Clear state so a new puzzle loads tomorrow
    localStorage.removeItem(CURRENT_STATE_KEY); 
}


// --- 6. UI RENDERING / INPUT HANDLING ---

function renderGuessGrid() {
    const gridContainer = document.getElementById('guess-grid');
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        for (let j = 0; j < WORD_LENGTH; j++) {
            const cell = document.createElement('div');
            cell.classList.add('guess-cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            gridContainer.appendChild(cell);
        }
    }
}

function renderKeyboard() {
    const keyboardContainer = document.getElementById('keyboard-container');
    keyboardContainer.innerHTML = '';
    const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

    rows.forEach(rowString => {
        const row = document.createElement('div');
        row.classList.add('keyboard-row');
        
        if (rowString === "ZXCVBNM") {
            row.appendChild(createKey('ENTER', 'Enter'));
        }

        for (const char of rowString) {
            row.appendChild(createKey(char, char));
        }
        
        if (rowString === "ZXCVBNM") {
            row.appendChild(createKey('DEL', 'Delete'));
        }
        keyboardContainer.appendChild(row);
    });

    document.querySelectorAll('.key-button').forEach(button => {
        keyboardButtons[button.dataset.key] = button;
    });
}

function createKey(key, text) {
    const button = document.createElement('button');
    button.classList.add('key-button');
    button.textContent = text;
    button.dataset.key = key;
    button.addEventListener('click', () => processInput(key));
    return button;
}

function setupInputListeners() {
    document.addEventListener('keydown', (e) => {
        const key = e.key.toUpperCase();
        if (document.getElementById('clue-modal').classList.contains('hidden')) {
            if (key.length === 1 && key.match(/[A-Z]/)) {
                processInput(key);
            } else if (key === 'ENTER') {
                processInput('ENTER');
            } else if (key === 'BACKSPACE') {
                processInput('DEL');
            }
        }
    });
}

function processInput(key) {
    if (revealedLetters.length < WORD_LENGTH || currentAttempt >= MAX_ATTEMPTS) {
        return;
    }

    if (key === 'ENTER') {
        if (currentGuess.length === WORD_LENGTH) {
            submitGuess(currentGuess);
        } else {
            console.log("Guess must be 5 letters long.");
        }
    } else if (key === 'DEL' && currentGuess.length > 0) {
        currentGuess = currentGuess.slice(0, -1);
        updateGuessGrid();
    } else if (key.length === 1 && key.match(/[A-Z]/) && currentGuess.length < WORD_LENGTH) {
        currentGuess += key;
        updateGuessGrid();
    }
}

function updateGuessGrid() {
    const cells = document.querySelectorAll(`.guess-cell[data-row="${currentAttempt}"]`);
    
    cells.forEach(cell => cell.textContent = '');

    for (let i = 0; i < currentGuess.length; i++) {
        cells[i].textContent = currentGuess[i];
    }
}


// --- 7. RE-RENDER ON LOAD (FOR STATE MANAGEMENT) ---

function reRenderClueStage() {
    // Renders the clue buttons and marks the solved ones
    renderClueBoxes();
    const clueButtons = document.querySelectorAll('.clue-button');

    clueButtons.forEach(button => {
        const originalPos = parseInt(button.dataset.cluePos);
        if (solvedClues[originalPos]) {
            const clueData = currentPuzzle.clues.find(c => c.pos === originalPos);
            button.classList.add('solved');
            button.textContent = clueData.char;
        }
    });

    // Renders the revealed letters in the jumble pool
    const jumbleBoxes = document.querySelectorAll('.revealed-letter-box');
    revealedLetters.forEach((letter, index) => {
        jumbleBoxes[index].textContent = letter;
    });
}

function reRenderArrangementStage() {
    // 1. Re-apply all past guesses to the grid and keyboard
    guessHistory.forEach((history, rowIndex) => {
        const rowCells = document.querySelectorAll(`.guess-cell[data-row="${rowIndex}"]`);
        history.feedback.forEach((f, cellIndex) => {
            const cell = rowCells[cellIndex];
            cell.textContent = f.letter;
            cell.classList.add(f.color);
        });
        applyFeedbackToKeyboard(history.feedback);
    });

    // 2. Set the current attempts left display
    document.getElementById('attempts-left').textContent = MAX_ATTEMPTS - currentAttempt;

    // 3. Update current guess (if any)
    updateGuessGrid(); 
}


// --- 8. INITIALIZATION ---

window.onload = () => {
    initializeGame();
    // Add event listener for the submit button inside the modal
    document.getElementById('submit-clue-button').addEventListener('click', checkClueAnswer);
    document.getElementById('close-modal-button').addEventListener('click', closeModal);
};
