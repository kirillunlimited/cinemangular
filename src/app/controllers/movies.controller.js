'use strict';
module.exports = function MoviesController(jsonService, dateService, photoService, $state, $location) {
  var vm = this;

  vm.status = 'Loading';

  vm.getClass = function(currentState) {
    return $state.current.name === currentState;
  };

  var moviesMethods = {
    'movies.today': 'nowPlayingMovies',
    'movies.upcoming': 'upcomingMovies',
    'movies.popular': 'popularMovies'
  };

  vm.getContent = function() {
    jsonService.fetch(moviesMethods[$state.current.name]).then(function(response) {
      vm.movies = response.data.results;
      vm.status = 'Ready';
    });
  };

  vm.getContent();

};
