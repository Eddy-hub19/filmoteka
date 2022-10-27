import { refs } from "./refs";

const LOCAL_STORAGE_DATA = {
  watched: [779782, 718930, 619730],
  que: [616820, 913290, 616037],
};

localStorage.setItem("storage", JSON.stringify(LOCAL_STORAGE_DATA));

console.log(localStorage);

export function addToWatch(e) {
  console.log(e.target);
}

function addToQue(e) {
  console.log(e.target);
}

refs.modalQueue.addEventListener("click", addToQue);
refs.modalWatch.addEventListener("click", addToWatch);
