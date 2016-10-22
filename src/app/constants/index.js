'use strict';
var app = require('angular').module('app');

app.constant('PATH', {
  'API': 'http://api.kinopoisk.cf/',
  'METHODS': {
    film: 'getFilm?filmID=',
    person: 'getPeopleDetail?peopleID=',
    cinema: 'getCinemaDetail?cinemaID=',
    seances: 'getSeance?filmID=',
    searchFilms: 'searchFilms?keyword=',
    searchPeople: 'searchPeople?keyword=',
    todayFilms: 'getTodayFilms?date=',
    soonFilms: 'getSoonFilms'
  },
  'IMG': 'https://st.kp.yandex.net/images/'
});