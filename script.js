// --- 1. DATA AND STATE ---

// Error handling utility
function handleError(error, context = '') {
    console.error(`Error in ${context}:`, error);
    showToast(`Something went wrong: ${error.message}`, 'error');
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    toast.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations for toasts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

const puzzleData = [
    {
        day_index: 0,
        target_word: "RIVER",
        clues: [
            { pos: 0, char: "R", riddle: "A current carries me downhill, bridges cross me, and eventually I may meet the sea. What am I?" },
            { pos: 1, char: "I", riddle: "Take the first letter of the frozen crystals that fall during a winter storm." },
            { pos: 2, char: "V", riddle: "In the word VALLEY, I am the only letter shaped like two lines meeting at a point. Which letter?" },
            { pos: 3, char: "E", riddle: "What letter begins EAST, the direction of sunrise?" },
            { pos: 4, char: "R", riddle: "RAIN and RAINBOW have something in common at their beginning. What letter is it?" }
        ]
    },

    {
        day_index: 1,
        target_word: "CLOUD",
        clues: [
            { pos: 0, char: "C", riddle: "I can be black, white, or stormy, but I float rather than fly. What am I?" },
            { pos: 1, char: "L", riddle: "A lion, leopard and lynx all share my starting letter. What is it?" },
            { pos: 2, char: "O", riddle: "I begin ORBIT, the path followed by a planet around a star." },
            { pos: 3, char: "U", riddle: "What letter begins UMBRELLA, the thing you wish you had when a cloud opens up?" },
            { pos: 4, char: "D", riddle: "Day and night disagree about me: DAY begins with this letter. What is it?" }
        ]
    },

    {
        day_index: 2,
        target_word: "TIGER",
        clues: [
            { pos: 0, char: "T", riddle: "I have stripes, four paws, and a reputation for being the largest of the big cats. What am I?" },
            { pos: 1, char: "I", riddle: "What letter begins ICE, the solid form of water?" },
            { pos: 2, char: "G", riddle: "I begin GRAVITY, the invisible force that keeps your feet on Earth." },
            { pos: 3, char: "E", riddle: "Which letter starts ELEPHANT, the animal with the unmistakable trunk?" },
            { pos: 4, char: "R", riddle: "A rainbow starts with me, and so does the word RED. What am I?" }
        ]
    },

    {
        day_index: 3,
        target_word: "DREAM",
        clues: [
            { pos: 0, char: "D", riddle: "I happen in your head while you sleep and can be impossible, frightening, or wonderful. What am I?" },
            { pos: 1, char: "R", riddle: "What letter begins RIDDLE, something you are solving right now?" },
            { pos: 2, char: "E", riddle: "I begin ECHO, the sound that answers you from a distant wall." },
            { pos: 3, char: "A", riddle: "Apple, astronaut and adventure all begin with the same letter. Which one?" },
            { pos: 4, char: "M", riddle: "What letter begins MIRROR, the thing that copies your reflection?" }
        ]
    },

    {
        day_index: 4,
        target_word: "FLAME",
        clues: [
            { pos: 0, char: "F", riddle: "I dance above a candle, need oxygen, and disappear when the fire goes out. What am I?" },
            { pos: 1, char: "L", riddle: "Take the first letter of LAVA, molten rock escaping a volcano." },
            { pos: 2, char: "A", riddle: "I begin ASH, what remains after something burns completely." },
            { pos: 3, char: "M", riddle: "Moon, mountain and mystery all begin with me. Which letter?" },
            { pos: 4, char: "E", riddle: "What letter begins EMBER, the glowing piece of wood left after a fire?" }
        ]
    },

    {
        day_index: 5,
        target_word: "BEACH",
        clues: [
            { pos: 0, char: "B", riddle: "I am the sandy edge where land meets the sea. What am I?" },
            { pos: 1, char: "E", riddle: "Which letter starts EBB, when the tide moves away from shore?" },
            { pos: 2, char: "A", riddle: "I begin ANCHOR, the heavy object that keeps a boat from drifting." },
            { pos: 3, char: "C", riddle: "What letter begins CORAL, home to countless creatures beneath warm seas?" },
            { pos: 4, char: "H", riddle: "I begin HORIZON, where the sky appears to meet the sea." }
        ]
    },

    {
        day_index: 6,
        target_word: "STORM",
        clues: [
            { pos: 0, char: "S", riddle: "Thunder, lightning, heavy rain and strong winds can all arrive with me. What am I?" },
            { pos: 1, char: "T", riddle: "What letter begins THUNDER, the sound that follows lightning?" },
            { pos: 2, char: "O", riddle: "I begin OCEAN, the enormous body of salt water covering much of Earth." },
            { pos: 3, char: "R", riddle: "RAIN starts with me, and rain is one of a storm's favorite ingredients." },
            { pos: 4, char: "M", riddle: "What letter begins MONSOON, a seasonal wind system famous for heavy rain?" }
        ]
    },

    {
        day_index: 7,
        target_word: "PIANO",
        clues: [
            { pos: 0, char: "P", riddle: "I have black and white keys, but no locks. What instrument am I?" },
            { pos: 1, char: "I", riddle: "I begin INSTRUMENT, something you can use to make music." },
            { pos: 2, char: "A", riddle: "What letter begins ARPEGGIO, when the notes of a chord are played one after another?" },
            { pos: 3, char: "N", riddle: "I begin NOTE, a single sound or written symbol in music." },
            { pos: 4, char: "O", riddle: "What letter begins OCTAVE, the musical interval spanning eight notes?" }
        ]
    },

    {
        day_index: 8,
        target_word: "SHARK",
        clues: [
            { pos: 0, char: "S", riddle: "I have lived in Earth's oceans for hundreds of millions of years and have rows of teeth. What am I?" },
            { pos: 1, char: "H", riddle: "What letter begins HUNGRY, something this predator is often portrayed as?" },
            { pos: 2, char: "A", riddle: "I begin AQUATIC, a word describing something that lives in water." },
            { pos: 3, char: "R", riddle: "What letter begins REEF, a place where many ocean creatures live?" },
            { pos: 4, char: "K", riddle: "I begin KELP, the giant seaweed found in some cold coastal waters." }
        ]
    },

    {
        day_index: 9,
        target_word: "MAGIC",
        clues: [
            { pos: 0, char: "M", riddle: "A magician pulls rabbits from hats, makes objects disappear, and claims to do this. What is it?" },
            { pos: 1, char: "A", riddle: "I begin ALCHEMY, the legendary attempt to transform ordinary materials into precious ones." },
            { pos: 2, char: "G", riddle: "What letter begins GLIMMER, a faint magical-looking shine?" },
            { pos: 3, char: "I", riddle: "I begin ILLUSION, something that looks real but isn't." },
            { pos: 4, char: "C", riddle: "What letter begins CAST, as in the spell a wizard might cast?" }
        ]
    },

    {
        day_index: 10,
        target_word: "HEART",
        clues: [
            { pos: 0, char: "H", riddle: "I beat thousands of times a day without you having to think about it. What organ am I?" },
            { pos: 1, char: "E", riddle: "I begin EMOTION, something strongly connected with the heart in everyday language." },
            { pos: 2, char: "A", riddle: "What letter begins ARTERY, a vessel carrying blood away from the heart?" },
            { pos: 3, char: "R", riddle: "I begin RHYTHM, something your heartbeat has." },
            { pos: 4, char: "T", riddle: "What letter begins THROB, a word describing a strong rhythmic beat?" }
        ]
    },

    {
        day_index: 11,
        target_word: "SPACE",
        clues: [
            { pos: 0, char: "S", riddle: "No air, no ordinary ground, countless stars — astronauts travel through me. What am I?" },
            { pos: 1, char: "P", riddle: "I begin PLANET, a world orbiting a star." },
            { pos: 2, char: "A", riddle: "What letter begins ASTRONAUT, someone trained to travel beyond Earth?" },
            { pos: 3, char: "C", riddle: "I begin COSMOS, everything that exists in the universe." },
            { pos: 4, char: "E", riddle: "What letter begins ECLIPSE, when one celestial body blocks another from view?" }
        ]
    },

    {
        day_index: 12,
        target_word: "TRAIN",
        clues: [
            { pos: 0, char: "T", riddle: "I have carriages, run on tracks, and can carry hundreds of passengers. What am I?" },
            { pos: 1, char: "R", riddle: "What letter begins RAIL, the metal track I travel on?" },
            { pos: 2, char: "A", riddle: "I begin ARRIVAL, the moment a train reaches its destination." },
            { pos: 3, char: "I", riddle: "I begin INTERCITY, describing a train journey between cities." },
            { pos: 4, char: "N", riddle: "What letter begins NIGHT, when sleeper trains are often busiest?" }
        ]
    },

    {
        day_index: 13,
        target_word: "GREEN",
        clues: [
            { pos: 0, char: "G", riddle: "Grass, many leaves, and an unripe banana can share this color. What color?" },
            { pos: 1, char: "R", riddle: "I begin RAIN, something plants often need to stay green." },
            { pos: 2, char: "E", riddle: "What letter begins ENVY, an emotion traditionally represented by this color?" },
            { pos: 3, char: "E", riddle: "I begin EMERALD, a gemstone famous for its rich green color." },
            { pos: 4, char: "N", riddle: "What letter begins NATURE, where you can find green almost everywhere?" }
        ]
    },

    {
        day_index: 14,
        target_word: "GHOST",
        clues: [
            { pos: 0, char: "G", riddle: "Folklore says I may haunt an old house after death. What am I?" },
            { pos: 1, char: "H", riddle: "I begin HAUNTED, a word often used for a place supposedly visited by spirits." },
            { pos: 2, char: "O", riddle: "What letter begins OUIJA, a board associated with supposed communication with spirits?" },
            { pos: 3, char: "S", riddle: "I begin SPIRIT, a supernatural being in many traditions." },
            { pos: 4, char: "T", riddle: "What letter begins TOMB, a place where the dead may be buried?" }
        ]
    },

    {
        day_index: 15,
        target_word: "BRAIN",
        clues: [
            { pos: 0, char: "B", riddle: "I control thought, memory, movement and much of what makes you you. What organ am I?" },
            { pos: 1, char: "R", riddle: "I begin REASON, one ability associated with the human mind." },
            { pos: 2, char: "A", riddle: "What letter begins AWARENESS, the ability to perceive what is happening around you?" },
            { pos: 3, char: "I", riddle: "I begin IDEA, something that can suddenly appear in your mind." },
            { pos: 4, char: "N", riddle: "What letter begins NEURON, a cell that carries signals in the nervous system?" }
        ]
    },

    {
        day_index: 16,
        target_word: "ROBOT",
        clues: [
            { pos: 0, char: "R", riddle: "I can be programmed to perform tasks automatically and may look surprisingly human. What am I?" },
            { pos: 1, char: "O", riddle: "I begin OPERATE, what a machine does when it is functioning." },
            { pos: 2, char: "B", riddle: "What letter begins BOT, a short form commonly used for an automated program?" },
            { pos: 3, char: "O", riddle: "I begin OUTPUT, what a computer or machine produces after processing something." },
            { pos: 4, char: "T", riddle: "What letter begins TECHNOLOGY, the field that makes machines like me possible?" }
        ]
    },

    {
        day_index: 17,
        target_word: "FLUTE",
        clues: [
            { pos: 0, char: "F", riddle: "I am a wind instrument with holes that you cover with your fingers. What am I?" },
            { pos: 1, char: "L", riddle: "I begin LUTE, an old stringed instrument whose name sounds suspiciously close to today's answer." },
            { pos: 2, char: "U", riddle: "What letter begins UPPER, the part of your body where you might hold a flute near your mouth?" },
            { pos: 3, char: "T", riddle: "I begin TUNE, something a flute can play." },
            { pos: 4, char: "E", riddle: "What letter begins ENSEMBLE, a group of musicians playing together?" }
        ]
    },

    {
        day_index: 18,
        target_word: "CROWN",
        clues: [
            { pos: 0, char: "C", riddle: "A king or queen may wear me as a symbol of authority. What am I?" },
            { pos: 1, char: "R", riddle: "I begin ROYAL, describing something connected with a king or queen." },
            { pos: 2, char: "O", riddle: "What letter begins ORNAMENT, something decorative that a crown can contain?" },
            { pos: 3, char: "W", riddle: "I begin WEAR, what a monarch may do with a crown." },
            { pos: 4, char: "N", riddle: "What letter begins NOBLE, a word associated with aristocracy?" }
        ]
    },

    {
        day_index: 19,
        target_word: "LIGHT",
        clues: [
            { pos: 0, char: "L", riddle: "I let you see in darkness, can come from a bulb, and travels extremely fast. What am I?" },
            { pos: 1, char: "I", riddle: "I begin ILLUMINATE, meaning to provide light." },
            { pos: 2, char: "G", riddle: "What letter begins GLOW, the soft light produced by something warm or luminous?" },
            { pos: 3, char: "H", riddle: "I begin HALO, a ring of light often shown around the heads of saints." },
            { pos: 4, char: "T", riddle: "What letter begins TORCH, a portable source of light?" }
        ]
    },

    {
        day_index: 20,
        target_word: "EAGLE",
        clues: [
            { pos: 0, char: "E", riddle: "I soar high above the ground, have powerful talons, and am known for excellent eyesight. What bird am I?" },
            { pos: 1, char: "A", riddle: "I begin AERIAL, meaning related to the air." },
            { pos: 2, char: "G", riddle: "What letter begins GLIDE, how an eagle can move through the air without flapping?" },
            { pos: 3, char: "L", riddle: "I begin LOFTY, meaning high above the ground." },
            { pos: 4, char: "E", riddle: "What letter begins EYRIE, the high nest of a bird of prey?" }
        ]
    },

    {
        day_index: 21,
        target_word: "FROST",
        clues: [
            { pos: 0, char: "F", riddle: "I cover grass and windows with tiny ice crystals on very cold mornings. What am I?" },
            { pos: 1, char: "R", riddle: "I begin RIME, a coating of ice formed from freezing fog or mist." },
            { pos: 2, char: "O", riddle: "What letter begins OVERNIGHT, when frost often forms?" },
            { pos: 3, char: "S", riddle: "I begin SNOW, another form of frozen water falling from the sky." },
            { pos: 4, char: "T", riddle: "What letter begins TEMPERATURE, the measurement that tells us how cold it is?" }
        ]
    },

    {
        day_index: 22,
        target_word: "SMILE",
        clues: [
            { pos: 0, char: "S", riddle: "I curve across your face when you're happy, amused, or trying to look friendly. What am I?" },
            { pos: 1, char: "M", riddle: "I begin MIRTH, an old-fashioned word for cheerful amusement." },
            { pos: 2, char: "I", riddle: "What letter begins IRONY, something that can make people smile when the unexpected happens?" },
            { pos: 3, char: "L", riddle: "I begin LAUGH, something often accompanying a genuine smile." },
            { pos: 4, char: "E", riddle: "What letter begins ENJOYMENT, the feeling behind many smiles?" }
        ]
    },

    {
        day_index: 23,
        target_word: "GRAPE",
        clues: [
            { pos: 0, char: "G", riddle: "I grow in bunches on vines and can be turned into raisins or juice. What fruit am I?" },
            { pos: 1, char: "R", riddle: "I begin RAISIN, what a grape becomes after losing most of its water." },
            { pos: 2, char: "A", riddle: "What letter begins ARBOR, a structure that can support grapevines?" },
            { pos: 3, char: "P", riddle: "I begin PURPLE, a common color for this fruit." },
            { pos: 4, char: "E", riddle: "What letter begins EAT, something you can do with a grape?" }
        ]
    },

    {
        day_index: 24,
        target_word: "SHOES",
        clues: [
            { pos: 0, char: "S", riddle: "I protect your feet while walking, running, or playing sports. What am I?" },
            { pos: 1, char: "H", riddle: "I begin HEEL, the raised or rear part of footwear." },
            { pos: 2, char: "O", riddle: "What letter begins OUTDOOR, where sturdy shoes often become useful?" },
            { pos: 3, char: "E", riddle: "I begin ELASTIC, material sometimes used in shoe laces or bands." },
            { pos: 4, char: "S", riddle: "What letter begins SOLE, the bottom part of a shoe?" }
        ]
    },

    {
        day_index: 25,
        target_word: "TOWER",
        clues: [
            { pos: 0, char: "T", riddle: "I rise high above the ground and can contain bells, clocks, or observation decks. What am I?" },
            { pos: 1, char: "O", riddle: "I begin OBSERVATION, something you might do from the top of a tower." },
            { pos: 2, char: "W", riddle: "What letter begins WIND, something strong towers must withstand?" },
            { pos: 3, char: "E", riddle: "I begin ELEVATOR, a machine that can carry you to a tower's upper floors." },
            { pos: 4, char: "R", riddle: "What letter begins ROOFTOP, the highest exterior part of many buildings?" }
        ]
    },

    {
        day_index: 26,
        target_word: "OASIS",
        clues: [
            { pos: 0, char: "O", riddle: "I am a fertile place with water and plants surrounded by desert. What am I?" },
            { pos: 1, char: "A", riddle: "I begin ARID, describing land with very little rainfall." },
            { pos: 2, char: "S", riddle: "What letter begins SAND, the material covering much of a desert?" },
            { pos: 3, char: "I", riddle: "I begin IRRIGATION, bringing water to dry land." },
            { pos: 4, char: "S", riddle: "What letter begins SPRING, a natural source of water that can create an oasis?" }
        ]
    },

    {
        day_index: 27,
        target_word: "QUEST",
        clues: [
            { pos: 0, char: "Q", riddle: "A knight in a fantasy story might undertake me to find treasure, rescue someone, or defeat a villain. What am I?" },
            { pos: 1, char: "U", riddle: "I begin UNKNOWN, exactly what an adventurer may encounter during a quest." },
            { pos: 2, char: "E", riddle: "What letter begins EXPLORE, something you do during an adventure?" },
            { pos: 3, char: "S", riddle: "I begin SWORD, a classic weapon carried by fantasy adventurers." },
            { pos: 4, char: "T", riddle: "What letter begins TREASURE, something many quests are designed to find?" }
        ]
    },

    {
        day_index: 28,
        target_word: "SPACE",
        clues: [
            { pos: 0, char: "S", riddle: "I am the final frontier in many science-fiction stories. What am I?" },
            { pos: 1, char: "P", riddle: "I begin PROBE, an unmanned spacecraft sent to investigate distant worlds." },
            { pos: 2, char: "A", riddle: "What letter begins ASTEROID, a rocky object orbiting the Sun?" },
            { pos: 3, char: "C", riddle: "I begin COMET, an icy object that can develop a glowing tail near the Sun." },
            { pos: 4, char: "E", riddle: "What letter begins EXOPLANET, a planet orbiting a star beyond our Sun?" }
        ]
    },

    {
        day_index: 29,
        target_word: "MUSIC",
        clues: [
            { pos: 0, char: "M", riddle: "I can make you dance, relax, cry, remember a moment, or sing badly in the shower. What am I?" },
            { pos: 1, char: "U", riddle: "I begin UKULELE, a small four-stringed musical instrument." },
            { pos: 2, char: "S", riddle: "What letter begins SYMPHONY, a large-scale musical composition usually performed by an orchestra?" },
            { pos: 3, char: "I", riddle: "I begin INSTRUMENT, something musicians use to create sound." },
            { pos: 4, char: "C", riddle: "What letter begins CHORUS, the repeated section of many songs?" }
        ]
    }
];
// Expanded word list for validation
const VALID_WORDS = [
    // All puzzle target words (original)
    "RIVER", "PLACE", "OCEAN", "TIGER", "MUSIC", "DREAM", "LIGHT", "EARTH", "STORM", "PEACE",
    "BRAVE", "SMART", "HAPPY", "SWEET", "FRESH", "QUICK", "GREEN", "BLUSH", "WATER", "FUNNY",
    // All puzzle target words (new)
    "FLAME", "BEACH", "STONE", "CROWN", "FROST", "PIANO", "GRAPE", "CLOUD", "BLEND", "CRISP",
    "GLOBE", "HASTE", "IVORY", "PLUME", "RIDGE", "SWIFT", "THYME", "VALOR", "WHEAT", "YIELD",
    // Common valid anagrams / alternate arrangements
    "TONES", "NOTES", "ONSET", "PAGER", "REAP", "REAPS", "PARGE", "COULD", "ROWED", "LOWED",
    "LOWER", "OWLER", "PLUME", "LUMPS", "SLUMP", "CRIBS", "GIRDS", "DINER", "GRIDE",
    // Additional valid 5-letter words
    "HEART", "WORLD", "NIGHT", "SMILE", "MAGIC", "POWER", "STORY", "DANCE", "SUNNY", "CLEAN",
    "QUIET", "SNAIL", "DRIVE", "SHINE", "GRACE", "HONOR", "TRUTH", "FAITH", "STRONG", "FLARE",
    "FRAME", "LEAFY", "BLAZE", "BRAVE", "STOVE", "TROVE", "CRONE", "SCONE", "CHORE", "OCHER",
    "PARCH", "GRAPH", "GRASP", "CLASP", "BLAND", "LENDS", "FIEND", "FROWN", "GROWN", "SWORN",
    "WORDS", "SWORD", "FROST", "SPORT", "PORTS", "PROSE", "ROPES", "PORES", "REPOS", "SPORE",
    "STORE", "TORES", "ROTES", "VOTES", "STOVE", "CROWS", "ROWDY", "DOWRY", "WORDY", "ROWEL"
];

// Game State Variables
let currentPuzzle = null;
let revealedLetters = []; 
let solvedClues = new Array(5).fill(false); 
const MAX_ATTEMPTS = 2;
let currentAttempt = 0;
let currentGuess = "";
let guessHistory = []; 
let keyboardButtons = {};

const WORD_LENGTH = 5;
const CURRENT_STATE_KEY = 'clueWordCurrentState';
const STATISTICS_KEY = 'clueWordStatistics';
const EPOCH_START_DATE = new Date('2025-01-01T00:00:00Z'); 
let activeClueElement = null;
let activeClueData = null;
let gameCompleted = false;
let gameWon = false;

// Statistics system
function getStatistics() {
    const stats = localStorage.getItem(STATISTICS_KEY);
    return stats ? JSON.parse(stats) : {
        totalGames: 0,
        wins: 0,
        currentStreak: 0,
        bestStreak: 0,
        averageAttempts: 0,
        totalAttempts: 0,
        gamesByAttempts: {1: 0, 2: 0}
    };
}

function updateStatistics(win) {
    try {
        const stats = getStatistics();
        stats.totalGames++;
        
        if (win) {
            stats.wins++;
            stats.currentStreak++;
            stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
            stats.totalAttempts += currentAttempt + 1;
            stats.gamesByAttempts[currentAttempt + 1]++;
        } else {
            stats.currentStreak = 0;
        }
        
        stats.averageAttempts = stats.wins > 0 ? (stats.totalAttempts / stats.wins).toFixed(1) : 0;
        
        localStorage.setItem(STATISTICS_KEY, JSON.stringify(stats));
    } catch (error) {
        handleError(error, 'updateStatistics');
    }
}

function showStatistics() {
    const stats = getStatistics();
    const winRate = stats.totalGames > 0 ? ((stats.wins / stats.totalGames) * 100).toFixed(1) : 0;
    
    const statsMessage = `
        Games Played: ${stats.totalGames}
        Win Rate: ${winRate}%
        Current Streak: ${stats.currentStreak}
        Best Streak: ${stats.bestStreak}
        Average Attempts: ${stats.averageAttempts}
    `;
    
    showToast(`Statistics: ${statsMessage}`, 'info');
}

function showStatsModal() {
    const stats = getStatistics();
    const winRate = stats.totalGames > 0 ? ((stats.wins / stats.totalGames) * 100).toFixed(1) : 0;
    
    // Populate the modal with current stats
    // document.getElementById('stat-total-games').textContent = stats.totalGames;
    // document.getElementById('stat-win-rate').textContent = `${winRate}%`;
    // document.getElementById('stat-current-streak').textContent = stats.currentStreak;
    // document.getElementById('stat-best-streak').textContent = stats.bestStreak;
    // document.getElementById('stat-avg-attempts').textContent = stats.averageAttempts;
    // document.getElementById('stat-today-attempts').textContent = currentAttempt + 1;
    
    // Show the modal
    document.getElementById('stats-modal').classList.remove('hidden');
}

function closeStatsModal() {
    document.getElementById('stats-modal').classList.add('hidden');
} 


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
    try {
    const todayIndex = getPuzzleIndex();
        
        if (!puzzleData[todayIndex]) {
            throw new Error(`No puzzle found for index ${todayIndex}`);
        }
        
    currentPuzzle = puzzleData[todayIndex];

        // Render grid and keyboard first so DOM elements exist when loadGameState
        // calls reRenderArrangementStage() or showCompletedBanner()
        renderGuessGrid();
        renderKeyboard();

        const isLoaded = loadGameState(todayIndex);

        if (!isLoaded) {
            // Render from scratch if no saved state
            renderClueBoxes();
        } else {
            // Re-render based on loaded state
            reRenderClueStage();
        }

        setupInputListeners();
    } catch (error) {
        handleError(error, 'initializeGame');
    }
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
        gameCompleted: gameCompleted,
        gameWon: gameWon,
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
            gameCompleted = state.gameCompleted || false;
            gameWon = state.gameWon || false;

            if (revealedLetters.length === WORD_LENGTH) {
                transitionToArrangement();
                reRenderArrangementStage();
                if (gameCompleted) {
                    showCompletedBanner(gameWon);
                }
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
        button.innerHTML = `
            <div class="clue-number">${index + 1}</div>
            <div class="clue-text">Click to solve</div>
        `;
        button.dataset.cluePos = clue.pos; 
        button.dataset.clueIndex = index;

        button.addEventListener('click', () => openClueModal(clue, button));
        clueContainer.appendChild(button);
    });

    // Clear existing placeholders and add new ones
    const revealedContainer = document.getElementById('revealed-letters');
    revealedContainer.innerHTML = '';
    for (let i = 0; i < WORD_LENGTH; i++) {
        const box = document.createElement('div');
        box.classList.add('letter-placeholder');
        box.textContent = '?';
        revealedContainer.appendChild(box);
    }
    
    updateProgress();
}

function openClueModal(clueData, clueElement) {
    try {
        if (clueElement.classList.contains('solved')) {
            showToast(`This clue has already been solved! The letter is ${clueData.char}`, 'info');
            return;
        }

        activeClueElement = clueElement;
        activeClueData = clueData;

        document.getElementById('modal-title').textContent = `Solve the Clue`;
        document.getElementById('modal-riddle').innerHTML = clueData.riddle;
        
        const feedback = document.getElementById('clue-feedback');
        feedback.textContent = '';
        feedback.className = 'feedback-message';
        feedback.style.display = 'none';
        
        document.getElementById('clue-answer-input').value = '';
        document.getElementById('modal-backdrop').classList.remove('hidden');
        document.getElementById('clue-modal').classList.remove('hidden');
        
        // Focus the input after a short delay to ensure modal is visible
        setTimeout(() => {
            document.getElementById('clue-answer-input').focus();
        }, 100);
    } catch (error) {
        handleError(error, 'openClueModal');
    }
}

function checkClueAnswer() {
    try {
        const input = document.getElementById('clue-answer-input').value.trim().toUpperCase();
        const correctLetter = activeClueData.char;
        const feedback = document.getElementById('clue-feedback');

        if (!input) {
            feedback.textContent = 'Please enter a letter!';
            feedback.className = 'feedback-message error';
            feedback.style.display = 'block';
            return;
        }

        // Check if the input is the correct single letter
        if (input === correctLetter) {
            setTimeout(() => {
                revealLetter(correctLetter, activeClueElement);
                closeModal();
            }, 100);
        } else {
            feedback.textContent = `❌ Incorrect! Try again.`;
            feedback.className = 'feedback-message error';
            feedback.style.display = 'block';
        }
    } catch (error) {
        handleError(error, 'checkClueAnswer');
    }
}

function updateProgress() {
    const solvedCount = solvedClues.filter(solved => solved).length;
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    
    if (progressText) {
        progressText.textContent = `${solvedCount}/5 Clues Solved`;
    }
    
    if (progressFill) {
        progressFill.style.width = `${(solvedCount / 5) * 100}%`;
    }
}

function revealLetter(letter, element) {
    try {
        if (!revealedLetters.includes(letter) || revealedLetters.filter(l => l === letter).length < currentPuzzle.target_word.split('').filter(l => l === letter).length) {
            revealedLetters.push(letter);
            const newLetterIndex = revealedLetters.length - 1;

            const jumbleBoxes = document.querySelectorAll('.letter-placeholder, .revealed-letter-box');
            jumbleBoxes.forEach((box, index) => {
                if (revealedLetters[index]) {
                    box.classList.remove('letter-placeholder');
                    box.classList.add('revealed-letter-box');
                    box.style.transform = 'scale(0) rotate(180deg)';
                    box.textContent = revealedLetters[index];
                    setTimeout(() => {
                        box.style.transition = 'all 0.5s ease-out';
                        box.style.transform = 'scale(1) rotate(0deg)';
                    }, index * 150);
                }
            });

            // Show toast after the new letter's animation completes
            setTimeout(() => {
                showToast('Correct! Letter revealed!', 'success');
            }, newLetterIndex * 150 + 500);
        }
        
        // Animate the clue button
        element.style.transition = 'all 0.5s ease-out';
        element.classList.add('solved');
        element.innerHTML = `
            <div class="clue-number">${letter}</div>
            <div class="clue-text">Solved!</div>
        `;
        
        const originalPos = parseInt(element.dataset.cluePos);
        solvedClues[originalPos] = true;
        
        updateProgress();

        saveGameState(); 

        if (revealedLetters.length === WORD_LENGTH) {
            const animationDone = (WORD_LENGTH - 1) * 150 + 500;
            setTimeout(() => {
                showToast('🎉 All clues solved! Time to arrange the letters!', 'success');
                setTimeout(() => {
                    transitionToArrangement();
                }, 1000);
            }, animationDone);
        }
    } catch (error) {
        handleError(error, 'revealLetter');
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
    // Scroll so arrangement section is in view on mobile
    setTimeout(() => {
        document.getElementById('arrangement-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
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

function showGuessError(message) {
    const errorElement = document.getElementById('guess-error');
    const errorText = document.getElementById('guess-error-text');
    const grid = document.getElementById('guess-grid');
    
    errorText.textContent = message;
    errorElement.classList.remove('hidden');
    grid.classList.add('shake');
    
    // Remove shake animation after it completes
    setTimeout(() => {
        grid.classList.remove('shake');
    }, 600);
    
    // Hide error after 3 seconds
    setTimeout(() => {
        errorElement.classList.add('hidden');
    }, 3000);
}

function submitGuess(guess) {
    try {
        const normalizedGuess = guess.toUpperCase();

        // 1. ClueWord Validation: Check if the letter set is correct FIRST
        if (!isLetterSetValid(normalizedGuess, revealedLetters)) {
            showGuessError("❌ Must use the exact letters from the clues!");
            return;
        }

        // 2. Word Validation: Is it a valid word?
        if (!VALID_WORDS.includes(normalizedGuess)) {
            showGuessError("❌ Not a recognized 5-letter word.");
            return;
        }

    // 3. Process Feedback
    const feedback = checkWordleFeedback(normalizedGuess, currentPuzzle.target_word);
    
    guessHistory.push({ guess: normalizedGuess, feedback: feedback });
    
    applyFeedbackToGrid(feedback);
    applyFeedbackToKeyboard(feedback);

    // 4. Update Game State
    const gridAnimationDone = (WORD_LENGTH - 1) * 200 + 300;
    if (normalizedGuess === currentPuzzle.target_word) {
        setTimeout(() => endGame(true), gridAnimationDone);
    } else {
        currentAttempt++;
        document.getElementById('attempts-left').textContent = MAX_ATTEMPTS - currentAttempt;
        currentGuess = "";
        
        saveGameState(); 

        if (currentAttempt >= MAX_ATTEMPTS) {
            endGame(false);
        }
        }
    } catch (error) {
        handleError(error, 'submitGuess');
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

function showCompletedBanner(won) {
    const banner = document.getElementById('completed-banner');
    const icon = document.getElementById('completed-icon');
    const title = document.getElementById('completed-title');
    const message = document.getElementById('completed-message');

    banner.classList.remove('won', 'lost');

    if (won) {
        banner.classList.add('won');
        icon.textContent = '🎉';
        const attempts = guessHistory.length;
        title.textContent = 'You solved it!';
        message.textContent = `The word was ${currentPuzzle.target_word} — solved in ${attempts} attempt${attempts === 1 ? '' : 's'}.`;
    } else {
        banner.classList.add('lost');
        icon.textContent = '😔';
        title.textContent = 'Better luck next time!';
        message.textContent = `The word was ${currentPuzzle.target_word}.`;
    }

    banner.classList.remove('hidden');

    // Disable keyboard input visually
    const keyboard = document.getElementById('keyboard-container');
    keyboard.style.opacity = '0.5';
    keyboard.style.pointerEvents = 'none';
}

function endGame(win) {
    try {
        gameCompleted = true;
        gameWon = win;
        saveGameState();
        updateStatistics(win);
        showCompletedBanner(win);

        if (win) {
            showStatsModal();
        }
    } catch (error) {
        handleError(error, 'endGame');
    }
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
        const modal = document.getElementById('clue-modal');
        
        if (modal.classList.contains('hidden')) {
            // Game input handling
            if (key.length === 1 && key.match(/[A-Z]/)) {
                processInput(key);
            } else if (key === 'ENTER') {
                processInput('ENTER');
            } else if (key === 'BACKSPACE') {
                processInput('DEL');
            }
        } else {
            // Modal input handling
            if (key === 'ENTER') {
                e.preventDefault();
                checkClueAnswer();
            } else if (key === 'ESCAPE') {
                e.preventDefault();
                closeModal();
            }
        }
    });
}

function processInput(key) {
    if (gameCompleted || revealedLetters.length < WORD_LENGTH || currentAttempt >= MAX_ATTEMPTS) {
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
            button.innerHTML = `
                <div class="clue-number">${clueData.char}</div>
                <div class="clue-text">Solved!</div>
            `;
        }
    });

    // Renders the revealed letters in the jumble pool
    const jumbleBoxes = document.querySelectorAll('.letter-placeholder, .revealed-letter-box');
    revealedLetters.forEach((letter, index) => {
        if (jumbleBoxes[index]) {
            jumbleBoxes[index].classList.remove('letter-placeholder');
            jumbleBoxes[index].classList.add('revealed-letter-box');
            jumbleBoxes[index].textContent = letter;
        }
    });
    
    updateProgress();
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
    document.getElementById('close-stats-modal').addEventListener('click', closeStatsModal);
};
