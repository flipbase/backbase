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
function consoleTransport (level, msg, meta) {
  var color = colors[level] || '#000000';
  var style = 'color: ' + color + ';';

  if (meta && JSON)
    msg += ', meta: ' + JSON.stringify(meta);

  if (hasConsoleStyling())
    return console.log('%c ' + msg, style);

  console.log(msg);
}

// Map logging levels to colors
var colors = {
  error: '#e11e1e', // red
  info: '#0090ff', // blue
  debug: '#ff6000', // dark orange
  warn: '#ff0090' // pink
};

// If console.log is not available, create a fake logger method, so that
// inline references to the console don't lead to errors
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () {};

/**
 * Verify if message can showed in console with colors.
 *
 * @private
 * @return {Boolean}
 */
function hasConsoleStyling () {
  return !!('WebkitAppearance' in document.documentElement.style);
}

module.exports = consoleTransport;
