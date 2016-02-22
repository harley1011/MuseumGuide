var Vector = (function (){

  var privateData = new WeakMap();

  //Constructor Function
  function Vector(point1, point2, dimension) {
    //console.log(vector.magnitude + ", " + vector.angle);
    // point1 - (3,4)  point2 - (4,3)   deg = -45
    // point1 - (3,4)  point2 - (4,5)   deg = 45
    // point1 - (3,4)  point2 - (2,5)   deg = -45 ...should be (-45+180) = 135
    // point1 - (3,4)  point2 - (2,3)   deg = 45 ...should be (45+180) = 225

    //Private properties
    var vector = {};
    vector.calculateMagnitude = function(point1, point2) {
        return Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
    };
    vector.calculatePercentage = function(pos, max) {
        return 100 * pos / max;
    };
    vector.calculateAngle = function(point1, point2){
      var angle = Math.atan((point2.y - point1.y) / (point2.x - point1.x)) * 180 / Math.PI;//in degrees
      return ((point2.x < point1.x)? angle + 180 : angle);
    };
    vector.magnitude = vector.calculatePercentage(vector.calculateMagnitude(point1, point2), dimension.width);
    vector.angle = vector.calculateAngle(point1, point2);
    vector.color = '#ff3333';
    vector.height = '1px';
    vector.coordinates = {
        "x": vector.calculatePercentage(point1.x, dimension.width),
        "y": vector.calculatePercentage(point1.y, dimension.height)
    };

    privateData.set(this, vector);
  }

  //Specifies the constructor function on the prototype
  Vector.prototype.constructor = Vector;

  Vector.prototype.getMagnitude = function(){
    return privateData.get(this).magnitude;
  };

  Vector.prototype.getAngle = function(){
    return privateData.get(this).angle;
  };

  Vector.prototype.getCoordinates = function(){
    return privateData.get(this).coordinates;
  };

  Vector.prototype.getColor = function(){
    return privateData.get(this).color;
  };

  Vector.prototype.getHeight = function(){
    return privateData.get(this).height;
  };

  Vector.prototype.setColor = function(color){
    privateData.get(this).color = color;
  };

  Vector.prototype.setHeight = function(height){
    privateData.get(this).height = height;
  };

  Vector.prototype.destructor = function(){
    privateData.delete(this);
  };

  return Vector;
}());
