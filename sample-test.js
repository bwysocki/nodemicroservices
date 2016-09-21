function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function calculateHypotenuse(x, y, callback) {
  callback(null, Math.sqrt(x*x + y*x));
}

require('chai').should();

var sinon = require('sinon');
var expect = require('chai').expect;

describe('When a customer rolls a dice', function(){
  it('should return an integer number', function() {
    expect(rollDice()).to.be.an('number');
  });
  it('should get a number below 7', function(){
    rollDice().should.be.below(7);
  });
  it('should get a number bigger than 0', function(){
    rollDice().should.be.above(0);
  });
  it('should not be null', function() {
    expect(rollDice()).to.not.be.null;
  });
  it('should not be undefined', function() {
    expect(rollDice()).to.not.be.undefined;
  });
  it("Math#random should be called with no arguments", function() {
    sinon.stub(Math, "random");
    rollDice();
    Math.random.calledWith();
  });
});

describe("When the user calculates the hypotenuse", function(){
  it("should execute the callback passed as argument", function() {
    var callback = sinon.spy();
    calculateHypotenuse(3, 3, callback);
    callback.called.should.be.true;
  });
});
