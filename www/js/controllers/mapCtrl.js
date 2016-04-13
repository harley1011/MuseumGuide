angular.module('controllers')
	.controller('mapCtrl',
		function ($scope, $rootScope, $state, $translatePartialLoader, $ionicPopup, $ionicModal, $translate, iBeaconSrvc, storyLinePathSrvc, pointSrvc, storylineSrvc, floorSrvc, exploreModeSrvc, edgeSrvc, beaconMediaSrvc) {

			(function init() {
				$translatePartialLoader.addPart('map');
				//set to true to show point IDs on the map
				//dead feature, can only be triggered by modifying the code
				$scope.showID = false;
				$scope.mapPoints = {};
				$scope.hideBeaconPlayerContainer = true;


				$scope.changeFloor = function (z) {
					floorSrvc.setCurrentFloor(floorSrvc.getFloorsByNumber([z])[0]);
					$rootScope.$broadcast('floorChanged', {});
					executeMode();
				};

				$scope.getCurrentFloorNumber = function () {
					return floorSrvc.getCurrentFloor().getNumber();
				};

				$scope.setCurrentPoint = function (point) {
					pointSrvc.setCurrentPoint(pointSrvc.getNonGraphicalPoint(point));
				};

				$scope.setPointInRange = function (point) {
					pointSrvc.setPointInRange(pointSrvc.getNonGraphicalPoint(point));
				};

				$scope.getDetails = function () {
					$state.go('tab.details');
				};

				$scope.hideBeaconPlayer = function () {
					$scope.hideBeaconPlayerContainer = true;
					$scope.$broadcast('stopBeaconPlayer', {});
				};

				$scope.getTitle = function () {
					var title = "Hello World";
					if ($scope.mode === 1) {
						var storyline = getCurrentStoryline();
						if (storyline !== undefined) {
							if ($translate.use() === "en")
								title = storyline.getTitleWithLanguage("en");
							else if ($translate.use() === "fr")
								title = storyline.getTitleWithLanguage("fr");
						}
					} else if ($scope.mode === 2) {
						if ($translate.use() === "en")
							title = "Free Roaming";
						else if ($translate.use() === "fr")
							title = "Marche Libre";
					} else if ($scope.mode === 3) {
						if ($translate.use() === "en")
							title = "Find Facilities";
						else if ($translate.use() === "fr")
							title = "Trouver Des Installations";
					}
					return title;
				}

				$scope.$on('loadBeacons', function () {
					console.log('tracking beacon');
					trackBeacons();
				});

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

				$scope.$on('findFacilities', function (event, facility) {
					$scope.mode = 3;
					$scope.facility = facility;
					findFacilities(facility);
				});


				$scope.changeFloor(floorSrvc.getFloors()[0].getNumber());


				if ($scope.mode === undefined) {
					//storyline mode

					var exploreMode = exploreModeSrvc.getMode();
					if (exploreMode == 0) {
						$scope.mode = 1;
					} else if (exploreMode == 1) {
						$scope.mode = exploreModeSrvc.getMode();
						var story = exploreModeSrvc.getSelectedStoryline();
						storylineSrvc.setCurrentStoryline(story);
					} else {
						$scope.mode = exploreModeSrvc.getMode();
					}
				}


				executeMode();
			})();

			function showPopup(title, message) {
				var titleDisplayed = 'Notification';
				var messageDisplayed = 'Hi, You have arrived! Tap on "More details" for additional information about this area.';
				var msgDispFr = "Bonjour, Vous êtes arrivés!";
				var msgBtnFr = "Plus d'information";
				var btntextPop = "More Details";

				if ($translate.use() === "fr"){
					messageDisplayed = msgDispFr;
					btntextPop = msgBtnFr;
				}

				if (title !== null && title !== "")
					titleDisplayed = title;

				if (message !== null && message !== "")
					messageDisplayed = message;

				$ionicPopup.show({
					template: messageDisplayed,
					title: titleDisplayed,
					custom: true,
					buttons: [{
						text: '',
						type: 'button-cancel ion-close-circled'
					}, {
						text: btntextPop,
						type: 'button-more-details',
						onTap: function (e) {
							$scope.getDetails();
						}
					}]
				});
			}

			function trackBeacons() {
				var beaconSrvc = iBeaconSrvc.BeaconBuilder;

				beaconSrvc.getAllBeacons().forEach(function (beacon) {
					beaconSrvc.registerBeaconRegions(beacon.getUUID() + beacon.getMajor(), beacon.getUUID(), beacon.getMajor(), beacon.getMinor());
				});
				// Intialize beacon services
				beaconSrvc.init();

				//Listen to proximity change events
				$scope.$on(beaconSrvc.notifyEvent, function (event, value) {

					$scope.$apply(function () {
						$scope.mapBeacons = value;
						updateMapPointsBlink();
					});
				});
			}

			function updateMapPointsBlink() {

				if ($scope.alreadyPopup === undefined)
					$scope.alreadyPopup = [];

				var points = $scope.mapPoints,
					key,
					//Took it out of the forEach because creating a function for each point is hefty
					loopFunc = function (points, key, beaconInrange, bkey) {
						var beacon = points[key].getBeacon();
						if (beacon && beacon.uuid.toLowerCase() === beaconInrange.beacon.uuid.toLowerCase() &&
							beacon.major === beaconInrange.beacon.major &&
							beacon.minor === beaconInrange.beacon.minor &&
							beaconInrange.beacon.accuracy <= 2) {
							$scope.setPointInRange($scope.mapPoints[key]);
							if ($scope.alreadyPopup.indexOf(points[key].getUUID()) == -1) {
								$scope.alreadyPopup.push(points[key].getUUID());
								$scope.setCurrentPoint($scope.mapPoints[key]);

								$scope.hideBeaconPlayerContainer = true; // hide last point player

								if ($scope.mode === 2) {
									showPopup(null, null);
								}

								if ($scope.mode === 1) { // CHANGE MODE TO 1 for storyline only
									if (beaconMediaSrvc.video() !== undefined) {
										$scope.$broadcast('pauseBeaconPlayer', {});

										$ionicModal.fromTemplateUrl('templates/beacon-video-modal.html', {
											scope: $scope,
											animation: 'slide-in-up',
											focusFirstInput: true
										}).then(function (modal) {
											$scope.modalVid = modal;
											$scope.beaconVidCap = beaconMediaSrvc.video().caption;
											$scope.beaconVidSrc = "../www/" + beaconMediaSrvc.video().path;
											$scope.modalVid.show();
										});
									} else if(beaconMediaSrvc.audio() !== undefined){

										$scope.hideBeaconPlayerContainer = false; // could be moved to directives
										$scope.$broadcast('playBeaconPlayer', {path : "../www/" + beaconMediaSrvc.audio().path});
									}else{
										// none
									}
								}
							}
							$scope.$broadcast('updateMapPointsBlink', {});

							return true;
						} else {
							$scope.$broadcast('updateMapPointsBlink', {});
							return false;
						}
					};

				pointSrvc.setPointOutOfRange();

				for (var key in points){
					for (var bkey in $scope.mapBeacons) {
						loopFunc(points, key, $scope.mapBeacons[bkey], bkey);
					}
				}
			}

			function getCurrentStoryline() {
				var storyLines = storylineSrvc.getStorylines(),
					story;

				//get storyline
				if (storylineSrvc.getCurrentStoryline() === undefined) {
					storylineSrvc.setCurrentStoryline(storyLines[0].getUUID());
					story = storyLines[0];
				} else {
					for (var i = 0; i < storyLines.length; i++) {
						if (storyLines[i].getUUID() === storylineSrvc.getCurrentStoryline().getUUID()) {
							story = storyLines[i];
						}
					}
				}
				return story;
			}

			function getStorylineAndFloorPoints(story, floorNum) {
				$scope.$broadcast('stopBeaconPlayer', {});

				//store points of interest to be shown on the map
				var allpoints = pointSrvc.getPoints(),
					currpoints = {},
					storyPoints = story.getPoints(),
					dimensions = floorSrvc.getCurrentFloor().getPlan().getDimensions(),
					pt, gpt, coord, id;
				for (var i = 0; i < allpoints.length; i++) {
					pt = allpoints[i];
					currpoints[pt.getUUID()] = pt;
					coord = pt.getCoordinates();
					//Check if Point is either part of current Storyline on the current floor
					//or if a PointOfTransition on current Floor.
					if (coord.z == floorNum &&
						(storyPoints.indexOf(pt.getUUID()) != -1 || (pt instanceof PointOfTransition))) {
						//Adding points to be shown
						var isDefault = false;
						if (pt instanceof PointOfTransition)
							isDefault = pt.isDefautLabel();

						if (!isDefault) {
							gpt = new GraphicalPoint(pt, dimensions);
							$scope.mapPoints[pt.getUUID()] = gpt;
						}
					}
				}
				return currpoints;
			}

			function getStorylineEdges(story, floorNum) {
				var storyPoints = story.getPoints(),
					edges = edgeSrvc.getEdges(),
					dimensions = floorSrvc.getCurrentFloor().getPlan().getDimensions();

				if (storyPoints === undefined || storyPoints.length === 0)
					return;

				var previousPoint = storyPoints[0];
				for (var i = 1; i < storyPoints.length; i++) {
					var point = storyPoints[i];
					var uuids = [previousPoint, point];
					var edgeNodes = pointSrvc.getPointsByUUID(uuids);
					if (edgeSrvc.getEdge(uuids) !== undefined && edgeNodes[0].getCoordinates().z === floorNum && edgeNodes[1].getCoordinates().z === floorNum)
						$scope.mapLines.push(new Vector(edgeNodes[0], edgeNodes[1], dimensions));
					previousPoint = point;
				}
			}

			function executeMode() {
				if ($scope.mode === 1)
				//storyline mode
					prepareData();
				else if ($scope.mode === 2)
				//free roaming mode
					freeRoam();
				else if ($scope.mode === 3)
				//find facilities
					findFacilities($scope.facility);
			}

			function prepareData() {
				if ($scope.mode !== 1)
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
				getStorylineEdges(story, floorNum);

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
				storylineSrvc.setFreeRoamMode();
				var allpoints = pointSrvc.getPoints(),
					floorNum = floorSrvc.getCurrentFloor().getNumber(),
					dimensions = floorSrvc.getCurrentFloor().getPlan().getDimensions(),
					pt, coord, gpt;

				for (var i = 0; i < allpoints.length; i++) {
					pt = allpoints[i];
					coord = pt.getCoordinates();
					//Check if Point is either part of current Storyline on the current floor
					//or if a PointOfTransition on current Floor.
					if (coord.z == floorNum &&
						((pt instanceof PointOfInterest) || (pt instanceof PointOfTransition))) {
						//Adding points to be shown
						var isDefault = false;
						if (pt instanceof PointOfTransition)
							isDefault = pt.isDefautLabel();

						if (!isDefault) {
							gpt = new GraphicalPoint(pt, dimensions);
							$scope.mapPoints[pt.getUUID()] = gpt;
						}
					}
				}
			};

			function findFacilities(facility) {
				$scope.mapPoints = {};
				$scope.mapLines = {};
				var allpoints = pointSrvc.getPoints(),
					floorNum = floorSrvc.getCurrentFloor().getNumber(),
					dimensions = floorSrvc.getCurrentFloor().getPlan().getDimensions(),
					pt, coord, gpt;
				facility = ((facility !== "") && (facility != undefined)) ? facility.toLowerCase() : "";

				if ($translate.use() === "fr") {
					switch (facility) {
					case "salle de bain":
						facility = "washroom";
						break;
					case "escalier":
						facility = "stairs";
						break;
					case "bureau d'information":
						facility = "front desk";
						break;
					}
				}

				for (var i = 0; i < allpoints.length; i++) {
					pt = allpoints[i];
					coord = pt.getCoordinates();
					//Check if Point is either part of current Storyline on the current floor
					//or if a PointOfTransition on current Floor.
					if (coord.z == floorNum &&
						(pt instanceof PointOfTransition)) {
						//Adding points to be shown
						var isDefault = false;
						if (pt instanceof PointOfTransition)
							isDefault = pt.isDefautLabel();

						if (!isDefault) {
							gpt = new GraphicalPoint(pt, dimensions);
							if (pt.getLabel() == facility) {
								$scope.mapPoints[pt.getUUID()] = gpt;
							}

						}
					}
				}
			}
		});
