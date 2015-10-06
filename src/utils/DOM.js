var each = require('./utils').each;
var keys = require('./utils').keys;

/**
 * Lightweight DOM selector utilty methods
 * 
 * @category helpers
 * @module
 */
var DOM = {};

/**
 * Select element by id; only supports '#elementId' or 'elementId' as input;
 *
 * @method  getEl
 * @param  {string} id element id
 * @return {object}    selected document node
 */
DOM.getEl = function(id) {
  // indexOf stirng is supported in IE7
  if (id.indexOf('#') === 0)
    id = id.slice(1);

  return document.getElementById(id);
};

/**
 *
 * @method  elHasAttr
 * @param  {object} el
 * @param  {string} attr 
 * @return {object} attribute value or undefined
 */
DOM.elHasAttr = function(el, attr) {
  return el.getAttribute(attr) || undefined;
};

DOM.getElsByTagAndAttr = function(tag, attr, val) {
  var nodes = document.getElementsByTagName(tag);
  var elems = [];

  for (var i = 0; nodes.length > i; i++) {
    if (nodes[i].getAttribute(attr) === val) elems.push(nodes[i]);
  }
  return elems;
};

DOM.createEl = function(tag, attrs) {
  if (!tag) tag = 'div';
  if (!attrs) attrs = {};
  var el = document.createElement(tag);
  el = DOM.setElAttributes(el, attrs);
  return el;
};

DOM.setElAttributes = function(el, attrs) {
  var props = keys(attrs);
  // Iterareve over attrs object and assing attributes to element
  each(props, function (attrName) {
    var val = attrs[attrName];
    el.setAttribute(attrName, (val || ''));
  });

  return el;
};

DOM.insertAsFirstEl = function(el, parent) {
  if (parent.firstChild) {
    parent.insertBefore(el, parent.firstChild);
  } else {
    parent.appendChild(el);
  }

  return el;
};

DOM.insertBeforeEl = function(el, parent) {
  if (parent && parent.parentNode)
    parent.parentNode.insertBefore(el, parent);
  return el;
};

DOM.hasClass = function(el, className) {
  return ((' ' + el.className + ' ').indexOf(className) > -1);
};

DOM.addClass = function(el, className) {
  if (!hasClass(el, className))
    el.className = el.className === '' ? className : el.className += ' ' + className;

  return el;
};

DOM.removeClass = function(el, className) {
  if (hasClass(el, className))
    el.className.replace(' ' + className, '');

  return el;
};

DOM.getStyle = function(el, prop) {
  var getComputedStyl = (!!window.getComputedStyle) ? window.getComputedStyle : undefined;
  if (getComputedStyl) {
    return window.getComputedStyle(el, null).getPropertyValue(prop);
  } else {
    return el.currentStyle[prop];
  }
};

DOM.height = function(el) {
  var pxs = getStyle(el, 'height');
  // Remove 'px' from the string;
  return parseInt(pxs, 10);
};

DOM.width = function(el) {
  var pxs = getStyle(el, 'width');
  // Remove 'px' from the sring;
  return parseInt(pxs, 10);
};

module.exports = DOM;