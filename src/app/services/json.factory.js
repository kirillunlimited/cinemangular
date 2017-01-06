/**
 * Фабрика для получения и обработки данных из API
 */
'use strict';
module.exports = function jsonFactory($http, dateService, PATH, KEY) {

   function fetch(method, params){
    var action = (params) ? PATH.METHODS[method].replace('{id}',params.id) : PATH.METHODS[method];
    var requestUrl = PATH.API + action + '?api_key=' + KEY.VALUE + '&language=ru-RU';
    (params) ? requestUrl += '&query=' + params.query : '';
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
