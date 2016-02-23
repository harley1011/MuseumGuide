/**
* Edge Prototype
* Implementation of the Vertex ADT with Generics enabled.
* @import com.jsadt.utils.type.generics
* @import com.jsadt.utils.structures.map.*
**/

var Edge = (function (){

  var privateData = new WeakMap();
  var keySet = [];

  //Source
  //http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  function generateUUID(){
    var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
    var d0 = Math.random()*0xffffffff|0;
    var d1 = Math.random()*0xffffffff|0;
    var d2 = Math.random()*0xffffffff|0;
    var d3 = Math.random()*0xffffffff|0;
    return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+
      lut[d1&0xff]+lut[d1>>8&0xff]+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+
      lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
      lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
  }

  function Edge(u,v,x) {
    var id;
    do{
      id = generateUUID();
    }while(keySet.indexOf(id) !== -1);
    var privateMembers =
    {
      element: null,
      uuid: id,
      generics: x === undefined? undefined : new Generics(x),
      endpoints: [],
      validateVertex: function(v){
        if(!(v instanceof Vertex)){
          throw new IllegalArgumentException("Parameter is not of Type Vertex");
        }
        return v;
      },
    };
    privateMembers.element = x;
    privateMembers.endpoints = [validateVertex(u),validateVertex(v)];
    privateData.set(this, privateMembers);
  }

  Edge.prototype.constructor = Edge;

  Edge.prototype.getUUID = function(){
    return privateData.get(this).uuid;
  };

  Edge.prototype.getElement = function(){
    return privateData.get(this).element;
  };

  Edge.prototype.setElement = function(x){
    var edge = privateData.get(this);
    if(!edge.generics || edge.generics.checkType(x)){
      edge.element = x;
    }
  };

  Edge.prototype.getEndpoints = function(){
    return privateData(this).endpoints;
  };


  return Vertex;
}());
