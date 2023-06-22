// suite('Calculation', function() {
//   var myp5sound;

//   setup(function(done) {
//     new p5sound(function(p) {
//       p.setup = function() {
//         myp5sound = p;
//         done();
//       };
//     });
//   });

//   teardown(function() {
//     myp5sound.remove();
//   });

//   suite('p5sound.prototype.abs', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.abs);
//       assert.typeOf(myp5sound.abs, 'function');
//     });
//     test('should return a number', function() {
//       result = myp5sound.abs();
//       assert.typeOf(result, 'number');
//     });
//     test('should return an absolute value', function() {
//       result = myp5sound.abs(-1);
//       assert.equal(result, 1);
//       assert.notEqual(result, -1);
//     });
//   });

//   suite('p5sound.prototype.ceil', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.ceil);
//       assert.typeOf(myp5sound.ceil, 'function');
//     });
//     test('should return ceil value given negative value', function() {
//       result = myp5sound.ceil(-1.9);
//       assert.equal(result, -1);
//     });
//     test('should return a ceil value given positive value', function() {
//       result = myp5sound.ceil(0.1);
//       assert.equal(result, 1);
//     });
//     test('should return same number', function() {
//       result = myp5sound.ceil(1);
//       assert.equal(result, 1);
//     });
//   });

//   suite('p5sound.prototype.dist', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.dist);
//       assert.typeOf(myp5sound.dist, 'function');
//     });
//     test('should return a number', function() {
//       result = myp5sound.dist(0, 0, 2, 3);
//       assert.typeOf(result, 'number');
//     });
//     test('should return correct distance', function() {
//       result = myp5sound.dist(0, 0, 2, 3);
//       assert.approximately(result, 3.605551, 0.000001); // Math.hypot(2, 3)
//     });
//     test('should return positive  distance', function() {
//       result = myp5sound.dist(0, 0, -2, -3);
//       assert.approximately(result, 3.605551, 0.000001); // Math.hypot(2, 3)
//     });
//     test('should return correct distance', function() {
//       result = myp5sound.dist(0, 0, 0, 2, 3, 5);
//       assert.approximately(result, 6.164414, 0.000001); // Math.hypot(2, 3, 5)
//     });
//     test('should return positive  distance', function() {
//       result = myp5sound.dist(0, 0, 0, -2, -3, 5);
//       assert.approximately(result, 6.164414, 0.000001); // Math.hypot(2, 3, 5)
//     });
//     test('should not underflow', function() {
//       result = myp5sound.dist(0, 0, 1e-200, 2e-200);
//       assert.notEqual(result, 0);
//     });
//     test('should not overflow', function() {
//       result = myp5sound.dist(0, 0, 1e200, 2e200);
//       assert.notEqual(result, Infinity);
//     });
//     test('should return 0 for identical 2D points', function() {
//       result = myp5sound.dist(2, 3, 2, 3);
//       assert.equal(result, 0);
//     });
//     test('should return 0 for identical 3D points', function() {
//       result = myp5sound.dist(2, 3, 5, 2, 3, 5);
//       assert.equal(result, 0);
//     });
//     test('should return infinity if coordinate of a point is at infinity (2D)', function() {
//       result = myp5sound.dist(0, 0, Infinity, 0);
//       assert.equal(result, Infinity);
//     });
//     test('should return infinity if coordinate of a point is at -infinity (2D)', function() {
//       result = myp5sound.dist(0, 0, -Infinity, 0);
//       assert.equal(result, Infinity);
//     });
//     test('should handle overflow correctly (2D)', function() {
//       result = myp5sound.dist(0, 1e200, 0, 1e199);
//       assert.equal(result, 9e199);
//     });
//     test('should handle rounding correctly (2D)', function() {
//       result = myp5sound.dist(0, 1e-200, 0, 1e-199);
//       assert.equal(result, 9e-200);
//     });
//     test('should handle string parameters correctly (2D)', function() {
//       result = myp5sound.dist(0, 0, '4', '3');
//       assert.equal(result, 5);
//     });
//     test('should return infinity if coordinate of a point is at infinity (3D)', function() {
//       result = myp5sound.dist(0, 0, 0, Infinity, 0, 0);
//       assert.equal(result, Infinity);
//     });
//     test('should return infinity if coordinate of a point is at -infinity (3D)', function() {
//       result = myp5sound.dist(0, 0, 0, -Infinity, 0, 0);
//       assert.equal(result, Infinity);
//     });
//     test('should handle overflow correctly (3D)', function() {
//       result = myp5sound.dist(0, 0, 1e200, 0, 0, 1e199);
//       assert.equal(result, 9e199);
//     });
//     test('should handle rounding correctly (3D)', function() {
//       result = myp5sound.dist(0, 0, 1e-200, 0, 0, 1e-199);
//       assert.equal(result, 9e-200);
//     });
//     test('should handle string parameters correctly (3D)', function() {
//       result = myp5sound.dist(0, 0, 0, '4', '4', '2');
//       assert.equal(result, 6);
//     });
//   });

//   suite('p5sound.prototype.exp', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.exp);
//       assert.typeOf(myp5sound.exp, 'function');
//     });
//     test('should return exp value given negative value', function() {
//       result = myp5sound.exp(-1);
//       assert.approximately(result, Math.exp(-1), 0.000001);
//     });
//     test('should return exp value given positive value', function() {
//       result = myp5sound.exp(1);
//       assert.approximately(result, Math.exp(1), 0.000001);
//     });
//     test('should return 1', function() {
//       result = myp5sound.exp(0);
//       assert.equal(result, 1);
//     });
//   });

//   suite('p5sound.prototype.floor', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.floor);
//       assert.typeOf(myp5sound.floor, 'function');
//     });
//     test('should return floor value given negative value', function() {
//       result = myp5sound.floor(-1.9);
//       assert.equal(result, -2);
//     });
//     test('should return a floor value given positive value', function() {
//       result = myp5sound.floor(0.1);
//       assert.equal(result, 0);
//     });
//     test('should return same number', function() {
//       result = myp5sound.floor(1);
//       assert.equal(result, 1);
//     });
//   });

//   suite('p5sound.prototype.lerp', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.lerp);
//       assert.typeOf(myp5sound.lerp, 'function');
//     });
//     test('should return start', function() {
//       result = myp5sound.lerp(0, 5, 0);
//       assert.equal(result, 0);
//     });
//     test('should return average', function() {
//       result = myp5sound.lerp(0, 5, 0.5);
//       assert.equal(result, 2.5);
//     });
//     test('should return stop', function() {
//       result = myp5sound.lerp(0, 5, 1);
//       assert.equal(result, 5);
//     });
//   });

//   suite('p5sound.prototype.log', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.log);
//       assert.typeOf(myp5sound.log, 'function');
//     });
//     test('should return log value given negative value', function() {
//       result = myp5sound.log(Math.exp(-1));
//       assert.approximately(result, -1, 0.0001);
//     });
//     test('should return log value given positive value', function() {
//       result = myp5sound.log(Math.exp(1));
//       assert.approximately(result, 1, 0.0001);
//     });
//     test('should return 0', function() {
//       result = myp5sound.log(Math.exp(0));
//       assert.equal(result, 0);
//     });
//   });

//   suite('p5sound.prototype.mag', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.mag);
//       assert.typeOf(myp5sound.mag, 'function');
//     });
//     test('should return a number', function() {
//       result = myp5sound.mag(2, 3);
//       assert.typeOf(result, 'number');
//     });
//     test('should return correct magitude', function() {
//       result = myp5sound.mag(2, 3);
//       assert.approximately(result, 3.605551, 0.000001); // Math.hypot(2, 3)
//     });
//     test('should return positive magnitude given negative inputs', function() {
//       result = myp5sound.mag(-2, -3);
//       assert.approximately(result, 3.605551, 0.000001); // Math.hypot(2, 3)
//     });
//   });

//   suite('p5sound.prototype.map', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.map);
//       assert.typeOf(myp5sound.map, 'function');
//     });
//     test('should return a number', function() {
//       result = myp5sound.map(1, 0, 10, 0, 20);
//       assert.typeOf(result, 'number');
//     });
//     test('should return scaled value', function() {
//       result = myp5sound.map(1, 0, 10, 0, 20);
//       assert.equal(result, 2);
//     });
//     test('should extrapolate by default', function() {
//       assert.approximately(myp5sound.map(10, 0, 1, 10, 11), 20, 0.01);
//       assert.approximately(myp5sound.map(-1, 0, 1, 10, 11), 9, 0.01);
//       assert.approximately(myp5sound.map(2, 0, 1, 20, 10), 0, 0.01);
//     });
//     test('shaould clamp correctly', function() {
//       assert.approximately(myp5sound.map(1, 0, 10, 0, 20, true), 2, 0.01);

//       assert.approximately(myp5sound.map(10, 0, 1, 10, 11, true), 11, 0.01);
//       assert.approximately(myp5sound.map(-1, 0, 1, 10, 11, true), 10, 0.01);
//       assert.approximately(myp5sound.map(2, 0, 1, 20, 10, true), 10, 0.01);
//     });
//   });

//   suite('p5sound.prototype.max', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.max);
//       assert.typeOf(myp5sound.max, 'function');
//     });
//     test('should return larger left argument', function() {
//       result = myp5sound.max(10, -1);
//       assert.equal(result, 10);
//     });
//     test('should return larger right argument', function() {
//       result = myp5sound.max(-1, 10);
//       assert.equal(result, 10);
//     });
//     test('should return single value', function() {
//       result = myp5sound.max(10, 10);
//       assert.equal(result, 10);
//     });
//     test('should return larger value from array', function() {
//       result = myp5sound.max([10, -1]);
//       assert.equal(result, 10);
//     });
//     test('should return larger value from array', function() {
//       result = myp5sound.max(-1, 10);
//       assert.equal(result, 10);
//     });
//     test('should return single value from array', function() {
//       result = myp5sound.max([10, 10]);
//       assert.equal(result, 10);
//     });
//   });

//   suite('p5.sound.prototype.min', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.min);
//       assert.typeOf(myp5sound.min, 'function');
//     });
//     test('should return smaller right  argument', function() {
//       result = myp5sound.min(10, -1);
//       assert.equal(result, -1);
//     });
//     test('should return smaller left  argument', function() {
//       result = myp5sound.min(-1, 10);
//       assert.equal(result, -1);
//     });
//     test('should return single value', function() {
//       result = myp5sound.min(10, 10);
//       assert.equal(result, 10);
//     });
//     test('should return smaller value from array', function() {
//       result = myp5sound.min([10, -1]);
//       assert.equal(result, -1);
//     });
//     test('should return smaller value from array', function() {
//       result = myp5sound.min([-1, 10]);
//       assert.equal(result, -1);
//     });
//     test('should return single value from array', function() {
//       result = myp5sound.min([10, 10]);
//       assert.equal(result, 10);
//     });
//   });

//   suite('p5sound.prototype.norm', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.norm);
//       assert.typeOf(myp5sound.norm, 'function');
//     });
//     test('should return scaled decimal value', function() {
//       // note: there is currently scoping issues with "this" keyword
//       result = myp5sound.norm(20, 0, 50);
//       assert.equal(result, 0.4);
//     });
//   });

//   suite('p5sound.prototype.constrain', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.constrain);
//       assert.typeOf(myp5sound.constrain, 'function');
//     });

//     test('should return same number', function() {
//       result = myp5sound.constrain(1, 3, 5);
//       assert.equal(result, 3);
//     });

//     test('should return lower bound', function() {
//       result = myp5sound.constrain(1, -1, 5);
//       assert.equal(result, 1);
//     });

//     test('should return upper bound', function() {
//       result = myp5sound.constrain(1, 10, 5);
//       assert.equal(result, 10);
//     });
//   });

//   suite('p5sound.prototype.sq', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.sq);
//       assert.typeOf(myp5sound.sq, 'function');
//     });

//     test('should return sauare value', function() {
//       result = myp5sound.sq(10);
//       assert.equal(result, 100);
//     });

//     test('should return squared value given negative number', function() {
//       result = myp5sound.sq(-10);
//       assert.equal(result, 100);
//     });
//   });

//   suite('p5sound.prototype.pow', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.pow);
//       assert.typeOf(myp5sound.pow, 'function');
//     });

//     test('should return pow for negative exponential', function() {
//       result = myp5sound.pow(2, -1);
//       assert.equal(result, 0.5);
//     });

//     test('should return pow for positive exponential', function() {
//       result = myp5sound.pow(2, 4);
//       assert.equal(result, 16);
//     });
//   });

//   suite('p5sound.prototype.round', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.round);
//       assert.typeOf(myp5sound.round, 'function');
//     });

//     test('should round down', function() {
//       result = myp5sound.round(2.1);
//       assert.equal(result, 2);
//     });

//     test('should round up from midpoint', function() {
//       result = myp5sound.round(2.5);
//       assert.equal(result, 3);
//     });

//     test('should round up', function() {
//       result = myp5sound.round(2.8);
//       assert.equal(result, 3);
//     });

//     test('should round two decimal places', function() {
//       result = myp5sound.round(12.31833, 2);
//       assert.equal(result, 12.32);
//     });

//     test('should round very small numbers to zero', function() {
//       result = myp5sound.round(1.234567e-14);
//       assert.equal(result, 0);
//     });

//     test('should round very small numbers to zero when decimal places are specified', function() {
//       result = myp5sound.round(1.234567e-14, 2);
//       assert.equal(result, 0);
//     });
//   });

//   suite('p5sound.prototype.sqrt', function() {
//     var result;
//     test('should be a function', function() {
//       assert.ok(myp5sound.sqrt);
//       assert.typeOf(myp5sound.sqrt, 'function');
//     });

//     test('should return square root', function() {
//       result = myp5sound.sqrt(100);
//       assert.equal(result, 10);
//     });
//   });
// });
