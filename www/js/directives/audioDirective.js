angular.module('directives')
    .directive('mapAudio', function(ngAudio,$rootScope) {
        return {
            restrict: 'AE',
            templateUrl: 'templates/audio.html',
            link: function(scope, element, attrs) {
                var audioPlayer = {};
                scope.audio = ngAudio.load("../www/audio/Dog-barks.wav"); // returns NgAudioObject

                /**
                 * Handles audio click from directive
                 */
                scope.audioClicked = function() {
                    if (audioPlayer.isBeaconPlayer() === false){
                        $rootScope.beaconAudio.pause();
                    }

                    if (scope.audio.paused) {
                        scope.audio.play();
                    } else {
                        scope.audio.pause();
                    }
                };

                /**
                 * Stop player on view change
                 */
                scope.$on('$destroy', function() {
                    if (scope.audio) {
                        scope.audio.stop();
                    }
                });

                /**
                 * @event playBeaconPlayer Play the map's background music
                 */
                scope.$on('playBeaconPlayer', function(event, data) {
                    //if(data.path){
                    audioPlayer.playBeaconPlayer();
                    //}else {throw new Error("[audioDirective] Please provide a valid audio path ");}
                });

                /**
                 * @event pauseBeaconPlayer Pause the map's background music
                 */
                scope.$on('pauseBeaconPlayer', function(event, data) {
                    audioPlayer.pauseBeaconPlayer();
                });

                /**
                 * list of player location attrs.player
                 */
                audioPlayer.location = {
                    beaconPlayer: "beaconPlayer",
                    detailPlayer: "detailPlayer"
                };

                /**
                 * Play iBeacon player
                 */
                audioPlayer.playBeaconPlayer = function(path) {
                    if (audioPlayer.isBeaconPlayer()) {
                        scope.audio = ngAudio.load("../www/audio/bird.mp3"); // returns NgAudioObject
                        scope.audio.play();
                        $rootScope.beaconAudio = scope.audio;
                    }
                };

                /**
                 * Stop iBeacon player
                 */
                audioPlayer.pauseBeaconPlayer = function() {
                    console.log(audioPlayer.isBeaconPlayer() + attrs.player);
                    if (scope.audio && audioPlayer.isBeaconPlayer()) {
                        console.log('Im in pause beacon player');
                        scope.audio.pause();
                    }
                };

                /**
                 * Determine if current player is iBeacon
                 */
                audioPlayer.isBeaconPlayer = function() {
                    return (attrs.player === audioPlayer.location.beaconPlayer);
                };
            }
        };
    });
