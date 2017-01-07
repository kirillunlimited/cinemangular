'use strict';
module.exports = function PersonController(jsonFactory, photoService, $state, $scope) {
  var vm = this;

  vm.status = 'Loading';

  var fetchParams = {
    id: $state.params.personId
  };

  jsonFactory.fetch('person', fetchParams).then(function(personResponse) {
    vm.personContent = personResponse.data;
    vm.personContent.profile_path_full = photoService.getPosterPhoto(vm.personContent.profile_path, 'medium');
    vm.personContent.birthday = jsonFactory.formatDate(vm.personContent.birthday);
    vm.personContent.deathday = jsonFactory.formatDate(vm.personContent.deathday);
    vm.genderText = (vm.personContent.gender === 1) ? 'Женский' : 'Мужской';
    vm.status = 'Ready';
  });

  jsonFactory.fetch('personCredits', fetchParams).then(function(personCreditsResponse) {
    vm.personCreditsContent = personCreditsResponse.data;
  });

};
