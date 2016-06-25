'use strict';
module.exports = function FilmController(jsonApi, $routeParams) {
  var vm = this;

  vm.status = "Loading";

  jsonApi.fetch("http://api.kinopoisk.cf/getFilm?filmID=" + $routeParams.filmID).then(function(response) {
    vm.filmContent = response.data;
    console.log(vm.filmContent);
    vm.posterPath = jsonApi.switchPosterSize(vm.filmContent.posterURL, 360);
    vm.status = "Ready";
  });
};