'use strict';
module.exports = function translateConfig($translateProvider) {

    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    $translateProvider.useStaticFilesLoader({
        prefix: '/app/translations/',
        suffix: '.json'
    });

    var browserLanguage = navigator.languages[0] || navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage;
    var preferredLanguage = browserLanguage.split('-')[0];
    $translateProvider.preferredLanguage(preferredLanguage);

    $translateProvider.useCookieStorage();
};