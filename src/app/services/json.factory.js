/**
 * Фабрика для получения и обработки данных из API
 */
'use strict';
module.exports = function jsonFactory($http, dateService, PATH, KEY) {

  // обращение к API

  // function fetch(method, paramId, paramDate) {
  //   var objectId = (paramId) ? paramId : '';
  //   var date = (paramDate) ? '&date=' + paramDate : '';
  //   var requestUrl = PATH.API + PATH.METHODS[method] + objectId + date;

  //   return $http.get(requestUrl);
  // }

  function fetch(method, id){
    var action = PATH.METHODS[method].replace('{id}',id);
    var requestUrl = PATH.API + action + '?api_key=' + KEY.VALUE + '&language=ru-RU';
    return $http.get(requestUrl);
  }

  function serialize(obj) {
    var str = [];
    for(var p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
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

  // массив объектов -> перечисление названий объектов
  function extractObjectArray(objetArray) {
    var names = objetArray.map(function(object) {
      return object.name;
    });
    return names.join(', ');
  }

  return {
    fetch: fetch,
    parse: parse,
    extractObjectArray: extractObjectArray
  };
};
