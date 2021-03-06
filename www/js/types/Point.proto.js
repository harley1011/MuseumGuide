var Point = (function (){

  var privateData = new WeakMap();

  //Constructor Function
  function Point(raw) {
    var privateMembers = {
      id: raw.id,
      coordinates: {"x": raw.x, "y": raw.y, "z": raw.floorID},
    };
    privateData.set(this, privateMembers);
  }

  Point.prototype.constructor = Point;

  Point.prototype.getUUID = function(){
    return privateData.get(this).id;
  };

  Point.prototype.getCoordinates = function(){
    return privateData.get(this).coordinates;
  };

  Point.prototype.destructor = function(){
    privateData.delete(this);
  };

  return Point;
}());
