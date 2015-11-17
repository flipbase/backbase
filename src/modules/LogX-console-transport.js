/**
 * @module
 * @author  Ron Jansen <ron@flipbase.com>
 *
 */

/**
 * Transport to log message to the console, with CSS styling if supported
 *
 * @method consoleTransport
 * @param  {string} level log level to use
 * @param  {string} msg   message to log to the console
 * @param  {object} meta  meta data object (JSON) to add to the message
 */
function ConsoleTransport (options) {
  this.options = options || {};
}

ConsoleTransport.prototype = {

  transport: function (level, msg, meta) {
    if (this.options.level.indexOf(level) === -1)
      return;

    if (meta && JSON)
      msg += ', meta: ' + JSON.stringify(meta);

    if (level === 'info' && console.info)
      return console.info(msg);

    if (level === 'warn' && console.warn)
      return console.warn(msg);

    if (level === 'debug' && console.debug)
      return console.debug(msg);

    if (level === 'error' && console.error)
      return console.error(msg);
  }

};

// If console.log is not available, create a fake logger method, so that
// inline references to the console don't lead to errors
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () {};
if (!window.console.warn) window.console.warn = function () {};
if (!window.console.error) window.console.error = function () {};
if (!window.console.error) window.console.debug = function () {};

module.exports = ConsoleTransport;
