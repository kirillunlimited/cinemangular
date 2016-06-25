'use strict';
module.exports = function SearchController(jsonApi) {
  var vm = this;

  vm.searchFilter = "films";
  vm.status = "Ready";

  vm.findFilm = function() {
    vm.status = "Loading";
    if (vm.searchFilter == "films") {
      jsonApi.fetch("http://api.kinopoisk.cf/searchFilms?keyword=" + vm.searchString).then(function(filmsResponse) {
        vm.filmsContent = filmsResponse.data.searchFilms;
        vm.peopleContent = "";
        vm.status = "Ready";
      });
    }
    else {
      jsonApi.fetch("http://api.kinopoisk.cf/searchPeople?keyword=" + vm.searchString).then(function(peopleResponse) {
        vm.peopleContent = peopleResponse.data.searchPeople;
        vm.filmsContent = "";
        vm.status = "Ready";
      });
    }
  };

  vm.getPoster = function(posterURL) {
    return jsonApi.switchPosterSize(posterURL, 90);
  }

}