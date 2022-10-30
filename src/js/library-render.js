import TmDbApi from "./services/fetchApi";
import { modalListener } from "./modal";
import { refs } from "./refs";
import { carouselRender } from "./carousel";
const Api = new TmDbApi();

export const library = {
  movieList: refs.gallery,
  options: {
    page: 1,
  },

    watchedRender() {
    this.resetLibrary();
    const { movieList } = this;
    //   refs.libraryContent.innerHTML = `<ul class="gallery"></ul>`;
    //   refs.libraryContent.classList.remove("library__empty");
    //...........................................................................    
    //test
    //   const LOCAL_STORAGE_DATA = {
    //   watched: [779782, 718930, 619730],
    //   que: [616820],
    // };
    // localStorage.setItem("storage", JSON.stringify(LOCAL_STORAGE_DATA));
      //test
      //...........................................................................
    
    const watchedMoviesID = JSON.parse(localStorage.getItem("storage")).watched;
        if (watchedMoviesID.length !== 0) {
        const movies = [];

        var iterator = 0;
        const moviesAmount = watchedMoviesID.length;
        refs.pageMax = Math.ceil(moviesAmount / refs.moviesPerPage);
        carouselRender(refs.pageCurrent, refs.pageMax);

        refs.moviesRemaining = watchedMoviesID;
        if (refs.pageCurrent > 1) {
            refs.moviesRemaining = watchedMoviesID.slice(
                (refs.pageCurrent - 1) * refs.moviesPerPage - 1,
                watchedMoviesID.length - 1
            );
        }

        refs.moviesRemaining.map(async (movieId) => {
            try {
                const movie = await Api.fetchMovieDetail(movieId);
                iterator += 1;
                movies.push(movie);
                if (iterator === refs.moviesPerPage) {
                    this.createMarkUp(this.preparingForMarkUp(movies));
                }
                if (
                    iterator < refs.moviesPerPage &&
                    movies.length === refs.moviesRemaining.length
                ) {
                    this.createMarkUp(this.preparingForMarkUp(movies));
                }
            } catch (error) {
                console.log(error, `Попробуйте перезагрузить страницу`);
            }
        });
    }
    this.createEmptyGalleryMarkUp();
  },

    queueRender() {
        this.resetLibrary();
    
      const queueMoviesID = JSON.parse(localStorage.getItem("storage")).que;
      console.log(queueMoviesID.length);
      if (queueMoviesID.length !== 0) {
    
    const movies = [];

    var iterator = 0;
    const moviesAmount = queueMoviesID.length;
    refs.pageMax = Math.ceil(moviesAmount / refs.moviesPerPage);
    carouselRender(refs.pageCurrent, refs.pageMax);

    refs.moviesRemaining = queueMoviesID;
    if (refs.pageCurrent > 1) {
      refs.moviesRemaining = queueMoviesID.slice(
        (refs.pageCurrent - 1) * refs.moviesPerPage - 1,
        queueMoviesID.length - 1
      );
    }

    refs.moviesRemaining.map(async (movieId) => {
      try {
        const movie = await Api.fetchMovieDetail(movieId);
        iterator += 1;
        movies.push(movie);
        if (iterator === refs.moviesPerPage) {
          this.createMarkUp(this.preparingForMarkUp(movies));
        }
        if (
          iterator < refs.moviesPerPage &&
          movies.length === refs.moviesRemaining.length
        ) {
          this.createMarkUp(this.preparingForMarkUp(movies));
        }
      } catch (error) {
        console.log(error, `Попробуйте перезагрузить страницу`);
      }
    });
      }
      this.createEmptyQueueMarkUp();
  },

  preparingForMarkUp(movies) {
    return movies.map(
      ({ id, title, poster_path, vote_average, release_date, genres }) => ({
        id,
        title,
        poster_path: "https://image.tmdb.org/t/p/w500" + poster_path,
        vote_average,
        genres: this.calculatingGenres(genres),
        release_date: release_date.split("-"),
      })
    );
  },

    createMarkUp(preparedMovies) {
    console.log(preparedMovies);
    // const { movieList } = this;
        const moviesMarkUp = preparedMovies
      .map(({ id, title, poster_path, vote_average, release_date, genres }) => {
        return `<li class="gallery__card" data-id=${id}>

            <img
            src=${poster_path}
            data-source=${poster_path}
            data-page="homepage"
            alt=${title}
            class="gallery__image"
            />
            <div class="gallery__data">
            <div class="gallery__name">${title}</div>
            <div class="gallery__stats">

                <p class="gallery__details">${genres.join(", ")} | ${
          release_date[0]
        }</p>
                <p class="gallery__rating">${vote_average.toFixed(1)}</p>

            </div>
            </div>
        </li>`;
      })
        .join("");
    
        refs.gallery.innerHTML = "";
        refs.gallery.insertAdjacentHTML("beforeend", moviesMarkUp);
        modalListener();
  },

    createEmptyGalleryMarkUp() {
        refs.gallery.innerHTML = `<p class="library-message animate__bounceInDown">Your gallery is empty. <br>Choose your first movie!</p>`;
        refs.libraryContent.classList.add("library__empty");
    },
    createEmptyQueueMarkUp() {
        refs.gallery.innerHTML = `<p class="library-message animate__bounceInDown">Your queue is empty. <br>Choose your first movie!</p>`;
        refs.libraryContent.classList.add("library__empty");
    },
    
  calculatingGenres(genre_ids) {
    const sortGenres = genre_ids.map((genre) => genre.name);

    if (sortGenres.length > 2) {
      return [...sortGenres.slice(0, 2), "Other"];
    } else {
      return sortGenres;
    }
    },
  
    resetLibrary() {
      refs.libraryContent.classList.remove("library__empty");
  },
};
