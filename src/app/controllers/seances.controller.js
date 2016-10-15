'use strict';
module.exports = function SeancesController(jsonApi, dateService, $state) {
  var vm = this;

  vm.days = dateService.getDaysList();
  vm.seancesSelect = vm.days[0];  // init default value for select

  vm.getData = function(date) {
    vm.status = "Loading";
    jsonApi.fetch("http://api.kinopoisk.cf/getSeance?filmID=" + $state.params.filmId + "&date=" + date).then(function(response) {
      vm.seancesContent = response.data;
      vm.status = "Ready";
    });
  };

  vm.getData(vm.seancesSelect);
};