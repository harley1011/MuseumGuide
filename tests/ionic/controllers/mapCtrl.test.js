describe('controllers', function () {
    var storyLinePathSrvc,
        iBeaconSrvc1,
        mapDataSrvc,
        scope;

    beforeEach(module('controllers')); // load controllers module from project

    beforeEach(function () {
        module('services');
        module(function ($provide) {
            $provide.service('iBeaconSrvc', function () {
                this.BeaconBuilder = {
                    registerBeaconRegions: function (identifier, uuid) {
                    },
                    init: function(){

                    },
                    notifyEvent: ""
                }
            });
        });

    });

    beforeEach(inject(function (_$controller_, _storyLinePathSrvc_, iBeaconSrvc, _mapDataSrvc_, $rootScope) {
        scope=$rootScope.$new();
        $controller = _$controller_;
        storyLinePathSrvc = _storyLinePathSrvc_;
        iBeaconSrvc1 = iBeaconSrvc;
        mapDataSrvc = _mapDataSrvc_;
    }));

    describe('map controller test', function () {
        it('SHOULD TEST', function () {
            var controller = $controller('mapCtrl', {
                $scope: scope,
                storyLinePathSrvc: storyLinePathSrvc,
                iBeaconSrvc: iBeaconSrvc1,
                mapDataSrvc: mapDataSrvc
            });
            expect(scope.currentLevel.number).toEqual(1);
        });
    });

});
