var Flipbase = require('./modules/namespace');
var pubsub = require('./modules/PubSub');
var events = require('./modules/events');
var each = require('./modules/utils').each;
var bind = require('./modules/utils').bind;
var keys = require('./modules/utils').keys;
var createEl = require('./modules/DOM').createEl;
var $ = require('./modules/DOM').getEl;
var assign = require('./modules/utils').assign;
var inherits = require('./modules/extendProto');
 /**
  * - Ieder UI component moet dus een HTML string terug geven of niets.
- We kunnen toch in iedere component definieren wanneer de render functie getriggered moet worden?
    -> Enige nadeel is dan wel dat de hele template opnieuw gerendered wordt.

- In dat geval moet de parent gerendered worden, als in het child een event gebeurd of state verandert.
  -> Kunnen we niet alleen de parent updaten via een trigger?
    -> Hoe gaan we dat doen als er een component meerdere parents heeft?

  -> Stel we renderen de parent, met de nieuwe state, dan wordt de child bijvoorbeeld niet meer gerendered.
     Dat betekend dat wel wel de instances netjes moeten verwijderen anders leaken die in memory.
     -> En dat betekend weer dat we moeten diffen om de DOM om de components netjes weg te halen -> VIRTUAL DOM!

Uitzoeken
- Kan ik niet gewoon standaard de volledig app opnieuw renderen? Zo heel veel divs heb ik niet, wellicht is het niet eens erg voor performance!
- Of ik zorg dat "rerendering" niets anders is dan dingen 'hidden' en dan weer tonen. -> cameratag method
- Ik kan zorgen dan components zichzelf kunnen updaten?
  */

/**
 * @example
 *
 * var $el = new Component('flipbase-recorder-intro', {
 *   tag: 'button',
 *   attrs: {
 *     'style': 'color: #FFF000; text-align: center;'
 *     'className': 'alternative-recorder-intro' // override className as default
 *   }
 * });
 *
 * el.on('click', function (evt) {
 *  // handle click event
 * });
 *
 * el.remove();
 *
 *
 *
 * @class
 * @constructor
 */

/**
 * @example
 * var FlashButton = Component.extend({
 *   attributes: {},
 *   events: {
 *     'elementId eventName': this.handlerFn
 *   }
 * });
 *
 * FlashButton.render() // outputs HTML
 * FlashButton.hide()   // hides element
 * FlashButton.remove() // removes HTML from DOM
 *
 *
 * @constructor
 * @class
 * @param {Object} options
 */
function Component (options) {

  assign(this, options);

}

Component.prototype = {

  $el: null,

  /**
   * Internal method that triggers `willRender`, `render` and `didRender` methods
   * synchronously.
   */
  render: function () {
    this.willMount.apply(this, arguments);
    this.mount.apply(this, arguments);
    this.didMount.apply(this, arguments);
  },

  // Methods needs to be overwritten by the instance
  // willRender: function() {},
  // render: function() {},
  // didRender: function() {},

  willMount: function () {},
  mount: function () {},
  didMount: function () {},

  willUnmount: function () {},
  unmount: function () {},
  didUnmount: function () {},

  show: function () {
    this.$el.style.display = 'block';
  },

  hide: function () {
    this.$el.style.display = 'none';
  },

  remove: function () {
    this.removeEventHandlers();
    if (this.$el.parentNode)
      return this.$el.parentNode.removeChild(this.$el);
  },

  removeEventHandlers: function () {
    var _this = this;

    if (this.events) {
      var ids = keys(this.events);

      // Register event listener
      each(ids, function (id) {
        var evt = id.split(' ')[1];
        var el = id.split(' ')[0];
        var handler = _this.events[id] || function () {};
        events.off($(el), evt, handler);
      });
    }
  },

  /**
   * Execpts only ids in the form of 'flipbaseWebcamButton click'; where 'click'
   * is the event and 'flipbaseWebcamButton' the element id.
   *
   * @param {[type]} id      [description]
   * @param {[type]} handler [description]
   */
  addEventHandlers: function () {
    var _this = this;

    if (this.events) {
      var ids = keys(this.events);

      // Register event listener
      each(ids, function (id) {
        var evt = id.split(' ')[1];
        var el = id.split(' ')[0];
        var handler = _this.events[id] || function () {};
        events.on($(el), evt, handler);
      });
    }
  },

  // _components: {},

  // registerComponent: function (name, component) {
  //   this._components[name] = new component();
  // }

};

Component.extend = inherits;

module.exports = Component;
