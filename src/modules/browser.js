/**
 * Constats with browser related info
 * 
 * @module 
 */

var USER_AGENT = window.navigator.userAgent;

var browser = {
  IS_IPHONE: (/iPhone/i).test(USER_AGENT),
  IS_IPAD: (/iPad/i).test(USER_AGENT),
  IS_IPOD: (/iPod/i).test(USER_AGENT),
  IS_IOS: browser.IS_IPHONE || browser.IS_IPAD || browser.IS_IPOD,
  IS_ANDROID: (/Android/i).test(USER_AGENT)
};

module.exports = browser;