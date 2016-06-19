'use strict';
module.exports = function SearchController(jsonApi) {
  var vm = this;

  vm.status = "Ready";

  vm.findFilm = function() {
    vm.status = "Loading";
    console.log(vm.searchString);
    jsonApi.fetch("http://api.kinopoisk.cf/searchFilms?keyword=" + vm.searchString).then(function(response) {
      vm.filmsContent = response.data.searchFilms;
      console.log(vm.filmsContent);
      vm.status = "Ready";
    });
  };

  vm.getPoster = function(posterURL) {
    return jsonApi.switchPosterSize(posterURL, 90);
  }

}