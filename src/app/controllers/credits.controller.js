'use strict';
module.exports = function CreditsController(jsonService, photoService, $state, $rootScope, $translate) {
  var vm = this;

  var loader = new jsonService.PageLoader(1);

  var fetchParams = {
    id: $state.params.id
  };

  var subjectFetchMethods = {
    credits_movie: 'movie',
    credits_tv: 'tv'
  };

  var creditsFetchMethods = {
    credits_movie: 'movieCredits',
    credits_tv: 'tvCredits'
  };

  var parentStates = {
    credits_movie: 'movie',
    credits_tv: 'tv'
  };

  // move to service
  vm.getParentUrl = function() {
    return $state.href(parentStates[$state.current.name], {id: $state.params.id});
  };

  jsonService.fetch(subjectFetchMethods[$state.current.name], fetchParams).then(function(response) {
    vm.subject = response.data;

    $rootScope.pageTitle = vm.subject.title || vm.subject.name;
    $translate('CREDITS').then(function(translation) {
      $rootScope.pageTitle += ' – ' + translation;
    });

    jsonService.fetch(creditsFetchMethods[$state.current.name], fetchParams).then(function(response) {
      vm.credits = response.data;
      loader.progress();
    });
  });

};