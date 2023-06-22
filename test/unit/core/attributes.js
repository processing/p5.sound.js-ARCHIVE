// suite('Attributes', function() {
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

//   suite('p5sound.prototype.ellipseMode', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.ellipseMode);
//       assert.typeOf(myp5sound.ellipseMode, 'function');
//     });
//     test('missing param #0', function() {
//       assert.validationError(function() {
//         myp5sound.ellipseMode();
//       });
//     });
//     test('wrong param type at #0', function() {
//       assert.validationError(function() {
//         myp5sound.ellipseMode(myp5sound.BEVEL);
//       });
//     });
//     test('wrong param type at #0', function() {
//       assert.validationError(function() {
//         myp5sound.ellipseMode(20);
//       });
//     });
//   });

//   suite('p5sound.prototype.noSmooth', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.noSmooth);
//       assert.typeOf(myp5sound.noSmooth, 'function');
//     });
//   });

//   suite('p5sound.prototype.smooth', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.smooth);
//       assert.typeOf(myp5sound.smooth, 'function');
//     });
//   });

//   suite('p5sound.prototype.strokeCap', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.strokeCap);
//       assert.typeOf(myp5sound.strokeCap, 'function');
//     });
//     test('wrong param type at #0', function() {
//       assert.validationError(function() {
//         myp5sound.strokeCap(myp5sound.CORNER);
//       });
//     });
//     test('wrong param type at #0', function() {
//       assert.validationError(function() {
//         myp5sound.strokeCap(40);
//       });
//     });
//   });

//   suite('p5sound.prototype.strokeJoin', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.strokeJoin);
//       assert.typeOf(myp5sound.strokeJoin, 'function');
//     });
//     test('wrong param type at #0', function() {
//       assert.validationError(function() {
//         myp5sound.strokeJoin(myp5sound.CORNER);
//       });
//     });
//     test('wrong param type at #0', function() {
//       assert.validationError(function() {
//         myp5sound.strokeJoin(35);
//       });
//     });
//   });

//   suite('p5sound.prototype.strokeWeight', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.strokeWeight);
//       assert.typeOf(myp5sound.strokeWeight, 'function');
//     });
//     test('wrong param type at #0', function() {
//       assert.validationError(function() {
//         myp5sound.strokeWeight('a');
//       });
//     });
//   });
// });
