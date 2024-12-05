// Buttons Selector
const startBTN = document.getElementById('startBTN');
const pauseBTN = document.getElementById('pauseBTN');
const resetBTN = document.getElementById('resetBTN');
const lapBTN = document.getElementById('lapBTN'); // Lap button
const TimerField = document.querySelector('#timer-wrapper .timer');
const lapList = document.getElementById('lapList'); // UL for laps
const timerWrapper = document.getElementById('timer-wrapper'); // Timer wrapper for glow effect

var timerStart = 0,
    now;

window.addEventListener('load', () => {
    startBTN.style.display = `flex`;
});

class Timer {
    elapsedTime;
    currentTime;
    started;
    timerInterval;

    constructor() {
        this.elapsedTime = 0;
    }

    timerStart() {
        this.started = Date.now() - this.elapsedTime;
        startBTN.innerHTML = `<span class="material-symbols-outlined">resume</span> Continue`;
        startBTN.style.display = `none`;
        pauseBTN.style.display = `flex`;
        resetBTN.style.display = `flex`;
        lapBTN.style.display = `flex`; // Show lap button
        timerWrapper.classList.add('glow'); // Add glow class when timer starts
        this.timerInterval = setInterval(() => {
            this.currentTime = Date.now() - this.started;
            this.displayTimer();
        }, 10); // Update every 10 milliseconds
    }

    displayTimer() {
        var timerData = this.currentTime;
        this.elapsedTime = timerData;
        var difMin = timerData / (1000 * 60);
        var min = Math.floor(difMin);
        var difsec = (difMin - min) * 60;
        var sec = Math.floor(difsec);
        var difms = 100 * (difsec - sec);
        var ms = Math.floor(difms);
        min = String(min).padStart(2, 0);
        sec = String(sec).padStart(2, 0);
        ms = String(ms).padStart(2, 0);

        TimerField.innerText = `${min}:${sec}:${ms}`;
    }

    pauseTimer() {
        clearInterval(this.timerInterval);
        startBTN.style.display = `flex`;
        pauseBTN.style.display = `none`;
        lapBTN.style.display = `none`; // Hide lap button when paused
        timerWrapper.classList.remove('glow'); // Remove glow class when paused
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        startBTN.innerHTML = `<span class="material-symbols-outlined">play_arrow</span> Start`;
        startBTN.style.display = `flex`;
        pauseBTN.style.display = `none`;
        resetBTN.style.display = `none`;
        lapBTN.style.display = `none`; // Hide lap button
        this.elapsedTime = 0;
        TimerField.innerText = `00:00:00`;
        lapList.innerHTML = ''; // Clear laps
        timerWrapper.classList.remove('glow'); // Remove glow class when reset
    }

    addLap() {
        const lapTime = this.elapsedTime; // Get the current elapsed time
        const difMin = lapTime / (1000 * 60);
        const min = Math.floor(difMin);
        const difsec = (difMin - min) * 60;
        const sec = Math.floor(difsec);
        const difms = 100 * (difsec - sec);
        const ms = Math.floor(difms);
        const formattedLapTime = `${String(min).padStart(2, 0)}:${String(sec).padStart(2, 0)}:${String(ms).padStart(2, 0)}`;

        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap: ${formattedLapTime}`;
        lapList.appendChild(lapItem); // Add the lap time to the list
    }
}

let TimerObj = new Timer();
window.addEventListener('load', () => {
    startBTN.style.display = `flex`;
});

startBTN.addEventListener('click', () => {
    TimerObj.timerStart();
});

pauseBTN.addEventListener('click', () => {
    TimerObj.pauseTimer();
});

resetBTN.addEventListener('click', () => {
    TimerObj.resetTimer();
});

lapBTN.addEventListener('click', () => {
    TimerObj.addLap(); // Call the addLap function when the lap button is clicked
});
