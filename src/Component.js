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
 * What is a component? Is a small (group or 1) element(s) with some added
 * functionality.
 *
 * Components can contain a whole template or just 1 element, but they always
 * have at least 1 DOM element. Components manage the interactivity related
 * to their children. Components are responsible for updating their own DOM
 * elements or removing themselves.
 *
 * Components do not have any knowledge with regards to other Components. The usual problem
 * however is that Components at some point need to hold other components.
 *
 * FlightJS for example solves this issue, by binding an Component to an existing
 * DOM elements.
 *
 * Who are components added to the DOM?
 *
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
 *   tag: 'button',
 *   id: 'button-id-1234',
 *   class: 'flipbase-button'
 *   events: {
 *     'button-id-1234 click': this.handleClick
 *   },
 *
 * });
 *
 * FlashButton.render() // outputs HTML
 * FlashButton.hide()   // hides element
 * FlashButton.remove() // removes HTML from DOM
 *
 *
 * var Container = Component.extend({
 *
 *  template: template,
 *
 *  
 *
 * });
 *
 * @constructor
 * @class
 * @param {Object} options
 */
function Component (options) {
  options = options || {};

  assign(this, options);

  if (this.id) {
    this.$el = document.getElementById(this.id);
  } else {
    this.$el = createEl((options.tag || 'div'), {
      'class': options['class'] || '',
      'id': options['id'] || ''
    });
  }

  this.initialize.apply(this, arguments);
}

Component.prototype = {

  html: function () {
    return this.$el.outerHTML;
  },

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
   * Because we support multiple recorder instances on 1 pages, we cannot
   * use a global cached stored. We need to have an instance of this store.
   * To get access to a store we require to use the 'cid'.
   */
  getStore: function (key) {
    var inst = Flipbase.Store.Recorders.get(this.cid);
    if (key) return inst.stores[key];

    return inst.stores;
  },

  /**
   * Since stores are instances, we can filter in the store based on 'cid'.
   * In views we can trigger actions with 'cid' as well. Therefore we can use
   * globally available actions. However, for the sake of consistency, we
   * access the action instances as well using the 'cid'.
   *
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  getActions: function (key) {
    var inst = Flipbase.Store.Recorders.get(this.cid);
    if (key) return inst.actions[key];

    return inst.actions;
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
  }

};

Component.extend = inherits;

module.exports = Component;
