'use strict';
module.exports = function PersonController(jsonService, photoService, $state, $scope, $rootScope) {
  var vm = this;

  var loader = new jsonService.PageLoader(4);

  var fetchParams = {
    id: $state.params.personId
  };

  jsonService.fetch('person', fetchParams).then(function(response) {
    vm.person = response.data;

    vm.info = {
      gender: jsonService.getGender(vm.person.gender),
      birthday: jsonService.formatDate(vm.person.birthday),
      birthplace: vm.person.place_of_birth,
      deathday: jsonService.formatDate(vm.person.deathday),
      homepage:  vm.person.homepage
    };

    vm.isPersonInfoEmpty = true;
    for (var index in vm.info) {
      if (vm.info[index]) {
        vm.isPersonInfoEmpty = false;
        break;
      }
    }

    vm.bio = vm.person.biography;
    if (!vm.bio) {
      jsonService.fetch('person', fetchParams, 'en').then(function(response) {
        vm.bio = response.data.biography;
      });
    }

    $rootScope.pageTitle = vm.person.name;

    loader.progress();
  });

  jsonService.fetch('personPhotos', fetchParams).then(function(resposne) {
    vm.photos = resposne.data;
    vm.gallery = photoService.getPersonGallery(vm.photos.profiles);
    loader.progress();
  });

  jsonService.fetch('personMovieCredits', fetchParams).then(function(response) {
    vm.movieCredits = response.data;
    loader.progress();
  });

  jsonService.fetch('personTvCredits', fetchParams).then(function(response) {
    vm.tvCredits = response.data;
    loader.progress();
  });

  vm.getPersonMovieYear = function(date) {
    return jsonService.getYear(date);
  };

};
