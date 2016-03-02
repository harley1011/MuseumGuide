angular.module('services')
  .service('transferProtocolSrvc', function() {
    var points = [],
      pt;
    var storylines = [{
      "id": 1,
      "name": {
        "en_us": "Story 1",
        "fr_ca": "",
      },
      "description": {
        "en_us": "This is the first story.",
        "fr_ca": "",
      },
      "thumbnail": "/path/to/nowhere/thumb.png",
      "walkingTimeInMinutes": "20",
      "floorsCovered": "5",
      "points": [1, 3, 5, 12],
    }, {
      "id": 2,
      "name": {
        "en_us": "Story 2",
        "fr_ca": "",
      },
      "description": {
        "en_us": "This is the second story.",
        "fr_ca": "",
      },
      "thumbnail": "/path/to/nowhere/thumb.png",
      "walkingTimeInMinutes": "20",
      "floorsCovered": "5",
      "points": [1, 3, 5],
    }, {
      "id": 3,
      "name": {
        "en_us": "Story 3",
        "fr_ca": "",
      },
      "description": {
        "en_us": "This is the third story.",
        "fr_ca": "",
      },
      "thumbnail": "/path/to/nowhere/thumb.png",
      "walkingTimeInMinutes": "20",
      "floorsCovered": "5",
      "points": [13, 19]
    }, {
      "id": 4,
      "name": {
        "en_us": "Story 4",
        "fr_ca": "",
      },
      "description": {
        "en_us": "This is the fourth story.",
        "fr_ca": "",
      },
      "thumbnail": "/path/to/nowhere/thumb.png",
      "walkingTimeInMinutes": "20",
      "floorsCovered": "5",
      "points": [1, 3, 5, 12]
    }, {
      "id": 5,
      "name": {
        "en_us": "Story 5",
        "fr_ca": "",
      },
      "description": {
        "en_us": "This is the fifth story.",
        "fr_ca": "",
      },
      "thumbnail": "/path/to/nowhere/thumb.png",
      "walkingTimeInMinutes": "20",
      "floorsCovered": "5",
      "points": [1, 3, 5, 12]
    }, {
      "id": 6,
      "name": {
        "en_us": "Story 6",
        "fr_ca": "",
      },
      "description": {
        "en_us": "This is the sixth story.",
        "fr_ca": "",
      },
      "thumbnail": "/path/to/nowhere/thumb.png",
      "walkingTimeInMinutes": "20",
      "floorsCovered": "5",
      "points": [1, 3, 5, 12]
    }];
    var oldPoints = [{
      "type": "poi",
      "subtype": "",
      "coordinate": {
        "x": 120,
        "y": 1565,
        "z": 1,
      },
      "neighbours": [2],
      "beacon_id": "b9407f30-f5f8-466e-aff9-25556b57fe6d",
      "style": {
        "color": "#00008B",
        "diameter": 40,
      },
    }, {
      "type": "dir",
      "subtype": "",
      "coordinate": {
        "x": 270,
        "y": 1580,
        "z": 1,
      },
      "neighbours": [1, 3, 4],
      "beacon_id": "undefined",
      "style": {
        "color": "#a6a6a6",
        "diameter": 40,
      },
    }, {
      "type": "poi",
      "subtype": "",
      "coordinate": {
        "x": 295,
        "y": 1645,
        "z": 1,
      },
      "neighbours": [2],
      "beacon_id": "undefined",
      "style": {
        "color": "#00008B",
        "diameter": 40,
      }
    }, {
      "type": "dir",
      "subtype": "",
      "coordinate": {
        "x": 300,
        "y": 1545,
        "z": 1,
      },
      "neighbours": [2, 5],
      "beacon_id": "undefined",
      "style": {
        "color": "#a6a6a6",
        "diameter": 40,
      },
    }, {
      "type": "poi",
      "subtype": "",
      "coordinate": {
        "x": 485,
        "y": 1559,
        "z": 1,
      },
      "neighbours": [4, 6],
      "beacon_id": "8492e75f-4fd6-469d-b132-043fe94921d8",
      "style": {
        "color": "#00008B",
        "diameter": 40,
      },
    }, {
      "type": "fac",
      "subtype": "stairs",
      "coordinate": {
        "x": 485,
        "y": 1245,
        "z": 1,
      },
      "neighbours": [5, 7],
      "beacon_id": "undefined",
      "style": {
        "color": "#009933",
        "diameter": 40,
      },
    }, {
      "type": "fac",
      "subtype": "stairs",
      "coordinate": {
        "x": 485,
        "y": 1245,
        "z": 2,
      },
      "neighbours": [6, 8],
      "beacon_id": "undefined",
      "style": {
        "color": "#009933",
        "diameter": 40,
      },
    }, {
      "type": "fac",
      "subtype": "stairs",
      "coordinate": {
        "x": 485,
        "y": 1245,
        "z": 3,
      },
      "neighbours": [7, 9],
      "beacon_id": "undefined",
      "style": {
        "color": "#009933",
        "diameter": 40,
      },
    }, {
      "type": "dir",
      "subtype": "",
      "coordinate": {
        "x": 520,
        "y": 1305,
        "z": 3,
      },
      "neighbours": [8, 10],
      "beacon_id": "undefined",
      "style": {
        "color": "#a6a6a6",
        "diameter": 40,
      },
    }, {
      "type": "dir",
      "subtype": "",
      "coordinate": {
        "x": 610,
        "y": 1312,
        "z": 3,
      },
      "neighbours": [9, 11],
      "beacon_id": "undefined",
      "style": {
        "color": "#a6a6a6",
        "diameter": 40,
      },
    }, {
      "type": "dir",
      "subtype": "",
      "coordinate": {
        "x": 585,
        "y": 1590,
        "z": 3,
      },
      "neighbours": [10, 12],
      "beacon_id": "undefined",
      "style": {
        "color": "#a6a6a6",
        "diameter": 40,
      },
    }, {
      "type": "poi",
      "subtype": "",
      "coordinate": {
        "x": 630,
        "y": 1645,
        "z": 3,
      },
      "neighbours": [11],
      "beacon_id": "undefined",
      "style": {
        "color": "#00008B",
        "diameter": 40,
      },
    }, {
      "type": "poi",
      "subtype": "",
      "coordinate": {
        "x": 100,
        "y": 450,
        "z": 1,
      },
      "neighbours": [14],
      "beacon_id": "undefined",
      "style": {
        "color": "#00008B",
        "diameter": 40,
      },
    }, {
      "type": "dir",
      "subtype": "",
      "coordinate": {
        "x": 220,
        "y": 440,
        "z": 1,
      },
      "neighbours": [13, 15],
      "beacon_id": "undefined",
      "style": {
        "color": "#00008B",
        "diameter": 40,
      },
    }, {
      "type": "dir",
      "subtype": "",
      "coordinate": {
        "x": 220,
        "y": 860,
        "z": 1,
      },
      "neighbours": [14, 16],
      "beacon_id": "undefined",
      "style": {
        "color": "#00008B",
        "diameter": 40,
      },
    }, {
      "type": "dir",
      "subtype": "",
      "coordinate": {
        "x": 500,
        "y": 860,
        "z": 1,
      },
      "neighbours": [15, 17],
      "beacon_id": "undefined",
      "style": {
        "color": "#00008B",
        "diameter": 40,
      },
    }, {
      "type": "dir",
      "subtype": "",
      "coordinate": {
        "x": 480,
        "y": 450,
        "z": 1,
      },
      "neighbours": [16, 18],
      "beacon_id": "undefined",
      "style": {
        "color": "#00008B",
        "diameter": 40,
      },
    }, {
      "type": "dir",
      "subtype": "",
      "coordinate": {
        "x": 500,
        "y": 320,
        "z": 1,
      },
      "neighbours": [17, 19],
      "beacon_id": "undefined",
      "style": {
        "color": "#00008B",
        "diameter": 40,
      },
    }, {
      "type": "poi",
      "subtype": "",
      "coordinate": {
        "x": 600,
        "y": 325,
        "z": 1,
      },
      "neighbours": [18],
      "beacon_id": "undefined",
      "style": {
        "color": "#00008B",
        "diameter": 40,
      },
    }];

    for (var i = 0; i < 19; i++) {
      pt = oldPoints[i];
      pt.id = i + 1;
      pt.media = {
        "image": [{
          "path": "/path/to/nowhere/img.png",
          "language": "en",
          "caption": "This is an image caption for Point " + (i+1) + " with no storyline."
        }],
        "video": [{
          "path": "/path/to/nowhere/video.mp4",
          "language": "en",
          "caption": "This is a video caption for Point " + (i+1) + " with no storyline."
        }],
        "audio": [{
          "path": "/path/to/nowhere/audio.mp3",
          "language": "en",
          "caption": "This is an audio caption for Point " + (i+1) + " with no storyline."
        }]
      };
      pt.title = [{
        "language": "en",
        "title": "Point " + (i + 1) + " Title"
      }, {
        "language": "fr",
        "title": "Titre du point " + (i + 1)
      }];
      pt.description = [{
        "language": "en",
        "description": "Point " + (i + 1) + " Description"
      }, {
        "language": "fr",
        "description": "Description du Point " + (i + 1)
      }];
      pt.storyPoint = [];
      for (var j = 0; j < storylines.length; j++) {
        if (storylines[j].points.indexOf(i + 1) !== -1) {
          pt.storyPoint.push({
            "storylineID": storylines[j].id,
            "title": [{
              "language": "en",
              "title": "Point " + (i + 1) + " Title for Story " + storylines[j].id
            }, {
              "language": "fr",
              "title": "Titre du point " + (i + 1) + " pour l'histoire " + storylines[j].id
            }],
            "description": [{
              "language": "en",
              "description": "Point " + (i + 1) + " Description for Story " + storylines[j].id
            }, {
              "language": "fr",
              "description": "Description du point " + (i + 1) + " pour l'histoire " + storylines[j].id
            }],
            "media": {
              "image": [{
                "path": "/path/to/nowhere/img.png",
                "language": "en",
                "caption": "This is an image caption for Point " + (i+1) + " with the Story " + storylines[j].id + "."
              }],
              "video": [{
                "path": "/path/to/nowhere/video.mp4",
                "language": "en",
                "caption": "This is a video caption for Point " + (i+1) + " with the Story " + storylines[j].id + "."
              }],
              "audio": [{
                "path": "/path/to/nowhere/audio.mp3",
                "language": "en",
                "caption": "This is an audio caption for Point " + (i+1) + " with the Story " + storylines[j].id + "."
              }]
            }
          });
        }
      }
      points.push(pt);
    }
    //Ok, this may look stupid, but this is because the final schema doesn't
    //have the story points in the storylines.
    for (var k = 0; k < storylines.length; k++) {
      delete storylines[k].points;
    }

    var mapData = {
      "point": points,
      "level": [{
        "number": 1,
        "name": "Level One",
        "map": {
          "url": "img/level-one.png",
          "width": 809,
          "height": 1715
        },
        "points": [1, 2, 3, 4, 5, 6, 13, 14, 15, 16, 17, 18, 19]
      }, {
        "number": 2,
        "name": "Level Two",
        "map": {
          "url": "img/level-two.png",
          "width": 809,
          "height": 1715
        },
        "points": [7]
      }, {
        "number": 3,
        "name": "Level Three",
        "map": {
          "url": "img/level-three.png",
          "width": 809,
          "height": 1715
        },
        "points": [8, 9]
      }, {
        "number": 4,
        "name": "Level Four",
        "map": {
          "url": "img/level-four.png",
          "width": 809,
          "height": 1715
        },
        "points": []
      }, {
        "number": 5,
        "name": "Level Five",
        "map": {
          "url": "img/level-five.png",
          "width": 809,
          "height": 1715
        },
        "points": []
      }],
      "storyline": storylines,
    };

    return {
      download: function(url) {},
      read: function(url) {
        if (url === "mapData") {
          return mapData;
        }
      },
      exists: function(url, locally) {},
      hasChanged: function(url) {
        return false;
      },
      monitor: function(url) {},
    };
  });
