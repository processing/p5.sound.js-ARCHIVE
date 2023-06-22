// suite('color/Setting', function() {
//   let myp5sound; // sketch without WEBGL Mode
//   let my3D; // sketch with WEBGL mode
//   setup(function(done) {
//     new p5sound(function(p) {
//       p.setup = function() {
//         myp5sound = p;
//       };
//     });
//     new p5sound(function(p) {
//       p.setup = function() {
//         p.createCanvas(100, 100, p.WEBGL);
//         my3D = p;
//       };
//     });
//     done();
//   });

//   teardown(function() {
//     myp5sound.remove();
//     my3D.remove();
//   });

//   suite('p5sound.prototype.erase', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.erase);
//     });

//     test('should set renderer to erasing state', function() {
//       myp5sound.erase();
//       assert.isTrue(myp5sound._renderer._isErasing);
//     });

//     test('should cache renderer fill', function() {
//       myp5sound.fill(255, 0, 0);
//       const fillStyle = myp5sound.drawingContext.fillStyle;
//       myp5sound.erase();
//       assert.deepEqual(myp5sound._renderer._cachedFillStyle, fillStyle);
//     });

//     test('should cache renderer stroke', function() {
//       myp5sound.stroke(255, 0, 0);
//       const strokeStyle = myp5sound.drawingContext.strokeStyle;
//       myp5sound.erase();
//       assert.deepEqual(myp5sound._renderer._cachedStrokeStyle, strokeStyle);
//     });

//     test('should cache renderer blend', function() {
//       myp5sound.blendMode(myp5sound.SCREEN);
//       myp5sound.erase();
//       assert.deepEqual(myp5sound._renderer._cachedBlendMode, myp5sound.SCREEN);
//     });

//     test('should set fill strength', function() {
//       myp5sound.erase(125);
//       assert.equal(
//         myp5sound.color(myp5sound.drawingContext.fillStyle).array,
//         myp5sound.color(255, 125).array
//       );
//     });

//     test('should set stroke strength', function() {
//       myp5sound.erase(255, 50);
//       assert.equal(
//         myp5sound.color(myp5sound.drawingContext.strokeStyle).array,
//         myp5sound.color(255, 50).array
//       );
//     });
//   });

//   suite('p5sound.prototype.colorMode', function() {
//     test('should be a function', function() {
//       assert.ok(myp5sound.colorMode);
//     });

//     test('should set mode to RGB', function() {
//       myp5sound.colorMode(myp5sound.RGB);
//       assert.equal(myp5sound._colorMode, myp5sound.RGB);
//     });

//     test('should correctly set color RGB maxes', function() {
//       assert.deepEqual(myp5sound._colorMaxes[myp5sound.RGB], [255, 255, 255, 255]);
//       myp5sound.colorMode(myp5sound.RGB, 1, 1, 1);
//       assert.deepEqual(myp5sound._colorMaxes[myp5sound.RGB], [1, 1, 1, 255]);
//       myp5sound.colorMode(myp5sound.RGB, 1);
//       assert.deepEqual(myp5sound._colorMaxes[myp5sound.RGB], [1, 1, 1, 1]);
//       myp5sound.colorMode(myp5sound.RGB, 255, 255, 255, 1);
//       assert.deepEqual(myp5sound._colorMaxes[myp5sound.RGB], [255, 255, 255, 1]);
//       myp5sound.colorMode(myp5sound.RGB, 255);
//     });

//   });


// });
