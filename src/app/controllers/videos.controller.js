'use strict';
module.exports = function VideosController(jsonFactory, $state, $sce) {
  var vm = this;

  vm.status = 'Loading';

  var fetchParams = {
    id:$state.params.filmId
  };

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

  jsonFactory.fetch('movie', fetchParams).then(function(filmResponse) {
    vm.filmContent = filmResponse.data;
    jsonFactory.fetch('movieVideos', fetchParams).then(function(videosResponse){
      vm.videosContent = videosResponse.data;
      if (vm.videosContent.results) {
        vm.videos = getVideos(vm.videosContent.results);
      }
      vm.status = 'Ready'
    });
  });

};