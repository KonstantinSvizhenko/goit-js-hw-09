import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  btn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  input: document.querySelector('input'),
};
let intervalId = null;
let selectedDate = null;
refs.btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates);
    selectedDate = selectedDates[0].getTime();
    const deltaTime = selectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    updateTimer({ days, hours, minutes, seconds });
  },
};

flatpickr('#datetime-picker', options);

function checkDate(date) {
  if (date[0].getTime() <= Date.now()) {
    refs.btn.disabled = true;
    return Notiflix.Notify.failure('Please choose a date in the future');
  }
  refs.btn.disabled = false;
}

refs.btn.addEventListener('click', startCounter);

function startCounter() {
  refs.btn.disabled = true;
  refs.input.disabled = true;

  intervalId = setInterval(() => {
    const deltaTime = selectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      refs.btn.disabled = false;
      refs.input.disabled = false;
      return;
    }

    updateTimer({ days, hours, minutes, seconds });
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  if (!(days >= 0 && hours >= 0 && minutes >= 0 && seconds >= 0)) {
    return;
  }
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function addZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}