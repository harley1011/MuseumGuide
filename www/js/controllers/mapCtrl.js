angular.module('controllers')
    .controller('mapCtrl', function($scope, iBeaconSrvc) {

        var beaconSrvc = iBeaconSrvc.BeaconBuilder;
        beaconSrvc.init(); // Intialize beacon services

		// Listen to proximity change events
        $scope.$on(beaconSrvc.notifyEvent, function(event, value){
        	$scope.mapBeacons = value;
			$scope.$apply();
        });


        $scope.mapPoints = [{
            left: 20,
            top: 91.8,
            color: '#00008B',
            radius: "8px"
        }, {
            left: 60,
            top: 91.2,
            color: '#00008B',
            radius: "8px"
        }];

        $scope.changeLevel = function(level) {
            console.log("Changing level to: " + level);
        };
    })
