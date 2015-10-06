var Component = require('../src/Component');

describe('Component', function () {

  before(function() {
    document.body.innerHTML = window.__html__['test/template.html'];

    this.comp = new Component({ 
      $el: document.getElementById('testParent')
    });
  });

  it('should thrown an error if top level component doesn\'t receive a DOM element', function(){
    expect(Component).to.throw(Error, /DOM element/);
  });

  it('should thrown an error if ', function () {
    expect(document.body.contains(this.comp.$el)).to.be.true;
  });

});