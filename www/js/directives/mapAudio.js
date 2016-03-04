angular.module('directives')
    .directive('mapAudio', function(ngAudio) {
        return {
            restrict: 'E',
            templateUrl: 'templates/audio.html',
            link: function(scope, element, attrs) {
                scope.audio = ngAudio.load("../www/audio/bird.mp3"); // returns NgAudioObject
            }
        };
    });
