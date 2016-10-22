'use strict';
module.exports = function FilmController(jsonFactory, photoService, dateService, $state) {
  var vm = this;

  vm.filmStatus = 'Loading';

  jsonFactory.fetch('film',$state.params.filmId).then(function(filmResponse) {
    vm.filmContent = filmResponse.data;
    vm.posterPath = photoService.switchPosterSize(vm.filmContent.posterURL, 360);
    vm.photos = photoService.getPhotoArray(vm.filmContent.gallery);

    vm.filmStatus = 'Ready';

    if (vm.filmContent.hasSeance) {
      vm.days = dateService.getDaysList();
      vm.seancesSelect = vm.days[0];
      vm.getData(vm.seancesSelect);
      vm.hasSeance = true;
    }
    else {
      vm.hasSeance = false;
    }
  });

  vm.getData = function(date) {
    vm.seancesStatus = 'Loading';
    jsonFactory.fetch('seances', $state.params.filmId, date).then(function(seancesResponse) {
      vm.seancesContent = seancesResponse.data;
      vm.seancesStatus = 'Ready';
    });
  };
};