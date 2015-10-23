var $ = require('./../../src/modules/DOM');

describe('DOM', function () {

  before(function () {
    document.body.innerHTML = window.__html__['test/template.html'];
    this.el = document.getElementById('placeholder');
    this.el2 = document.getElementById('placeholder2');
    this.el3 = document.getElementById('placeholder3');
  });

  describe('width()', function () {
    it('should report proper width in pxs', function () {
      expect($.width(this.el)).to.be.a('number');
      expect($.width(this.el)).to.be.gt(0);
    });

    it('should report the width based on inline style or CSS class applied', function () {
      expect($.width(this.el)).to.equal(100);
      expect($.width(this.el2)).to.equal(250);
      expect($.width(this.el3)).to.equal(100);
    });
  });

  describe.skip('height()', function () {
    it('should report proper width in pxs', function () {
      expect($.height(this.el)).to.be.a('number');
      expect($.height(this.el)).to.be.gt(0);
    });

    it('should report the height based on inline style or CSS class applied', function () {
      expect($.height(this.el)).to.equal(100);
      expect($.height(this.el2)).to.equal(250);
      expect($.height(this.el3)).to.equal(100);
    });
  });

  describe('getElsByTagAndAttr()', function () {
    it('should return an array with matched elements', function () {
      var els = $.getElsByTagAndAttr('input', 'type', 'flipbase');
      expect(els[0].id).to.equal('flipbase');
      expect(els.length).to.equal(1);
    });

    it('should return an empty array when no mached elements were found', function () {
      var els = $.getElsByTagAndAttr('input', 'type', 'flopbase');
      expect(els.length).to.equal(0);
      expect(els).to.be.an('array');
    });
  });

  describe('createEl()', function () {
    it('should create an element without attributes when no provided', function () {
      var button = $.createEl('button');
      expect(button.outerHTML).to.equal('<button></button>');
    });

    it('should create an element with attributes', function () {
      var button = $.createEl('button', {
        style: 'color:#FFF;'
      });
      expect(button.outerHTML).to.equal('<button style="color:#FFF;"></button>');
    });
  });

  describe('setElAttributes()', function () {
    it('should set all object properties and values as attributes', function () {
      var el = $.createEl('input');
      $.setElAttributes(el, {
        'data-flipbase': 'foo',
        style: 'color:#FFF;',
        bar: 'foo'
      });
      expect(el.getAttribute('data-flipbase')).to.equal('foo');
      expect(el.getAttribute('style')).to.equal('color:#FFF;');
      expect(el.getAttribute('bar')).to.equal('foo');
    });
  });

  describe('insertAsFirstEl()', function () {
    it('should add an element as its child if no children exist yet', function () {
      var el = $.createEl('div', { id: 'foo-bar'});
      var par = document.getElementById('testParent');
      $.insertAsFirstEl(el, par);
      expect(el.parentNode).to.equal(par);
    });

    it('should add an element as the first child of the parent', function () {
      var el = $.createEl('div', { id: 'foo-bar'});
      var el2 = $.createEl('div', { id: 'foo-bar2'});
      var par = document.getElementById('testParent');
      $.insertAsFirstEl(el, par);
      $.insertAsFirstEl(el2, par);
      expect(par.firstChild).to.equal(el2);
    });
  });

  describe('insertBeforeEl()', function () {
    it('should add an element before another child', function () {
      var el = $.createEl('div', { id: 'foo-bar'});
      var el2 = $.createEl('div', { id: 'foo-bar2'});
      var el3 = $.createEl('div', { id: 'foo-bar3'});
      var par = document.getElementById('testParent');
      $.insertAsFirstEl(el, par);
      $.insertAsFirstEl(el2, par);
      $.insertBeforeEl(el3, el);
      expect(par.childNodes[1]).to.equal(el3);
    });

    it('should add an element before another child, even if the body element is the parent', function () {
      var el = $.createEl('div', { id: 'foo-bar'});
      var ref = document.getElementById('testParent');
      $.insertBeforeEl(el, ref);
      expect(ref.previousSibling).to.equal(el);
    });
  });  
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

  describe('hasCSSProperty()', function () {
    it('should return true if the browser does not support the property', function () {
      // phantomjs does not support CSS
      window.CSS = {
        supports: function(){}
      };
      sinon.stub(window.CSS, 'supports').returns(true);
      expect($.hasCSSProperty('border-radius', '5px')).to.be.true;
      window.CSS.supports.restore();
    });

    it('should return false if the browser does support the property', function () {
      // phantomjs does not support CSS
      window.CSS = {
        supports: function(){}
      };
      sinon.stub(window.CSS, 'supports').returns(false);
      expect($.hasCSSProperty('border-radius', '5px')).to.be.false;
      window.CSS.supports.restore();
    });

    it.skip('should return false if when using fake element to test support and it is not present', function () {
      expect($.hasCSSProperty('border-radius')).to.be.false;
    });
  });

  describe('modernize', function () {
    beforeEach(function () {
      document.documentElement.className = '';
    });

    afterEach(function () {
      $.hasClass.restore();
      $.hasCSSProperty.restore();
    })

    it('should add a class to the root element when browser supports the feature', function () {
      sinon.stub($, 'hasCSSProperty').returns(true);
      sinon.stub($, 'hasClass').returns(false);      
      $.modernize('border-radius', '50%', 'test-css-class');
      expect(document.documentElement.className).to.equal('test-css-class');
    });

    it('should not add a class to the root el when browser feature is not supported', function () {
      sinon.stub($, 'hasCSSProperty').returns(false);
      sinon.stub($, 'hasClass').returns(false);
      $.modernize('border-radius', '50%', 'test-css-class');
      expect($.hasClass(document.documentElement, 'test-css-class')).to.be.false;
    });

    it('should not a add the same class twice', function () {
      sinon.stub($, 'hasCSSProperty').returns(true);
      sinon.stub($, 'hasClass').returns(true);
      document.documentElement.className = 'test-css-class';
      $.modernize('border-radius', '50%', 'test-css-class');
      expect(document.documentElement.className).to.equal('test-css-class');
    });
  });
});