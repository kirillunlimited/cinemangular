'use strict';
module.exports = function poster(photoService, PATH) {
  return {
    restrict: 'EA',
    replace: 'true',
    scope: {
      film: '='
    },
    link: function(scope, el, attr){
      // каждые (10n + 1) и (10n + 7) - backdrop
      if (attr.index == 0 || attr.index == 6 ||
          attr.index % 10 == 0 || (attr.index - 6) % 10 == 0 ) {
        scope.url = photoService.getAfishaBackdrop(scope.film.backdrop_path);
      }
      // остальные - poster
      else {
        scope.url = photoService.getAfishaPoster(scope.film.poster_path);
      }
      el.css({
        'background-image': 'url(' + scope.url + ')'
      });
    },
    template: '<a><span class="poster__title">{{film.title}}</span></a>'
  }
}
