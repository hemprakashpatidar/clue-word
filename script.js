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
    },
    {
        "day_index": 2,
        "target_word": "OCEAN",
        "clues": [
            { "pos": 0, "char": "O", "riddle": "The letter that looks like a circle or zero." },
            { "pos": 1, "char": "C", "riddle": "The letter that sounds like 'sea' but is spelled differently." },
            { "pos": 2, "char": "E", "riddle": "The most common letter in the English language." },
            { "pos": 3, "char": "A", "riddle": "The first letter of the alphabet, also a musical note." },
            { "pos": 4, "char": "N", "riddle": "The letter that comes after 'M' in the alphabet." }
        ]
    },
    {
        "day_index": 3,
        "target_word": "TIGER",
        "clues": [
            { "pos": 0, "char": "T", "riddle": "The letter that starts the word 'Time'." },
            { "pos": 1, "char": "I", "riddle": "The letter that looks like a vertical line with a dot." },
            { "pos": 2, "char": "G", "riddle": "The letter that comes after 'F' in the alphabet." },
            { "pos": 3, "char": "E", "riddle": "The letter that completes the word 'TRE**__**'." },
            { "pos": 4, "char": "R", "riddle": "The letter that starts the word 'Red'." }
        ]
    },
    {
        "day_index": 4,
        "target_word": "MUSIC",
        "clues": [
            { "pos": 0, "char": "M", "riddle": "The letter that looks like two mountains." },
            { "pos": 1, "char": "U", "riddle": "The letter that looks like a horseshoe." },
            { "pos": 2, "char": "S", "riddle": "The letter that looks like a snake." },
            { "pos": 3, "char": "I", "riddle": "The letter that looks like a vertical line." },
            { "pos": 4, "char": "C", "riddle": "The letter that sounds like 'see' but is spelled differently." }
        ]
    },
    {
        "day_index": 5,
        "target_word": "DREAM",
        "clues": [
            { "pos": 0, "char": "D", "riddle": "The letter that comes after 'C' in the alphabet." },
            { "pos": 1, "char": "R", "riddle": "The letter that starts the word 'Rainbow'." },
            { "pos": 2, "char": "E", "riddle": "The letter that completes the word 'TH**__**'." },
            { "pos": 3, "char": "A", "riddle": "The letter that starts the word 'Apple'." },
            { "pos": 4, "char": "M", "riddle": "The letter that looks like two mountains." }
        ]
    },
    {
        "day_index": 6,
        "target_word": "LIGHT",
        "clues": [
            { "pos": 0, "char": "L", "riddle": "The letter that looks like a vertical line with a horizontal line at the bottom." },
            { "pos": 1, "char": "I", "riddle": "The letter that looks like a vertical line with a dot." },
            { "pos": 2, "char": "G", "riddle": "The letter that comes after 'F' in the alphabet." },
            { "pos": 3, "char": "H", "riddle": "The letter that looks like a ladder." },
            { "pos": 4, "char": "T", "riddle": "The letter that looks like a cross." }
        ]
    },
    {
        "day_index": 7,
        "target_word": "EARTH",
        "clues": [
            { "pos": 0, "char": "E", "riddle": "The most common letter in English." },
            { "pos": 1, "char": "A", "riddle": "The first letter of the alphabet." },
            { "pos": 2, "char": "R", "riddle": "The letter that starts the word 'Red'." },
            { "pos": 3, "char": "T", "riddle": "The letter that looks like a cross." },
            { "pos": 4, "char": "H", "riddle": "The letter that looks like a ladder." }
        ]
    },
    {
        "day_index": 8,
        "target_word": "STORM",
        "clues": [
            { "pos": 0, "char": "S", "riddle": "The letter that looks like a snake." },
            { "pos": 1, "char": "T", "riddle": "The letter that looks like a cross." },
            { "pos": 2, "char": "O", "riddle": "The letter that looks like a circle." },
            { "pos": 3, "char": "R", "riddle": "The letter that starts the word 'Rain'." },
            { "pos": 4, "char": "M", "riddle": "The letter that looks like two mountains." }
        ]
    },
    {
        "day_index": 9,
        "target_word": "PEACE",
        "clues": [
            { "pos": 0, "char": "P", "riddle": "The letter that starts the word 'Peace'." },
            { "pos": 1, "char": "E", "riddle": "The most common letter in English." },
            { "pos": 2, "char": "A", "riddle": "The first letter of the alphabet." },
            { "pos": 3, "char": "C", "riddle": "The letter that comes after 'B'." },
            { "pos": 4, "char": "E", "riddle": "The letter that completes the word 'PEAC**__**'." }
        ]
    },
    {
        "day_index": 10,
        "target_word": "BRAVE",
        "clues": [
            { "pos": 0, "char": "B", "riddle": "The letter that comes after 'A' in the alphabet." },
            { "pos": 1, "char": "R", "riddle": "The letter that starts the word 'Red'." },
            { "pos": 2, "char": "A", "riddle": "The first letter of the alphabet." },
            { "pos": 3, "char": "V", "riddle": "The letter that comes before 'W' in the alphabet." },
            { "pos": 4, "char": "E", "riddle": "The most common letter in English." }
        ]
    },
    {
        "day_index": 11,
        "target_word": "SMART",
        "clues": [
            { "pos": 0, "char": "S", "riddle": "The letter that looks like a snake." },
            { "pos": 1, "char": "M", "riddle": "The letter that looks like two mountains." },
            { "pos": 2, "char": "A", "riddle": "The first letter of the alphabet." },
            { "pos": 3, "char": "R", "riddle": "The letter that starts the word 'Red'." },
            { "pos": 4, "char": "T", "riddle": "The letter that looks like a cross." }
        ]
    },
    {
        "day_index": 12,
        "target_word": "HAPPY",
        "clues": [
            { "pos": 0, "char": "H", "riddle": "The letter that looks like a ladder." },
            { "pos": 1, "char": "A", "riddle": "The first letter of the alphabet." },
            { "pos": 2, "char": "P", "riddle": "The letter that starts the word 'Peace'." },
            { "pos": 3, "char": "P", "riddle": "The letter that starts the word 'Peace' (again)." },
            { "pos": 4, "char": "Y", "riddle": "The letter that looks like a fork in the road." }
        ]
    },
    {
        "day_index": 13,
        "target_word": "SWEET",
        "clues": [
            { "pos": 0, "char": "S", "riddle": "The letter that looks like a snake." },
            { "pos": 1, "char": "W", "riddle": "The letter that comes after 'V' in the alphabet." },
            { "pos": 2, "char": "E", "riddle": "The most common letter in English." },
            { "pos": 3, "char": "E", "riddle": "The most common letter in English (again)." },
            { "pos": 4, "char": "T", "riddle": "The letter that looks like a cross." }
        ]
    },
    {
        "day_index": 14,
        "target_word": "FRESH",
        "clues": [
            { "pos": 0, "char": "F", "riddle": "The letter that comes after 'E' in the alphabet." },
            { "pos": 1, "char": "R", "riddle": "The letter that starts the word 'Red'." },
            { "pos": 2, "char": "E", "riddle": "The most common letter in English." },
            { "pos": 3, "char": "S", "riddle": "The letter that looks like a snake." },
            { "pos": 4, "char": "H", "riddle": "The letter that looks like a ladder." }
        ]
    },
    {
        "day_index": 15,
        "target_word": "QUICK",
        "clues": [
            { "pos": 0, "char": "Q", "riddle": "The letter that is always followed by 'U'." },
            { "pos": 1, "char": "U", "riddle": "The letter that looks like a horseshoe." },
            { "pos": 2, "char": "I", "riddle": "The letter that looks like a vertical line with a dot." },
            { "pos": 3, "char": "C", "riddle": "The letter that comes after 'B'." },
            { "pos": 4, "char": "K", "riddle": "The letter that comes after 'J' in the alphabet." }
        ]
    },
    {
        "day_index": 16,
        "target_word": "GREEN",
        "clues": [
            { "pos": 0, "char": "G", "riddle": "I'm the first letter of the color of grass and envy." },
            { "pos": 1, "char": "R", "riddle": "I start the word for the color of roses and sunsets." },
            { "pos": 2, "char": "E", "riddle": "I appear in almost every English word, but I'm silent in 'queue'." },
            { "pos": 3, "char": "E", "riddle": "I'm the letter that makes 'bee' buzz and 'tree' grow." },
            { "pos": 4, "char": "N", "riddle": "I'm the letter that comes between 'M' and 'O' in the alphabet." }
        ]
    },
    {
        "day_index": 17,
        "target_word": "BLUSH",
        "clues": [
            { "pos": 2, "char": "U", "riddle": "I'm shaped like a smile, but I'm not happy - I'm just a letter." },
            { "pos": 4, "char": "H", "riddle": "I'm the letter that makes 'heart' happy and 'hope' happen." },
            { "pos": 0, "char": "B", "riddle": "I'm the letter that makes 'beautiful' bloom and 'blush' begin." },
            { "pos": 3, "char": "S", "riddle": "I'm the letter that makes 'sunshine' sparkle and 'stars' shine." },
            { "pos": 1, "char": "L", "riddle": "I'm the letter that makes 'love' last and 'light' shine." }
        ]
    },
    {
        "day_index": 18,
        "target_word": "WATER",
        "clues": [
            { "pos": 3, "char": "E", "riddle": "I'm so common that I appear in 'every' word, even this one!" },
            { "pos": 1, "char": "A", "riddle": "I'm the beginning of everything, the first sound you make." },
            { "pos": 4, "char": "R", "riddle": "I'm the letter that makes 'rain' fall and 'rivers' flow." },
            { "pos": 0, "char": "W", "riddle": "I'm the letter that makes waves and whispers in the wind." },
            { "pos": 2, "char": "T", "riddle": "I'm the letter that makes 'time' tick and 'tree' tall." }
        ]
    },
    {
        "day_index": 19,
        "target_word": "FUNNY",
        "clues": [
            { "pos": 0, "char": "F", "riddle": "The letter that comes after 'E' in the alphabet." },
            { "pos": 1, "char": "U", "riddle": "The letter that looks like a horseshoe." },
            { "pos": 2, "char": "N", "riddle": "The letter that comes after 'M' in the alphabet." },
            { "pos": 3, "char": "N", "riddle": "The letter that comes after 'M' in the alphabet (again)." },
            { "pos": 4, "char": "Y", "riddle": "The letter that looks like a fork in the road." }
        ]
    },
    {
        "day_index": 20,
        "target_word": "FLAME",
        "clues": [
            { "pos": 0, "char": "F", "riddle": "I start the word for fire's flickering light." },
            { "pos": 1, "char": "L", "riddle": "I start 'laughter' — the sound of joy." },
            { "pos": 2, "char": "A", "riddle": "I'm the first letter of the alphabet and the first vowel." },
            { "pos": 3, "char": "M", "riddle": "I start 'midnight' — the darkest, quietest hour." },
            { "pos": 4, "char": "E", "riddle": "I'm the most common letter in English, found in nearly every sentence." }
        ]
    },
    {
        "day_index": 21,
        "target_word": "BEACH",
        "clues": [
            { "pos": 0, "char": "B", "riddle": "I start 'breeze' — the gentle wind that cools a warm day." },
            { "pos": 1, "char": "E", "riddle": "I start 'east' — where the sun rises over the water." },
            { "pos": 2, "char": "A", "riddle": "I'm the vowel that sounds like the 'ah' of relaxation." },
            { "pos": 3, "char": "C", "riddle": "I sound like 'sea' but I'm spelled differently." },
            { "pos": 4, "char": "H", "riddle": "I start 'horizon' — the line where sky meets water." }
        ]
    },
    {
        "day_index": 22,
        "target_word": "STONE",
        "clues": [
            { "pos": 0, "char": "S", "riddle": "I start 'solid' — the state of matter that holds its shape." },
            { "pos": 1, "char": "T", "riddle": "I start 'tough' — the quality of something hard and durable." },
            { "pos": 2, "char": "O", "riddle": "I look like a cross-section of a rock — perfectly round." },
            { "pos": 3, "char": "N", "riddle": "I start 'nature' — where stones are found scattered and ancient." },
            { "pos": 4, "char": "E", "riddle": "I end 'home', 'dome', and many words that stand firm." }
        ]
    },
    {
        "day_index": 23,
        "target_word": "CROWN",
        "clues": [
            { "pos": 0, "char": "C", "riddle": "I start 'ceremony' — the formal event where a crown is bestowed." },
            { "pos": 1, "char": "R", "riddle": "I start 'royal' — the status of those who wear crowns." },
            { "pos": 2, "char": "O", "riddle": "I'm shaped like the band of a crown — round and unbroken." },
            { "pos": 3, "char": "W", "riddle": "I start 'wear' — what you do with a crown on your head." },
            { "pos": 4, "char": "N", "riddle": "I start 'noble' — the rank of those born to rule." }
        ]
    },
    {
        "day_index": 24,
        "target_word": "FROST",
        "clues": [
            { "pos": 0, "char": "F", "riddle": "I start 'freeze' — what happens to water on a cold night." },
            { "pos": 1, "char": "R", "riddle": "I start 'rigid' — how things become when frozen solid." },
            { "pos": 2, "char": "O", "riddle": "I start 'October' — often the first month of frosty mornings." },
            { "pos": 3, "char": "S", "riddle": "I start 'snow' — the frozen cousin of frost." },
            { "pos": 4, "char": "T", "riddle": "I start 'temperature' — which drops when frost forms." }
        ]
    },
    {
        "day_index": 25,
        "target_word": "PIANO",
        "clues": [
            { "pos": 0, "char": "P", "riddle": "I start 'play' — what musicians do with their instrument." },
            { "pos": 1, "char": "I", "riddle": "I stand alone as a word — the simplest pronoun." },
            { "pos": 2, "char": "A", "riddle": "I'm the musical note that orchestras tune to — concert pitch." },
            { "pos": 3, "char": "N", "riddle": "I start 'note' — the building block of every melody." },
            { "pos": 4, "char": "O", "riddle": "I start 'octave' — eight notes that span a musical scale." }
        ]
    },
    {
        "day_index": 26,
        "target_word": "GRAPE",
        "clues": [
            { "pos": 0, "char": "G", "riddle": "I start 'grow' — what vines do in a vineyard." },
            { "pos": 1, "char": "R", "riddle": "I start 'ripe' — the perfect state for picking fruit." },
            { "pos": 2, "char": "A", "riddle": "I start 'autumn' — the season of harvest and wine-making." },
            { "pos": 3, "char": "P", "riddle": "I start 'purple' — the color of many dark grapes." },
            { "pos": 4, "char": "E", "riddle": "I start 'eat' — the final destination of fresh-picked fruit." }
        ]
    },
    {
        "day_index": 27,
        "target_word": "CLOUD",
        "clues": [
            { "pos": 0, "char": "C", "riddle": "I start 'cover' — what clouds do to the sun on a gray day." },
            { "pos": 1, "char": "L", "riddle": "I start 'loom' — what storm clouds do on the horizon." },
            { "pos": 2, "char": "O", "riddle": "I look like a puffy cloud seen from below — round and open." },
            { "pos": 3, "char": "U", "riddle": "I start 'umbrella' — what you need when clouds bring rain." },
            { "pos": 4, "char": "D", "riddle": "I start 'drizzle' — the light rain that follows a gray cloud." }
        ]
    },
    {
        "day_index": 28,
        "target_word": "BLEND",
        "clues": [
            { "pos": 0, "char": "B", "riddle": "I start 'beat' — what you do to mix ingredients together." },
            { "pos": 1, "char": "L", "riddle": "I start 'liquid' — one state of matter that mixes easily." },
            { "pos": 2, "char": "E", "riddle": "I start 'even' — what a perfect blend achieves throughout." },
            { "pos": 3, "char": "N", "riddle": "I start 'neutral' — the balance point where flavors meet." },
            { "pos": 4, "char": "D", "riddle": "I start 'dissolve' — to mix until no separation remains." }
        ]
    },
    {
        "day_index": 29,
        "target_word": "CRISP",
        "clues": [
            { "pos": 0, "char": "C", "riddle": "I start 'cold' — the feeling of a brisk autumn morning." },
            { "pos": 1, "char": "R", "riddle": "I start 'rustle' — the sound of dry leaves underfoot." },
            { "pos": 2, "char": "I", "riddle": "I start 'ice' — which makes things cold and crisp." },
            { "pos": 3, "char": "S", "riddle": "I start 'snap' — the sound of something perfectly firm and fresh." },
            { "pos": 4, "char": "P", "riddle": "I start 'potato' — which becomes crispy when fried or baked." }
        ]
    },
    {
        "day_index": 30,
        "target_word": "GLOBE",
        "clues": [
            { "pos": 0, "char": "G", "riddle": "I start 'geography' — the study of our round world." },
            { "pos": 1, "char": "L", "riddle": "I start 'latitude' — the lines that circle the globe horizontally." },
            { "pos": 2, "char": "O", "riddle": "I'm round like the Earth itself — a perfect sphere in letter form." },
            { "pos": 3, "char": "B", "riddle": "I start 'border' — the lines that divide countries on a globe." },
            { "pos": 4, "char": "E", "riddle": "I start 'equator' — the imaginary line around the middle of the globe." }
        ]
    },
    {
        "day_index": 31,
        "target_word": "HASTE",
        "clues": [
            { "pos": 0, "char": "H", "riddle": "I start 'hurry' — the state of moving faster than comfortable." },
            { "pos": 1, "char": "A", "riddle": "I start 'alarm' — what goes off when you've overslept." },
            { "pos": 2, "char": "S", "riddle": "I start 'speed' — the key quality of someone in a rush." },
            { "pos": 3, "char": "T", "riddle": "I start 'time' — the thing you run out of when moving in haste." },
            { "pos": 4, "char": "E", "riddle": "I start 'exit' — the way out when you need to leave in a hurry." }
        ]
    },
    {
        "day_index": 32,
        "target_word": "IVORY",
        "clues": [
            { "pos": 0, "char": "I", "riddle": "I start 'immaculate' — the pure white quality of ivory." },
            { "pos": 1, "char": "V", "riddle": "I start 'valuable' — the quality that makes ivory so precious." },
            { "pos": 2, "char": "O", "riddle": "I start 'old' — ivory has been prized since ancient times." },
            { "pos": 3, "char": "R", "riddle": "I start 'rare' — something precious and increasingly protected." },
            { "pos": 4, "char": "Y", "riddle": "I ask a question — I start 'why'." }
        ]
    },
    {
        "day_index": 33,
        "target_word": "PLUME",
        "clues": [
            { "pos": 0, "char": "P", "riddle": "I start 'proud' — like a peacock displaying its magnificent feathers." },
            { "pos": 1, "char": "L", "riddle": "I start 'light' — feathers are among the lightest things in nature." },
            { "pos": 2, "char": "U", "riddle": "I start 'up' — the direction a feathered plume waves." },
            { "pos": 3, "char": "M", "riddle": "I start 'magnificent' — how a full plume of feathers looks." },
            { "pos": 4, "char": "E", "riddle": "I start 'elegant' — the quality of a flowing plume." }
        ]
    },
    {
        "day_index": 34,
        "target_word": "RIDGE",
        "clues": [
            { "pos": 0, "char": "R", "riddle": "I start 'rocky' — the texture of a mountain ridge." },
            { "pos": 1, "char": "I", "riddle": "I start 'incline' — the slope leading up to a ridge." },
            { "pos": 2, "char": "D", "riddle": "I start 'dramatic' — the view from atop a high ridge." },
            { "pos": 3, "char": "G", "riddle": "I start 'granite' — the rock that often forms mountain ridges." },
            { "pos": 4, "char": "E", "riddle": "I start 'elevation' — the height of a mountain ridge above sea level." }
        ]
    },
    {
        "day_index": 35,
        "target_word": "SWIFT",
        "clues": [
            { "pos": 0, "char": "S", "riddle": "I start 'speed' — the quality of something that moves swiftly." },
            { "pos": 1, "char": "W", "riddle": "I start 'wind' — which moves swiftly across the landscape." },
            { "pos": 2, "char": "I", "riddle": "I start 'instant' — something that happens in the blink of an eye." },
            { "pos": 3, "char": "F", "riddle": "I start 'fast' — the synonym for swift." },
            { "pos": 4, "char": "T", "riddle": "I start 'tornado' — one of nature's swiftest and most powerful forces." }
        ]
    },
    {
        "day_index": 36,
        "target_word": "THYME",
        "clues": [
            { "pos": 0, "char": "T", "riddle": "I start 'taste' — the quality herbs add to any dish." },
            { "pos": 1, "char": "H", "riddle": "I start 'herb' — the category this fragrant plant belongs to." },
            { "pos": 2, "char": "Y", "riddle": "I start 'yard' — often where herb gardens grow." },
            { "pos": 3, "char": "M", "riddle": "I start 'Mediterranean' — the region where thyme grows wild on hillsides." },
            { "pos": 4, "char": "E", "riddle": "I start 'earthy' — the quality of thyme's rich aroma." }
        ]
    },
    {
        "day_index": 37,
        "target_word": "VALOR",
        "clues": [
            { "pos": 0, "char": "V", "riddle": "I start 'victory' — the reward for those who show valor in battle." },
            { "pos": 1, "char": "A", "riddle": "I start 'armor' — what a valorous knight wears into battle." },
            { "pos": 2, "char": "L", "riddle": "I start 'loyalty' — the companion virtue of valor." },
            { "pos": 3, "char": "O", "riddle": "I start 'oath' — the solemn promise to be brave and true." },
            { "pos": 4, "char": "R", "riddle": "I start 'righteous' — the quality that makes valor noble." }
        ]
    },
    {
        "day_index": 38,
        "target_word": "WHEAT",
        "clues": [
            { "pos": 0, "char": "W", "riddle": "I start 'waves' — like golden wheat fields swaying in the breeze." },
            { "pos": 1, "char": "H", "riddle": "I start 'harvest' — the season when wheat is gathered." },
            { "pos": 2, "char": "E", "riddle": "I start 'earth' — the soil in which wheat grows." },
            { "pos": 3, "char": "A", "riddle": "I start 'acre' — the unit used to measure wheat fields." },
            { "pos": 4, "char": "T", "riddle": "I start 'toast' — what you make from wheat bread." }
        ]
    },
    {
        "day_index": 39,
        "target_word": "YIELD",
        "clues": [
            { "pos": 0, "char": "Y", "riddle": "I start 'yearly' — how often farmers measure their crop yield." },
            { "pos": 1, "char": "I", "riddle": "I start 'invest' — what farmers do in seeds hoping for a return." },
            { "pos": 2, "char": "E", "riddle": "I start 'earth' — the source of every agricultural yield." },
            { "pos": 3, "char": "L", "riddle": "I start 'labor' — the hard work behind every harvest." },
            { "pos": 4, "char": "D", "riddle": "I start 'deliver' — what a good harvest does for a farmer." }
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
