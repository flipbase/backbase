import events from './../../bower_components/utilbase';
import pubsub from './../../bower_components/utilbase';
import utils from './../../bower_components/utilbase';
// import log from './../../bower_components/logger';
import createEl from './../../bower_components/utilbase/src/DOM';
// import Flipbase from './../../bower_components/global';

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

class Component {
  constructor(options = {}) {
    
    this._children = {};
    this._events = {};
    this._pubsubs = {};

    this.options = options;
    this.parent = options.parent || null;

    // Create new DOM element if there is non provided.
    // If a similar named method has been provided to the parent component's
    // class then this precedes the method as defined in this prototype.
    if (this.createEl) {
      this.$el = this.createEl();
    } else if (options.$el) {
      this.$el = options.$el;
    }
       
    if (!this.$el)
      this.$el = DOM.createEl();

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

  addToDOM() {
    if (this.parent && !document.body.contains(this.$el))
      this.parent.$el.appendChild(this.$el);
  }

  listenTo(evnt, fn, context, store) {
    context = context || this;
    var index = pubsub.subscribe(evnt, fn, context, store);

    // Added indexes of eventlisteners to local storage, so they can be removed
    if (!this._pubsubs[evnt]) this._pubsubs[evnt] = [];
    this._pubsubs[evnt].push(index);
  }

  trigger(evnt, store, args) {
    pubsub.publish(evnt, store, args);
  }

  unsubscribe(evnt, store) {
    var events = this._pubsubs[evnt] || [];
    events.forEach(function(index) {
      pubsub.unsubscribe(evnt, index, store);
    });
  }

  html(body) {
    if (typeof body === 'string') {
      this.$el.innerHTML = body;
    }
    return this.$el.innerHTML;
  }

  on(evt, fn, el) {
    fn = utils.bind(this, fn);
    this._events[evt] = fn;
    el = el || this.$el;
    events.on(el, evt, fn);
  }

  off(evt, fn, el) {
    fn = this._events[evt] || fn;
    el = el || this.$el;
    events.off(el, evt, fn);
  }

  show() {
    this.$el.style.display = 'block';
  }

  hide() {
    this.$el.style.display = 'none';
  }


  getChild(compName) {
    return this._children[compName];
  }

  // FIXME: models hoeven niet ingepast te worden als args, omdat dit via
  // het event system afgehandeld moet worden. 
  // We create register a instanceId on each child so we can distribute events
  // to an external (globally namespaced) event dispatcher.
  addChildren() {
    var _this = this;
    // var model = this.model || {};
    // var client = this.client || {};

    var options = this.options;
    options.playerInstanceId = this.playerInstanceId;
    delete options.$el;

    // Children property is provided by the prototype of the instance
    this.children.forEach(function(compName) {
      _this.addChild(compName, options);
    });
  }

  addChild(compName, options) {
    var Comp = this.getComponent(compName);
    options.parent = this;
    if (!this._children[compName] && Comp)
      this._children[compName] = new Comp(options);

    return this._children[compName];
  }

  removeChild(child) {
    var child = this._children[child];
    
    if (child) {
      child.destroy();
      delete this._children[child];
    }
  }
  
  remove() {
    // If the current component has a parentNode use it
    if (this.$el.parentNode) {
      return this.$el.parentNode.removeChild(this.$el);
    }    
  }

  destroy() {
    var childs = Object.keys(this._children);
    var events = Object.keys(this._events);
    var _this = this;

    if (childs.length)
      this.removeChildren();

    if (events.length)
      events.forEach(function(key) {
        _this.off(key, events[key]);
      });

    this.remove();

    this.$el = null;
  }


  getComponent(name) {
    if (Flipbase._components[name])
      return Flipbase._components[name];

    // log.error('Component"' + name + '"not registered');
  }

  static registerComponent(name, Component) {
    if (!Flipbase._components)
      Flipbase._components = {};

    Flipbase._components[name] = Component;
    return Component;
  }

}

module.exports = Component;