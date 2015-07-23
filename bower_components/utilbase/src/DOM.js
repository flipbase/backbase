/**
 * Lightweight DOM selector utilty methods
 * 
 * @category helpers
 * @module
 */

/**
 * Select element by id; only supports '#elementId' or 'elementId' as input;
 *
 * @method  getEl
 * @param  {string} id element id
 * @return {object}    selected document node
 */
export function getEl(id) {
  if (id.indexOf('#') === 0)
    id = id.slice(1);

  return document.getElementById(id);
}

/**
 *
 * @method  elHasAttr
 * @param  {object} el
 * @param  {string} attr 
 * @return {object} attribute value or undefined
 */
export function elHasAttr(el, attr) {
  return el.getAttribute(attr) || undefined;
}

export function getElsByTagAndAttr(tag, attr, val) {
  var nodes = document.getElementsByTagName(tag);
  var elems = [];

  for (var i = 0; nodes.length > i; i++) {
    if (nodes[i].getAttribute(attr) === val) elems.push(nodes[i]);
  }
  return elems;
}

export function createEl(tag = 'div', attrs = {}) {
  var el = document.createElement(tag);
  el = setElAttributes(el, attrs);
  return el;
}

export function setElAttributes(el, attrs) {
  // Iterareve over attrs object and assing attributes to element
  Object.getOwnPropertyNames(attrs).forEach(function (attrName) {
    let val = attrs[attrName];
    el.setAttribute(attrName, (val || ''));
  });

  return el;
}

export function insertAsFirstEl(el, parent) {
  if (parent.firstChild) {
    parent.insertBefore(el, parent.firstChild);
  } else {
    parent.appendChild(el);
  }

  return el;
}

export function insertBeforeEl(el, parent) {
  if (parent && parent.parentNode)
    parent.parentNode.insertBefore(el, parent);
  return el;
}

export function hasClass(el, className) {
  return ((' ' + el.className + ' ').indexOf(className) > -1);
}

export function addClass(el, className) {
  if (!hasClass(el, className))
    el.className = el.className === '' ? className : el.className += ' ' + className;

  return el;
}

export function removeClass(el, className) {
  if (hasClass(el, className))
    el.className.replace(' ' + className, '');

  return el;
}

export function getStyle(el, prop) {
  if (getComputedStyle !== 'undefined') {
    return window.getComputedStyle(el, null).getPropertyValue(prop);
  } else {
    return el.currentStyle[prop];
  }
}

export function height(el) {
  var pxs = getStyle(el, 'height');
  // Remove 'px' from the string;
  return parseInt(pxs, 10);
}

export function width(el) {
  var pxs = getStyle(el, 'width');
  // Remove 'px' from the sring;
  return parseInt(pxs, 10);
}