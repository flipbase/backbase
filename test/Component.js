var Component = require('../src/Component');
var inherits = require('../src/utils/utils').inherits;

var App = Component.extend({
  $el: 'hoi'
});

describe('Component', function () {

  before(function() {
    document.body.innerHTML = window.__html__['test/template.html'];
  });

  it('Component instance should have a different prototype then the Component.prototype', function () {
    expect(App.prototype).to.not.equal(Component.prototype);
  });



  // it.skip('should throw an error if parent $el is provided but not added to the DOM element', function () {
  //   expect(function() {
  //     new App({ $el: document.createElement('div') });
  //   }).to.throw(Error);
  // });

  // it('should add $el to the class instance when provided', function () {
  //   var app = new App({ $el: document.createElement('div')} );
  //   expect(app.$el.innerHTML).to.be.a('string').and.to.be.empty;
  // });

  // it('should contain template as a child of parent after rendering', function () {
  //   App.prototype.template = function() {
  //     return '<div>foo <strong>baz</strong></div>'; 
  //   };
  //   var app = new App();
  //   app.render();
  //   expect(app.html()).to.contain('foo ');
  // });


  // it('should provid a static methods to register and retrieve child classes', function () {
  //   Component.registerComponent('Child', Child);
  //   expect(Component.getComponent('Child')).to.be.a('function');
  // });


  // it('should initialize children', function () {
  //   App.prototype.children = ['Child'];
  //   App.prototype.didRender = function () {
  //     this.initChildren();
  //   };

  //   var app = new App({ $el: document.getElementById('testParent') });
  //   app.render();
  //   var kind = app._children['Child'];
  //   kind.render();
  //   expect(kind.html()).to.equal(Child.prototype.template());
  // });


  // it('should render Child\'s template in App\'s template', function () {   
  //   App.prototype.registerChildren = {
  //     'Child': Child
  //   };

  //   App.prototype.didRender = function () {
  //     this.initChildren();
  //   };
  //   App.prototype.template = function() {
  //     return '<div>foo <strong>baz</strong>' + this.renderChild('Child') + '</div>'; 
  //   };

  //   var app = new App({ $el: document.getElementById('testParent') });
  //   app.render();

  //   expect(app.html()).to.contain(Child.prototype.template());
  // });



  // it('should trigger render method automatically when initiated', function () {
  //   App.prototype.render = function () {
  //     return ''
  //   };

  // });

});