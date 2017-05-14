'use strict';
module.exports = function FilmController(jsonFactory, photoService, dateService, $state, $sce) {
  var vm = this;

  vm.filmStatus = 'Loading';

  var fetchParams = {
    id:$state.params.id
  };

  jsonFactory.fetch('movie', fetchParams).then(function(filmResponse) {
    vm.filmContent = filmResponse.data;
    // vm.filmContent.genres.content = jsonFactory.extractObjectArray(vm.filmContent.genres);
    // vm.filmContent.production_countries.content = jsonFactory.extractObjectArray(vm.filmContent.production_countries);
    vm.filmContent.release_date = jsonFactory.formatDate(vm.filmContent.release_date);
    vm.filmContent.runtime = jsonFactory.formatRuntime(vm.filmContent.runtime);
    vm.filmContent.budget = jsonFactory.formatMoney(vm.filmContent.budget);
    vm.filmContent.revenue = jsonFactory.formatMoney(vm.filmContent.revenue);

    console.log(vm.filmContent);

    vm.filmStatus = 'Ready';
  });

  var getCreditsByJob = function(job, jobProp, creditsContent) {
    creditsContent[jobProp] = [];
    creditsContent.crew.forEach(function(person){
      if (person.job == job) {
        creditsContent[jobProp].push({
          id: person.id,
          name: person.name
        })
      }
    });
    return creditsContent;
  }

  jsonFactory.fetch('movieCredits', fetchParams).then(function(movieCreditsResponse) {
    vm.creditsContent = movieCreditsResponse.data;

    console.log(vm.creditsContent);

    vm.creditsContent = getCreditsByJob('Director', 'directors', vm.creditsContent);
    vm.creditsContent = getCreditsByJob('Producer', 'producers', vm.creditsContent);
    vm.creditsContent = getCreditsByJob('Screenplay', 'screenplay', vm.creditsContent);
    vm.creditsContent = getCreditsByJob('Story', 'story', vm.creditsContent);

  });

  var galleryFetchParams = {
    id:$state.params.id,
    getParams: {
      include_image_language: 'null'
    }
  };

  jsonFactory.fetch('movieGallery', galleryFetchParams).then(function(movieGalleryResponse){
    vm.movieGalleryContent = movieGalleryResponse.data;
    vm.gallery = photoService.getMovieGallery(vm.movieGalleryContent.backdrops.slice(0,6));
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

  jsonFactory.fetch('movieVideos', fetchParams).then(function(movieVideosResponse){
    vm.movieVideosContent = movieVideosResponse.data;
    if (vm.movieVideosContent.results) {
      vm.videos = getVideos(vm.movieVideosContent.results);
      vm.trailer = getTrailer(vm.movieVideosContent.results);
    }
  });

};