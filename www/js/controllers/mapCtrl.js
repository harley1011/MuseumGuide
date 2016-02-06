angular.module('controllers')

.controller('mapCtrl', function ($scope, iBeaconSrvc, storyLinePathSrvc, mapDataSrvc) {

	/*
	 * Intialize controller
	 */
	(function init(){
		trackBeacons();
		renderMap();
	})();

	/*
	 * Register beacons
	 */
 	function trackBeacons() {
		var beaconSrvc = iBeaconSrvc.BeaconBuilder;

		//Register beacons
		beaconSrvc.registerBeaconRegions("Ipod", "8492e75f-4fd6-469d-b132-043fe94921d8");
		beaconSrvc.registerBeaconRegions("School", "b9407f30-f5f8-466e-aff9-25556b57fe6d");

		// Intialize beacon services
		beaconSrvc.init();

		//Listen to proximity change events
		$scope.$on(beaconSrvc.notifyEvent, function (event, value) {
			$scope.mapBeacons = value;
			$scope.$apply();
		});
	}

	/*
	 * Render map
	 */
	 function renderMap() {

		/// MAP RENDERER
		var mapData = mapDataSrvc.mapData;

		$scope.currentLevel = mapData.level[0];

		$scope.changeLevel = function (level) {
			$scope.currentLevel = mapData.level[level - 1];
		};

		var currentFloor = 1; //TODO this value will later on be assigned
		var storyLineNum = 1; //TODO this value will later on be assigned
		var storyLines = mapData.storyline;
		var story = null;

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
			if (storyPoints.indexOf(point.id) != -1 && point.coordinate.z == $scope.currentLevel.number) {
				var diameter = point.style.diameter;
				$scope.mapPoints.push({
					left: storyLinePathSrvc.toPercentage(point.coordinate.x - (diameter / 2), imgDimensions.width),
					top: storyLinePathSrvc.toPercentage(point.coordinate.y - (diameter / 2), imgDimensions.height),
					color: point.style.color,
					diameterX: storyLinePathSrvc.toPercentage(diameter, imgDimensions.width),
					diameterY: storyLinePathSrvc.toPercentage(diameter, imgDimensions.height)
				});
			}
		});

		var paths = storyLinePathSrvc.storyLinePath(story, points);

		//store lines connecting points of interest
		$scope.mapLines = [];
		angular.forEach(paths, function (path, key) {
			var vector = storyLinePathSrvc.lineVector(path[0], path[1], imgDimensions);
			vector.color = '#ff3333';
			vector.height = '1px';
			$scope.mapLines.push(vector);
		});
	}
})
