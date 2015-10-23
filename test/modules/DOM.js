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

  describe.skip('height()', function () {

  });

  describe.skip('getEl()', function () {

  });

  describe.skip('getElsByTagAndAttr', function () {
    
  });

  describe.skip('createEl()', function () {

  });

  describe.skip('insertAsFirstEl()', function () {

  });

  describe.skip('insertBeforeEl()', function () {

  });

  describe('CSS', function () {

    beforeEach(function () {
      // reset className property for each test
      document.documentElement.className = '';
    });

    describe('hasClass()', function () {
      it('should return false when there is no className property', function () {
        expect($.hasClass(document.createElement('div'), 'baz')).to.be.false;
      });

      it('should return false when the element doesnt have the CSS class', function () {
        document.documentElement.className = 'bar';
        expect($.hasClass(document.documentElement, 'foo')).to.be.false;
      });

      it('should true when the element does have the CSS class', function () {
        document.documentElement.className = 'foo';
        document.getElementById('testParent').className = 'baz';
        expect($.hasClass(document.documentElement, 'foo')).to.be.true;
        expect($.hasClass(document.getElementById('testParent'), 'baz')).to.be.true;
      });
    });

    describe('addClass()', function () {
      it('should add the CSS class', function () {
        var el = document.createElement('div');
        var root = document.documentElement;
        expect($.addClass(el, 'bar').className).to.equal('bar');
        expect($.addClass(root, 'baz').className).to.equal('baz');
      });

      it('should not add the exact same CSS class twice', function () {
        var el = document.createElement('div');
        el.className = 'baz';
        expect($.addClass(el, 'baz').className).to.equal('baz');
      });

      it('should only add a space between class names, when className property is already set', function () {
        var el = document.createElement('div');
        $.addClass(el, 'baz');
        $.addClass(el, 'foo');
        expect(el.className).to.equal('baz foo');
      });
    });

    describe('removeClass()', function () {
      it('should remove a CSS class', function () {
        var el = document.createElement('div');
        el.className = 'foo';
        expect($.removeClass(el, 'foo').className).to.be.empty;
      });

      it('should not altering the other classes', function () {
        var el = document.createElement('div');
        $.addClass(el, 'bar')
        $.addClass(el, 'foo')
        $.addClass(el, 'baz')
        var root = document.documentElement;
        expect($.removeClass(el, 'foo').className).to.equal('bar  baz');
        expect($.removeClass(el, 'bar').className).to.equal('  baz');
      });
    });
  });
  
  describe('hasCSSProperty()', function () {
    before
    it('should return false if the browser does not support the property, using the native CSS.supports method', function () {
      // phantomjs does not support CSS
      window.CSS = {
        supports: function(){}
      };
      sinon.stub(window.CSS, 'supports').returns(true);
      expect($.hasCSSProperty('color', '#FFF')).to.be.true;
      expect($.hasCSSProperty('border', '1px solid #FFF')).to.be.true;
      expect($.hasCSSProperty('border-radius', '5px')).to.be.true;
      window.CSS.supports.restore();
    });

    it('should return true if the browser does support the property, using the fake element created');
  });

  describe('modernize', function () {
    beforeEach(function () {
      $.modernize('border-radius', '50%', 'test-css-class');
    });

    it('should verify if the browser supports a CSS feature', function () {
      expect($.hasClass(document.documentElement, 'test-css-class')).to.be.true;
    });
  });


});