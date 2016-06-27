'use strict';
module.exports = function routerConfig($routeProvider) {
  $routeProvider
    .when("/afisha/:period", {
      templateUrl : 'app/views/afisha.html',
      controller: 'AfishaController',
      controllerAs: 'afishaCtrl'
    })
    .when("/film/:filmID", {
      templateUrl : 'app/views/film.html',
      controller: 'FilmController',
      controllerAs: 'filmCtrl'
    })
    .when("/person/:personID", {
      templateUrl : 'app/views/person.html',
      controller: 'PersonController',
      controllerAs: 'personCtrl'
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
      controllerAs: 'searchCtrl',
      reloadOnSearch: false
    })
    .otherwise({
      redirectTo: '/afisha/today'
    });
};