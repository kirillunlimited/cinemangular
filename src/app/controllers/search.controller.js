'use strict';
module.exports = function SearchController(jsonFactory, photoService, $state) {
  var vm = this;

  vm.searchString = $state.params.value;
  vm.status = 'Ready';

  vm.filmsLimit = 3;
  vm.peopleLimit = 3;

  vm.findFilm = function() {
    if (vm.searchString != null) {
      $state.transitionTo('search.results', {value: vm.searchString});
      vm.status = 'Loading';
      var fetchParams = {
        query: vm.searchString
      };
      jsonFactory.fetch('searchMovies',fetchParams).then(function(searchMoviesResponse) {
        vm.searchMoviesContent = searchMoviesResponse.data.results;
        jsonFactory.fetch('searchPeople', fetchParams).then(function(searchPeopleResponse) {
          vm.searchPeopleContent = searchPeopleResponse.data.results;
          vm.status = 'Ready';
        });
      });
    }
  };

  vm.getPoster = function(posterURL) {
    return photoService.getPosterPhoto(posterURL, 'small');
  };

  vm.moreFilms = function(limit) {
    vm.filmsLimit = limit;
  };

  vm.morePeople = function(limit) {
    vm.peopleLimit = limit;
  };

  vm.findFilm();

};