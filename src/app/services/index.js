'use strict';
var app = require('angular').module('app');

app.factory('jsonService', require('./json.service.js'));
app.factory('dateService', require('./date.service.js'));
app.factory('photoService', require('./photo.service.js'));