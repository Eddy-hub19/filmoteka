import { library } from "./js/library-render";

import { moviesListRenderByTopAndSearch } from "./js/moviesListRenderByTopAndSearch";
import { refs } from "./js/refs";
import * as modalTeam from "./js/modal-team";
import * as theme from "./js/themeSwitcher";
import {
  carouselListener,
  carouselResizing,
  carouselRender,
} from "./js/carousel";

import { upwardEl, scrollTop } from "./js/upward";

import { moviesListRenderByTopAndSearch } from "./js/moviesListRenderByTopAndSearch";

import { refs } from "./js/refs";
import {
  carouselListener,
  carouselResizing,
  carouselRender,
} from "./js/carousel";

upwardEl();
scrollTop();

import { addToWatch } from "./js/library-list";

moviesListRenderByTopAndSearch.render();

refs.logo.addEventListener("click", (event) => {
  event.preventDefault();
  document.body.className = "home watched";

  refs.searchBox.value = "";
  moviesListRenderByTopAndSearch.options.query = "";
  moviesListRenderByTopAndSearch.options.page = 1;
  moviesListRenderByTopAndSearch.render();
});

refs.homeButton.addEventListener("click", (event) => {
  event.preventDefault();
  document.body.classList.replace("library", "home");

  refs.pageCurrent = 1;
  moviesListRenderByTopAndSearch.render();
});

refs.libraryButton.addEventListener("click", (event) => {
  event.preventDefault();
  document.body.classList.replace("home", "library");

  refs.pageCurrent = 1;
  library.watchedRender();
});

refs.watchedButton.addEventListener("click", () => {
  document.body.classList.replace("queue", "watched");

  refs.pageCurrent = 1;
  library.watchedRender();
});

refs.queueButton.addEventListener("click", () => {
  document.body.classList.replace("watched", "queue");

  refs.pageCurrent = 1;
  library.queueRender();
});

carouselListener();

carouselResizing();

function lazyLoad() {
  refs.galleryCards = document.querySelectorAll(".gallery__card");

  var firstItem = document.querySelector(".gallery__card");

  var itemGap = [
    ...document.defaultView.getComputedStyle(firstItem.parentElement).gap,
  ];
  itemGap = parseInt(`${itemGap[0]}${itemGap[1]}`);

  var itemSize = `${
    Math.ceil(firstItem.getBoundingClientRect().height) + itemGap
  }px`;

  const onEntry = (observerEntries) => {
    observerEntries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        let source = target.firstElementChild.dataset.source;
        target.firstElementChild.src = source;
      }
    });
  };

  const observerOptions = { root: null, rootMargin: itemSize };

  const observer = new IntersectionObserver(onEntry, observerOptions);

  refs.galleryCards.forEach((element) => {
    observer.unobserve(element);
    observer.observe(element);
  });
}
