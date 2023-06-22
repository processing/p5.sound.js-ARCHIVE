// suite('Conversion', function() {
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

//   var result;

//   suite('p5sound.prototype.float', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.float);
//       assert.typeOf(myp5sound.float, 'function');
//     });

//     test('should convert a string to its floating point representation', function() {
//       result = myp5sound.float('56.99998');
//       assert.typeOf(result, 'Number');
//       assert.strictEqual(result, 56.99998);
//     });

//     test('should return NaN for invalid string', function() {
//       result = myp5sound.float('cat');
//       assert.isNaN(result);
//     });

//     test('should return Infinity for Infinity', function() {
//       result = myp5sound.float(Infinity);
//       assert.strictEqual(result, Infinity);
//     });

//     test('should return -Infinity for -Infinity', function() {
//       result = myp5sound.float(-Infinity);
//       assert.strictEqual(result, -Infinity);
//     });

//     test('should return array of floating points and Nan', function() {
//       result = myp5sound.float(['1', '2.0', '3.1', 'giraffe']);
//       assert.typeOf(result, 'Array');
//       assert.deepEqual(result, [1, 2.0, 3.1, NaN]);
//     });
//   });

//   suite('p5sound.prototype.int', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.int);
//       assert.typeOf(myp5sound.int, 'function');
//     });

//     test('should convert false to its integer representation i.e. 0', function() {
//       result = myp5sound.int(false);
//       assert.typeOf(result, 'Number');
//       assert.strictEqual(result, 0);
//     });

//     test('should convert true to its integer representation i.e. 1', function() {
//       result = myp5sound.int(true);
//       assert.strictEqual(result, 1);
//     });

//     test('should convert a string to its integer representation', function() {
//       result = myp5sound.int('1001');
//       assert.strictEqual(result, 1001);
//     });

//     test('should return NaN for invalid string', function() {
//       result = myp5sound.int('cat');
//       assert.isNaN(result);
//     });

//     test('should return Infinity for Infinity', function() {
//       result = myp5sound.int(Infinity);
//       assert.strictEqual(result, Infinity);
//     });

//     test('should return -Infinity for -Infinity', function() {
//       result = myp5sound.int(-Infinity);
//       assert.strictEqual(result, -Infinity);
//     });

//     test('should convert float to its integer representation', function() {
//       result = myp5sound.int('-1001.9');
//       assert.strictEqual(result, -1001);
//     });

//     test('should return array of integers and NaN', function() {
//       result = myp5sound.int(['1', '2.3', '-3.5', 'giraffe', false, 4.7]);
//       assert.typeOf(result, 'Array');
//       assert.deepEqual(result, [1, 2, -3, NaN, 0, 4]);
//     });
//   });

//   suite('p5sound.prototype.str', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.str);
//       assert.typeOf(myp5sound.str, 'function');
//     });

//     test('should convert false to string', function() {
//       result = myp5sound.str(false);
//       assert.typeOf(result, 'String');
//       assert.strictEqual(result, 'false');
//     });

//     test('should convert true to string', function() {
//       result = myp5sound.str(true);
//       assert.strictEqual(result, 'true');
//     });

//     test('should convert a number to string', function() {
//       result = myp5sound.str(45);
//       assert.strictEqual(result, '45');
//     });

//     test('should return array of strings', function() {
//       result = myp5sound.str([1, 2.3, true, -4.5]);
//       assert.typeOf(result, 'Array');
//       assert.deepEqual(result, ['1', '2.3', 'true', '-4.5']);
//     });
//   });

//   suite('p5sound.prototype.boolean', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.boolean);
//       assert.typeOf(myp5sound.boolean, 'function');
//     });

//     test('should convert 1 to true', function() {
//       result = myp5sound.boolean(1);
//       assert.strictEqual(result, true);
//     });

//     test('should convert a number to true', function() {
//       result = myp5sound.boolean(154);
//       assert.strictEqual(result, true);
//     });

//     test('should return true for Infinity', function() {
//       result = myp5sound.boolean(Infinity);
//       assert.strictEqual(result, true);
//     });

//     test('should convert 0 to false', function() {
//       result = myp5sound.boolean(0);
//       assert.strictEqual(result, false);
//     });

//     test('should convert a string to false', function() {
//       result = myp5sound.boolean('1');
//       assert.strictEqual(result, false);
//     });

//     test('should convert a string to false', function() {
//       result = myp5sound.boolean('0');
//       assert.strictEqual(result, false);
//     });

//     test('should convert "true" to true', function() {
//       result = myp5sound.boolean('true');
//       assert.strictEqual(result, true);
//     });

//     test('should return false for empty string', function() {
//       result = myp5sound.boolean('');
//       assert.strictEqual(result, false);
//     });

//     test('should return array of boolean', function() {
//       result = myp5sound.boolean([1, true, -4.5, Infinity, 'cat', '23']);
//       assert.typeOf(result, 'Array');
//       assert.deepEqual(result, [true, true, true, true, false, false]);
//     });
//   });

//   suite('p5sound.prototype.byte', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.byte);
//       assert.typeOf(myp5sound.byte, 'function');
//     });

//     test('should return 127 for 127', function() {
//       result = myp5sound.byte(127);
//       assert.strictEqual(result, 127);
//     });

//     test('should return -128 for 128', function() {
//       result = myp5sound.byte(128);
//       assert.strictEqual(result, -128);
//     });

//     test('should return 23 for 23.4', function() {
//       result = myp5sound.byte(23.4);
//       assert.strictEqual(result, 23);
//     });

//     test('should return 1 for true', function() {
//       result = myp5sound.byte(true);
//       assert.strictEqual(result, 1);
//     });

//     test('should return 23 for "23.4"', function() {
//       result = myp5sound.byte('23.4');
//       assert.strictEqual(result, 23);
//     });

//     test('should return NaN for invalid string', function() {
//       result = myp5sound.byte('cat');
//       assert.isNaN(result);
//     });

//     test('should return array', function() {
//       result = myp5sound.byte([0, 255, '100']);
//       assert.typeOf(result, 'Array');
//       assert.deepEqual(result, [0, -1, 100]);
//     });
//   });

//   suite('p5sound.prototype.char', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.char);
//       assert.typeOf(myp5sound.char, 'function');
//     });

//     test('should return the char representation of the number', function() {
//       result = myp5sound.char(65);
//       assert.typeOf(result, 'String');
//       assert.strictEqual(result, 'A');
//     });

//     test('should return the char representation of the string', function() {
//       result = myp5sound.char('65');
//       assert.strictEqual(result, 'A');
//     });

//     test('should return array', function() {
//       result = myp5sound.char([65, 66, '67']);
//       assert.typeOf(result, 'Array');
//       assert.deepEqual(result, ['A', 'B', 'C']);
//     });
//   });

//   suite('p5sound.prototype.unchar', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.unchar);
//       assert.typeOf(myp5sound.unchar, 'function');
//     });

//     test('should return the integer representation of char', function() {
//       result = myp5sound.unchar('A');
//       assert.typeOf(result, 'Number');
//       assert.strictEqual(result, 65);
//     });

//     test('should return array of numbers', function() {
//       result = myp5sound.unchar(['A', 'B', 'C']);
//       assert.typeOf(result, 'Array');
//       assert.deepEqual(result, [65, 66, 67]);
//     });
//   });

//   suite('p5sound.prototype.hex', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.hex);
//       assert.typeOf(myp5sound.hex, 'function');
//     });

//     test('should return the hex representation of the number', function() {
//       result = myp5sound.hex(65);
//       assert.typeOf(result, 'String');
//       assert.strictEqual(result, '00000041');
//     });

//     test('should return FFFFFFFF for Infinity', function() {
//       result = myp5sound.hex(Infinity);
//       assert.typeOf(result, 'String');
//       assert.strictEqual(result, 'FFFFFFFF');
//     });

//     test('should return 00000000 for -Infinity', function() {
//       result = myp5sound.hex(-Infinity);
//       assert.typeOf(result, 'String');
//       assert.strictEqual(result, '00000000');
//     });

//     test('should return array', function() {
//       result = myp5sound.hex([65, 66, 67]);
//       assert.typeOf(result, 'Array');
//       assert.deepEqual(result, ['00000041', '00000042', '00000043']);
//     });
//   });

//   suite('p5sound.prototype.unhex', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.unhex);
//       assert.typeOf(myp5sound.unchar, 'function');
//     });

//     test('should return the integer representation of hex', function() {
//       result = myp5sound.unhex('00000041');
//       assert.typeOf(result, 'Number');
//       assert.strictEqual(result, 65);
//     });

//     test('should return the NaN for empty string', function() {
//       result = myp5sound.unhex('');
//       assert.isNaN(result);
//     });

//     test.skip('should return the NaN for invalid hex string', function() {
//       result = myp5sound.unhex('cat');
//       assert.isNaN(result);
//     });

//     test('should return array of numbers', function() {
//       result = myp5sound.unhex(['00000041', '00000042', '00000043']);
//       assert.typeOf(result, 'Array');
//       assert.deepEqual(result, [65, 66, 67]);
//     });
//   });
// });
