describe('point directives tests', function () {
    var $rootScope,
        $compile;

    beforeEach(module('directives')); // load controllers module from project

    beforeEach(module('my.templates'));

    beforeEach(inject(function (_$rootScope_, _$compile_, $injector) {

        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));



    describe('test cases for point directive test', function () {
        it('should produce the correct dom structure with injected map points', function () {
            var scope = $rootScope.$new();
            scope.point = testDataMapPoints();
            var compiledElement = $compile(angular.element('<div class="point-div" map-point point="point"></div>'))(scope);
            scope.$digest();
            expect(compiledElement.attr('style')).toContain('left: 10%; top: 10%;');
        });
    });

    function testDataMapPoints() {
        var raw = {
            "id": 6, //int or SHA1 hash
            "type": "poi", //string {"poi","fac","dir"}
            "subtype": "", //string {"washroom", "stairs", ...}
            "coordinate": {
                "x": 11, //float, px
                "y": 11, //float, px
                "z": 1, //int (1-5)
            },
            "neighbours": [3], //int[] or string[] SHA1 hash
            "beacon_id": "undefined", //int or SHA1 hash
            "style": {
                "color": "#00008B", //string, HEX Color
                "diameter": 2, //float, px
            },
        },
        dimensions = {
          width: 100,
          height: 100,
        };
        return new GraphicalPoint(new PointOfInterest(raw), dimensions);
    }
});
