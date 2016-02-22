/**
* Unit Test for the Interface Pattern
**/

/*---TEST---*/
{
  /*---TEST FLAGS---*/
  var stepOne = false,
      stepTwo = false,
      stepThree = false,
      stepFour = false,
      stepFive = false;

  /*---TEST TYPES AND FUNCTIONS---*/
  //Interface to Enforce
  var iOne = new Interface('iOne', ['a']);

  //Type implementing iOne interface on the this object
  var TypeOne = (function(){
    function TypeOne(){
      this.a = function(){ console.log("TypeOne.a()"); };
    }
    return TypeOne;
  }());

  //Type subclassing TypeOne
  var SubTypeOne = (function(){
    function SubTypeOne(){}

    SubTypeOne.prototype = new TypeOne();
    SubTypeOne.prototype.constructor = SubTypeOne;
    SubTypeOne.prototype.parent = TypeOne.prototype;

    return SubTypeOne;
  }());

  //Type implementing iOne interface on the prototype
  var TypeOnePrototype = (function(){
    function TypeOnePrototype() {}

    TypeOnePrototype.prototype.constructor = TypeOnePrototype;
    TypeOnePrototype.prototype.a = function(){ console.log("TypeOnePrototype.a()"); };

    return TypeOnePrototype;
  }());

  //Type subclassing TypeOnePrototype
  var SubTypeOnePrototype = (function(){
    function SubTypeOnePrototype(){}

    SubTypeOnePrototype.prototype = new TypeOnePrototype();
    SubTypeOnePrototype.prototype.constructor = SubTypeOnePrototype;
    SubTypeOnePrototype.prototype.parent = TypeOnePrototype.prototype;

    return SubTypeOnePrototype;
  }());

  //Type subclassing SubTypeOnePrototype
  var SubSubTypeOnePrototype = (function(){
    function SubSubTypeOnePrototype(){}

    SubSubTypeOnePrototype.prototype = new SubTypeOnePrototype();
    SubSubTypeOnePrototype.prototype.constructor = SubSubTypeOnePrototype;
    SubSubTypeOnePrototype.prototype.parent = SubTypeOnePrototype.prototype;

    return SubSubTypeOnePrototype;
  }());

  /*---STEP 1: INTERFACE ON THIS---*/
  {
    console.log("STEP 1: INTERFACE ON THIS");
    try{
      var obj = new TypeOne();
      console.log(obj);
      Interface.ensureImplements(obj, iOne);
      stepOne = true;
    }catch(e) {
      console.error(e.message);
    }

    if(stepOne === true){
      console.log("STEP 1: PASSED");
    }else{
      console.error("STEP 1: FAILED");
    }
  }

  console.log("\n");

  /*---STEP 2: INTERFACE ON PARENT THIS---*/
  {
    console.log("STEP 2: INTERFACE ON PARENT THIS");
    try{
      var obj = new SubTypeOne();
      console.log(obj);
      Interface.ensureImplements(obj, iOne);
      stepTwo = true;
    }catch(e) {
      console.error(e.message);
    }

    if(stepTwo === true){
      console.log("STEP 2: PASSED");
    }else{
      console.error("STEP 2: FAILED");
    }
  }

  console.log("\n");

  /*---STEP 3: INTERFACE ON PROTOTYPE---*/
  {
    console.log("STEP 3: INTERFACE ON PROTOTYPE");
    try{
      var obj = new TypeOnePrototype();
      console.log(obj);
      Interface.ensureImplements(obj, iOne);
      stepThree = true;
    }catch(e) {
      console.error(e.message);
    }

    if(stepThree === true){
      console.log("STEP 3: PASSED");
    }else{
      console.error("STEP 3: FAILED");
    }
  }

  console.log("\n");

  /*---STEP 4: INTERFACE ON PARENT PROTOTYPE---*/
  {
    console.log("STEP 4: INTERFACE ON PARENT PROTOTYPE");
    try{
      var obj = new SubTypeOnePrototype();
      console.log(obj);
      Interface.ensureImplements(obj, iOne);
      stepFour = true;
    }catch(e) {
      console.error(e.message);
    }

    if(stepOne === true){
      console.log("STEP 4: PASSED");
    }else{
      console.error("STEP 4: FAILED");
    }
  }

  console.log("\n");

  /*---STEP 5: INTERFACE ON ANCESTOR PROTOTYPE---*/
  {
    console.log("STEP 5: INTERFACE ON ANCESTOR PROTOTYPE");
    try{
      var obj = new SubSubTypeOnePrototype();
      console.log(obj);
      Interface.ensureImplements(obj, iOne);
      stepFive = true;
    }catch(e) {
      console.error(e.message);
    }

    if(stepFive === true){
      console.log("STEP 5: PASSED");
    }else{
      console.error("STEP 5: FAILED");
    }
  }

  console.log("\n");
  console.log("\n");

  if(stepOne && stepTwo && stepThree && stepFour && stepFive){
    console.log("TEST PASSED");
  }else{
    console.error("TEST FAILED");
  }
}
