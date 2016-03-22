angular.module('services')
    .service('languageSrvc', function () {
        var languageSelected = "fr";

        var languageSrvc = {};

        languageSrvc.storeLanguageSelection = function (language) {
            languageSelected = language;
        }

        languageSrvc.getStoredLanguage = function () {
            return languageSelected;
        }

        return languageSrvc;
    });
