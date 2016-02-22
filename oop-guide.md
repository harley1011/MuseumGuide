## Quick Javascript OOP Standard Guide

###Standard Type Declaration with Private Variables

```javascript

  var TypeOne = (function (){

    var privateData = new WeakMap();

    //Constructor Function
    function TypeOne() {
      //Your private variables
      var privateMembers = {...}
      privateData.set(this, privateMembers)

    }

    //Specifies the constructor function on the prototype
    TypeOne.prototype.constructor = TypeOne;

    TypeOne.prototype.myPublicProp = 0;

    TypeOne.prototype.destructor = function(){
      privateData.delete(this);
    };

    return TypeOne;  
}());

```

####The `var x = (function(){ ... }());` Construct

Binding the function to a variable allows to have all of this logic
binded to a single variable rather than having it float around in the global namespace/global scope.

The construct `var x = (function(){ ... }());` basically says
"Execute this function and whatever content it returns will be the value
that is returned in the expression to the right" .
In our case we are returning the constructor of type to the variable.

Not to be confused with `(function(){ ... })();`, which basically means
"Execute this function between parentheses".

####The ECMAScript 2015 WeakMap and Private variables

"Keys of WeakMaps are of the type Object only. Primitive data types as keys are not allowed (e.g. a Symbol can't be a WeakMap key).

The key in a WeakMap is held weakly.  What this means is that, if there are no other strong references to the key, then the entire entry will be removed from the WeakMap by the garbage collector." - [link](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

In our case, the variable `privateData` is declared in the scope of the closure
that encompasses all of the prototype declarations. Due to the power of closures
and scopes in Javascript, this results in a similar effect than declaring
a private static variable in Java.

Even after the function closure resolves, since the variables declared in the scope
are visible to the prototype and referenced in some of its functions, the garbage
collector doesn't pick them up.

So basically anything declared in the scope of the closure is accessible only by
the variables/functions declared in the same scope. It indeed results in variables
shareable across all objects of the same type, but private with respect to all
outside scopes (or any nested scope - if you don't understand that parenthesis,
don't sweat it, it's of minor importance).

In our case, we store a set of properties of our type in the "static" variable privateData.
This allows us to map privately a set of properties to a public object.

And thus the Javascript God created the private visibility modifier.

Since we don't know if we will be using the shim I made or the native
WeakMap, never forget to use privateData.delete(this) when destroying
your object. My implementation does not have access to the engine's
reference counter like the native WeakMap does, and not removing the reference
in the WeakMap would result in a huge memory leak.

Take note that this technique will not work with Angular modules (services, controllers
, directives), since these are automatically singletons, and you do not declare the
type yourself so you cannot use the Weakmap in the way outlined above. However
if you want private variables, what you can do is declare variables directly in
the scope of your module without binding them to the this or the $scope objects.
It ends up creating a somewhat messy programming style though.
