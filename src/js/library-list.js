import { refs } from "./refs";

// const LOCAL_STORAGE_DATA = {
//   watched: [],
//   que: [],
// };

// localStorage.setItem("storage", JSON.stringify(LOCAL_STORAGE_DATA));

// парсимо інфу зі стореджа

const savedSettings = localStorage.getItem("storage");
let parsedSettings = JSON.parse(savedSettings);
console.log(parsedSettings);

// let filmId = refs.modalImg.dataset.img;

export function addToWatch(e) {
  let filmId = refs.modalImg.dataset.img;

  if (parsedSettings.watched.indexOf(filmId) === -1) {
    parsedSettings.watched.push(filmId);
    localStorage.setItem("storage", JSON.stringify(parsedSettings));
    refs.modalWatch.classList.add("active-modal-btn");
    return;
  }

  parsedSettings.watched.splice(
    parsedSettings.watched.indexOf(filmId, 1)
  );
  refs.modalWatch.classList.remove("active-modal-btn");
  localStorage.setItem("storage", JSON.stringify(parsedSettings));
}

export function addToQue(e) {
  let filmId = refs.modalImg.dataset.img;
  refs.modalQueue.classList.add("active-modal-btn");
  if (parsedSettings.que.indexOf(filmId) === -1) {
    parsedSettings.que.push(filmId);
    localStorage.setItem("storage", JSON.stringify(parsedSettings));
    return;
  }

  parsedSettings.que.splice(parsedSettings.que.indexOf(filmId, 1));
  localStorage.setItem("storage", JSON.stringify(parsedSettings));
  refs.modalQueue.classList.remove("active-modal-btn");
}

refs.modalQueue.addEventListener("click", addToQue);
refs.modalWatch.addEventListener("click", addToWatch);
// 779782, 718930, 619730
// 616820, 913290, 616037
