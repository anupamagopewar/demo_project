let startTime;
let difference = 0;
let interval;
let running = false;
let laps = [];

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        interval = setInterval(updateTime, 10);
        running = true;
    }
}

function stopStopwatch() {
    
    if (running) {
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function updateTime() {
    let currentTime = new Date().getTime();
    difference = currentTime - startTime;

    let milliseconds = Math.floor((difference % 1000) / 10);
    let seconds = Math.floor((difference / 1000) % 60);
    let minutes = Math.floor((difference / (1000 * 60)) % 60);
    let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    document.getElementById("display").innerText =
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function resetStopwatch() {
    clearInterval(interval);
    running = false;
    difference = 0;
    laps = [];

    document.getElementById("display").innerText = "00:00:00";
    document.getElementById("lapsList").innerHTML = "";
}

function recordLap() {
    if (running) {
        laps.push(document.getElementById("display").innerText);
        updateLaps();
    }
}

function updateLaps() {
    let lapsList = document.getElementById("lapsList");
    lapsList.innerHTML = "";

    laps.forEach((lap, index) => {
        let lapItem = document.createElement("div");
        lapItem.className = "lap-item";
        lapItem.innerText = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(lapItem);
    });
}

function pad(number) {
    return number < 10 ? "0" + number : number;
}
