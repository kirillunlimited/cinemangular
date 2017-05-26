'use strict';
module.exports = function VideosController(jsonFactory, $state, $sce) {
  var vm = this;

  vm.status = 'Loading';

  var fetchParams = {
    id: $state.params.id
  };

  var subjectFetchMethods = {
    videos_movie: 'movie',
    videos_tv: 'tv'
  };

  var videosFetchMethods = {
    videos_movie: 'movieVideos',
    videos_tv: 'tvVideos'
  };

  var parentStates = {
    videos_movie: 'film',
    videos_tv: 'tv'
  };

  // move to service
  vm.getParentUrl = function() {
    return $state.href(parentStates[$state.current.name], {id: $state.params.id});
  }

  // TODO: add video categories (now there are only trailers)
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

  jsonFactory.fetch(subjectFetchMethods[$state.current.name], fetchParams).then(function(response) {
    // film -> subject
    vm.film = response.data;
    jsonFactory.fetch(videosFetchMethods[$state.current.name], fetchParams).then(function(response){
      vm.videosContent = response.data;
      if (vm.videosContent.results) {
        vm.videos = getVideos(vm.videosContent.results);
      }
      vm.status = 'Ready'
    });
  });

};