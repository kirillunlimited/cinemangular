'use strict';
module.exports = function SearchController(jsonService, $state, $rootScope, $translate) {
  var vm = this;

  var loader = new jsonService.PageLoader(1);

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
    else {
      $state.go($state.current.name, {query: queryString});
      return;
    }
  }

  vm.fetchInit = function(fetchParams, lang) {
    var searchTabCounter = 0;
    var statesWithResult = [];

    angular.forEach(searchStates, function(stateValue, stateIndex){
      jsonService.fetch(stateValue.method, fetchParams, lang).then(function(response) {

        vm[stateValue.var] = response.data.results;
        vm[stateValue.countVar] = response.data.total_results || 0;

        searchTabCounter++;

        if (vm[stateValue.countVar]) {
          statesWithResult.push(stateIndex);
        }

        if (searchTabCounter == statesCount) {
          vm.tabsInit(statesWithResult, vm.searchString);
          loader.progress();
        }

      });
    });
  };

  vm.searchInit = function() {
    if (vm.searchString != null) {
      loader = new jsonService.PageLoader(1);
      var fetchParams = {
        query: vm.searchString
      };
      vm.fetchInit(fetchParams);

      $translate('SEARCH').then(function(translation) {
        $rootScope.pageTitle = translation + ' – ' + vm.searchString;
      });
    } else {
      loader.progress();
    }
  };

  vm.formatDate = function(releaseDate) {
    return jsonService.getYear(releaseDate);
  }

  vm.getMovieYear = function(date) {
    return jsonService.getYear(date);
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