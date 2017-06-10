'use strict';
module.exports = function photoService(PATH) {

  function getImage(imgPath, imgSize) {
    if (imgPath) {
      return PATH.IMG.replace('{size}', imgSize) + imgPath;
    }
  }

  function getBigCover(imgPath) {
    return getImage(imgPath, 'w300');
  }
  function getMediumCover(imgPath) {
    return getImage(imgPath, 'w90');
  }
  function getSmallCover(imgPath) {
    return getImage(imgPath, 'w45');
  }
  function getSquareCover(imgPath) {
    return getImage(imgPath, 'w180_and_h180_bestv2');
  }
  function getBackdrop(imgPath) {
    return getImage(imgPath, 'w1920');
  }

  function getGalleryImagePreviewPath(imgPath) {
    return PATH.IMG.replace('{size}', 'w300') + imgPath;
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
    getPersonCover:   getBigCover,
    getCreditsCover:  getMediumCover,
    getCastCover:     getSquareCover,
    getResultCover:   getSmallCover,
    getMovieCover:    getBigCover,

    getBackdrop:      getBackdrop,

    getMovieGallery:  getMovieGallery,
    getPersonGallery: getPersonGallery
  };

};