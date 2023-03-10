const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];
let randomWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium";
difficultySelect.value = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium";

const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
}
const setRandomWord = () => {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}
const updateScore = () => {
    score++;
    scoreEl.innerHTML = score;
}
const updateTime = () => {
    time--;
    timeEl.innerHTML = `${time}s`;
    if (time == 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}
const gameOver = () => {
    endgameEl.innerHTML = `  <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
}

const timeInterval = setInterval(updateTime, 1000);

setRandomWord();
text.addEventListener("input", function (e) {
    let inputValue = e.target.value;
    if (inputValue == randomWord) {
        setRandomWord();
        updateScore();

        e.target.value = "";
        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 5;
        }
        updateTime();
    }

})
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));
settingsForm.addEventListener("change", e => {
    difficulty = e.target.value;
    localStorage.setItem("difficulty", difficulty);
});