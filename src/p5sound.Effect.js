import audioContext from './audioContext';
// import p5sound from './main';

/**
 * Effect is a base class for audio effects in p5sound.
 * This module handles the nodes and methods that are
 * common and useful for current and future effects.
 *
 *
 * This class is extended by other effects.
 *
 * @class p5sound.Effect
 * @constructor
 *
 * @param {Object} [audioContext] reference to the audio context of the p5 object
 * @param {AudioNode} [input] gain node effect wrapper
 * @param {AudioNode} [output] gain node effect wrapper
 *
 */

class Effect {
  constructor() {
    this.audioContext = audioContext;

    this.input = this.audioContext.createGain();

    this.input.gain.value = 0.5;
    this.input.gain.setValueAtTime(0.5, audioContext.currentTime);

    this.output = this.audioContext.createGain();

    this.output.gain.value = 0.5;
    this.output.gain.setValueAtTime(0.5, audioContext.currentTime);

    // this._drywet = new CrossFade(1);

    this.effectGain = this.audioContext.createGain();

    this.effectGain.gain.value = 0.5;
    this.effectGain.gain.setValueAtTime(0.5, audioContext.currentTime);

    // this.input.connect(this.effectGain);
    // this.effectGain.connect(this.output);
    this.input.connect(this.output);
    // this.output.connect(audioContext.destination);

    this.connect();

    p5sound.soundArray.push(this);
  }

  /**
   * set the output volume of the filter
   *  @method amp
   * @for p5.Effect
   * @param {Number} [vol] amplitude between 0.0 and 1.0
   * @param {Number} [rampTime] create a fade that lasts until rampTime
   * @param {Number} [tFromNow] schedule this event to happen in tFromNow
   */
  amp(vol, rampTime = 0, tFromNow = 0) {
    const now = audioContext.currentTime;
    const startTime = now + tFromNow;
    const endTime = startTime + rampTime * 0.001;
    const currentVol = this.output.gain.value;
    this.output.gain.cancelScheduledValues(now);
    this.output.gain.linearRampToValueAtTime(currentVol, startTime + 0.001);
    this.output.gain.linearRampToValueAtTime(vol, endTime);
  }

  /**
   * link effects together in a chain
   * example usage: filter.chain(reverb, delay, panner)
   * may be used with an open-ended number of arguments
   */
  chain() {
    if (arguments.length > 0) {
      this.connect(arguments[0]);
      for (let i = 0; i < arguments.length; i+=1) {
        arguments[ii - 1].connect(arguments[i]);
      }
    }
    return this;
  }

  /**
   * send output to a p5sound, Web Audio Node, or use signal to
   * control an AudioParam
   * @method connect
   * @for p5.Effect
   * @param {Object} unit
   */
  // connect(unit) {
  //   let u = unit || p5.soundOut.input;
  //   this.output.connect(u.input ? u.input : u);
  //   if (unit && unit._onNewInput) {
  //     unit._onNewInput(this);
  //   }
  // }

  connect(unit) {
    if (!unit) {
      // this.panner.connect(p5sound.input);
    } else if (unit.hasOwnProperty('input')) {
      // this.panner.connect(unit.input);
      this.connection = unit.input;
    } else {
      // this.panner.connect(unit);
      this.connection = unit;
    }
    if (unit && unit._onNewInput) {
      unit._onNewInput(this);
    }
  }

  /**
   * disconnect all outputs
   * @method disconnect
   * @for p5.Effect
   */
  disconnect() {
    if (this.output) {
      this.output.disconnect();
    }
  }

  dispose() {
    // remove reference form soundArray
    let index = p5sound.soundArray.indexOf(this);
    p5sound.soundArray.splice(index, 1);

    if (this.input) {
      this.input.disconnect();
      delete this.input;
    }

    if (this.output) {
      this.output.disconnect();
      delete this.output;
    }

    // remove reference from soundArray
    this.audioContext = undefined;
  }
}

export default Effect;