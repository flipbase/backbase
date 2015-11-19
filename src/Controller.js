var each = require('./modules/utils').each;
var extendProto = require('./modules/extendProto');

function Controller () {
  this.initialize.apply(this, arguments);
}

Controller.prototype = {

  initialize: function () {},

  _components: {},
  _partials: [],

  registerComponent: function (id, Component, options, isPartial) {
    this._components[id] = new Component(options);
    if (isPartial)
      this.registerPartial(id);
  },

  registerPartial: function (id) {
    this._partials.push(id);
  },

  renderAllPartials: function () {
    var _this = this;
    var output = {};

    each(this._partials, function (id) {
      output[id] = _this._components[id].html();
    });

    return output;
  },

  removeAllPartials: function () {
    var _this = this;

    each(this._partials, function (id) {
      _this._components[id].remove();
    });
  },

  remove: function () {
    this.removeAllPartials();
  }
}

Controller.extend = extendProto;

module.exports = Controller;