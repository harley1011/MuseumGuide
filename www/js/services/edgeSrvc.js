angular.module('services')
  .service('edgeSrvc', function(JSONFactorySrvc) {
    var edges = [];
    var edgeSrvc = {
      getEdge: function(nodes) {
        if(nodes === undefined || nodes.length !== 2)
          return undefined;
          
        for(var i = 0; i < edges.length; i++) {
          var edge = edges[i];
          var startNode = edge.getStartNode();
          var endNode = edge.getEndNode();
          if((startNode === nodes[0] && endNode === nodes[1]) || (startNode === nodes[1] && endNode === nodes[0]) )
            return edge;
        }

        return undefined;
      },
      getEdges: function() {
        var arr = [];
        for(key in edges){
          arr.push(edges[key]);
        }
        return arr;
      },
      loadEdges: function() {
        var arr = JSONFactorySrvc.load("edges"),
            edge;
        for (var i = 0 ; i < arr.length; i++) {
          edge = arr[i];
          if(edge instanceof Edge)
            edges.push(edge);
        }
      }
    };
    edgeSrvc.loadEdges();
    return edgeSrvc;
  });
