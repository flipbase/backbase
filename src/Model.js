import pubsub from './utils/pubsub';
import jsonp from 'expose?jsonp!./components/browser-jsonp';
import {each, keys, getIndex, is} from './utils/utils';

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

  //FIXME: no unsubscribe yet implemented
Model.prototype.listenTo = function(evnt, fn, context) {
  evnt = evnt.split(', ') || [];
  
  each(evnt, function (evt) {
    pubsub.subscribe(evt, fn, context);
  });
};

Model.prototype.trigger = function(evnt) {
  pubsub.publish(evnt);
};

// Model.prototype.toJSON = function() {
//   return _.clone(this.attributes);
// };

  /** 
   * @return {Boolean} True if _id is null
   */
Model.prototype.isNew = function() {
  return (this.attributes._id === null);
};

  /**
   * @param  {string} attr
   * @return {object}
   */
Model.prototype.get = function(attr) {
  return (this.attributes[attr] || undefined);
};

  /**
   * @param {string|object} attr key or object
   * @param {mixed} val     value to set the attr to
   */
Model.prototype.set = function(attr, val, options) {
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
    this.trigger('change:' + attr, this, val);
  }

  // Broadcast global event 
  this.trigger('change', this);
};

  /**
   * Get previous value from a certain attribute.
   * 
   * @param  {string} attr key to fetch attribute
   * @returns {object}     attribute value
   */
Model.prototype.previous = function(attr) {
  if (!this._previousAttributes || !this._previousAttributes[attr]) return null;
  return this._previousAttributes[attr];
};

Model.prototype.fetch = function(options) {
  options = options || {};
  options.method = 'GET';
  this.request(options);
};

  /**
   * Use POST request as default, because of cross domain limitations in older
   * browsers.
   * @param  {String} method [description]
   */
Model.prototype.save = function(options) {
  options = options || {};
  options.method = 'POST';
  this.request(options);
};

  /**
   * @param  {Boolean} parse If true, then the instance needs have 
   * parse method.
   */
Model.prototype.request = function(options, parse) {
  if (!parse) parse = true;
  var model = this;
  var success = options.success || function (){};
  
  options.success = function (res, req) {
    success(res, req);
    
    // Use custom parse method if attributes needs to be parsed
    if (parse)
      model.parse(model, res);

    // model.set(attrs);
  };
  
  options.data = this.attributes;
  options.url = this.host + this.path;
  jsonp(options);
};

Model.prototype.parse = function(model, res) {
  each(keys(res), function(key) {
    if (model.attributes.hasOwnProperty(key)) 
      model.set(key, res[key]);
  });
};

export default Model;