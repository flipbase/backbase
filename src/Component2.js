var Flipbase = require('./utils/namespace');
var pubsub = require('./utils/pubsub');
var events = require('./utils/events');
var each = require('./utils/utils').each;
var bind = require('./utils/utils').bind;
var keys = require('./utils/utils').keys;
var createEl = require('./utils/DOM').createEl;
var extend = require('./utils/utils').extend;

function Component(options) {
  extend(this, options);

  // if (this.$el && !document.body.contains(this.$el))
  //   throw new Error('The provided element is not added to the DOM');

  if (!this.$el)
    this.createEl();
}

Component.prototype = {
  
  $el: null,

  createEl: function () {
    this.$el = document.createElement('div');
  },

  _children: {},
  
  initChildren: function (options) {
    var parent = this.$el;
    var self = this;

    if (!this.children || !this.children.length) return;

    each(this.children, function (val) {
      self.initChild(val, options);
    });
  },

  initChild: function (name, options) {
    var Child = Component.getComponent(name);
    this._children[name] = new Child(options);
    return this._children[name];
  },

  renderChild: function (name, options) {
    if (this._children[name])
      return this._children[name].render(options);
  },

  template: function () {
    return '<div></div>';
  },

  html: function () {
    return this.$el.innerHTML;
  },

  render: function () {
    this.willRender.apply(this, arguments);
    this.$el.innerHTML = this.template();
    this.didRender.apply(this, arguments);
    return this.$el.innerHTML;
  },

  willRender: function () {},

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