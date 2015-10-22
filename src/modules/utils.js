/**
 * 
 * @module
 */
var utils = _ = {
  
  isUUID: function(uuid) {
    var regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return regex.test(uuid);
  },

  isNumber: function(n) {
    return n === parseFloat(n);
  },

  isEven: function(n) {
    return _.isNumber(n) && (n % 2 === 0);
  },

  bind: function(context, fn) {
    fn = fn;
    context = context;
    return function () {
      var args = [].slice.call(arguments) || [];
      fn.apply(context, args);
    };
  },

  querystring: function(obj, prefix) {
    var str = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var k = prefix ? prefix + "[" + key + "]" : key;
        var val = obj[key];
        str.push(_.isObject(val) ?
          _.querystring(val, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(val));
      }
    }
    return str.join("&");
  },
  
  /**
   * Chrome ships with their own Flash Player embedded, named 'Pepper Flash'
   * Performance with regards to Netstream methods is much lower compared to the
   * official Adobe Flash Player. If both are installed and active, Chrome still prefers
   * Pepper Flash.
   * @return {boolean} true if Pepper Flash is present and actived
   */
  checkForPepper: function() {
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
  },

  clone: function (obj) {
    var target = {};
    var keys = _.keys(obj);
    _.each(keys, function (key) {
      target[key] = obj[key];
    });
    return target;
  },

  assign: function (target, source) {
    var keys = _.keys(source);

    _.each(keys, function (key, i, list) {
      var original = target[key];
      var next = source[key];
      if (original && next && typeof next == "object") {
        _.assign(original, next);
      } else {
        target[key] = source[key];
      }
    });
    return target;
  },


};




utils.hasXHR2 = function() {
  return (window.FormData !== undefined && window.FileReader &&
    window.FileList && window.Blob) ? true : false;
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