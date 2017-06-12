'use strict';
module.exports = function MoviesController(jsonService, $state, $location) {
  var vm = this;

  var loader = new jsonService.PageLoader(1);

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
      loader.progress();
    });
  };

  vm.getContent();
};
