'use strict';
module.exports = function FilmController(jsonApi, dateService, $state) {
  var vm = this;

  vm.filmStatus = "Loading";

  vm.days = dateService.getDaysList();
  vm.seancesSelect = vm.days[0];  // init default value for select

  jsonApi.fetch("http://api.kinopoisk.cf/getFilm?filmID=" + $state.params.filmId).then(function(filmResponse) {
    vm.filmContent = filmResponse.data;
    vm.posterPath = jsonApi.switchPosterSize(vm.filmContent.posterURL, 360);
    vm.photos = jsonApi.getPhotoArray(vm.filmContent.gallery);

    vm.filmStatus = "Ready";

    vm.getData(vm.seancesSelect);
  });

  vm.getData = function(date) {
    vm.seancesStatus = "Loading";
    jsonApi.fetch("http://api.kinopoisk.cf/getSeance?filmID=" + $state.params.filmId + "&date=" + date).then(function(seancesResponse) {
      vm.seancesContent = seancesResponse.data;
      vm.seancesStatus = "Ready";
    });
  };
};