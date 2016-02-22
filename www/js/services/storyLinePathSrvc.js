angular.module('services')
  .service('storyLinePathSrvc', function() {

    function getPointData(points) {
      //copy necessary points information and index with the id
      var pointsList = [];
      angular.forEach(points, function(point, key) {
        var pointData = [];
        pointData.id = point.id;
        pointData.x = point.coordinate.x;
        pointData.y = point.coordinate.y;
        pointData.z = point.coordinate.z;
        pointData.visited = false;
        pointData.minDistance = -1;
        pointData.neighbours = point.neighbours;
        pointsList["" + point.id] = pointData;
      });

      return pointsList;
    }

    function calculateMagnitude(point1, point2) {
        return Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
    }

    function dijkstra($scope, source, destination, points) {

      //copy necessary points information and index with the id
      var pointsList = getPointData(points);

      //go through each story point of interest
      var path = [];
      var current = pointsList["" + source.id];
      current.visited = true;
      current.minDistance = 0;
      while (current.id != destination.id) {
        var closestNeighbour = null;
        var neighbours = current.neighbours;
        //console.log("Current: " + current.id);
        var allVisited = true;
        for (var i = 0; i < neighbours.length; i++) {
          var neighbourID = neighbours[i];
          var neighbour = pointsList["" + neighbourID];

          //check if the destination was found
          if (neighbourID == destination.id) {
            closestNeighbour = neighbour;
            allVisited = false;
            //console.log("Found POI " + neighbour.id);
            break;
          }

          //check if neighbour has already been visited
          if (!neighbour.visited) {
            allVisited = false;
            var distance = calculateMagnitude(current, neighbour) + current.minDistance;
            if (distance < neighbour.minDistance || neighbour.minDistance == -1)
              neighbour.minDistance = distance;

            if (closestNeighbour === null || neighbour.minDistance < closestNeighbour.minDistance)
              closestNeighbour = neighbour;
          }

          var visitedString = "";
          if (neighbour.visited)
            visitedString = " (V)";
          //console.log("Neighbour " + neighbour.id + visitedString + " minD " + neighbour.minDistance.toFixed(2));
        }
        current.visited = true;

        if (allVisited) {
          var previousPath = path.pop();
          current = previousPath[0];
          //console.log("Dead end");
        } else {
          if (current.z == $scope.currentLevel.number)
            path.push([current, closestNeighbour, true]);
          else
            path.push([current, closestNeighbour, false]);
          current = closestNeighbour;
        }
      }
      return path;
    }

    return {
      calculatePercentage: function(pos, max) {
        return 100 * pos / max;
      },
      storyLinePath: function($scope, storyLine, points) {
        var storyPoints = storyLine.points;

        //copy necessary points information and index with the id
        var pointsList = getPointData(points);

        //find first point of storyline on current level
        var current = null;
        var currentIndex = 0;
        for (var i = 0; i < storyPoints.length; i++) {
          var point = pointsList["" + storyPoints[i]];
          if (point.z == $scope.currentLevel.number) {
            current = point;
            break;
          }
          currentIndex++;
        }

        //if there isn't any point
        if (current === null) return null;

        if (currentIndex !== 0) { //if not at the start of the storyline, we need to draw the line leading to the POI
          current = pointsList["" + storyPoints[currentIndex - 1]];
        } else {
          currentIndex++;
        }

        //go through each story point of interest
        var path = [];
        for (var i = currentIndex; i < storyPoints.length; i++) {
          //console.log("Building path to POI " + storyPoints[i]);
          var destination = pointsList["" + storyPoints[i]];
          path = path.concat(dijkstra($scope, current, destination, points));
          current = destination;
        }

        return path;
      },
    };
  });
