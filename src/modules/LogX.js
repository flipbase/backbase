var each = require('./utils').each;

/**
 * @module
 * @description Client-side mini logging library 
 * @author      Ron Jansen <ron@flipbase.com>
 */

var logger = {

  transports: [],

  log: function (level, msg, meta) {
    each(logger.transports, function(transport) {
      transport.fn.apply(transport.ctx, [level, msg, meta]);
    });
  },

  error: function (msg, meta) {
    logger.log('error', msg, meta);
  },

  warn: function (msg, meta) {
    logger.log('warn', msg, meta);
  },

  debug: function (msg, meta) {
    logger.log('debug', msg, meta);
  },

  info: function (msg, meta) {
    logger.log('info', msg, meta);
  },

  /**
   * Add apender to list, returns index in array so it can be removed.
   * 
   * @param {number} transport index
   */
  add: function (transport, ctx) {
    if (typeof transport !== 'function') 
      return new Error('transport should be function');
    
    return logger.transports.push({fn: transport, ctx: (ctx || this) }) -1;
  },

  remove: function (index) {
    return logger.transports.splice(index, 1);
  }

};

module.exports = logger;