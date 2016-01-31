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
              "neighbours": [2], //int[] or string[] SHA1 hash
              "beacon_id": "undefined", //int or SHA1 hash
              "style": {
                "color": "#00008B", //string, HEX Color
                "diameter": 6, //float, px
              },
            },
            {
              "id": 2, //int or SHA1 hash
              "type": "dir", //string {"poi","fac","dir"}
              "subtype": "", //string {"washroom", "stairs", ...}
              "coordinate": {
                "x": 83, //float, px
                "y": 486, //float, px
                "z": 1, //int (1-5)
              },
              "neighbours": [1,3], //int[] or string[] SHA1 hash
              "beacon_id": "undefined", //int or SHA1 hash
              "style": {
                "color": "#00008B", //string, HEX Color
                "diameter": 6, //float, px
              },
            },
            {
              "id": 3, //int or SHA1 hash
              "type": "dir", //string {"poi","fac","dir"}
              "subtype": "", //string {"washroom", "stairs", ...}
              "coordinate": {
                "x": 92, //float, px
                "y": 478, //float, px
                "z": 1, //int (1-5)
              },
              "neighbours": [2,4], //int[] or string[] SHA1 hash
              "beacon_id": "undefined", //int or SHA1 hash
              "style": {
                "color": "#00008B", //string, HEX Color
                "diameter": 6, //float, px
              },
            },
            {
              "id": 4, //int or SHA1 hash
              "type": "poi", //string {"poi","fac","dir"}
              "subtype": "", //string {"washroom", "stairs", ...}
              "coordinate": {
                "x": 150, //float, px
                "y": 481, //float, px
                "z": 1, //int (1-5)
              },
              "neighbours": [3], //int[] or string[] SHA1 hash
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
              "points": [1,4], //int[] or string[] SHA1 hash
            }
          ],
        };

        //store points of interest to be shown on the map
        $scope.mapPoints = [];
        var points = mapData["point"];
        angular.forEach(points, function(point, key) {
          if(point["type"] == "poi") {
            var diameter = point["style"]["diameter"]
            $scope.mapPoints.push({left: (point["coordinate"]["x"]-diameter/2), top: (point["coordinate"]["y"]-diameter/2), color: point["style"]["color"], diameter: diameter});
          }
        });

        $scope.mapLines = [];
        var point1 = null;
        angular.forEach(points, function(point, key) {
            var point2 = {"x": point["coordinate"]["x"], "y": point["coordinate"]["y"]};
            if(point1 != null){
                var vector = lineVector(point1, point2);
                vector["color"] = '#ff3333';
                vector["height"] = '1px';
                $scope.mapLines.push(vector);
            }

            point1 = point2;
        });

        //$scope.mapLines = [{left: 20, top: 91.8, color: '#ff3333', height:'1px', width:''}];


        $scope.changeLevel = function(level)
        {
            console.log("Changing level to: " + level);
        }
    })

function lineVector(point1, point2){
    var vector = [];
    vector["magnitude"] = Math.sqrt(Math.pow((point2["x"]-point1["x"]),2) + Math.pow((point2["y"]-point1["y"]),2));
    vector["angle"] = Math.atan((point2["y"]-point1["y"])/(point2["x"]-point1["x"])) * 180/Math.PI; //in degrees
    console.log(vector["magnitude"] + ", " + vector["angle"]);

    // point1 - (3,4)  point2 - (4,3)   deg = -45
    // point1 - (3,4)  point2 - (4,5)   deg = 45
    // point1 - (3,4)  point2 - (2,5)   deg = -45 ...should be (-45+180) = 135
    // point1 - (3,4)  point2 - (2,3)   deg = 45 ...should be (45+180) = 225
    if(point2["x"] < point1["x"])
        vector["angle"] += 180;

    /*var x = point1["x"]-((vector["magnitude"]-(Math.cos((vector["angle"]*Math.PI/180))*vector["magnitude"]))/2);
    var y = point1["y"]+(Math.sin((vector["angle"]*Math.PI/180)*vector["magnitude"])/2);
    console.log("(" + point1["x"] + ", " + point1["y"] + ")" + " to (" + x + ", " + y + ")");
    vector["position"] = {"x": x, "y": y};*/
    vector["position"] = {"x": point1["x"], "y": point1["y"]};

    return vector;
}
