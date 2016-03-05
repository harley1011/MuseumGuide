angular.module('controllers')
	.controller('mapCtrl',
	function ($scope, $state, $translatePartialLoader, $ionicPopup, iBeaconSrvc, storyLinePathSrvc, pointSrvc, storylineSrvc, floorSrvc) {

		(function init() {
			$translatePartialLoader.addPart('map');
			//set to true to show point IDs on the map
			//dead feature, can only be triggered by modifying the code
			$scope.showID = false;
			$scope.mapPoints = {};

			$scope.changeFloor = function (z) {
				floorSrvc.setCurrentFloor(floorSrvc.getFloorsByNumber([z])[0]);
				prepareData();
			};

			$scope.getCurrentFloorNumber = function () {
				return floorSrvc.getCurrentFloor().getNumber();
			};

			$scope.setCurrentPoint = function(point){
				pointSrvc.setCurrentPoint(pointSrvc.getNonGraphicalPoint(point));
			};

			$scope.setPointInRange = function(point){
				pointSrvc.setPointInRange(pointSrvc.getNonGraphicalPoint(point));
			};

			$scope.getDetails = function() {
					$state.go('tab.details');
			};

			$scope.$on('storyLineChosen', function (event, storyLine) {
				storylineSrvc.setCurrentStoryline(storyLine);
				$scope.alreadyPopup = [];
				prepareData();
			});

			$scope.changeFloor(1);
			prepareData();
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
						onTap: function(e) {
							$scope.getDetails();
						}
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
							$scope.setPointInRange($scope.mapPoints[key]);
							if($scope.alreadyPopup.indexOf(points[key].getUUID()) == -1) {
								$scope.alreadyPopup.push(points[key].getUUID());
								showPopup(points[key].getUUID(),points[key].getUUID());
							}
							$scope.$broadcast('updateMapPointsBlink', {});
							return true;
						}else{
							$scope.$broadcast('updateMapPointsBlink', {});
							return false;
						}
					};
			pointSrvc.setPointOutOfRange();
			for(var key in points){
				for(var bkey in $scope.mapBeacons){
					loopFunc(points, key, $scope.mapBeacons[bkey], bkey);
				}
			}
		}

		function getCurrentStoryline(){
			var storyLines = storylineSrvc.getStorylines(),
				story;

			//get storyline
			if (storylineSrvc.getCurrentStoryline() === undefined){
				storylineSrvc.setCurrentStoryline(storyLines[0].getUUID());
				story = storyLines[0];
			}else{
				for(var i = 0; i < storyLines.length; i++) {
					if (storyLines[i].getUUID() === storylineSrvc.getCurrentStoryline().getUUID()){
						story = storyLines[i];
					}
				}
			}
			return story;
		}

		function getStorylineAndFloorPoints(story, floorNum){
			//store points of interest to be shown on the map
			var allpoints = pointSrvc.getPoints(),
					currpoints = {},
					storyPoints = story.getPoints(),
					dimensions = floorSrvc.getCurrentFloor().getPlan().getDimensions(),
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

		function prepareData() {
			var floorNum = floorSrvc.getCurrentFloor().getNumber(),
					story = getCurrentStoryline(),
					dimensions = floorSrvc.getCurrentFloor().getPlan().getDimensions(),
					points, paths;

			//store points of current storyline intersected with floor points
			$scope.mapPoints = {};
			points = getStorylineAndFloorPoints(story, floorNum);

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
