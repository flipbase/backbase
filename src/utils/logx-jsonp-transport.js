var keys = require('./utils').keys;
var each = require('./utils').each;
// 2083 is the max URI length for IE; to be on the safe side we already
// send URI's that are about 1900 characters long.
var maxQueryStringLength = (2083 - 200);

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
   * @param  {string|object}  msg     ususally a string, only object if new Error is used
   * @param  {object}         meta
   * @return {[type]}       [description]
   */
  transport: function (level, msg, meta) {
    var message = (msg instanceof Error && msg.message)? msg.message : msg;

    var log = {
      // Store time since the library has been loaded or initialized?
      timestamp: (new Date().getTime() - this.startTime), 
      level: level,
      message: message, 
    };

    // Only include the 'stack' property if there is stacktrace included
    if (msg instanceof Error && msg.stack) log.stack = msg.stack;

    // Only include 'meta' prop if proviced
    if (meta) log.meta = meta;

    this.appendMessageToQuerystring(log);
    this.store.logs.push(log);
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

    // Use shorter querystring parameters so we can minimize the number of queries
    var map = {
      'timestamp': 't',
      'level': 'l',
      'message': 'm',
      'stack': 's',
      'meta': 'meta'
    };

    // Iterate over the property keys to append each prop to the querstring
    each(props, function (key) {
      self.querystring += 'l[' + self.index + '][' + map[key] + ']=' + log[key] + '&';
    });

    this.index++;

    this.checkQueryString();
  },


  checkQueryString: function () {
    if (this.querystring.length >= this.maxQueryStringLength) {
      // this.send();
      this.querystring = '?';
    }
  }

};

module.exports = Transport;