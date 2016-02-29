angular.module('controllers')
.controller('detailsCtrl', function($scope, $state) {
     
    $scope.getDetails = function () {
        $state.go('tab.details');
    };
});