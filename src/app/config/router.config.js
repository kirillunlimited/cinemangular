'use strict';
module.exports = function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/movies/today');

  $stateProvider
    .state('movies', {
      url: '/movies',
      templateUrl: 'app/views/movies.html',
      controller: 'MoviesController',
      controllerAs: 'moviesCtrl'
    })
    .state('movies.today', {
      url: '/today',
      templateUrl: 'app/views/posters.html',
      controller: 'MoviesController',
      controllerAs: 'moviesCtrl'
    })
    .state('movies.upcoming', {
      url: '/upcoming',
      templateUrl: 'app/views/posters.html',
      controller: 'MoviesController',
      controllerAs: 'moviesCtrl'
    })
    .state('movies.popular', {
      url: '/popular',
      templateUrl: 'app/views/posters.html',
      controller: 'MoviesController',
      controllerAs: 'moviesCtrl'
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
    .state('movie', {
      url: '/movie/:id',
      templateUrl: 'app/views/movie.html',
      controller: 'MovieController',
      controllerAs: 'movieCtrl'
    })
    .state('person', {
      url: '/person/:personId',
      templateUrl: 'app/views/person.html',
      controller: 'PersonController',
      controllerAs: 'personCtrl'
    })
    .state('credits_movie', {
      url: '/movie/:id/credits',
      templateUrl: 'app/views/credits.html',
      controller: 'CreditsController',
      controllerAs: 'creditsCtrl'
    })
    .state('credits_tv', {
      url: '/tv/:id/credits',
      templateUrl: 'app/views/credits.html',
      controller: 'CreditsController',
      controllerAs: 'creditsCtrl'
    })
    .state('gallery_movie', {
      url: '/movie/:id/gallery',
      templateUrl: 'app/views/gallery.html',
      controller: 'GalleryController',
      controllerAs: 'galleryCtrl'
    })
    .state('gallery_tv', {
      url: '/tv/:id/gallery',
      templateUrl: 'app/views/gallery.html',
      controller: 'GalleryController',
      controllerAs: 'galleryCtrl'
    })
    .state('videos_movie', {
      url: '/movie/:id/videos',
      templateUrl: 'app/views/videos.html',
      controller: 'VideosController',
      controllerAs: 'videosCtrl'
    })
    .state('videos_tv', {
      url: '/tv/:id/videos',
      templateUrl: 'app/views/videos.html',
      controller: 'VideosController',
      controllerAs: 'videosCtrl'
    })
    .state('tv', {
      url: '/tv/:id',
      templateUrl: 'app/views/tv.html',
      controller: 'TvController',
      controllerAs: 'tvCtrl'
    })
};