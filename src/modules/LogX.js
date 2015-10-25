var each = require('./utils').each;

/**
 * Lightweight client-side mini logging library, which can add multiple transports
 * (like the console or a jsonp logger)
 *
 * @module
 * @author Ron Jansen <ron@flipbase.com>
 */
var logger = {

  transports: [],

  /**
   *
   * @method log
   * @param  {string} level log level, e.g. 'info', 'debug' or something else
   * @param  {string} msg   message to log
   * @param  {object} meta  any additional (JSON) meta object to send to transport
   */
  log: function (level, msg, meta) {
    each(logger.transports, function (transport) {
      transport.fn.apply(transport.ctx, [level, msg, meta]);
    });
  },

  /**
   * Shorthand for to log error messages.
   *
   * @method error
   * @param  {string} msg  message to log
   * @param  {object} meta any additional JSON metadata
   */
  error: function (msg, meta) {
    logger.log('error', msg, meta);
  },

  /**
   * Shorthand for to log warn messages.
   *
   * @method warn
   * @param  {string} msg  message to log
   * @param  {object} meta any additional JSON metadata
   */
  warn: function (msg, meta) {
    logger.log('warn', msg, meta);
  },

  /**
   * Shorthand for to log debug messages.
   *
   * @method debug
   * @param  {string} msg  message to log
   * @param  {object} meta any additional JSON metadata
   */
  debug: function (msg, meta) {
    logger.log('debug', msg, meta);
  },

  /**
   * Shorthand for to log info messages.
   *
   * @method info
   * @param  {string} msg  message to log
   * @param  {object} meta any additional JSON metadata
   */
  info: function (msg, meta) {
    logger.log('info', msg, meta);
  },

  /**
   * Add transport to list, returns index in array so it can be removed.
   *
   * @method
   * @param {function} transport  logger transport function to add
   * @param {object}   ctx        reference to 'this'
   * @return {number}  index of transport in transports array
   */
  add: function (transport, ctx) {
    if (typeof transport !== 'function')
      return new Error('transport should be function');

    return logger.transports.push({fn: transport, ctx: (ctx || this) }) -1;
  },

  /**
   * Remove transport from logger
   *
   * @method remove
   * @param  {number} index [description]
   * @return {array}  array with the removed transport
   */
  remove: function (index) {
    return logger.transports.splice(index, 1);
  }

};

module.exports = logger;
