describe('point directives tests', function () {
    var $rootScope,
        $compile;

    beforeEach(module('services'));

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
          "id": 1,
          "x": 11,
          "y": 11,
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
          }],
          "style": {
              "color": "#00008B", //string, HEX Color
              "diameter": 2, //float, px
          }
        },
        dimensions = {
          width: 100,
          height: 100,
        };
        return new GraphicalPoint(new PointOfInterest(raw), dimensions);
    }
});
