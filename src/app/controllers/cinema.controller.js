'use strict';
module.exports = function CinemaController(jsonApi, dateService, $state) {
  var vm = this;

  vm.status = 'Loading';

  vm.days = dateService.getDaysList();
  vm.cinemaSelect = vm.days[0];  // init default value for select

  jsonApi.fetch("http://api.kinopoisk.cf/getCinemaDetail?cinemaID=" + $state.params.cinemaId + "&date=" + dateService.getToday()).then(function(response) {
    vm.cinemaContent = response.data.cinemaDetail;
    vm.cinemaContent.seance.items = vm.cinemaContent.seance.items.map(function(element) {
      var newElement = element;
      newElement.posterURL = jsonApi.switchPosterSize(element.posterURL, 60);
      return newElement;
    });
    vm.status = 'Ready';
  });

  vm.getData = function(date) {
    vm.status = 'Loading';
    jsonApi.fetch("http://api.kinopoisk.cf/getCinemaDetail?cinemaID=" + $state.params.cinemaId + "&date=" + date).then(function(response) {
      vm.cinemaContent = response.data.cinemaDetail;
      vm.cinemaContent.seance.items = vm.cinemaContent.seance.items.map(function(element) {
        var newElement = element;
        newElement.posterURL = jsonApi.switchPosterSize(element.posterURL, 60);
        return newElement;
      });
      vm.status = 'Ready';
    });
  };

};
