
angular.module('services')

/*
 * How to
 * ---------------------------------------------------------------------------------
 * 1. registerBeaconRegions('identifier', 'uui'); // can be called as much as needed
 * 2. init(); //initialize beacon services
 * 3. catch beacon events
 * $scope.$on(beaconSrvc.notifyEvent, function (event, value) {
 *       $scope.mapBeacons = value;
 *       $scope.$apply();
 *   });
 */
.service('iBeaconSrvc', function ($rootScope, $ionicPlatform, $cordovaBeacon) {

	var BeaconBuilder = {};

	BeaconBuilder.counter = 0;
	BeaconBuilder.hasRegion = false;
	BeaconBuilder.inactivelimitSec = 3;
	BeaconBuilder.registeredRegion = {};
	BeaconBuilder.beaconCollection = {};
	BeaconBuilder.notifyEvent = "$iBeaconSrvc:beaconRangeChange";

	/**
	 *	ProximityImmediate	(strong signal; usually up to a few centimeters)
	 *	ProximityNear	(medium signal; usually up to a few meters)
	 *	ProximityFar	(weak signal; more than a few meters)
	 *	ProximityUnknown	(“hard to say”, usually when the signal is very, very weak)
	 */
	BeaconBuilder.proximity = {
		immediate: "ProximityImmediate",
		near: "ProximityNear",
		far: "ProximityFar",
		unknown: "ProximityUnknown"
	};

	/*
	 * Initialize iBeacon services
	 */
	BeaconBuilder.init = function () {
		$ionicPlatform.ready(function () {
			if (ionic.Platform.is('browser')) {
				return;
			}

			BeaconBuilder.testHasRegisteredRegions();

			$cordovaBeacon.requestWhenInUseAuthorization(); // ios only location permissionå
			BeaconBuilder.initBeaconListener();
			BeaconBuilder.buildBeaconRegions();
		});
	};

	BeaconBuilder.testHasRegisteredRegions = function () {
		if (BeaconBuilder.hasRegion === false) {
			throw new Error("[iBeaconSrvc] Please add one or more beacon region before calling init.");
		}
	};

	/*
	 * Initialize iBeacon listener
	 */
	BeaconBuilder.initBeaconListener = function () {
		$rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function (event, pluginResult) {
			BeaconBuilder.buildDetectedBeaconCollection(pluginResult);
			BeaconBuilder.notifyBeaconsRangeChange();
		});
	};

	/*
	 * register a collection of beacons regions
	 */
	BeaconBuilder.registerBeaconRegions = function (identifier, uuid) {
		if (identifier && uuid) {
			BeaconBuilder.hasRegion = true;
		}

		BeaconBuilder.registeredRegion[identifier + uuid] = {
			identifier: identifier,
			uuid: uuid
		};
	};


	/*
	 * Build the registered regions
	 */
	BeaconBuilder.buildBeaconRegions = function () {

		var tempRegisteredRegion = BeaconBuilder.registeredRegion;

		for (var prop in tempRegisteredRegion) {
			var region = BeaconBuilder.registeredRegion[prop];
			$cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(region.identifier, region.uuid));
		}
	};

	/*
	 * Build a collection of iBeacons
	 * @param rslt detected iBeacons
	 */
	BeaconBuilder.buildDetectedBeaconCollection = function (rslt) {
		var uniqueBeaconKey;

		for (var i = 0; i < rslt.beacons.length; i++) {
			uniqueBeaconKey = rslt.beacons[i].uuid +
				":" + rslt.beacons[i].major +
				":" + rslt.beacons[i].minor;

			BeaconBuilder.beaconCollection[uniqueBeaconKey] = {
				beacon: rslt.beacons[i],
				registeredTime: BeaconBuilder.timeInSecond()
			};
		}

		BeaconBuilder.clearInactiveBeacons();
	};

	/*
	 * @return Current time time in seconds
	 */
	BeaconBuilder.timeInSecond = function () {
		return Math.floor(Date.now() / 1000);
	};


	/*
	 * Notify a range event change from a registered iBeacon
	 */
	BeaconBuilder.notifyBeaconsRangeChange = function () {
		$rootScope.$broadcast(BeaconBuilder.notifyEvent, BeaconBuilder.beaconCollection);
	};

	/*
	 * Clean inactive beacons from the list of active collections
	 */
	BeaconBuilder.clearInactiveBeacons = function () {

		var nowInSec = BeaconBuilder.timeInSecond();
		var tempBeaconCollection = BeaconBuilder.beaconCollection;

		for (var prop in tempBeaconCollection) {
			var beacon = BeaconBuilder.beaconCollection[prop];
			var diffInSec = nowInSec - beacon.registeredTime;

			if (diffInSec >= BeaconBuilder.inactivelimitSec) {
				delete BeaconBuilder.beaconCollection[prop];
			}
		}
	};

	return {
		BeaconBuilder: {
			init: BeaconBuilder.init,
			notifyEvent: BeaconBuilder.notifyEvent,
			registerBeaconRegions: BeaconBuilder.registerBeaconRegions,
			proximity: BeaconBuilder.proximity
		}
	};
})
