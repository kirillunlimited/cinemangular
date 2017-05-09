'use strict';
module.exports = function GalleryController(jsonFactory, photoService, $state) {
  var vm = this;

  vm.status = 'Loading';

  var fetchParams = {
    id:$state.params.filmId
  };

  var galleryFetchParams = {
    id:$state.params.filmId,
    getParams: {
      include_image_language: 'null'
    }
  };

  jsonFactory.fetch('movie', fetchParams).then(function(filmResponse) {
    vm.filmContent = filmResponse.data;
    jsonFactory.fetch('movieGallery', galleryFetchParams).then(function(movieGalleryResponse){
      vm.movieGalleryContent = movieGalleryResponse.data;
      vm.gallery = photoService.getMovieGallery(vm.movieGalleryContent.backdrops);
      vm.status = 'Ready';
    });
  });

};