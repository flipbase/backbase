var pubsub = require('./utils/pubsub');
var jsonp = require('browser-jsonp');
var each = require('./utils/utils').each;
var keys = require('./utils/utils').keys;
var is = require('./utils/utils').is;
var getIndex = require('./utils/utils').getIndex;
var inherits = require('./utils/extend');

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

  this.attributes = this.defaults;

  this.host = 'http://app.flipbase.com';
  this.path = '/log/play';

  // Only assign whitelisted properties to the attributes
  var whitelistedKeys = keys(this.defaults);
  var optionsKeys = keys(options);
  var _this = this;

  each(optionsKeys, function(key) {
    if (getIndex(whitelistedKeys, key) > -1)
      _this.attributes[key] = options[key];
  });
 
  // Add the mixins to the current object
  this._previousAttributes = {};
  this._changedAttributes;
}

Model.prototype = {

  // Every instance will get an '_id' property
  _id: null,

  attributes: {},
  _previousAttributes: {},

  /** 
   * @return {Boolean} true if _id is null
   */
  isNew: function () {
    return (this.attributes._id === null);
  },

  isDirty: function () {

  },

  fetch: function (options) {
    options = options || {};
    options.method = 'GET';
    this.send(options);
  },

  save: function (options) {
    options = options || {};
    options.method = 'POST';
    this.send(options);
  },

  send: function (options, parse) {
    if (parse === null) parse = true;
    var model = this;
    // Save provided success handler so we can override it with our own
    var success = options.success || function (){};
    
    options.success = function (res, req) {
      success(res, req); 
      // Use custom parse method if attributes needs to be parsed
      if (parse) model.parse(model, res);
    };
    
    options.data = this.attributes;
    options.url = this.host + this.path;
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
   * @param {string|object} attr key or object
   * @param {mixed} val     value to set the attr to
   */
  set: function (attr, val, options) {
    var error;
    options = options || {};

    // Copy all the attributes before applying the change
    this._previousAttributes = this.attributes;

    // Validate before change the setting
    if (!options.silent && typeof attr === 'string') 
      // error = this.validateAttr(attr, val) || null;

    // If no validation error is returned apply the change
    if (!error) {
      if (typeof this.attributes[attr] === 'object' && this.attributes[attr] !== null) {
        // assign(this.attributes[attr], val);
      } else if (this.attributes[attr] instanceof Array) {
        this.attributes[attr].push(val);
      } else {
        this.attributes[attr] = val;
      }
    }

    // Broadcast events about the changed attribute
    if (typeof attr === 'string') {
      this.publish('change:' + attr, this, val);
    }

    // Broadcast global event 
    this.publish('change', this);
  },

  publish: function (evnt) {
    pubsub.publish(evnt);
  },

  subscribe: function(evnt, fn, context) {
    var evnts = evnt.split(', ') || [];
    
    each(evnts, function (evt) {
      pubsub.subscribe(evt, fn, context);
    });
  },

  unsubscribe: function () {},

};

Model.extend = inherits;

module.exports = Model;