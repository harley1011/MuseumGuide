describe('testCtrl', function () {
	var scope,
		createController;

	beforeEach(module('controllers')); // load controllers module from project

	// mockup
	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new();
	 	$controller('testCtrl', {$scope: scope});

	}));

	describe('$scope.foo', function () {
		it('should access value helloWorld from testCtrl', function () {
			expect(scope.foo).toEqual('helloWorld');
		});
	});
});
