angular.module('directives')
    .directive('mapAudio', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/audio.html',
            link: function(scope, element, attrs, ngAudio) {
                scope.audio = ngAudio.load("../www/audio/bird.mp3"); // returns NgAudioObject
            }
        };
    });
