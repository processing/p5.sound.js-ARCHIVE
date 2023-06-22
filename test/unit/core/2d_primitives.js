// suite('2D Primitives', function() {
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



//   suite('p5sound.prototype.ellipse', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.ellipse);
//       assert.typeOf(myp5sound.ellipse, 'function');
//     });
//     test('no friendly-err-msg', function() {
//       assert.doesNotThrow(
//         function() {
//           myp5sound.ellipse(0, 0, 100);
//         },
//         Error,
//         'got unwanted exception'
//       );
//     });
//     test('missing param #2', function() {
//       assert.validationError(function() {
//         myp5sound.ellipse(0, 0);
//       });
//     });
//     test('missing param #2', function() {
//       assert.validationError(function() {
//         var size;
//         myp5sound.ellipse(0, 0, size);
//       });
//     });
//     test('wrong param type at #0', function() {
//       assert.validationError(function() {
//         myp5sound.ellipse('a', 0, 100, 100);
//       });
//     });
//   });

// });
