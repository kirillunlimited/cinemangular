'use strict';
module.exports = function SoonController(jsonApi) {
  var vm = this;

  vm.status = "Loading";

  vm.pageTitle = "Скоро в прокате";
  jsonApi.fetch("http://api.kinopoisk.cf/getSoonFilms").then(function(response) {
    vm.films = jsonApi.parse(response, 'previewFilms');
    vm.status = "Ready";
  });
  vm.switchPosterSize = function(imgPath, imgWidth) {
    return jsonApi.switchPosterSize(imgPath, imgWidth);
  };
};