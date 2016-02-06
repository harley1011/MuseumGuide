angular.module('services')

.service('mapDataSrvc', function () {

	var mapData = {
		"point": [{
			"id": 1, //int or SHA1 hash
			"type": "poi", //string {"poi","fac","dir"}
			"subtype": "", //string {"washroom", "stairs", ...}
			"coordinate": {
				"x": 120, //float, px
				"y": 1506, //float, px
				"z": 1, //int (1-5)
			},
			"neighbours": [2, 3], //int[] or string[] SHA1 hash
			"beacon_id": "undefined", //int or SHA1 hash
			"style": {
				"color": "#00008B", //string, HEX Color
				"diameter": 12, //float, px
			},
		}, {
			"id": 2, //int or SHA1 hash
			"type": "poi", //string {"poi","fac","dir"}
			"subtype": "", //string {"washroom", "stairs", ...}
			"coordinate": {
				"x": 230, //float, px
				"y": 1372, //float, px
				"z": 1, //int (1-5)
			},
			"neighbours": [1, 3], //int[] or string[] SHA1 hash
			"beacon_id": "undefined", //int or SHA1 hash
			"style": {
				"color": "#a6a6a6", //string, HEX Color
				"diameter": 12, //float, px
			},
		}, {
			"id": 3, //int or SHA1 hash
			"type": "dir", //string {"poi","fac","dir"}
			"subtype": "", //string {"washroom", "stairs", ...}
			"coordinate": {
				"x": 260, //float, px
				"y": 1516, //float, px
				"z": 1, //int (1-5)
			},
			"neighbours": [1, 2, 4, 6], //int[] or string[] SHA1 hash
			"beacon_id": "undefined", //int or SHA1 hash
			"style": {
				"color": "#a6a6a6", //string, HEX Color
				"diameter": 12, //float, px
			},
		}, {
			"id": 4, //int or SHA1 hash
			"type": "dir", //string {"poi","fac","dir"}
			"subtype": "", //string {"washroom", "stairs", ...}
			"coordinate": {
				"x": 274, //float, px
				"y": 1485, //float, px
				"z": 1, //int (1-5)
			},
			"neighbours": [3, 5], //int[] or string[] SHA1 hash
			"beacon_id": "undefined", //int or SHA1 hash
			"style": {
				"color": "#a6a6a6", //string, HEX Color
				"diameter": 12, //float, px
			},
		}, {
			"id": 5, //int or SHA1 hash
			"type": "poi", //string {"poi","fac","dir"}
			"subtype": "", //string {"washroom", "stairs", ...}
			"coordinate": {
				"x": 520, //float, px
				"y": 1503, //float, px
				"z": 1, //int (1-5)
			},
			"neighbours": [4], //int[] or string[] SHA1 hash
			"beacon_id": "undefined", //int or SHA1 hash
			"style": {
				"color": "#00008B", //string, HEX Color
				"diameter": 12, //float, px
			},
		}, {
			"id": 6, //int or SHA1 hash
			"type": "poi", //string {"poi","fac","dir"}
			"subtype": "", //string {"washroom", "stairs", ...}
			"coordinate": {
				"x": 270, //float, px
				"y": 1580, //float, px
				"z": 1, //int (1-5)
			},
			"neighbours": [3], //int[] or string[] SHA1 hash
			"beacon_id": "undefined", //int or SHA1 hash
			"style": {
				"color": "#00008B", //string, HEX Color
				"diameter": 12, //float, px
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
			"points": [1, 2, 3, 4] //int[] or string[] SHA1 hash
		}, {
			"number": 2, //int (1-5)
			"name": "Level Two", //string
			"map": {
				"url": "img/level-two.png", //string, url
				"width": 809, //int, px
				"height": 1715 //int, px
			},
			"points": [1, 2, 3, 4] //int[] or string[] SHA1 hash
		}, {
			"number": 3, //int (1-5)
			"name": "Level Three", //string
			"map": {
				"url": "img/level-three.png", //string, url
				"width": 809, //int, px
				"height": 1715 //int, px
			},
			"points": [1, 2, 3, 4] //int[] or string[] SHA1 hash
		}, {
			"number": 4, //int (1-5)
			"name": "Level Four", //string
			"map": {
				"url": "img/level-four.png", //string, url
				"width": 809, //int, px
				"height": 1715 //int, px
			},
			"points": [1, 2, 3, 4] //int[] or string[] SHA1 hash
		}, {
			"number": 5, //int (1-5)
			"name": "Level Five", //string
			"map": {
				"url": "img/level-five.png", //string, url
				"width": 809, //int, px
				"height": 1715 //int, px
			},
			"points": [1, 2, 3, 4] //int[] or string[] SHA1 hash
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
			"points": [1, 6, 5] //int[] or string[] SHA1 hash
		}],
	};

	return {mapData: mapData};
});
