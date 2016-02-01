#Build Status LM-MainNode CI
![build status](http://prive.myds.me:3000/harley1011/museumguide/badge?branche=master)

# Getting Started

There are a few ways you can run this application from the command line.
The commands:
"ionic serve" will launch a local web server where you will see the application inside a browser
"ionic run android" will launch the application on either an android emulator or your android device if it is plugged in and developer mode is enabled. Note that you will need the Android SDK to run this command
"ionic run ios" will launch the application on an iOS simulator, you must have xCode to be able to run this command

# Project Structure
The project uses AngularJS so the three main components will be directives, controllers, and services

To create a controller create a new javascript file in the controllers folder.
Add the following code below and replace AppCtrl with the name of the controller.

angular.module('controllers')
    .controller('AppCtrl', function($scope) {

    })

You can then start adding functionality to your controller.

The same process is used for creating directives and services.

The command "gulp default" will append all these files in the folders controllers, directives, and services to one file for each folder.


# IBeacon

Getting proximity data from the IBeacons service

Checklist
==============
1. Valid list of iBeacon UUID
2. Working android phone with Developer mode active
3. Lots of patience

Getting Started
===============
 Required service:
`www > js > services > iBeaconSrvs.js`

1. Create a new region and add your iBeacons

```javascript     
function _registerBeaconRegions() {
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("identifier", "UUID"));
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("secondBeacon", "UUID"));
		$cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("thirdBeacon", "UUID"));
		$cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("NBeacon", "UUID"));
    }
```

2. Listen to iBeacons events from your controllers
```javascript
angular.module('controllers')
    .controller('myCtrl', function($scope, iBeaconSrvc) {

        var beaconSrvc = iBeaconSrvc.BeaconBuilder;
        beaconSrvc.init(); // Intialize beacon services

		// Listen to proximity change events
        $scope.$on(beaconSrvc.notifyEvent, function(event, value){
        	$scope.mapBeacons = value;
			$scope.$apply();
        });
```

3. Understand what your are listening to

The value returned from the listener events (notifyEvent = "$iBeaconSrvc:beaconRangeChange")

```javascript
$scope.$on(beaconSrvc.notifyEvent, function(event, value){...}
```

is a collection of iBeacon in range. Here's an example on how to access these iBeacon in range from the returned collection:

```javascript
<div class="item" ng-repeat="(key, value) in mapBeacons">
	<div class="row">
		<div class="col truncate">
			{{value.beacon.uuid}}
		</div>
	</div>
```

Example of data you can retrieve from the above collection:

```javascript
{{value.beacon.uuid}}
{{value.beacon.major}}
{{value.beacon.minor}}
{{value.beacon.proximity}}
{{value.beacon.rssi}}
{{value.beacon.accuracy}}
{{value.beacon.tx}}
```

# Full example of a the test repeater
```html
<!-- Testing layer iBeacon -->
<div ng-controller="mapCtrl">
	<div class="list">
	   <div class="item" ng-repeat="(key, value) in mapBeacons">
		   <div class="row">
			   <div class="col truncate">
				   {{value.beacon.uuid}}
			   </div>
		   </div>
		   <div class="row">
			   <div class="col">
				   major: {{value.beacon.major}}
			   </div>
			   <div class="col">
				   minor: {{value.beacon.minor}}
			   </div>
		   </div>
		   <div class="row">
			   <div class="col">
				   {{value.beacon.proximity}}
			   </div>
			   <div class="col">
				   rssi: {{value.beacon.rssi}}
			   </div>
		   </div>
		   <div class="row">
			   <div class="col">
				   accuracy: {{value.beacon.accuracy}}
			   </div>
			<div class="col">
				tx: {{value.beacon.tx}}
			</div>
		   </div>
	   </div>
	</div>
</div>

<style>
	.truncate {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
<!-- EO Testing layer iBeacon -->
```
