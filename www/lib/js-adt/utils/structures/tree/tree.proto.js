/**
* Tree Prototype
* Implementation of the Generic Tree ADT with Generics enabled.
* If the type is not specified, act as a Tree ADT without Generics.
* @param T Either an primitive type, an object of the Generic type or the
* constructor of the Generic type. For object Generics, requires a constructor function.
**/
function Tree(T, node){
  this._root = undefined;
  this._size = 0;
  this._generics = (T !== undefined)? new Generics(T) : undefined;

  if(node !== undefined){
    this._validate(node);
    var $this = this;
    treeTraversalPreOrder(node, function(){ $this._validate(arguments[0]) ; });
    this._root = node;
    this._updateSize();
  }
}

Tree.prototype.constructor = Tree;

Tree.prototype._validate = function(node){
  if(!(node instanceof Node)){
    console.error(node);
    throw new IllegalArgumentException("node is not a Node.");
  }
  if(node.getParent() === node){
    console.error(node);
    throw new IllegalArgumentException("node is its own parent");
  }
  if(this._generics !== undefined) this._generics.checkType(node.getElement());
  return node;
};

Tree.prototype._updateSize = function(){
  this._size = this._rupdateSize(this._root, 0);
  return this._size;
};

Tree.prototype._rupdateSize = function(node, size){
  size++;
  var children = node.getChildren();
  for(var i = 0 ; i < children.length ; i++){
    size = this._rupdateSize(children[i], size);
  }
  return size;
};

Tree.prototype.size = function(){
  return this._size;
};

Tree.prototype.isEmpty = function(){
  return this._size === 0;
};

Tree.prototype.root = function(){
  return this._root;
};

Tree.prototype.isRoot = function(node){
  return this._root !== undefined && this._validate(node) === this._root;
};

Tree.prototype.parent = function(node){
  return this._validate(node).getParent();
};

Tree.prototype.child = function(node, index){
  return this._validate(node).getChild(index);
};

Tree.prototype.children = function(node){
  return this._validate(node).getChildren();
};

Tree.prototype.isInternal = function(node){
  return this._validate(node).numChildren() !== 0;
};

Tree.prototype.isExternal = function(node){
  return this._validate(node).numChildren() === 0;
};

Tree.prototype.addRoot = function(element){
  if(!this.isEmpty()){
    throw new IllegalStateException("Tree already has a root.");
  }
  if(this._generics === undefined || this._generics.checkType(element)){
    this._root = new Node(element, undefined, []);
    this._size++;
  }
};


Tree.prototype.addChild = function(parent, element){
  this._validate(parent);
  if(this._generics === undefined || this._generics.checkType(element)){
    var child = new Node(element, parent, []);
    parent.addChild(child);
    this._size++;
    return child;
  }
  return undefined;
};

Tree.prototype.set = function(node, element){
  var tmp = this._validate(node).getElement();
  if(this._generics === undefined || this._generics.checkType(element)){
    node.setElement(element);
    return tmp;
  }else{
    return undefined;
  }
};

Tree.prototype.attach = function(node, tree){
  if(tree instanceof Tree){
    this._validate(node);
    tree.root().setParent(node);
    node.addChild(tree.root());
    tree._root = undefined;
    this._size = this.size() + tree.size();
    tree._size = 0;
  }
};

Tree.prototype.drop = function(node){
  this._validate(node);
  if(this._root === node){
    this._root = undefined;
    this._size = 0;
    return node;
  }else{
    node.getParent().removeChild(node);
    node.setParent(undefined);
    this._updateSize();
    return node;
  }
};

Tree.prototype.remove = function(node){
  if(this._validate(node).numChildren() > 1){
    throw new IllegalArgumentException("Cannot determine which successor the node should have");
  }else if(node.numChildren() !== 0){
    node.getChild(0).setParent(node.getParent());
  }
  if(this._root === node){
    this._root = node.getChild(0);
  }else{
    var parent = node.getParent();
    parent.removeChild(node);
    parent.addChild(node.getChild(0));
  }
  this._size--;
  var element = node.getElement();
  node.setElement(undefined);
  node.setParent(undefined);
  node.setChildren([]);
  return element;
};

Tree.prototype.height = function(node){
  var h = 0;
  this._validate(node);
  for(var i = 0 ; i < node.numChildren(); i++){
    h = Math.max(h, 1 + this.height(node.getChild(i)));
  }
  return h;
};

Tree.prototype.depth = function(node){
  this._validate(node);
  if(this.isRoot(node)){
    return 0;
  }else{
    return 1 + this.depth(node.getParent());
  }
};
