/**
 * Сервис для работы с фото
 */
'use strict';
module.exports = function photoService(PATH) {
   function switchPosterSize(imgPath, imgWidth) {
    if (imgPath) {
      var newImgPath = imgPath.replace('iphone_', 'iphone' + imgWidth + '_');
      return PATH.IMG + newImgPath;
    }
    else {
      return 'img/no_poster.png';
    }
  };

  function getPosterPhoto(imgPath, sizeValue) {
    var sizes = {
      small: 90,
      medium: 325,
      big: 500
    };

    if (imgPath) {
      return PATH.IMG.replace('{size}', sizes[sizeValue]) + imgPath;
    }
    else {
      return 'img/no_poster.png';
    }
  }

  function getBackdropPath(imgPath) {
    return PATH.IMG.replace('{size}', 'w1920') + imgPath;
  }

  function getPhotoArray(content) {
    var photoArray = [];
    for (var i in content) {
      var fullPhotoPath = getPosterPhoto(content[i].preview);
      photoArray.push({url: PATH.IMG + fullPhotoPath})
    }
    return photoArray;
  };

  function getCreditsPortrait(imgPath) {
    if (imgPath) {
      return PATH.IMG.replace('{size}', 'w90_and_h90_bestv2') + imgPath;
    }
    else {
      return 'img/no_portrait.jpg';
    }
  }

  function getGalleryImagePreviewPath(imgPath) {
    return PATH.IMG.replace('{size}', 'w300') + imgPath;
  }

  function getGalleryImageFullPath(imgPath) {
    return PATH.IMG.replace('{size}', 'w1280') + imgPath;
  }

  function getGalleryArray(data) {

    console.log(data);

    var galleryArray = [];

    data.backdrops.forEach(function(element) {
      galleryArray.push({
        thumbUr: getGalleryImagePreviewPath(element.file_path),
        url: getGalleryImageFullPath(element.file_path)
      });
    });
    return galleryArray;
  }

  return {
    switchPosterSize: switchPosterSize,
    getBackdropPath: getBackdropPath,
    getPosterPhoto: getPosterPhoto,
    getPhotoArray: getPhotoArray,
    getCreditsPortrait: getCreditsPortrait,
    getGalleryArray: getGalleryArray
  };

};