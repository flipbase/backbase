var $ = require('./../../src/modules/DOM');

describe('DOM', function () {

  before(function () {
    document.body.innerHTML = window.__html__['test/template.html'];
    this.el = document.getElementById('placeholder');
  });

  describe('width()', function () {

    it('should report proper width in pxs', function () {
      expect($.width(this.el)).to.be.a('number');
      expect($.width(this.el)).to.be.gt(0);
    });

    it('should report the pixels set on the attribute', function () {
      expect($.width(this.el)).to.equal(this.el.getAttribute('width'));
    });

    it('should report the pixels set on the attribute even when css class tries to overrides width', function () {
      expect($.width(this.el)).to.equal(this.el.getAttribute('width'));
    });


  });

});