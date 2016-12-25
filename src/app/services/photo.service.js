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

  // function getFullPhotoPath(imgPath) {
  //   return imgPath.replace('sm_','');
  // };

  function getFullPhotoPath(imgPath) {
    console.log(PATH);
    return PATH.IMG + imgPath;
  }

  function getPhotoArray(content) {
    var photoArray = [];
    for (var i in content) {
      var fullPhotoPath = getFullPhotoPath(content[i].preview);
      photoArray.push({url: PATH.IMG + fullPhotoPath})
    }
    return photoArray;
  };

  return {
    switchPosterSize: switchPosterSize,
    getFullPhotoPath: getFullPhotoPath,
    getPhotoArray: getPhotoArray
  };

};