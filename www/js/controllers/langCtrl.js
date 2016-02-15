angular.module('controllers')
.controller('langCtrl', function($scope, $state) {

    $scope.english = function () {
        console.log("Speaking English");
        $state.go('tab.level');
    }

});