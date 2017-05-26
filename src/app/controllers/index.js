'use strict';
var app = require('angular').module('app');

app.controller('LanguageController', require('./language.controller.js'));
app.controller('AfishaController', require('./afisha.controller.js'));
app.controller('FilmController', require('./film.controller.js'));
app.controller('PersonController', require('./person.controller.js'));
app.controller('SearchController', require('./search.controller.js'));
app.controller('CreditsController', require('./credits.controller.js'));
app.controller('GalleryController', require('./gallery.controller.js'));
app.controller('VideosController', require('./videos.controller.js'));
app.controller('TvController', require('./tv.controller.js'));