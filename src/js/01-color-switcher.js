function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  bodyEl: document.querySelector('body'),
  startBtnEl: document.querySelector('button[data-start]'),
  stopBtnEl: document.querySelector('button[data-stop]'),
};

let intervalId = null;

refs.startBtnEl.addEventListener('click', () => {
    intervalId = setInterval(() => {
   refs.bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.startBtnEl.setAttribute("disabled", "disabled");

});

refs.stopBtnEl.addEventListener('click', () => {
    clearInterval(intervalId);
    refs.startBtnEl.removeAttribute("disabled");
});
