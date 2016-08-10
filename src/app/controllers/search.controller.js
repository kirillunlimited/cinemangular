'use strict';
module.exports = function SearchController(jsonApi, $state) {
  var vm = this;

  vm.searchString = $state.params.value;
  vm.status = "Ready";

  vm.filmsLimit = 3;
  vm.peopleLimit = 3;

  vm.findFilm = function() {
    if (vm.searchString != null) {
      $state.transitionTo('search', {value: vm.searchString});
      vm.status = "Loading";
      jsonApi.fetch("http://api.kinopoisk.cf/searchFilms?keyword=" + vm.searchString).then(function(filmsResponse) {
        vm.filmsContent = filmsResponse.data.searchFilms;
        jsonApi.fetch("http://api.kinopoisk.cf/searchPeople?keyword=" + vm.searchString).then(function(peopleResponse) {
          vm.peopleContent = peopleResponse.data.searchPeople;
          vm.status = "Ready";
        });
      });
    }
  };

  vm.findFilm();

  vm.getPoster = function(posterURL) {
    return jsonApi.switchPosterSize(posterURL, 90);
  };

  vm.moreFilms = function(limit) {
    vm.filmsLimit = limit;
  };

  vm.morePeople = function(limit) {
    vm.peopleLimit = limit;
  };

};