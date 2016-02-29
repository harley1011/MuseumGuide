angular.module('services')
  .service('mediaSrvc', function(JSONFactorySrvc) {
    var medias = {},
      mediaType = new MediaType(),
      lang = new Language();
    return {
      getMedia: function(uuid) {
        if(typeof uuid === 'string'){
          return medias[uuid] === undefined ? []: [medias[uuid]];
        }else if(Array.isArray(uuid)){
          var arr = [];
          for(var i = 0 ; i < uuid.length ; i++){
            if(medias[uuid[i]]){
              arr.push(medias[uuid[i]]);
            }
          }
          return arr;
        }else{
          return [];
        }
      },
      getMediaByLanguage: function(uuids, language) {
        var arr = [];
        for (var i = 0 ; i < uuids.length; i++) {
          if (medias[uuids[i]] instanceof Media &&
            mediaType.getTypeValue(medias[uuids[i]].getLanguage()) === language) {
            arr.push(medias[uuids[i]]);
          }
        }
      },
      getMediaByType: function(uuids, type) {
        var arr = [];
        for (var i = 0 ; i < uuids.length; i++) {
          if (medias[uuids[i]] instanceof Media &&
            mediaType.getTypeValue(medias[uuids[i]].getType()) === type) {
            arr.push(medias[uuids[i]]);
          }
        }
      },
      loadMedia: function() {
        var arr = JSONFactorySrvc.load("media"),
            media;
        for (var i = 0 ; i < arr.length; i++) {
          media = arr[i];
          if(media instanceof Media)
            medias[media.getUUID()] = media;
        }
      }
    };
  });
