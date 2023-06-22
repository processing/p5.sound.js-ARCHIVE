// suite('Structure', function() {
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

//   suite('p5sound.prototype.loop and p5sound.prototype.noLoop', function() {
//     test('noLoop should stop', function() {
//       return new Promise(function(resolve, reject) {
//         var c0 = myp5sound.frameCount;
//         myp5sound.noLoop();
//         myp5sound.draw = function() {
//           var c1 = myp5sound.frameCount;
//           // Allow one final draw to run
//           if (c1 > c0 + 1) {
//             reject('Entered draw');
//           }
//         };
//         setTimeout(resolve, 100);
//       });
//     });

//     test('loop should restart', function() {
//       return new Promise(function(resolve, reject) {
//         var c0 = myp5sound.frameCount;
//         myp5sound.noLoop();
//         myp5sound.draw = function() {
//           var c1 = myp5sound.frameCount;
//           // Allow one final draw to run
//           if (c1 > c0 + 1) {
//             reject('Entered draw');
//           }
//         };
//         setTimeout(resolve, 100);
//       }).then(function() {
//         return new Promise(function(resolve, reject) {
//           myp5sound.draw = resolve;
//           myp5sound.loop();
//           setTimeout(function() {
//             reject('Failed to restart draw.');
//           }, 100);
//         });
//       });
//     });
//   });

//   suite('p5sound.prototype.push and p5sound.prototype.pop', function() {
//     function getRenderState() {
//       var state = {};
//       for (var key in myp5sound._renderer) {
//         var value = myp5sound._renderer[key];
//         if (
//           typeof value !== 'function' &&
//           key !== '_cachedFillStyle' &&
//           key !== '_cachedStrokeStyle'
//         ) {
//           state[key] = value;
//         }
//       }
//       return state;
//     }

//     function assertCanPreserveRenderState(work) {
//       var originalState = getRenderState();
//       myp5sound.push();
//       work();
//       myp5sound.pop();
//       assert.deepEqual(getRenderState(), originalState);
//     }

//     test('leak no state after fill()', function() {
//       myp5sound.noFill();
//       assertCanPreserveRenderState(function() {
//         myp5sound.fill('red');
//       });
//     });

//     test('leak no state after noFill()', function() {
//       myp5sound.fill('red');
//       assertCanPreserveRenderState(function() {
//         myp5sound.noFill();
//       });
//     });

//     test('leak no state after stroke()', function() {
//       myp5sound.noStroke();
//       assertCanPreserveRenderState(function() {
//         myp5sound.stroke('red');
//       });
//     });

//     test('leak no state after noStroke()', function() {
//       myp5sound.stroke('red');
//       assertCanPreserveRenderState(function() {
//         myp5sound.noStroke();
//       });
//     });

//     test('leak no state after tint()', function() {
//       myp5sound.noTint();
//       assertCanPreserveRenderState(function() {
//         myp5sound.tint(255, 0, 0);
//       });
//     });

//     test('leak no state after noTint()', function() {
//       myp5sound.tint(255, 0, 0);
//       assertCanPreserveRenderState(function() {
//         myp5sound.noTint();
//       });
//     });

//     test('leak no state after strokeWeight()', function() {
//       myp5sound.strokeWeight(1);
//       assertCanPreserveRenderState(function() {
//         myp5sound.strokeWeight(10);
//       });
//     });

//     test('leak no state after strokeCap()', function() {
//       myp5sound.strokeCap(myp5sound.ROUND);
//       assertCanPreserveRenderState(function() {
//         myp5sound.strokeCap(myp5sound.SQUARE);
//       });
//     });

//     test('leak no state after strokeJoin()', function() {
//       myp5sound.strokeJoin(myp5sound.BEVEL);
//       assertCanPreserveRenderState(function() {
//         myp5sound.strokeJoin(myp5sound.MITER);
//       });
//     });

//     test('leak no state after rectMode()', function() {
//       myp5sound.rectMode(myp5sound.CORNER);
//       assertCanPreserveRenderState(function() {
//         myp5sound.rectMode(myp5sound.CENTER);
//       });
//     });

//     test('leak no state after ellipseMode()', function() {
//       myp5sound.ellipseMode(myp5sound.CORNER);
//       assertCanPreserveRenderState(function() {
//         myp5sound.ellipseMode(myp5sound.CENTER);
//       });
//     });

//     test('leak no state after colorMode()', function() {
//       myp5sound.colorMode(myp5sound.HSB);
//       assertCanPreserveRenderState(function() {
//         myp5sound.colorMode(myp5sound.RGB);
//       });
//     });

//     test('leak no state after textAlign()', function() {
//       myp5sound.textAlign(myp5sound.RIGHT, myp5sound.BOTTOM);
//       assertCanPreserveRenderState(function() {
//         myp5sound.textAlign(myp5sound.CENTER, myp5sound.CENTER);
//       });
//     });

//     test('leak no state after textFont()', function() {
//       myp5sound.textFont('Georgia');
//       assertCanPreserveRenderState(function() {
//         myp5sound.textFont('Helvetica');
//       });
//     });

//     test('leak no state after textStyle()', function() {
//       myp5sound.textStyle(myp5sound.ITALIC);
//       assertCanPreserveRenderState(function() {
//         myp5sound.textStyle(myp5sound.BOLD);
//       });
//     });

//     test('leak no state after textSize()', function() {
//       myp5sound.textSize(12);
//       assertCanPreserveRenderState(function() {
//         myp5sound.textSize(16);
//       });
//     });

//     test('leak no state after textLeading()', function() {
//       myp5sound.textLeading(20);
//       assertCanPreserveRenderState(function() {
//         myp5sound.textLeading(30);
//       });
//     });
//   });

//   suite('p5sound.prototype.redraw', function() {
//     var iframe;

//     teardown(function() {
//       if (iframe) {
//         iframe.teardown();
//         iframe = null;
//       }
//     });

//     test('resets the rendering matrix between frames', function() {
//       return new Promise(function(resolve, reject) {
//         myp5sound.draw = function() {
//           myp5sound.background(0);
//           myp5sound.stroke(255);
//           myp5sound.point(10, 10);
//           if (myp5sound.get(10, 10)[0] === 0) {
//             reject(new Error("Drawing matrix doesn't appear to be reset"));
//           }
//           myp5sound.rotate(10);
//         };
//         myp5sound.redraw(10);
//         resolve();
//       });
//     });

//     test('instance redraw is independent of window', function() {
//       // callback for p5sound instance mode.
//       // It does not call noLoop so redraw will be called many times.
//       // Redraw is not supposed to call window.draw even though no draw is defined in cb
//       function cb(s) {
//         s.setup = function() {
//           setTimeout(window.afterSetup, 1000);
//         };
//       }
//       return new Promise(function(resolve) {
//         iframe = createP5Iframe(
//           [
//             P5_SCRIPT_TAG,
//             '<script>',
//             'globalDraws = 0;',
//             'function setup() { noLoop(); }',
//             'function draw() { window.globalDraws++; }',
//             'new p5sound(' + cb.toString() + ');',
//             '</script>'
//           ].join('\n')
//         );
//         iframe.elt.contentWindow.afterSetup = resolve;
//       }).then(function() {
//         var win = iframe.elt.contentWindow;
//         assert.strictEqual(win.globalDraws, 1);
//       });
//     });
//   });

//   suite('loop', function() {
//     testSketchWithPromise('loop in setup does not call draw', function(
//       sketch,
//       resolve,
//       reject
//     ) {
//       sketch.setup = function() {
//         sketch.loop();
//         resolve();
//       };

//       sketch.draw = function() {
//         reject(new Error('Entered draw during loop()'));
//       };
//     });

//     testSketchWithPromise('loop in draw does not call draw', function(
//       sketch,
//       resolve,
//       reject
//     ) {
//       sketch.draw = function() {
//         if (sketch.frameCount > 1) {
//           reject(new Error('re-entered draw during loop() call'));
//         }
//         sketch.loop();
//         resolve();
//       };
//     });
//   });
// });
