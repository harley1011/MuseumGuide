angular.module('controllers')
.controller('langCtrl', function($scope, $state, $translate, $ionicHistory) {
    $scope.currentLanguage = $translate.use() == 'en' ? 'en' : 'fr';
    
    $scope.english = function () {
		$scope.changeLanguage("en");
        $state.go('tab.level');
    };

	$scope.french = function () {
		$scope.changeLanguage("fr");
        $state.go('tab.level');
	};

    $scope.changeToEnglish = function () {
        $scope.changeLanguage("en");
        $ionicHistory.goBack(-1);
    };

    $scope.changeToFrench = function () {
        $scope.changeLanguage("fr");
        $ionicHistory.goBack(-1);
    };

  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };
    
    $scope.isEnglish = function() {
        if($scope.currentLanguage == 'en') {
            return true;
        } else {
            return false;
        }
    };

});
