angular
  .module('app', ['ngRoute'])
  .config(routerConfig)
  .factory('jsonApi', jsonApi)
  .service('dateService', dateService)
  .controller('TodayController', TodayController)
  .controller('SoonController', SoonController)
  .controller('FilmController', FilmController)
  .controller('SeancesController', SeancesController)
  .controller('CinemaController', CinemaController)

function routerConfig($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl : 'js/views/index.html'
    })
    .when("/today", {
      templateUrl : 'js/views/films_catalog.html',
      controller: 'TodayController',
      controllerAs: 'filmsCtrl'
    })
    .when("/soon", {
      templateUrl : 'js/views/films_catalog.html',
      controller: 'SoonController',
      controllerAs: 'filmsCtrl'
    })
    .when("/film/:filmID", {
      templateUrl : 'js/views/film_description.html',
      controller: 'FilmController',
      controllerAs: 'filmCtrl'
    })
    .when("/seances/:filmID", {
      templateUrl : 'js/views/film_seances.html',
      controller: 'SeancesController',
      controllerAs: 'seancesCtrl'
    })
    .when("/cinema/:cinemaID", {
      templateUrl : 'js/views/cinema_description.html',
      controller: 'CinemaController',
      controllerAs: 'cinemaCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}

// сервис(фабрика) для получения данных из json
function jsonApi($http) {
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
      return imgPath.replace('iphone60', 'iphone' + imgWidth).replace('iphone90', 'iphone' + imgWidth);
    }
    else {
      return "images/movies/poster_none.png";
    }
  }
  return {
    fetch: fetch,
    parse: parse,
    switchPosterSize: switchPosterSize
  };
}

// сервис для работы с датами
function dateService() {
  this.getToday = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    today = dd+'.'+mm+'.'+yyyy;
    return today;
  };

  // формирование массива дней для заполнения выпадающего списка
  this.getDaysList = function() {
    var days = [];
    for (var i = 0; i < 7; i++) {
      var day = new Date();
      day.setDate(day.getDate() + i);
      var dd = day.getDate();
      var mm = day.getMonth() + 1; //January is 0!
      var yyyy = day.getFullYear();
      if(dd<10) {
          dd='0'+dd
      }
      if(mm<10) {
          mm='0'+mm
      }
      day = dd+'.'+mm+'.'+yyyy;
      days.push(day);
    }
    return days;
  };
}

function TodayController(jsonApi, dateService) {
  var vm = this;

  vm.pageTitle = "Сегодня в прокате";
  jsonApi.fetch("http://api.kinopoisk.cf/getTodayFilms?date=" + dateService.getToday()).then(function(response) {
    vm.films = jsonApi.parse(response, 'filmsData');
  });
  vm.switchPosterSize = function(imgPath, imgWidth) {
    return jsonApi.switchPosterSize(imgPath, imgWidth);
  }
}

function SoonController(jsonApi) {
  var vm = this;

  vm.pageTitle = "Скоро в прокате";
  jsonApi.fetch("http://api.kinopoisk.cf/getSoonFilms").then(function(response) {
    vm.films = jsonApi.parse(response, 'previewFilms');
  });
  vm.switchPosterSize = function(imgPath, imgWidth) {
    return jsonApi.switchPosterSize(imgPath, imgWidth);
  }
}

function FilmController(jsonApi, $routeParams) {
  var vm = this;

  jsonApi.fetch("http://api.kinopoisk.cf/getFilm?filmID=" + $routeParams.filmID).then(function(response) {
    vm.filmContent = response.data;
    vm.posterPath = jsonApi.switchPosterSize(vm.filmContent.posterURL, 360);
  });
}

function SeancesController(jsonApi, dateService, $routeParams) {
  var vm = this;
  vm.status = "loading";

  vm.days = dateService.getDaysList();
  vm.seancesSelect = vm.days[0];  // init default value for select

  jsonApi.fetch("http://api.kinopoisk.cf/getSeance?filmID=" + $routeParams.filmID + "&date=" + dateService.getToday()).then(function(response) {
    vm.status = "ready";
    vm.seancesContent = response.data;
  });

  vm.getData = function(date) {
    jsonApi.fetch("http://api.kinopoisk.cf/getSeance?filmID=" + $routeParams.filmID + "&date=" + date).then(function(response) {
      vm.seancesContent = response.data;
    });
  };
}

function CinemaController(jsonApi, dateService, $routeParams) {
  var vm = this;

  vm.days = dateService.getDaysList();
  vm.cinemaSelect = vm.days[0];  // init default value for select

  jsonApi.fetch("http://api.kinopoisk.cf/getCinemaDetail?cinemaID=" + $routeParams.cinemaID + "&date=" + dateService.getToday()).then(function(response) {
    vm.cinemaContent = response.data.cinemaDetail;
  });

  vm.getData = function(date) {
    jsonApi.fetch("http://api.kinopoisk.cf/getCinemaDetail?cinemaID=" + $routeParams.cinemaID + "&date=" + date).then(function(response) {
      vm.cinemaContent = response.data.cinemaDetail;
    });
  }
}