function treeTraversalPreOrder(node, callback){
  if(!(node instanceof Node)){
    console.error(node);
    throw new IllegalArgumentException("node is not instanceof Node, cannot iterate.");
  }
  callback(node);
  var children = node.getChildren();
  for(var i = 0 ; i < children.length ; i++){
    treeTraversalPreOrder(children[i], callback);
  }
}

function treeTraversalPostOrder(node, callback){
  if(!(node instanceof Node)){
    console.error(node);
    throw new IllegalArgumentException("node is not instanceof Node, cannot iterate.");
  }
  var children = node.getChildren();
  for(var i = 0 ; i < children.length ; i++){
    treeTraversalPostOrder(children[i], callback);
  }
  callback(node);
}
