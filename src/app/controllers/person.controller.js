'use strict';
module.exports = function PersonController(jsonFactory, photoService, $state, $scope) {
  var vm = this;

  vm.status = 'Loading';

  jsonFactory.fetch('person', $state.params.personId).then(function(personResponse) {
    vm.personContent = personResponse.data;
    vm.personContent.profile_path_full = photoService.getFullPhotoPath(vm.personContent.profile_path);
    vm.genderText = (vm.personContent.gender === 1) ? 'Женский' : 'Мужской';
    vm.status = 'Ready';
  });

  jsonFactory.fetch('personCredits', $state.params.personId).then(function(personCreditsResponse) {
    vm.personCreditsContent = personCreditsResponse.data;
  });

};
