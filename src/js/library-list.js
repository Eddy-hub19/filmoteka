import { refs } from "./refs";

const LOCAL_STORAGE_DATA = {
  watched: [779782, 718930, 619730],
  que: [616820, 913290, 616037],
};

localStorage.setItem("storage", JSON.stringify(LOCAL_STORAGE_DATA));

// парсимо інфу зі стореджа

const savedSettings = localStorage.getItem("storage");
let parsedSettings = JSON.parse(savedSettings);
console.log(parsedSettings);

let someFilm = 7180930; // тимчасова змінна

export function addToWatch(e) {
  refs.modalWatch.classList.add("active-modal-btn");
  if (parsedSettings.watched.indexOf(someFilm) === -1) {
    parsedSettings.watched.push(someFilm);
    localStorage.setItem("storage", JSON.stringify(parsedSettings));
    return;
  }

  parsedSettings.watched.splice(
    parsedSettings.watched.indexOf(someFilm, 1)
  );
  refs.modalWatch.classList.remove("active-modal-btn");
  localStorage.setItem("storage", JSON.stringify(parsedSettings));
}

function addToQue(e) {
  refs.modalQueue.classList.add("active-modal-btn");
  if (parsedSettings.que.indexOf(someFilm) === -1) {
    parsedSettings.que.push(someFilm);
    localStorage.setItem("storage", JSON.stringify(parsedSettings));
    return;
  }

  parsedSettings.que.splice(parsedSettings.que.indexOf(someFilm, 1));
  localStorage.setItem("storage", JSON.stringify(parsedSettings));
  refs.modalQueue.classList.remove("active-modal-btn");
}

refs.modalQueue.addEventListener("click", addToQue);
refs.modalWatch.addEventListener("click", addToWatch);
