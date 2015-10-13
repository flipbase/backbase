var each = require('./utils').each;
var is = require('./utils').is;

/**
 * 
 * @module
 * @author  Ron Jansen
 * 
 */

var pubsub = {

  _topics: {},

  /**
   * Subscribe a method to a certain topic (or 'event').
   * 
   * @param  {String}   topic     name of the event to listen to
   * @param  {Function} listener  method to trigger when event is fired
   * @param  {Context}  context   reference to 'this' scope
   * @param  {Object}   store     optional object to store events locally
   * @return {Number}   index     index number of event listener in topics array
   */
  subscribe: function(topic, listener, context, store) {
    'use strict';

    store = store || this._topics;

    // Create topic entry if non exists
    if (!store.hasOwnProperty(topic)) store[topic] = [];

    // To support multiple events per topic we store all the events in an array
    var index = store[topic].push({listener: listener, context: context}) -1;

    // Return the index so it can be removed from the array
    return index;
  },

  /**
   * Publish an event. 
   * 
   * @param  {String} topic   event to trigger
   * @param  {Object} store   optional object store to trigger the event on
   */
  publish: function (topic, store) {
    'use strict';

    store = store || this._topics;
    var evnts = store[topic] || [];
    // Store additional arguments so they can be provided to the listener method
    var args = Array.prototype.slice.call(arguments, 2);
    // Trigger all the listeners of the topic
    each(evnts, function (evnt) {
      if (evnt && evnt.listener) 
        evnt.listener.apply(evnt.context, args);
    });
  },

  /**
   * Remove a listener from the topic store.
   * 
   * @param  {String} topic reference to event array with listeners
   * @param  {Number} index index of listener in topics array
   * @param  {Object} store optional store with topics
   */
  unsubscribe: function (topic, index, store) {
    'use strict';

    store = store || this._topics;
    delete store[topic][index];
  }

};


module.exports = pubsub;