'use strict';
module.exports = function FilmController(jsonFactory, photoService, dateService, $state) {
  var vm = this;

  vm.filmStatus = 'Loading';

  // jsonFactory.fetch('film',$state.params.filmId).then(function(filmResponse) {
  //   vm.filmContent = filmResponse.data;
  //   vm.posterPath = photoService.switchPosterSize(vm.filmContent.posterURL, 360);
  //   vm.photos = photoService.getPhotoArray(vm.filmContent.gallery);
  //   vm.creators = vm.parseCreators(filmResponse.data.creators);
  //   vm.filmStatus = 'Ready';

  //   if (vm.filmContent.hasSeance) {
  //     vm.days = dateService.getDaysList();
  //     vm.seancesSelect = vm.days[0];
  //     vm.getData(vm.seancesSelect);
  //     vm.hasSeance = true;
  //   }
  //   else {
  //     vm.hasSeance = false;
  //   }
  // });

  jsonFactory.fetch('film',$state.params.filmId).then(function(filmResponse) {
    vm.filmContent = filmResponse.data;
    vm.filmContent.genres.content = jsonFactory.extractObjectArray(vm.filmContent.genres);
    vm.filmContent.production_countries.content = jsonFactory.extractObjectArray(vm.filmContent.production_countries);
    vm.filmContent.poster_path_full = photoService.getFullPhotoPath(vm.filmContent.poster_path);
    // vm.posterPath = photoService.switchPosterSize(vm.filmContent.posterURL, 360);
    // vm.photos = photoService.getPhotoArray(vm.filmContent.gallery);
    // vm.creators = vm.parseCreators(filmResponse.data.creators);
    console.log(filmResponse.data);
    vm.filmStatus = 'Ready';

  });

  vm.getData = function(date) {
    vm.seancesStatus = 'Loading';
    jsonFactory.fetch('seances', $state.params.filmId, date).then(function(seancesResponse) {
      vm.seancesContent = seancesResponse.data;
      vm.seancesStatus = 'Ready';
    });
  };

  vm.parseCreators = function(creatorsArray) {
    var creators = {};
    creatorsArray.forEach(function(creatorsGroup) {
      var creatorsType = creatorsGroup[0].professionText;
      creators[creatorsType] = [];
      creatorsGroup.forEach(function(creator) {
        var newCreator = {};
        newCreator.id = creator.id;
        // использовать имя на английском, если отсутствует на русском
        newCreator.name = (creator.nameRU ? creator.nameRU : creator.nameEN);
        creators[creatorsType].push(newCreator);
      })
    });
    return creators;
  }

};