angular.module('services')
  .service('storyLinePathSrvc', function() {

    function dijkstra(floorNum, source, destination, points) {
      //console.log(source);
      //console.log(source.getUUID());
      //console.log(destination);
      //console.log(destination.getUUID());
      //console.log(points);
      for(var key in points){
        points[key].minDistance = -1;
        points[key].visited = false;
      }
      destination.minDistance = -1;
      destination.visited = false;
      //go through each story point of interest
      var path = [];
      var current = source;
      current.visited = true;
      current.minDistance = 0;
      var whilecount = 0, forcount = 0;
      while (current.getUUID() !== destination.getUUID()) {
        //console.log("whilecount:" + whilecount++ );
        var closestNeighbour = null,
            neighbours = current.getNeighbourIDs(),
            allVisited = true;
        for (var i = 0; i < neighbours.length; i++) {
          //console.log("forcount:" + forcount++ );
          var neighbourID = neighbours[i],
          neighbour = points[neighbourID];
          //console.log(neighbour.minDistance);
          //console.log(neighbour.visited);

          //check if the destination was found
          if (neighbourID === destination.getUUID()) {
            //console.log("Here's destination");
            closestNeighbour = neighbour;
            allVisited = false;
            //console.log("Found POI " + neighbour.id);
            break;
          }

          //check if neighbour has already been visited
          if (!neighbour.visited) {
            //console.log("!neightbour.visited");
            allVisited = false;
            var distance = Vector.calculateMagnitude(current, neighbour) + current.minDistance;
            if (distance < neighbour.minDistance || neighbour.minDistance == -1){
              neighbour.minDistance = distance;
            }
            if (closestNeighbour === null || neighbour.minDistance < closestNeighbour.minDistance){
              closestNeighbour = neighbour;
            }
          }
        }
        current.visited = true;

        if (allVisited) {
          var previousPath = path.pop();
          current = previousPath[0];
          //console.log("Dead end");
        } else {
          if (current.getCoordinates().z == floorNum)
            path.push([current, closestNeighbour, true]);
          else
            path.push([current, closestNeighbour, false]);
          current = closestNeighbour;
        }
      }
      return path;
    }

    return {
      storyLinePath: function(floorNum, storyLine, points) {
        var storyPoints = storyLine.getPoints();

        //find first point of storyline on current level
        var current = null,
            currentIndex = 0;
        for (var i = 0; i < storyPoints.length; i++) {
          var point = points[storyPoints[i]];
          if (point.getCoordinates().z == floorNum) {
            current = point;
            break;
          }
          currentIndex++;
        }

        //if there isn't any point
        if (current === null) return null;

        if (currentIndex !== 0) { //if not at the start of the storyline, we need to draw the line leading to the POI
          current = points[storyPoints[currentIndex - 1]];
        } else {
          currentIndex++;
        }

        //go through each story point of interest
        var path = [];
        for (var i = currentIndex; i < storyPoints.length; i++) {
          //console.log("Building path to POI " + storyPoints[i]);
          var destination = points[storyPoints[i]];
          path = path.concat(dijkstra(floorNum, current, destination, points));
          current = destination;
        }

        return path;
      },
    };
  });
