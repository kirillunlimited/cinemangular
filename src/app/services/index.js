'use strict';
var app = require('angular').module('app');

app.factory('jsonApi', require('./json.factory.js'));
app.service('dateService', require('./date.service.js'));