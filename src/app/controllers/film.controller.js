'use strict';
module.exports = function FilmController(jsonApi, dateService, $routeParams) {
  var vm = this;

  vm.status = "Loading";

  jsonApi.fetch("http://api.kinopoisk.cf/getFilm?filmID=" + $routeParams.filmID).then(function(filmResponse) {
    vm.filmContent = filmResponse.data;
    console.log(vm.filmContent);
    vm.posterPath = jsonApi.switchPosterSize(vm.filmContent.posterURL, 360);
    jsonApi.fetch("http://api.kinopoisk.cf/getSeance?filmID=" + $routeParams.filmID + "&date=" + dateService.getToday()).then(function(seancesResponse) {
      vm.isInCinema = false;
      if (seancesResponse.data.items) {
        vm.isInCinema = true;
      }
      vm.status = "Ready";
    });
  });
};