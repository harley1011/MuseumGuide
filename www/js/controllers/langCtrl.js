angular.module('controllers')
.controller('langCtrl', function($scope, $state, $translate, $ionicHistory) {
    $scope.english = function () {
        console.log("Speaking English");
		$scope.changeLanguage("en");
        $ionicHistory.goBack(-1);
    };

	$scope.french = function () {
		console.log("Speaking French");
		$scope.changeLanguage("fr");
        $ionicHistory.goBack(-1);
	};


  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };

});
