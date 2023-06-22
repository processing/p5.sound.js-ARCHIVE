// suite('Trigonometry', function() {
//   var theta = 90;
//   var x = 0;
//   var y = 1;
//   var ratio = 0.5;
//   var RADIANS = 'radians';
//   var DEGREES = 'degrees';
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

//   var handleDegreesAndRadians = function(func) {
//     test('should handle degrees', function() {
//       myp5sound.angleMode(DEGREES);
//       var degToRad = myp5sound.radians(theta);
//       assert.equal(Math[func](degToRad), myp5[func](theta));
//     });

//     test('should handle radians', function() {
//       myp5sound.angleMode(RADIANS);
//       assert.equal(Math[func](theta), myp5[func](theta));
//     });
//   };

//   var ahandleDegreesAndRadians = function(func) {
//     test('should handle degrees', function() {
//       myp5sound.angleMode(DEGREES);
//       assert.equal(myp5sound.degrees(Math[func](ratio)), myp5[func](ratio));
//     });

//     test('should handle radians', function() {
//       myp5sound.angleMode(RADIANS);
//       assert.equal(Math[func](ratio), myp5[func](ratio));
//     });
//   };

//   suite('p5sound.prototype.angleMode', function() {
//     test('should set constant to DEGREES', function() {
//       myp5sound.angleMode(DEGREES);
//       assert.equal(myp5sound.angleMode(), 'degrees');
//     });

//     test('should set constant to RADIANS', function() {
//       myp5sound.angleMode(RADIANS);
//       assert.equal(myp5sound.angleMode(), 'radians');
//     });

//     test('wrong param type', function() {
//       assert.validationError(function() {
//         myp5sound.angleMode('wtflolzkk');
//       });
//     });

//     test('should return radians', function() {
//       myp5sound.angleMode(RADIANS);
//       assert.equal(myp5sound.angleMode(), 'radians');
//     });

//     test('should return degrees', function() {
//       myp5sound.angleMode(DEGREES);
//       assert.equal(myp5sound.angleMode(), 'degrees');
//     });

//     test('should always be RADIANS or DEGREES', function() {
//       myp5sound.angleMode('wtflolzkk');
//       assert.equal(myp5sound.angleMode(), 'radians');
//     });
//   });

//   suite('p5sound.prototype.degrees', function() {
//     test('should return the angle in radians when angleMode is DEGREES', function() {
//       myp5sound.angleMode(DEGREES);
//       var angleInRad = 360 * theta / (2 * Math.PI); // This is degToRad conversion
//       assert.equal(myp5sound.degrees(theta), angleInRad);
//     });

//     test('should return the angle in radians when angleMode is RADIANS', function() {
//       myp5sound.angleMode(RADIANS);
//       var angleInRad = 360 * theta / (2 * Math.PI); // This is degToRad conversion
//       assert.equal(myp5sound.degrees(theta), angleInRad);
//     });
//   });

//   suite('p5sound.prototype.radians', function() {
//     test('should return the angle in degrees when angleMode is RADIANS', function() {
//       myp5sound.angleMode(RADIANS);
//       var angleInDeg = 2 * Math.PI * theta / 360; // This is RadToDeg conversion
//       assert.equal(myp5sound.radians(theta), angleInDeg);
//     });

//     test('should return the angle in degrees when angleMode is DEGREES', function() {
//       myp5sound.angleMode(DEGREES);
//       var angleInDeg = 2 * Math.PI * theta / 360; // This is RadToDeg conversion
//       assert.equal(myp5sound.radians(theta), angleInDeg);
//     });
//   });

//   suite('p5sound.prototype.asin', function() {
//     ahandleDegreesAndRadians('asin');
//   });

//   suite('p5sound.prototype.atan', function() {
//     ahandleDegreesAndRadians('atan');
//   });

//   suite('p5sound.prototype.acos', function() {
//     ahandleDegreesAndRadians('acos');
//   });

//   suite('p5sound.prototype.sin', function() {
//     handleDegreesAndRadians('sin');
//   });

//   suite('p5sound.prototype.cos', function() {
//     handleDegreesAndRadians('cos');
//   });

//   suite('p5sound.prototype.tan', function() {
//     handleDegreesAndRadians('tan');
//   });

//   suite('p5sound.prototype.atan2', function() {
//     test('should handle degrees', function() {
//       myp5sound.angleMode(DEGREES);
//       assert.equal(myp5sound.degrees(Math.atan2(y, x)), myp5sound.atan2(y, x));
//     });

//     test('should handle radians', function() {
//       myp5sound.angleMode(RADIANS);
//       assert.equal(Math.atan2(y, x), myp5sound.atan2(y, x));
//     });
//   });
// });
