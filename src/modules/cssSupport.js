var hasClass = require('./DOM').hasClass;
var addClass = require('./DOM').addClassl;

/**
 * Module to test if a browser support certain feature and to add CSS class 
 * to the root element, similar like modernizr.
 *
 * @module lightweight alternative to modernizr
 * @author Ron Jansen <ron@flipbase.com>
 */

//Grab the root element of the document
var rootEl = document.documentElement;

// Create element to test CSS features on
var testElem = document.createElement('flipbase');

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
function testProp(prop, val, className, skipValueTest) {
  className = className.toString() || '';
  skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

  if (!hasClass(rootEl, className) && hasProperty(prop, val, skipValueTest)) {
    addClass(rootEl, className);
  }
}

// Clean the elements style
function cleanElem() {
  delete testElem.style;
}

/**
 * Is returns a boolean if the typeof an obj is exactly type.
 *
 * @param {object} obj A thing we want to check the type of
 * @param {string} type A string to compare the typeof against
 * @returns {boolean}
 */
function is(obj, type) {
  return typeof obj === type;
}

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
function hasProperty(prop, value, skipValueTest) {
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
        cleanElem();
        return true;
      }
    }
  }
}

module.exports = testProp;