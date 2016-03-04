angular.module('directives')
    .directive('mapAudio', function(ngAudio) {
        return {
            restrict: 'E',
            templateUrl: 'templates/audio.html',
            scope: {
                player: '='
            },
            link: function(scope, element, attrs) {
                var audioPlayer = {};
                scope.audio = ngAudio.load("../www/audio/bird.mp3"); // returns NgAudioObject

                /**
                 * list of player location attrs
                 */
                audioPlayer.location = {
                    beaconPlayer: "beaconPlayer",
                    detailPlayer: "detailPlayer"
                };

				/**
				 *  Stop player on view change
				 */
                scope.$on('$destroy', function() {
                    scope.audio.stop();
                });

                /**
				 * @event stopMapAudioPlayer Stops the map's background music
				 */
                scope.$on('stopMapAudioPlayer', function(event, data) {
					scope.audio.stop();
                });

				/**
				 * Stop iBeacon player
				 */
				audioPlayer.stopMapPlayer = function(){
					if (player === audioPlayer.location.beaconPlayer) {
						console.log('Stop main audio player');
						scope.audio.stop();
					}
				};
            }
        };
    });
