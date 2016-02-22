/**
* Example of an Enum Type based on the Enum constructor.
**/

EnumType.prototype = new Enum();
EnumType.prototype.constructor = EnumType;
EnumType.prototype.parent = Object.assign({}, Enum.prototype);

EnumType.prototype.isValidType = function(type){
  if(this.parent.isValidType.call(this) || this.parent.isValidValue.call(this)) return true;
  else return false;
};

function EnumType(){
  this.enum = {
    VALUE0 : 0,
    VALUE1 : 1,
    VALUE2 : 2,
    VALUE3 : 3
  };
  this.properties = {
    0: {value: "VALUE0"},
    1: {value: "VALUE1"},
    2: {value: "VALUE2"},
    3: {value: "VALUE3"},
  };
  Object.freeze(this);
}
