// suite('preloads', () => {
//   let preloadCache = null;
//   setup(() => {
//     preloadCache = p5sound.prototype._promisePreloads;
//     p5sound.prototype._promisePreloads = [...preloadCache];
//   });

//   teardown(() => {
//     p5sound.prototype._promisePreloads = preloadCache;
//   });

//   suite('From external sources', () => {
//     test('Extension preload causes setup to wait', () => {
//       let resolved = false;
//       const target = {
//         async testPreloadFunction() {
//           await new Promise(res => setTimeout(res, 10));
//           resolved = true;
//         }
//       };

//       p5sound.prototype._promisePreloads.push({
//         target,
//         method: 'testPreloadFunction'
//       });

//       return promisedSketch((sketch, resolve, reject) => {
//         sketch.preload = () => {
//           target.testPreloadFunction();
//         };

//         sketch.setup = () => {
//           if (resolved) {
//             resolve();
//           } else {
//             reject(new Error('Sketch enetered setup too early.'));
//           }
//         };
//       });
//     });

//     test('Extension preload error causes setup to not execute', () => {
//       const target = {
//         async testPreloadFunction() {
//           throw new Error('Testing Error');
//         }
//       };

//       p5sound.prototype._promisePreloads.push({
//         target,
//         method: 'testPreloadFunction'
//       });

//       return promisedSketch((sketch, resolve, reject) => {
//         sketch.preload = () => {
//           target.testPreloadFunction();
//           setTimeout(resolve, 10);
//         };

//         sketch.setup = () => {
//           reject('Sketch should not enter setup');
//         };
//       });
//     });

//     suite('addCallbacks', () => {
//       test('Extension is passed all arguments when not using addCallbacks', () => {
//         const target = {
//           async testPreloadFunction(...args) {
//             assert.lengthOf(args, 3);
//           }
//         };

//         p5sound.prototype._promisePreloads.push({
//           target,
//           method: 'testPreloadFunction',
//           addCallbacks: false
//         });

//         return promisedSketch((sketch, resolve, reject) => {
//           sketch.preload = () => {
//             target
//               .testPreloadFunction(() => {}, () => {}, () => {})
//               .catch(reject);
//           };

//           sketch.setup = resolve;
//         });
//       });

//       test('Extension gets stripped arguments when using addCallbacks', () => {
//         const target = {
//           async testPreloadFunction(...args) {
//             assert.lengthOf(args, 1);
//           }
//         };

//         p5sound.prototype._promisePreloads.push({
//           target,
//           method: 'testPreloadFunction',
//           addCallbacks: true
//         });

//         return promisedSketch((sketch, resolve, reject) => {
//           sketch.preload = () => {
//             target
//               .testPreloadFunction(() => {}, () => {}, () => {})
//               .catch(reject);
//           };

//           sketch.setup = resolve;
//         });
//       });

//       test('Extension with addCallbacks supports success callback', () => {
//         const target = {
//           async testPreloadFunction(...args) {
//             assert.lengthOf(args, 1);
//           }
//         };

//         p5sound.prototype._promisePreloads.push({
//           target,
//           method: 'testPreloadFunction',
//           addCallbacks: true
//         });

//         let success = 0;

//         return promisedSketch((sketch, resolve, reject) => {
//           sketch.preload = () => {
//             target
//               .testPreloadFunction(0, () => {
//                 success++;
//               })
//               .catch(reject);
//             target
//               .testPreloadFunction(
//                 () => {},
//                 () => {
//                   success++;
//                 },
//                 () => {
//                   reject(new Error('Failure callback executed'));
//                 }
//               )
//               .catch(reject);
//           };

//           sketch.setup = () => {
//             if (success !== 2) {
//               reject(
//                 new Error(`Not all success callbacks were run: ${success}/2`)
//               );
//             }
//             resolve();
//           };
//         });
//       });
//     });
//   });
// });
