'use strict';
module.exports = function SearchController(jsonFactory, photoService, $state) {
  var vm = this;

  vm.searchString = $state.params.query;

  vm.getClass = function(currentState) {
    return $state.current.name === currentState;
  };

  var searchStates = {
    'search.movies': {
      method: 'searchMovies',
      var: 'moviesResults',
      countVar: 'moviesResultsCount'
    },
    'search.tv': {
      method: 'searchTv',
      var: 'tvResults',
      countVar: 'tvResultsCount'
    },
    'search.people': {
      method: 'searchPeople',
      var: 'peopleResults',
      countVar: 'peopleResultsCount'
    }
  };

  var statesCount = Object.keys(searchStates).length;

  vm.tabsInit = function(statesWithResult, queryString) {
    // если на текущей вкладке нет результатов (иначе остаемся на текущей вкладке)
    if (statesWithResult.indexOf($state.current.name) == -1) {
      // перебор вкладок с результатами (слева направо)
      for (var state in searchStates) {
        if (statesWithResult.indexOf(state) != -1) {
          $state.go(state, {query: queryString});
          return;
        }
      }
    }
  }

  vm.fetchInit = function(fetchParams, lang) {
    var searchTabCounter = 0;
    var statesWithResult = [];

    angular.forEach(searchStates, function(stateValue, stateIndex){
      jsonFactory.fetch(stateValue.method, fetchParams, lang).then(function(response) {

        vm[stateValue.var] = response.data.results;
        vm[stateValue.countVar] = response.data.total_results || 0;

        searchTabCounter++;

        if (vm[stateValue.countVar]) {
          statesWithResult.push(stateIndex);
        }

        if (searchTabCounter == statesCount) {
          vm.tabsInit(statesWithResult, vm.searchString);
        }

      });
    });
  };

  vm.searchInit = function() {

    if (vm.searchString != null) {
      var fetchParams = {
        query: vm.searchString
      };

      vm.fetchInit(fetchParams, 'ru');
    }
  };

  vm.getPoster = function(url) {
    return photoService.getResultPoster(url);
  };
  vm.getPortrait = function(url) {
    return photoService.getResultPortrait(url);
  }

  vm.formatDate = function(releaseDate) {
    return jsonFactory.getYear(releaseDate);
  }

  vm.getMovieYear = function(date) {
    return jsonFactory.getYear(date);
  };

  vm.getKnownFor = function(person) {
    var myArr = person.known_for.map(function(movie) {
      var title = movie.title || movie.name;
      if (!title) {
        title = movie.original_title || movie.original_name;
      }
      return title;
    });
  };

  vm.searchInit();

};