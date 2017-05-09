'use strict';
module.exports = function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/afisha/today');

  $stateProvider
    .state('afisha', {
      url: '/afisha',
      templateUrl: 'app/views/afisha.html',
      controller: 'AfishaController',
      controllerAs: 'afishaCtrl'
    })
    .state('afisha.today', {
      url: '/today',
      templateUrl: 'app/views/posters.html',
      controller: 'AfishaController',
      controllerAs: 'afishaCtrl'
    })
    .state('afisha.upcoming', {
      url: '/upcoming',
      templateUrl: 'app/views/posters.html',
      controller: 'AfishaController',
      controllerAs: 'afishaCtrl'
    })
    .state('afisha.popular', {
      url: '/popular',
      templateUrl: 'app/views/posters.html',
      controller: 'AfishaController',
      controllerAs: 'afishaCtrl'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'app/views/search.html',
      controller: 'SearchController',
      controllerAs: 'searchCtrl'
    })
    .state('search.movies', {
      url: '/movies/:query',
      templateUrl: 'app/views/results/movies.html',
    })
    .state('search.tv', {
      url: '/tv/:query',
      templateUrl: 'app/views/results/tv.html',
    })
    .state('search.people', {
      url: '/people/:query',
      templateUrl: 'app/views/results/people.html',
    })
    .state('film', {
      url: '/film/:filmId',
      templateUrl: 'app/views/film.html',
      controller: 'FilmController',
      controllerAs: 'filmCtrl'
    })
    .state('person', {
      url: '/person/:personId',
      templateUrl: 'app/views/person.html',
      controller: 'PersonController',
      controllerAs: 'personCtrl'
    })
    .state('cinema', {
      url: '/cinema/:cinemaId',
      templateUrl: 'app/views/cinema.html',
      controller: 'CinemaController',
      controllerAs: 'cinemaCtrl'
    })
    .state('credits', {
      url: '/film/:filmId/credits',
      templateUrl: 'app/views/credits.html',
      controller: 'CreditsController',
      controllerAs: 'creditsCtrl'
    })
    .state('videos', {
      url: '/film/:filmId/videos',
      templateUrl: 'app/views/videos.html',
      controller: 'VideosController',
      controllerAs: 'videosCtrl'
    })
};