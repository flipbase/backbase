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
  error: '#FF0000',
  info: '#AABB0011',
  debug: '#00A0FF',
  warn: '#DEA201'
};

export function consoleTransport(level, msg, meta) {
  var color = colors[level] || '#000000';
  var style = 'color: ' + color + ';';

  if(meta && JSON) msg += ', meta: ' + JSON.stringify(meta);

  if (console[level]) return console[level](msg);

  if (hasConsoleStyling()) return console.log('%c ' + msg, style);

  console.log(msg);
}

function hasConsoleStyling(level, msg) {
  return !!('WebkitAppearance' in document.documentElement.style);
}