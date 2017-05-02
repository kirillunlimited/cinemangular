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

  jsonFactory.fetch('personPhotos', fetchParams).then(function(personPhotosResponse) {
    vm.personPhotosContent = personPhotosResponse.data;
    vm.personGallery = photoService.getPersonGallery(vm.personPhotosContent.profiles);
  });

  jsonFactory.fetch('personCredits', fetchParams, 'ru').then(function(personCreditsResponse) {
    vm.personCreditsContent = personCreditsResponse.data;
  });

  vm.getMoviePoster = function(imgPath) {
    return photoService.getPersonMoviePoster(imgPath);
  };

  vm.getPersonMovieYear = function(date) {
    return jsonFactory.getYear(date);
  };

};
