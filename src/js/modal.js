import { refs } from "./refs"
import TmDbApi from "./services/fetchApi"
import genres from "./services/genres"

// fetchApi for movieDetail
const Api = new TmDbApi()

async function render(id) {
    try {
        const filmResponse = await Api.fetchMovieDetail(id)
        renderMovie(filmResponse)

        // filmResponse.genres.map((genre) => genre.name)
    } catch (error) {
        console.log(error)
    }
}

// Це для накидування лістенерів для закриття модалки:

function modalCloser() {
    const backgroundClose = (event) => {
        if (event.target == event.currentTarget) {
            document.body.classList.toggle("modal-on")
            refs.modalClose.removeEventListener("click", crossClose)
            window.removeEventListener("keydown", modalEsc)
            refs.modalBackground.removeEventListener("click", backgroundClose)
        }
    }

    const crossClose = (event) => {
        document.body.classList.toggle("modal-on")
        refs.modalBackground.removeEventListener("click", backgroundClose)
        window.removeEventListener("keydown", modalEsc)
        refs.modalClose.removeEventListener("click", crossClose)
    }

    const modalEsc = (event) => {
        if (event.key === "Escape") {
            if (document.body.classList.contains("modal-on")) {
                document.body.classList.toggle("modal-on")
                refs.modalBackground.removeEventListener("click", backgroundClose)
                refs.modalClose.removeEventListener("click", crossClose)
                window.removeEventListener("keydown", modalEsc)
            }
        }
    }

    refs.modalBackground.addEventListener("click", backgroundClose)

    refs.modalClose.addEventListener("click", crossClose)

    window.addEventListener("keydown", modalEsc)
}

// Накидує на картки лістенери для модалки:

export function modalListener() {
    const modalOpener = (event) => {
        let dataSource = event.currentTarget.dataset.id
        render(dataSource)
        renderMovie(dataSource)

        document.body.classList.toggle("modal-on")

        // Modal population function goes here. Don't forget the spinner.
        // console.log("link to id for modal" + dataSource)
        modalCloser()
    }

    refs.galleryCards = document.querySelectorAll(".gallery__card")

    refs.galleryCards.forEach((element) => {
        element.addEventListener("click", modalOpener)
    })
}

const modalPoster = document.querySelector(".modal__poster")
const modalTitle = document.querySelector(".modal__title")
const modalTextAbout = document.querySelector(".modal__text")

function renderMovie(response) {
    console.log(response)
    const { id, genres, title, vote_average, vote_count, poster_path, popularity, original_title, overview } = response
    modalPoster.src = setPosters(`${poster_path}`)
    modalPoster.setAttribute("data-img", `${id}`)
    modalTitle.textContent = `${title}`
    modalTextAbout.textContent = `${overview}`

    function setPosters(poster) {
        if (poster === null) {
            return "https://tn.fishki.net/26/upload/post/2018/04/20/2577020/afrikanskie-postery-k-gollivudskim-blokbasteram-6.jpg"
        }

        return "https://image.tmdb.org/t/p/w300" + `${poster_path}`
    }

    return
}
// <span class="value">${allGenres}</span>

// Для сету постера
// ${setPosters(poster_path)}

// const allGenres = genres.map((genre) => genre.name).join(", ")
// console.log(allGenres)

// Функція для мапу жанрів
// function calculatingGenres(genres) {
//   const sortGenres = genres.map((genre) => genre.name)
//   if (sortGenres.length > 2) {
//       return [...sortGenres.slice(0, 2), "Other"]
//   } else {
//       return sortGenres
//   }
// }
