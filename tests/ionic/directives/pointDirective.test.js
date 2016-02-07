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
            scope.point = testDataMapPoints()[0];
            console.log(scope.point);
            var compiledElement = $compile(angular.element('<div class="point-div" map-point point="point"></div>'))(scope);
            scope.$digest();
            expect(compiledElement.attr('style')).toEqual('left: 10%; top: 10%;');
        });
    });

    function testDataMapPoints() {
        return [{
            left : 10,
            top : 10,
            "background-color": 'black',
            width : 8,
            height : 8
        }];
    }
});
