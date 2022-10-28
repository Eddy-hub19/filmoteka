import TmDbApi from "./services/fetchApi";
import allGenres from "./services/genres";
const Api = new TmDbApi();


export const library = {
    movieList: document.querySelector(".gallery"),
    options: {
        page:1,
    },
    
watchedRender() {
    const watchedMoviesID = JSON.parse(localStorage.getItem("storage")).watched;
    console.log(watchedMoviesID);
    const films = [];
        watchedMoviesID.map(async (movieId) => {
        this.options.id = movieId;
        console.log(this.options.id);
        try {
            const film = await Api.fetchMovieDetail(movieId);
            console.log(film);
            films.push(film);
            this.createMarkUp(this.preparingForMarkUp(films));
        } catch (error) {
            console.log(error, `Попробуйте перезагрузить страницу`);
        }
        });
    console.log(films);
    return(films);
    },

    queueRender() {
    const queueMoviesID = JSON.parse(localStorage.getItem("storage")).que;
    console.log(queueMoviesID);
    const films = [];
        queueMoviesID.map(async (movieId) => {
        this.options.id = movieId;
        console.log(this.options.id);
        try {
            const film = await Api.fetchMovieDetail(movieId);
            console.log(film);
            films.push(film);
            this.createMarkUp(this.preparingForMarkUp(films));
        } catch (error) {
            console.log(error, `Попробуйте перезагрузить страницу`);
        }
        });
    console.log(films);
    return(films);
    },

preparingForMarkUp(films) {
    return films.map(
        ({ id, title, poster_path, vote_average, release_date, genres }) => ({
        id,
        title,
        poster_path: "https://image.tmdb.org/t/p/w500" + poster_path,
        vote_average,
        genres_id: genres[0].name,
        // genres_id: this.calculatingGenres(genres),
        release_date: release_date.split("-"),
        
        })
    );
    },
    createMarkUp(preparedMovies) {
    const { movieList } = this;
    const moviesMarkUp = preparedMovies
        .map(
        ({ id, title, poster_path, vote_average, release_date, genres_id }) => {
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
                <p class="gallery__details">${genres_id} | ${
            release_date[0]}</p>

                <p p class="gallery__rating">${vote_average.toFixed(1)}</p>
            </div>
            </div>
        </li>
    `;
        }
        )
        .join("");
    movieList.innerHTML = "";
    movieList.insertAdjacentHTML("beforeend", moviesMarkUp);
    },

    

    calculatingGenres(genres) {
      console.log(genres);
    const sortGenres = allGenres
      .filter((genre) => {
        for (const id of genres) {
          if (id === genre.id) {
            return genre;
          }
        }
      })
        .map((genre) => genre.name);
        console.log(sortGenres);
    if (sortGenres.length > 2) {
      return [...sortGenres.slice(0, 2), "Other"];
    } else {
      return sortGenres;
    }
  },
}

// <p class="gallery__details">${genres_id.join(", ")} | ${release_date[0]}</p>