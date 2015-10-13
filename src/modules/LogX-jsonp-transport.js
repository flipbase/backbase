var keys = require('./utils').keys;
var each = require('./utils').each;
// 2083 is the max URI length for IE; to be on the safe side we already
// send URI's that are about 1900 characters long.
var maxQueryStringLength = (2083 - 200);
var jsonp = require('browser-jsonp');

/**
 * The JSONP transport is responsible for storing and sending logs to a server-side API endpoint. It's mainly for the recorder usage, since that's were debugging is most probably necessary.
 *
 * In the future we probably will go on the path of customizable recorders, to be able to debug these customized apps, we need to store 
 *
 * - Which component is initialized and/or rendered, and in which order
 * - Potential Error stacktraces
 * - Relevant browser/client information (user_agent, flash version etc)
 *
 * The transport will send the log files automatically to the server if:
 * 
 * 1. The querystring will get near the length of 2083 characters, this is the URI limit in IE.
 * 2. If the log level is set to 'error'
 * 3. If the message is an instanceof Error
 */

function Transport(config) {
  this.startTime = new Date().getTime();
  this.index = 0;

  if (!config.api_endpoint) 
    throw new Error('You should provide \'api_endpoint\' property');

  this.api_endpoint = config.api_endpoint;
  // Correct the max URI lenght to not include the API endpoint
  this.maxQueryStringLength = maxQueryStringLength - this.api_endpoint.length;
}

Transport.prototype = {
  
  store: {
    logs: []
  },

  querystring: '?',

  /**
   * 
   * @param  {string}         level   can be set to info/error/warn/debug
   * @param  {string|object}  msg     a string, if new Error it's an object
   */
  transport: function (level, msg) {
    var self = this;
    var message = (msg instanceof Error && msg.message)? msg.message : msg;

    // We use very short key names so the URI doesn't get too long too fast
    var log = {
      // Store time since the library has been loaded or initialized?
      t: (new Date().getTime() - this.startTime), // timestamp
      l: level, // level
      m: message // message
    };

    // Only include the 'stack' property if there is stacktrace included
    if (msg instanceof Error && msg.stack) log.stack = msg.stack;

    this.appendMessageToQuerystring(log);
    this.store.logs.push(log);

    // Send logs to server when an error occurred
    if (msg instanceof Error) this.send();

    // window.onerror = function (err) {
      // self.send(err);
    // };
  },


  /**
   * Add each log message to the querystring, so we can instantly determine
   * if we should send the logs to the server and reset the logs.
   * 
   * @param  {object}  log
   */
  appendMessageToQuerystring: function (log) {
    var props = keys(log);
    var self = this;

    // Iterate over the property keys to append each prop to the querstring
    each(props, function (key) {
      self.querystring += 'l[' + self.index + '][' + key + ']=' + log[key] + '&';
    });

    this.index++;

    // Check lenght of querystring
    if (this.querystring.length >= this.maxQueryStringLength) {
      this.send();
      
      // reset querystring and logs storage
      this.querystring = '?';
      this.store.logs = [];
    }

  },

  send: function (success, error) {
    jsonp({
      url: this.api_endpoint,
      data: this.store,
      success: (success || function () {}),
      error: (error || function () {})
    });
  }

};

module.exports = Transport;