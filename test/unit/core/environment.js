// suite('Environment', function() {
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

//   suite('p5sound.frameCount', function() {
//     test('starts at zero', function() {
//       return new Promise(function(resolve, reject) {
//         // Has to use a custom p5sound to hook setup correctly
//         new p5sound(function(p) {
//           p.setup = function() {
//             if (p.frameCount !== 0) {
//               reject('frameCount is not 0 in setup');
//             }
//           };
//           p.draw = function() {
//             if (p.frameCount === 1) {
//               resolve();
//             }
//           };
//         });
//       });
//     });
//     test('matches draw calls', function() {
//       return new Promise(function(resolve, reject) {
//         var frames = myp5sound.frameCount;
//         var start = myp5sound.frameCount;
//         myp5sound.draw = function() {
//           try {
//             frames += 1;
//             assert.equal(myp5sound.frameCount, frames);
//             if (frames === start + 5) {
//               // Test 5 seperate redraws
//               myp5sound.noLoop();
//               setTimeout(myp5sound.redraw.bind(myp5), 10);
//               setTimeout(myp5sound.redraw.bind(myp5), 20);
//               setTimeout(myp5sound.redraw.bind(myp5), 30);
//               setTimeout(myp5sound.redraw.bind(myp5), 40);
//               setTimeout(myp5sound.redraw.bind(myp5), 50);
//             } else if (frames === start + 10) {
//               // Test loop resuming
//               myp5sound.loop();
//             } else if (frames === start + 15) {
//               // Test queuing multiple redraws
//               myp5sound.noLoop();
//               setTimeout(myp5sound.redraw.bind(myp5sound 5), 10);
//             } else if (frames === start + 20) {
//               resolve();
//             }
//             assert.equal(myp5sound.frameCount, frames);
//           } catch (err) {
//             reject(err);
//           }
//         };
//       });
//     });
//   });

//   suite('p5sound.prototype.focused', function() {
//     test('it should return true on focus', function() {
//       window.dispatchEvent(new Event('focus'));
//       assert.strictEqual(myp5sound.focused, true);
//     });

//     test('it should return true on blur', function() {
//       window.dispatchEvent(new Event('blur'));
//       assert.strictEqual(myp5sound.focused, false);
//     });
//   });

//   suite('p5sound.prototype.cursor', function() {
//     test('should change cursor to cross', function() {
//       myp5sound.cursor(myp5sound.CROSS);
//       assert.strictEqual(myp5sound._curElement.elt.style.cursor, 'crosshair');
//     });
//   });

//   suite('p5sound.prototype.noCursor', function() {
//     test('should change cursor to none', function() {
//       myp5sound.noCursor();
//       assert.strictEqual(myp5sound._curElement.elt.style.cursor, 'none');
//     });
//   });

//   suite('p5sound.prototype.frameRate', function() {
//     test('returns 0 on first draw call', function() {
//       assert.strictEqual(myp5sound.frameRate(), 0);
//     });

//     test('returns current frame rate after first draw call', function() {
//       return new Promise(function(resolve, reject) {
//         new p5sound(function(p) {
//           p.draw = function() {
//             if (p.frameCount === 2 && p.frameRate() > 0) {
//               resolve();
//               p.remove();
//             }
//           };
//         });
//       });
//     });

//     test('wrong param type. throws error.', function() {
//       assert.validationError(function() {
//         myp5sound.frameRate('a');
//       });
//     });

//     test('p5sound.prototype.getFrameRate', function() {
//       assert.strictEqual(myp5sound.getFrameRate(), 0);
//     });

//     suite('drawing with target frame rates', function() {
//       let clock;
//       let prevRequestAnimationFrame;
//       let nextFrameCallback = () => {};
//       let controlledP5;

//       setup(function() {
//         clock = sinon.useFakeTimers(0);
//         sinon.stub(window.performance, 'now', Date.now);

//         // Save the real requestAnimationFrame so we can restore it later
//         prevRequestAnimationFrame = window.requestAnimationFrame;
//         // Use a fake requestAnimationFrame that just stores a ref to the callback
//         // so that we can call it manually
//         window.requestAnimationFrame = function(cb) {
//           nextFrameCallback = cb;
//         };

//         return new Promise(function(resolve) {
//           controlledP5 = new p5sound(function(p) {
//             p.setup = function() {
//               p.createCanvas(10, 10);
//               p.frameRate(60);
//               p.loop();
//               resolve(p);
//             };

//             p.draw = function() {};
//           });
//         });
//       });

//       teardown(function() {
//         clock.restore();
//         window.performance.now.restore();
//         window.requestAnimationFrame = prevRequestAnimationFrame;
//         nextFrameCallback = function() {};
//         controlledP5.remove();
//       });

//       test('draw() is called at the correct frame rate given a faster display', function() {
//         sinon.spy(controlledP5, 'draw');

//         clock.tick(1000 / 200); // Simulate a 200Hz refresh rate
//         nextFrameCallback(); // trigger the next requestAnimationFrame
//         assert(controlledP5.draw.notCalled, 'draw() should not be called before 1s/60');

//         // Advance until 5ms before the next frame should render.
//         // This should be within p5's threshold for rendering the frame.
//         clock.tick(1000 / 60 - 1000 / 200 - 5);
//         nextFrameCallback(); // trigger the next requestAnimationFrame
//         assert(controlledP5.draw.calledOnce, 'one frame should have been drawn');
//         // deltaTime should reflect real elapsed time
//         assert.equal(controlledP5.deltaTime, 1000 / 60 - 5);

//         // Advance enough time forward to be 1s/60 - 5ms from the last draw
//         clock.tick(1000 / 60 - 5);
//         nextFrameCallback(); // trigger the next requestAnimationFrame
//         // Even though this is 1s/60 - 5ms from the last draw, the last frame came
//         // in early, so we still shouldn't draw
//         assert(controlledP5.draw.calledOnce, 'draw() should not be called before 1s/60 past the last target draw time');

//         // Advance enough time forward to be 1s/60 from the last draw
//         clock.tick(5);
//         nextFrameCallback();
//         assert(controlledP5.draw.calledTwice); // Now it should draw again!
//         // deltaTime should reflect real elapsed time
//         assert.equal(controlledP5.deltaTime, 1000 / 60);
//       });
//     });
//   });

//   suite('p5sound.prototype.getTargetFrameRate', function() {
//     test('returns 60 on the first call', function() {
//       assert.strictEqual(myp5sound.getTargetFrameRate(), 60);
//     });

//     test('returns set value of randomize integer', function() {
//       let randVal = Math.floor(Math.random()*120);
//       myp5sound.frameRate(randVal);
//       assert.strictEqual(myp5sound.getTargetFrameRate(), randVal);
//     });
//   });

//   suite('Canvas dimensions', function() {
//     test('p5sound.prototype.width', function() {
//       myp5sound.createCanvas(20, 30);
//       assert.strictEqual(myp5sound.width, 20);
//     });

//     test('p5sound.prototype.height', function() {
//       myp5sound.createCanvas(20, 30);
//       assert.strictEqual(myp5sound.height, 30);
//     });
//   });

//   suite('p5sound.prototype.pixelDensity', function() {
//     test('returns the pixel density', function() {
//       assert.isNumber(myp5sound.pixelDensity());
//     });

//     test('sets the pixel density', function() {
//       myp5sound.pixelDensity(2);
//       assert.strictEqual(myp5sound.pixelDensity(), 2);
//     });

//     test('wrong param type. throws validationError.', function() {
//       assert.validationError(function() {
//         myp5sound.pixelDensity('a');
//       });
//     });
//   });

//   suite('p5sound.prototype.displayDensity', function() {
//     test('returns the pixel density of the display', function() {
//       assert.isNumber(myp5sound.displayDensity());
//     });

//     test('pixelDensity does not change display density', function() {
//       let pd = myp5sound.displayDensity();
//       myp5sound.pixelDensity(pd + 1);
//       assert.isNumber(myp5sound.displayDensity(), pd);
//     });
//   });
// });
