angular.module('controllers')
.controller("audioCtrl",function($scope,ngAudio){
    $scope.audio = ngAudio.load("../www/audio/bird.mp3"); // returns NgAudioObject
})
