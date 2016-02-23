/**
* Node Prototype
* Implementation of the Node ADT.
* Doesn't support Generics.
* For Generic support, use the according Data Structure using Node to enforce it.
* @param element Element to be encapsulated in Node
* @param parent {Node}
* @param children {Node[]}
**/
function Node(element, parent, children){
  this._element = element;
  this._parent = undefined;
  this._children = [];

  this.setParent(parent);
  this.setChildren(children);
}

Node.prototype.constructor = Node;

Node.prototype.getElement = function(){
  return this._element;
};

Node.prototype.setElement = function(e){
  this._element = e;
};

Node.prototype.getParent = function(){
  return this._parent;
};

Node.prototype.setParent = function(parent){
  if(parent instanceof Node || typeof parent === "undefined"){
    this._parent = parent;
  }else{
    throw new IllegalArgumentException("Parameter parent does not match the type Node");
  }
};

Node.prototype.getChildren = function(){
  return this._children;
};

Node.prototype.setChildren = function(children){
  if(children.length !== undefined){
    for(var i = 0 ; i < children.length ; i++){
      if(children[i] instanceof Node){
        this._children.push(children[i]);
      }else{
        console.error(children);
        throw new IllegalArgumentException("One child parameter does not match the type Node");
      }
    }
  }else{
    throw new IllegalArgumentException("Parameter children does not match the type Array");
  }
};

Node.prototype.numChildren = function(){
  return this._children.length;
};

Node.prototype.getChild = function(index){
  if(typeof index === "number" && index > -1 && index < this._children.length){
    return this._children[index];
  }else{
    return undefined;
  }
};

Node.prototype.addChild = function(child){
  if(child instanceof Node){
    this._children.push(child);
  }else{
    throw new IllegalArgumentException("Parameter child does not match the type Node");
  }
};

Node.prototype.removeChild = function(child){
    var index = this._children.indexOf(child);
    if(index > -1){
      this._children.splice(index, 1);
      return true;
    }else{
      return false;
    }
};
