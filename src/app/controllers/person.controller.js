'use strict';
module.exports = function PersonController(jsonFactory, photoService, $state, $scope) {
  var vm = this;

  vm.status = 'Loading';

  var fetchParams = {
    id: $state.params.personId
  };

  jsonFactory.fetch('person', fetchParams).then(function(response) {
    vm.person = response.data;

    vm.info = {
      gender: (vm.person.gender === 1) ? 'Женский' : 'Мужской',
      birthday: jsonFactory.formatDate(vm.person.birthday),
      birthplace: vm.person.place_of_birth,
      deathday: jsonFactory.formatDate(vm.person.deathday),
      homepage:  vm.person.homepage
    };

    vm.bio = vm.person.biography;
    if (!vm.bio) {
      jsonFactory.fetch('person', fetchParams, 'en').then(function(response) {
        vm.bio = response.data.biography;
      });
    }
    vm.status = 'Ready';
  });

  jsonFactory.fetch('personPhotos', fetchParams).then(function(resposne) {
    vm.photos = resposne.data;
    vm.gallery = photoService.getPersonGallery(vm.photos.profiles);
  });

  jsonFactory.fetch('personCredits', fetchParams).then(function(response) {
    vm.credits = response.data;
  });

  vm.getPersonMovieYear = function(date) {
    return jsonFactory.getYear(date);
  };

};
