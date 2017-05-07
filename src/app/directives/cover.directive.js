'use strict';
module.exports = function cover(photoService, PATH) {
  return {
    restrict: 'EA',
    replace: 'true',
    scope: false,
    link: function(scope, el, attr){

      scope.view = attr.view;
      scope.type = attr.type; // poster || profile

      switch(attr.view) {
        case 'credit':
          scope.photoUrl = photoService.getCreditsPortrait(attr.path);
          break;
        case 'cast':
          scope.photoUrl = photoService.getCastPortrait(attr.path);
          break;
        case 'person':
          scope.photoUrl = photoService.getPersonPortrait(attr.path);
          break;
        case 'result':
          scope.photoUrl = photoService.getPersonMoviePoster(attr.path);
          break;
        case 'movie':
          scope.photoUrl = photoService.getMoviePoster(attr.path);
          break;
        default:
          scope.photoUrl = null;
          break;
      }
    },
    templateUrl: 'app/templates/cover.tpl.html'
  }
}