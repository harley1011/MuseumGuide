angular.module('services')

.service('iBeaconSrvc', function($rootScope, $ionicPlatform, $cordovaBeacon) {
	var BeaconBuilder = {};

	BeaconBuilder.beaconCollection = {};
	BeaconBuilder.notifyEvent = "$iBeaconSrvc:beaconRangeChange";

	BeaconBuilder.init = function() {
		$ionicPlatform.ready(function() {
			$cordovaBeacon.requestWhenInUseAuthorization(); // ios only location permissionå

			$rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
					_buildBeaconCollection(pluginResult);
					_notifyBeaconsRangeChange();
			});

			_registerBeaconRegions();
		});
	};

	function _buildBeaconCollection(rslt){
		var uniqueBeaconKey;

		for (var i = 0; i < rslt.beacons.length; i++) {
			uniqueBeaconKey = rslt.beacons[i].uuid +
							  ":" + rslt.beacons[i].major +
							  ":" + rslt.beacons[i].minor;

			BeaconBuilder.beaconCollection[uniqueBeaconKey] = rslt.beacons[i];
		}
	}

	function _registerBeaconRegions(){
		$cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("Ipod", "8492e75f-4fd6-469d-b132-043fe94921d8"));
		$cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("School", "b9407f30-f5f8-466e-aff9-25556b57fe6d"));
	}

	function _notifyBeaconsRangeChange(){
		$rootScope.$broadcast(BeaconBuilder.notifyEvent, BeaconBuilder.beaconCollection);
	}

    return {
        BeaconBuilder : BeaconBuilder
    };
})
