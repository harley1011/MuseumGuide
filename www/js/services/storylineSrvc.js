angular.module('services')
  .service('storylineSrvc', function(JSONFactorySrvc, $ionicPopup) {
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
      setFreeRoamMode: function() {
        currentStoryline = undefined;
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

      },
      storylinePopup: function(storyLine, language, callback) {
        var titleDisplayed;
        var messageDisplayed = "";
        var walkTime = storyLine.getWalkingTime();
        var numFloors = storyLine.getNumFloors();
        var thumbnail = storyLine.getThumbnail();

        if (language == 'fr')
        {
          titleDisplayed = storyLine.getTitleWithLanguage("fr_ca");
          messageDisplayed = storyLine.getDescriptionWithLanguage("fr_ca");
        }
        else
        {
          titleDisplayed = storyLine.getTitleWithLanguage("en_us");
          messageDisplayed = storyLine.getDescriptionWithLanguage("en_us");
        }

        if (walkTime && walkTime.length > 0)
        {
          messageDisplayed += '</br></br> Walking time is around ' + walkTime + ' minutes'
        }
        if (numFloors && numFloors.length > 0)
        {
          messageDisplayed += '</br></br>' + numFloors + ' floors covered'
        }

        $ionicPopup.show({
          template: messageDisplayed,
          title: titleDisplayed,
          custom: true,
          buttons: [
            { text: '',
              type: 'button-cancel ion-close-circled'},
            {
              text: 'Chose Storyline',
              type: 'button-more-details',
              onTap: function(e) {
                callback();
              }
            }
          ]
        });
      }
    };
    storylineSrvc.loadStorylines();
    return storylineSrvc;
  });
