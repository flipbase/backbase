import pubsub from './utils/pubsub';
import jsonp from 'expose?jsonp!./components/browser-jsonp';

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

class Model {
  constructor(options) {

    this.attributes = this.defaults;

    this.host = 'http://app.flipbase.com';
    this.path = '/log/play';


    // Only assign whitelisted properties to the attributes
    var whitelistedKeys = Object.keys(this.defaults);
    var optionsKeys = Object.keys(options);
    var _this = this;

    optionsKeys.forEach(function(key) {
      // if property in options is whitelisted assign it to attributes
      if (whitelistedKeys.indexOf(key) > -1)
        _this.attributes[key] = options[key];
    });
   
    // Add the mixins to the current object

    this._previousAttributes = {};
    this._changedAttributes;
  }

  //FIXME: no unsubscribe yet implemented
  listenTo(evnt, fn, context) {
    evnt = evnt.split(', ') || [];
    evnt.forEach(function (evt) {
      pubsub.subscribe(evt, fn, context);
    });
  }

  trigger(evnt) {
    pubsub.publish(evnt);
  }

  toJSON() {
    return _.clone(this.attributes);
  }

  /** 
   * @return {Boolean} True if _id is null
   */
  isNew() {
    return (this.attributes._id === null);
  }

  /**
   * @param  {string} attr
   * @return {object}
   */
  get(attr) {
    return (this.attributes[attr] || undefined);
  }

  /**
   * @param {string|object} attr key or object
   * @param {mixed} val     value to set the attr to
   */
  set(attr, val, options) {
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
        assign(this.attributes[attr], val);
      } else if (this.attributes[attr] instanceof Array) {
        this.attributes[attr].push(val);
      } else {
        this.attributes[attr] = val;
      }
    }

    // Broadcast events about the changed attribute
    if (typeof attr === 'string') {
      // console.log(attr);
      this.trigger('change:' + attr, this, val);
    }

    // Broadcast global event 
    this.trigger('change', this);
  }

  is(attr, val) {
    return (this.get(attr) === val);
  }

  /**
   * Get previous value from a certain attribute.
   * 
   * @param  {string} attr key to fetch attribute
   * @returns {object}     attribute value
   */
  previous(attr) {
    if (!this._previousAttributes || !this._previousAttributes[attr]) return null;
    return this._previousAttributes[attr];
  }

  fetch(options) {
    options = options || {};
    options.method = 'GET';
    this.request(options);
  }

  /**
   * Use POST request as default, because of cross domain limitations in older
   * browsers.
   * @param  {String} method [description]
   */
  save(options) {
    options = options || {};
    options.method = 'POST';
    this.request(options);
  }

  // FIMXE: move to utility
  is(attr, value) {
    return (this.get(attr) === value);
  }

  /**
   * @param  {Boolean} parse If true, then the instance needs have 
   * parse method.
   */
  request(options, parse=true) {
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
  }

  parse(model, res) {
    Object.keys(res).forEach(function(key) {
      if (model.attributes.hasOwnProperty(key)) {
        model.set(key, res[key]);
      }
    });
  }

}

export default Model;