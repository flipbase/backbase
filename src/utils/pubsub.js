var each = require('./utils').each;

/**
 * 
 * @module
 */

var pubsub = {};
pubsub.topics = {};

pubsub.subscribe = function(topic, listener, context, store) {
  store = store || pubsub.topics;
  // topic = topic.split(', ');

  // Create topic entry if non exists
  if (!store.hasOwnProperty(topic)) store[topic] = [];

  // To support multiple events per topic we store all the events in an array
  var index = store[topic].push({listener: listener, context: context}) -1;

  // Return the index so it can be removed from the array
  return index;
};

pubsub.publish = function (topic, store) {
  store = store || pubsub.topics;
  var evnts = store[topic] || [];
  var args = Array.prototype.slice.call(arguments, 2);

  each(evnts, function (evnt) {
    if (evnt.listener)
      evnt.listener.apply(evnt.context, args);
  });
};

pubsub.unsubscribe = function (topic, index, store) {
  store = store || pubsub.topics;
  var events = store[topic] || [];
  delete events[index];
};

module.exports = pubsub;