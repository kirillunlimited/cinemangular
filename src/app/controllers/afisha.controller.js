'use strict';
module.exports = function AfishaController(jsonFactory, dateService, photoService, $state, $location) {
  var vm = this;

  vm.status = 'Loading';

  vm.switchPosterSize = function(imgPath, imgWidth) {
    return photoService.switchPosterSize(imgPath, imgWidth);
  };

  vm.getClass = function(currentState) {
    return $state.current.name === currentState;
  };

  vm.getContent = function() {
    switch($state.current.name) {
      case('afisha.today'):
        jsonFactory.fetch('nowPlaying').then(function(response) {
          vm.films = response.data.results;
          vm.status = 'Ready';
        });
        break;
      case('afisha.soon'):
        jsonFactory.fetch('soonFilms').then(function(response) {
          vm.films = jsonFactory.parse(response, 'previewFilms');
          vm.status = 'Ready';
        });
        break;
    }
  };

  vm.getContent();

};
