'use strict';
module.exports = function poster(photoService) {
  return {
    restrict: 'EA',
    replace: 'true',
    scope: false,
    link: function(scope, el, attr){
      scope.url = photoService.switchPosterSize(attr.path, 360);
      el.css({
        'background-image': 'url(' + scope.url + ')'
      });
    },
    template: '<div class="poster__img">'
  }
}
