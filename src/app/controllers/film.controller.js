'use strict';
module.exports = function FilmController(jsonFactory, photoService, dateService, $state) {
  var vm = this;

  vm.filmStatus = 'Loading';

  var fetchParams = {
    id:$state.params.filmId
  };

  jsonFactory.fetch('movie', fetchParams).then(function(filmResponse) {
    vm.filmContent = filmResponse.data;
    vm.filmContent.genres.content = jsonFactory.extractObjectArray(vm.filmContent.genres);
    vm.filmContent.production_countries.content = jsonFactory.extractObjectArray(vm.filmContent.production_countries);
    vm.filmContent.poster_path_full = photoService.getPosterPhoto(vm.filmContent.poster_path, 'medium');
    vm.filmStatus = 'Ready';
  });

  jsonFactory.fetch('movieCredits', fetchParams).then(function(movieCreditsResponse) {
    vm.creditsContent = movieCreditsResponse.data;
  });

};