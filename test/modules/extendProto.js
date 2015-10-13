var extendProto = require('./../../src/modules/extendProto');

function Parent () {}
Parent.prototype.methodA = function () {};
Parent.prototype.propertyB = 'b';
Parent.extend = extendProto;

var ChildClass = Parent.extend({
  propertyC: 'c'
});
var init = new ChildClass();

describe('extendProto', function () {

  it('should create a new prototype method, so child prototypes will not override the parent prototype', function () {
    expect(ChildClass.prototype).to.be.not.equal(Parent.prototype);
    expect(init.prototype).to.be.not.equal(Parent.prototype);
  });

  it('should copy all properties and methods from the parent\'s prototype', function () {
    expect(init.propertyB).to.equal(Parent.prototype.propertyB);
    expect(init.methodA).to.equal(Parent.prototype.methodA);
    expect(ChildClass.prototype.propertyB).to.equal(Parent.prototype.propertyB);
    expect(ChildClass.prototype.methodA).to.equal(Parent.prototype.methodA);
  });

  it('should create on the instance (?!) a __super__ property referencing the parent prototype', function () {
    expect(init.__super__).to.equal(Parent.prototype);
  });

  it('should use properties provided at initialization to a constructor method');
  it('should assign static properties to the child class');

});