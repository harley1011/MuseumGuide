var Storyline = (function (){

  var privateData = new WeakMap();

  //Constructor Function
  function Storyline(raw) {
    var privateMembers = {
      uuid: raw.id,
      title: raw.name,
      description: raw.description,
      points: raw.points,
      walkingTime: null,
      numFloors: null,
      thumbnail: null
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

  Storyline.prototype.getDescription = function(){
    return privateData.get(this).description;
  };

  Storyline.prototype.getWalkingTimes = function(){
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
