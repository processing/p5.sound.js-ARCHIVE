// import p5sound from '../main.js';
import audioContext from '../audioContext.js';

const moduleSources = [
  // require('raw-loader!./recorderProcessor').default,
  // require('raw-loader!./soundFileProcessor').default,
  // require('raw-loader!./amplitudeProcessor').default
  // require('./recorderProcessor').default,
  // require('./soundFileProcessor').default,
  // require('./amplitudeProcessor').default
  require('./amplitudeProcessor'),
  require('./recorderProcessor'),
  require('./soundFileProcessor')
];
const ac = audioContext;
let initializedAudioWorklets = false;

function loadAudioWorkletModules() {
  return Promise.all(
    moduleSources.map(function (moduleSrc) {
      const blob = new Blob([moduleSrc], { type: 'application/javascript' });
      const objectURL = URL.createObjectURL(blob);
      return (
        ac.audioWorklet
          .addModule(objectURL)
          // in "p5 instance mode," the module may already be registered
          .catch(() => Promise.resolve())
      );
    })
  );
}

p5.prototype.registerMethod('init', function () {
  if (initializedAudioWorklets) return;
  // ensure that a preload function exists so that p5 will wait for preloads to finish
  if (!this.preload && !window.preload) {
    this.preload = function () {};
  }

  // use p5's preload system to load necessary AudioWorklet modules before setup()
  this._incrementPreload();
  const onWorkletModulesLoad = function () {
    initializedAudioWorklets = true;
    this._decrementPreload();
  }.bind(this);
  loadAudioWorkletModules().then(onWorkletModulesLoad);
});
