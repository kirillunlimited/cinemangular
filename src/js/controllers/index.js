'use strict';
var app = require('angular').module('app');

app.controller('TodayController', require('./today.controller.js'));
app.controller('SoonController', require('./soon.controller.js'));
app.controller('FilmController', require('./film.controller.js'));
app.controller('SeancesController', require('./seances.controller.js'));
app.controller('CinemaController', require('./cinema.controller.js'));