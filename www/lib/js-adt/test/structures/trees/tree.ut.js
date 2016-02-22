/**
* Unit Test for the Generic Tree ADT, the Tree Iterators and the Tree Factory
* Coverage is not 100% but sufficient to cover critical cases.
**/
/*---TEST TYPES AND FUNCTIONS---*/

function TypeOne(i){
  this._i = i;
}
TypeOne.prototype.constructor = TypeOne;
TypeOne.prototype.iAm = function(){ return "I am a TypeOne object!";};

function TypeTwo(i){
  this._i = i;
}
TypeTwo.prototype.constructor = TypeTwo;
TypeTwo.prototype.iAm = function(){ return "I am a TypeTwo object!";};

function generateNode(i, type){
  if(type !== undefined){
    return {
      element: new type(i),
      children: []
    };
  }else{
    return {
      element: i,
      children: []
    };
  }
}

function generateType(hasTypeOne, hasTypeTwo){
  if(hasTypeOne || hasTypeTwo){
    return (hasTypeOne && hasTypeTwo)? ((Math.random() >= 0.5) ? TypeOne : TypeTwo) : TypeOne;
  }else{
    return undefined;
  }
}


function generateObject(depth, hasTypeOne, hasTypeTwo){
  var obj = generateNode(0, generateType(hasTypeOne, hasTypeTwo));
  _rgenObj(obj, depth, Date.now() , hasTypeOne, hasTypeTwo);
  return obj;
}

function _rgenObj(obj, depth, start, hasTypeOne, hasTypeTwo){
  if(depth > 0){
    var numChildren = Math.floor(Math.random() * 10),
        finalNumChildren = 0;
    for(var i = 0 ; i < numChildren ; i++){
      if(Math.random() >= 0.5){
        finalNumChildren++;
      }
    }
    if(finalNumChildren === 0){
      finalNumChildren++;
    }
    for(var i = 0 ; i < finalNumChildren ; i++){
      var node = generateNode(Date.now()- start, generateType(hasTypeOne, hasTypeTwo));
      obj.children.push(node);
      _rgenObj(node, depth-1, start, hasTypeOne, hasTypeTwo);
    }
  }
}

/*---TEST---*/
{
  /*---STEP 1: BUILD TREES---*/
  {
    console.log("STEP 1: BUILD TREES FROM OBJECT");
    var obj1 = generateObject(5, false, false),
        obj2 = generateObject(5, true, false),
        t1 = treeFactory(undefined, obj1),
        t2 = treeFactory(TypeOne, obj2);

    console.log("obj1");
    console.log(obj1);
    console.log("obj2");
    console.log(obj2);
    console.log("t1");
    console.log(t1);
    console.log("t2");
    console.log(t2);

    console.log("STEP 1: PASSED");
  }

  /*---STEP 2: TESTING GENERICS---*/
  //Test is not 100% stable due to reliance on Math.random
  {
    console.log("STEP 2: TESTING GENERICS");
    try{
      var t3 = treeFactory(TypeOne, generateObject(5, true, true));
    }catch(e) {
      if(e.message === "Parameter does not match the Generic Type TypeOne"){
        console.log("STEP 2: PASSED");
      }else{
        console.log("STEP 2: FAILED");
      }
    }
  }

  /*---STEP 3: CANNOT REMOVE ROOT---*/
  {
    console.log("STEP 3: CANNOT REMOVE ROOT");
    try{
      var t3 = treeFactory(TypeOne, generateObject(2, true, false));
      while(t3.children(t3.root()).length < 2){
        t3 = treeFactory(TypeOne, generateObject(2, true, false));
      }
      t3.remove(t3.root());
    }catch(e) {
      if(e.message === "Cannot determine which successor the node should have"){
        console.log("STEP 3: PASSED");
      }else{
        console.log("STEP 3: FAILED");
      }
    }
  }

  /*---STEP 4: DROPPING A SUBTREE, UPDATE SIZE---*/
  //Test is not 100% stable due to reliance on Math.random
  {
    console.log("STEP 4: DROPPING A SUBTREE, UPDATE SIZE");
    var t3 = treeFactory(TypeOne, generateObject(5, true, false));
    console.log(t3);
    var startSize = t3.size(),
        child = t3.drop(t3.child(t3.root(), 0)),
        childTree = new Tree(TypeOne, child),
        childSize = childTree.size(),
        endSize = t3.size();
    console.log("startSize = " + startSize);
    console.log("childSize = " + childSize);
    console.log("endSize = " + endSize);
    if(startSize - endSize === childSize){
      console.log("STEP 4: PASSED");
    }else{
      console.log("STEP 4: FAILED");
    }
  }

  /*---STEP 5: ATTACHING A SUBTREE, UPDATE SIZE---*/
  //Test is not 100% stable due to reliance on Math.random
  {
    console.log("STEP 5: ATTACHING A SUBTREE, UPDATE SIZE");
    var t3 = treeFactory(TypeOne, generateObject(5, true, false)),
        t4 = treeFactory(TypeOne, generateObject(2, true, false)),
        leaf;
    treeTraversalPreOrder(t3.root(), function(){
      if(leaf === undefined && t3.isExternal(arguments[0])){
        leaf = arguments[0];
      }
    });
    console.log(t3);
    console.log(t4);
    console.log(leaf);
    var startSize = t3.size(),
        childSize = t4.size();
    t3.attach(leaf, t4);
    var endSize = t3.size();
    console.log("startSize = " + startSize);
    console.log("childSize = " + childSize);
    console.log("endSize = " + endSize);
    if(endSize - startSize === childSize){
      console.log("STEP 5: PASSED");
    }else{
      console.log("STEP 5: FAILED");
    }
  }

  /*---STEP 6: HEIGHT & DEPTH---*/
  {
    console.log("STEP 6: HEIGHT & DEPTH");
    var objDepth = Math.floor(Math.random() * 10);
        t3 = treeFactory(TypeOne, generateObject(objDepth, true, false)),
        leafs = [];
    treeTraversalPreOrder(t3.root(), function(){
      if(t3.isExternal(arguments[0])){
        leafs.push(arguments[0]);
      }
    });
    var height = t3.height(t3.root()),
        depth = 0;
    for(var i = 0 ; i < leafs.length ; i++){
      depth = Math.max(depth, t3.depth(leafs[i]));
    }
    console.log("objDepth = " + objDepth);
    console.log("height = " + height);
    console.log("depth = " + depth);
    if(height === depth && height === objDepth){
      console.log("STEP 6: PASSED");
    }else{
      console.log("STEP 6: FAILED");
    }
  }
}
