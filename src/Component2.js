var Flipbase = require('./utils/namespace');
var pubsub = require('./utils/pubsub');
var events = require('./utils/events');
var each = require('./utils/utils').each;
var bind = require('./utils/utils').bind;
var keys = require('./utils/utils').keys;
var createEl = require('./utils/DOM').createEl;
var extend = require('./utils/utils').extend;

/**
 * At initialization component will return instance. When you append
 * it with the .render() method. It will return the HTML that 
 *
 * Q: How to notify the parent that the parent needs to be rendered as well?
 *   A1: Using the same events that trigger the state change at the child component?
 *   A2: Can we trigger a rerender from the child of the parent? Is not really loosly coupled?
 *   A3: 
 * 
 * @param {object} options.data   
 * @param {object} options.state
 * @param {object} options.props
 */
function Component(options) {
  extend(this, options);

  // if (this.$el && !document.body.contains(this.$el))
  //   throw new Error('The provided element is not added to the DOM');

  if (!this.$el)
    this.createEl();

  return this;
}

Component.prototype = {
  
  $el: null,

  _children: {},
  
  // initChildren: function (options) {
  //   var parent = this.$el;
  //   var self = this;

  //   if (!this.children || !this.children.length) return;

  //   each(this.children, function (val) {
  //     self.initChild(val, options);
  //   });
  // },

  // initChild: function (name, options) {
  //   var Child = Component.getComponent(name);
  //   this._children[name] = new Child(options);
  //   return this._children[name];
  // },

  // renderChild: function (name, options) {
  //   if (this._children[name])
  //     return this._children[name].render(options);
  // },

  template: function () {
    return '<div></div>';
  },

  create: function () {
    this.willRender.apply(this, arguments);
    this.render.apply(this, arguments);
    this.didRender.apply(this, arguments);
  },

  willRender: function () {},
  render: function () {},
  didRender: function () {}

};

Component._components = {};

Component.getComponent = function(name) {
  if (Component._components[name])
    return Component._components[name];
};

Component.registerComponent = function (name, obj) {
  if (!Component._components)
    Component._components = {};

  Component._components[name] = obj;

  return obj;
};

module.exports = Component;