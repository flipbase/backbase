var pubsub = require('./../../src/modules/PubSub');

var spy = sinon.spy();
var spy2 = sinon.spy();
var spy3 = sinon.spy();
var index = pubsub.subscribe('submit', spy, this);
var index2 = pubsub.subscribe('submit', spy2, this);
var index3 = pubsub.subscribe('helloworld', spy3, this);

describe('PubSub', function () {

  it('should register a new topic', function () {
    expect(pubsub._topics['submit'].length).to.equal(2);
    expect(index).to.equal(0);
    expect(index2).to.equal(1);
  });

  it('should trigger all methods subscribed to the topic', function () {
    pubsub.publish('submit', null, 1234);
    expect(spy.callCount).to.equal(1);
    expect(spy2.callCount).to.equal(1);
    expect(spy3.callCount).to.equal(0);
  });

  it('should provide all provided arguments to the subscribed methods', function () {
    pubsub.publish('helloworld', null, 1234, 5678, 'abc');
    expect(spy.withArgs(1234).calledOnce).to.be.true;
    expect(spy2.withArgs(1234).calledOnce).to.be.true;
    expect(spy3.withArgs(1234, 5678, 'abc').calledOnce).to.be.true;
  });

  it('should remove a subscribed method using the index', function () {
    pubsub.unsubscribe('helloworld', index3);
    pubsub.publish('helloworld');
    expect(spy3.callCount).to.equal(1);
  });

});