/**
 * 
 * @module
 */
var utils = {};

utils.validUUID = function(id) {
  return ((id.length > 31) && id.search(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/));
};

utils.isNumber = function(n) {
  return n === parseFloat(n);
};

utils.isEven = function(n) {
  return isNumber(n) && (n % 2 === 0);
};

utils.bind = function(context, fn) {
  fn = fn;
  context = context;
  return function () {
    var args = [].slice.call(arguments) || [];
    fn.apply(context, args);
  };
};

utils.querystring = function(obj) {
  var keys = utils.keys(obj) || [];
  var querystring = '';

  each(keys, function (key) {
    var val = obj[key];
  
    if (querystring.length > 0) querystring += '&amp;';
  
     querystring += key + '=' + val; 
  });

  return querystring;
};


utils.hasXHR2 = function() {
  return (window.FormData !== undefined && window.FileReader &&
    window.FileList && window.Blob) ? true : false;
};

/**
 * Chrome ships with their own Flash Player embedded, named 'Pepper Flash'
 * Performance with regards to Netstream methods is much lower compared to the
 * official Adobe Flash Player. If both are installed and active, Chrome still prefers
 * Pepper Flash.
 * @return {boolean} true if Pepper Flash is present and actived
 */
utils.checkForPepper = function() {
  if (navigator.mimeTypes &&
    navigator.mimeTypes['application/x-shockwave-flash'] &&
    'chrome' in window) {
    var filename = navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin.filename;

    if (filename === 'pepflashplayer.dll' ||
      filename === 'libpepflashplayer.so' ||
      filename === 'PepperFlashPlayer.plugin') {
      return true;
    }
  }
  return false;
};

utils.preventDefault = function(evt) {
  if (evt.preventDefault) {
    evt.preventDefault();
  } else if (evt.returnValue) {
    // IE8<
    evt.returnValue = false;
  }
};

/**
 * This code does not work in IE9 and lower!
 * 
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
utils.keys = function(obj) {
  var props = [];
  for(var key in obj) props.push(key);

  return props;
};

utils.each = function(arr, cb) {
  for (var i = 0; arr.length > i; i++) cb(arr[i], i, arr);
};

utils.getIndex = function(arr, val, start) {
  for (var i = (start || 0); i < arr.length; i++) {
    if (arr[i] === val) return i;
  }
  return -1;
};

utils.assign = function (target, source) {
  var keys = utils.keys(source);

  utils.each(keys, function (val, i, list) {
    target[val] = source[val];
  });

  return target;
};

utils.eq = function(attr, val) {
  return (attr === val);
};

utils.is = function(attr, val) {
  return (typeof attr === val);
};


// http://javascript.crockford.com/prototypal.html
// ES3 Object.create alternative
utils.inherits = function(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
};

utils.isObject = function (obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};

/**
 * Copied from underscore.js
 * @return {Boolean} true if obj is an array
 */
utils.isArray = function (obj) {
  return toString.call(obj) === '[object Array]';
};


module.exports = utils;