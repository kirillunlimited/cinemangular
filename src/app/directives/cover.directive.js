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
          scope.photoUrl = photoService.getCreditsCover(attr.path);
          break;
        case 'cast':
          scope.photoUrl = photoService.getCastCover(attr.path);
          break;
        case 'person':
          scope.photoUrl = photoService.getPersonCover(attr.path);
          break;
        case 'result':
          scope.photoUrl = photoService.getResultCover(attr.path);
          break;
        case 'movie':
          scope.photoUrl = photoService.getMovieCover(attr.path);
          break;
        default:
          scope.photoUrl = null;
          break;
      }
    },
    templateUrl: 'app/templates/cover.tpl.html'
  }
}