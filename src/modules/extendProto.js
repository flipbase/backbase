var inherits = require('./utils').inherits;
var assign = require('./utils').assign;

/**
 * Utitlity function to extend a prototype with a new prototype. Heavily 
 * inspired by Backbone.Model.extend method. This abstracts away the call
 * to the parent prototype: `Parent.prototype.call(this, options)` and
 * extend the child prototype with the prototype of the parent.
 *
 * @todo  we need to extend the prototype also with staticproperties
 * 
 * @param  {Object} protoProps object with methods to extend current prototype
 * @return {Object} prototype  new child prototype with methods from protoProps
 */
var extendProto = function(protoProps) {
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
  child.prototype.__super__ = parent.prototype;

  return child;
};


module.exports = extendProto;