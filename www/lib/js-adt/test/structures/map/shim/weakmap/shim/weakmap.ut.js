/**
* Unit Test for the WeakMap Shim
**/

/*---TEST---*/
try
{
  var wm, jswm;
  /*---TEST TYPES AND FUNCTIONS---*/
  //Key Test Type
  var Key = (function(){
    function Key(){
      this.a = function(){ console.log("Key.a()"); };
      this.uuid = generateUUID();
    }
    //Source
    //http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    function generateUUID(){
      var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
      var d0 = Math.random()*0xffffffff|0;
      var d1 = Math.random()*0xffffffff|0;
      var d2 = Math.random()*0xffffffff|0;
      var d3 = Math.random()*0xffffffff|0;
      return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+
        lut[d1&0xff]+lut[d1>>8&0xff]+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+
        lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
        lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
    }
    return Key;
  }());

  //Value Test Type
  var Value = (function(){
    function Value(uuid){
      this.a = function(){ console.log("Value.a()"); };
      this.uuid = uuid;
    }
    return Value;
  }());

  //Initialization of WeakMap function
  var init = function(){
    if(jswm !== undefined){
      jswm.destroy();
    }
    if(typeof WeakMap !== 'undefined'){
      wm = new WeakMap();
    }
    jswm = new $global.test.types.WeakMap();
  };

  //Filling the test data
  var map = {}, count = 100000;
  for(var i = 0 ; i < count; i++){
    var k = new Key(),
        v = new Value(k.uuid);
        map[k.uuid] = [k,v];
  }

  $global.test.flags.WeakMap.start = Date.now();

  /*---STEP 1: SHADOWING TEST---*/
  //Testing if the shim WeakMap shadows the ECMAScript WeakMap
  {
    console.log("STEP 1: SHADOWING TEST");
    var flag = {
      success: false,
      times: {
        start: Date.now(),
        end: undefined,
      }
    };
    init();
    if(wm === undefined){
      throw new Error("Browser does not have support for ECMAScript 2015 WeakMap. Aborting...");
    }
    try{
      if(wm.uuid !== undefined){
        throw new Error("ECMAScript WeakMap was shadowed by the WeakMap shim");
      }else if(jswm === undefined || jswm.uuid === undefined){
        throw new Error("WeakMap shim was shadowed by the ECMAScript WeakMap");
      }else{
        flag.success = true;
        flag.times.end = Date.now();
        $global.test.flags.WeakMap.steps.push(flag);
      }
    }catch(e) {
      console.error(e.message);
      flag.times.end = Date.now();
      $global.test.flags.WeakMap.steps.push(flag);
    }

    if(flag.success === true){
      console.log("STEP 1: PASSED");
    }else{
      console.error("STEP 1: FAILED");
    }
  }
  /*---STEP 2: SET/GET PERFORMANCE TEST---*/
  //Testing for SET and GET operations
  {
    console.log("STEP 2: SET/GET TEST");
    var flag =
    {
      success: false,
      times: {
        start: Date.now(),
        end: undefined,
        set: {
          ecma: {},
          shim: {},
        },
        get: {
          ecma: {},
          shim: {},
        }
      }
    };
    try{
      console.log("SET Operation on the ECMAScript WeakMap");
      flag.times.set.ecma.start =  Date.now();
      for(key in map){
        wm.set(map[key][0], map[key][1]);
      }
      flag.times.set.ecma.end = Date.now();

      console.log("SET Operation on the JS-ADT shim WeakMap");
      flag.times.set.shim.start =  Date.now();
      for(key in map){
        jswm.set(map[key][0], map[key][1]);
      }
      flag.times.set.shim.end = Date.now();

      var get;

      console.log("GET Operation on the ECMAScript WeakMap");
      flag.times.get.ecma.start =  Date.now();
      for(key in map){
        get = wm.get(map[key][0]);
        if(get === undefined){
          console.error(key);
          console.error(map[key][0]);
          console.error(map[key][1]);
          console.error(get);
          throw new Error("GET Operation on the ECMAScript WeakMap returned undefined from a mapped key");
        }
      }
      flag.times.get.ecma.end = Date.now();

      console.log("GET Operation on the JS-ADT shim WeakMap");
      flag.times.get.shim.start =  Date.now();
      for(key in map){
        get = jswm.get(map[key][0]);
        if(get === undefined){
          console.error(key);
          console.error(map[key][0]);
          console.error(map[key][1]);
          console.error(get);
          throw new Error("GET Operation on the JS-ADT shim WeakMap returned undefined from a mapped key");
        }
      }
      flag.times.get.shim.end = Date.now();
    }catch(e){
      $global.test.flags.WeakMap.steps.push(flag);
      console.error("STEP 2: FAILED");
      throw e;
    }
    flag.success = true;
    flag.times.end = Date.now();
    console.log("STEP 2: PASSED");
    $global.test.flags.WeakMap.steps.push(flag);
  }

  /*---STEP 3: HAS PERFORMANCE TEST---*/
  //Testing for HAS operation
  {
    console.log("STEP 3: HAS TEST");
    var flag =
    {
      success: false,
      times: {
        start: Date.now(),
        end: undefined,
        has: {
          ecma: {},
          shim: {},
        },
      }
    };
    try{
      var has;

      console.log("HAS Operation on the ECMAScript WeakMap");
      flag.times.has.ecma.start =  Date.now();
      for(key in map){
        has = wm.has(map[key][0]);
        if(has === false){
          console.error(key);
          console.error(map[key][0]);
          console.error(map[key][1]);
          console.error(has);
          throw new Error("HAS Operation on the JS-ADT shim WeakMap returned false from a mapped key");
        }
      }
      flag.times.has.ecma.end = Date.now();

      console.log("HAS Operation on the JS-ADT shim WeakMap");
      flag.times.has.shim.start =  Date.now();
      for(key in map){
        has = jswm.has(map[key][0]);
        if(has === undefined){
          console.error(key);
          console.error(map[key][0]);
          console.error(map[key][1]);
          console.error(has);
          throw new Error("HAS Operation on the JS-ADT shim WeakMap returned false from a mapped key");
        }
      }
      flag.times.has.shim.end = Date.now();
    }catch(e){
      $global.test.flags.WeakMap.steps.push(flag);
      console.error("STEP 3: FAILED");
      throw e;
    }
    flag.success = true;
    flag.times.end = Date.now();
    console.log("STEP 3: PASSED");
    $global.test.flags.WeakMap.steps.push(flag);
  }


  /*---STEP 4: DELETE PERFORMANCE TEST---*/
  //Testing for DELETE operation
  {
    console.log("STEP 4: DELETE TEST");
    var flag =
    {
      success: false,
      times: {
        start: Date.now(),
        end: undefined,
        delete: {
          ecma: {},
          shim: {},
        }
      }
    };
    try{
      var del;

      console.log("DELETE Operation on the ECMAScript WeakMap");
      flag.times.delete.ecma.start =  Date.now();
      for(key in map){
        del = wm.delete(map[key][0]);
        if(del === false){
          console.error(key);
          console.error(map[key][0]);
          console.error(map[key][1]);
          console.error(del);
          throw new Error("DELETE Operation on the JS-ADT shim WeakMap returned false from a mapped key");
        }
      }
      flag.times.delete.ecma.end = Date.now();

      console.log("DELETE Operation on the JS-ADT shim WeakMap");
      flag.times.delete.shim.start =  Date.now();
      for(key in map){
        del = jswm.delete(map[key][0]);
        if(del === undefined){
          console.error(key);
          console.error(map[key][0]);
          console.error(map[key][1]);
          console.error(del);
          throw new Error("DELETE Operation on the JS-ADT shim WeakMap returned false from a mapped key");
        }
      }
      flag.times.delete.shim.end = Date.now();
    }catch(e){
      $global.test.flags.WeakMap.steps.push(flag);
      console.error("STEP 4: FAILED");
      throw e;
    }
    flag.success = true;
    flag.times.end = Date.now();
    console.log("STEP 4: PASSED");
    $global.test.flags.WeakMap.steps.push(flag);
  }

  /*---STEP 5: SET NEGATIVE CASE TEST---*/
  //Testing for improper SET input
  {
    console.log("STEP 5: SET NEGATIVE CASE TEST");

    var flag =
    {
      success: true,
      times: {
        start: Date.now(),
        end: undefined,
      },
      cases: []
    };

    //Testing for Primitive Key value
    var key = "key", value = "value";
    try{
      console.log("SET Operation with Primitive Key the ECMAScript WeakMap");
      wm.set(key, value);
      flag.cases[0] = true;
    }catch(e){
      flag.cases[0] = false;
    }

    try{
      console.log("SET Operation with Primitive Key the JS-ADT shim WeakMap");
      jswm.set(key, value);
      if(flag.cases[0] !== true){
        console.error("STEP 5: FAILED");
        console.error("SET Operation with Primitive Key behaves differently betwen ECMA and shim.\nECMA refuses input while shim accepts");
        flag.success = false;
      }else{
        console.log("STEP 5: PASSED");
      }
    }catch(e){
      if(flag.cases[0] !== false){
        console.error("STEP 5: FAILED");
        console.error("SET Operation with Primitive Key behaves differently betwen ECMA and shim.\nECMA accepts input while shim refuses");
        flag.success = false;
      }else{
        console.log("STEP 5: PASSED");
      }
    }

    //Testing for Undefined Key value
    try{
      console.log("SET Operation with Undefined Key the ECMAScript WeakMap");
      wm.set(undefined, value);
      flag.cases[1] = true;
    }catch(e){
      flag.cases[1] = false;
    }

    try{
      console.log("SET Operation with Undefined Key the JS-ADT shim WeakMap");
      jswm.set(undefined, value);
      if(flag.cases[1] !== true){
        console.error("SET Operation with Undefined Key behaves differently betwen ECMA and shim.\nECMA refuses input while shim accepts");
        flag.success = false;
      }
    }catch(e){
      if(flag.cases[1] !== false){
        console.error("SET Operation with Undefined Key behaves differently betwen ECMA and shim.\nECMA accepts input while shim refuses");
        flag.success = false;
      }
    }

    //Testing for Null Key value
    try{
      console.log("SET Operation with Null Key the ECMAScript WeakMap");
      wm.set(null, value);
      flag.cases[2] = true;
    }catch(e){
      flag.cases[2] = false;
    }

    try{
      console.log("SET Operation with Null Key the JS-ADT shim WeakMap");
      jswm.set(null, value);
      if(flag.cases[2] !== true){
        console.error("SET Operation with Null Key behaves differently betwen ECMA and shim.\nECMA refuses input while shim accepts");
        flag.success = false;
      }
    }catch(e){
      if(flag.cases[2] !== false){
        console.error("SET Operation with Null Key behaves differently betwen ECMA and shim.\nECMA accepts input while shim refuses");
        flag.success = false;
      }
    }

    //Determining success
    if(flag.success){
      console.log("STEP 5: PASSED");
    }else{
      console.error("STEP 5: FAILED");
    }

    flag.times.end = Date.now();
    $global.test.flags.WeakMap.steps.push(flag);
  }

  /*---STEP 6: GET NEGATIVE CASE TEST---*/
  //Testing for improper GET input
  {
    console.log("STEP 6: GET NEGATIVE CASE TEST");

    var flag =
    {
      success: false,
      times: {
        start: Date.now(),
        end: undefined,
      },
      cases: []
    };

    //Testing for Primitive Key value
    var key = "key", value = "value";
    try{
      console.log("GET Operation with Primitive Key the ECMAScript WeakMap");
      wm.set({a:"key"}, value);
      wm.get(key);
      flag.cases[0] = true;
    }catch(e){
      flag.cases[0] = false;
    }

    try{
      console.log("GET Operation with Primitive Key the JS-ADT shim WeakMap");
      jswm.set({a:"key"}, value);
      jswm.get(key);
      if(flag.cases[0] !== true){
        console.error("STEP 6: FAILED");
        console.error("GET Operation with Primitive Key behaves differently betwen ECMA and shim.\nECMA refuses input while shim accepts");
        flag.success = false;
      }else{
        console.log("STEP 6: PASSED");
        flag.success = true;
      }
    }catch(e){
      if(flag.cases[0] !== false){
        console.error("STEP 6: FAILED");
        console.error("SET Operation with Primitive Key behaves differently betwen ECMA and shim.\nECMA accepts input while shim refuses");
        flag.success = false;
      }else{
        console.log("STEP 6: PASSED");
        flag.success = true;
      }
    }

    flag.times.end = Date.now();
    $global.test.flags.WeakMap.steps.push(flag);
  }

  /*---STEP 7: ENHANCED FEATURES TEST---*/
  //Testing for ENTRIES, KEYS, VALUES, FOREACH functions
  {
    console.log("STEP 7: ENHANCED FEATURES TEST");

    var flag =
    {
      success: false,
      times: {
        start: Date.now(),
        end: undefined,
        cases: {
          entries: {
            start: undefined,
            end: undefined,
          },
          values: {
            start: undefined,
            end: undefined,
          },
          keys: {
            start: undefined,
            end: undefined,
          },
          forEach: {
            start: undefined,
            end: undefined,
          },
        },
      },
    };
    var entries, values, keys, valid = {};

    console.log("Resetting WeakMap Shim object");
    jswm.destroy();
    jswm = new $global.test.types.WeakMap();
    for(key in map){
      jswm.set(map[key][0], map[key][1]);
    }

    console.log("Obtaining Entries");
    flag.times.cases.entries.start = Date.now();
    entries = jswm.entries();
    flag.times.cases.entries.end = Date.now();

    console.log("Verifying Entries");
    valid.entries = true;
    for(var i = 0 ; i < entries.length ; i++){
      if(map[entries[i][0].uuid] === undefined){
        valid.entries = false;
        break;
      }
    }
    if(valid.entries){
      console.log("STEP 7 [ENTRIES]: PASSED");
    }else{
      console.error("STEP 7 [ENTRIES]: FAILED");
    }

    console.log("Obtaining Keys");
    flag.times.cases.keys.start = Date.now();
    keys = jswm.keys();
    flag.times.cases.keys.end = Date.now();

    console.log("Verifying Keys");
    valid.keys = true;
    for(var i = 0 ; i < keys.length ; i++){
      if(map[keys[i].uuid] === undefined){
        valid.keys = false;
        break;
      }
    }

    if(valid.keys){
      console.log("STEP 7 [KEYS]: PASSED");
    }else{
      console.error("STEP 7 [KEYS]: FAILED");
    }

    console.log("Obtaining Values");
    flag.times.cases.values.start = Date.now();
    values = jswm.values();
    flag.times.cases.values.end = Date.now();

    console.log("Verifying Values");
    valid.values = true;

    for(key in map){
      if(values.indexOf(map[key][1]) === -1){
        valid.values = false;
        break;
      }
    }

    if(valid.values){
      console.log("STEP 7 [VALUES]: PASSED");
    }else{
      console.error("STEP 7 [VALUES]: FAILED");
    }

    console.log("Using forEach");
    var caller = {count: 0 , callback: function(){this.count++;}};
    flag.times.cases.forEach.start = Date.now();
    jswm.forEach(caller.callback, caller);
    valid.forEach = (caller.count === count)? true : false;
    flag.times.cases.forEach.end = Date.now();

    if(valid.forEach){
      console.log("STEP 7 [FOREACH]: PASSED");
    }else{
      console.error("STEP 7 [FOREACH]: FAILED");
    }

    //Determining success
    flag.success = valid.entries && valid.keys && valid.values && valid.forEach;
    if(flag.success){
      console.log("STEP 7: PASSED");
    }else{
      console.error("STEP 7: FAILED");
    }

    flag.times.end = Date.now();
    $global.test.flags.WeakMap.steps.push(flag);
  }

  //TEST RESULTS
  $global.test.flags.WeakMap.end = Date.now();
  var success = true, steps = $global.test.flags.WeakMap.steps;
  for(var i = 0 ; i < steps.length; i++){
    success = steps[i].success && success;
  }
  if(success === true){
    console.log("\n");
    console.log("\n");
    console.log("TEST PASSED");
  }else{
    console.log("\n");
    console.log("\n");
    console.error("TEST FAILED");
  }

  console.log("\n");
  console.log("TIME BREAKDOWN (ms)");
  console.log("STEP 1:         " + (steps[0].times.end - steps[0].times.start));
  console.log("STEP 2:         " + (steps[1].times.end - steps[1].times.start));
  console.log("  ECMA SET:     " + (steps[1].times.set.ecma.end - steps[1].times.set.ecma.start));
  console.log("  SHIM SET:     " + (steps[1].times.set.shim.end - steps[1].times.set.shim.start));
  console.log("  ECMA GET:     " + (steps[1].times.get.ecma.end - steps[1].times.get.ecma.start));
  console.log("  SHIM GET:     " + (steps[1].times.get.shim.end - steps[1].times.get.shim.start));
  console.log("STEP 3:         " + (steps[2].times.end - steps[2].times.start));
  console.log("  ECMA HAS:     " + (steps[2].times.has.ecma.end - steps[2].times.has.ecma.start));
  console.log("  SHIM HAS:     " + (steps[2].times.has.shim.end - steps[2].times.has.shim.start));
  console.log("STEP 4:         " + (steps[3].times.end - steps[3].times.start));
  console.log("  ECMA DELETE:  " + (steps[3].times.delete.ecma.end - steps[3].times.delete.ecma.start));
  console.log("  SHIM DELETE:  " + (steps[3].times.delete.shim.end - steps[3].times.delete.shim.start));
  console.log("STEP 5:         " + (steps[4].times.end - steps[4].times.start));
  console.log("STEP 6:         " + (steps[5].times.end - steps[5].times.start));
  console.log("STEP 7:         " + (steps[6].times.end - steps[6].times.start));
  console.log("  ENTRIES:      " + (steps[6].times.cases.entries.end - steps[6].times.cases.entries.start));
  console.log("  KEYS:         " + (steps[6].times.cases.keys.end - steps[6].times.cases.keys.start));
  console.log("  VALUES:       " + (steps[6].times.cases.values.end - steps[6].times.cases.values.start));
  console.log("  FOREACH:      " + (steps[6].times.cases.forEach.end - steps[6].times.cases.forEach.start));
  console.log("TOTAL:          " + ($global.test.flags.WeakMap.end - $global.test.flags.WeakMap.start));
}
catch(e){
  console.error(e.message);
  console.log("\n");
  console.log("\n");
  console.error("TEST FAILED");
}
