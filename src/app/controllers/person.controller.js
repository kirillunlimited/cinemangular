'use strict';
module.exports = function PersonController(jsonFactory, photoService, $state, $scope) {
  var vm = this;

  vm.status = 'Loading';

  var fetchParams = {
    id: $state.params.personId
  };

  jsonFactory.fetch('person', fetchParams, 'ru').then(function(personResponse) {
    vm.personContent = personResponse.data;
    vm.personPortrait = photoService.getPersonPortrait(vm.personContent.profile_path);

    vm.personInfo = {
      gender: (vm.personContent.gender === 1) ? 'Женский' : 'Мужской',
      birthday: jsonFactory.formatDate(vm.personContent.birthday),
      birthplace: vm.personContent.place_of_birth,
      deathday: jsonFactory.formatDate(vm.personContent.deathday),
      homepage:  vm.personContent.homepage
    };

    vm.personBiography = vm.personContent.biography;
    if (!vm.personBiography) {
      jsonFactory.fetch('person', fetchParams, 'en').then(function(personBiographyResponse) {
        vm.personBiography = personBiographyResponse.data.biography;
      });
    }

    vm.status = 'Ready';
  });

  jsonFactory.fetch('personCredits', fetchParams).then(function(personCreditsResponse) {
    vm.personCreditsContent = personCreditsResponse.data;
  });

};
