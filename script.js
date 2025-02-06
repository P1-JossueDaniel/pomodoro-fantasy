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

let timer;
let countdown;
let currentDuration;
let isPaused = true;
let isStarted = false;
let endTime;
let pausedTimeRemaining;

function startTimer() {
    if (!isStarted) {
        isStarted = true;
        endTime =Date.now() + countdown * 1000;

        timer = setInterval(() => {
            if (!isPaused) {
                const currentTime = Date.now();
                const remainingTime = Math.ceil((endTime - currentTime) / 1000);

                if (remainingTime <=0) {
                    clearInterval(timer);
                    handleTimerEnd();
                    return;
                }

                countdown = remainingTime;
                updateDisplay(countdown);

                const progress = (countdown / currentDuration) * 360;
                updateInnerCircle(progress);
            }
        }, 1000);
    }
}

function handleTimerEnd() {
    countdown = 0;
    playPauseElement.style.display = "none";
    bellSound.play();
    updateDisplay(0);
    updateInnerCircle(0);

    setTimeout(() => {
        resetTimer(POTTER);
        currentDuration = POTTER; 
        countdown = POTTER; 
        isPaused = true;
        playPauseElement.textContent = "Play";
      }, 5000);
    }

    function updateDisplay(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        countdownElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      }

      function updateInnerCircle(progress) {
        innerCircle.style.background = `conic-gradient(transparent ${progress}deg, transparent 0%)`;
      }

      function resetTimer(duration) {
        clearInterval(timer);
        isStarted = false;
        isPaused = true;
      
        countdown = duration;
        currentDuration = duration;
      
        updateDisplay(duration);
      
        playPauseElement.style.display = "block";
        playPauseElement.textContent = "Play";
      
        innerCircle.style.background = `conic-gradient(transparent 360deg, transparent 0%)`;
      }

      timerButtons.forEach((button) => {
        button.addEventListener("click", () => {
          timerButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");
      
          const newDuration = parseInt(button.dataset.time);
          resetTimer(newDuration);
        });
      });

      playPauseElement.addEventListener("click", () => {
        buttonSound.play();
        isPaused = !isPaused;
        playPauseElement.textContent = isPaused ? "Play" : "Pause";
      
        if (isPaused) {
          pausedTimeRemaining = Math.ceil((endTime - Date.now()) / 1000);
        } else {
          endTime = Date.now() + pausedTimeRemaining * 1000;
        }
      
        if (!isStarted) {
          startTimer();
        }
      });

      backgroundSelect.addEventListener("change", () => {
        const selectedBackground = backgroundSelect.value;
        setBackgroundVideo(selectedBackground);
        localStorage.setItem("selectedBackground", selectedBackground); // Save the selected background video to localStorage
      });

      function setBackgroundVideo(selectedBackground) {
        const videoPath = `videos/${selectedBackground}.mp4`;
        backgroundVideo.src = videoPath;
      }
      
      window.onload = function() {
        const videoElement = document.getElementById("backgroundVideo");

        if (!localStorage.getItem('hasVisited')) {
          videoElement.src = 'videos/hogwarts.mp4';
          localStorage.setItem('hasVisited', 'true');
        } else {
          const savedBackground = localStorage.getItem('selectedBackground');
          if (savedBackground) {
            videoElement.src = `videos/${savedBackground}.mp4`;
          }
        }

        backgroundSelect.value = "hogwarts";
      };

document.getElementById('contactLink').addEventListener('click', function() {
  history.pushState({ page: 'contact' }, 'Contact', '/contact');
});

window.onpopstate = function(event) {
  if (event.state && event.state.page === 'contact') {
    resetTimer(POTTER);
  }
};

      resetTimer(POTTER);
