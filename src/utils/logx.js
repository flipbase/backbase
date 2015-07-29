var transports = [];

export function log(level, msg, meta) {
  transports.forEach(function(transport) {
    transport(level, msg, meta);
  });
}

export function error(msg, meta) {
  log('error', msg, meta);
}

export function warn(msg, meta) {
  log('warn', msg, meta);
}

export function debug(msg, meta) {
  log('debug', msg, meta);
}

export function info(msg, meta) {
  log('info', msg, meta);
}

/**
 * Add apender to list, returns index in array so it can be removed.
 * 
 * @param {number} transport index
 */
export function add(transport) {
  if (typeof transport !== 'function') return new Error('transport should be function');
  return transports.push(transport) -1;
}

export function remove(index) {
  return transports.splice(index, 1);
}


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