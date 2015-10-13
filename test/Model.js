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
var spy2 = sinon.spy();
_model.subscribe('change:foo', spy, this);
_model.subscribe('change:baz', spy2, this);

// blueprint for a nested attribute
var nested = {
  nested: {
    foo: 'bar'
  }
};

describe('Model', function () {

  describe('attributes', function () {
    it('should assign defaults to the attributes object', function () {
      expect(_model.attributes.user_agent).to.be.ok;
      expect(_model.attributes.user_agent).to.equal(window.navigator.userAgent.toLowerCase());
    });

    it('should set attribute using "set" method', function () {
      _model.set('foo', 'bar');
      expect(_model.attributes.foo).to.equal('bar');
    });

    it('should retrieve an attribute using the get method', function () {
      var val = _model.get('foo');
      expect(val).to.equal('bar');
    });

    it('should verify if a property hasChanged since the last event trigger', function () {
      expect(_model.hasChanged('foo')).to.be.true;
    });

    it('should return isDirty=true when model is altered, but not saved', function () {
      expect(_model.isDirty()).to.be.true;
    });

  });

  describe('events', function () {
    it('should publish "change:foo" event when foo property has changed', function () {
      expect(spy.callCount).to.equal(1);
    });

    it('should provide the model instance as first argument when publishing an event', function () {
      expect(spy.getCall(0).args[0]).to.equal(_model);
    });

    it('should provide the value as second argument when publishing an event', function () {
      expect(spy.getCall(0).args[1]).to.equal('bar');
    });

    it('should be able to set nested objects as values', function () {
      _model.set('baz', nested);
      expect(_model.get('baz')).to.equal(nested);
      expect(spy2.callCount).to.equal(1);
    });

    it('should provide the nested object as a argument to subscribed methods', function () {
      expect(spy2.getCall(0).args[1]).to.equal(nested);
    });
  });

  describe('save', function () {
    it('should return isNew when not yet saved', function () {
      expect(_model.isNew()).to.be.true;
    });

    it('should return isDirty when not saved or altered after save', function () {
      expect(_model.isDirty()).to.be.true;
    });

    it('should assign response to attributes object', function () {
      var response = {
        _id: '1423j4jfsdal;jfl;ajflsdafsa',
        baz: {
          nested: {
            foo: 'baz'
          }
        }
      };
      _model.parse(_model, response);
      expect(_model.get('baz').nested.foo).to.equal('baz');
    });

    it.skip('should return not dirty after model has been succesfully saved', function () {
      var spy = sinon.spy();
      _model.save();
      // _model.save({success: spy});
      expect(_model.isDirty()).to.be.false;
      expect(spy.callCount).to.equal(1);
    });

    it('should return model is not new when model has been succesfully saved', function () {
      expect(_model.isNew()).to.be.false;
    });


  });


});