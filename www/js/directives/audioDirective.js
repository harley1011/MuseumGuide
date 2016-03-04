angular.module('directives')
	.directive('mapAudio', function (ngAudio) {
		return {
			restrict: 'E',
			templateUrl: 'templates/audio.html',
			link: function (scope, element, attrs) {
				var player = {};
				scope.audio = ngAudio.load("../www/audio/bird.mp3"); // returns NgAudioObject

				/**
				 * list of player location attrs
				 */
				player.location = {
					beaconPlayer: "beaconPlayer",
					detailPlayer: "detailPlayer"
				};

				element.on('$destroy', function () {
					console.log("should stop");
					scope.audio.stop();
				});

				 /* @event stopMapAudioPlayer Stops the map's background music */
				scope.$on('stopMapAudioPlayer', function (event, data) {
					console.log('Stop main audio player');
					scope.audio.stop();

				});
			}
		};
	});
