// suite('Error Helpers', function() {
//   var myp5sound;

//   setup(function(done) {
//     new p5sound(function(p) {
//       p.setup = function() {
//         myp5sound = p;
//         p5sound._clearValidateParamsCache();
//         done();
//       };
//     });
//   });

//   teardown(function() {
//     myp5sound.remove();
//   });


//   suite('helpForMisusedAtTopLevelCode', function() {
//     var help = function(msg) {
//       var log = [];
//       var logger = function(msg) {
//         log.push(msg);
//       };

//       p5sound.prototype._helpForMisusedAtTopLevelCode({ message: msg }, logger);
//       assert.equal(log.length, 1);
//       return log[0];
//     };

//     test('help for constants is shown', function() {
//       assert.match(
//         help("'HALF_PI' is undefined"),
//         /Did you just try to use p5\.js's HALF_PI constant\?/
//       );
//     });

//     test('help for functions is shown', function() {
//       assert.match(
//         help("'smooth' is undefined"),
//         /Did you just try to use p5\.js's smooth\(\) function\?/
//       );
//     });

//     test('help for variables is shown', function() {
//       assert.match(
//         help("'focused' is undefined"),
//         /Did you just try to use p5\.js's focused variable\?/
//       );
//     });
//   });

// });


