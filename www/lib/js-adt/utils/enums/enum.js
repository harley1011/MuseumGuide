function Enum(){
}

Enum.prototype.enum = {};

Enum.prototype.properties = {};

Enum.prototype.getType = function(type){
  return this.enum[type];
};

Enum.prototype.getTypeValue = function(type){
  return (this.properties[this.enum[type]] !== undefined) ? this.properties[this.enum[type]].value: undefined;
};

Enum.prototype.getTypeField = function(type, field){
  return this.properties[this.enum[type]][field];
};

Enum.prototype.isValidType = function(type){
  for(var e in Object.keys(this.enum)){
    if(e === type) return true;
  }
  return false;
};

Enum.prototype.isValidValue = function(value){
  for(var i = 0 ; i < this.properties.length ; i++){
    if(this.properties[i] === value) return true;
  }
  return false;
};
