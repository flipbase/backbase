var Model = require('../src/Model');

var RecordingsModel = Model.extend({
  defaults: {
    user_agent: window.navigator.userAgent.toLowerCase()
  },
  initialize: function (options) {
    console.log(options);
  }
});
var _model = new RecordingsModel({ _id: '123' });

// Setup event listener
var listener = {
  method: function() {}
};
_model.subscribe('change:foo', listener.method, this);

console.log(_model._topics);

describe.skip('Model', function () {

  before(function () {
    this.changeListener = sinon.spy(listener, 'method');
  });

  after(function() {
    this.changeListener.restore();
  });

  it('should initialize', function () {
    expect(_model).to.be.a('object');
  });

  it('should assign defaults to the attributes object', function () {
    expect(_model.attributes.user_agent).to.be.ok;
    expect(_model.attributes.user_agent).to.equal(window.navigator.userAgent.toLowerCase());
  });

  it('should set attribute using "set" method', function () {
    _model.set('foo', 'bar');
    expect(_model.attributes.foo).to.equal('bar');
  });

  it('should set attribute using "set" method', function () {
    _model.set('foo', 'bar');
    expect(_model.attributes.foo).to.equal('bar');
    expect(this.changeListener.callCount).to.equal(2);
  });

});