'use strict';
module.exports = function CreditsController(jsonFactory, photoService, dateService, $state) {
  var vm = this;

  vm.status = 'Loading';

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

  jsonFactory.fetch(subjectFetchMethods[$state.current.name], fetchParams).then(function(response) {
    vm.subject = response.data;
    jsonFactory.fetch(creditsFetchMethods[$state.current.name], fetchParams).then(function(response) {
      vm.credits = response.data;
      vm.status = 'Ready';
    });
  });

};