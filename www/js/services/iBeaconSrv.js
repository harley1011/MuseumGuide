angular.module('services')

.service('iBeaconSrvc', function($rootScope, $ionicPlatform, $cordovaBeacon) {

  var MusBeacons = {};
  MusBeacons.beaconsCollection = {};

  MusBeacons.init = function() {
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

          MusBeacons.beaconsCollection[uniqueBeaconKey] = pluginResult.beacons[i];
        }
      });

     /*
      * Register beacon regions
      */
      $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("Ipod", "8492e75f-4fd6-469d-b132-043fe94921d8"));
      $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("School", "b9407f30-f5f8-466e-aff9-25556b57fe6d"));


      console.log("[iBeaconSrv]: iBeacon registered.");
      console.log(MusBeacons.beaconsCollection); // TODO delete
    });
};

  return {MusBeacons : MusBeacons};
})
