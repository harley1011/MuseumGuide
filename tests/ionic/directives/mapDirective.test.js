describe('map directive tests', function () {
    var $rootScope,
        $compile;

    beforeEach(module('directives')); // load controllers module from project

    beforeEach(module('my.templates'));

    beforeEach(inject(function (_$rootScope_, _$compile_, $injector) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));



    describe('test cases for map directive test', function () {
        it('should produce the correct dom structure', function () {
            var scope = $rootScope.$new();
            var compiledElement = $compile(angular.element('<map></map>'))(scope);
            scope.$digest();
            var divElement = compiledElement.find('div');
            expect(divElement.length).toEqual(3);
        });

        it('should load the image in the background of the map-image div', function () {
            var scope = $rootScope.$new();
            var compiledElement = $compile(angular.element('<map></map>'))(scope);
            scope.$digest();
            var divElement = compiledElement.find('div');
            var mapDiv = $(divElement).find(".map-image");

            expect($(mapDiv[0]).css("background-image")).toContain("img/level-one.png");
        });


        it('should produce the correct dom structure with injected map points', function () {
            var scope = $rootScope.$new();
            scope.mapPoints = testDataMapPoints();
            var compiledElement = $compile(angular.element('<map></map>'))(scope);
            scope.$digest();
            var divElement = compiledElement.find('div');
            expect(divElement.length).toEqual(9);
            var pointDivs = $(divElement).find(".point-div");
            expect(pointDivs.length).toEqual(6);

        });
    });


    function testDataCurrentFloor() {
        return new Floor({
            "number": 1, //int (1-5)
            "name": "Level One", //string
            "map": {
                "url": "img/level-one.png", //string, url
                "width": 809, //int, px
                "height": 1715 //int, px
            },
            "points": [1, 2, 3, 4] //int[] or string[] SHA1 hash
        });
    }

    function testDataMapPoints() {
        var dimensions = {
          "width": 809,
          "height": 1715
        };
        var points = [{
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
            "subtype": "intersection", //string {"washroom", "stairs", ...}
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
            "subtype": "intersection", //string {"washroom", "stairs", ...}
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
        }];

        return [
          new GraphicalPoint(new PointOfInterest(points[0]), dimensions),
          new GraphicalPoint(new PointOfInterest(points[1]), dimensions),
          new GraphicalPoint(new PointOfTransition(points[2]), dimensions),
          new GraphicalPoint(new PointOfInterest(points[3]), dimensions),
          new GraphicalPoint(new PointOfInterest(points[4]), dimensions),
          new GraphicalPoint(new PointOfInterest(points[5]), dimensions),
        ];
    }
});
