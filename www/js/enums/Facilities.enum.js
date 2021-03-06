var Facilities = (function() {
  Facilities.prototype = new Enum();
  Facilities.prototype.constructor = Facilities;
  Facilities.prototype.parent = (function() {
    //For PhantomJS support (testing suite)
    if (typeof Object.assign != 'function') {
      (function() {
        Object.assign = function(target) {
          'use strict';
          if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
          }

          var output = Object(target);
          for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
              for (var nextKey in source) {
                if (source.hasOwnProperty(nextKey)) {
                  output[nextKey] = source[nextKey];
                }
              }
            }
          }
          return output;
        };
      })();
    }
    return Object.assign({}, Enum.prototype);
  })();

  Facilities.prototype.isValidType = function(type) {
    if (this.parent.isValidType.call(this) || this.parent.isValidValue.call(this)) return true;
    else return false;
  };

  function Facilities() {
    this.enum = {
      ramp: 0,
      stairs: 1,
      elevator: 2,
      intersection: 3,
      washroom: 4,
      exit: 5,
      entrance: 6,
      emergency_exit: 7
    };
    this.properties = {
      0: {
        value: "ramp"
      },
      1: {
        value: "stairs"
      },
      2: {
        value: "elevator"
      },
      3: {
        value: "intersection"
      },
      4: {
        value: "washroom"
      },
      5: {
        value: "exit"
      },
      6: {
        value: "entrance"
      },
      7: {
        value: "emergency_exit"
      },
    };
    Object.freeze(this);
  }

  return Facilities;
}());
