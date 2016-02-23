/**
* Tree Factory
* Creates a tree from a JSON object of recursive structure
* { element: "", children: [ { ... } , { ... } ] }
**/
function treeFactory(type, obj){
  function factory(tree, node, obj){
    if(obj.children !== undefined && obj.children.length !== undefined){
      for(var i = 0; i < obj.children.length; i++){
        if(obj.children[i].element !== undefined){
          var child = tree.addChild(node, obj.children[i].element);
          factory(tree, child, obj.children[i]);
        }else{
          throw IllegalArgumentException("Malformed object given to tree factory");
        }
      }
    }else{
      throw IllegalArgumentException("Malformed object given to tree factory");
    }
  }
  if(obj){
    var tree = new Tree(type);
    tree.addRoot(obj.element);
    factory(tree, tree.root(), obj);
    return tree;
  }else{
    return undefined;
  }
}
