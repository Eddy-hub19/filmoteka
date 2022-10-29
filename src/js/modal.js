import { refs } from "./refs"
import TmDbApi from "./services/fetchApi"

// fetchApi for movieDetail
const Api = new TmDbApi()
async function render(id) {
    try {
        const filmResponse = await Api.fetchMovieDetail(id)
        renderMovie(filmResponse)
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
// refs for modal revalue
const modalPoster = document.querySelector(".modal__poster")
const modalTitle = document.querySelector(".modal__title")
const modalTextAbout = document.querySelector(".modal__text")
const modalPopularity = document.querySelector(".modal__popularity .value")
const modalTextGenres = document.querySelector(".modal__genre .value")
const modalOriginalTitle = document.querySelector(".modal__original .value")
const valueRating = document.querySelector(".value__votes .rating")
const valueVotes = document.querySelector(".value__votes .rating__votes")
function renderMovie(response) {
    const { id, genres, title, vote_average, vote_count, poster_path, popularity, original_title, overview } = response
    // Feature for genre map
    let preparedGenres = null
    if (genres) {
        preparedGenres = genres.map((g) => g.name).join(", ")
    }
    // For the poster set
    modalPoster.src = `${
        poster_path === null
            ? "https://tn.fishki.net/26/upload/post/2018/04/20/2577020/afrikanskie-postery-k-gollivudskim-blokbasteram-6.jpg"
            : "https://image.tmdb.org/t/p/w300" + `${poster_path}`
    }`

    modalPoster.setAttribute("data-img", `${id}`)
    modalTitle.textContent = `${title}`
    modalTextAbout.textContent = `${overview}`
    modalTextGenres.textContent = `${preparedGenres}`
    modalPopularity.textContent = `${popularity}`
    modalOriginalTitle.textContent = `${original_title}`
    valueRating.textContent = `${Math.floor(vote_average)}`
    valueVotes.textContent = `${vote_count}`
    return
}
