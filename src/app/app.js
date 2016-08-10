'use strict';
var angular = require('angular');
var ngRoute = require('angular-ui-router');
var ngAnimate = require('angular-animate');
var app = angular.module('app', ['ui.router', 'ngAnimate']);

require('./config');
require('./services');
require('./directives');
require('./controllers');
