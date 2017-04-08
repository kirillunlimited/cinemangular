'use strict';
module.exports = function FilmController(jsonFactory, photoService, dateService, $state) {
  var vm = this;

  vm.filmStatus = 'Loading';

  var fetchParams = {
    id:$state.params.filmId
  };

  jsonFactory.fetch('movie', fetchParams).then(function(filmResponse) {
    vm.filmContent = filmResponse.data;
    vm.filmContent.genres.content = jsonFactory.extractObjectArray(vm.filmContent.genres);
    vm.filmContent.production_countries.content = jsonFactory.extractObjectArray(vm.filmContent.production_countries);
    vm.filmContent.poster_path_full = photoService.getPosterPhoto(vm.filmContent.poster_path, 'medium');
    vm.filmContent.release_date = jsonFactory.formatDate(vm.filmContent.release_date);
    vm.filmContent.runtime = jsonFactory.formatRuntime(vm.filmContent.runtime);
    vm.filmContent.budget = jsonFactory.formatMoney(vm.filmContent.budget);
    vm.filmContent.revenue = jsonFactory.formatMoney(vm.filmContent.revenue);

    vm.filmStatus = 'Ready';
  });

  var getCreditsByJob = function(job, jobProp, creditsContent) {
    creditsContent[jobProp] = [];
    creditsContent.crew.forEach(function(person){
      if (person.job == job) {
        creditsContent[jobProp].push({
          id: person.id,
          name: person.name
        })
      }
    });
    console.log(creditsContent);
    return creditsContent;
  }

  jsonFactory.fetch('movieCredits', fetchParams).then(function(movieCreditsResponse) {
    vm.creditsContent = movieCreditsResponse.data;

    vm.creditsContent = getCreditsByJob('Director', 'directors', vm.creditsContent);
    vm.creditsContent = getCreditsByJob('Producer', 'producers', vm.creditsContent);
    vm.creditsContent = getCreditsByJob('Screenplay', 'screenplay', vm.creditsContent);
    vm.creditsContent = getCreditsByJob('Story', 'story', vm.creditsContent);

  });

};