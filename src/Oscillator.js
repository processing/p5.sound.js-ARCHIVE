import audioContext from './audioContext';
import p5sound from './main';


// import Tone.js modules
import { Add as ToneAdd } from 'tone';
import { Multiply as ToneMultiply } from 'tone';
import { Scale as ToneScale } from 'tone';


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


// ========================== //
// SIGNAL MATH FOR MODULATION //
// ========================== //

function sigChain(nodes, newNode, nodeType, input, output) {
  let prevNode = null;
  let nextNode = null;
  let replacedNode = null;
  // If nodes already contains an node of type nodeType, replace that node
  // with newNode.
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i] instanceof nodeType) {
      prevNode = i === 0 ? input : nodes[i - 1];
      nextNode = i === nodes.length - 1 ? output : nodes[i + 1];
      replacedNode = nodes[i];
      nodes[i] = newNode;
      break;
    }
  }
  // Otherwise, add newMathOp to the end of mathOps.
  if (replacedNode === null) {
    prevNode = nodes.length === 0 ? input : nodes[nodes.length - 1];
    nextNode = output;
    nodes.push(newNode);
  }
  // Connect the newMathOp to the previous and next nodes.
  prevNode.disconnect();
  if (replacedNode !== null) {
    replacedNode.disconnect();
    replacedNode.dispose();
  }
  prevNode.connect(newNode);
  newNode.connect(nextNode);
}
// reference
// https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/destination
// jason recommends to play with the web audio api on the console
// on google chrome

/*
 * Class methods
 */
/**
*
* @class Oscillator
* @constructor
* @param {Number} type
*/

class Oscillator {
  constructor(freq, type) {

    // proofing the constructor
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

    // sine, triangle, square, saw, pulse
    this.type = type;
    this.started = false;

    // components
    this.phaseAmount = undefined;
    this.oscillator = audioContext.createOscillator();
    this.f = freq || 440.0; // frequency
    this.oscillator.type = type || 'sine';
    this.oscillator.frequency.setValueAtTime(
      this.f,
      audioContext.currentTime
    );

    // connections
    this.output = audioContext.createGain();

    // modulators connected to the oscillator frequency
    this._freqMods = [];

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
    // this.output.connect(audioContext.destination);
    this.output.connect(p5sound.input);

    // array of math operation signal chaining
    this.mathOps = [];

    // if you wanna do 3D node panners
    // please do it with web audio api,
    // everything we are doing here its compatible

    // add to the soundArray so we can dispose of the osc later
    p5sound.soundArray.push(this);

    // TODO: try a different approach
    // not create references to the audio nodes
    // so that we dont use up so much memory

    // these methods are now the same thing
    this.fade = this.amp;
  }
  /**
   *  Start an oscillator.
   *
   *  Starting an oscillator on a user gesture will enable audio in browsers
   *  that have a strict autoplay policy, including Chrome and most mobile
   *  devices. See also: <a href="#/p5/userStartAudio">userStartAudio()</a>.
   *
   *  @method  start
   *  @for Oscillator
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
      this.freqNode = this.oscillator.frequency;

      // // if other oscillators are already connected to this osc's freq
      for (let i in this._freqMods) {
        if (typeof this._freqMods[i].connect !== 'undefined') {
          this._freqMods[i].connect(this.oscillator.frequency);
        }
      }
      this.started = true;
    }
  }
  /**
   *  Stop an oscillator. Accepts an optional parameter
   *  to determine how long (in seconds from now) until the
   *  oscillator stops.
   *
   *  @method  stop
   *  @for Oscillator
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

  /**
   *  Set the amplitude between 0 and 1.0. Or, pass in an object
   *  such as an oscillator to modulate amplitude with an audio signal.
   *
   *  @method  amp
   *  @for p5.Oscillator
   *  @param  {Number|Object} vol between 0 and 1.0
   *                              or a modulating signal/oscillator
   *  @param {Number} [rampTime] create a fade that lasts rampTime
   *  @param {Number} [timeFromNow] schedule this event to happen
   *                                seconds from now
   *  @return  {AudioParam} gain  If no value is provided,
   *                              returns the Web Audio API
   *                              AudioParam that controls
   *                              this oscillator's
   *                              gain/amplitude/volume)
   */
  amp(vol, rampTime = 0, tFromNow = 0) {
    if (typeof vol === 'number') {
      let now = audioContext.currentTime;
      this.output.gain.linearRampToValueAtTime(vol, now + tFromNow + rampTime);
    } else if (vol) {
      vol.connect(this.output.gain);
    } else {
      // return the Gain Node
      return this.output.gain;
    }
  }

  /**
   * Returns the value of output gain
   *
   *  @method  getAmp
   *  @for p5.Oscillator
   *
   * @returns {number} Amplitude value between 0.0 and 1.0
   */

  getAmp() {
    return this.output.gain.value;
  }

  /**
   *  Set frequency of an oscillator to a value. Or, pass in an object
   *  such as an oscillator to modulate the frequency with an audio signal.
   *
   *  @method  freq
   *  @for p5.Oscillator
   *  @param  {Number|Object} Frequency Frequency in Hz
   *                                        or modulating signal/oscillator
   *  @param  {Number} [rampTime] Ramp time (in seconds)
   *  @param  {Number} [timeFromNow] Schedule this event to happen
   *                                   at x seconds from now
   *  @return  {AudioParam} Frequency If no value is provided,
   *                                  returns the Web Audio API
   *                                  AudioParam that controls
   *                                  this oscillator's frequency
   *  @example
   *  <div><code>
   *  let osc;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(playOscillator);
   *    osc = new p5.Oscillator(300);
   *    background(220);
   *    text('tap to play', 20, 20);
   *  }
   *
   *  function playOscillator() {
   *    osc.start();
   *    osc.amp(0.5);
   *    // start at 700Hz
   *    osc.freq(700);
   *    // ramp to 60Hz over 0.7 seconds
   *    osc.freq(60, 0.7);
   *    osc.amp(0, 0.1, 0.7);
   *  }
   *  </code></div>
   */
  freq(val, rampTime = 0, tFromNow = 0) {
    if (typeof val === 'number' && !isNaN(val)) {
      this.f = val;
      let now = audioContext.currentTime;

      if (rampTime === 0) {
        this.oscillator.frequency.setValueAtTime(val, tFromNow + now);
      } else {
        if (val > 0) {
          this.oscillator.frequency.exponentialRampToValueAtTime(
            val,
            tFromNow + rampTime + now
          );
        } else {
          this.oscillator.frequency.linearRampToValueAtTime(
            val,
            tFromNow + rampTime + now
          );
        }
      }

      // reset phase if oscillator has a phase
      if (this.phaseAmount) {
        this.phase(this.phaseAmount);
      }
    } else if (val) {
      if (val.output) {
        val = val.output;
      }
      val.connect(this.oscillator.frequency);

      // keep track of what is modulating this param
      // so it can be re-connected if
      this._freqMods.push(val);
    } else {
      // return the Frequency Node
      return this.oscillator.frequency;
    }
  }
  /**
   * Returns the value of frequency of oscillator
   *
   *  @method  getFreq
   *  @for p5.Oscillator
   *  @returns {number} Frequency of oscillator in Hertz
   */

  getFreq() {
    return this.oscillator.frequency.value;
  }

  /**
   *  Set type to 'sine', 'triangle', 'sawtooth' or 'square'.
   *
   *  @method  setType
   *  @for p5.Oscillator
   *  @param {String} type 'sine', 'triangle', 'sawtooth' or 'square'.
   */
  setType(type) {
    this.oscillator.type = type;
  }
  /**
     *  Returns  current type of oscillator eg. 'sine', 'triangle', 'sawtooth' or 'square'.
     *
     *  @method  getType
     *  @for p5.Oscillator
     *  @returns {String} type of oscillator  eg . 'sine', 'triangle', 'sawtooth' or 'square'.
     */

  getType() {
    return this.oscillator.type;
  }

  /**
   *  Connect to a p5.sound / Web Audio object.
   *
   *  @method  connect
   *  @for Oscillator
   *  @param  {Object} unit A p5.sound or Web Audio object
   */
  // connect(unit) {
  //   if(!unit) {
  //     this.output.connect(p5sound.input);
  //   }
  //   else if (unit.hasOwnProperty('input')) {
  //     this.output.connect(unit.input);
  //     this.connection =- unit.input;
  //   } else {
  //     this.output.connect(unit);
  //     this.connection(unit);
  //   }
  //   if (unit && unit._onNewInput) {
  //     unit._onNewInput(this);
  //   }
  // }
  connect(unit) {
    if(!unit) {
      this.output.connect(p5sound.input);
    }
    else if (unit.hasOwnProperty('input')) {
      this.output.connect(unit.input);
    } else {
      this.output.connect(unit);
    }
    if (unit && unit._onNewInput) {
      unit._onNewInput(this);
    }
  }

  /**
   *  Disconnect all outputs
   *
   *  @method  disconnect
   *  @for Oscillator
   */
  disconnect() {
    if (this.output) {
      this.output.disconnect();
    }
    // if (this.panner) {
    //   this.panner.disconnect();
    //   if (this.output) {
    //     this.output.connect(this.panner);
    //   }
    // }
    this.oscMods = [];

  }
  // get rid of the oscillator
  dispose() {
    // remove reference from soundArray
    let index = p5sound.soundArray.indexOf(this);
    p5sound.soundArray.splice(index, 1);

    if (this.oscillator) {
      let now = this.audiocontext.currentTime;
      this.stop(now);
      this.disconnect();
      // this.panner.dispose();
      // this.panner = null;
      this.oscillator = null;
    }
    // if it is a Pulse
    // if (this.osc2) {
    // this.osc2.dispose();
    // }
  }

  /**
   *  Set the phase of an oscillator between 0.0 and 1.0.
   *  In this implementation, phase is a delay time
   *  based on the oscillator's current frequency.
   *
   *  @method  phase
   *  @for p5.Oscillator
   *  @param  {Number} phase float between 0.0 and 1.0
   */
  phase(p) {
    let delayAmt = p5.prototype.map(p, 0, 1.0, 0, 1 / this.f);
    let now = audioContext.currentTime;

    this.phaseAmount = p;

    if (!this.dNode) {
      // create a delay node
      this.dNode = audioContext.createDelay();
      // put the delay node in between output and panner
      this.oscillator.disconnect();
      this.oscillator.connect(this.dNode);
      this.dNode.connect(this.output);
    }

    // set delay time to match phase:
    this.dNode.delayTime.setValueAtTime(delayAmt, now);
  }

  /**
   *  Add a value to the p5.Oscillator's output amplitude,
   *  and return the oscillator. Calling this method again
   *  will override the initial add() with a new value.
   *
   *  @method  add
   *  @for p5.Oscillator
   *  @param {Number} number Constant number to add
   *  @return {Oscillator} Oscillator Returns this oscillator
   *                                     with scaled output
   *
   */
  add(num) {
    let add = new ToneAdd(num);
    sigChain(this.mathOps, add, ToneAdd, this.oscillator, this.output);
    return this;
  }
  /**
   *  Multiply the p5.Oscillator's output amplitude
   *  by a fixed value (i.e. turn it up!). Calling this method
   *  again will override the initial mult() with a new value.
   *
   *  @method  mult
   *  @for p5.Oscillator
   *  @param {Number} number Constant number to multiply
   *  @return {Oscillator} Oscillator Returns this oscillator
   *                                     with multiplied output
   */
  mult(num) {
    let mult = new ToneMultiply(num);
    sigChain(this.mathOps, mult, ToneMultiply, this.oscillator, this.output);
    return this;
  }

  /**
   *  Scale this oscillator's amplitude values to a given
   *  range, and return the oscillator. Calling this method
   *  again will override the initial scale() with new values.
   *
   *  @method  scale
   *  @for Oscillator
   *  @param  {Number} inMin  input range minumum
   *  @param  {Number} inMax  input range maximum
   *  @param  {Number} outMin input range minumum
   *  @param  {Number} outMax input range maximum
   *  @return {Oscillator} Oscillator Returns this oscillator
   *                                     with scaled output
   */
  scale(inMin, inMax, outMin, outMax) {
    let mapOutMin, mapOutMax;
    if (arguments.length === 4) {
      mapOutMin = p5.prototype.map(0, inMin, inMax, outMin, outMax);
      mapOutMax = p5.prototype.map(1, inMin, inMax, outMin, outMax);
    } else {
      mapOutMin = arguments[0];
      mapOutMax = arguments[1];
    }
    let scale = new ToneScale(mapOutMin, mapOutMax);
    sigChain(this.mathOps, scale, ToneScale, this.oscillator, this.output);
    return this;
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


