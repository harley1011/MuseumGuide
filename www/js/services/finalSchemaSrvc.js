angular.module('services')
    .service('finalSchemaSrvc', function () {
        var finalSchemaSrvc = {
            getSchema: function () {
                return {
                    "floorPlan": [{
                        "floorID": 2,
                        "imagePath": "floor_plans/floor2.svg",
                        "imageWidth": 4381,
                        "imageHeight": 2220
                    }, {
                        "floorID": 3,
                        "imagePath": "floor_plans/floor3.svg",
                        "imageWidth": 4381,
                        "imageHeight": 2220
                    }, {
                        "floorID": 4,
                        "imagePath": "floor_plans/floor4.svg",
                        "imageWidth": 4381,
                        "imageHeight": 2220
                    }, {
                        "floorID": 5,
                        "imagePath": "floor_plans/floor5.svg",
                        "imageWidth": 4381,
                        "imageHeight": 2220
                    }],
                    "node": {
                        "poi": [{
                            "id": 0,
                            "title": [{
                                "language": "EN",
                                "title": "MOEB Start for all tours"
                            }, {
                                "language": "FR",
                                "title": "Debut de tous le tours"
                            }],
                            "description": [{
                                "language": "EN",
                                "description": "<p>You can start an exploration tour on your own. Just keep your smart phone handy and walk. You will get notefied when you can listen to a audioclip, a video, images or written information on the building and its fascinating history. Happy walk!</p>\n"
                            }, {
                                "language": "FR",
                                "description": "<p>a besoin du traduction</p>\n"
                            }],
                            "x": 2538,
                            "y": 1110,
                            "floorID": 2,
                            "ibeacon": {
                                "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
                                "major": "26515",
                                "minor": "372"
                            },
                            "media": {
                                "image": [],
                                "video": [],
                                "audio": []
                            },
                            "storyPoint": [{
                                "ID": 0,
                                "storylineID": 0,
                                "title": [{
                                    "language": "EN",
                                    "title": "Start of the Nipper Tour"
                                }, {
                                    "language": "FR",
                                    "title": "Debut du tour avec Nipper"
                                }],
                                "description": [{
                                    "language": "EN",
                                    "description": "<p>Put in Intro video</p>\n"
                                }, {
                                    "language": "FR",
                                    "description": "<p>put in french video</p>\n"
                                }],
                                "media": {
                                    "image": [],
                                    "video": [{
                                        "path": "media_files/N1E.mp4",
                                        "language": "EN",
                                        "caption": ""
                                    }, {
                                        "path": "media_files/N1F.mp4",
                                        "language": "FR",
                                        "caption": ""
                                    }],
                                    "audio": []
                                }
                            }, {
                                "ID": 1,
                                "storylineID": 4,
                                "title": [{
                                    "language": "EN",
                                    "title": "Take a tour with Jean"
                                }, {
                                    "language": "FR",
                                    "title": "Prenez une tour avec Jean"
                                }],
                                "description": [{
                                    "language": "EN",
                                    "description": "<p>Nobody knows the history of the building as well as Jean Belisle. Jean is one of Canada&#39;s first industrial archaeologist and studied this complex since 1990. He saw the many recent transformations but also widnessed the casual excavations that took place when old foundations needed an upgrade. He will make the building talk to you. A truely amazing experience</p>\n"
                                }, {
                                    "language": "FR",
                                    "description": "<p>je besoin d&#39;une traduction en Francaise. Deutsch kann ich selber uebersetzen.</p>\n"
                                }],
                                "media": {
                                    "image": [],
                                    "video": [],
                                    "audio": []
                                }
                            }],
                            "autoOn": true
                        }, {
                            "id": 2,
                            "title": [{
                                "language": "EN",
                                "title": "Ross and MacDonald Building"
                            }, {
                                "language": "FR",
                                "title": "L'annex du Ross & MacDonald"
                            }],
                            "description": [{
                                "language": "EN",
                                "description": "<p>You have entered into the small extension that RCA had commissioned in the mid 1930s from Montreal&#39;s architectural firm Ross and MacDonald. The architects were in high demand, many buildings in Montreal carry their signature. Look at the smooth column heads. Nowhere else in the building will you see this level of care taken in the appearance.</p>\n"
                            }, {
                                "language": "FR",
                                "description": "<p>Aussi je besoin d&#39;une tradution</p>\n"
                            }],
                            "x": 2379,
                            "y": 601,
                            "floorID": 2,
                            "ibeacon": {
                                "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
                                "major": "26793",
                                "minor": "57400"
                            },
                            "media": {
                                "image": [],
                                "video": [],
                                "audio": []
                            },
                            "storyPoint": [{
                                "ID": 2,
                                "storylineID": 0,
                                "title": [{
                                    "language": "EN",
                                    "title": "The Man's and Women's cloak rooms"
                                }, {
                                    "language": "FR",
                                    "title": "chambre pour se changer"
                                }],
                                "description": [{
                                    "language": "EN",
                                    "description": "<p>Put in audio</p>\n"
                                }, {
                                    "language": "FR",
                                    "description": "<p>Il&#39;n y a pas de contenu</p>\n\n<p>No content available at this time, sorry.</p>\n\n<p>&nbsp;</p>\n"
                                }],
                                "media": {
                                    "image": [],
                                    "video": [],
                                    "audio": [{
                                        "path": "media_files/N2E.m4a",
                                        "language": "EN",
                                        "caption": ""
                                    }]
                                }
                            }],
                            "autoOn": true
                        }, {
                            "id": 4,
                            "title": [{
                                "language": "EN",
                                "title": "Presidents office"
                            }, {
                                "language": "FR",
                                "title": "Le bureau du President RCA"
                            }],
                            "description": [{
                                "language": "EN",
                                "description": "<p>When the building opened in 1936, the management and administration moved from the older complex along Lacasse and St. Antoine Street to here. The floorplan has cangened, resulting that you now can walk barrierfree from the cloakrooms, at the bottom of the stairs, through the showroom, crossing the advertisement department and ending up, where the secretary of the president had her or his desk. A private stair case, which starts today on the second floor, allowed the president to enter and exit the building relatively unobserved. How convenient.</p>\n"
                            }, {
                                "language": "FR",
                                "description": "<p>Une autre place de mettre du contenu</p>\n"
                            }],
                            "x": 1897,
                            "y": 526,
                            "floorID": 2,
                            "ibeacon": {
                                "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
                                "major": "60352",
                                "minor": "3099"
                            },
                            "media": {
                                "image": [],
                                "video": [],
                                "audio": []
                            },
                            "storyPoint": [{
                                "ID": 3,
                                "storylineID": 0,
                                "title": [{
                                    "language": "EN",
                                    "title": "Nipper at his Master's old office"
                                }, {
                                    "language": "FR",
                                    "title": "Nipper a trouve le vieille bureau du son Maitre"
                                }],
                                "description": [{
                                    "language": "EN",
                                    "description": "<p>put in video</p>\n"
                                }, {
                                    "language": "FR",
                                    "description": "<p>Il n&#39;y a pas de contenu a moment. Nous travaillons sur ca.</p>\n"
                                }],
                                "media": {
                                    "image": [],
                                    "video": [{
                                        "path": "media_files/N3E.mp4",
                                        "language": "EN",
                                        "caption": ""
                                    }],
                                    "audio": []
                                }
                            }, {
                                "ID": 4,
                                "storylineID": 4,
                                "title": [{
                                    "language": "EN",
                                    "title": "The presidence office from 1936 to 1943"
                                }, {
                                    "language": "FR",
                                    "title": "Le bureau du President 1936 a 1943"
                                }],
                                "description": [{
                                    "language": "EN",
                                    "description": "<p>attach video</p>\n"
                                }, {
                                    "language": "FR",
                                    "description": "<p>Jean, aid-moi de fair une version du video en francaise, si tu plait!!!</p>\n"
                                }],
                                "media": {
                                    "image": [],
                                    "video": [{
                                        "path": "media_files/J1E.mp4",
                                        "language": "EN",
                                        "caption": ""
                                    }],
                                    "audio": []
                                }
                            }],
                            "autoOn": true
                        }, {
                            "id": 7,
                            "title": [{
                                "language": "EN",
                                "title": "Freight Elevator"
                            }, {
                                "language": "FR",
                                "title": "Les lifts"
                            }],
                            "description": [{
                                "language": "EN",
                                "description": "<p>Look at the wall around the passenger elevator. You see the shadow of a much larger frame. We do not know why originally two freight elevators were here side by side. The old passenger elevator is still in place behind the door to the staircase. Have a look. Did you try to push the butten to call the elevator here? Well, good luck!</p>\n"
                            }, {
                                "language": "FR",
                                "description": "<p>pas encore traduit</p>\n"
                            }],
                            "x": 2605,
                            "y": 486,
                            "floorID": 2,
                            "ibeacon": {
                                "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
                                "major": "705",
                                "minor": "57191"
                            },
                            "media": {
                                "image": [],
                                "video": [],
                                "audio": []
                            },
                            "storyPoint": [{
                                "ID": 5,
                                "storylineID": 4,
                                "title": [{
                                    "language": "EN",
                                    "title": "An elevator affair"
                                }, {
                                    "language": "FR",
                                    "title": "Une affair des lifts"
                                }],
                                "description": [{
                                    "language": "EN",
                                    "description": "<p>put video</p>\n"
                                }, {
                                    "language": "FR",
                                    "description": "<p>Aussi ici, je besoin de l&#39;aid du Jean pour cree une version francaise</p>\n"
                                }],
                                "media": {
                                    "image": [],
                                    "video": [{
                                        "path": "media_files/J2E.mp4",
                                        "language": "EN",
                                        "caption": ""
                                    }],
                                    "audio": []
                                }
                            }],
                            "autoOn": true
                        }, {
                            "id": 14,
                            "title": [{
                                "language": "EN",
                                "title": "The column on the 5th floor"
                            }, {
                                "language": "FR",
                                "title": "Colunne du 5em etage"
                            }],
                            "description": [{
                                "language": "EN",
                                "description": "<p>put text</p>\n"
                            }, {
                                "language": "FR",
                                "description": "<p>a besoin du text</p>\n"
                            }],
                            "x": 2619,
                            "y": 506,
                            "floorID": 5,
                            "ibeacon": {
                                "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
                                "major": "35646",
                                "minor": "40805"
                            },
                            "media": {
                                "image": [],
                                "video": [],
                                "audio": []
                            },
                            "storyPoint": [{
                                "ID": 6,
                                "storylineID": 4,
                                "title": [{
                                    "language": "EN",
                                    "title": "The lonesome column"
                                }, {
                                    "language": "FR",
                                    "title": "La colonne seule"
                                }],
                                "description": [{
                                    "language": "EN",
                                    "description": "<p>put audio</p>\n"
                                }, {
                                    "language": "FR",
                                    "description": "<p>met l&#39;audio en francaise</p>\n"
                                }],
                                "media": {
                                    "image": [],
                                    "video": [],
                                    "audio": [{
                                        "path": "media_files/J3E.m4a",
                                        "language": "EN",
                                        "caption": ""
                                    }, {
                                        "path": "media_files/J3F.m4a",
                                        "language": "FR",
                                        "caption": ""
                                    }]
                                }
                            }],
                            "autoOn": true
                        }, {
                            "id": 17,
                            "title": [{
                                "language": "EN",
                                "title": "The court yard "
                            }, {
                                "language": "FR",
                                "title": "View dans la court du edifice"
                            }],
                            "description": [{
                                "language": "EN",
                                "description": "<p>put text</p>\n"
                            }, {
                                "language": "FR",
                                "description": "<p>a besoin du text en francaise</p>\n"
                            }],
                            "x": 4008,
                            "y": 1425,
                            "floorID": 5,
                            "ibeacon": {
                                "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
                                "major": "3969",
                                "minor": "16906"
                            },
                            "media": {
                                "image": [],
                                "video": [],
                                "audio": []
                            },
                            "storyPoint": [{
                                "ID": 7,
                                "storylineID": 4,
                                "title": [{
                                    "language": "EN",
                                    "title": "The old smoker"
                                }, {
                                    "language": "FR",
                                    "title": "Le vieu fumeur"
                                }],
                                "description": [{
                                    "language": "EN",
                                    "description": "<p>put video</p>\n"
                                }, {
                                    "language": "FR",
                                    "description": "<p>met video ici</p>\n"
                                }],
                                "media": {
                                    "image": [],
                                    "video": [{
                                        "path": "media_files/J4E.mp4",
                                        "language": "EN",
                                        "caption": ""
                                    }],
                                    "audio": []
                                }
                            }],
                            "autoOn": true
                        }],
                        "pot": [{
                            "id": 1,
                            "label": "none",
                            "x": 2527,
                            "y": 631,
                            "floorID": 2
                        }, {
                            "id": 3,
                            "label": "none",
                            "x": 2343,
                            "y": 565,
                            "floorID": 2
                        }, {
                            "id": 5,
                            "label": "none",
                            "x": 2398,
                            "y": 538,
                            "floorID": 2
                        }, {
                            "id": 6,
                            "label": "none",
                            "x": 2404,
                            "y": 468,
                            "floorID": 2
                        }, {
                            "id": 8,
                            "label": "stairs",
                            "x": 2611,
                            "y": 375,
                            "floorID": 2
                        }, {
                            "id": 9,
                            "label": "elevator",
                            "x": 2541,
                            "y": 568,
                            "floorID": 2
                        }, {
                            "id": 15,
                            "label": "none",
                            "x": 2670,
                            "y": 581,
                            "floorID": 5
                        }, {
                            "id": 16,
                            "label": "none",
                            "x": 4051,
                            "y": 702,
                            "floorID": 5
                        }, {
                            "id": 18,
                            "label": "stairs",
                            "x": 2598,
                            "y": 401,
                            "floorID": 5
                        }, {
                            "id": 19,
                            "label": "elevator",
                            "x": 2542,
                            "y": 571,
                            "floorID": 5
                        }, {
                            "id": 22,
                            "label": "stairs",
                            "x": 2597,
                            "y": 403,
                            "floorID": 4
                        }, {
                            "id": 23,
                            "label": "stairs",
                            "x": 2593,
                            "y": 402,
                            "floorID": 3
                        }, {
                            "id": 24,
                            "label": "elevator",
                            "x": 2545,
                            "y": 572,
                            "floorID": 3
                        }, {
                            "id": 25,
                            "label": "elevator",
                            "x": 2545,
                            "y": 568,
                            "floorID": 4
                        }, {
                            "id": 26,
                            "label": "none",
                            "x": 2379,
                            "y": 601,
                            "floorID": 2
                        }]
                    },
                    "edge": [{
                        "startNode": 0,
                        "endNode": 1,
                        "distance": 479.12628815376013
                    }, {
                        "startNode": 1,
                        "endNode": 2,
                        "distance": 151.00993344810135
                    }, {
                        "startNode": 1,
                        "endNode": 26,
                        "distance": 151.00993344810135
                    }, {
                        "startNode": 2,
                        "endNode": 3,
                        "distance": 50.91168824543142
                    }, {
                        "startNode": 26,
                        "endNode": 3,
                        "distance": 50.91168824543142
                    }, {
                        "startNode": 3,
                        "endNode": 4,
                        "distance": 447.7019097569274
                    }, {
                        "startNode": 3,
                        "endNode": 5,
                        "distance": 61.26989472816156
                    }, {
                        "startNode": 5,
                        "endNode": 6,
                        "distance": 70.25667228100119
                    }, {
                        "startNode": 6,
                        "endNode": 7,
                        "distance": 201.80436070610565
                    }, {
                        "startNode": 7,
                        "endNode": 8,
                        "distance": 111.16204388189342
                    }, {
                        "startNode": 9,
                        "endNode": 7,
                        "distance": 104.01922899156675
                    }, {
                        "startNode": 14,
                        "endNode": 15,
                        "distance": 90.69729874698585
                    }, {
                        "startNode": 15,
                        "endNode": 16,
                        "distance": 1386.290734297824
                    }, {
                        "startNode": 16,
                        "endNode": 17,
                        "distance": 724.2775711010248
                    }, {
                        "startNode": 14,
                        "endNode": 18,
                        "distance": 107.07940978544848
                    }, {
                        "startNode": 14,
                        "endNode": 19,
                        "distance": 100.7670581092849
                    }, {
                        "startNode": 8,
                        "endNode": 23,
                        "distance": 32.449961479175904
                    }, {
                        "startNode": 23,
                        "endNode": 22,
                        "distance": 4.123105625617661
                    }, {
                        "startNode": 22,
                        "endNode": 18,
                        "distance": 2.23606797749979
                    }, {
                        "startNode": 19,
                        "endNode": 25,
                        "distance": 4.242640687119285
                    }, {
                        "startNode": 25,
                        "endNode": 24,
                        "distance": 4
                    }, {
                        "startNode": 24,
                        "endNode": 9,
                        "distance": 5.656854249492381
                    }],
                    "storyline": [{
                        "id": 0,
                        "title": [{
                            "language": "EN",
                            "title": "A stroll with Nipper"
                        }, {
                            "language": "FR",
                            "title": "Marcher avec Nipper"
                        }],
                        "description": [{
                            "language": "EN",
                            "description": "The presidents dog Nipper searches his Master"
                        }, {
                            "language": "FR",
                            "description": "Le chien du Presidente cherche son Maitre"
                        }],
                        "path": [0, 1, 2, 3, 4],
                        "thumbnail": "",
                        "walkingTimeInMinutes": "",
                        "floorsCovered": [2]
                    }, {
                        "id": 4,
                        "title": [{
                            "language": "FR",
                            "title": "Une tour avec Jean"
                        }, {
                            "language": "EN",
                            "title": "A tour with Jean"
                        }],
                        "description": [{
                            "language": "FR",
                            "description": "Decouvrez l'histoire du Edifice RCA"
                        }, {
                            "language": "EN",
                            "description": "Discover the history of the Edifice RCA"
                        }],
                        "path": [0, 1, 26, 3, 4, 3, 5, 6, 7, 9, 24, 25, 19, 14, 15, 16, 17],
                        "thumbnail": "",
                        "walkingTimeInMinutes": "",
                        "floorsCovered": [2, 5]
                    }]
                }
            }
        }
        return finalSchemaSrvc;
    });
