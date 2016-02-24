var PointOfInterest = (function (){

  var privateData = new WeakMap();

  //Constructor Function
  function PointOfInterest(raw) {
    //super(raw)
    Point.call(this, raw);
    var privateMembers = {
      beacon: raw.beacon_id,
      color: (raw.style && raw.style.color) ? raw.style.color : "#00008B",
      diameter: (raw.style && raw.style.diameter) ? raw.style.diameter : 40,
      neighbours: raw.neighbours,
      title: null,
      description: null,
      media: null
    };
    privateData.set(this, privateMembers);
  }

  //Binding the prototype of the Parent object
  //Properties will be overriden on this one.
  PointOfInterest.prototype = Object.create(Point.prototype);

  //Binding the constructor to the prototype
  PointOfInterest.prototype.constructor = PointOfInterest;

  //Creating a parent property (like super in Java)
  //Allows to call overriden properties
  PointOfInterest.prototype.parent = Point.prototype;

  PointOfInterest.prototype.getBeaconID = function(){
    return privateData.get(this).beacon;
  };

  PointOfInterest.prototype.getColor = function(){
    return privateData.get(this).color;
  };

  PointOfInterest.prototype.setColor = function(color){
    privateData.get(this).color = color;
  };

  PointOfInterest.prototype.getDiameter = function(){
    return privateData.get(this).diameter;
  };

  PointOfInterest.prototype.setDiameter = function(diameter){
    privateData.get(this).diameter = diameter;
  };

  PointOfInterest.prototype.getNeighbourIDs = function(){
    return privateData.get(this).neighbours;
  };

  PointOfInterest.prototype.getTitle = function(){
    return privateData.get(this).title;
  };

  PointOfInterest.prototype.getDescription = function(){
    return privateData.get(this).description;
  };

  PointOfInterest.prototype.getMedia = function(){
    return privateData.get(this).media;
  };

  //@Override
  PointOfInterest.prototype.destructor = function(){
    this.parent.destructor();
    privateData.delete(this);
  };

  return PointOfInterest;
}());
