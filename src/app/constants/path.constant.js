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
  'IMG': 'https://image.tmdb.org/t/p/{size}',
  'METHODS': {
    // afisha
    nowPlayingMovies: 'movie/now_playing',
    popularMovies: 'movie/popular',
    upcomingMovies: 'movie/upcoming',

    // movie
    movie: 'movie/{id}',
    movieCredits: 'movie/{id}/credits',
    movieGallery: 'movie/{id}/images',
    movieVideos: 'movie/{id}/videos',

    // cast and crew
    person: 'person/{id}',
    personCredits: 'person/{id}/combined_credits',

    // search
    searchMovies: 'search/movie',
    searchPeople: 'search/person',

    // credits
    credits: 'movie/{id}/credits'
  }
};