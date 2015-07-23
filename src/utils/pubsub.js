/**
 * 
 * @module
 */

var topics = {};

export function subscribe(topic, listener, context, store) {
  store = store || topics;
  topic = topic.split(', ');

  // Create topic entry if non exists
  if (!store.hasOwnProperty(topic)) store[topic] = [];

  // To support multiple events per topic we store all the events in an array
  var index = store[topic].push({listener: listener, context: context}) -1;

  // Return the index so it can be removed from the array
  return index;
};

export function publish(topic, store) {
  store = store || topics;
  var evnts = store[topic] || [];
  var args = Array.prototype.slice.call(arguments, 2);

  evnts.forEach(function (evnt) {
    if (evnt.listener)
      evnt.listener.apply((evnt.context || this), args);
  });
}

export function unsubscribe(topic, index, store) {
  store = store || topics;
  var events = store[topic] || [];
  delete events[index];
}