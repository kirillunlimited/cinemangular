'use strict';
module.exports = function SeancesController(jsonApi, dateService, $routeParams) {
  var vm = this;

  vm.status = "Loading";

  vm.days = dateService.getDaysList();
  vm.seancesSelect = vm.days[0];  // init default value for select

  jsonApi.fetch("http://api.kinopoisk.cf/getSeance?filmID=" + $routeParams.filmID + "&date=" + dateService.getToday()).then(function(response) {
    vm.status = "Ready";
    vm.seancesContent = response.data;
  });

  vm.getData = function(date) {
    vm.status = "Loading";
    jsonApi.fetch("http://api.kinopoisk.cf/getSeance?filmID=" + $routeParams.filmID + "&date=" + date).then(function(response) {
      vm.seancesContent = response.data;
      vm.status = "Ready";
    });
  };
};