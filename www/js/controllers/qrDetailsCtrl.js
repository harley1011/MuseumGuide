angular.module('controllers')
    .controller('qrDetailsCtrl', function($scope, qrSrvc, $translate) {
        $scope.language;
        $scope.images = [];
        $scope.texts = [];
        function init() {
            var qrDetail = qrSrvc.getStoredQrDetails();
            $scope.language = $translate.use();
            $scope.images = qrDetail.images;
            $scope.texts = qrDetail.texts;
        }
        init();

    })
