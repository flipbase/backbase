var each = require('./utils').each;

var logger = {

  transports: [],

  log: function (level, msg, meta) {
    each(logger.transports, function(transport) {
      transport(level, msg, meta);
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
  add: function (transport) {
    if (typeof transport !== 'function') 
      return new Error('transport should be function');
    
    return logger.transports.push(transport) -1;
  },

  remove: function (index) {
    return logger.transports.splice(index, 1);
  }

};

module.exports = logger;