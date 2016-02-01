angular.module('controllers')
    .controller('mapCtrl', function($scope) {
        console.log('in ctrl');

        var mapData = {
          "point": [
            {
              "id": 1, //int or SHA1 hash
              "type": "poi", //string {"poi","fac","dir"}
              "subtype": "", //string {"washroom", "stairs", ...}
              "coordinate": {
                "x": 50, //float, px
                "y": 484, //float, px
                "z": 1, //int (1-5)
              },
              "neighbours": [2,3], //int[] or string[] SHA1 hash
              "beacon_id": "undefined", //int or SHA1 hash
              "style": {
                "color": "#00008B", //string, HEX Color
                "diameter": 6, //float, px
              },
            },
            {
              "id": 2, //int or SHA1 hash
              "type": "poi", //string {"poi","fac","dir"}
              "subtype": "", //string {"washroom", "stairs", ...}
              "coordinate": {
                "x": 50, //float, px
                "y": 350, //float, px
                "z": 1, //int (1-5)
              },
              "neighbours": [1,3], //int[] or string[] SHA1 hash
              "beacon_id": "undefined", //int or SHA1 hash
              "style": {
                "color": "#a6a6a6", //string, HEX Color
                "diameter": 6, //float, px
              },
            },
            {
              "id": 3, //int or SHA1 hash
              "type": "dir", //string {"poi","fac","dir"}
              "subtype": "", //string {"washroom", "stairs", ...}
              "coordinate": {
                "x": 83, //float, px
                "y": 486, //float, px
                "z": 1, //int (1-5)
              },
              "neighbours": [1,2,4], //int[] or string[] SHA1 hash
              "beacon_id": "undefined", //int or SHA1 hash
              "style": {
                "color": "#a6a6a6", //string, HEX Color
                "diameter": 6, //float, px
              },
            },
            {
              "id": 4, //int or SHA1 hash
              "type": "dir", //string {"poi","fac","dir"}
              "subtype": "", //string {"washroom", "stairs", ...}
              "coordinate": {
                "x": 92, //float, px
                "y": 478, //float, px
                "z": 1, //int (1-5)
              },
              "neighbours": [3,5], //int[] or string[] SHA1 hash
              "beacon_id": "undefined", //int or SHA1 hash
              "style": {
                "color": "#a6a6a6", //string, HEX Color
                "diameter": 6, //float, px
              },
            },
            {
              "id": 5, //int or SHA1 hash
              "type": "poi", //string {"poi","fac","dir"}
              "subtype": "", //string {"washroom", "stairs", ...}
              "coordinate": {
                "x": 150, //float, px
                "y": 481, //float, px
                "z": 1, //int (1-5)
              },
              "neighbours": [4], //int[] or string[] SHA1 hash
              "beacon_id": "undefined", //int or SHA1 hash
              "style": {
                "color": "#00008B", //string, HEX Color
                "diameter": 6, //float, px
              },
            }
          ],
          "level": [
            {
              "number": 1, //int (1-5)
              "name": "Level One", //string
              "map": {
                "url": "undefined", //string, url
                "width": 770, //int, px
                "height": 1637 //int, px
              },
              "points": [1,2,3,4] //int[] or string[] SHA1 hash
            }
          ],
          "storyline": [
            {
              "id": 1, //int or SHA1 hash
              "name": {
                "en_us": "Story 1", //string
                "fr_ca": "", //string
              },
              "description": {
                "en_us": "This is the first story.", //string
                "fr_ca": "", //string
              },
              "points": [1,5], //int[] or string[] SHA1 hash
            }
          ],
        };

        var currentFloor = 1; //this value will later on be assigned
        var storyLineNum = 1; //this value will later on be assigned
        var storyLines = mapData["storyline"];
        var story = null;
        angular.forEach(storyLines, function(storyLine, key) {
            if(storyLine["id"] == storyLineNum)
                story = storyLine;
        });

        //store points of interest to be shown on the map
        $scope.mapPoints = [];
        var points = mapData["point"];
        var storyPoints = story["points"];
        angular.forEach(points, function(point, key) {
            if(storyPoints.indexOf(point["id"]) != -1 && point["coordinate"]["z"] == currentFloor) {
                var diameter = point["style"]["diameter"]
                $scope.mapPoints.push({left: (point["coordinate"]["x"]-diameter/2), top: (point["coordinate"]["y"]-diameter/2), color: point["style"]["color"], diameter: diameter});
            }
        });

        var paths = storyLinePath(story,points);

        $scope.mapLines = [];
        angular.forEach(paths, function(path, key) {
            var vector = lineVector(path[0],path[1]);
            vector["color"] = '#ff3333';
            vector["height"] = '1px';
            $scope.mapLines.push(vector);
        });

        $scope.changeLevel = function(level)
        {
            console.log("Changing level to: " + level);
        }
    })

function lineVector(point1, point2){
    var vector = [];
    vector["magnitude"] = vectorMagnitude(point1, point2);
    vector["angle"] = Math.atan((point2["y"]-point1["y"])/(point2["x"]-point1["x"])) * 180/Math.PI; //in degrees
    console.log(vector["magnitude"] + ", " + vector["angle"]);

    // point1 - (3,4)  point2 - (4,3)   deg = -45
    // point1 - (3,4)  point2 - (4,5)   deg = 45
    // point1 - (3,4)  point2 - (2,5)   deg = -45 ...should be (-45+180) = 135
    // point1 - (3,4)  point2 - (2,3)   deg = 45 ...should be (45+180) = 225
    if(point2["x"] < point1["x"])
        vector["angle"] += 180;

    vector["position"] = {"x": point1["x"], "y": point1["y"]};

    return vector;
}

function vectorMagnitude(point1, point2){
    return Math.sqrt(Math.pow((point2["x"]-point1["x"]),2) + Math.pow((point2["y"]-point1["y"]),2));
}

function storyLinePath(storyLine, points){
    var storyPoints = storyLine["points"];

    //copy necessary points information and index with the id
    var pointsList = getPointData(points);

    //go through each story point of interest
    var path = [];
    var current = pointsList["" + storyPoints[0]];
    for(var i = 1; i < storyPoints.length; i++){
        var destination = pointsList["" + storyPoints[i]];
        path = path.concat(dijkstra(current,destination,points));
        current = destination;
    }

    return path;
}

function dijkstra(source, destination, points){

    //copy necessary points information and index with the id
    var pointsList = getPointData(points);

    //go through each story point of interest
    var path = [];
    var current = source;
    current["minDistance"] = 0;
    while(current["id"] != destination["id"]){
        var closestNeighbour = null;
        var neighbours = current["neighbours"];
        angular.forEach(neighbours, function(neighbourID, key) {
            var neighbour = pointsList["" + neighbourID];
            if(!neighbour["visited"]) {
                var distance = vectorMagnitude(current,neighbour) + current["minDistance"];
                if(distance < neighbour["minDistance"] || neighbour["minDistance"] == -1)
                    neighbour["minDistance"] = distance;

                if(closestNeighbour == null || neighbour["minDistance"] < closestNeighbour["minDistance"])
                    closestNeighbour = neighbour;
            }
        });
        current["visited"] = true;
        path.push([current, closestNeighbour]);
        current = closestNeighbour;
    }

    return path;

}

function getPointData(points){
    //copy necessary points information and index with the id
    var pointsList = [];
    angular.forEach(points, function(point, key) {
        var pointData = [];
        pointData["id"] = point["id"];
        pointData["x"] = point["coordinate"]["x"];
        pointData["y"] = point["coordinate"]["y"];
        pointData["visited"] = false;
        pointData["minDistance"] = -1;
        pointData["neighbours"] = point["neighbours"];
        pointsList["" + point["id"]] = pointData;
    });

    return pointsList;
}
