angular.module('services')
  .service('transferProtocolSrvc', function(evSchemaSrvc) {
    var points = [],
      pt;

    var storylines = [{
      "path": [1, 2, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }, {
      "path": [1, 2, 3, 2, 4, 5]
    }, {
      "path": [13, 14, 15, 16, 17, 18, 19]
    }, {
      "path": [1, 2, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }, {
      "path": [1, 2, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }, {
      "path": [1, 2, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }];

    //generate data for storylines
    for(var i = 0; i < storylines.length; i++) {
      var storyline = storylines[i];
      storyline.id = (i+1);
      storyline.title = [{
          "language": "en_us",
          "title": "Story " + (i+1)
        }, {
          "language": "fr_ca",
          "title": "Histoire " + (i+1)
      }];
      storyline.description = [{
          "language": "en_us",
          "description": "This is the the description of story " + (i+1) + "."
        }, {
          "language": "fr_ca",
          "description": "Ceci est la description de l'histoire " + (i+1) + "."
      }];
      storyline.thumbnail = "/path/to/nowhere/thumb.png";
      storyline.walkingTimeInMinutes = "20";
      storyline.floorsCovered = "5";
    }

    var points = {
      "poi": [{
    			"id": 1,
          "x": 120,
          "y": 1565,
    			"floorID": 1,
    			"iBeacon": {
    				"uuid": "b9407f30-f5f8-466e-aff9-25556b57fe6d",
    				"major": "undefined",
    				"minor": "undefined"
    			},
    			"storyPoint": [
            {
              "storylineID": 1,
              "media": {
                "image": [{
                    "path": "img/1a.png",
                    "language": "en",
                    "caption": "2. Floor, stop at bottom of stairs getting into building 5a from the MOEB, the visitor is being informed that he/she is walking through the women's and men's coat room, then passing through the showroom."
                  }, {
                    "path": "img/1a.png",
                    "language": "fr",
                    "caption": "Deuxième étage, en s'arrêtant à la base des marches donnant sur le bâtiment 5a à partir du MOEB: Le visiteur est informé qu'il/elle/ille se situ.e dans ce qui composait autrefois le vestiaire pour les hommes et pour les femmes. Il/elle/ille est informé.e que la salle suivant servait autrefois en tant que showroom."
                  }
                ]
              }
            }, {
              "storylineID": 2
            }, {
              "storylineID": 4
            }, {
              "storylineID": 5
            }, {
              "storylineID": 6
          }]
  		  }, {
    		  "id": 3,
          "x": 295,
          "y": 1645,
    			"floorID": 1,
    			"iBeacon": {
    				"uuid": "undefined",
    				"major": "undefined",
    				"minor": "undefined"
    			},
    			"storyPoint": [
            {
              "storylineID": 1
            }, {
              "storylineID": 2
            }, {
              "storylineID": 4
            }, {
              "storylineID": 5
            }, {
              "storylineID": 6
          }]
    		}, {
    			"id": 5,
          "x": 485,
          "y": 1559,
    			"floorID": 1,
    			"iBeacon": {
    				"uuid": "8492e75f-4fd6-469d-b132-043fe94921d8",
    				"major": "undefined",
    				"minor": "undefined"
    			},
    			"storyPoint": [
            {
              "storylineID": 1
            }, {
              "storylineID": 2
            }, {
              "storylineID": 4
            }, {
              "storylineID": 5
            }, {
              "storylineID": 6
          }]
    		}, {
    			"id": 12,
          "x": 630,
          "y": 1645,
    			"floorID": 3,
    			"iBeacon": {
    				"uuid": "undefined",
    				"major": "undefined",
    				"minor": "undefined"
    			},
    			"storyPoint": [
            {
              "storylineID": 1
            }, {
              "storylineID": 4
            }, {
              "storylineID": 5
            }, {
              "storylineID": 6
          }]
    		}, {
    			"id": 13,
          "x": 100,
          "y": 450,
    			"floorID": 1,
    			"iBeacon": {
    				"uuid": "undefined",
    				"major": "undefined",
    				"minor": "undefined"
    			},
    			"storyPoint": [
            {
              "storylineID": 3
          }]
    		}, {
    			"id": 19,
          "x": 600,
          "y": 325,
    			"floorID": 1,
    			"iBeacon": {
    				"uuid": "undefined",
    				"major": "undefined",
    				"minor": "undefined"
    			},
    			"storyPoint": [
            {
              "storylineID": 3
          }]
    		}
      ],
      "pot": [{
    			"id": 2,
          "label": "hallway",
          "x": 270,
          "y": 1580,
          "floorID": 1
    		}, {
    			"id": 4,
          "label": "hallway",
          "x": 300,
          "y": 1545,
          "floorID": 1
      	}, {
    			"id": 6,
          "label": "stairs",
          "x": 485,
          "y": 1245,
          "floorID": 1
      	}, {
    			"id": 7,
          "label": "stairs",
          "x": 485,
          "y": 1245,
          "floorID": 2
      	}, {
    			"id": 8,
          "label": "stairs",
          "x": 485,
          "y": 1245,
          "floorID": 3
      	}, {
    			"id": 9,
          "label": "hallway",
          "x": 520,
          "y": 1305,
          "floorID": 3
      	}, {
    			"id": 10,
          "label": "hallway",
          "x": 610,
          "y": 1312,
          "floorID": 3
      	}, {
    			"id": 11,
          "label": "hallway",
          "x": 585,
          "y": 1590,
          "floorID": 3
      	}, {
    			"id": 14,
          "label": "hallway",
          "x": 220,
          "y": 440,
          "floorID": 1
      	}, {
    			"id": 15,
          "label": "hallway",
          "x": 220,
          "y": 860,
          "floorID": 1
      	}, {
    			"id": 16,
          "label": "hallway",
          "x": 500,
          "y": 860,
          "floorID": 1
      	}, {
    			"id": 17,
          "label": "hallway",
          "x": 480,
          "y": 450,
          "floorID": 1
      	}, {
    			"id": 18,
          "label": "hallway",
          "x": 500,
          "y": 320,
          "floorID": 1
      	}
  		]
    };

    //generate data for points of interest
    var pois = points.poi;
    for(var i = 0; i < pois.length; i++) {
      var poi = pois[i];

      poi.title = [{
          "language": "en",
          "title": "Point " + poi.id + " Title"
        }, {
          "language": "fr",
          "title": "Titre du point " + poi.id
      }];

      poi.description = [{
          "language": "en",
          "description": "Point " + poi.id + " Description"
        }, {
          "language": "fr",
          "description": "Description du Point " + poi.id
      }];

      if(poi.media === undefined)
        poi.media = {};

      if(poi.media.image === undefined || poi.media.image.length === 0){
        poi.media.image = [{
          "path": "/path/to/nowhere/img.png",
          "language": "en",
          "caption": "This is an image caption for Point " + poi.id + " with no storyline."
        }];
      }

      if(poi.media.video === undefined || poi.media.video.length === 0){
        poi.media.video = [{
          "path": "/path/to/nowhere/video.mp4",
          "language": "en",
          "caption": "This is a video caption for Point " + poi.id + " with no storyline."
        }];
      }

      if(poi.media.audio === undefined || poi.media.audio.length === 0){
        poi.media.audio = [{
          "path": "/path/to/nowhere/audio.mp3",
          "language": "en",
          "caption": "This is an audio caption for Point " + poi.id + " with no storyline."
        }];
      }

      var storypoints = poi.storyPoint;
      for(var j = 0; j < storypoints.length; j++) {
        var storypoint = storypoints[j];

        storypoint.title = [{
            "language": "en",
            "title": "Nipper: Searching for his master's voice"
          }, {
            "language": "fr",
            "title": "Nipper: À la recherche de la voix de son maître"
        }];

        storypoint.description = [{
            "language": "en",
            "description": "Nipper comes back from a stroll outside and is looking for his master, who is the plant's president Elmer C. Grimley. However, a new extension has been recently added and opened (building 17), and Nipper is a bit confused. After he went to the old office (in building 5a), which is empty and close, he needs to find out, where the new president's office is. On top, it's a very busy day for his master and the factory inspections have to be done and production has started on high volume."
          }, {
            "language": "fr",
            "description": "Nipper revient d'une promenade à l'extérieur et recherche son maître et président de la manufacture, Elmer C. Grimley. Malheureusement pour Nipper, un nouvel agrandissement, le bâtiment 17, à été ajouté au complexe manufacturier, et Nipper ne sait plus où donner de la tête. ..."
        }];

        if(storypoint.media === undefined)
          storypoint.media = {};

        if(storypoint.media.image === undefined || storypoint.media.image.length === 0){
          storypoint.media.image = [{
            "path": "/path/to/nowhere/img.png",
            "language": "en",
            "caption": "This is an image caption for Point " + poi.id + " with no storyline."
          }];
        }

        if(storypoint.media.video === undefined || storypoint.media.video.length === 0){
          storypoint.media.video = [{
            "path": "/path/to/nowhere/video.mp4",
            "language": "en",
            "caption": "This is a video caption for Point " + poi.id + " with no storyline."
          }];
        }

        if(storypoint.media.audio === undefined || storypoint.media.audio.length === 0){
          storypoint.media.audio = [{
            "path": "/path/to/nowhere/audio.mp3",
            "language": "en",
            "caption": "This is an audio caption for Point " + poi.id + " with no storyline."
          }];
        }
      }
    }

    var edges = [{
      "startNode": 1,
      "endNode": 2
    }, {
      "startNode": 2,
      "endNode": 3
    }, {
      "startNode": 2,
      "endNode": 4
    }, {
      "startNode": 4,
      "endNode": 5
    }, {
      "startNode": 5,
      "endNode": 6
    }, {
      "startNode": 6,
      "endNode": 7
    }, {
      "startNode": 7,
      "endNode": 8
    }, {
      "startNode": 8,
      "endNode": 9
    }, {
      "startNode": 9,
      "endNode": 10
    }, {
      "startNode": 10,
      "endNode": 11
    }, {
      "startNode": 11,
      "endNode": 12
    }, {
      "startNode": 13,
      "endNode": 14
    }, {
      "startNode": 14,
      "endNode": 15
    }, {
      "startNode": 15,
      "endNode": 16
    }, {
      "startNode": 16,
      "endNode": 17
    }, {
      "startNode": 17,
      "endNode": 18
    }, {
      "startNode": 18,
      "endNode": 19
    }];

    var mapData = {
      "node": points,
      "floorPlan": [{
        "floorID": 1,
        "imagePath": "img/level-one.png",
        "imageWidth": 809,
        "imageHeight": 1715
      }, {
        "floorID": 2,
        "imagePath": "img/level-two.png",
        "imageWidth": 809,
        "imageHeight": 1715
      }, {
        "floorID": 3,
        "imagePath": "img/level-three.png",
        "imageWidth": 809,
        "imageHeight": 1715
      }, {
        "floorID": 4,
        "imagePath": "img/level-four.png",
        "imageWidth": 809,
        "imageHeight": 1715
      }, {
        "floorID": 5,
        "imagePath": "img/level-five.png",
        "imageWidth": 809,
        "imageHeight": 1715
      }],
      "storyline": storylines,
      "edge": edges
    };

    return {
      download: function(url) {},
      read: function(url) {
        if (url === "mapData") {
          return JSON.parse(JSON.stringify(mapData));
        }
      },
      exists: function(url, locally) {},
      hasChanged: function(url) {
        return false;
      },
      monitor: function(url) {},
    };
  });
