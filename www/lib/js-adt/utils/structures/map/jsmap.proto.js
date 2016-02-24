/**
* Map Prototype
* Nomenclature chosen not to shadow native ECMAScript 2015 Map
* Implementation of the Map ADT with Generics enabled.
* @import com.jsadt.utils.type.generics
* @import com.jsadt.utils.structures.map.shim.*
**/
var JSMap = (function (){

  var privateData = new WeakMap();

  function JSMap(K, V) {
    var privateMembers =
    {
      map: new Map(),
      generics: {
        key: K === undefined? undefined : new Generics(K),
        val: V === undefined? undefined : new Generics(V)
      }
    };
    privateData.set(this, privateMembers);
  }

  JSMap.prototype.constructor = JSMap;

  JSMap.prototype.size = function(){
    return privateData.get(this).map.size;
  };

  JSMap.prototype.isEmpty = function(){
    return privateData.get(this).map.size === 0;
  };

  JSMap.prototype.get = function(k){
    var map = privateData.get(this);
    if(!map.generics.key || map.generics.key.checkType(k)){
      return map.map.get(k);
    }
  };

  JSMap.prototype.set = function(k,v){
    var map = privateData.get(this),
        kMatchesGeneric  = !map.generics.key || map.generics.key.checkType(k),
        vMatchesGeneric = !map.generics.val || v === null || map.generics.val.checkType(v) ;
    map.map.set(k,v);
    return this;
  };

  JSMap.prototype.has = function(k){
    var map = privateData.get(this),
        kMatchesGeneric  = !map.generics.key || map.generics.key.checkType(k);
    return map.map.has(k);
  };

  JSMap.prototype.delete = function(k){
    var map = privateData.get(this),
        kMatchesGeneric  = !map.generics.key || map.generics.key.checkType(k);
    return map.map.delete(k);
  };

  JSMap.prototype.entries = function(){
    return privateData.get(this).map.entries();
  };

  JSMap.prototype.forEach = function(callback, thisArg){
    if(thisArg){
      privateData.get(this).map.forEach(callback, thisArg);
    }else{
      privateData.get(this).map.forEach(callback);
    }
  };

  JSMap.prototype.keys = function(){
    return privateData.get(this).map.keys();
  };

  JSMap.prototype.values = function(){
    return privateData.get(this).map.values();
  };

  return JSMap;
}());
