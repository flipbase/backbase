var e = require('./../../src/modules/events');
var $ = require('./../../src/modules/DOM');
var jQuery = require('jQuery');

// PhantomJS does not the jQuery click trigger; therefore we
// need to create a workaround to fake a mouseclick event the utility method below:
function click(el){
  var ev = document.createEvent("MouseEvent");
  ev.initMouseEvent(
    "click",
    true /* bubble */, true /* cancelable */,
    window, null,
    0, 0, 0, 0, /* coordinates */
    false, false, false, false, /* modifier keys */
    0 /*left*/, null
  );
  el.dispatchEvent(ev);
}

describe('Events', function () {
  beforeEach(function () {
    this.el = $.getEl('testParent');
    this.spy = sinon.spy();
    e.on(this.el, 'click', this.spy);
  });

  it('should add an event listener to DOM element and execute it when triggered', function () {
    jQuery('#testParent').trigger('click');
    click(this.el);
    expect(this.spy.callCount).to.be.gt(0);
  });

  it('should remove an event listener from a DOM element', function () {
    e.off(this.el, 'click', this.spy);
    jQuery('#testParent').trigger('click');
    click(this.el);
    expect(this.spy.callCount).to.equal(0);
  });
});