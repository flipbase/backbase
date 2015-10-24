/**
 * Small module to set, get and remove cookies and to verify if one already
 * exists.
 * 
 * @module
 * @author  Ron Jansen <ron@flipbase.com>
 */

var cookie = {

  /**
   * Search cookie based on name
   * @param  {string}  key name of cookie to search for
   * @return {Boolean}     
   */
  has: function(key) {
    return window.document.cookie.match(key + '=(.*?)(;|$)') ? true : false;
  },

  /**
   * Fetch the value of the cookie based on a name
   * @param  {string} key 
   * @return {string|null} returns cookie content if cookie exists
   */
  get: function(key) {
    var re = new RegExp(key + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value !== null) ? unescape(value[1]) : null;
  },

  /**
   * Create a new cookie
   * @param {string} key 
   * @param {string} content 
   */
  create: function(key, content) {
    window.document.cookie = key + '=' + content + ';';
  },

  /**
   * Remove cookie if it exists based on the name/key
   * @param  {string} key 
   */
  remove: function(key) {
    if (!this.has(key)) return;
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    window.document.cookie = key + '=; expires=' + exp.toGMTString();
  }

};

module.exports = cookie;