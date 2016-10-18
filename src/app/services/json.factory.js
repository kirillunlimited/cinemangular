// сервис(фабрика) для получения данных из json
'use strict';
module.exports = function jsonApi($http) {
  function fetch(jsonPath) {
    return $http.get(jsonPath);
  }
  function parse(response, objKey) {
    // ответ содержит массив массивов фильмов
    if (Array.isArray(response.data[objKey][0])) {
      var filmsOutput = [];
      for (var filmsGroupId in response.data[objKey]) {
        for (var filmId in response.data[objKey][filmsGroupId]) {
          filmsOutput.push(response.data[objKey][filmsGroupId][filmId]);
        }
      }
      return filmsOutput;
    }
    // ответ содержит массив фильмов
    else {
      return response.data[objKey];
    }
  }
  function switchPosterSize(imgPath, imgWidth) {
    if (imgPath) {
      var newImgPath = imgPath.replace('iphone_', 'iphone' + imgWidth + '_');
      return 'https://st.kp.yandex.net/images/' + newImgPath;
    }
    else {
      return "img/no_poster.png";
    }
  }

  function getFullPhotoPath(imgPath) {
    return imgPath.replace('sm_','');
  }

  function getPhotoArray(content) {
    var photoArray = [];
    for (var i in content) {
      var fullPhotoPath = getFullPhotoPath(content[i].preview);
      photoArray.push({url: 'https://st.kp.yandex.net/images/' + fullPhotoPath})
    }
    return photoArray;
  }


  return {
    fetch: fetch,
    parse: parse,
    switchPosterSize: switchPosterSize,
    getPhotoArray: getPhotoArray
  };
};
