angular.module('controllers')
    .controller('mapCtrl', function ($scope, iBeaconSrvc) {

        console.log('[mapCtrl] loaded');

        var beaconSrvc = iBeaconSrvc.BeaconBuilder;
        beaconSrvc.init(); // Intialize beacon services

        // Listen to proximity change events
        $scope.$on(beaconSrvc.notifyEvent, function (event, value) {
            $scope.mapBeacons = value;
            $scope.$apply();
        });

        var mapData = {
            "point": [{
                "id": 1, //int or SHA1 hash
                "type": "poi", //string {"poi","fac","dir"}
                "subtype": "", //string {"washroom", "stairs", ...}
                "coordinate": {
                    "x": 120, //float, px
                    "y": 1565, //float, px
                    "z": 1, //int (1-5)
                },
                "neighbours": [2], //int[] or string[] SHA1 hash
                "beacon_id": "undefined", //int or SHA1 hash
                "style": {
                    "color": "#00008B", //string, HEX Color
                    "diameter": 40, //float, px
                },
            }, {
                "id": 2, //int or SHA1 hash
                "type": "dir", //string {"poi","fac","dir"}
                "subtype": "", //string {"washroom", "stairs", ...}
                "coordinate": {
                    "x": 270, //float, px
                    "y": 1580, //float, px
                    "z": 1, //int (1-5)
                },
                "neighbours": [1, 3, 4], //int[] or string[] SHA1 hash
                "beacon_id": "undefined", //int or SHA1 hash
                "style": {
                    "color": "#a6a6a6", //string, HEX Color
                    "diameter": 40, //float, px
                },
            }, {
                "id": 3, //int or SHA1 hash
                "type": "poi", //string {"poi","fac","dir"}
                "subtype": "", //string {"washroom", "stairs", ...}
                "coordinate": {
                    "x": 295, //float, px
                    "y": 1645, //float, px
                    "z": 1, //int (1-5)
                },
                "neighbours": [2], //int[] or string[] SHA1 hash
                "beacon_id": "undefined", //int or SHA1 hash
                "style": {
                    "color": "#00008B", //string, HEX Color
                    "diameter": 40, //float, px
                }
            }, {
                "id": 4, //int or SHA1 hash
                "type": "dir", //string {"poi","fac","dir"}
                "subtype": "", //string {"washroom", "stairs", ...}
                "coordinate": {
                    "x": 300, //float, px
                    "y": 1545, //float, px
                    "z": 1, //int (1-5)
                },
                "neighbours": [2, 5], //int[] or string[] SHA1 hash
                "beacon_id": "undefined", //int or SHA1 hash
                "style": {
                    "color": "#a6a6a6", //string, HEX Color
                    "diameter": 40, //float, px
                },
            }, {
                "id": 5, //int or SHA1 hash
                "type": "poi", //string {"poi","fac","dir"}
                "subtype": "", //string {"washroom", "stairs", ...}
                "coordinate": {
                    "x": 485, //float, px
                    "y": 1559, //float, px
                    "z": 1, //int (1-5)
                },
                "neighbours": [4, 6], //int[] or string[] SHA1 hash
                "beacon_id": "undefined", //int or SHA1 hash
                "style": {
                    "color": "#00008B", //string, HEX Color
                    "diameter": 40, //float, px
                },
            }, {
                "id": 6, //int or SHA1 hash
                "type": "fac", //string {"poi","fac","dir"}
                "subtype": "stairs", //string {"washroom", "stairs", ...}
                "coordinate": {
                    "x": 485, //float, px
                    "y": 1245, //float, px
                    "z": 1, //int (1-5)
                },
                "neighbours": [5, 7], //int[] or string[] SHA1 hash
                "beacon_id": "undefined", //int or SHA1 hash
                "style": {
                    "color": "#009933", //string, HEX Color
                    "diameter": 40, //float, px
                },
            }, {
                "id": 7, //int or SHA1 hash
                "type": "fac", //string {"poi","fac","dir"}
                "subtype": "stairs", //string {"washroom", "stairs", ...}
                "coordinate": {
                    "x": 485, //float, px
                    "y": 1245, //float, px
                    "z": 2, //int (1-5)
                },
                "neighbours": [6, 8], //int[] or string[] SHA1 hash
                "beacon_id": "undefined", //int or SHA1 hash
                "style": {
                    "color": "#009933", //string, HEX Color
                    "diameter": 40, //float, px
                },
            }, {
                "id": 8, //int or SHA1 hash
                "type": "fac", //string {"poi","fac","dir"}
                "subtype": "stairs", //string {"washroom", "stairs", ...}
                "coordinate": {
                    "x": 485, //float, px
                    "y": 1245, //float, px
                    "z": 3, //int (1-5)
                },
                "neighbours": [7, 9], //int[] or string[] SHA1 hash
                "beacon_id": "undefined", //int or SHA1 hash
                "style": {
                    "color": "#009933", //string, HEX Color
                    "diameter": 40, //float, px
                },
            }, {
                "id": 9, //int or SHA1 hash
                "type": "dir", //string {"poi","fac","dir"}
                "subtype": "", //string {"washroom", "stairs", ...}
                "coordinate": {
                    "x": 520, //float, px
                    "y": 1305, //float, px
                    "z": 3, //int (1-5)
                },
                "neighbours": [8, 10], //int[] or string[] SHA1 hash
                "beacon_id": "undefined", //int or SHA1 hash
                "style": {
                    "color": "#a6a6a6", //string, HEX Color
                    "diameter": 40, //float, px
                },
            }, {
                "id": 10, //int or SHA1 hash
                "type": "dir", //string {"poi","fac","dir"}
                "subtype": "", //string {"washroom", "stairs", ...}
                "coordinate": {
                    "x": 610, //float, px
                    "y": 1312, //float, px
                    "z": 3, //int (1-5)
                },
                "neighbours": [9, 11], //int[] or string[] SHA1 hash
                "beacon_id": "undefined", //int or SHA1 hash
                "style": {
                    "color": "#a6a6a6", //string, HEX Color
                    "diameter": 40, //float, px
                },
            }, {
                "id": 11, //int or SHA1 hash
                "type": "dir", //string {"poi","fac","dir"}
                "subtype": "", //string {"washroom", "stairs", ...}
                "coordinate": {
                    "x": 585, //float, px
                    "y": 1590, //float, px
                    "z": 3, //int (1-5)
                },
                "neighbours": [10, 12], //int[] or string[] SHA1 hash
                "beacon_id": "undefined", //int or SHA1 hash
                "style": {
                    "color": "#a6a6a6", //string, HEX Color
                    "diameter": 40, //float, px
                },
            }, {
                "id": 12, //int or SHA1 hash
                "type": "poi", //string {"poi","fac","dir"}
                "subtype": "", //string {"washroom", "stairs", ...}
                "coordinate": {
                    "x": 630, //float, px
                    "y": 1645, //float, px
                    "z": 3, //int (1-5)
                },
                "neighbours": [11], //int[] or string[] SHA1 hash
                "beacon_id": "undefined", //int or SHA1 hash
                "style": {
                    "color": "#00008B", //string, HEX Color
                    "diameter": 40, //float, px
                },
            }],
            "level": [{
                "number": 1, //int (1-5)
                "name": "Level One", //string
                "map": {
                    "url": "img/level-one.png", //string, url
                    "width": 809, //int, px
                    "height": 1715 //int, px
                },
                "points": [1, 2, 3, 4, 5, 6] //int[] or string[] SHA1 hash
            }, {
                "number": 2, //int (1-5)
                "name": "Level Two", //string
                "map": {
                    "url": "img/level-two.png", //string, url
                    "width": 809, //int, px
                    "height": 1715 //int, px
                },
                "points": [7] //int[] or string[] SHA1 hash
            }, {
                "number": 3, //int (1-5)
                "name": "Level Three", //string
                "map": {
                    "url": "img/level-three.png", //string, url
                    "width": 809, //int, px
                    "height": 1715 //int, px
                },
                "points": [8, 9] //int[] or string[] SHA1 hash
            }, {
                "number": 4, //int (1-5)
                "name": "Level Four", //string
                "map": {
                    "url": "img/level-four.png", //string, url
                    "width": 809, //int, px
                    "height": 1715 //int, px
                },
                "points": [] //int[] or string[] SHA1 hash
            }, {
                "number": 5, //int (1-5)
                "name": "Level Five", //string
                "map": {
                    "url": "img/level-five.png", //string, url
                    "width": 809, //int, px
                    "height": 1715 //int, px
                },
                "points": [] //int[] or string[] SHA1 hash
            }],
            "storyline": [{
                "id": 1, //int or SHA1 hash
                "name": {
                    "en_us": "Story 1", //string
                    "fr_ca": "", //string
                },
                "description": {
                    "en_us": "This is the first story.", //string
                    "fr_ca": "", //string
                },
                "points": [1, 3, 5, 12] //int[] or string[] SHA1 hash
            }],
        };

        $scope.currentLevel = mapData.level[0];
        $scope.showID = false; //set to true to show point IDs on the map

        $scope.changeLevel = function (level) {
            $scope.currentLevel = mapData.level[level - 1];
            prepareData(mapData);
        };

        prepareData(mapData);

        ///////// INNER Functions   /////////////

        function prepareData(mapData) {
            console.log("Prepare Data");

            var storyLineNum = 1; //TODO this value will later on be assigned
            var storyLines = mapData.storyline;
            var story = null;

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
                if ((storyPoints.indexOf(point.id) != -1 && point.coordinate.z == $scope.currentLevel.number) || (point.type == "fac" && point.coordinate.z == $scope.currentLevel.number)  || (point.type == "dir" && point.coordinate.z == $scope.currentLevel.number)) {
                    var diameter = point.style.diameter;
                    $scope.mapPoints.push({
                        id: point.id,
                        left: toPercentage(point.coordinate.x - (diameter / 2), imgDimensions.width),
                        top: toPercentage(point.coordinate.y - (diameter / 2), imgDimensions.height),
                        color: point.style.color,
                        diameterX: toPercentage(diameter, imgDimensions.width),
                        diameterY: toPercentage(diameter, imgDimensions.height)
                    });
                }
            });

            var paths = storyLinePath(story, points);

            //store lines connecting points of interest
            $scope.mapLines = [];
            angular.forEach(paths, function (path, key) {
                if(path[2]) { //if line needs to be drawn
                    var vector = lineVector(path[0], path[1], imgDimensions);
                    vector.color = '#ff3333';
                    vector.height = '1px';
                    $scope.mapLines.push(vector);
                }
            });
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

        function storyLinePath(storyLine, points) {
            var storyPoints = storyLine.points;

            //copy necessary points information and index with the id
            var pointsList = getPointData(points);

            //find first point of storyline on current level
            var current = null;
            var currentIndex = 0;
            for(var i = 0; i < storyPoints.length; i++) {
                var point = pointsList["" + storyPoints[i]];
                if(point.z == $scope.currentLevel.number) {
                    current = point;
                    break;
                }
                currentIndex++;
            }

            //if there isn't any point
            if(current == null)
                return null;

            if(currentIndex != 0) //if not at the start of the storyline, we need to draw the line leading to the POI
                current = pointsList["" + storyPoints[currentIndex-1]];
            else
                currentIndex++;

            //go through each story point of interest
            var path = [];
            for (var i = currentIndex; i < storyPoints.length; i++) {
                console.log("Building path to POI " + storyPoints[i]);
                var destination = pointsList["" + storyPoints[i]];
                path = path.concat(dijkstra(current, destination, points));
                current = destination;
            }

            return path;
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
                var closestNeighbour = null;
                var neighbours = current.neighbours;
                console.log("Current: " + current.id);
                var allVisited = true;
                for (var i = 0; i < neighbours.length; i++) {
                    var neighbourID = neighbours[i];
                    var neighbour = pointsList["" + neighbourID];

                    //check if the destination was found
                    if (neighbourID == destination.id) {
                        closestNeighbour = neighbour;
                        allVisited = false;
                        console.log("Found POI " + neighbour.id);
                        break;
                    }

                    //check if neighbour has already been visited
                    if (!neighbour.visited) {
                        allVisited = false;
                        var distance = vectorMagnitude(current, neighbour) + current.minDistance;
                        if (distance < neighbour.minDistance || neighbour.minDistance == -1)
                            neighbour.minDistance = distance;

                        if (closestNeighbour == null || neighbour.minDistance < closestNeighbour.minDistance)
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
                }
                else {
                    if(current.z == $scope.currentLevel.number)
                        path.push([current, closestNeighbour, true]);
                    else
                        path.push([current, closestNeighbour, false]);
                    current = closestNeighbour;
                }
            }

            return path;

        }

        function getPointData(points) {
            //copy necessary points information and index with the id
            var pointsList = [];
            angular.forEach(points, function (point, key) {
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
    })
