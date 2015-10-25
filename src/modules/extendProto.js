var inherits = require('./utils').inherits;
var assign = require('./utils').assign;

/**
 * Utitlity function to extend a prototype with a new prototype. Heavily
 * inspired by Backbone.Model.extend method. This abstracts away the call
 * to the parent prototype: `Parent.prototype.call(this, options)` and
 * extend the child prototype with the prototype of the parent.
 *
 * @mixin extendProto
 * @author  Ron Jansen <ron@flipbase.com>
 *
 * @todo  we need to extend the prototype also with staticproperties
 *
 * @param  {Object} protoProps object with methods to extend current prototype
 * @return {Object} prototype  new child prototype with methods from protoProps
 */
var extendProto = function (protoProps) {
  // Store reference to parent
  var _this = this;

  // Create constructor method that automatically calls parent when initiated
  var child = function () {
    return _this.apply(this, arguments);
  };

  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function and add the prototype properties.
  var proto = inherits(_this.prototype);
  child.prototype = assign(proto, protoProps);
  child.prototype.constructor = child;

  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.prototype.__super__ = _this.prototype;

  return child;
};

module.exports = extendProto;
