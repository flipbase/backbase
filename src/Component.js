var Flipbase = require('./utils/namespace');
var pubsub = require('./utils/pubsub');
var events = require('./utils/events');
var each = require('./utils/utils').each;
var bind = require('./utils/utils').bind;
var keys = require('./utils/utils').keys;
var createEl = require('./utils/DOM').createEl;

/**
 * @example
 * 
 * var el = new Component('flipbase-recorder-intro', {
 *   tag: 'button',
 *   attrs: {
 *     'style': 'color: #FFF000; text-align: center;'
 *     'className': 'alternative-recorder-intro' // override className as default
 *   }
 * });
 *
 * el.on('click', function (evt) {
 *  // handle click event
 * });
 *
 * el.remove();
 * 
 */

function Component(options) {  
  this._children = {};
  this._events = {};
  this._pubsubs = {};

  if (!options || (!options.parent && !options.$el && !this.createEl)) 
    throw new Error('The top level component should receive an reference to an DOM element');

  this.options = options || {};
  this.parent = options ? options.parent : null;

  // Create new DOM element if there is non provided.
  // If a similar named method has been provided to the parent component's
  // class then this precedes the method as defined in this prototype.
  if (this.createEl) {
    this.$el = this.createEl();
  } else if (this.options.$el) {
    this.$el = this.options.$el;
  }
     
  if (!this.$el)
    this.$el = createEl();

  // If instance does not have a render method provided, render element 
  // directly into the DOM
  if (!this.render)
    this.addToDOM();

  // Add child elements to the Component and Render into the DOM
  if (this.children)
    this.addChildren();

  if (this.init)
    this.init.call(this, options);
}

Component.prototype.addToDOM = function() {
  if (this.parent && !document.body.contains(this.$el))
    this.parent.$el.appendChild(this.$el);
};

Component.prototype.listenTo = function (evnt, fn, context, store) {
  context = context || this;
  var index = pubsub.subscribe(evnt, fn, context, store);

  // Added indexes of eventlisteners to local storage, so they can be removed
  if (!this._pubsubs[evnt]) this._pubsubs[evnt] = [];
  this._pubsubs[evnt].push(index);
};

Component.prototype.trigger = function(evnt, store, args) {
  pubsub.publish(evnt, store, args);
};

Component.prototype.unsubscribe = function(evnt, store) {
  var events = this._pubsubs[evnt] || [];
  each(events, function(index) {
    pubsub.unsubscribe(evnt, index, store);
  });
};

Component.prototype.html = function(body) {
  if (typeof body === 'string') {
    this.$el.innerHTML = body;
  }
  return this.$el.innerHTML;
};

Component.prototype.on = function(evt, fn, el) {
  fn = bind(this, fn);
  this._events[evt] = fn;
  el = el || this.$el;
  events.on(el, evt, fn);
};

Component.prototype.off = function(evt, fn, el) {
  fn = this._events[evt] || fn;
  el = el || this.$el;
  events.off(el, evt, fn);
};

Component.prototype.show = function() {
  this.$el.style.display = 'block';
};

Component.prototype.hide = function() {
  this.$el.style.display = 'none';
};


Component.prototype.getChild = function(compName) {
  return this._children[compName];
};

// FIXME: models hoeven niet ingepast te worden als args, omdat dit via
// het event system afgehandeld moet worden. 
// We create register a instanceId on each child so we can distribute events
// to an external (globally namespaced) event dispatcher.
Component.prototype.addChildren = function() {
  var _this = this;
  // var model = this.model || {};
  // var client = this.client || {};

  var options = this.options;
  options.playerInstanceId = this.playerInstanceId;
  delete options.$el;

  // Children property is provided by the prototype of the instance
  each(this.children, function(compName) {
    _this.addChild(compName, options);
  });
};

Component.prototype.addChild = function(compName, options) {
  var Comp = this.getComponent(compName);
  options.parent = this;
  
  if (!this._children[compName] && Comp)
    this._children[compName] = new Comp(options);

  return this._children[compName];
};

Component.prototype.removeChild = function(child) {
  child = this._children[child];
  
  if (child) {
    child.destroy();
    delete this._children[child];
  }
};
  
Component.prototype.remove = function() {
  // If the current component has a parentNode use it
  if (this.$el.parentNode) {
    return this.$el.parentNode.removeChild(this.$el);
  }    
};

Component.prototype.destroy = function() {
  var childs = keys(this._children);
  var events = keys(this._events);
  var _this = this;

  if (childs.length)
    this.removeChildren();

  if (events.length)
    each(events, function(key) {
      _this.off(key, events[key]);
    });

  this.remove();

  this.$el = null;
};


Component.prototype.getComponent = function(name) {
  if (Flipbase._components[name])
    return Flipbase._components[name];

  // log.error('Component"' + name + '"not registered');
};

  // static registerComponent(name, Component) {
  //   if (!Flipbase._components)
  //     Flipbase._components = {};

  //   Flipbase._components[name] = Component;
  //   return Component;
  // }


module.exports = Component;