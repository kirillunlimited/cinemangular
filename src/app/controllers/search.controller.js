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
      jsonFactory.fetch('searchFilms', vm.searchString).then(function(filmsResponse) {
        vm.filmsContent = filmsResponse.data.searchFilms;
        jsonFactory.fetch('searchPeople', vm.searchString).then(function(peopleResponse) {
          vm.peopleContent = peopleResponse.data.searchPeople;
          vm.status = 'Ready';
        });
      });
    }
  };

  vm.getPoster = function(posterURL) {
    return photoService.switchPosterSize(posterURL, 90);
  };

  vm.moreFilms = function(limit) {
    vm.filmsLimit = limit;
  };

  vm.morePeople = function(limit) {
    vm.peopleLimit = limit;
  };

  vm.findFilm();

};