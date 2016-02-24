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
    var vector = {
      magnitude: Vector.calculatePercentage(Vector.calculateMagnitude(point1, point2), dimension.width),
      angle: Vector.calculateAngle(point1, point2),
      color: '#ff3333',
      height: '1px',
      coordinates: {
          "x": Vector.calculatePercentage(point1.getCoordinates().x, dimension.width),
          "y": Vector.calculatePercentage(point1.getCoordinates().y, dimension.height)
      },
    };
    privateData.set(this, vector);
  }

  //Static functions
  Vector.calculateMagnitude = function(point1, point2) {
    var coord1 = point1.getCoordinates(),
        coord2 = point2.getCoordinates();
    return Math.sqrt(Math.pow((coord2.x - coord1.x), 2) + Math.pow((coord2.y - coord1.y), 2));
  };

  Vector.calculatePercentage = function(pos, max) {
      return 100 * pos / max;
  };

  Vector.calculateAngle = function(point1, point2){
    var coord1 = point1.getCoordinates(),
        coord2 = point2.getCoordinates();
    var angle = Math.atan((coord2.y - coord1.y) / (coord2.x - coord1.x)) * 180 / Math.PI;//in degrees
    return ((coord2.x < coord1.x)? angle + 180 : angle);
  };



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
