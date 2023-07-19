const Oscillator = require('../../../src/p5sound.Oscillator.js');

let assert = require('chai').assert;
suite('Array', function () {
  suite('audio', function () {
    test('oscillator is an audioNode', function () {
      assert.typeOf(new Oscillator('sine', 400), 'function');
    });
  });
});


// test('should be a function', function () {
// //   assert.ok(myp5sound.abs);
//   assert.typeOf(100, 'number');
// });