import TmDbApi from "./services/fetchApi";
import { modalListener } from "./modal";
import { refs } from "./refs";
import { carouselRender } from "./carousel";
const Api = new TmDbApi();

export const library = {
  movieList: document.querySelector(".gallery"),
  options: {
    page: 1,
  },

  watchedRender() {
    const watchedMoviesID = JSON.parse(localStorage.getItem("storage")).watched;
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
  },

  queueRender() {
    const queueMoviesID = JSON.parse(localStorage.getItem("storage")).que;

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
    const { movieList } = this;
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
    movieList.innerHTML = "";
    movieList.insertAdjacentHTML("beforeend", moviesMarkUp);
    modalListener();
  },

  calculatingGenres(genre_ids) {
    const sortGenres = genre_ids.map((genre) => genre.name);

    if (sortGenres.length > 2) {
      return [...sortGenres.slice(0, 2), "Other"];
    } else {
      return sortGenres;
    }
  },
};
