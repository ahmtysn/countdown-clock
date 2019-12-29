let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTimeDisplay = document.querySelector(".display__end-time");
const btns = document.querySelectorAll(".timer__button");
const form = document.customForm;

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(function() {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
  endTime(then);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes < 10 ? "0" : ""}${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  timerDisplay.textContent = display;
}

function endTime(total) {
  const end = new Date(total);
  const hrs = end.getHours();
  const min = end.getMinutes();
  endTimeDisplay.textContent = `End Time ${hrs}:${min < 10 ? "0" : ""}${min}`;
}

// addEventListener

function starter() {
  const sec = parseFloat(this.dataset.time);
  timer(sec);
}

btns.forEach(btn => btn.addEventListener("click", starter));
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const sec = this.minutes.value * 60;
  timer(sec);
});
