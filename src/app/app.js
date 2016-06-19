'use strict';
var angular = require('angular');
var ngRoute = require('angular-route');
var app = angular.module('app', [ngRoute]);

require('./config');
require('./services');
require('./controllers');
