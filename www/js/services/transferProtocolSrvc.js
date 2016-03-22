angular.module('services')
  .service('transferProtocolSrvc', function() {
    var points = [],
      pt;
    var storylines = [{
      "id": 1,
      "title": [{
          "language": "en_us",
          "title": "Story 1"
        }, {
          "language": "fr_ca",
          "title": "Histoire 1"
        }
      ],
      "description": [{
          "language": "en_us",
          "description": "This is the first story."
        }, {
          "language": "fr_ca",
          "description": "Ceci est la première histoire"
        }
      ],
      "path": [1, 3, 5, 12],
      "thumbnail": "/path/to/nowhere/thumb.png",
      "walkingTimeInMinutes": "20",
      "floorsCovered": "5"
    }, {
      "id": 2,
      "title": [{
          "language": "en_us",
          "title": "Story 2"
        }, {
          "language": "fr_ca",
          "title": "Histoire 2"
        }
      ],
      "description": [{
          "language": "en_us",
          "description": "This is the second story."
        }, {
          "language": "fr_ca",
          "description": "Ceci est la deuxième histoire"
        }
      ],
      "path": [1, 3, 5],
      "thumbnail": "/path/to/nowhere/thumb.png",
      "walkingTimeInMinutes": "20",
      "floorsCovered": "5"
    }, {
      "id": 3,
      "title": [{
          "language": "en_us",
          "title": "Story 3"
        }, {
          "language": "fr_ca",
          "title": "Histoire 3"
        }
      ],
      "description": [{
          "language": "en_us",
          "description": "This is the third story."
        }, {
          "language": "fr_ca",
          "description": "Ceci est la troisième histoire"
        }
      ],
      "path": [13, 19],
      "thumbnail": "/path/to/nowhere/thumb.png",
      "walkingTimeInMinutes": "20",
      "floorsCovered": "5"
    }, {
      "id": 4,
      "title": [{
          "language": "en_us",
          "title": "Story 4"
        }, {
          "language": "fr_ca",
          "title": "Histoire 4"
        }
      ],
      "description": [{
          "language": "en_us",
          "description": "This is the fourth story."
        }, {
          "language": "fr_ca",
          "description": "Ceci est la quatrième histoire"
        }
      ],
      "path": [1, 3, 5, 12],
      "thumbnail": "/path/to/nowhere/thumb.png",
      "walkingTimeInMinutes": "20",
      "floorsCovered": "5"
    }, {
      "id": 5,
      "title": [{
          "language": "en_us",
          "title": "Story 5"
        }, {
          "language": "fr_ca",
          "title": "Histoire 5"
        }
      ],
      "description": [{
          "language": "en_us",
          "description": "This is the fifth story."
        }, {
          "language": "fr_ca",
          "description": "Ceci est la cinquième histoire"
        }
      ],
      "path": [1, 3, 5, 12],
      "thumbnail": "/path/to/nowhere/thumb.png",
      "walkingTimeInMinutes": "20",
      "floorsCovered": "5"
    }, {
      "id": 6,
      "title": [{
          "language": "en_us",
          "title": "Story 6"
        }, {
          "language": "fr_ca",
          "title": "Histoire 6"
        }
      ],
      "description": [{
          "language": "en_us",
          "description": "This is the sixth story."
        }, {
          "language": "fr_ca",
          "description": "Ceci est la sixième histoire"
        }
      ],
      "path": [1, 3, 5, 12],
      "thumbnail": "/path/to/nowhere/thumb.png",
      "walkingTimeInMinutes": "20",
      "floorsCovered": "5"
    }];

    var points = {
      "poi": [{
  			"id": 1,
  			"title": [{
            "language": "en",
            "title": "Point 1 Title"
          }, {
            "language": "fr",
            "title": "Titre du point 1"
          }
        ],
        "description": [{
            "language": "en",
            "description": "Point 1 Description"
          }, {
            "language": "fr",
            "description": "Description du Point 1"
          }
        ],
        "x": 120,
        "y": 1565,
  			"floorID": 1,
  			"iBeacon": {
  				"uuid": "b9407f30-f5f8-466e-aff9-25556b57fe6d",
  				"major": "undefined",
  				"minor": "undefined"
  			},
  			"media": {
          "image": [{
            "path": "/path/to/nowhere/img.png",
            "language": "en",
            "caption": "This is an image caption for Point 1 with no storyline."
          }],
          "video": [{
            "path": "/path/to/nowhere/video.mp4",
            "language": "en",
            "caption": "This is a video caption for Point 1 with no storyline."
          }],
          "audio": [{
            "path": "/path/to/nowhere/audio.mp3",
            "language": "en",
            "caption": "This is an audio caption for Point 1 with no storyline."
          }]
        },
  			"storyPoint": [
          {
            "storylineID": 1,
            "title": [{
                "language": "en",
                "title": "Nipper: Searching for his master's voice"
              }, {
                "language": "fr",
                "title": "Nipper: À la recherche de la voix de son maître"
              }
            ],
            "description": [{
                "language": "en",
                "description": "Nipper comes back from a stroll outside and is looking for his master, who is the plant's president Elmer C. Grimley. However, a new extension has been recently added and opened (building 17), and Nipper is a bit confused. After he went to the old office (in building 5a), which is empty and close, he needs to find out, where the new president's office is. On top, it's a very busy day for his master and the factory inspections have to be done and production has started on high volume."
              }, {
                "language": "fr",
                "description": "Nipper revient d'une promenade à l'extérieur et recherche son maître et président de la manufacture, Elmer C. Grimley. Malheureusement pour Nipper, un nouvel agrandissement, le bâtiment 17, à été ajouté au complexe manufacturier, et Nipper ne sait plus où donner de la tête. ..."
              }
            ],
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
              ],
              "video": [{
                "path": "/path/to/nowhere/video.mp4",
                "language": "en",
                "caption": "This is a video caption for Point 1 with no storyline."
              }],
              "audio": [{
                "path": "/path/to/nowhere/audio.mp3",
                "language": "en",
                "caption": "This is an audio caption for Point 1 with no storyline."
              }]
            }
          }]
  			}, {
    		  "id": 3,
    			"title": [{
              "language": "en",
              "title": "Point 3 Title"
            }, {
              "language": "fr",
              "title": "Titre du point 3"
            }
          ],
          "description": [{
              "language": "en",
              "description": "Point 3 Description"
            }, {
              "language": "fr",
              "description": "Description du Point 3"
            }
          ],
          "x": 295,
          "y": 1645,
    			"floorID": 1,
    			"iBeacon": {
    				"uuid": "undefined",
    				"major": "undefined",
    				"minor": "undefined"
    			},
    			"media": {
            "image": [{
              "path": "/path/to/nowhere/img.png",
              "language": "en",
              "caption": "This is an image caption for Point 3 with no storyline."
            }],
            "video": [{
              "path": "/path/to/nowhere/video.mp4",
              "language": "en",
              "caption": "This is a video caption for Point 3 with no storyline."
            }],
            "audio": [{
              "path": "/path/to/nowhere/audio.mp3",
              "language": "en",
              "caption": "This is an audio caption for Point 3 with no storyline."
            }]
          },
    			"storyPoint": [
            {
              "storylineID": 1,
              "title": [{
                  "language": "en",
                  "title": "Nipper: Searching for his master's voice"
                }, {
                  "language": "fr",
                  "title": "Nipper: À la recherche de la voix de son maître"
                }
              ],
              "description": [{
                  "language": "en",
                  "description": "Nipper comes back from a stroll outside and is looking for his master, who is the plant's president Elmer C. Grimley. However, a new extension has been recently added and opened (building 17), and Nipper is a bit confused. After he went to the old office (in building 5a), which is empty and close, he needs to find out, where the new president's office is. On top, it's a very busy day for his master and the factory inspections have to be done and production has started on high volume."
                }, {
                  "language": "fr",
                  "description": "Nipper revient d'une promenade à l'extérieur et recherche son maître et président de la manufacture, Elmer C. Grimley. Malheureusement pour Nipper, un nouvel agrandissement, le bâtiment 17, à été ajouté au complexe manufacturier, et Nipper ne sait plus où donner de la tête. ..."
                }
              ],
              "media": {
                "image": [{
                  "path": "/path/to/nowhere/img.png",
                  "language": "en",
                  "caption": "This is an image caption for Point 3 with the Story 1."
                }],
                "video": [{
                  "path": "/path/to/nowhere/video.mp4",
                  "language": "en",
                  "caption": "This is a video caption for Point 3 with no storyline."
                }],
                "audio": [{
                  "path": "/path/to/nowhere/audio.mp3",
                  "language": "en",
                  "caption": "This is an audio caption for Point 3 with no storyline."
                }]
              }
          }]
    		}, {
    			"id": 5,
    			"title": [{
              "language": "en",
              "title": "Point 5 Title"
            }, {
              "language": "fr",
              "title": "Titre du point 5"
            }
          ],
          "description": [{
              "language": "en",
              "description": "Point 5 Description"
            }, {
              "language": "fr",
              "description": "Description du Point 5"
            }
          ],
          "x": 485,
          "y": 1559,
    			"floorID": 1,
    			"iBeacon": {
    				"uuid": "8492e75f-4fd6-469d-b132-043fe94921d8",
    				"major": "undefined",
    				"minor": "undefined"
    			},
    			"media": {
            "image": [{
              "path": "/path/to/nowhere/img.png",
              "language": "en",
              "caption": "This is an image caption for Point 5 with no storyline."
            }],
            "video": [{
              "path": "/path/to/nowhere/video.mp4",
              "language": "en",
              "caption": "This is a video caption for Point 5 with no storyline."
            }],
            "audio": [{
              "path": "/path/to/nowhere/audio.mp3",
              "language": "en",
              "caption": "This is an audio caption for Point 5 with no storyline."
            }]
          },
    			"storyPoint": [
            {
              "storylineID": 1,
              "title": [{
                  "language": "en",
                  "title": "Nipper: Searching for his master's voice"
                }, {
                  "language": "fr",
                  "title": "Nipper: À la recherche de la voix de son maître"
                }
              ],
              "description": [{
                  "language": "en",
                  "description": "Nipper comes back from a stroll outside and is looking for his master, who is the plant's president Elmer C. Grimley. However, a new extension has been recently added and opened (building 17), and Nipper is a bit confused. After he went to the old office (in building 5a), which is empty and close, he needs to find out, where the new president's office is. On top, it's a very busy day for his master and the factory inspections have to be done and production has started on high volume."
                }, {
                  "language": "fr",
                  "description": "Nipper revient d'une promenade à l'extérieur et recherche son maître et président de la manufacture, Elmer C. Grimley. Malheureusement pour Nipper, un nouvel agrandissement, le bâtiment 17, à été ajouté au complexe manufacturier, et Nipper ne sait plus où donner de la tête. ..."
                }
              ],
              "media": {
                "image": [{
                  "path": "/path/to/nowhere/img.png",
                  "language": "en",
                  "caption": "This is an image caption for Point 5 with the Story 1."
                }],
                "video": [{
                  "path": "/path/to/nowhere/video.mp4",
                  "language": "en",
                  "caption": "This is a video caption for Point 5 with no storyline."
                }],
                "audio": [{
                  "path": "/path/to/nowhere/audio.mp3",
                  "language": "en",
                  "caption": "This is an audio caption for Point 5 with no storyline."
                }]
              }
            }]
    		}, {
    			"id": 12,
    			"title": [{
              "language": "en",
              "title": "Point 12 Title"
            }, {
              "language": "fr",
              "title": "Titre du point 12"
            }
          ],
          "description": [{
              "language": "en",
              "description": "Point 12 Description"
            }, {
              "language": "fr",
              "description": "Description du Point 12"
            }
          ],
          "x": 630,
          "y": 1645,
    			"floorID": 3,
    			"iBeacon": {
    				"uuid": "undefined",
    				"major": "undefined",
    				"minor": "undefined"
    			},
    			"media": {
            "image": [{
              "path": "/path/to/nowhere/img.png",
              "language": "en",
              "caption": "This is an image caption for Point 12 with no storyline."
            }],
            "video": [{
              "path": "/path/to/nowhere/video.mp4",
              "language": "en",
              "caption": "This is a video caption for Point 12 with no storyline."
            }],
            "audio": [{
              "path": "/path/to/nowhere/audio.mp3",
              "language": "en",
              "caption": "This is an audio caption for Point 12 with no storyline."
            }]
          },
    			"storyPoint": [
            {
              "storylineID": 1,
              "title": [{
                  "language": "en",
                  "title": "Nipper: Searching for his master's voice"
                }, {
                  "language": "fr",
                  "title": "Nipper: À la recherche de la voix de son maître"
                }
              ],
              "description": [{
                  "language": "en",
                  "description": "Nipper comes back from a stroll outside and is looking for his master, who is the plant's president Elmer C. Grimley. However, a new extension has been recently added and opened (building 17), and Nipper is a bit confused. After he went to the old office (in building 5a), which is empty and close, he needs to find out, where the new president's office is. On top, it's a very busy day for his master and the factory inspections have to be done and production has started on high volume."
                }, {
                  "language": "fr",
                  "description": "Nipper revient d'une promenade à l'extérieur et recherche son maître et président de la manufacture, Elmer C. Grimley. Malheureusement pour Nipper, un nouvel agrandissement, le bâtiment 17, à été ajouté au complexe manufacturier, et Nipper ne sait plus où donner de la tête. ..."
                }
              ],
              "media": {
                "image": [{
                  "path": "/path/to/nowhere/img.png",
                  "language": "en",
                  "caption": "This is an image caption for Point 12 with the Story 1."
                }],
                "video": [{
                  "path": "/path/to/nowhere/video.mp4",
                  "language": "en",
                  "caption": "This is a video caption for Point 12 with no storyline."
                }],
                "audio": [{
                  "path": "/path/to/nowhere/audio.mp3",
                  "language": "en",
                  "caption": "This is an audio caption for Point 12 with no storyline."
                }]
              }
            }]
    		}, {
    			"id": 13,
    			"title": [{
              "language": "en",
              "title": "Point 13 Title"
            }, {
              "language": "fr",
              "title": "Titre du point 13"
            }
          ],
          "description": [{
              "language": "en",
              "description": "Point 13 Description"
            }, {
              "language": "fr",
              "description": "Description du Point 13"
            }
          ],
          "x": 100,
          "y": 450,
    			"floorID": 1,
    			"iBeacon": {
    				"uuid": "undefined",
    				"major": "undefined",
    				"minor": "undefined"
    			},
    			"media": {
            "image": [{
              "path": "/path/to/nowhere/img.png",
              "language": "en",
              "caption": "This is an image caption for Point 13 with no storyline."
            }],
            "video": [{
              "path": "/path/to/nowhere/video.mp4",
              "language": "en",
              "caption": "This is a video caption for Point 13 with no storyline."
            }],
            "audio": [{
              "path": "/path/to/nowhere/audio.mp3",
              "language": "en",
              "caption": "This is an audio caption for Point 13 with no storyline."
            }]
          },
    			"storyPoint": [
            {
              "storylineID": 3,
              "title": [{
                  "language": "en",
                  "title": "Nipper: Searching for his master's voice"
                }, {
                  "language": "fr",
                  "title": "Nipper: À la recherche de la voix de son maître"
                }
              ],
              "description": [{
                  "language": "en",
                  "description": "Nipper comes back from a stroll outside and is looking for his master, who is the plant's president Elmer C. Grimley. However, a new extension has been recently added and opened (building 17), and Nipper is a bit confused. After he went to the old office (in building 5a), which is empty and close, he needs to find out, where the new president's office is. On top, it's a very busy day for his master and the factory inspections have to be done and production has started on high volume."
                }, {
                  "language": "fr",
                  "description": "Nipper revient d'une promenade à l'extérieur et recherche son maître et président de la manufacture, Elmer C. Grimley. Malheureusement pour Nipper, un nouvel agrandissement, le bâtiment 17, à été ajouté au complexe manufacturier, et Nipper ne sait plus où donner de la tête. ..."
                }
              ],
              "media": {
                "image": [{
                  "path": "/path/to/nowhere/img.png",
                  "language": "en",
                  "caption": "This is an image caption for Point 13 with the Story 3."
                }],
                "video": [{
                  "path": "/path/to/nowhere/video.mp4",
                  "language": "en",
                  "caption": "This is a video caption for Point 13 with no storyline."
                }],
                "audio": [{
                  "path": "/path/to/nowhere/audio.mp3",
                  "language": "en",
                  "caption": "This is an audio caption for Point 13 with no storyline."
                }]
              }
            }]
    		}, {
    			"id": 19,
    			"title": [{
              "language": "en",
              "title": "Point 19 Title"
            }, {
              "language": "fr",
              "title": "Titre du point 19"
            }
          ],
          "description": [{
              "language": "en",
              "description": "Point 19 Description"
            }, {
              "language": "fr",
              "description": "Description du Point 19"
            }
          ],
          "x": 600,
          "y": 325,
    			"floorID": 1,
    			"iBeacon": {
    				"uuid": "undefined",
    				"major": "undefined",
    				"minor": "undefined"
    			},
    			"media": {
            "image": [{
              "path": "/path/to/nowhere/img.png",
              "language": "en",
              "caption": "This is an image caption for Point 19 with no storyline."
            }],
            "video": [{
              "path": "/path/to/nowhere/video.mp4",
              "language": "en",
              "caption": "This is a video caption for Point 19 with no storyline."
            }],
            "audio": [{
              "path": "/path/to/nowhere/audio.mp3",
              "language": "en",
              "caption": "This is an audio caption for Point 19 with no storyline."
            }]
          },
    			"storyPoint": [
            {
              "storylineID": 3,
              "title": [{
                  "language": "en",
                  "title": "Nipper: Searching for his master's voice"
                }, {
                  "language": "fr",
                  "title": "Nipper: À la recherche de la voix de son maître"
                }
              ],
              "description": [{
                  "language": "en",
                  "description": "Nipper comes back from a stroll outside and is looking for his master, who is the plant's president Elmer C. Grimley. However, a new extension has been recently added and opened (building 17), and Nipper is a bit confused. After he went to the old office (in building 5a), which is empty and close, he needs to find out, where the new president's office is. On top, it's a very busy day for his master and the factory inspections have to be done and production has started on high volume."
                }, {
                  "language": "fr",
                  "description": "Nipper revient d'une promenade à l'extérieur et recherche son maître et président de la manufacture, Elmer C. Grimley. Malheureusement pour Nipper, un nouvel agrandissement, le bâtiment 17, à été ajouté au complexe manufacturier, et Nipper ne sait plus où donner de la tête. ..."
                }
              ],
              "media": {
                "image": [{
                  "path": "/path/to/nowhere/img.png",
                  "language": "en",
                  "caption": "This is an image caption for Point 19 with the Story 3."
                }],
                "video": [{
                  "path": "/path/to/nowhere/video.mp4",
                  "language": "en",
                  "caption": "This is a video caption for Point 19 with no storyline."
                }],
                "audio": [{
                  "path": "/path/to/nowhere/audio.mp3",
                  "language": "en",
                  "caption": "This is an audio caption for Point 19 with no storyline."
                }]
              }
            }]
    		}
      ],
      "pot": [{
    			"id": 2,
          "label": {
              "language": "en",
              "label": "intersection"
          },
          "x": 270,
          "y": 1580,
          "floorID": 1
    		}, {
    			"id": 4,
          "label": {
              "language": "en",
              "label": "intersection"
          },
          "x": 300,
          "y": 1545,
          "floorID": 1
      	}, {
    			"id": 6,
          "label": {
              "language": "en",
              "label": "stairs"
          },
          "x": 485,
          "y": 1245,
          "floorID": 1
      	}, {
    			"id": 7,
          "label": {
              "language": "en",
              "label": "stairs"
          },
          "x": 485,
          "y": 1245,
          "floorID": 2
      	}, {
    			"id": 8,
          "label": {
              "language": "en",
              "label": "stairs"
          },
          "x": 485,
          "y": 1245,
          "floorID": 3
      	}, {
    			"id": 9,
          "label": {
              "language": "en",
              "label": "intersection"
          },
          "x": 520,
          "y": 1305,
          "floorID": 3
      	}, {
    			"id": 10,
          "label": {
              "language": "en",
              "label": "intersection"
          },
          "x": 610,
          "y": 1312,
          "floorID": 3
      	}, {
    			"id": 11,
          "label": {
              "language": "en",
              "label": "intersection"
          },
          "x": 585,
          "y": 1590,
          "floorID": 3
      	}, {
    			"id": 14,
          "label": {
              "language": "en",
              "label": "intersection"
          },
          "x": 220,
          "y": 440,
          "floorID": 1
      	}, {
    			"id": 15,
          "label": {
              "language": "en",
              "label": "intersection"
          },
          "x": 220,
          "y": 860,
          "floorID": 1
      	}, {
    			"id": 16,
          "label": {
              "language": "en",
              "label": "intersection"
          },
          "x": 500,
          "y": 860,
          "floorID": 1
      	}, {
    			"id": 17,
          "label": {
              "language": "en",
              "label": "intersection"
          },
          "x": 480,
          "y": 450,
          "floorID": 1
      	}, {
    			"id": 18,
          "label": {
              "language": "en",
              "label": "intersection"
          },
          "x": 500,
          "y": 320,
          "floorID": 1
      	}
  		]
    };

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
