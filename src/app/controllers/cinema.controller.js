'use strict';
module.exports = function CinemaController(jsonFactory, photoService, dateService, $state) {
  var vm = this;

  vm.status = 'Loading';

  vm.days = dateService.getDaysList();
  vm.cinemaSelect = vm.days[0];  // init default value for select

  vm.getData = function(date) {
    vm.status = 'Loading';

    jsonFactory.fetch('cinema', $state.params.cinemaId, date).then(function(response) {
      vm.cinemaContent = response.data.cinemaDetail;
      vm.cinemaContent.seance.items = vm.cinemaContent.seance.items.map(function(element) {
        var newElement = element;
        newElement.posterURL = photoService.switchPosterSize(element.posterURL, 60);
        return newElement;
      });
      vm.status = 'Ready';
    });
  };

  vm.getData(vm.cinemaSelect);
};
