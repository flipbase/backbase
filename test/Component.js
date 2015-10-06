var Component = require('../src/Component');

describe('Component', function () {

  before(function() {
    document.body.innerHTML = window.__html__['test/template.html'];
  });

  it('should thrown an error if top level component does not receive a reference to a DOM element', function(){
    var comp = new Component();
    console.log(createEl);
    console.log(comp);
    // expect(comp).to.be.true;
  });

  it('should create an element if non exists', function(){
    // var comp = new Component({ });
    // console.log(comp);
    // expect(comp).to.be.true;
  });

});