'use strict';
require('angular');
require('angular-ui-router');
require('angular-animate');
require('ng-image-gallery');

var app = angular.module('app', ['ui.router', 'ngAnimate', 'thatisuday.ng-image-gallery']);

require('./config');
require('./services');
require('./directives');
require('./controllers');
