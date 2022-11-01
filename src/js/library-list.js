import { refs } from "./refs";
import { library } from "./library-render";
// import { save, load } from "./services/storage";

export function checkStorage() {
  if (!localStorage.getItem("storage")) {
    const LOCAL_STORAGE_DATA = {
      watched: [],
      que: [],
    };

    localStorage.setItem("storage", JSON.stringify(LOCAL_STORAGE_DATA));
  }
}

checkStorage();

const savedStorage = localStorage.getItem("storage");
let parsedStorage = JSON.parse(savedStorage);
console.log(parsedStorage);

export function addToWatch(e) {
  let filmId = refs.modalImg.dataset.img;

  if (!parsedStorage.watched.includes(filmId)) {
    parsedStorage.watched.push(filmId);
    localStorage.setItem("storage", JSON.stringify(parsedStorage));
    refs.modalWatch.textContent = "remove from watched";
    return;
  }

  parsedStorage.watched.splice(parsedStorage.watched.indexOf(filmId), 1);
  refs.modalWatch.textContent = "Add to watched";
  localStorage.setItem("storage", JSON.stringify(parsedStorage));
  // document.querySelector(`[data-id="${filmId}"]`).remove();
  library.watchedRender();
}

export function addToQue(e) {
  let filmId = refs.modalImg.dataset.img;
  refs.modalQueue.textContent = "remove from queue";
  if (!parsedStorage.que.includes(filmId)) {
    parsedStorage.que.push(filmId);
    localStorage.setItem("storage", JSON.stringify(parsedStorage));
    return;
  }

  parsedStorage.que.splice(parsedStorage.que.indexOf(filmId), 1);
  localStorage.setItem("storage", JSON.stringify(parsedStorage));
  refs.modalQueue.textContent = "Add to queue";
  // document.querySelector(`[data-id="${filmId}"]`).remove();
  library.queueRender();
}

refs.modalQueue.addEventListener("click", addToQue);
refs.modalWatch.addEventListener("click", addToWatch);

export function checkWatchedFilm() {
  let filmId = refs.modalImg.dataset.img;

  return parsedStorage.watched.includes(filmId)
    ? (refs.modalWatch.textContent = "remove from watched")
    : (refs.modalWatch.textContent = "Add to watched");
}

export function checkQueue() {
  let filmId = refs.modalImg.dataset.img;

  return parsedStorage.que.includes(filmId)
    ? (refs.modalQueue.textContent = "remove from queue")
    : (refs.modalQueue.textContent = "Add to queue");
}
