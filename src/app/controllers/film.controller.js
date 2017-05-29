'use strict';
module.exports = function FilmController(jsonFactory, photoService, dateService, $state, $sce) {
  var vm = this;

  vm.filmStatus = 'Loading';

  var fetchParams = {
    id:$state.params.id
  };

  var getFilmParams = function(filmObject) {
    var paramKeys = [
      'production_countries',
      'runtime',
      'release_date',
      'status',
      'budget',
      'revenue'
    ];

    filmObject.release_date = jsonFactory.formatDate(filmObject.release_date);
    filmObject.runtime      = jsonFactory.formatRuntime(filmObject.runtime);
    filmObject.budget       = jsonFactory.formatMoney(filmObject.budget);
    filmObject.revenue      = jsonFactory.formatMoney(filmObject.revenue);

    // make array (not object) to keep own order
    // [0] - key, [1] - value
    return paramKeys.map(function(element) {
      return [element,filmObject[element]];
    });

  };

  jsonFactory.fetch('movie', fetchParams).then(function(response) {
    vm.film = response.data;
    vm.filmParams = getFilmParams(jsonFactory.cloneObject(vm.film));
    vm.filmStatus = 'Ready';
  });

  var getCredits = function(creditsObject) {
    var crewKeys = [
      'Director',
      'Producer',
      'Screenplay',
      'Story'
    ];

    // // make array (not object) to keep own order
    // // [0] - key, [1] - value
    return crewKeys.map(function(element) {
      return getCreditsByJob(element, creditsObject);
    });

  };

  var getCreditsByJob = function(job, creditsObject) {
    var crewObject = [];
    crewObject[0] = job;
    crewObject[1] = [];

    creditsObject.crew.forEach(function(person){
      if (person.job == job) {
        crewObject[1].push({
          id: person.id,
          name: person.name
        })
      }
    });
    return crewObject;
  };

  jsonFactory.fetch('movieCredits', fetchParams).then(function(response) {
    vm.credits = response.data;
    vm.crew = getCredits(jsonFactory.cloneObject(vm.credits));
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
  };

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
  };

  jsonFactory.fetch('movieVideos', fetchParams).then(function(movieVideosResponse){
    vm.movieVideosContent = movieVideosResponse.data;
    if (vm.movieVideosContent.results) {
      vm.videos = getVideos(vm.movieVideosContent.results);
      vm.trailer = getTrailer(vm.movieVideosContent.results);
    }
  });

};