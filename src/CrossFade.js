// adapted from Crossfade.js at Tone.js v0.10.0

import audioContext from './audioContext';

/**
* let crossFade = CrossFade(0.5);
* //connect effect A to crossfade from
* //effect output 0 to crossfade input 0
* effectA.connect(crossFade, 0, 0);
* //connect effect B to crossfade from
* //effect output 0 to crossfade input 1
* effectB.connect(crossFade, 0, 1);
* crossFade.fade.value = 0;
* // ^ only effectA is output
* crossFade.fade.value = 1;
* // ^ only effectB is output
* crossFade.fade.value = 0.5;
* // ^ the two signals are mixed equally.
*/

class CrossFade {
  constructor(initialFade) {
    this.input = new Array(2);
    this.output = audioContext.createGain();

    this.a = this.input[0] = new audioContext.createGain();
    this.b = this.input[1] = new audioContext.createGain();

    // connections
    this.a.connect(this.output);
    this.b.connect(this.output);

  }

  dispose() {
    this.a.dispose();
    this.a = null;
    this.b.dispose();
    this.b = null;
  }
}

export default CrossFade;