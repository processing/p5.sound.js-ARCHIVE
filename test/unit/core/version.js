// suite('Version', function() {
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

//   test('exists on p5sound object', function() {
//     assert.isString(p5sound.VERSION);
//     // ensure the string isn't empty
//     assert.isTrue(p5sound.VERSION.length > 0);
//   });

//   test('exists on instance of p5sound sketch', function() {
//     assert.isString(myp5sound.VERSION);
//     // ensure the string isn't empty
//     assert.isTrue(myp5sound.VERSION.length > 0);
//   });
// });
