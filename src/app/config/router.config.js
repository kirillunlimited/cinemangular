'use strict';
module.exports = function routerConfig($routeProvider) {
  $routeProvider
    .when("/today", {
      templateUrl : 'app/views/catalog.html',
      controller: 'TodayController',
      controllerAs: 'filmsCtrl'
    })
    .when("/soon", {
      templateUrl : 'app/views/catalog.html',
      controller: 'SoonController',
      controllerAs: 'filmsCtrl'
    })
    .when("/film/:filmID", {
      templateUrl : 'app/views/film.html',
      controller: 'FilmController',
      controllerAs: 'filmCtrl'
    })
    .when("/seances/:filmID", {
      templateUrl : 'app/views/film_seances.html',
      controller: 'SeancesController',
      controllerAs: 'seancesCtrl'
    })
    .when("/cinema/:cinemaID", {
      templateUrl : 'app/views/cinema_seances.html',
      controller: 'CinemaController',
      controllerAs: 'cinemaCtrl'
    })
    .when("/search", {
      templateUrl : 'app/views/search.html',
      controller: 'SearchController',
      controllerAs: 'searchCtrl'
    })
    .otherwise({
      redirectTo: '/today'
    });
};