angular.module('controllers')
.controller('langCtrl', function($scope, $state, $translate) {

    $scope.english = function () {
        console.log("Speaking English");
		$scope.changeLanguage("en");
        $state.go('tab.level');
    };

	$scope.french = function () {
		console.log("Speaking French");
		$scope.changeLanguage("fr");
		$state.go('tab.level');
	};


  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };

});
