const songs = [
    "playlist/(Put On Your) Dancing Pants - Reed Mathis.mp3",
    "playlist/Boom Bap Flick - Quincas Moreira.mp3",
    "playlist/Ice & Fire - King Canyon.mp3",
    "playlist/Lawrence - TrackTribe.mp3",
    "playlist/Lonely Day - Telecasted.mp3",
    "playlist/Morning Stroll - Josh Kirsch-Media Right Productions.mp3",
    "playlist/Ringside - Dyalla.mp3",
    "playlist/Soulicious - Dyalla.mp3",
    "playlist/You Like It - Vibe Tracks.mp3",
];

let currentIndex = 0;

const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const songTitle = document.getElementById("songTitle");

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function updateProgress() {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + "%";
    currentTimeEl.textContent = formatTime(audio.currentTime);
}

function loadSong(index) {
    audio.src = songs[index];
    audio.load();
    audio.play();
    const title = songs[index].split("/").pop();
    songTitle.textContent = title;
}

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
});

audio.addEventListener("loadedmetadata", () => {
    totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", updateProgress);

audio.addEventListener("ended", () => {
    nextBtn.click();
});

window.addEventListener("load", () => {
    loadSong(currentIndex);
});

document.querySelector(".progress-container").addEventListener("click", (e) => {
    const container = e.currentTarget;
    const clickX = e.offsetX;
    const width = container.clientWidth;
    const percent = clickX / width;
    audio.currentTime = percent * audio.duration;
});

const speedSelector = document.getElementById("speedControl");
speedSelector.addEventListener("change", () => {
    audio.playbackRate = parseFloat(speedSelector.value);
});

const moreBtn = document.getElementById("moreOptions");
const speedMenu = document.getElementById("speedWrapper");

moreBtn.addEventListener("click", () => {
    speedMenu.style.display = (speedMenu.style.display === "none") ? "block" : "none";
});