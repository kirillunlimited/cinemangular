'use strict';
module.exports = function TvController(jsonService, photoService, $state, $sce, $rootScope) {
  var vm = this;

  vm.tvStatus = 'Loading';

  var fetchParams = {
    id:$state.params.id
  };

  var getTvParams = function(tvObject) {
    var paramKeys = [
      'runtime',
      'first_air_date',
      'last_air_date',
      'status',
      'number_of_seasons',
      'number_of_episodes'
    ];

    tvObject.first_air_date = jsonService.formatDate(tvObject.first_air_date);
    tvObject.last_air_date  = jsonService.formatDate(tvObject.last_air_date);
    tvObject.runtime        = jsonService.formatRuntime(tvObject.episode_run_time[0]);
    tvObject.status         = jsonService.getProductionStatus(tvObject.status);

    // make array (not object) to keep own order
    // [0] - key, [1] - value
    return paramKeys.map(function(element) {
      return [element,tvObject[element]];
    });
  };

  jsonService.fetch('tv', fetchParams).then(function(response) {
    vm.tv = response.data;
    vm.tvParams = getTvParams(jsonService.cloneObject(vm.tv));
    vm.tvStatus = 'Ready';

    $rootScope.pageTitle = vm.tv.name;
  });

  jsonService.fetch('tvCredits', fetchParams).then(function(response) {
    vm.credits = response.data;
  });

  var galleryFetchParams = {
    id:$state.params.id,
    getParams: {
      include_image_language: 'null'
    }
  };

  jsonService.fetch('tvGallery', galleryFetchParams).then(function(response){
    vm.tvGalleryContent = response.data;
    vm.gallery = photoService.getMovieGallery(vm.tvGalleryContent.backdrops.slice(0,6));
  });

  function getTrailer(videoObjects) {
    for (var i in videoObjects) {
      if (videoObjects[i].site == 'YouTube' && videoObjects[i].type == 'Trailer') {
        return $sce.trustAsResourceUrl('//www.youtube.com/embed/' + videoObjects[i].key);
      }
    }
  }

  // TODO: move to service
  function getVideos(videoObjects) {
    return videoObjects
      .map(function(element) {
        if (element.site == 'YouTube' && element.type == 'Trailer') {
          return $sce.trustAsResourceUrl('//www.youtube.com/embed/' + element.key);
        }
        else {
          return null;
        }
      })
      .filter(function(element) {
        return element; // return not null elements
      });
  }

  jsonService.fetch('tvVideos', fetchParams).then(function(response){
    vm.videosContent = response.data;
    if (vm.videosContent.results) {
      vm.videos = getVideos(vm.videosContent.results);
      vm.trailer = getTrailer(vm.videosContent.results);
    }
  });

};