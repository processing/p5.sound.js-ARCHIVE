// suite('Random', function() {
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

//   suite('p5sound.prototype.random', function() {
//     var result;

//     var results = [];

//     suite('random()', function() {
//       setup(function() {
//         myp5sound.randomSeed(99);
//         for (var i = 0; i < 5; i++) {
//           results[i] = myp5sound.random();
//         }
//         myp5sound.randomSeed(99);
//         for (i = 5; i < 10; i++) {
//           results[i] = myp5sound.random();
//         }
//       });
//       test('should return a number', function() {
//         for (var i = 0; i < 10; i++) {
//           assert.typeOf(results[i], 'number');
//         }
//       });
//       test('should return a number 0 <= n < 1', function() {
//         for (var i = 0; i < 10; i++) {
//           assert.isTrue(results[i] >= 0);
//           assert.isTrue(results[i] < 1);
//         }
//       });
//       test('should return same sequence of numbers', function() {
//         for (var i = 0; i < 5; i++) {
//           assert.isTrue(results[i] === results[i + 5]);
//         }
//       });
//     });

//     suite('random(5)', function() {
//       test('should return a number 0 <= n < 5', function() {
//         result = myp5sound.random(5);
//         assert.isTrue(result >= 0);
//         assert.isTrue(result < 5);
//       });
//     });

//     suite('random(1, 10)', function() {
//       test('should return a number 1 <= n < 10', function() {
//         result = myp5sound.random(1, 10);
//         assert.isTrue(result >= 1);
//         assert.isTrue(result < 10);
//       });
//     });

//     suite('random(["apple", "pear", "orange", "grape"])', function() {
//       test('should return a fruit', function() {
//         var fruits = ['apple', 'pear', 'orange', 'grape'];
//         result = myp5sound.random(fruits);
//         assert.include(fruits, result);
//       });
//     });
//   });
//   suite('instance mode', function() {
//     var instances = [];

//     function addInstance(max, done) {
//       new p5sound(function(p) {
//         p.setup = function() {
//           instances.push(p);
//           if (instances.length >= max) {
//             done();
//           }
//         };
//       });
//     }

//     setup(function(done) {
//       var instanceCount = 2;
//       for (var i = 0; i < instanceCount; i++) {
//         addInstance(instanceCount, done);
//       }
//     });

//     teardown(function() {
//       instances.forEach(function(instance) {
//         instance.remove();
//       });
//     });

//     test('should be independent', function() {
//       var SEED = 42;

//       instances.forEach(function(instance) {
//         instance.randomSeed(SEED);
//       });

//       for (var i = 0; i < 10; i++) {
//         instances.reduce(function(prev, instance) {
//           var randomValue = instance.random();
//           if (prev != null) {
//             assert.equal(randomValue, prev);
//           }

//           return randomValue;
//         }, null);
//       }
//     });
//   });

//   suite('p5sound.prototype.randomGaussian', function() {
//     suite('instance mode', function() {
//       var instances = [];

//       function addInstance(max, done) {
//         new p5sound(function(p) {
//           p.setup = function() {
//             instances.push(p);
//             if (instances.length >= max) {
//               done();
//             }
//           };
//         });
//       }

//       setup(function(done) {
//         var instanceCount = 2;
//         for (var i = 0; i < instanceCount; i++) {
//           addInstance(instanceCount, done);
//         }
//       });

//       teardown(function() {
//         instances.forEach(function(instance) {
//           instance.remove();
//         });
//       });

//       test('should be independent', function() {
//         var SEED = 42;

//         instances.forEach(function(instance) {
//           instance.randomSeed(SEED);
//         });

//         for (var i = 0; i < 10; i++) {
//           instances.reduce(function(prev, instance) {
//             var randomValue = instance.randomGaussian(0, 15);
//             if (prev != null) {
//               assert.equal(randomValue, prev);
//             }

//             return randomValue;
//           }, null);
//         }
//       });
//     });

//     suite('randomGaussian(42, 0)', function() {
//       test('should return 42', function() {
//         result = myp5sound.randomGaussian(42, 0);
//         assert.isTrue(result === 42);
//       });
//     });
//   });
// });
