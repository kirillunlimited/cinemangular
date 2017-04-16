'use strict';
module.exports = function jsonFactory($http, dateService, PATH, KEY) {

   function fetch(method, params, lang){
    var action = (params) ? PATH.METHODS[method].replace('{id}',params.id) : PATH.METHODS[method];

    var languages = {
      en: 'en-EN',
      ru: 'ru-RU'
    };

    var language = (lang) ? languages[lang] : languages['en'];

    var requestUrl = PATH.API + action + '?api_key=' + KEY.VALUE + '&language=' + language;

    if (params) {
      requestUrl += '&query=' + params.query;
      (params.getParams) ? requestUrl += '&' + serialize(params.getParams) : '';
    }

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

  function formatDate(inputDate) {
    if (!inputDate) {
      return false;
    }

    var dateObject = new Date(inputDate);

    var monthNames = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря"
    ];

    var outputDate = dateObject.getUTCDate() + ' ' + monthNames[dateObject.getMonth()] + ' ' + dateObject.getUTCFullYear();
    return outputDate;
  }

  function formatRuntime(inputRuntime) {
    if (!inputRuntime) {
      return false;
    }

    var hours = Math.floor( inputRuntime / 60);
    var minutes = inputRuntime % 60;

    var outputRuntime = hours + ' ч. ' + minutes + ' мин.';

    return outputRuntime;
  }

  function formatMoney(inputAmount) {
    if (!inputAmount) {
      return false;
    }

    var outputAmount = '$' + inputAmount.toLocaleString();
    return outputAmount;
  }

  function getYear(inputDate) {
    if (!inputDate) {
      return false;
    }

    var dateObject = new Date(inputDate);

    var outputYear = dateObject.getUTCFullYear();
    return outputYear;

  }

  return {
    fetch: fetch,
    parse: parse,
    extractObjectArray: extractObjectArray,
    formatDate: formatDate,
    formatRuntime: formatRuntime,
    formatMoney: formatMoney,
    getYear: getYear
  };
};
