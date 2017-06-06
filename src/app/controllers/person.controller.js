'use strict';
module.exports = function PersonController(jsonService, photoService, $state, $scope, $rootScope) {
  var vm = this;

  vm.status = 'Loading';

  var fetchParams = {
    id: $state.params.personId
  };

  jsonService.fetch('person', fetchParams).then(function(response) {
    vm.person = response.data;

    vm.info = {
      gender: (vm.person.gender === 1) ? 'Женский' : 'Мужской',
      birthday: jsonService.formatDate(vm.person.birthday),
      birthplace: vm.person.place_of_birth,
      deathday: jsonService.formatDate(vm.person.deathday),
      homepage:  vm.person.homepage
    };

    vm.bio = vm.person.biography;
    if (!vm.bio) {
      jsonService.fetch('person', fetchParams, 'en').then(function(response) {
        vm.bio = response.data.biography;
      });
    }

    $rootScope.pageTitle = vm.person.name;

    vm.status = 'Ready';
  });

  jsonService.fetch('personPhotos', fetchParams).then(function(resposne) {
    vm.photos = resposne.data;
    vm.gallery = photoService.getPersonGallery(vm.photos.profiles);
  });

  jsonService.fetch('personMovieCredits', fetchParams).then(function(response) {
    vm.movieCredits = response.data;
  });

  jsonService.fetch('personTvCredits', fetchParams).then(function(response) {
    vm.tvCredits = response.data;
  });

  vm.getPersonMovieYear = function(date) {
    return jsonService.getYear(date);
  };

};
