import { topMovieList } from "./js/topMovieList";
import { library } from "./js/library-render";
import { refs } from "./js/refs";
import {
  carouselListener,
  carouselResizing,
  carouselRender,
} from "./js/carousel";

import { upwardEl, scrollTop } from './js/upward';

upwardEl();
scrollTop();

import { addToWatch } from "./js/library-list";


// Initial gallery population function goes here
topMovieList.render();

// Button and Modal listeners:

refs.logo.addEventListener("click", (event) => {
  event.preventDefault();
  document.body.className = "home watched";

  //Gallery population function for this page goes here
});

refs.homeButton.addEventListener("click", (event) => {
  event.preventDefault();
  document.body.classList.replace("library", "home");

  //Gallery population function for this page goes here
});

refs.libraryButton.addEventListener("click", (event) => {
  event.preventDefault();
  document.body.classList.replace("home", "library");
  library.watchedRender();
  //Gallery population function for this page goes here
});

refs.watchedButton.addEventListener("click", () => {
  document.body.classList.replace("queue", "watched");
  library.watchedRender();
  //Gallery population function for this page goes here
});

refs.queueButton.addEventListener("click", () => {
  document.body.classList.replace("watched", "queue");
  library.queueRender();
  //Gallery population function for this page goes here
});

refs.modalWatch.addEventListener("click", () => {
  // Watch list update function goes here
});

refs.modalQueue.addEventListener("click", () => {
  // Queue update function goes here
});

// Pages selector functions

carouselListener();

carouselResizing();

carouselRender(refs.pageCurrent, refs.pageMax);

// Functions

// Це для накидування лістенерів для закриття модалки:

function modalCloser() {
  const backgroundClose = (event) => {
    if (event.target == event.currentTarget) {
      document.body.classList.toggle("modal-on");
      refs.modalClose.removeEventListener("click", crossClose);
      window.removeEventListener("keydown", modalEsc);
      refs.modalBackground.removeEventListener(
        "click",
        backgroundClose
      );
    }
  };

  const crossClose = (event) => {
    document.body.classList.toggle("modal-on");
    refs.modalBackground.removeEventListener(
      "click",
      backgroundClose
    );
    window.removeEventListener("keydown", modalEsc);
    refs.modalClose.removeEventListener("click", crossClose);
  };

  const modalEsc = (event) => {
    if (event.key === "Escape") {
      if (document.body.classList.contains("modal-on")) {
        document.body.classList.toggle("modal-on");
        refs.modalBackground.removeEventListener(
          "click",
          backgroundClose
        );
        refs.modalClose.removeEventListener("click", crossClose);
        window.removeEventListener("keydown", modalEsc);
      }
    }
  };

  refs.modalBackground.addEventListener("click", backgroundClose);

  refs.modalClose.addEventListener("click", crossClose);

  window.addEventListener("keydown", modalEsc);
}

// Накидує на картки лістенери для модалки:

function modalListener() {
  const modalOpener = (event) => {
    let dataSource = event.currentTarget.dataset.id;
    document.body.classList.toggle("modal-on");

    // Modal population function goes here. Don't forget the spinner.

    modalCloser();
  };

  refs.galleryCards = document.querySelectorAll(".gallery__card");

  refs.galleryCards.forEach((element) => {
    element.addEventListener("click", modalOpener);
  });
}

// LazyLoad:

function lazyLoad() {
  refs.galleryCards = document.querySelectorAll(".gallery__card");

  var firstItem = document.querySelector(".gallery__card");

  var itemGap = [
    ...document.defaultView.getComputedStyle(firstItem.parentElement)
      .gap,
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
