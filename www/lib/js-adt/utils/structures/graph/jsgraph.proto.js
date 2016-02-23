/**
* Graph Prototype
* Nomenclature chosen for consistency with com.JS.utils.structures.map.JSMap
* Implementation of the Map ADT with Generics enabled.
* @import com.jsadt.utils.type.generics
* @import com.jsadt.utils.structures.map.*
* @import com.jsadt.utils.structures.graph.Edge
* @import com.jsadt.utils.structures.graph.Vertex
**/
var JSGraph = (function (){

  var privateData = new WeakMap();

  function JSGraph(directed, V, E) {
    var privateMembers =
    {
      vertices: {},
      numVertices: 0,
      edges: {},
      numEdges: 0,
      isDirected: directed ? true : false,
      generics: {
        v: V === undefined? undefined : new Generics(V),
        e: E === undefined? undefined : new Generics(E),
      },
      validateVertex: function(v){
        if(!(v instanceof Vertex)){
          throw new IllegalArgumentException("Parameter is not of Type Vertex");
        }
        if(!this.generics.v || this.generics.v.checkType(v.getElement())) return v;
      },
      validateEdge: function(e){
        if(!(e instanceof Edge)){
          throw new IllegalArgumentException("Parameter is not of Type Edge");
        }
        if(!this.generics.e || this.generics.e.checkType(e.getElement())) return e;
      },
    };
    privateData.set(this, privateMembers);
  }

  JSGraph.prototype.constructor = JSGraph;

  JSGraph.prototype.numVertices = function(){
    return privateData.get(this).numVertices;
  };

  JSGraph.prototype.vertices = function(){
    var vertices = privateData.get(this).vertices,
        arr = [];
    for(key in vertices){
      if(!(vertices[key] === null || vertices[key] === undefined)){
        arr.push(vertices[key]);
      }
    }
    return arr;
  };

  JSGraph.prototype.numEdges = function(){
    return privateData.get(this).numEdges;
  };

  JSGraph.prototype.edges = function(){
    var edges = privateData.get(this).edges,
        arr = [];
    for(key in edges){
      if(!(edges[key] === null || edges[key] === undefined)){
        arr.push(edges[key]);
      }
    }
    return arr;
  };

  JSGraph.prototype.getEdge = function(u,v){
    var graph = privateData.get(this);
    graph.validateVertex(u);
    graph.validateVertex(v);
    return u.getOutgoing().get(v);
  };

  JSGraph.prototype.opposite = function(v,e){
    var graph = privateData.get(this),
        endpoints = graph.validateEdge(e).getEndpoints();
    graph.validateVertex(v);
    if(endpoints[0].getUUID() === v.getUUID()){
      return endpoints[1];
    }else if(endpoints[1].getUUID() === v.getUUID()){
      return endpoints[0];
    }else{
      throw new IllegalArgumentException("v is not incident to this edge");
    }
  };

  JSGraph.prototype.outDegree = function(v){
    var graph = privateData.get(this);
    graph.validateVertex(v);
    return v.getOutgoing().size();
  };

  JSGraph.prototype.inDegree = function(v){
    var graph = privateData.get(this);
    graph.validateVertex(v);
    return v.getIncoming().size();
  };

  JSGraph.prototype.endVertices = function(e){
    var graph = privateData.get(this);
    return graph.validateEdge(e).getEndpoints();
  };

  JSGraph.prototype.outgoingEdges = function(v){
    var graph = privateData.get(this);
    graph.validateVertex(v);
    return v.getOutgoing().values();
  };

  JSGraph.prototype.incomingEdges = function(v){
    var graph = privateData.get(this);
    graph.validateVertex(v);
    return v.getIncoming().values();
  };

  JSGraph.prototype.insertVertex = function(x){
    var graph = privateData.get(this),
        vertex;
    if(!graph.generics.v || graph.generics.v.checkType(x)){
      vertex = new Vertex(graph.isDirected, x);
      graph.vertices[vertex.getUUID()] = vertex;
      graph.numVertices++;
      return vertex;
    }
    return undefined;
  };

  JSGraph.prototype.insertEdge = function(u,v,x){
    if(this.getEdge(u,v) !== undefined){
      var graph = privateData.get(this),
          edge;
      graph.validateVertex(u);
      graph.validateVertex(v);
      if(!graph.generics.e || graph.generics.e.checkType(x)){
        edge = new Edge(u,v,x);
        if(!graph.vertices[u.getUUID()]) graph.vertices[u.getUUID()] = u;
        if(!graph.vertices[v.getUUID()]) graph.vertices[v.getUUID()] = v;
        graph.edges[edge.getUUID()] = edge;
        graph.numEdges++;
        return edge;
      }
      return undefined;
    }else{
      throw new IllegalArgumentException("Edge from u to v exists already.");
    }
  };

  JSGraph.prototype.deleteVertex = function(v){
    var graph = privateData.get(this);
    graph.validateVertex(v);
    if(graph.vertices[u.getUUID()]){
      v.getOutgoing().forEach(function(v, e){
        this.removeEdge(e);
      }, this);
      v.getIncoming().forEach(function(v, e){
        this.removeEdge(e);
      }, this);
      vertices[v.getUUID()] = null;
      graph.numVertices--;
    }else{
      throw new IllegalArgumentException("Vertex not currently listed in this Graph");
    }
  };

  JSGraph.prototype.deleteEdge = function(e){
    var graph = privateData.get(this),
        endpoints;
    graph.validateEdge(e);
    if(graph.edges[e.getUUID()]){
      endpoints = e.getEndpoints();
      endpoints[0].deleteOutgoing(endpoints[1]);
      if(graph.isDirected) endpoints[0].deleteIncoming(endpoints[1]);
      endpoints[1].deleteOutgoing(endpoints[0]);
      if(graph.isDirected) endpoints[1].deleteOutgoing(endpoints[0]);
      graph.edges[e.getUUID()] = null;
      graph.numEdges--;
    }else{
      throw new IllegalArgumentException("Edge not currently listed in this Graph");
    }
  };

  return JSGraph;
}());
