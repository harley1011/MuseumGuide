angular.module('directives')
    .directive('mapAudio', function(ngAudio, $rootScope) {
        return {
            restrict: 'AE',
            templateUrl: 'templates/audio.html',
            link: function(scope, element, attrs) {

                var audioPlayer = {};

                /**
                 * list of player location attrs.player
                 */
                audioPlayer.location = {
                    beaconPlayer: "beaconPlayer",
                    detailPlayer: "detailPlayer"
                };

                (function init(){
                    scope.audio = ngAudio.load("../www/audio/Dog-barks.wav"); // returns NgAudioObject

                    if(attrs.player === audioPlayer.location.detailPlayer){
                        element[0].querySelector('.audio-play-pause').classList.remove('light');
                        element[0].querySelector('.audio-player-time').classList.remove('light');
                    }
                })();

                /**
                 * Handles audio click from directive
                 */
                scope.audioClicked = function() {
                    audioPlayer.pauseBeaconPlayerOnOther();

                    //TODO needs refactoring
                    if (scope.audio.paused) {
                        scope.audio.play();
                        audioPlayer.tooglePauseIcon();

                        clearInterval(scope.playInterval );
                        scope.playInterval = setInterval(function(){
                            if(scope.audio.remaining === 0){
                                audioPlayer.togglePlayIcon();
                            }
                        }, 1000);
                    } else {
                        scope.audio.pause();
                        audioPlayer.togglePlayIcon();
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
                    audioPlayer.playBeaconPlayer(data.path);
                    audioPlayer.tooglePauseIcon();
                    //}else {throw new Error("[audioDirective] Please provide a valid audio path ");}
                });

                /**
                 * @event pauseBeaconPlayer Pause the map's background music
                 */
                scope.$on('pauseBeaconPlayer', function(event, data) {
                    audioPlayer.pauseBeaconPlayer();
                    audioPlayer.togglePlayIcon();
                });

                /**
                 * @event stopBeaconPlayer Stop the map's background music
                 */
                scope.$on('stopBeaconPlayer', function(event, data) {
                    audioPlayer.stopBeaconPlayer();
                });


                /**
                 * Play iBeacon player
                 */
                audioPlayer.playBeaconPlayer = function(path) {
                    if (audioPlayer.isBeaconPlayer()) {
                        scope.audio = ngAudio.load(path); // returns NgAudioObject
                        scope.audio.play();
                        $rootScope.beaconAudio = scope.audio; //Hack keep track of main beacon player to stop it when we are on another page
                    }
                };

                /**
                 * Pause iBeacon player
                 */
                audioPlayer.pauseBeaconPlayer = function() {
                    if (scope.audio && audioPlayer.isBeaconPlayer()) {
                        scope.audio.pause();
                        audioPlayer.tooglePauseIcon();
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

                audioPlayer.tooglePauseIcon = function() {
                    element[0].querySelector('.audio-play-pause').classList.remove('ion-play');
                    element[0].querySelector('.audio-play-pause').classList.add('ion-pause');
                };

                audioPlayer.togglePlayIcon = function() {
                    element[0].querySelector('.audio-play-pause').classList.remove('ion-pause');
                    element[0].querySelector('.audio-play-pause').classList.add('ion-play');
                };

                audioPlayer.pauseBeaconPlayerOnOther = function() {
                    if (audioPlayer.isBeaconPlayer() === false) {
                        if ($rootScope.beaconAudio) {
                            $rootScope.beaconAudio.pause();
                        }
                    }
                };
            }
        };
    });
