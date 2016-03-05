var Language = (function() {

  function Language() {
    this.enum = {
      en: 0,
      fr: 1,
    };
    this.properties = {
      0: {
        value: "en"
      },
      1: {
        value: "fr"
      },
    };
    Object.freeze(this);
  }

  Language.prototype = new Enum();
  Language.prototype.constructor = Language;
  Language.prototype.parent = (function() {
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

  Language.prototype.isValidType = function(type) {
    if (this.parent.isValidType.call(this) || this.parent.isValidValue.call(this)) return true;
    else return false;
  };

  return Language;
}());
