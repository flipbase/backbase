/**
 * Constats with browser related info
 * 
 * @module
 */

const USER_AGENT = window.navigator.userAgent;

export const IS_IPHONE = (/iPhone/i).test(USER_AGENT);
export const IS_IPAD = (/iPad/i).test(USER_AGENT);
export const IS_IPOD = (/iPod/i).test(USER_AGENT);
export const IS_IOS = IS_IPHONE || IS_IPAD || IS_IPOD;
export const IS_ANDROID = (/Android/i).test(USER_AGENT);