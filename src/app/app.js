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