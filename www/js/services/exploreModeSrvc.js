angular.module('services')
  .service('exploreModeSrvc', function(JSONFactorySrvc, storylineSrvc, floorSrvc, pointSrvc, storyLinePathSrvc) {
    var currentMode = 0;
    var selectedStoryline = "";
    
    this.setMode = function (modeNumber) {
        currentMode = modeNumber;
    };
    
    this.getMode = function () {
        return currentMode;  
    };

    this.setStoryline = function(story) {
        selectedStoryline = story;    
    };
    
    this.getSelectedStoryline = function () {
        return selectedStoryline;  
    };
    
    this.getStorylines = function () {
        storylines = storylineSrvc.getStorylines();
        return storylines;
    };
    
    
});