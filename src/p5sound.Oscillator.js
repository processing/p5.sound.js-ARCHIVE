/**
 * @module Sound
 * @submodule Oscillator
 * @for p5
 * @requires core
 */
/**
 * Creates a  new <a href="#/p5sound.Oscillator">p5sound.Oscillator</a>
 *
 * Example coming soon...
 */
import audioContext from './audioContext';

// ========================== //
// SIGNAL MATH FOR MODULATION //
// ========================== //

// function sigChain(nodes, newNode, nodeType, input, output) {
//   let prevNode = null;
//   let nextNode = null;
//   let replacedNode = null;
//   // If nodes already contains an node of type nodeType, replace that node
//   // with newNode.
//   for (let i = 0; i < nodes.length; i++) {
//     if (nodes[i] instanceof nodeType) {
//       prevNode = i === 0 ? input : nodes[i - 1];
//       nextNode = i === nodes.length - 1 ? output : nodes[i + 1];
//       replacedNode = nodes[i];
//       nodes[i] = newNode;
//       break;
//     }
//   }
//   // Otherwise, add newMathOp to the end of mathOps.
//   if (replacedNode === null) {
//     prevNode = nodes.length === 0 ? input : nodes[nodes.length - 1];
//     nextNode = output;
//     nodes.push(newNode);
//   }
//   // Connect the newMathOp to the previous and next nodes.
//   prevNode.disconnect();
//   if (replacedNode !== null) {
//     replacedNode.disconnect();
//     replacedNode.dispose();
//   }
//   prevNode.connect(newNode);
//   newNode.connect(nextNode);
// }
// reference
// https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/destination
// jason recommends to play with the web audio api on the console
// on google chrome

/*
 * Class methods
 */
/**
*
* @class p5sound.Oscillator
* @constructor
* @param {Number} type
*/

class Oscillator {
  constructor(freq, type) {
    this.type = type;//sine, triangle, square, saw, pulse

    if (typeof freq === 'string') {
      let f = type;
      type = freq;
      freq = f;
    }
    if (typeof type === 'number') {
      let f = type;
      type = freq;
      freq = f;
    }
    this.started = false;
    // components
    //this.phaseAmount = undefined;
    this.oscillator = audioContext.createOscillator();
    this.f = freq || 440.0; // frequency
    this.oscillator.type = type || 'sine';
    this.oscillator.frequency.setValueAtTime(
      this.f,
      audioContext.currentTime
    );

    // connections
    this.output = audioContext.createGain();

    // set default output gain to 0.5
    // TODO: maybe think of a constant that people can tweak
    // for max volume
    this.output.gain.value = 0.5;
    this.output.gain.setValueAtTime(0.5, audioContext.currentTime);

    this.oscillator.connect(this.output);
    // stereo panning
    //this.connection = p5.input; // connect to p5sound by default

    //this.panner = new Panner();
    //this.output.connect(this.panner);
    this.output.connect(audioContext.destination);

    // if you wanna do 3D node panners
    // please do it with web audio api,
    // everything we are doing here its compatible

    // add to the soundArray so we can dispose of the osc later
    // p5sound.soundArray.push(this);

    // TODO: try a different approach
    // not create references to the audio nodes
    // so that we dont use up so much memory

    // array of math operation signal chaining
    this.mathOps = [];

    // add to the soundArray so we can dispose of the osc later
    //p5.soundArray.push(this);

    // these methods are now the same thing
    //this.fade = this.amp;
  }
  /**
   *  Start an oscillator.
   *
   *  Starting an oscillator on a user gesture will enable audio in browsers
   *  that have a strict autoplay policy, including Chrome and most mobile
   *  devices. See also: <a href="#/p5/userStartAudio">userStartAudio()</a>.
   *
   *  @method  start
   *  @for p5.Oscillator
   *  @param  {Number} [time] startTime in seconds from now.
   *  @param  {Number} [frequency] frequency in Hz.
   */
  start(time, f) {
    if (this.started) {
      let now = audioContext.currentTime;
      this.stop(now);
    }
    if (!this.started) {
      let freq = f || this.f;
      let type = this.oscillator.type;

      this.oscillator = audioContext.createOscillator();
      this.oscillator.frequency.value = Math.abs(freq);
      this.oscillator.type = type;

      this.oscillator.connect(this.output);
      time = time || 0;
      this.oscillator.start(time + audioContext.currentTime);
      // this.freqNode = this.oscillator.frequency;

      // // if other oscillators are already connected to this osc's freq
      // for (let i in this._freqMods) {
      //   if (typeof this._freqMods[i].connect !== 'undefined') {
      //     this._freqMods[i].connect(this.oscillator.frequency);
      //   }
      // }
      this.started = true;
    }
  }
  /**
   *  Stop an oscillator. Accepts an optional parameter
   *  to determine how long (in seconds from now) until the
   *  oscillator stops.
   *
   *  @method  stop
   *  @for p5.Oscillator
   *  @param  {Number} [secondsFromNow] Time, in seconds from now.
   */
  // hopefully we can get rid of the started variable
  stop(time) {
    if (this.started) {
      let t = time || 0;
      let now = audioContext.currentTime;
      this.oscillator.stop(t + now);
      this.started = false;
    }
  }
}

class SinOsc extends Oscillator {
  constructor(freq) {
    super(freq, 'sine');
  }
}

/**
 *  Constructor: <code>new p5.TriOsc()</code>.
 *  This creates a Triangle Wave Oscillator and is
 *  equivalent to <code>new p5.Oscillator('triangle')
 *  </code> or creating a p5.Oscillator and then calling
 *  its method <code>setType('triangle')</code>.
 *  See p5.Oscillator for methods.
 *
 *  @class  p5.TriOsc
 *  @constructor
 *  @extends p5.Oscillator
 *  @param {Number} [freq] Set the frequency
 */
class TriOsc extends Oscillator {
  constructor(freq) {
    super(freq, 'triangle');
  }
}

/**
 *  Constructor: <code>new p5.SawOsc()</code>.
 *  This creates a SawTooth Wave Oscillator and is
 *  equivalent to <code> new p5.Oscillator('sawtooth')
 *  </code> or creating a p5.Oscillator and then calling
 *  its method <code>setType('sawtooth')</code>.
 *  See p5.Oscillator for methods.
 *
 *  @class  p5.SawOsc
 *  @constructor
 *  @extends p5.Oscillator
 *  @param {Number} [freq] Set the frequency
 */
class SawOsc extends Oscillator {
  constructor(freq) {
    super(freq, 'sawtooth');
  }
}

/**
 *  Constructor: <code>new p5.SqrOsc()</code>.
 *  This creates a Square Wave Oscillator and is
 *  equivalent to <code> new p5.Oscillator('square')
 *  </code> or creating a p5.Oscillator and then calling
 *  its method <code>setType('square')</code>.
 *  See p5.Oscillator for methods.
 *
 *  @class  p5.SqrOsc
 *  @constructor
 *  @extends p5.Oscillator
 *  @param {Number} [freq] Set the frequency
 */
class SqrOsc extends Oscillator {
  constructor(freq) {
    super(freq, 'square');
  }
}
export default Oscillator;
export { SinOsc, TriOsc, SawOsc, SqrOsc };


