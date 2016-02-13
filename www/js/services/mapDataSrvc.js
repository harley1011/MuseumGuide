angular.module('services')
    .service('mapDataSrvc', function () {
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
                "beacon_id": "b9407f30-f5f8-466e-aff9-25556b57fe6d", //int or SHA1 hash
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
                "beacon_id": "8492e75f-4fd6-469d-b132-043fe94921d8", //int or SHA1 hash
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
            },
                {
                    "id": 2, //int or SHA1 hash
                    "name": {
                        "en_us": "Story 2", //string
                        "fr_ca": "", //string
                    },
                    "description": {
                        "en_us": "This is the first story.", //string
                        "fr_ca": "", //string
                    },
                    "points": [1, 3, 5] //int[] or string[] SHA1 hash
                }
                , {
                    "id": 3, //int or SHA1 hash
                    "name": {
                        "en_us": "Story 3", //string
                        "fr_ca": "", //string
                    },
                    "description": {
                        "en_us": "This is the first story.", //string
                        "fr_ca": "", //string
                    },
                    "points": [1, 3, 5, 12] //int[] or string[] SHA1 hash
                },
                {
                    "id": 4, //int or SHA1 hash
                    "name": {
                        "en_us": "Story 4", //string
                        "fr_ca": "", //string
                    },
                    "description": {
                        "en_us": "This is the first story.", //string
                        "fr_ca": "", //string
                    },
                    "points": [1, 3, 5, 12] //int[] or string[] SHA1 hash
                },
                {
                    "id": 5, //int or SHA1 hash
                    "name": {
                        "en_us": "Story 5", //string
                        "fr_ca": "", //string
                    },
                    "description": {
                        "en_us": "This is the first story.", //string
                        "fr_ca": "", //string
                    },
                    "points": [1, 3, 5, 12] //int[] or string[] SHA1 hash
                },
                {
                    "id": 6, //int or SHA1 hash
                    "name": {
                        "en_us": "Story 6", //string
                        "fr_ca": "", //string
                    },
                    "description": {
                        "en_us": "This is the first story.", //string
                        "fr_ca": "", //string
                    },
                    "points": [1, 3, 5, 12] //int[] or string[] SHA1 hash
                }],
        };

        return {mapData: mapData};
    });
