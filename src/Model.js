var jsonp = require('browser-jsonp');

var pubsub = require('./modules/PubSub');
var each = require('./modules/utils').each;
var keys = require('./modules/utils').keys;
var is = require('./modules/utils').is;
var getIndex = require('./modules/utils').getIndex;
var extendProto = require('./modules/extendProto');
var assign = require('./modules/utils').assign;
var isArray = require('./modules/utils').isArray;
var isObject = require('./modules/utils').isObject;

/**
 * The Model class is inspired on the Backbone.Model class, with setters, 
 * getters, pubsub and a very basic AJAX layer (JSONP).
 *
 * @example
 * var model = new Model({
 *   recorderId: 'abc',
 *   duration: 30,
 *   H264Recording: true
 * });
 *
 * model.set('net_connection', 'success');
 * model.get('duration') // 30
 * 
 * @author  Ron Jansen [ron@flipbase.com]
 * @copyright Flipbase 2015
 * @class Model
 * @classdesc This is a class description
 */

function Model (options) {

  // Assign default properties to the attributes object
  assign(this.attributes, this.defaults);
 
  // Add the mixins to the current object
  this._previousAttributes = {};
  this._changedAttributes;

  this.initialize.call(this, options);
}

Model.prototype = {

  urlRoot: '',

  // Every instance will get an '_id' property
  attributes: {
    _id: null
  },

  _previousAttributes: {},

  initialize: function(options) {},

  /** 
   * @return {Boolean} true if _id is null
   */
  isNew: function () {
    return (this.attributes._id === null);
  },

  _dirty: false,

  isDirty: function () {
    return !!this._dirty;
  },

  fetch: function (options) {
    options = options || {};
    options.method = 'GET';
    this.send(options);
  },

  save: function (options) {
    options = options || {};
    options.method = 'POST';
    this.send(options, true);
  },

  send: function (options, parse) {
    if (parse === null) parse = true;
    var model = this;
    // Save provided success handler so we can override it with our own
    var success = options.success || function (){};
    
    options.success = function (res, req) {
      // Use custom parse method if attributes needs to be parsed
      // Parse the model before using the success handler, so the model
      // is not dirty anymore when the callback is triggered
      if (parse) model.parse(model, res);
      
      // Reset model isDirty() return value
      model._dirty = false;

      success(res, req); 
    };
    
    options.data = this.attributes;

    // append url with _id if one exists
    options.url = this.urlRoot + (!this.isNew) ? '/' + this.get('_id') : '/';
    jsonp(options);
  },


  parse: function (model, response) {
    each(keys(response), function(key) {
      if (model.attributes.hasOwnProperty(key)) 
        model.set(key, response[key]);
    });
  },

  /**
   * @param  {string} attr
   * @return {object}
   */
  get: function (attr, val, options) {
    return (this.attributes[attr] || undefined);
  },

  /**
   * Get previous value from a certain attribute.
   * 
   * @param  {string} attr key to fetch attribute
   * @returns {object}     attribute value
   */
  previous: function (attr) {
    if (!this._previousAttributes || !this._previousAttributes[attr]) return null;
    
    return this._previousAttributes[attr];
  },

  /**
   * @param {String|Object} attr key or object
   * @param {Object}        val  value to set the attr to
   */
  set: function (attr, val, options) {
    var error;
    options = options || {};

    // Copy all the attributes before applying the change
    assign(this._previousAttributes, this.attributes);

    // Validate before change the setting
    // if (!options.silent && typeof attr === 'string') 
      // error = this.validateAttr(attr, val) || null;

    // If no validation error is returned apply the change
    if (!error) {
      if (isObject(this.attributes[attr])) {
        assign(this.attributes[attr], val);
      } else if (isArray(this.attributes[attr])) {
        this.attributes[attr].push(val);
      } else {
        this.attributes[attr] = val;
      }
    }

    // Set model to dirty if property has been changed
    if (this.hasChanged(attr)) {
      this._dirty = true;
    }

    // Broadcast events about the changed attribute
    if (typeof attr === 'string') {
      this.publish('change:' + attr, this, val);
    }

    // Broadcast global event 
    this.publish('change', this);
  },

  hasChanged: function (attr, val) {
    return (this._previousAttributes[attr] !== this.attributes[attr]);
  },

  // Create local pubsub store
  _topics: {},

  publish: function (evnt, model, val) {
    pubsub.publish(evnt, this._topics, model, val);
  },

  subscribe: function(evnt, fn, context) {
    var self = this;
    var evnts = evnt.split(', ') || [evnt];

    each(evnts, function (evt) {
      pubsub.subscribe(evt, fn, context, self._topics);
    });
  },

  unsubscribe: function () {},

};

Model.extend = extendProto;

module.exports = Model;