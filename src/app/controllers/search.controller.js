'use strict';
module.exports = function SearchController(jsonApi) {
  var vm = this;

  vm.searchString = "";
  vm.status = "Ready";

  vm.filmsLimit = 3;
  vm.allFilms = false; // flag for show all films button

  vm.peopleLimit = 3;
  vm.allPeople = false; // flag for show all people button

  vm.findFilm = function() {
    if (vm.searchString != "") {
      vm.status = "Loading";
      jsonApi.fetch("http://api.kinopoisk.cf/searchFilms?keyword=" + vm.searchString).then(function(filmsResponse) {
        vm.filmsContent = filmsResponse.data.searchFilms;
        console.log(vm.filmsContent);
        jsonApi.fetch("http://api.kinopoisk.cf/searchPeople?keyword=" + vm.searchString).then(function(peopleResponse) {
          vm.peopleContent = peopleResponse.data.searchPeople;
          vm.status = "Ready";
        });
      });
    }
  };

  vm.getPoster = function(posterURL) {
    return jsonApi.switchPosterSize(posterURL, 90);
  };

  vm.moreFilms = function(limit) {
    vm.filmsLimit = limit;
    vm.allFilms = true;
  };

  vm.morePeople = function(limit) {
    vm.peopleLimit = limit;
    vm.allPeople = true;
  };

};