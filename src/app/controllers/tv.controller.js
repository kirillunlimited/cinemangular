'use strict';
module.exports = function TvController(jsonFactory, photoService, dateService, $state, $sce) {
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
      'number_of_seasons',
      'number_of_episodes',
      'status'
    ];

    tvObject.first_air_date = jsonFactory.formatDate(tvObject.first_air_date);
    tvObject.last_air_date = jsonFactory.formatDate(tvObject.last_air_date);
    tvObject.runtime = jsonFactory.formatRuntime(tvObject.episode_run_time[0]);

    // make array (not object) to keep own order
    // [0] - key, [1] - value
    return paramKeys.map(function(element) {
      return [element,tvObject[element]];
    });
  };

  jsonFactory.fetch('tv', fetchParams).then(function(response) {
    vm.tv = response.data;
    vm.tvParams = getTvParams(jsonFactory.cloneObject(vm.tv));
    vm.tvStatus = 'Ready';
  });

  jsonFactory.fetch('tvCredits', fetchParams).then(function(response) {
    vm.credits = response.data;
  });

  var galleryFetchParams = {
    id:$state.params.id,
    getParams: {
      include_image_language: 'null'
    }
  };

  jsonFactory.fetch('tvGallery', galleryFetchParams).then(function(tvGalleryResponse){
    vm.tvGalleryContent = tvGalleryResponse.data;
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
      }).filter(function(element) {
        return element; // return not null elements
      });
  }

  jsonFactory.fetch('tvVideos', fetchParams).then(function(tvVideosResponse){
    vm.tvVideosContent = tvVideosResponse.data;
    if (vm.tvVideosContent.results) {
      vm.videos = getVideos(vm.tvVideosContent.results);
      vm.trailer = getTrailer(vm.tvVideosContent.results);
    }
  });

};