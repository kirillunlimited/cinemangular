'use strict';
module.exports = function AfishaController(jsonApi, dateService, $state, $location) {
  var vm = this;

  vm.status = "Loading";

  switch($state.current.name) {
    case('afisha.today'):
      jsonApi.fetch("http://api.kinopoisk.cf/getTodayFilms?date=" + dateService.getToday()).then(function(response) {
        vm.films = jsonApi.parse(response, 'filmsData');
        vm.status = "Ready";
      });
      break;
    case('afisha.soon'):
      jsonApi.fetch("http://api.kinopoisk.cf/getSoonFilms").then(function(response) {
        vm.films = jsonApi.parse(response, 'previewFilms');
        vm.status = "Ready";
      });
      break;
  }

  vm.switchPosterSize = function(imgPath, imgWidth) {
    return jsonApi.switchPosterSize(imgPath, imgWidth);
  };

  vm.getClass = function(currentState) {
    return $state.current.name === currentState;
  }
};
