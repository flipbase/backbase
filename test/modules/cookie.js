var cookie = require('./../../src/modules/cookie');

describe('Cookie', function () {
  it('should create a new cookie', function () {
    cookie.create('foo', 'bar');
    expect(document.cookie.match('foo=bar')[0]).to.equal('foo=bar');
  });

  it('should check if cookie exists', function () {
    expect(cookie.has('foo')).to.be.true;
  });

  it('should retrieve the value from the cookie', function () {
    expect(cookie.get('foo')).to.equal('bar');
  })

  it('should remove the cookie', function () {
    cookie.remove('foo');
    expect(document.cookie.match('foo=bar')).to.be.null;
  });
});