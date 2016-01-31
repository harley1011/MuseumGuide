angular.module('controllers', ['ionic', 'ngCordovaBeacon'])

.controller('iBeaconCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaBeacon) {

  $scope.beacons = {};

  $ionicPlatform.ready(function() {
    $cordovaBeacon.requestWhenInUseAuthorization(); // ios only location permission

    /*
     * Events iBeacon in range
     * Retrieve all found beacons basic info
     */
    $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
     var uniqueBeaconKey;

      for (var i = 0; i < pluginResult.beacons.length; i++) {
        uniqueBeaconKey = pluginResult.beacons[i].uuid +
                          ":" + pluginResult.beacons[i].major +
                          ":" + pluginResult.beacons[i].minor;

        $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
      }
      $scope.$apply();
    });


    $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("Ipod", "8492e75f-4fd6-469d-b132-043fe94921d8"));
    $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("School", "b9407f30-f5f8-466e-aff9-25556b57fe6d"));

    console.log("[iBeaconCtrl]: iBeacon registered.");
  });
})
