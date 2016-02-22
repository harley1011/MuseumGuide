/**
* Stack Prototype
* Implementation of the Stack ADT with Generics enabled.
* If the type is not specified, act as a Stack ADT without Generics.
* @param capacity {int} Maximum capacity of the stack.
* @param T Either an primitive type, an object of the Generic type or the
* constructor of the Generic type. For object Generics, requires a constructor function.
**/
function Stack(capacity, T){
  this._data = [];
  this._generics = (T !== undefined)? new Generics(T) : undefined;
  /*
  * Maximum capacity of the Stack.
  * Acts as upper bound for the _data.length
  * @default: 18000 ; 5 transmission per second, for an hour.
  */
  this._capacity =  (capacity !== undefined && capacity > 0)? capacity : 18000;
}

Stack.prototype.constructor = Stack;

Stack.prototype.push = function(element){
  if(this._generics === undefined || this._generics.checkType(element)){
    while(this._data.length >= this._capacity){
      this._data.shift();
    }
    this._data.push(element);
  }
};

Stack.prototype.peek = function(index){
  if(typeof index === "number" && index > -1 && index < this._data.length){
    return this._data[index];
  } else {
    return undefined;
  }
};

Stack.prototype.top = function(){
  return this._data[this._data.length -1];
};

Stack.prototype.pop = function(){
  return this._data.pop();
};

Stack.prototype.size = function(){
  return this._data.length;
};

Stack.prototype.getCapacity = function() {
  return this.capacity;
};

Stack.prototype.setCapacity = function(capacity) {
  if(typeof capacity === "number" && capacity > 0){
    this.capacity = capacity;
  }else{
    throw new IllegalArgumentException("Parameter is not a valid number within accepted range (1, Integer.MAX)");
  }
};
