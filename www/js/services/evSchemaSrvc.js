angular.module('services')
    .service('evSchemaSrvc', function () {
        var evSchemaSrvc = {
            getSchema: function () {
                return {
                    "floorPlan": [
                        {
                            "floorID": "3",
                            "imagePath": "/floor/3/floor3.png",
                            "imageWidth": 2343,
                            "imageHeight": 2352
                        }
                    ],
                    "node": [
                        {
                            "poi": [
                                {
                                    "id": 0,
                                    "title": [
                                        {
                                            "language": "EN",
                                            "title": "EV 3.187"
                                        }
                                    ],
                                    "x": 1883.312101910828,
                                    "y": 513.6305732484076,
                                    "color": "Blue",
                                    "description": [
                                        {
                                            "language": "EN",
                                            "description": "<div>Professor's office</div><div><b>blueberry</b></div>"
                                        }
                                    ],
                                    "floorID": "3",
                                    "ibeacon": {
                                        "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
                                        "major": "59520",
                                        "minor": "56840"
                                    },
                                    "media": {
                                        "image": [],
                                        "video": [
                                            {
                                                "path": "video/MOEB POINT 1 - Small.mov",
                                                "language": "EN",
                                                "caption": "MOEB Point 1"
                                            },
                                            {
                                                "path": "video/MOEB_Introduction - Small.mov",
                                                "language": "EN",
                                                "caption": "MOEB Intro"
                                            }
                                        ],
                                        "audio": []
                                    },
                                    "storyPoint": [
                                        {
                                            "storylineID": 0,
                                            "title": [
                                                {
                                                    "language": "EN",
                                                    "title": "EV 3.187"
                                                }
                                            ],
                                            "description": [
                                                {
                                                    "language": "EN",
                                                    "description": "<div>Professor's office</div><div><b>blueberry</b></div>"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": 7,
                                    "title": [
                                        {
                                            "language": "EN",
                                            "title": "Evacuation instructions"
                                        }
                                    ],
                                    "x": 984.4585987261146,
                                    "y": 406.62420382165607,
                                    "color": "Orange",
                                    "description": [
                                        {
                                            "language": "EN",
                                            "description": "<div>Read the instructions carefully for your safety!</div><div><b>Mint</b></div>"
                                        }
                                    ],
                                    "floorID": "3",
                                    "ibeacon": {
                                        "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
                                        "major": "11163",
                                        "minor": "7229"
                                    },
                                    "media": {
                                        "image": [
                                            {
                                                "path": "image/evacuation-route-arrow-floor-sign-sf-0055.png",
                                                "language": "EN",
                                                "caption": "Follow the exit signs"
                                            }
                                        ],
                                        "video": [
                                            {
                                                "path": "video/MOEB POINT 2  - Small.mov",
                                                "language": "EN",
                                                "caption": "MOEB Point 2"
                                            },
                                            {
                                                "path": "video/MOEB POINT 3 - Small.mov",
                                                "language": "EN",
                                                "caption": "MOEB Point 4"
                                            }
                                        ],
                                        "audio": []
                                    },
                                    "storyPoint": [
                                        {
                                            "storylineID": 0,
                                            "title": [
                                                {
                                                    "language": "EN",
                                                    "title": "Evacuation instructions"
                                                }
                                            ],
                                            "description": [
                                                {
                                                    "language": "EN",
                                                    "description": "<div>Read the instructions carefully for your safety!</div><div><b>Mint</b></div>"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": 9,
                                    "title": [
                                        {
                                            "language": "EN",
                                            "title": "End of your demo"
                                        }
                                    ],
                                    "x": 513.6305732484076,
                                    "y": 428.02547770700636,
                                    "color": "Violet",
                                    "description": [
                                        {
                                            "language": "EN",
                                            "description": "<div>Get some rest. It's over!</div><div><b>Icy</b></div>"
                                        }
                                    ],
                                    "floorID": "3",
                                    "ibeacon": {
                                        "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
                                        "major": "32561",
                                        "minor": "47495"
                                    },
                                    "media": {
                                        "image": [],
                                        "video": [
                                            {
                                                "path": "video/MOEB POINT 4 - Small.mov",
                                                "language": "EN",
                                                "caption": "MOEB Point 4"
                                            }
                                        ],
                                        "audio": []
                                    },
                                    "storyPoint": [
                                        {
                                            "storylineID": 0,
                                            "title": [
                                                {
                                                    "language": "EN",
                                                    "title": "End of your demo"
                                                }
                                            ],
                                            "description": [
                                                {
                                                    "language": "EN",
                                                    "description": "<div>Get some rest. It's over!</div><div><b>Icy</b></div>"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            "pot": [
                                {
                                    "id": 1,
                                    "title": "pot1",
                                    "x": 1819.1082802547771,
                                    "y": 556.4331210191083,
                                    "label": "None",
                                    "color": "Green",
                                    "floorID": "3"
                                },
                                {
                                    "id": 2,
                                    "title": "pot2",
                                    "x": 1819.1082802547771,
                                    "y": 727.6433121019109,
                                    "label": "None",
                                    "color": "Green",
                                    "floorID": "3"
                                },
                                {
                                    "id": 3,
                                    "title": "pot3",
                                    "x": 1797.7070063694268,
                                    "y": 791.8471337579617,
                                    "label": "None",
                                    "color": "Green",
                                    "floorID": "3"
                                },
                                {
                                    "id": 4,
                                    "title": "pot4",
                                    "x": 1797.7070063694268,
                                    "y": 963.0573248407643,
                                    "label": "None",
                                    "color": "Green",
                                    "floorID": "3"
                                },
                                {
                                    "id": 5,
                                    "title": "pot5",
                                    "x": 1177.0700636942674,
                                    "y": 963.0573248407643,
                                    "label": "None",
                                    "color": "Green",
                                    "floorID": "3"
                                },
                                {
                                    "id": 6,
                                    "title": "pot6",
                                    "x": 1177.0700636942674,
                                    "y": 428.02547770700636,
                                    "label": "None",
                                    "color": "Green",
                                    "floorID": "3"
                                },
                                {
                                    "id": 8,
                                    "title": "pot7",
                                    "x": 834.6496815286624,
                                    "y": 428.02547770700636,
                                    "label": "None",
                                    "color": "Green",
                                    "floorID": "3"
                                },
                                {
                                    "id": 10,
                                    "title": "pot8",
                                    "x": 1819.1082802547771,
                                    "y": 428.02547770700636,
                                    "label": "None",
                                    "color": "Red",
                                    "floorID": "3"
                                }
                            ]
                        }
                    ],
                    "edge": [
                        {
                            "startNode": {
                                "id": 0,
                                "floorID": "3"
                            },
                            "endNode": {
                                "id": 1,
                                "floorID": "3"
                            }
                        },
                        {
                            "startNode": {
                                "id": 1,
                                "floorID": "3"
                            },
                            "endNode": {
                                "id": 2,
                                "floorID": "3"
                            }
                        },
                        {
                            "startNode": {
                                "id": 2,
                                "floorID": "3"
                            },
                            "endNode": {
                                "id": 3,
                                "floorID": "3"
                            }
                        },
                        {
                            "startNode": {
                                "id": 3,
                                "floorID": "3"
                            },
                            "endNode": {
                                "id": 4,
                                "floorID": "3"
                            }
                        },
                        {
                            "startNode": {
                                "id": 4,
                                "floorID": "3"
                            },
                            "endNode": {
                                "id": 5,
                                "floorID": "3"
                            }
                        },
                        {
                            "startNode": {
                                "id": 5,
                                "floorID": "3"
                            },
                            "endNode": {
                                "id": 6,
                                "floorID": "3"
                            }
                        },
                        {
                            "startNode": {
                                "id": 6,
                                "floorID": "3"
                            },
                            "endNode": {
                                "id": 7,
                                "floorID": "3"
                            }
                        },
                        {
                            "startNode": {
                                "id": 7,
                                "floorID": "3"
                            },
                            "endNode": {
                                "id": 8,
                                "floorID": "3"
                            }
                        },
                        {
                            "startNode": {
                                "id": 8,
                                "floorID": "3"
                            },
                            "endNode": {
                                "id": 9,
                                "floorID": "3"
                            }
                        },
                        {
                            "startNode": {
                                "id": 1,
                                "floorID": "3"
                            },
                            "endNode": {
                                "id": 10,
                                "floorID": "3"
                            }
                        },
                        {
                            "startNode": {
                                "id": 10,
                                "floorID": "3"
                            },
                            "endNode": {
                                "id": 6,
                                "floorID": "3"
                            }
                        }
                    ],
                    "storyline": [
                        {
                            "id": 0,
                            "title": "Demo Storyline",
                            "description": "Let's see how good is your mobile app!",
                            "floorsCovered": 1,
                            "path": [
                                0,
                                1,
                                2,
                                3,
                                4,
                                5,
                                6,
                                7,
                                8,
                                9
                            ]
                        }
                    ]
                }
            }
        }
        return evSchemaSrvc;
    });