var each = require('./utils').each;
var keys = require('./utils').keys;

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
   * Verify if an element already has a certain class added to the class list
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
  addClass: function(el, className) {
    if (!hasClass(el, className))
      el.className = el.className === '' ? className : el.className += ' ' + className;

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
    if (hasClass(el, className))
      el.className.replace(' ' + className, '');

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
  }

};

module.exports = DOM;