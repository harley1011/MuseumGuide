angular.module('services')

.service('iBeaconSrvc', function($rootScope, $ionicPlatform, $cordovaBeacon) {
    var BeaconBuilder = {};
    var _counter;
    var _inactivelimitSec = 5;

    var _timeInSecond = function() {
        return Math.floor(Date.now() / 1000);
    };

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

    function _buildBeaconCollection(rslt) {
        var uniqueBeaconKey;

        for (var i = 0; i < rslt.beacons.length; i++) {
            uniqueBeaconKey = rslt.beacons[i].uuid +
                ":" + rslt.beacons[i].major +
                ":" + rslt.beacons[i].minor;

            BeaconBuilder.beaconCollection[uniqueBeaconKey] = {
                beacon: rslt.beacons[i],
                registeredTime: _timeInSecond()
            };
        }
		
        _clearInactiveBeacons();
    }

    function _registerBeaconRegions() {
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("Ipod", "8492e75f-4fd6-469d-b132-043fe94921d8"));
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("School", "b9407f30-f5f8-466e-aff9-25556b57fe6d"));
    }

    function _notifyBeaconsRangeChange() {
        $rootScope.$broadcast(BeaconBuilder.notifyEvent, BeaconBuilder.beaconCollection);
    }

    function _clearInactiveBeacons() {
        if (_counter < 5) {
            _counter += 1;
            return;
        }

        var nowInSec = _timeInSecond();
        var tempBeaconCollection = BeaconBuilder.beaconCollection;

        for (var prop in tempBeaconCollection) {
            var beacon = BeaconBuilder.beaconCollection[prop];
            var diffInSec = nowInSec - beacon.registeredTime;

            if (diffInSec >= _inactivelimitSec) {
                delete BeaconBuilder.beaconCollection[prop];
            }
        }
        _counter = 0;
    }

    return {
        BeaconBuilder: BeaconBuilder
    };
})
