'use strict';
var app = require('angular').module('app');

app.config(require('./router.config.js'));
app.config(require('./translate.config.js'));