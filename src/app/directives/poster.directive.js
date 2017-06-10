'use strict';
module.exports = function poster(photoService, PATH) {
  return {
    restrict: 'EA',
    replace: 'true',
    scope: {
      movie: '='
    },
    link: function(scope, el, attr){
      scope.url = photoService.getMovieCover(scope.movie.poster_path);
      el.css({
        'background-image': 'url(' + scope.url + ')'
      });
    },
    template: '<a><span class="poster__title">{{movie.title}}</span></a>'
  }
}
