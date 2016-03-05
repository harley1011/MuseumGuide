var MediaType = (function() {

  function MediaType() {
    this.enum = {
      video: 0,
      audio: 1,
      image: 2,
    };
    this.properties = {
      0: {
        value: "video"
      },
      1: {
        value: "audio"
      },
      2: {
        value: "image"
      },
    };
    Object.freeze(this);
  }

  MediaType.prototype = new Enum();
  MediaType.prototype.constructor = MediaType;
  MediaType.prototype.parent = (function() {
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

  MediaType.prototype.isValidType = function(type) {
    if (this.parent.isValidType.call(this) || this.parent.isValidValue.call(this)) return true;
    else return false;
  };

  return MediaType;
}());
