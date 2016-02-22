angular.module('controllers')
.controller('settingsCtrl', function($scope, $state, $translatePartialLoader) {
	$translatePartialLoader.addPart('settings');
});
