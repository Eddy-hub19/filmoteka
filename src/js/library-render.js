import TmDbApi from "./services/fetchApi";
import { modalListener } from "./modal";
const Api = new TmDbApi();

export const library = {
  movieList: document.querySelector(".gallery"),
  options: {
    page: 1,
  },

  watchedRender() {
    const watchedMoviesID = JSON.parse(
      localStorage.getItem("storage")
    ).watched;
    const movies = [];

    watchedMoviesID.map(async (movieId) => {
      try {
        const movie = await Api.fetchMovieDetail(movieId);
        movies.push(movie);
        this.createMarkUp(this.preparingForMarkUp(movies));
      } catch (error) {
        console.log(error, `Попробуйте перезагрузить страницу`);
      }
    });
    return movies;
  },

  queueRender() {
    const queueMoviesID = JSON.parse(
      localStorage.getItem("storage")
    ).que;

    const movies = [];

    queueMoviesID.map(async (movieId) => {
      try {
        const movie = await Api.fetchMovieDetail(movieId);
        movies.push(movie);
        this.createMarkUp(this.preparingForMarkUp(movies));
      } catch (error) {
        console.log(error, `Попробуйте перезагрузить страницу`);
      }
    });
    return movies;
  },

  preparingForMarkUp(movies) {
    return movies.map(
      ({
        id,
        title,
        poster_path,
        vote_average,
        release_date,
        genres,
      }) => ({
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
      .map(
        ({
          id,
          title,
          poster_path,
          vote_average,
          release_date,
          genres,
        }) => {
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
                <p class="gallery__rating">${vote_average.toFixed(
                  1
                )}</p>

            </div>
            </div>
        </li>`;
        }
      )
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
