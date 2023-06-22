import p5sound from '../core/main';

/**
 * _globalInit
 *
 * TODO: ???
 * if sketch is on window
 * assume "global" mode
 * and instantiate p5sound automatically
 * otherwise do nothing
 *
 * @private
 * @return {Undefined}
 */
const _globalInit = () => {
  // Could have been any property defined within the p5sound constructor.
  // If that property is already a part of the global object,
  // this code has already run before, likely due to a duplicate import
  if (typeof window._setupDone !== 'undefined') {
    console.warn(
      'p5sound.js seems to have been imported multiple times. Please remove the duplicate import'
    );
    return;
  }

  if (!window.mocha) {
    // If there is a setup or draw function on the window
    // then instantiate p5sound in "global" mode
    if (
      ((window.setup && typeof window.setup === 'function') ||
        (window.draw && typeof window.draw === 'function')) &&
      !p5sound.instance
    ) {
      new p5sound();
    }
  }
};

// make a promise that resolves when the document is ready
const waitForDocumentReady = () =>
  new Promise((resolve, reject) => {
    // if the page is ready, initialize p5sound immediately
    if (document.readyState === 'complete') {
      resolve();
      // if the page is still loading, add an event listener
      // and initialize p5sound as soon as it finishes loading
    } else {
      window.addEventListener('load', resolve, false);
    }
  });

Promise.all([waitForDocumentReady(),  Promise.resolve()]).then(_globalInit);
