'use strict';
module.exports = function CinemaController(jsonApi, dateService, $routeParams) {
  var vm = this;

  vm.status = 'Loading';

  vm.days = dateService.getDaysList();
  vm.cinemaSelect = vm.days[0];  // init default value for select

  jsonApi.fetch("http://api.kinopoisk.cf/getCinemaDetail?cinemaID=" + $routeParams.cinemaID + "&date=" + dateService.getToday()).then(function(response) {
    vm.cinemaContent = response.data.cinemaDetail;
    vm.status = 'Ready';
  });

  vm.getData = function(date) {
    vm.status = 'Loading';
    jsonApi.fetch("http://api.kinopoisk.cf/getCinemaDetail?cinemaID=" + $routeParams.cinemaID + "&date=" + date).then(function(response) {
      vm.cinemaContent = response.data.cinemaDetail;
      vm.status = 'Ready';
    });
  }
}