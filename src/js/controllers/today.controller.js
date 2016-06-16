'use strict';
module.exports = function TodayController(jsonApi, dateService) {
  var vm = this;

  vm.status = "Loading";

  vm.pageTitle = "Сегодня в прокате";
  jsonApi.fetch("http://api.kinopoisk.cf/getTodayFilms?date=" + dateService.getToday()).then(function(response) {
    vm.films = jsonApi.parse(response, 'filmsData');
    vm.status = "Ready";
  });
  vm.switchPosterSize = function(imgPath, imgWidth) {
    return jsonApi.switchPosterSize(imgPath, imgWidth);
  }
}