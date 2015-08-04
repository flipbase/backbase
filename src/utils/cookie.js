/**
 * Small module to set, get and remove cookies and to verify if one already
 * exists.
 * 
 * @module
 * @class  Cookie
 */
function Cookie(key, content) {
  this.key = key;
  this.content = content;
}

Cookie.prototype.has = function() {
  return window.document.cookie.match(this.key + '=(.*?)(;|$)') ? true : false;
};

Cookie.prototype.get = function() {
  var re = new RegExp(this.key + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value !== null) ? unescape(value[1]) : null;
};

Cookie.prototype.set = function(content) {
  this.content = content;
  window.document.cookie = this.key + '=' + this.content + ';';
};

Cookie.prototype.remove = function() {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  window.document.cookie = this.key + '=; expires=' + exp.toGMTString();
};

export default Cookie;