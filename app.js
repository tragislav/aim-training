const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEL = document.querySelector("#time");
const board = document.querySelector("#board");

const colors = [
  "#e74c3c",
  "#8e44ad",
  "#3498db",
  "#e67e22",
  "#2ecc71",
  "#11dee9",
  "#017e8b",
  "#7a2ff3",
  "#8a6eb6",
  "#6e20ea",
  "#700dc1",
  "#ee111f",
  "#390513",
];
let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = +event.target.getAttribute("data-time");
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(timeEL, time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    timeEL.innerHTML = `00:${current}`;
    setTime(timeEL, current);
  }
}

function setTime(elem, value) {
  elem.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEL.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const color = getRandomColor(colors);
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add("circle");
  circle.style.background = color;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
