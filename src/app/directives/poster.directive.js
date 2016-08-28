'use strict';
module.exports = function poster(jsonApi) {
  return {
    restrict: 'EA',
    replace: 'true',
    scope: false,
    link: function(scope, el, attr){
      scope.url = jsonApi.switchPosterSize(attr.path, 360);
      el.css({
        'background-image': 'url(' + scope.url + ')'
      });
    },
    template: '<div class="poster__img">'
  }
}
