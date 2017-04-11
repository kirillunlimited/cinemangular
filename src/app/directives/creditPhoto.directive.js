'use strict';
module.exports = function creditPhoto(photoService, PATH) {
  return {
    restrict: 'EA',
    replace: 'true',
    scope: false,
    link: function(scope, el, attr){
      scope.url = photoService.getCreditsPortrait(attr.path);
    },
    template: '<img class="credits__photo" src="{{url}}" alt="Portrait">'
  }
}