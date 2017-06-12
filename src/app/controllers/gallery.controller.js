'use strict';
module.exports = function GalleryController(jsonService, photoService, $state, $rootScope, $translate) {
  var vm = this;

  var loader = new jsonService.PageLoader(1);

  var fetchParams = {
    id: $state.params.id
  };
  var galleryFetchParams = {
    id: $state.params.id,
    getParams: {
      include_image_language: 'null'
    }
  };

  var subjectFetchMethods = {
    gallery_movie: 'movie',
    gallery_tv: 'tv'
  };
  var galleryFetchMethods = {
    gallery_movie: 'movieGallery',
    gallery_tv: 'tvGallery'
  };

  var parentStates = {
    gallery_movie: 'movie',
    gallery_tv: 'tv'
  };

  // move to service
  vm.getParentUrl = function() {
    return $state.href(parentStates[$state.current.name], {id: $state.params.id});
  };

  jsonService.fetch(subjectFetchMethods[$state.current.name], fetchParams).then(function(response) {
    vm.subject = response.data;

    $rootScope.pageTitle = vm.subject.title || vm.subject.name;
    $translate('GALLERY').then(function(translation) {
      $rootScope.pageTitle += ' – ' + translation;
    });

    jsonService.fetch(galleryFetchMethods[$state.current.name], galleryFetchParams).then(function(response){
      vm.galleryContent = response.data;
      vm.gallery = photoService.getMovieGallery(vm.galleryContent.backdrops);
      loader.progress();
    });
  });

};