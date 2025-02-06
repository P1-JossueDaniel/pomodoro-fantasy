const POTTER = 1500;
const SHORT_BREAK = 300;
const LONG_BREAK = 900;

const timerButtons = document.querySelectorAll(".timer-btn");
const circle = document.querySelector(".circle");
const innerCircle = document.querySelector(".innerCircle");
const countdownElement = document.querySelector(".countdown h1");
const playPauseElement = document.querySelector(".play-pause");
const backgroundSelect = document.getElementById("backgroundSelect");
const backgroundVideo = document.getElementById("backgroundVideo");

const buttonSound = new Audio("sound/button.mp3");
const bellSound = new Audio("sound/bell.mp3");