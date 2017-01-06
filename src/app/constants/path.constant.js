'use strict';
module.exports = {
 'API_OLD': 'http://api.kinopoisk.cf/',
  'METHODS_OLD': {
    film: 'getFilm?filmID=',
    person: 'getPeopleDetail?peopleID=',
    cinema: 'getCinemaDetail?cinemaID=',
    seances: 'getSeance?filmID=',
    searchFilms: 'searchFilms?keyword=',
    searchPeople: 'searchPeople?keyword=',
    todayFilms: 'getTodayFilms?date=',
    soonFilms: 'getSoonFilms'
  },
  'IMG_OLD': 'https://st.kp.yandex.net/images/',

  'API': 'https://api.themoviedb.org/3/',
  'IMG': 'https://image.tmdb.org/t/p/w325/',
  'METHODS': {
    // afisha
    discoverMovies: 'discover/movie',
    nowPlaying: 'movie/now_playing',

    // movie
    movie: 'movie/{id}',
    movieCredits: 'movie/{id}/credits',

    // cast and crew
    person: 'person/{id}',
    personCredits: 'person/{id}/combined_credits',
  }
};