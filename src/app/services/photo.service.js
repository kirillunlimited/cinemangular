'use strict';
module.exports = function photoService(PATH) {

  // common methods
  function getPortrait(imgPath, imgSize) {
    if (imgPath) {
      return PATH.IMG.replace('{size}', imgSize) + imgPath;
    }
    else {
      return 'img/no_portrait.jpg';
    }
  }
  function getPoster(imgPath, imgSize) {
    if (imgPath) {
      return PATH.IMG.replace('{size}', imgSize) + imgPath;
    }
    else {
      return 'img/no_poster.jpg';
    }
  }

  // portrait methods
  function getPersonPortrait(imgPath) {
    return getPortrait(imgPath, 'w300');
  }
  function getCreditsPortrait(imgPath) {
    return getPortrait(imgPath, 'w90');
  }
  function getCastPortrait(imgPath) {
    return getPortrait(imgPath, 'w180_and_h180_bestv2');
  }
  function getResultPortrait(imgPath, size) {
    return getPortrait(imgPath, 'w45');
  }

  // poster methods
  function getMoviePoster(imgPath) {
    return getPoster(imgPath, 'w300');
  }
  function getAfishaPoster(imgPath) {
    return getPoster(imgPath, 'w300');
  }
  function getPersonMoviePoster(imgPath) {
    return getPoster(imgPath, 'w45');
  }
  function getResultPoster(imgPath) {
    return getPoster(imgPath, 'w45');
  }

  // backdrop methods
  function getAfishaBackdrop(imgPath) {
    return getPoster(imgPath, 'w1000');
  }
  function getBackdropPath(imgPath) {
    return getPoster(imgPath, 'w1920');
  }

  // gallery methods
  function getGalleryImagePreviewPath(imgPath) {
    return PATH.IMG.replace('{size}', 'w185') + imgPath;
  }
  function getGalleryImageFullPath(imgPath, type) {
    if (type == 'person') {
      return PATH.IMG.replace('{size}', 'w500') + imgPath;
    }
    else if (type == 'movie') {
      return PATH.IMG.replace('{size}', 'w1280') + imgPath;
    }
  }
  function getGallery(data, type) {
    var galleryArray = [];
    data.forEach(function(element) {
      galleryArray.push({
        thumbUrl: getGalleryImagePreviewPath(element.file_path),
        url: getGalleryImageFullPath(element.file_path, type)
      });
    });
    return galleryArray;
  }

  function getMovieGallery(data) {
    return getGallery(data, 'movie')
  }
  function getPersonGallery(data) {
    return getGallery(data, 'person')
  }

  return {
    getPersonPortrait:    getPersonPortrait,
    getCreditsPortrait:   getCreditsPortrait,
    getCastPortrait:      getCastPortrait,
    getResultPortrait:    getResultPortrait,

    getMoviePoster:       getMoviePoster,
    getAfishaPoster:      getAfishaPoster,
    getPersonMoviePoster: getPersonMoviePoster,
    getResultPoster:      getResultPoster,

    getAfishaBackdrop:    getAfishaBackdrop,
    getBackdropPath:      getBackdropPath,

    getMovieGallery:      getMovieGallery,
    getPersonGallery:     getPersonGallery
  };

};