/**
 * Console transport color settings
 * 
 * @type {Object}
 */
var colors = {
  error: '#e11e1e', // red
  info: '#0090ff', // blue
  debug: '#ff6000', // dark orange
  warn: '#ff0090' // pink
};

if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () {};

export function consoleTransport(level, msg, meta) {
  var color = colors[level] || '#000000';
  var style = 'color: ' + color + ';';

  if(meta && JSON) msg += ', meta: ' + JSON.stringify(meta);

  if (hasConsoleStyling()) return console.log('%c ' + msg, style);

  console.log(msg);
}

function hasConsoleStyling(level, msg) {
  return !!('WebkitAppearance' in document.documentElement.style);
}