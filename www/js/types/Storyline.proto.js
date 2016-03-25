var Storyline = (function (){

  var privateData = new WeakMap();

  //Constructor Function
  function Storyline(raw) {
    var privateMembers = {
      uuid: raw.id,
      title: raw.title,
      description: raw.description,
      points: raw.path,
      walkingTime: raw.walkingTimeInMinutes,
      numFloors: raw.floorsCovered,
      thumbnail: raw.thumbnail
    };
    privateData.set(this, privateMembers);
  }

  Storyline.prototype.constructor = Storyline;

  Storyline.prototype.getUUID = function(){
    return privateData.get(this).uuid;
  };

  Storyline.prototype.getTitle = function(){
    return privateData.get(this).title;
  };

  Storyline.prototype.getTitleWithLanguage = function(language){
    var title;
    var titles = privateData.get(this).title;
    if( typeof titles === 'string' ) {
      return titles;
    }
    for(var i = 0; i < titles.length; i++) {
      title = titles[i].title;
      if(titles[i].language === language)
        break;
    }
    return title;
  };

  Storyline.prototype.getPoints = function(){
    return privateData.get(this).points;
  };

  Storyline.prototype.getDescription = function(){
    return privateData.get(this).description;
  };

  Storyline.prototype.getDescriptionWithLanguage = function(language){
    var description;
    var descriptions = privateData.get(this).description;
    for(var i = 0; i < descriptions.length; i++) {
      description = descriptions[i].description;
      if(descriptions[i].language === language)
        break;
    }
    return description;
  };

  Storyline.prototype.getWalkingTime = function(){
    return privateData.get(this).walkingTime;
  };

  Storyline.prototype.getNumFloors = function(){
    return privateData.get(this).numFloors;
  };

  Storyline.prototype.getThumbnail = function(){
    return privateData.get(this).thumbnail;
  };

  Storyline.prototype.destructor = function(){
    privateData.delete(this);
  };

  return Storyline;
}());
