'use strict';
module.exports = function jsonService($http, PATH, KEY, $translate, $rootScope) {

   function fetch(method, params, lang){
    var action = (params) ? PATH.METHODS[method].replace('{id}',params.id) : PATH.METHODS[method];

    var languages = {
      en: 'en-EN',
      ru: 'ru-RU'
    };

    var language = lang || languages[$translate.use()];

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
      var moviesOutput = [];
      for (var moviesGroupId in response.data[objKey]) {
        for (var movieId in response.data[objKey][moviesGroupId]) {
          moviesOutput.push(response.data[objKey][moviesGroupId][movieId]);
        }
      }
      return moviesOutput;
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

    var monthTranslations = {
      ru: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Мая",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек"
      ],
      en: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sen",
        "Oct",
        "Nov",
        "Dec"
      ]
    };

    var outputDate = dateObject.getUTCDate() + ' ' + monthTranslations[$translate.use()][dateObject.getMonth()] + ', ' + dateObject.getUTCFullYear();
    return outputDate;
  }

  function formatRuntime(inputRuntime) {
    if (!inputRuntime) {
      return false;
    }

    var hours = Math.floor(inputRuntime / 60);
    hours = (hours.toString().length == 1) ? '0'+hours : hours;

    var minutes = inputRuntime % 60;
    minutes = (minutes.toString().length == 1) ? '0'+minutes : minutes;

    var minuteTranslations = {
      ru: 'мин',
      en: 'min'
    };

    var outputRuntime = inputRuntime + ' ' + minuteTranslations[$translate.use()] + '. / ' + hours + ':' + minutes;

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

  function cloneObject(object) {
    return JSON.parse(JSON.stringify(object));
  }

  function getProductionStatus(inputStatus) {
    if (!inputStatus) {
      return false;
    }
    var statusTranslations = {
      ru: {
        "Ended": "Закончен",
        "Planned": "Запланирован",
        "Post Production": "Постпродакшн",
        "Released": "Выпущен",
        "Returning Series": "Продолжается",
      },
      en: {
        "Ended": "Ended",
        "Planned": "Planned",
        "Post Production": "Post Production",
        "Released": "Released",
        "Returning Series": "Returning Series",
      }
    };
    return statusTranslations[$translate.use()][inputStatus] || inputStatus;
  }

  function getGender(inputGender) {
    if (!inputGender) {
      return false;
    }
    var genderTranslations = {
      ru: {
        1: "Женский",
        2: "Мужской",
      },
      en: {
        1: "Female",
        2: "Male",
      }
    };
    return genderTranslations[$translate.use()][inputGender];
  }

  function PageLoader(loadingSteps) {
    $rootScope.loading = true;
    var loadingProgress = 0;
    var loadingSteps = loadingSteps;
    this.progress = function() {
      loadingProgress++;
      if (loadingProgress == loadingSteps) {
        $rootScope.loading = false;
      }
    }
  }

  return {
    fetch: fetch,
    parse: parse,
    extractObjectArray: extractObjectArray,
    formatDate: formatDate,
    formatRuntime: formatRuntime,
    formatMoney: formatMoney,
    getYear: getYear,
    cloneObject: cloneObject,
    getProductionStatus: getProductionStatus,
    getGender: getGender,
    PageLoader: PageLoader
  };
};
