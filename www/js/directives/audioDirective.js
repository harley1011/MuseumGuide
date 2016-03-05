angular.module('directives')
    .directive('mapAudio', function(ngAudio, $rootScope) {
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
                    console.log(scope.audio);
                    if (audioPlayer.isBeaconPlayer() === false) {
                        if ($rootScope.beaconAudio) {
                            $rootScope.beaconAudio.pause();
                        }
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
                 * @event stopBeaconPlayer Stop the map's background music
                 */
                scope.$on('stopBeaconPlayer', function(event, data) {
                    audioPlayer.stopBeaconPlayer();
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
                 * Pause iBeacon player
                 */
                audioPlayer.pauseBeaconPlayer = function() {
                    if (scope.audio && audioPlayer.isBeaconPlayer()) {
                        scope.audio.pause();
                    }
                };

                /**
                 * Stop iBeacon player
                 */
                audioPlayer.stopBeaconPlayer = function() {
                    if (scope.audio && audioPlayer.isBeaconPlayer()) {
                        scope.audio.stop();
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
