'use strict';
module.exports = function FilmController(jsonFactory, photoService, dateService, $state) {
  var vm = this;

  vm.filmStatus = 'Loading';

  jsonFactory.fetch('movie',$state.params.filmId).then(function(filmResponse) {
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

  jsonFactory.fetch('movieCredits',$state.params.filmId).then(function(movieCreditsResponse) {
    vm.creditsContent = movieCreditsResponse.data;
    console.log(movieCreditsResponse.data);
  });

};