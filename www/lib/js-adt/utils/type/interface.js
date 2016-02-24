/**
* Interface Pattern
* Taken from Pro Javascript Design Patterns
* <http://jscriptpatterns.blogspot.ca/2013/01/javascript-interfaces.html>
* @import com.jsadt.utils.exceptions.IllegalArgumentException
* @import com.jsadt.utils.exceptions.IllegalParameterListException
**/
var Interface = function(name, methods) {

    if (arguments.length != 2) {
        throw new IllegalParameterListException("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
    }

    this.name = name;
    this.methods = [];

    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== 'string') {
            throw new IllegalArgumentException("Interface constructor expects method names to be passed in as a string.");
        }

        this.methods.push(methods[i]);
    }
};

// Static class method.
Interface.ensureImplements = function(object) {
    if (arguments.length < 2) {
        throw new IllegalParameterListException("Function Interface.ensureImplements called with " + arguments.length + "arguments, but expected at least 2.");
    }

    for (var i = 1, len = arguments.length; i < len; i++) {
        var interface = arguments[i];
        if (interface.constructor !== Interface) {
            throw new IllegalArgumentException("Function Interface.ensureImplements expects arguments two and above to be instances of Interface.");
        }

        for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            var method = interface.methods[j];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new IllegalArgumentException("Function Interface.ensureImplements: object does not implement the " + interface.name + " interface. Method " + method + " was not found.");
            }
        }
    }
};
