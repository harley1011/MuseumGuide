angular.module('services')
  .service('textSrvc', function(JSONFactorySrvc) {
    var texts = {}
        lang = new Language();
    var textSrvc = {
      getTexts: function(opts){
        var txts, exists;
        if(opts.uuid === undefined || texts[opts.uuid] === undefined){
          txts = undefined;
        }else if(!(lang.getTypeValue(opts.language)) && (opts.storyline === undefined || texts[opts.storyline] === undefined)){
          txts = texts[opts.uuid];
        }else{
          if(texts[opts.uuid][opts.storyline] !== undefined){
            if(lang.getTypeValue(opts.language)){
              txts = {};
              exists = texts[opts.uuid][opts.storyline].title[opts.language] ? true : false;
              txts.title =  exists ? texts[opts.uuid][opts.storyline].title[opts.language] : "";
              exists = texts[opts.uuid][opts.storyline].description[opts.language] ? true : false;
              txts.description =  exists ? texts[opts.uuid][opts.storyline].description[opts.language] : "";
            }else{
              txts = undefined;
            }
          }else{
            txts = undefined;
          }
        }
        return txts;
      },
      loadMedia: function() {
        texts = JSONFactorySrvc.load("texts");
      }
    };
    textSrvc.loadMedia();
    return textSrvc;
  });
