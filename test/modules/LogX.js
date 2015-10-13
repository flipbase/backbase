var logger = require('./../../src/modules/LogX');
var jsonp = require('./../../src/modules/LogX-jsonp-transport');

var trans = new jsonp({ api_endpoint: 'https://logs.flipbase.com/recorder' });
logger.add(trans.transport, trans);

describe('Logger', function () {

  it('should be able to add a transport', function () {
    expect(logger.transports.length).to.equal(1);
  });

  describe('JSONP transport', function () {
    
    before(function () {
      this.JSONP_send_spy = sinon.spy(trans, 'send');
    });

    after(function() {
      this.JSONP_send_spy.restore();
    });

    it('should store each log file in an object', function() {
      logger.info('Hello world!');
      expect(trans.store.logs.length).to.be.gte(1);
      expect(trans.querystring.length).to.be.gte(1);
      expect(trans.store.logs[0]).to.be.a('object');
      expect(trans.store.logs[0].m).to.equal('Hello world!');
      expect(trans.store.logs[0].l).to.equal('info');
    });

    it('should log Error message using the "message" property', function() {
      logger.error(new Error('Hello bad error world!'));
      var i = trans.store.logs.length;
      expect(trans.store.logs[i - 1].m).to.equal('Hello bad error world!');
    });
    
    it('should send the logs to the server if the URI gets too long + reset the querystring', function () {
      for (var i = 0; i < 10; i++) {
        logger.info('Hello bad error world long sentences stuff! This is a very long sentence');
      }
      expect(trans.querystring.length).to.lt(2083-200);
      expect(this.JSONP_send_spy.callCount).to.equal(1);      
    });

    it('should send logs to the server if the message is an Error instance', function () {
      logger.error(new Error('Hello bad error world long sentences stuff!'));
      expect(this.JSONP_send_spy.callCount).to.equal(2);      
    });

  });

});