'use strict';
module.exports = function AfishaController(jsonFactory, dateService, photoService, $state, $location) {
  var vm = this;

  vm.status = 'Loading';

  vm.getClass = function(currentState) {
    return $state.current.name === currentState;
  };

  var afishaMethods = {
    'afisha.today': 'nowPlayingMovies',
    'afisha.upcoming': 'upcomingMovies',
    'afisha.popular': 'popularMovies'
  };

  vm.getContent = function() {
    jsonFactory.fetch(afishaMethods[$state.current.name]).then(function(response) {
      vm.films = response.data.results;
      vm.status = 'Ready';
    });
  };

  vm.getContent();

};
