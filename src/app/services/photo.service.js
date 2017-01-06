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

  function getPhotoArray(content) {
    var photoArray = [];
    for (var i in content) {
      var fullPhotoPath = getPosterPhoto(content[i].preview);
      photoArray.push({url: PATH.IMG + fullPhotoPath})
    }
    return photoArray;
  };

  return {
    switchPosterSize: switchPosterSize,
    getPosterPhoto: getPosterPhoto,
    getPhotoArray: getPhotoArray
  };

};