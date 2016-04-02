var PointOfInterest = (function (){

  var privateData = new WeakMap();

  //Constructor Function
  function PointOfInterest(raw) {
    //super(raw)
    Point.call(this, raw);
	console.log(raw);
    var privateMembers = {
      beacon: raw.ibeacon.uuid != 'undefined'? raw.ibeacon.uuid: undefined,
      color: (raw.style && raw.style.color) ? raw.style.color : "#00008B",
      diameter: (raw.style && raw.style.diameter) ? raw.style.diameter : 40,
      title: raw.title,
      description: raw.description,
      media: typeof raw.media === "object" ? raw.media : null
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

  PointOfInterest.prototype.getTitle = function(){
    return privateData.get(this).title;
  };

  PointOfInterest.prototype.getDescription = function(){
    return privateData.get(this).description;
  };

  PointOfInterest.prototype.getMedia = function(){
    return privateData.get(this).media;
  };

  PointOfInterest.prototype.getMediaForStoryline = function(storyline){
    return privateData.get(this).media[storyline];
  };

  //@Override
  PointOfInterest.prototype.destructor = function(){
    this.parent.destructor();
    privateData.delete(this);
  };

  return PointOfInterest;
}());
