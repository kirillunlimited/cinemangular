'use strict';
module.exports = function AfishaController(jsonApi, dateService, $routeParams, $location) {
  var vm = this;

  vm.status = "Loading";

  console.log($routeParams.period);

  switch($routeParams.period) {
    case('today'):
      jsonApi.fetch("http://api.kinopoisk.cf/getTodayFilms?date=" + dateService.getToday()).then(function(response) {
        vm.films = jsonApi.parse(response, 'filmsData');
        vm.pageTitle = "Афиша на сегодня";
        vm.status = "Ready";
      });
      break;
    case('soon'):
      jsonApi.fetch("http://api.kinopoisk.cf/getSoonFilms").then(function(response) {
        vm.films = jsonApi.parse(response, 'previewFilms');
        vm.pageTitle = "Скоро в кинотеатрах";
        vm.status = "Ready";
      });
      break;
  }

  vm.switchPosterSize = function(imgPath, imgWidth) {
    return jsonApi.switchPosterSize(imgPath, imgWidth);
  };

  vm.getClass = function(currentLocation) {
    if (currentLocation == '/') {
      return $location.path() === currentLocation;
    }
    else {
      return $routeParams.period === currentLocation;
    }
  }
};