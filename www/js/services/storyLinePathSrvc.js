angular.module('services')

.service('storyLinePathSrvc', function (mapDataSrvc) {

	function storyLinePath(storyLine, points) {
		var storyPoints = storyLine.points;

		//copy necessary points information and index with the id
		var pointsList = getPointData(points);

		//go through each story point of interest
		var path = [];
		var current = pointsList["" + storyPoints[0]];
		for (var i = 1; i < storyPoints.length; i++) {
			console.log("Building path to POI " + storyPoints[i]);
			var destination = pointsList["" + storyPoints[i]];
			path = path.concat(dijkstra(current, destination, points));
			current = destination;
		}

		return path;
	}

	function lineVector(point1, point2, imgDimensions) {
		var vector = [];
		vector.magnitude = toPercentage(vectorMagnitude(point1, point2), imgDimensions.width);
		vector.angle = Math.atan((point2.y - point1.y) / (point2.x - point1.x)) * 180 / Math.PI; //in degrees
		console.log(vector.magnitude + ", " + vector.angle);

		// point1 - (3,4)  point2 - (4,3)   deg = -45
		// point1 - (3,4)  point2 - (4,5)   deg = 45
		// point1 - (3,4)  point2 - (2,5)   deg = -45 ...should be (-45+180) = 135
		// point1 - (3,4)  point2 - (2,3)   deg = 45 ...should be (45+180) = 225
		if (point2.x < point1.x)
			vector.angle += 180;

		vector.position = {
			"x": toPercentage(point1.x, imgDimensions.width),
			"y": toPercentage(point1.y, imgDimensions.height)
		};

		return vector;
	}

	function toPercentage(num, imgDimension) {
		return 100 * num / imgDimension;
	}

	function vectorMagnitude(point1, point2) {
		return Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
	}

	function dijkstra(source, destination, points) {

		//copy necessary points information and index with the id
		var pointsList = getPointData(points);

		//go through each story point of interest
		var path = [];

		var current = pointsList["" + source.id];
		current.visited = true;
		current.minDistance = 0;

		while (current.id != destination.id) {
			var direction = getDestinations(current, path, pointsList, destination);
			current = direction.current;
			path = direction.path;
		}

		return path;
	}

	function getDestinations(currentLoc, pathLoc, pointsList, destination) {
		var current = currentLoc;
		var path = pathLoc;

		var closestNeighbour = null;
		var neighbours = current.neighbours;
		var allVisited = true;

		console.log("Current: " + current.id);

		for (var i = 0; i < neighbours.length; i++) {
			var neighbourID = neighbours[i];
			var neighbour = pointsList["" + neighbourID];

			if (neighbourID == destination.id) {
				closestNeighbour = neighbour;
				allVisited = false;
				console.log("Found POI " + neighbour.id);
				break;
			}

			if (!neighbour.visited) {
				allVisited = false;
				var distance = vectorMagnitude(current, neighbour) + current.minDistance;
				if (distance < neighbour.minDistance || neighbour.minDistance == -1)
					neighbour.minDistance = distance;

				if (closestNeighbour === null || neighbour.minDistance < closestNeighbour.minDistance)
					closestNeighbour = neighbour;
			}

			var visitedString = "";
			if (neighbour.visited)
				visitedString = " (V)";

			console.log("Neighbour " + neighbour.id + visitedString + " minD " + neighbour.minDistance.toFixed(2));
		}

		current.visited = true;

		if (allVisited) {
			var previousPath = path.pop();
			current = previousPath[0];
			console.log("Dead end");
		} else {
			path.push([current, closestNeighbour]);
			current = closestNeighbour;
		}

		return {
			current: current,
			path: path
		};
	}

	function getPointData(points) {
		//copy necessary points information and index with the id
		var pointsList = [];
		angular.forEach(points, function (point, key) {
			var pointData = [];
			pointData.id = point.id;
			pointData.x = point.coordinate.x;
			pointData.y = point.coordinate.y;
			pointData.visited = false;
			pointData.minDistance = -1;
			pointData.neighbours = point.neighbours;
			pointsList["" + point.id] = pointData;
		});

		return pointsList;
	}

	return {
		storyLinePath: storyLinePath,
		toPercentage: toPercentage,
		lineVector: lineVector
	};
})
