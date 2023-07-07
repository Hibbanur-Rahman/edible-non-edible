const items = [
    { src: "Images/banana.jpg", isEdible: true },
    { src: "Images/rock.jpg", isEdible: false },
    { src: "Images/bread.jpg", isEdible: true },
    { src: "Images/pencil.jpg", isEdible: false },
    { src: "Images/carrot.jpg", isEdible: true },
    { src: "Images/bottle.jpg", isEdible: false },
    
];

const game = document.querySelector("#game");
const itemImg = document.querySelector("#item");
const edibleBtn = document.querySelector("#edible");
const nonEdibleBtn = document.querySelector("#non-edible");
const startBtn = document.querySelector("#start");
const scoreDisplay = document.querySelector("#score");

let score = 0;
let itemIndex = 0;
let timerId;

function startGame() {
    document.getElementById("new-btn").style.display = "none";
    startBtn.style.display = "none";
    game.style.display = "block";
    score = 0;
    itemIndex = 0;
    showItem();
    updateScore();
    startTimer();
}

function showItem() {
    const item = items[itemIndex];
    itemImg.src = item.src;
}

function updateScore() {
    scoreDisplay.textContent = "Score: " + score;
}

function finalScore(){
    scoreDisplay.textContent = "Game Over! Your final score is " + score+ " out of "+items.length;
    endGame()
}

function showCorrectImage() {
    var clapping = document.getElementById('correctImage');
    document.getElementById("correctImage").style.display = "block"; 
    clapping.style.display = 'block';
    setTimeout(function () {
        clapping.style.display = 'none';
    }, 2000);
}
function showinCorrectImage() {
    var clapping = document.getElementById('incorrectImage');
    document.getElementById("incorrectImage").style.display = "block";
    clapping.style.display = 'block';
    setTimeout(function () {
        clapping.style.display = 'none';
    }, 2000);
}

function startTimer() {
    let timeLimit = 30    ; // seconds
    let timeLeft = timeLimit;
    timerId = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            finalScore();
        }
        updateTimer(timeLeft);
    }, 1000);
}

function updateTimer(timeLeft) {
    const timerDisplay = document.querySelector("#timer");
    timerDisplay.textContent = "Time Left: " + timeLeft+ " seconds";
}

function endGame() {
    clearInterval(timerId);
    game.style.display = "none";
    startBtn.style.display = "block";
    document.getElementById("start").style.display = "none";
    document.getElementById("new-btn").style.display = "block";
    
    // alert("Game Over! Your score is: " + score + " out of " + items.length);
    
}

function handleAnswer(isEdible) {
    if (items[itemIndex].isEdible === isEdible) {
        score+=1;
        updateScore();
        var audio = new Audio('clapping.mp3');
        audio.play();
        setTimeout(function () {
            audio.pause();
        }, 2000);
        showCorrectImage();
    }
    else{
        var audio = new Audio('Incorrect.mp3');
        audio.play();
        setTimeout(function () {
            audio.pause();
        }, 2000);
        showinCorrectImage();
    }
    itemIndex++;
    
    if (itemIndex < items.length) {
        showItem();
    } else {
        finalScore();
    }
}