angular.module('controllers')
.controller('settingsCtrl', function($scope, $state, $translate, $translatePartialLoader) {
	$translatePartialLoader.addPart('settings');
});
