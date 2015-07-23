/**
 * Small module to set, get and remove cookies and to verify if one already
 * exists.
 * 
 * @module
 * @class  Cookie
 */
class Cookie {

  constructor(key, content) {
    this.key = key;
    this.content = content;
  }

  has() {
    return window.document.cookie.match(this.key + '=(.*?)(;|$)') ? true : false;
  }

  get() {
    var re = new RegExp(this.key + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }

  set(content) {
    this.content = content;
    window.document.cookie = this.key + '=' + this.content + ';';
  }

  remove() {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    window.document.cookie = this.key + '=; expires=' + exp.toGMTString();
  }
}

export default Cookie;