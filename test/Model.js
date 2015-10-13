var Model = require('../src/Model');

var RecordingsModel = Model.extend({
  defaults: {
    user_agent: window.navigator.userAgent.toLowerCase()
  },
  initialize: function (options) {}
});
var _model = new RecordingsModel({ _id: '123' });

// Setup event listener
var spy = sinon.spy();
_model.subscribe('change:foo', spy, this);

describe('Model', function () {

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
    expect(spy.callCount).to.equal(2);
  });

});