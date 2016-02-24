var Floor = (function (){

  var privateData = new WeakMap();

  //Constructor Function
  function Floor(raw) {
    var privateMembers = {
      number: raw.number,
      plan: new FloorPlan(raw.map),
      points: raw.points,
    };
    privateData.set(this, privateMembers);
  }

  Floor.prototype.constructor = Floor;

  Floor.prototype.getNumber = function(){
    return privateData.get(this).number;
  };

  Floor.prototype.getPlan = function(){
    return privateData.get(this).plan;
  };

  Floor.prototype.getPoints = function(){
    return privateData.get(this).points;
  };

  Floor.prototype.destructor = function(){
    privateData.delete(this);
  };

  return Floor;
}());
