var logger = require('./../../src/utils/logx');
var jsonp = require('./../../src/utils/logx-jsonp-transport');

var trans = new jsonp({ api_endpoint: 'https://logs.flipbase.com/recorder' });
logger.add(trans.transport, trans);

describe('Logger', function () {

  it('should be able to add a transport', function () {
    expect(logger.transports.length).to.equal(1);
  });

  describe('JSONP transport', function () {
  
    it('should store each log file in an object', function() {
      logger.info('Hello world!');
      expect(trans.store.logs[0]).to.be.a('object');
    });

    it('should log error message', function() {
      logger.error(new Error('Hello bad error world!'));
      var i = trans.store.logs.length;
      expect(trans.store.logs[i - 1].message).to.contain('bad error world');
    });

    it('should log error message', function() {
      logger.info('Hello bad error world!');
      logger.info('Hello bad error world!');
      logger.info('Hello bad error world!');
      logger.info('Hello bad error world!');
      logger.info('Hello bad error world!');
      logger.info('Hello bad error world!');
      logger.info('Hello bad error world!');
    });

  });

});