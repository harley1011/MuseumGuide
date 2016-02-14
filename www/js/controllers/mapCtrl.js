angular.module('controllers')
	.controller('mapCtrl', function ($scope, iBeaconSrvc, storyLinePathSrvc, mapDataSrvc) {
		var mapData;

		(function init() {

			mapData = mapDataSrvc.mapData; //get JSON map data

			$scope.currentLevel = mapData.level[0];
			$scope.showID = false; //set to true to show point IDs on the map

			$scope.changeLevel = function (level) {
				var mapData = mapDataSrvc.mapData;
				$scope.currentLevel = mapData.level[level - 1];
				prepareData(mapData);
			};

			$scope.$on('storyLineChosen', function (event, storyLine) {
				var mapData = mapDataSrvc.mapData;
				$scope.storyLineID = storyLine.id;
				prepareData(mapData);
			});

			prepareData(mapData);
			trackBeacons();
		})();


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

			angular.forEach($scope.mapPoints, function (point, pkey) {
				$scope.mapPoints[pkey].current = false;

				angular.forEach($scope.mapBeacons, function (beaconInrange, bkey) {
					if (point.beaconId === beaconInrange.beacon.uuid && beaconInrange.beacon.proximity === "ProximityImmediate") {
						$scope.mapPoints[pkey].current = true;
					}
				});

			});
		}

		function prepareData(mapData) {
			var storyLines = mapData.storyline;
			var story = null;

			if ($scope.storyLineID == null)
				$scope.storyLineID = storyLines[0].id;

			var storyLineNum = $scope.storyLineID;

			//get storyline
			angular.forEach(storyLines, function (storyLine, key) {
				if (storyLine.id == storyLineNum)
					story = storyLine;
			});

			//get image dimensions
			var imgDimensions = {
				width: $scope.currentLevel.map.width,
				height: $scope.currentLevel.map.height
			};

			//store points of interest to be shown on the map
			$scope.mapPoints = [];
			var points = mapData.point;
			var storyPoints = story.points;

			angular.forEach(points, function (point, key) {
				if ((storyPoints.indexOf(point.id) != -1 && point.coordinate.z == $scope.currentLevel.number) ||
					(point.type == "fac" && point.coordinate.z == $scope.currentLevel.number)) {

					var diameter = point.style.diameter;
					var current = false;

					$scope.mapPoints.push({
						id: point.id,
						beaconId: point.beacon_id,
						left: storyLinePathSrvc.toPercentage(point.coordinate.x - (diameter / 2), imgDimensions.width),
						top: storyLinePathSrvc.toPercentage(point.coordinate.y - (diameter / 2), imgDimensions.height),
						color: point.style.color,
						diameterX: storyLinePathSrvc.toPercentage(diameter, imgDimensions.width),
						diameterY: storyLinePathSrvc.toPercentage(diameter, imgDimensions.height),
						current: current
					});
				}
			});

			var paths = storyLinePathSrvc.storyLinePath($scope, story, points);

			//store lines connecting points of interest
			$scope.mapLines = [];
			angular.forEach(paths, function (path, key) {
				if (path[2]) { //if line needs to be drawn
					var vector = storyLinePathSrvc.lineVector(path[0], path[1], imgDimensions);
					vector.color = '#ff3333';
					vector.height = '1px';
					$scope.mapLines.push(vector);
				}
			});
		}
	})
