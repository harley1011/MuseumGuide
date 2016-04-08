var Edge = (function (){

  var privateData = new WeakMap();

  //Constructor Function
  function Edge(raw) {
    var privateMembers = {
      startNode: raw.startNode,
      endNode: raw.endNode
    };
    privateData.set(this, privateMembers);
  }

  Edge.prototype.constructor = Edge;

  Edge.prototype.getStartNode = function(){
    return privateData.get(this).startNode;
  };

  Edge.prototype.getEndNode = function(){
    return privateData.get(this).endNode;
  };

  Edge.prototype.destructor = function(){
    privateData.delete(this);
  };

  return Edge;
}());
