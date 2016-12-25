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
    discoverMovies: 'discover/movie',
    film: 'movie/'
  }
};