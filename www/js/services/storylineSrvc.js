angular.module('services')
  .service('storylineSrvc', function(JSONFactorySrvc) {
    var storylines = {},
        currentStoryline;
    var storylineSrvc = {
      getStorylinesByUUID: function(uuids){
        var arr = [];
        for(var i = 0 ; i < uuids.length; i++){
          if(storylines[uuids[i]] !== undefined)
            arr.push(storylines[uuids[i]]);
        }
        return arr;
      },
      getCurrentStoryline: function() {
        return currentStoryline !== undefined? storylines[currentStoryline] : undefined;
      },
      setCurrentStoryline: function(storyline) {
        if(storyline instanceof Storyline){
          currentStoryline = storyline.getUUID();
        }
      },
      getStorylines: function() {
        var arr = [];
        for(key in storylines){
          arr.push(storylines[key]);
        }
        return arr;
      },
      loadStorylines: function() {
        var arr = JSONFactorySrvc.load("storylines"),
            storyline;
        for (var i = 0 ; i < arr.length; i++) {
          storyline = arr[i];
          if(storyline instanceof Storyline)
            storylines[storyline.getUUID()] = storyline;
        }

      }
    };
    storylineSrvc.loadStorylines();
    return storylineSrvc;
  });
