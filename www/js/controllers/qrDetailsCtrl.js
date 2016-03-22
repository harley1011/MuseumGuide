angular.module('controllers')
    .controller('qrDetailsCtrl', function($scope, qrSrvc, languageSrvc) {
        $scope.language;
        $scope.images = [];
        $scope.texts = [];
        function init() {
            var qrDetail = qrSrvc.getStoredQrDetails();
            $scope.language = languageSrvc.getStoredLanguage();
            $scope.images = qrDetail.images;
            $scope.texts = qrDetail.texts;
        }
        init();

    })
