'use strict';
module.exports = function CreditsController(jsonFactory, photoService, dateService, $state) {
  var vm = this;

  vm.status = 'Loading';

  var fetchParams = {
    id:$state.params.filmId
  };

  jsonFactory.fetch('movie', fetchParams).then(function(filmResponse) {
    vm.filmContent = filmResponse.data;
    jsonFactory.fetch('credits', fetchParams).then(function(creditsResponse) {
      vm.creditsContent = creditsResponse.data;
      vm.status = 'Ready';
    });
  });

};