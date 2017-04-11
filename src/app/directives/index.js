'use strict';
var app = require('angular').module('app');

app.directive('poster', require('./poster.directive.js'));
app.directive('backdrop', require('./backdrop.directive.js'));
app.directive('creditPhoto', require('./creditPhoto.directive.js'));