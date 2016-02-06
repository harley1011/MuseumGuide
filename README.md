![build status](http://prive.myds.me:3000/harley1011/museumguide/badge?branche=master)

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [IBeacon](#ibeacon)
		- [1. Create a new region and add your iBeacons](#1-create-a-new-region-and-add-your-ibeacons)
		- [2. Listen to iBeacons events from your controllers](#2-listen-to-ibeacons-events-from-your-controllers)
		- [3. Understand what your are listening to](#3-understand-what-your-are-listening-to)
- [Full example of a the test repeater](#full-example-of-a-the-test-repeater)
		- [iBeacon proposed build procedure](#ibeacon-proposed-build-procedure)
	- [Problem Solving](#problem-solving)
		- [1. `cordova is undefined`](#1-cordova-is-undefined)
- [Unit Testing](#unit-testing)
- [CI Automated Test](#ci-automated-test)
- [Changelog](#changelog)

<!-- /TOC -->

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

```javascript
angular.module('controllers')
    .controller('AppCtrl', function($scope) {

    })
```

You can then start adding functionality to your controller.

The same process is used for creating directives and services.

The command "gulp default" will append all these files in the folders controllers, directives, and services to one file for each folder.


# IBeacon

Getting proximity data from the IBeacons service using Ranging.
[Understand Ranging](http://developer.estimote.com/ibeacon/tutorial/part-3-ranging-beacons/),
[Ranging vs Monitoring](https://community.estimote.com/hc/en-us/articles/203356607-What-are-region-Monitoring-and-Ranging-)

Checklist
==============
1. Valid list of iBeacon UUID
2. Working android phone with Developer mode active
3. Lots of patience

Getting Started
===============
Location:
`www > js > services > iBeaconSrvs.js`

###1. Create a new region and add your iBeacons

```javascript     
function _registerBeaconRegions() {
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("identifier", "UUID"));
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("secondBeacon", "UUID"));
		$cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("thirdBeacon", "UUID"));
		$cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("NBeacon", "UUID"));
    }
```

###2. Listen to iBeacons events from your controllers
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

###3. Understand what your are listening to

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

```
accuracy: 0.19
major: "513"
minor: "45686"
proximity: "ProximityImmediate"
rssi: -61
tx: -74
uuid: "b9407f30-f5f8-466e-aff9-25
```


 Proximity           | Description           											
 -------------------|----------------------------------------------------------
ProximityImmediate   | (strong signal; usually up to a few centimeters)			 
 ProximityNear       | (medium signal; usually up to a few meters)      			 
 ProximityFar        | (weak signal; more than a few meters)    					    
 ProximityUnknown    | (“hard to say”, usually when the signal is very, very weak)   


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

### iBeacon proposed build procedure
DEPRECATED: `$ gulp;ionic build android; ionic run android`

You may now use: `npm test; ionic build; ionic run android` to test your changes. The first command `npm test` will run gulp and also run the unit-test.
The second `ionic build android; ionic run android` will launch debug on your phone.

** Note Windows users have to replace `npm test` with `npm run-script test-win` **

## Problem Solving
###1. `cordova is undefined`
 if you get the error message `cordova is undefined` while using `ionic serve` it's because `cordova.js` is only built
when you run the code on a phone. To resolve the problem, add your browser as a platform like this `ionic platform add browser --usegit`
then use `ionic build browser` and `ionic run browser`. You might need to add the class `platform-browser` in the body tag of the index.html file.
Don't forget to refresh the webpage if you update the source code.

1. `ionic platform add browser --usegit`
2. add class `platform-browser` in the tag `<body ng-app="start" class="platform-browser">` if not present
3. `npm test`
4. `ionic build browser`
5. `ionic run browser`
6. Refresh page if nothing happen

* Note for step 3, if you get error message concerning karma, please refer to the  [Unit Testing](#unit-testing) section.


# Unit Testing
The project uses Karma and Jasmine to run our unit test. Please install the fallowing package and run `npm test.

** Note Windows users have to replace `npm test` with `npm run-script test-win` **

```
npm install karma
npm install -g karma-cli
npm install phantomjs-prebuilt --save-dev
npm test
```

# CI Automated Test

When changes are made on master, develop or release branch, an automated test will run on the CI server. What your slack channel #build and your JobID to see if you broke something.


# Changelog

0.1
-------------
- Get direction between POI
- Getting location information from iBeacons
