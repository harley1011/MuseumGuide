var FloorPlan = (function (){

  var privateData = new WeakMap();

  //Constructor Function
  function FloorPlan(raw) {
    var privateMembers = {
      url: raw.url,
      width: raw.width,
      height: raw.height,
    };
    privateData.set(this, privateMembers);
  }

  FloorPlan.prototype.constructor = FloorPlan;

  FloorPlan.prototype.getURL = function(){
    return privateData.get(this).url;
  };

  FloorPlan.prototype.getDimensions = function(){
    var floorPlan = privateData.get(this);
    return {width: floorPlan.width, height: floorPlan.height};
  };

  FloorPlan.prototype.getWidth = function(){
    return privateData.get(this).width;
  };

  FloorPlan.prototype.getHeight = function(){
    return privateData.get(this).height;
  };

  FloorPlan.prototype.destructor = function(){
    privateData.delete(this);
  };

  return FloorPlan;
}());
