angular.module('controllers')
    .controller('mapCtrl', function($scope) {
        console.log('in ctrl')
        $scope.mapPoints = [{left: 20, top: 91.8, color: '#00008B', radius: "8px"}, {left: 60, top: 91.2, color: '#00008B', radius: "8px"}];
    })
