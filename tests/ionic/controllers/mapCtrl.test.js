describe('controllers', function () {
    var storyLinePathSrvc,
        iBeaconSrvc1,
        scope,
        $state,
        JSONFactorySrvc,
        $ionicPopup;

    beforeEach(module('controllers')); // load controllers module from project
    beforeEach(module('pascalprecht.translate'));

    beforeEach(function () {
        module('services');
        module(function ($provide) {
            $provide.service('iBeaconSrvc', function () {
                this.BeaconBuilder = {
                    registerBeaconRegions: function (identifier, uuid) {
                    },
                    init: function () {

                    },
                    notifyEvent: ""
                };
            });

            $provide.service('$ionicPopup', function () {
                return {
                    show: function () {
                    }
                }
            });
            $provide.service('$state', function () {
                return {
                    show: function () {
                    }
                }
            });

        });

    });


    beforeEach(inject(function (_$controller_, _$state_, _storyLinePathSrvc_,
      _storylineSrvc_, _mediaSrvc_, _pointSrvc_, _floorSrvc_, _textSrvc_,
      iBeaconSrvc, $rootScope, _$ionicPopup_) {
        scope = $rootScope.$new();
        $state = _$state_;
        $controller = _$controller_;
        storyLinePathSrvc = _storyLinePathSrvc_;
        storylineSrvc = _storylineSrvc_;
        mediaSrvc = _mediaSrvc_;
        pointSrvc = _pointSrvc_;
        floorSrvc = _floorSrvc_;
        textSrvc = _textSrvc_;
        iBeaconSrvc1 = iBeaconSrvc;
        $ionicPopup = _$ionicPopup_;
    }));

    describe('map controller test', function () {
		/*
        it('should generate at least the points of interest', function () {
            var controller = $controller('mapCtrl', {
                $scope: scope,
                $state: $state,
                storyLinePathSrvc: storyLinePathSrvc,
                iBeaconSrvc: iBeaconSrvc1,
                $ionicPopup: $ionicPopup
            });
            expect(
							(function(){
								var count = 0;
								for(var key in scope.mapPoints){
									if(scope.mapPoints[key] instanceof GraphicalPoint)
										count++;
								}
								return count;
							})()).toBeGreaterThan(3);
        });
*/
        it('should generate all the lines in the path', function () {
            var controller = $controller('mapCtrl', {
                $scope: scope,
                $state: $state,
                storyLinePathSrvc: storyLinePathSrvc,
                iBeaconSrvc: iBeaconSrvc1,
                $ionicPopup: $ionicPopup
            });
            expect(scope.mapLines.length).toBeGreaterThan(4);
        });
    });
});
