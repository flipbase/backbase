require('./common');
var Component = require('../src/Component');

describe('Component', function () {

  it('should create an element if non exists', function(){
    var comp = new Component();
    console.log(comp);
    expect(comp).to.be.true;
  });

});