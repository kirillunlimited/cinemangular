'use strict';
module.exports = function PersonController(jsonApi, $state) {
  var vm = this;

  vm.status = "Loading";

  jsonApi.fetch("http://api.kinopoisk.cf/getPeopleDetail?peopleID=" + $state.params.personId).then(function(response) {
    vm.personContent = response.data;
    console.log(vm.personContent);
    vm.posterPath = jsonApi.switchPosterSize(vm.personContent.posterURL, 180);
    vm.sex = vm.getRusSex(vm.personContent.sex);
    vm.rusAge = vm.getRusAge(vm.personContent.age);
    vm.status = "Ready";
  });

  vm.getRusAge = function(age) {
    if (age != null) {
      var lastDigit = age.toString().split('').pop();
      var rusAge = "лет";
      if (lastDigit == 1 ) {
        rusAge = "год";
      }
      else if (lastDigit > 1 && lastDigit < 5) {
        rusAge = "года";
      }
      else if (lastDigit >= 5 || lastDigit == 0) {
        rusAge = "лет";
      }
      return rusAge;
    }
  };

  vm.getRusSex = function(sex) {
    switch(sex) {
      case "male":
        return "мужской";
      case "female":
        return "женский";
    }
  };
};