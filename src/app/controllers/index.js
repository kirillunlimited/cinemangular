'use strict';
var app = require('angular').module('app');

app.controller('AfishaController', require('./afisha.controller.js'));
app.controller('FilmController', require('./film.controller.js'));
app.controller('PersonController', require('./person.controller.js'));
app.controller('SeancesController', require('./seances.controller.js'));
app.controller('CinemaController', require('./cinema.controller.js'));
app.controller('SearchController', require('./search.controller.js'));