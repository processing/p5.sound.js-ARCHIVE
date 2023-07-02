import p5sound from '../core/main';

const _globalInit = () => {
  new p5sound();

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
