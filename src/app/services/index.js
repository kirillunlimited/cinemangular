'use strict';
var app = require('angular').module('app');

app.factory('jsonFactory', require('./json.factory.js'));
app.service('dateService', require('./date.service.js'));
app.service('photoService', require('./photo.service.js'));