'use strict';
module.exports = function poster(photoService, PATH) {
  return {
    restrict: 'EA',
    replace: 'true',
    scope: false,
    link: function(scope, el, attr){
      // scope.url = photoService.switchPosterSize(attr.path, 360);
      scope.url = PATH.IMG + attr.path;
      el.css({
        'background-image': 'url(' + scope.url + ')'
      });
    },
    template: '<div class="poster__img">'
  }
}
