angular.module('controllers')
	.controller('mapCtrl',
	function ($scope, $state, $translatePartialLoader, $ionicPopup, $translate, iBeaconSrvc, storyLinePathSrvc, pointSrvc, storylineSrvc, floorSrvc, exploreModeSrvc) {

		(function init() {
			$translatePartialLoader.addPart('map');
			//set to true to show point IDs on the map
			//dead feature, can only be triggered by modifying the code
			$scope.showID = false;
			$scope.mapPoints = {};
			$scope.hideBeaconPlayerContainer = true;

			$scope.changeFloor = function (z) {
				floorSrvc.setCurrentFloor(floorSrvc.getFloorsByNumber([z])[0]);
				$scope.$broadcast('floorChanged', {});
				executeMode();
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

			$scope.hideBeaconPlayer = function(){
				$scope.hideBeaconPlayerContainer = true;
				$scope.$broadcast('stopBeaconPlayer', {});
			};

			$scope.getTitle = function(){
				var title = "Hello World";
				if($scope.mode === 1){
					var storyline = getCurrentStoryline();
					if(storyline !== undefined){
						if($translate.use() === "en")
							title = storyline.getTitleWithLanguage("en_us");
						else if($translate.use() === "fr")
							title = storyline.getTitleWithLanguage("fr_ca");
					}
				}
				else if($scope.mode === 2){
					if($translate.use() === "en")
						title = "Free Roaming";
					else if($translate.use() === "fr")
						title = "Marche Libre";
				}
				else if($scope.mode === 3){
					if($translate.use() === "en")
						title = "Find Facilities";
					else if($translate.use() === "fr")
						title = "Trouver Des Installations";
				}
				return title;
			}

			$scope.$on('storyLineChosen', function (event, storyLine) {
				$scope.mode = 1;
				storylineSrvc.setCurrentStoryline(storyLine);
				$scope.alreadyPopup = [];
				prepareData();
			});

			$scope.$on('freeRoam', function (event, storyLine) {
				$scope.mode = 2;
				freeRoam();
			});

			$scope.$on('findFacilities', function (event, storyLine) {
				$scope.mode = 3;
				findFacilities();
			});



			$scope.changeFloor(1);


			if($scope.mode === undefined){
				//storyline mode

                var exploreMode = exploreModeSrvc.getMode();
                if(exploreMode == 0) {
                    $scope.mode = 1;
                } else if(exploreMode == 1){
                    $scope.mode = exploreModeSrvc.getMode();
                    var story = exploreModeSrvc.getSelectedStoryline();
                    storylineSrvc.setCurrentStoryline(story);
                } else {
                    $scope.mode = exploreModeSrvc.getMode();
                }
			}


			executeMode();
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
							beaconInrange.beacon.proximity === iBeaconSrvc.BeaconBuilder.proximity.immediate) {
							$scope.setPointInRange($scope.mapPoints[key]);
							if($scope.alreadyPopup.indexOf(points[key].getUUID()) == -1) {
								$scope.alreadyPopup.push(points[key].getUUID());
								showPopup(points[key].getUUID(),points[key].getUUID());

								$scope.hideBeaconPlayerContainer = false; // could be moved to directive
								$scope.$broadcast('playBeaconPlayer', {});
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
			$scope.$broadcast('stopBeaconPlayer', {});

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
					 (storyPoints.indexOf(pt.getUUID()) != -1 || (pt instanceof PointOfTransition))) {
					//Adding points to be shown
					var label = undefined;
					if(pt instanceof PointOfTransition)
						label = pt.getLabel();

					if(label === undefined || label.label !== "intersection"){
						gpt = new GraphicalPoint(pt, dimensions);
						$scope.mapPoints[pt.getUUID()] = gpt;
					}
				}
			}
			return currpoints;
		}

		function executeMode(){
			if($scope.mode === 1)
				//storyline mode
				prepareData();
			else if($scope.mode === 2)
				//free roaming mode
				freeRoam();
			else if($scope.mode === 3)
				//find facilities
				findFacilities();
		}

		function prepareData() {
			if($scope.mode !== 1)
				return;

			var floorNum = floorSrvc.getCurrentFloor().getNumber(),
					story = getCurrentStoryline(),
					dimensions = floorSrvc.getCurrentFloor().getPlan().getDimensions(),
					points, paths;

			//store points of current storyline intersected with floor points
			$scope.mapPoints = {};
			points = getStorylineAndFloorPoints(story, floorNum);

			//store lines connecting points of interest
			$scope.mapLines = [];
			/*paths = storyLinePathSrvc.storyLinePath(floorNum, story, points);
			if(paths !== null){
				for(var i = 0; i < paths.length; i++){
					if (paths[i][2]) { //if line needs to be drawn
						$scope.mapLines.push(new Vector(paths[i][0], paths[i][1], dimensions));
					}
				}
			}*/
		}

		function freeRoam() {
			$scope.mapPoints = {};
			$scope.mapLines = {};
			var allpoints = pointSrvc.getPoints(),
					floorNum = floorSrvc.getCurrentFloor().getNumber(),
					dimensions = floorSrvc.getCurrentFloor().getPlan().getDimensions(),
					pt, coord, gpt;

			for(var i = 0; i < allpoints.length; i++){
				pt = allpoints[i];
				coord = pt.getCoordinates();
				//Check if Point is either part of current Storyline on the current floor
				//or if a PointOfTransition on current Floor.
				if (coord.z == floorNum &&
					 ((pt instanceof PointOfInterest) || (pt instanceof PointOfTransition))) {
					//Adding points to be shown
					var label = undefined;
					if(pt instanceof PointOfTransition)
						label = pt.getLabel();

					if(label === undefined || label.label !== "intersection"){
						gpt = new GraphicalPoint(pt, dimensions);
						$scope.mapPoints[pt.getUUID()] = gpt;
					}
				}
			}
		};

		function findFacilities() {
			$scope.mapPoints = {};
			$scope.mapLines = {};
		};
	});
