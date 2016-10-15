'use strict';
module.exports = function PersonController(jsonApi, $state) {
  var vm = this;

  vm.status = "Loading";

  jsonApi.fetch("http://api.kinopoisk.cf/getPeopleDetail?peopleID=" + $state.params.personId).then(function(response) {
    vm.personContent = response.data;
    vm.personContent = vm.parseGeneralFilms(vm.personContent);
    vm.posterPath = jsonApi.switchPosterSize(vm.personContent.posterURL, 180);
    vm.sex = vm.getRusSex(vm.personContent.sex);
    vm.rusAge = vm.getRusAge(vm.personContent.age);

    vm.status = "Ready";
  });

  vm.getRusAge = function(age) {
    if (age != null) {
      var lastDigit = age.toString().split('').pop();
      var rusAge = "лет";
      if (lastDigit == 1 ) {
        rusAge = "год";
      }
      else if (lastDigit > 1 && lastDigit < 5) {
        rusAge = "года";
      }
      else if (lastDigit >= 5 || lastDigit == 0) {
        rusAge = "лет";
      }
      return rusAge;
    }
  };

  vm.getRusSex = function(sex) {
    switch(sex) {
      case "male":
        return "мужской";
      case "female":
        return "женский";
    }
  };

  vm.parseGeneralFilms = function(content) {
    var generalFilmsIdsArray = [];

    if (content.generalFilms) {
      content.generalFilms.forEach(function(obj) {
        generalFilmsIdsArray.push(obj.filmID);
      });
    }

    if (content.generalSeries) {
      content.generalSeries.forEach(function(obj) {
        generalFilmsIdsArray.push(obj.filmID);
      });
    }

    content.filmography.forEach(function(filmographyElement, filmographyElementIndex, filmography) {
      filmographyElement.forEach(function(film, filmIndex, filmographyElement) {
        if (generalFilmsIdsArray.indexOf(film.filmID) != -1) {
          film.isGeneral = true;
        }
      })
    });

    return content;
  };

  vm.checkGeneralFilm = function(filmID) {

  };
};
