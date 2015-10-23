var each = require('./utils').each;
var keys = require('./utils').keys;
var is = require('./utils').is;

/**
 * Lightweight DOM selector utilty methods
 * 
 * @category helpers
 * @module
 */
var $ = DOM = {

  /**
   * Select element by id; only supports '#elementId' or 'elementId' as input;
   *
   * @method  getEl
   * @param  {string} id element id
   * @return {object}    selected document node
   */
  getEl: function(id) {
    // indexOf string is supported in IE7
    if (id.indexOf('#') === 0) 
      id = id.slice(1);

    return document.getElementById(id);
  },

  /**
   * Verify if an DOM element has a certain attribute
   * 
   * @method  elHasAttr
   * @param  {object}   el
   * @param  {string}   attr  name of attribute
   * @return {boolean}
   */
  elHasAttr: function(el, attr) {
    return el.getAttribute(attr) || undefined;
  },

  /**
   * Select elements by tag and attribute. Necessary when querying based on
   * 'input' element with 'type=flipbase'.
   * 
   * @param  {string} tag  element tag
   * @param  {string} attr element attribute to search for
   * @param  {string} val  
   * @return {array}       list with elements that match
   */
  getElsByTagAndAttr: function(tag, attr, val) {
    var nodes = document.getElementsByTagName(tag);
    var elems = [];

    for (var i = 0; nodes.length > i; i++) {
      if (nodes[i].getAttribute(attr) === val) elems.push(nodes[i]);
    }
    return elems;
  },

  /**
   * Create element with a tag name and attributes
   *
   * @example
   * $.createEl('button', {
   *   style: 'color: #FF0000'
   * });
   * 
   * @param  {[type]} tag   [description]
   * @param  {object} attrs [description]
   * @return {object}       Element to insert
   */
  createEl: function(tag, attrs) {
    if (!tag) tag = 'div';
    if (!attrs) attrs = {};
    var el = document.createElement(tag);
    el = $.setElAttributes(el, attrs);
    return el;
  },

  /**
   * Assign attributes to a DOM element
   * 
   * @param {object}  el    DOM element
   * @param {object}        attrs 
   * @return {ojbect}       DOM el with attributes
   */
  setElAttributes: function(el, attrs) {
    var props = keys(attrs);
    // Iterate over attrs object and assing attributes to element
    each(props, function (attrName) {
      var val = attrs[attrName];
      el.setAttribute(attrName, (val || ''));
    });

    return el;
  },

  /**
   * Insert element as first child of the parent element, before all other 
   * current child elements.
   * 
   * @param  {object} el     
   * @param  {object} parent 
   * @return {object}        DOM element
   */
  insertAsFirstEl: function(el, parent) {
    if (parent.firstChild)
      parent.insertBefore(el, parent.firstChild);
    else
      parent.appendChild(el);

    return el;
  },

  /**
   * Insert an element before another element
   * 
   * @param  {object} el     element to insert
   * @param  {object} other  element to place 'el' just before
   * @return {object}        element that has been inserted
   */
  insertBeforeEl: function(el, other) {
    if (other && other.parentNode)
      other.parentNode.insertBefore(el, other);
    return el;
  },

  /**
   * CSS related utilities
   */

  /**
   * Verify if an element already has a certain class added to the class list
   * String.prototype.idnexOf is supported from IE7+.
   * 
   * @param  {object}  el        DOM element
   * @param  {string}  className CSS class to check
   * @return {Boolean}           
   */
  hasClass: function(el, className) {
    return ((' ' + el.className + ' ').indexOf(className) > -1);
  },

  /**
   * Add a CSS class to an DOM element
   * 
   * @param {object} el        DOM element
   * @param {string} className CSS class to add
   */
  addClass: function(el, CSSclass) {
    if (!$.hasClass(el, CSSclass)) {
      if (!el.className || !el.className.length)
        el.className = CSSclass;
      else
        el.className += ' ' + CSSclass;
    }

    return el;
  },

  /**
   * Remove a CSS class from an element
   * 
   * @param  {object} el        DOM element to remove the CSS class from
   * @param  {string} className CSS class to remove
   * @return {object}           DOM element
   */
  removeClass: function(el, className) {
    if ($.hasClass(el, className))
      el.className = el.className.replace(className, '')

    return el;
  },

  /**
   * Get the CSS property from a DOM element.
   * 
   * @param  {object} el   DOM element to serach for the CSS property
   * @param  {object} prop CSS property to retrieve the value from
   * @return {object}      
   */
  getStyle: function(el, prop) {
    var getComputedStyl = (!!window.getComputedStyle) ? window.getComputedStyle : undefined;
    if (getComputedStyl) {
      return window.getComputedStyle(el, null).getPropertyValue(prop);
    } else {
      return el.currentStyle[prop];
    }
  },

  /**
   * Get the applied CSS style (using stylesheets) from a DOM element. So, this
   * is not returning any 'height' attributes that are set inline to the DOM
   * element.
   * 
   * @param  {object} el 
   * @return {number} height in pixels
   */
  height: function(el) {
    var pxs = $.getStyle(el, 'height');
    // Remove 'px' from the string;
    return parseInt(pxs, 10);
  },

  /**
   * Get the applied CSS style (using stylesheets) from a DOM element. So, this
   * is not returning any 'width' attributes that are set inline to the DOM
   * element.
   * 
   * @param  {object} el 
   * @return {number} width in pixels
   */
  width: function(el) {
    var pxs = $.getStyle(el, 'width');
    // Remove 'px' from the sring;
    return parseInt(pxs, 10);
  },

  /**
   * Test if CSS feature is supported. If CSS class is already added by Modernizr 
   * for example to the rootElement, then skipp all tests. If it's not added to 
   * the rootElement yet, then test if the browser the provided CSS feature.
   * 
   * @param  {string}   prop          CSS property name
   * @param  {string}   val           CSS property value
   * @param  {string}   className     className to add to the root element
   * @param  {boolean}  skipValueTest true if we don't need to test the value of 
   *                                  the provided property
   */
  modernize: function(prop, val, className, skipValueTest) {
    // Grab the root element of the document
    var rootEl = document.documentElement;
    className = className.toString() || '';
    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

    if (!$.hasClass(rootEl, className) && $.hasCSSProperty(prop, val, skipValueTest)) {
      $.addClass(rootEl, className);
    }
  },

  /**
   * In testing support for a given CSS property, it's legit to test:
   *   `elem.style[styleName] !== undefined`
   * If the property is supported it will return an empty string,
   * if unsupported it will return undefined.
   *
   * @param  {string}  prop          feature we need to detect
   * @param  {Object}  value         optional value we can use in feature detection test
   * @param  {boolean} skipValueTest arg to skip value test
   * @return {boolean}               undefined if false, true if supported
   */
  hasCSSProperty: function(prop, value, skipValueTest) {
    // Create element to test CSS features on
    var testElem = document.createElement('flipbase');
    var before = testElem.style[prop];

    // Try native detect first
    if (prop && value) {
      if ('CSS' in window && 'supports' in window.CSS) {
        return !!(window.CSS.supports(prop, value));
      }
    }

    if (testElem.style[prop] !== undefined) {

      // If value to test has been passed in, do a set-and-check test.
      // 0 (integer) is a valid property value, so check that `value` isn't
      // undefined, rather than just checking it's truthy.
      if (!skipValueTest && !is(value, 'undefined')) {

        // Needs a try catch block because of old IE. This is slow, but will
        // be avoided in most cases because `skipValueTest` will be used.
        try {
          testElem.style[prop] = value;
        } catch (e) {}

        // If the property value has changed, we assume the value used is
        // supported. If `value` is empty string, it'll fail here (because
        // it hasn't changed), which matches how browsers have implemented
        // CSS.supports()
        if (testElem.style[prop] != before) {
          // Clean the elements style
          delete testElem.style
          return true;
        }
      }
    }
  }

};

module.exports = DOM;