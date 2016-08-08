'use strict';
module.exports = function FilmController(jsonApi, dateService, $state) {
  var vm = this;

  vm.status = "Loading";

  jsonApi.fetch("http://api.kinopoisk.cf/getFilm?filmID=" + $state.params.filmId).then(function(filmResponse) {
    vm.filmContent = filmResponse.data;
    vm.posterPath = jsonApi.switchPosterSize(vm.filmContent.posterURL, 360);
    jsonApi.fetch("http://api.kinopoisk.cf/getSeance?filmID=" + $state.params.filmId + "&date=" + dateService.getToday()).then(function(seancesResponse) {
      vm.isInCinema = false;
      if (seancesResponse.data.items) {
        vm.isInCinema = true;
      }
      vm.status = "Ready";
    });
  });
};
