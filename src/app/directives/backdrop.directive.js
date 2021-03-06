'use strict';
module.exports = function backdrop(photoService, PATH) {
  return {
    restrict: 'EA',
    replace: 'true',
    scope: false,
    link: function(scope, el, attr){
      scope.url = photoService.getBackdrop(attr.path);
      if (scope.url) {
        el.css({
          'background-image': 'url(' + scope.url + ')'
        });
      }
    },
    template: '<div class="backdrop">'
  }
}
