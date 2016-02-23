/**
* Vertex Prototype
* Implementation of the Vertex ADT with Generics enabled.
* @import com.jsadt.utils.type.generics
* @import com.jsadt.utils.structures.map.*
**/
var Vertex = (function (){

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

  function Vertex(graphIsDirected, v) {
    var id;
    do{
      id = generateUUID();
    }while(keySet.indexOf(id) !== -1);
    var privateMembers =
    {
      element: null,
      uuid: id,
      isDirected: graphIsDirected? true : false,
      generics: v === undefined? undefined : new Generics(v),
      outgoing: new JSMap(Vertex, Edge),
      incoming: isDirected? new JSMap(Vertex, Edge) : this.outgoing,
      validateVertex: function(v){
        if(!(v instanceof Vertex)){
          throw new IllegalArgumentException("Parameter is not of Type Vertex");
        }
        return v;
      },
    };
    privateMembers.element = v;
    privateData.set(this, privateMembers);
  }

  Vertex.prototype.constructor = Vertex;

  Vertex.prototype.getUUID = function(){
    return privateData.get(this).uuid;
  };

  Vertex.prototype.getElement = function(){
    return privateData.get(this).element;
  };

  Vertex.prototype.setElement = function(x){
    var vertex = privateData.get(this);
    if(!vertex.generics || vertex.generics.checkType(x)){
      vertex.element = x;
    }
  };

  Vertex.prototype.getOutgoing = function(){
    return privateData.get(this).outgoing;
  };

  Vertex.prototype.getIncoming = function(){
    return privateData.get(this).incoming;
  };

  Vertex.prototype.deleteOutgoing = function(v){
    var vertex = privateData.get(this);
    vertex.validateVertex(v);
    return vertex.outgoing.delete(v);
  };

  Vertex.prototype.deleteIncoming = function(v){
    var vertex = privateData.get(this);
    vertex.validateVertex(v);
    return vertex.incoming.delete(v);
  };

  return Vertex;
}());
