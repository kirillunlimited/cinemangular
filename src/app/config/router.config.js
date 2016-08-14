'use strict';
module.exports = function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/afisha/today");

  $stateProvider
    .state('afisha', {
      url: "/afisha",
      templateUrl: "app/views/afisha.html",
      controller: 'AfishaController',
      controllerAs: 'afishaCtrl'
    })
    .state('afisha.today', {
      url: "/today",
      templateUrl: "app/views/afisha.content.html",
      controller: 'AfishaController',
      controllerAs: 'afishaCtrl'
    })
    .state('afisha.soon', {
      url: "/soon",
      templateUrl: "app/views/afisha.content.html",
      controller: 'AfishaController',
      controllerAs: 'afishaCtrl'
    })
    .state('search', {
      url: "/search/",
      templateUrl: "app/views/search.html",
      controller: 'SearchController',
      controllerAs: 'searchCtrl'
    })
    .state('search.results', {
      url: ":value",
      templateUrl: "app/views/search.results.html",
      controller: 'SearchController',
      controllerAs: 'searchCtrl'
    })
    .state('film', {
      url: "/film/:filmId",
      templateUrl: "app/views/film.html",
      controller: 'FilmController',
      controllerAs: 'filmCtrl'
    })
    .state('person', {
      url: "/person/:personId",
      templateUrl: "app/views/person.html",
      controller: 'PersonController',
      controllerAs: 'personCtrl'
    })
    .state('seances', {
      url: "/seances/:filmId",
      templateUrl: "app/views/film_seances.html",
      controller: 'SeancesController',
      controllerAs: 'seancesCtrl'
    })
    .state('cinema', {
      url: "/cinema/:cinemaId",
      templateUrl: "app/views/cinema_seances.html",
      controller: 'CinemaController',
      controllerAs: 'cinemaCtrl'
    })
};