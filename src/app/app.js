'use strict';
require('angular');
require('angular-ui-router');
require('angular-animate');
require('ng-image-gallery');
require('angular-translate');
require('angular-cookies');
require('angular-translate-storage-cookie');
require('angular-translate-loader-static-files');
require('angular-sanitize');

var app = angular.module('app', ['ui.router', 'ngAnimate', 'thatisuday.ng-image-gallery', 'pascalprecht.translate', 'ngCookies', 'ngSanitize']);

require('./constants/')
require('./config');
require('./services');
require('./directives');
require('./controllers');

app.run(function($rootScope, $anchorScroll){
  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    $anchorScroll();
  });
});

app.run(function($rootScope, $state, $stateParams, $translate){
  $rootScope.$on('$stateChangeSuccess', function() {
    if ($state.current.title) {
      $translate($state.current.title.main).then(function(translation) {
        $rootScope.pageTitle = translation;
        if ($state.current.title.sub) {
          $translate($state.current.title.sub).then(function(translation) {
            $rootScope.pageTitle += ' – ' + translation;
          });
        }
      });
    }
  })
});