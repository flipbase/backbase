var extend = require('./utils').extend;
var inherits = require('./utils').inherits;

// Helper function to correctly set up the prototype chain for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
var extend = function(protoProps) {
  var parent = this;

  // Create constructor method that automatically calls parent when initiated
  var child = function(){ 
    return parent.apply(this, arguments); 
  };

  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function and add the prototype properties.
  var proto = inherits(parent.prototype);
  child.prototype = assign(proto, protoProps);
  child.prototype.constructor = child;

  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype;

  return child;
};

function assign(proto, protoProps) {
  for(var key in protoProps) {
    proto[key] = protoProps[key];
  }
  return proto;
}

module.exports = extend;