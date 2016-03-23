var PointOfTransition = (function (){

  var privateData = new WeakMap();
  var facilities = new Facilities();

  //Constructor Function
  function PointOfTransition(raw) {
    //super(raw)
    Point.call(this, raw);
    var privateMembers = {
      color: (raw.style && raw.style.color) ? raw.style.color : "#009933",
      diameter: (raw.style && raw.style.diameter) ? raw.style.diameter : 40,
      label: raw.label,
    };
    privateData.set(this, privateMembers);
  }

  //Binding the prototype of the Parent object
  //Properties will be overriden on this one.
  PointOfTransition.prototype = Object.create(Point.prototype);

  //Binding the constructor to the prototype
  PointOfTransition.prototype.constructor = PointOfTransition;

  //Creating a parent property (like super in Java)
  //Allows to call overriden properties
  PointOfTransition.prototype.parent = Point.prototype;

  PointOfTransition.prototype.getColor = function(){
    return privateData.get(this).color;
  };

  PointOfTransition.prototype.setColor = function(color){
    privateData.get(this).color = color;
  };

  PointOfTransition.prototype.getDiameter = function(){
    return privateData.get(this).diameter;
  };

  PointOfTransition.prototype.setDiameter = function(diameter){
    privateData.get(this).diameter = diameter;
  };

  /*PointOfTransition.prototype.getNeighbourIDs = function(){
    return privateData.get(this).neighbours;
  };*/

  /*PointOfTransition.prototype.getType = function(){
    return privateData.get(this).type;
  };*/

  PointOfTransition.prototype.getLabel = function(){
    return privateData.get(this).label;
  };

  //@Override
  PointOfTransition.prototype.destructor = function(){
    this.parent.destructor();
    privateData.delete(this);
  };

  return PointOfTransition;
}());
