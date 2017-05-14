'use strict';
module.exports = function TvController(jsonFactory, photoService, dateService, $state, $sce) {
  var vm = this;

  vm.tvStatus = 'Loading';

  var fetchParams = {
    id:$state.params.id
  };

  jsonFactory.fetch('tv', fetchParams).then(function(tvResponse) {
    vm.tvContent = tvResponse.data;
    vm.tvContent.first_air_date = jsonFactory.formatDate(vm.tvContent.first_air_date);
    vm.tvContent.last_air_date = jsonFactory.formatDate(vm.tvContent.last_air_date);
    vm.tvContent.runtime = jsonFactory.formatRuntime(vm.tvContent.episode_run_time[0]);

    vm.filmStatus = 'Ready';
  });

  jsonFactory.fetch('tvCredits', fetchParams).then(function(movieCreditsResponse) {
    vm.creditsContent = movieCreditsResponse.data;
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