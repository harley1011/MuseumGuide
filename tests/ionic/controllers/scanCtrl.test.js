describe('controllers', function () {
    var scope,
        $state,
        qrSrvc1,
        translatePartialLoader;

    beforeEach(module('controllers')); // load controllers module from project
    beforeEach(module('pascalprecht.translate'));

    beforeEach(function () {
        module('services');
        module(function ($provide) {
            $provide.service('state', function () {
                return {
                    go: function (state) {

                    }
                }
            });

            $provide.service('$translatePartialLoader', function () {
                return {
                    addPart: function (language) {
                    }
                }
            });
            $provide.service('$state', function () {
                return {
                    show: function () {
                    }
                }
            });

            $provide.service('qrSrvc', function () {
                var storedDetails;
                return {

                    storeQrDetails: function (details) {
                        storedDetails = details;
                    },
                    getQrDetails: function()
                    {
                        return storedDetails;
                    }
                }
            });
        });

    });


    beforeEach(inject(function (_$controller_, state, qrSrvc, $rootScope, $translatePartialLoader) {
        scope = $rootScope.$new();
        $state = state;
        $controller = _$controller_;
        qrSrvc1 = qrSrvc;
        translatePartialLoader = $translatePartialLoader;
    }));

    describe('scan controller test', function () {
        it('should test the openQRScanner function', function () {
            var controller = $controller('scanCtrl', {
                $scope: scope,
                $state: $state,
                $translatePartialLoader: translatePartialLoader,
                qrSrvc: qrSrvc1
            });
            console.log(scope.openQRScanner);
            scope.openQRScanner();
            expect(qrSrvc1.getQrDetails()).toBeDefined();

        });

    });
});
