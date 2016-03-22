angular.module('services')
    .service('languageSrvc', function () {
        var languageSelected;

        var languageSrvc = {};

        languageSrvc.storeLanguageSelection = function (language) {
            languageSelected = language;
        }

        languageSrvc.getStoredQrDetails = function () {
            return languageSelected;
        }

        return languageSrvc;
    });
