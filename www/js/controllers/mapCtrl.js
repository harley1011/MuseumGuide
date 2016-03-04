angular.module('controllers')
	.controller('mapCtrl', function ($scope, $state, $translatePartialLoader, iBeaconSrvc, storyLinePathSrvc, JSONFactorySrvc, $interval, $ionicPopup) {
		var mapData = {};

        $scope.getDetails = function () {
            $state.go('tab.details');
        };

		(function init() {
			$translatePartialLoader.addPart('map');

			mapData.point = JSONFactorySrvc.load("points");
			mapData.storyline = JSONFactorySrvc.load("storylines");
			mapData.beacon = JSONFactorySrvc.load("beacons");
			mapData.floor = JSONFactorySrvc.load("floors");

			$scope.currentFloor = mapData.floor[0];
			$scope.showID = false; //set to true to show point IDs on the map

			$scope.changeFloor = function (z) {
				$scope.currentFloor = mapData.floor[z - 1];
				prepareData(mapData);
			};


			$scope.$on('storyLineChosen', function (event, storyLine) {
				$scope.storyLineID = storyLine.getUUID();
				$scope.alreadyPopup = [];
				prepareData(mapData);
			});

			prepareData(mapData);
			trackBeacons();
		})();


		function showPopup (title, message) {
			var titleDisplayed = 'Notification';
			var messageDisplayed = 'Hi, You have arrived! Tap on "More details" for additional information about this area.';

			if(title !== null && title !== "")
				titleDisplayed = title;

			if(message !== null && message !== "")
				messageDisplayed = message;

			$ionicPopup.show({
				template: messageDisplayed,
				title: titleDisplayed,
				custom: true,
				buttons: [
					{ text: '',
						type: 'button-cancel ion-close-circled'},
					{
						text: 'More Details',
						type: 'button-more-details',
						onTap: function(e) {}
					}
				]
			});
		}

		function trackBeacons() {
			var beaconSrvc = iBeaconSrvc.BeaconBuilder;

			//Register beacons
			beaconSrvc.registerBeaconRegions("Ipod", "8492e75f-4fd6-469d-b132-043fe94921d8");
			beaconSrvc.registerBeaconRegions("School", "b9407f30-f5f8-466e-aff9-25556b57fe6d");

			// Intialize beacon services
			beaconSrvc.init();

			//Listen to proximity change events
			$scope.$on(beaconSrvc.notifyEvent, function (event, value) {

				$scope.$apply(function(){
					$scope.mapBeacons = value;
					updateMapPointsBlink();
				});
			});
		}

		function updateMapPointsBlink() {
			if($scope.alreadyPopup === undefined)
				$scope.alreadyPopup = [];

			var points = $scope.mapPoints,
					key,
					//Took it out of the forEach because creating a function for each point is hefty
					loopFunc = function (points, key, beaconInrange, bkey) {
						if (points[key].getBeaconID() &&
								points[key].getBeaconID() === beaconInrange.beacon.uuid &&
							beaconInrange.beacon.proximity === "ProximityImmediate") {
							$scope.mapPoints[key].setCurrent(true);
							if($scope.alreadyPopup.indexOf(points[key].getUUID()) == -1) {
								$scope.alreadyPopup.push(points[key].getUUID());
								showPopup(points[key].getUUID(),points[key].getUUID());
							}
							$scope.$broadcast('updateMapPointsBlink', {});
							return true;
						}else{
							$scope.$broadcast('updateMapPointsBlink', {});
							$scope.mapPoints[key].setCurrent(false);
							return false;
						}
					};
			for(var key in points){
				points[key].setCurrent(false);
				for(var bkey in $scope.mapBeacons){
					loopFunc(points, key, $scope.mapBeacons[bkey], bkey);
				}
			}
		}

		function getCurrentStoryline(mapData){
			var storyLines = mapData.storyline,
				story;

			//get storyline
			if ($scope.storyLineID === undefined){
				$scope.storyLineID = storyLines[0].getUUID();
				story = storyLines[0];
			}else{
				for(var i = 0; i < storyLines.length; i++) {
					if (storyLines[i].getUUID() === $scope.storyLineID){
						story = storyLines[i];
					}
				}
			}
			return story;
		}

		function getStorylineAndFloorPoints(mapData, story, floorNum){
			//store points of interest to be shown on the map
			var allpoints = mapData.point,
					currpoints = {},
					storyPoints = story.getPoints(),
					dimensions = $scope.currentFloor.getPlan().getDimensions(),
					pt, gpt, coord, id;
			for(var i = 0; i < allpoints.length; i++){
				pt = allpoints[i];
				currpoints[pt.getUUID()] = pt;
				coord = pt.getCoordinates();
				//Check if Point is either part of current Storyline on the current floor
				//or if a PointOfTransition on current Floor.
				if (coord.z == floorNum &&
					 (storyPoints.indexOf(pt.getUUID()) != -1 ||
					 (pt instanceof PointOfTransition && pt.getType() && pt.getType() !== "intersection"))) {
					//Adding points to be shown
					gpt = new GraphicalPoint(pt, dimensions);
					$scope.mapPoints[pt.getUUID()] = gpt;
				}
			}
			return currpoints;
		}

		function prepareData(mapData) {
			var floorNum = $scope.currentFloor.getNumber(),
					story = getCurrentStoryline(mapData),
					dimensions = $scope.currentFloor.getPlan().getDimensions(),
					points, paths;

			//store points of current storyline intersected with floor points
			$scope.mapPoints = {};
			points = getStorylineAndFloorPoints(mapData, story, floorNum);

			//store lines connecting points of interest
			$scope.mapLines = [];
			paths = storyLinePathSrvc.storyLinePath(floorNum, story, points);
			if(paths !== null){
				for(var i = 0; i < paths.length; i++){
					if (paths[i][2]) { //if line needs to be drawn
						$scope.mapLines.push(new Vector(paths[i][0], paths[i][1], dimensions));
					}
				}
			}
		}
	});
