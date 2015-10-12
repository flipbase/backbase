var Model = require('../src/Model');

var RecordingsModel = Model.extend({
  defaults: {
    user_agent: window.navigator.userAgent.toLowerCase()
  }
});
var _model = new RecordingsModel();

describe('Model', function () {

  it('should initialize', function () {
    expect(_model).to.be.a('object');
  });

  it('should set attribute using "set" method', function () {
    _model.set('foo', 'bar');
    expect(_model.attributes.foo).to.equal('bar');
  });

});