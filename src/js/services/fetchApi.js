import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const API_KEY = "bef35a6880b17319422124db5bc1d407";
export default class TmDbApi {
  constructor() {
    this.options = {
      api_key: API_KEY,
      query: "",
      include_adult: false,
      page: 1,
    };
  }
  //в констракторе базовые параметры
  fetchTrendingMovies = async (page) => {
    const response = await axios.get(`/trending/movie/week`, {
      params: { ...this.options, page },
    });
    return response.data;
  };
  //fetchTrendingMovies возвращает массив объектов с топ фильмами на этой неделе
  fetchSearchMovies = async (query) => {
    const response = await axios.get("/search/movie", {
      params: { ...this.options, query },
    });
    return response;
  };
  //fetchSearchMovies возвращает массив объектов которые мы ищем
  fetchMovieDetail = async (movieId) => {
    const response = await axios.get(`/movie/${movieId}}`, {
      params: this.options,
    });
    return response.data;
  };
  //fetchMovieDetail возвращает объект с детальной информацией о фильме
  fetchMovieCast = async (movieId) => {
    const response = await axios.get(`/movie/${movieId}/credits`, {
      params: this.options,
    });
    return response.data;
  };
  //fetchMovieDetail возвращает масив объектов с информацией о актерах которые снимались в этом кино (ВНИМАНИЕ НЕ НА ВСЕ ФИЛЬМЫ ЕСТЬ ТАКАЯ ИНФА + НЕ ВЕЗДЕ ЕСТЬ АВАТРКИ АКТЕРОВ === НУЖНО ЗАДАВАТЬ СТАНТАРТНЫЙ АВАТАР)
  fetchMovieReviews = async (movieId) => {
    const response = await axios.get(`/movie/${movieId}/reviews`, {
      params: this.options,
    });
    return response.data;
  };
  //fetchMovieDetail возвращает масив объектов с ревьюхами пользователей на этом кино (ВНИМАНИЕ НЕ НА ВСЕ ФИЛЬМЫ ЕСТЬ ТАКАЯ ИНФА)
}
