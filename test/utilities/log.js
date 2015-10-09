var logger = require('./../../src/utils/logx');
var jsonp = require('./../../src/utils/logx-jsonp-transport');

describe('Logger', function () {

  it('should be able to add a transport', function () {
    logger.add(jsonp.transport);
    expect(logger.transports.length).to.equal(1);
  });

  describe('JSONP transport', function () {
  
    it('should store each log file in an object', function() {
      logger.info('Hello world!');
      expect(jsonp.store.logs[0]).to.be.a('object');
    });

    it('should store each log file in an object', function() {
      logger.error(new Error('Hello bad error world!'));
      var i = jsonp.store.logs.length;
      expect(jsonp.store.logs[i - 1].message).to.contain('bad error world');
    });

  });

});