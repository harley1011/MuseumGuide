var GraphicalPoint = (function (){

  var privateData = new WeakMap();

  //Constructor Function
  function GraphicalPoint(point, context) {
    var wrapper = {};
    wrapper.calculatePercentage = function(pos, max) {
        return 100 * pos / max;
    };
    wrapper.point = point;
    wrapper.display = {};
    wrapper.display.left = wrapper.calculatePercentage(point.getCoordinates().x - (point.getDiameter() / 2), context.width);
    wrapper.display.top = wrapper.calculatePercentage(point.getCoordinates().y - (point.getDiameter() / 2), context.height);
    wrapper.display.diameter = {};
    wrapper.display.diameter.x = wrapper.calculatePercentage(point.getDiameter(), context.width);
    wrapper.display.diameter.y = wrapper.calculatePercentage(point.getDiameter(), context.height);
    wrapper.current = false;
    privateData.set(this, wrapper);
  }

  GraphicalPoint.prototype.constructor = GraphicalPoint;

  GraphicalPoint.prototype.getUUID = function(){
    return privateData.get(this).id;
  };

  GraphicalPoint.prototype.getCoordinates = function(){
    return privateData.get(this).point.getCoordinates();
  };

  GraphicalPoint.prototype.getUUID = function(){
    return privateData.get(this).point.getUUID();
  };

  GraphicalPoint.prototype.getBeaconID = function(){
    var point = privateData.get(this).point;
    return point instanceof PointOfInterest ? point.getBeaconID() : undefined;
  };

  GraphicalPoint.prototype.getDisplayOptions = function(){
    return privateData.get(this).display;
  };

  GraphicalPoint.prototype.getColor = function(){
    return privateData.get(this).point.getColor();
  };

  GraphicalPoint.prototype.setColor = function(color){
    var point = privateData.get(this).point;
    point.setColor = color;
  };

  GraphicalPoint.prototype.getDiameter = function(){
    return privateData.get(this).diameter;
  };

  GraphicalPoint.prototype.isCurrent = function(){
    return privateData.get(this).current;
  };

  GraphicalPoint.prototype.setCurrent = function(current){
    privateData.get(this).current = current;
  };

  GraphicalPoint.prototype.destructor = function(){
    privateData.delete(this);
  };

  return GraphicalPoint;
}());
