var _ = require('./../../src/modules/utils');
var uuid = 'be6a6f64-7126-44e2-b52c-efd0e029a5b1';

describe('Utilities', function () {

  describe('isUUID', function () {
    it('should be false no input is provided', function () {
      expect(_.isUUID(null)).to.be.false;
    });

    it('should be false when invalid characters are present', function () {
      expect(_.isUUID('be6a6f64-7126-44e2-b52c-efd0e029a5b.')).to.be.false;
    });

    it('should be false when not enough characters are presented', function () {
      expect(_.isUUID('be6a6f64-7126-44e2-efd0e029a5b1')).to.be.false;
    });

    it('should be true when input contains dashes and alphanumeric characters', function () {
      expect(_.isUUID(uuid)).to.be.true;
    });
  });

  describe('isNumber', function () {
    it('should be false when a alphabetic character is provided', function () {
      expect(_.isNumber('a')).to.be.false;
      expect(_.isNumber('1')).to.be.false;
      expect(_.isNumber(NaN)).to.be.false;
      expect(_.isNumber(null)).to.be.false;
      expect(_.isNumber({})).to.be.false;
      expect(_.isNumber([])).to.be.false;
    });

    it('should return true when a number is provided', function () {
      expect(_.isNumber(1)).to.be.true;
    });
  });

  describe('isEven', function () {
    it('should return false when random chatarcter is provided', function () {
      expect(_.isEven('1')).to.be.false;
      expect(_.isEven('a')).to.be.false;
    });

    it('should be false when an uneven number is provided', function () {
      expect(_.isEven(1)).to.be.false;
      expect(_.isEven(21)).to.be.false;
    });

    it('should be truethy when an false when random chatarcter is provided', function () {
      expect(_.isEven(2)).to.be.true;
      expect(_.isEven(22)).to.be.true;
    });
  });

  describe('querystring', function () {
    it('should return empty string when empty object is provided', function () {
      expect(_.querystring()).to.equal('');
      expect(_.querystring({})).to.equal('');
      expect(_.querystring({key: ''})).to.equal('key=');
    });

    it('should parse nested objects', function () {
      var obj = { key: 'bar', nested: { foo: 'baz' } };
      expect(_.querystring(obj)).to.equal('key=bar&nested%5Bfoo%5D=baz');
    });
  });

  describe('assign', function () {
    it('should merge 2 nested objects, without fully overwriting the nested object', function () {
      var obj = {nested: {foo: 'baz', 'bar': 'foo'}};
      _.assign(obj, {'hello': 'world', nested: { 'world': 'say hi', 'foo' : 'bar'}})
      expect(obj.nested.foo).to.equal('bar');
      expect(obj.nested.bar).to.equal('foo');
      expect(obj.hello).to.equal('world');
    });
  });


});